const sgMail = require("@sendgrid/mail");

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const operatorEmail = process.env.OPERATOR_EMAIL;

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

exports.handler = async (event) => {
  console.log("Function called with method:", event.httpMethod);
  
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  try {
    // Check if environment variables are set
    if (!apiKey) {
      console.error("SENDGRID_API_KEY is not configured");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: "Server configuration error",
          details: "Email service not configured. Please set SENDGRID_API_KEY in Netlify environment variables."
        })
      };
    }

    if (!senderEmail) {
      console.error("SENDER_EMAIL is not configured");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: "Server configuration error",
          details: "Sender email not configured. Please set SENDER_EMAIL in Netlify environment variables."
        })
      };
    }

    const booking = JSON.parse(event.body);
    console.log("Received booking:", booking);
    
    // Basic validation
    if (!booking.name || !booking.email || !booking.date || !booking.passengers) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    // Generate booking ID and metadata
    const bookingId = Date.now();
    const createdAt = new Date().toISOString();

    console.log("Attempting to send emails...");

    // Send confirmation email to customer
    const customerMsg = {
      to: booking.email,
      from: senderEmail,
      subject: "Booking Received - Stockholm Fishing Expeditions",
      text: `Hi ${booking.name},

We have received your booking request for ${booking.passengers} people on ${booking.date}.

Booking Details:
- Name: ${booking.name}
- Email: ${booking.email}
- Phone: ${booking.phone}
- Date: ${booking.date}
- Passengers: ${booking.passengers}
- Booking ID: ${bookingId}

The operator will review your request and send a confirmation shortly.

Best regards,
Stockholm Fishing Expeditions`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">Booking Confirmation</h2>
          <p>Hi ${booking.name},</p>
          <p>We have received your booking request for <strong>${booking.passengers} people</strong> on <strong>${booking.date}</strong>.</p>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Passengers:</strong> ${booking.passengers}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
          </div>
          
          <p>The operator will review your request and send a confirmation shortly.</p>
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">Best regards,<br>Stockholm Fishing Expeditions</p>
        </div>
      `,
    };

    // Send notification email to operator (if configured)
    const messages = [customerMsg];
    
    if (operatorEmail) {
      const operatorMsg = {
        to: operatorEmail,
        from: senderEmail,
        subject: `New Booking Request - ${booking.date}`,
        text: `New booking request received:

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Date: ${booking.date}
Passengers: ${booking.passengers}
Booking ID: ${bookingId}
Created: ${createdAt}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">New Booking Request</h2>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${booking.name}</p>
              <p><strong>Email:</strong> ${booking.email}</p>
              <p><strong>Phone:</strong> ${booking.phone}</p>
              <p><strong>Date:</strong> ${booking.date}</p>
              <p><strong>Passengers:</strong> ${booking.passengers}</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Created:</strong> ${createdAt}</p>
            </div>
          </div>
        `,
      };
      messages.push(operatorMsg);
    }

    // Send emails
    await Promise.all(messages.map(msg => sgMail.send(msg)));
    
    console.log("Emails sent successfully");

    return { 
      statusCode: 200, 
      headers,
      body: JSON.stringify({ 
        message: "Booking saved and confirmation email sent", 
        id: bookingId 
      }) 
    };

  } catch (error) {
    console.error("Error processing booking:", error);
    
    // More detailed error for SendGrid issues
    let errorMessage = "Failed to process booking";
    let errorDetails = error.message;
    
    if (error.response) {
      console.error("SendGrid error response:", error.response.body);
      errorDetails = error.response.body.errors ? 
        error.response.body.errors.map(e => e.message).join(", ") : 
        error.response.body;
    }
    
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        details: errorDetails
      }) 
    };
  }
};