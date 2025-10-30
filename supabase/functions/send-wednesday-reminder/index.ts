import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Sending Wednesday reminder email...");

    const emailResponse = await resend.emails.send({
      from: "Josh Nesbit <joshuanesbit@gmail.com>",
      reply_to: "joshuanesbit@gmail.com",
      to: ["jeffnesbit@gmail.com"],
      subject: "Wednesday Reminder",
      html: `
        <h2>Wednesday Reminder</h2>
        <p>This is your automated Wednesday morning reminder.</p>
        <p>Have a great day!</p>
        <br>
        <p>Best,<br>Josh</p>
      `,
    });

    console.log("Wednesday reminder email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-wednesday-reminder function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
