const sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const booking = JSON.parse(event.body);

    // 1. Save to JSON
    // Note: In production serverless, persistent file storage is tricky. 
    // This works for the MVP demo but data resets on new deployments.
    const dataDir = path.join(__dirname, "../data");
    const bookingsPath = path.join(dataDir, "bookings.json");
    
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    // Ensure file exists (create if not)
    if (!fs.existsSync(bookingsPath)) {
        fs.writeFileSync(bookingsPath, "[]");
    }

    const bookings = JSON.parse(fs.readFileSync(bookingsPath, "utf8"));
    booking.id = Date.now();
    booking.status = "pending";
    booking.created_at = new Date().toISOString();
    bookings.push(booking);
    fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));

    // 2. Send Email
    const msg = {
      to: booking.email,
      from: "operator@example.com", // REPLACE THIS with your verified SendGrid sender
      subject: "Booking Received - Stockholm Fishing",
      text: `Hi ${booking.name},\n\nWe have received your booking request for ${booking.passengers} people on ${booking.date}.\n\nThe operator will review your request and send a confirmation shortly.\n\nBest regards,\nStockholm Fishing Expeditions`,
      html: `<p>Hi ${booking.name},</p><p>We have received your booking request for <strong>${booking.passengers} people</strong> on <strong>${booking.date}</strong>.</p><p>The operator will review your request and send a confirmation shortly.</p><p>Best regards,<br>Stockholm Fishing Expeditions</p>`,
    };

    await sgMail.send(msg);

    return { statusCode: 200, body: JSON.stringify({ message: "Booking saved and email sent", id: booking.id }) };

  } catch (error) {
    console.error("Error processing booking:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};