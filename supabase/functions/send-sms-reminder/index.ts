import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/twilio';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  if (!LOVABLE_API_KEY) {
    return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY is not configured' }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  const TWILIO_API_KEY = Deno.env.get('TWILIO_API_KEY');
  if (!TWILIO_API_KEY) {
    return new Response(JSON.stringify({ error: 'TWILIO_API_KEY is not configured' }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  const TWILIO_FROM_NUMBER = Deno.env.get('TWILIO_FROM_NUMBER');
  if (!TWILIO_FROM_NUMBER) {
    return new Response(JSON.stringify({ error: 'TWILIO_FROM_NUMBER is not configured' }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  try {
    const { action, phone, message } = await req.json();

    // Validate phone number format (E.164)
    const phoneRegex = /^\+1\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return new Response(JSON.stringify({ error: 'Invalid phone number. Use E.164 format: +1XXXXXXXXXX' }), {
        status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    if (action === 'send_reminder') {
      // Send an SMS reminder
      const smsBody = message || "🧹 Street cleaning reminder! Don't forget to move your car today. — Your neighbors on 48th Ave";

      const response = await fetch(`${GATEWAY_URL}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': TWILIO_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: phone,
          From: TWILIO_FROM_NUMBER,
          Body: smsBody,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Twilio API error [${response.status}]: ${JSON.stringify(data)}`);
      }

      console.log(`SMS sent to ${phone}: SID ${data.sid}`);
      return new Response(JSON.stringify({ success: true, sid: data.sid }), {
        status: 200, headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    if (action === 'send_confirmation') {
      // Send a welcome/confirmation SMS
      const sides: string[] = [];
      if (message?.east_side) sides.push("East Side (1st & 3rd Friday)");
      if (message?.west_side) sides.push("West Side (1st & 3rd Tuesday)");

      const confirmBody = `🌊 Welcome to 48th Ave street cleaning SMS reminders! You'll get a text at 8am on cleaning days for: ${sides.join(" & ")}. Reply STOP to unsubscribe.`;

      const response = await fetch(`${GATEWAY_URL}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': TWILIO_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: phone,
          From: TWILIO_FROM_NUMBER,
          Body: confirmBody,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Twilio API error [${response.status}]: ${JSON.stringify(data)}`);
      }

      console.log(`Confirmation SMS sent to ${phone}: SID ${data.sid}`);
      return new Response(JSON.stringify({ success: true, sid: data.sid }), {
        status: 200, headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error: unknown) {
    console.error("Error in send-sms-reminder:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
};

serve(handler);
