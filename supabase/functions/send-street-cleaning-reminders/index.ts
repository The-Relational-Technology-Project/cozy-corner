import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Returns which side (if any) has street cleaning on the given date.
// West side: 1st & 3rd Tuesday. East side: 1st & 3rd Friday.
function sideForDate(date: Date): "west" | "east" | null {
  const dayOfWeek = date.getUTCDay(); // 2 = Tuesday, 5 = Friday
  const dayOfMonth = date.getUTCDate();
  const occurrence = Math.floor((dayOfMonth - 1) / 7) + 1; // 1st, 2nd, 3rd...

  if (occurrence !== 1 && occurrence !== 3) return null;
  if (dayOfWeek === 2) return "west";
  if (dayOfWeek === 5) return "east";
  return null;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let body: Record<string, unknown> = {};
    if (req.method === "POST") {
      try {
        body = await req.json();
      } catch (_) {
        body = {};
      }
    }

    // Local (Pacific) date — the cron runs at 15:00 UTC = 8am PT
    const now = new Date();
    const pacific = new Date(now.getTime() - 7 * 60 * 60 * 1000);

    const forcedSide = (body.side as string) || url.searchParams.get("side");
    const side = forcedSide === "west" || forcedSide === "east"
      ? forcedSide
      : sideForDate(pacific);

    if (!side) {
      console.log("No street cleaning today — nothing to send.");
      return new Response(
        JSON.stringify({ sent: 0, reason: "no cleaning today" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const column = side === "west" ? "west_side" : "east_side";
    const { data: subs, error } = await supabase
      .from("street_cleaning_subscriptions")
      .select("email")
      .eq(column, true);

    if (error) throw error;

    const { data: unsubs } = await supabase
      .from("street_cleaning_unsubscribes")
      .select("email");
    const unsubscribed = new Set((unsubs ?? []).map((u: { email: string }) => u.email.toLowerCase()));

    const testEmail = (body.testEmail as string) || url.searchParams.get("testEmail");

    const recipients = testEmail ? [testEmail.toLowerCase()] : [...new Set(
      (subs ?? [])
        .map((s: { email: string }) => s.email.trim().toLowerCase())
        .filter((e: string) => e && !unsubscribed.has(e))
    )];

    console.log(`Street cleaning today: ${side} side. Sending to ${recipients.length} subscriber(s).`);

    const sideLabel = side === "west" ? "West side" : "East side";
    const schedule = side === "west" ? "1st & 3rd Tuesdays" : "1st & 3rd Fridays";

    const results = await Promise.allSettled(
      recipients.map((email) =>
        resend.emails.send({
          from: "Cozy Corner <humans@relationaltechproject.org>",
          reply_to: "josh@relationaltechproject.org",
          to: [email],
          subject: `🧹 Street cleaning today — ${sideLabel} of 48th Ave`,
          html: `
            <h2>Street cleaning today! 🌊</h2>
            <p>Good morning, neighbor! Today is a <strong>${sideLabel}</strong> street cleaning day on 48th Ave (${schedule}).</p>
            <p>Move your car if it's parked on the ${sideLabel.toLowerCase()} — save yourself a ticket.</p>
            <br>
            <p>— Your Cozy Corner neighbors</p>
            <p style="font-size:12px;color:#888;">Want to stop these reminders? Just reply to this email and we'll take you off the list.</p>
          `,
        })
      )
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected");
    failed.forEach((f) => console.error("Failed to send reminder:", (f as PromiseRejectedResult).reason));

    return new Response(
      JSON.stringify({ side, sent, failed: failed.length, recipients: recipients.length }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-street-cleaning-reminders:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
