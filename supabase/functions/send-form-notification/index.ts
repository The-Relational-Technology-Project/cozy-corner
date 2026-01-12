import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormNotificationRequest {
  formType: string;
  formData: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, formData }: FormNotificationRequest = await req.json();
    
    console.log(`Received notification request for form type: ${formType}`);

    let subject = "";
    let htmlContent = "";

    switch (formType) {
      case "contact":
        subject = "New Contact Form Submission";
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `;
        break;

      case "disaster_checkin":
        subject = "New Disaster Check-In Request";
        htmlContent = `
          <h2>New Disaster Check-In Request</h2>
          <p><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Contact Info:</strong> ${formData.contact_info || 'Not provided'}</p>
          <p><strong>Vulnerable Count:</strong> ${formData.vulnerable_count}</p>
          <p><strong>Specific Needs:</strong> ${formData.specific_needs || 'None'}</p>
          <p><strong>Language Preference:</strong> ${formData.language_preference}</p>
          <p><strong>Completing on behalf:</strong> ${formData.completing_on_behalf ? 'Yes' : 'No'}</p>
        `;
        break;

      case "coupon_claim":
        subject = "New Coupon Claim";
        htmlContent = `
          <h2>New Coupon Claim</h2>
          <p><strong>Coupon Title:</strong> ${formData.coupon_title}</p>
          <p><strong>Claimer Name:</strong> ${formData.claimer_name || 'Not provided'}</p>
          <p><strong>Claimer Email:</strong> ${formData.claimer_email || 'Not provided'}</p>
        `;
        break;

      case "coupon_contribute":
        subject = "New Coupon Contribution";
        htmlContent = `
          <h2>New Coupon Contribution</h2>
          <p><strong>Title:</strong> ${formData.title}</p>
          <p><strong>Description:</strong> ${formData.description}</p>
          <p><strong>Icon:</strong> ${formData.icon}</p>
          <p><strong>Availability:</strong> ${formData.availability || 'Not specified'}</p>
          <p><strong>Contributor Name:</strong> ${formData.contributor_name || 'Anonymous'}</p>
          <p><strong>Contributor Email:</strong> ${formData.contributor_email || 'Not provided'}</p>
        `;
        break;

      case "street_cleaning":
        subject = "New Street Cleaning Subscription";
        htmlContent = `
          <h2>New Street Cleaning Subscription</h2>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>East Side:</strong> ${formData.east_side ? 'Yes' : 'No'}</p>
          <p><strong>West Side:</strong> ${formData.west_side ? 'Yes' : 'No'}</p>
        `;
        break;

      case "event_suggestion":
        subject = "New Event Suggestion";
        htmlContent = `
          <h2>New Event Suggestion</h2>
          <p><strong>Event Title:</strong> ${formData.event_title}</p>
          <p><strong>Event Description:</strong> ${formData.event_description || 'Not provided'}</p>
          <p><strong>Suggested Date:</strong> ${formData.suggested_date || 'Not specified'}</p>
          <p><strong>Suggested Location:</strong> ${formData.suggested_location || 'Not specified'}</p>
          <p><strong>Name:</strong> ${formData.name || 'Anonymous'}</p>
          <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
          <p><strong>Contact Info:</strong> ${formData.contact_info || 'Not provided'}</p>
        `;
        break;

      case "block_party_idea":
        subject = "New Block Party Idea";
        htmlContent = `
          <h2>New Block Party Idea</h2>
          <p><strong>Idea:</strong> ${formData.idea}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        `;
        break;

      case "neighborhood_contribution":
        subject = "New Neighborhood Contribution";
        htmlContent = `
          <h2>New Neighborhood Contribution</h2>
          <p><strong>Type:</strong> ${formData.contribution_type}</p>
          <p><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          ${formData.suggested_idea ? `<p><strong>Suggested Idea:</strong> ${formData.suggested_idea}</p>` : ''}
          ${formData.existing_idea ? `<p><strong>Existing Idea:</strong> ${formData.existing_idea}</p>` : ''}
          ${formData.message ? `<p><strong>Message:</strong> ${formData.message}</p>` : ''}
          ${formData.availability ? `<p><strong>Availability:</strong> ${formData.availability}</p>` : ''}
        `;
        break;

      case "new_neighbor_signup":
        subject = "🏠 New Neighbor Signup!";
        htmlContent = `
          <h2>New Neighbor Signup</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          <p><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
          <p><strong>Wants WhatsApp:</strong> ${formData.wants_whatsapp ? 'Yes' : 'No'}</p>
          ${formData.welcome_message ? `<p><strong>Message to Josh:</strong> ${formData.welcome_message}</p>` : ''}
          ${formData.ideas ? `<p><strong>Ideas:</strong> ${formData.ideas}</p>` : ''}
        `;
        break;

      default:
        throw new Error(`Unknown form type: ${formType}`);
    }

    const emailResponse = await resend.emails.send({
      from: "Relational Tech Project <notifications@relationaltechproject.org>",
      to: ["joshuanesbit@gmail.com"],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-form-notification function:", error);
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
