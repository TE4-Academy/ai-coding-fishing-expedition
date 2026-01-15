const crypto = require("node:crypto");
const { getStore } = require("@netlify/blobs");


const sgMail = require("@sendgrid/mail");



// Environment variables
const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const operatorEmail = process.env.OPERATOR_EMAIL;
const tokenSecret = process.env.BOOKING_TOKEN_SECRET;

if (apiKey) sgMail.setApiKey(apiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function hmac(input) {
  return crypto.createHmac("sha256", tokenSecret).update(input).digest("hex");
}

function packageLabel(pkg) {
  const map = {
    prova: "Prova-på (1 timme)",
    halvdag: "Halvdagstur (3 timmar)",
    heldag: "Heldagsäventyr (6 timmar)",
  };
  return map[pkg] || pkg || "—";
}

exports.handler = async (event) => {
  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Server configuration error",
          details: "Email service not configured. Set SENDGRID_API_KEY in Netlify env vars.",
        }),
      };
      const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_AUTH_TOKEN;

if (!siteID || !token) {
  return {
    statusCode: 500,
    headers: corsHeaders,
    body: JSON.stringify({
      error: "Server configuration error",
      details: "Missing NETLIFY_SITE_ID or NETLIFY_AUTH_TOKEN for Netlify Blobs.",
    }),
  };
}

const store = getStore("bookings", {
  consistency: "strong",
  siteID,
  token,
});

    }

    
    if (!senderEmail) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Server configuration error",
          details: "Sender email not configured. Set SENDER_EMAIL in Netlify env vars.",
        }),
      };
    }

    if (!operatorEmail) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Server configuration error",
          details: "Operator email not configured. Set OPERATOR_EMAIL (Peters mail) in Netlify env vars.",
        }),
      };
    }

    if (!tokenSecret) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Server configuration error",
          details: "Missing BOOKING_TOKEN_SECRET in Netlify env vars.",
        }),
      };
    }

    const booking = JSON.parse(event.body || "{}") || {};

    // Basic validation
    const required = ["name", "email", "phone", "date", "passengers", "package", "experience"];
    const missing = required.filter((k) => !booking[k]);
    if (missing.length) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Missing required fields", details: missing.join(", ") }),
      };
    }

    const passengersNum = Number(booking.passengers);
    if (!Number.isFinite(passengersNum) || passengersNum < 1 || passengersNum > 5) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Invalid passengers", details: "passengers must be 1–5" }),
      };
    }

    const bookingId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const record = {
      id: bookingId,
      createdAt,
      status: "pending",
      name: String(booking.name).trim(),
      email: String(booking.email).trim(),
      phone: String(booking.phone).trim(),
      date: String(booking.date),
      passengers: passengersNum,
      package: String(booking.package),
      experience: String(booking.experience),
      notes: String(booking.notes || "").trim(),
    };

    // Persist to Netlify Blobs
    const store = getStore("bookings", {
  consistency: "strong",
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_AUTH_TOKEN,
});

    await store.setJSON(bookingId, record);

    // Secure action token for accept/deny links
    const token = hmac(`${bookingId}|${record.createdAt}`);

    // Helpful base URL
    const host = event.headers?.["x-forwarded-host"] || event.headers?.host;
    const proto = event.headers?.["x-forwarded-proto"] || "https";
    const baseUrl = host ? `${proto}://${host}` : "";

    const acceptUrl = `${baseUrl}/.netlify/functions/manage-booking?action=accept&id=${encodeURIComponent(
      bookingId
    )}&token=${encodeURIComponent(token)}`;
    const denyUrl = `${baseUrl}/.netlify/functions/manage-booking?action=deny&id=${encodeURIComponent(
      bookingId
    )}&token=${encodeURIComponent(token)}`;

    // Customer mail (received)
    const customerMsg = {
      to: record.email,
      from: senderEmail,
      subject: "Bokningsförfrågan mottagen – Petersfiske",
      text: `Hej ${record.name}!

Vi har tagit emot din bokningsförfrågan.

Detaljer:
- Paket: ${packageLabel(record.package)}
- Datum: ${record.date}
- Antal personer: ${record.passengers}
- Telefon: ${record.phone}

Peter återkommer så snart han har kollat läget.

Tight lines!
/ Petersfiske`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <h2 style="color:#0b2b5b; margin:0 0 12px;">✅ Bokningsförfrågan mottagen</h2>
          <p style="margin:0 0 12px;">Hej <strong>${escapeHtml(record.name)}</strong>!</p>
          <p style="margin:0 0 16px;">Vi har tagit emot din förfrågan och Peter återkommer så snart han har kollat läget.</p>
          <div style="background:#f1f5f9; padding:16px; border-radius:12px;">
            <p style="margin:0 0 6px;"><strong>Paket:</strong> ${escapeHtml(packageLabel(record.package))}</p>
            <p style="margin:0 0 6px;"><strong>Datum:</strong> ${escapeHtml(record.date)}</p>
            <p style="margin:0 0 6px;"><strong>Antal personer:</strong> ${record.passengers}</p>
            <p style="margin:0;"><strong>Telefon:</strong> ${escapeHtml(record.phone)}</p>
          </div>
          <p style="color:#64748b; font-size: 13px; margin:16px 0 0;">Det här är en förfrågan – du får en separat bekräftelse när turen är godkänd.</p>
        </div>
      `,
    };

    // Operator mail with accept/deny
    const operatorMsg = {
      to: operatorEmail,
      from: senderEmail,
      subject: `Ny bokningsförfrågan – ${record.date}`,
      text: `Ny bokningsförfrågan:

Namn: ${record.name}
Email: ${record.email}
Telefon: ${record.phone}
Datum: ${record.date}
Paket: ${packageLabel(record.package)}
Personer: ${record.passengers}
Nivå: ${record.experience}
Anteckningar: ${record.notes || "-"}

Acceptera: ${acceptUrl}
Neka: ${denyUrl}

ID: ${record.id}
Skapad: ${record.createdAt}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto;">
          <h2 style="color:#0b2b5b; margin:0 0 12px;">🎣 Ny bokningsförfrågan</h2>
          <div style="background:#f1f5f9; padding:16px; border-radius:12px;">
            <p style="margin:0 0 6px;"><strong>Datum:</strong> ${escapeHtml(record.date)}</p>
            <p style="margin:0 0 6px;"><strong>Paket:</strong> ${escapeHtml(packageLabel(record.package))}</p>
            <p style="margin:0 0 6px;"><strong>Personer:</strong> ${record.passengers}</p>
            <p style="margin:0 0 6px;"><strong>Namn:</strong> ${escapeHtml(record.name)}</p>
            <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(record.email)}</p>
            <p style="margin:0 0 6px;"><strong>Telefon:</strong> ${escapeHtml(record.phone)}</p>
            <p style="margin:0 0 6px;"><strong>Nivå:</strong> ${escapeHtml(record.experience)}</p>
            <p style="margin:0;"><strong>Anteckningar:</strong> ${escapeHtml(record.notes || "-")}</p>
          </div>

          <div style="margin:16px 0 0; display:flex; gap:10px; flex-wrap:wrap;">
            <a href="${acceptUrl}" style="background:#16a34a;color:white;padding:12px 16px;border-radius:12px;text-decoration:none;font-weight:800;">✅ Acceptera</a>
            <a href="${denyUrl}" style="background:#dc2626;color:white;padding:12px 16px;border-radius:12px;text-decoration:none;font-weight:800;">❌ Neka</a>
          </div>

          <p style="color:#64748b; font-size: 12px; margin:16px 0 0;">ID: ${escapeHtml(record.id)} • Skapad: ${escapeHtml(record.createdAt)}</p>
        </div>
      `,
    };

    await Promise.all([sgMail.send(customerMsg), sgMail.send(operatorMsg)]);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Booking saved", id: bookingId }),
    };
  } catch (error) {
    console.error("Error processing booking:", error);

    let details = error?.message || "Unknown error";
    if (error?.response?.body?.errors) {
      details = error.response.body.errors.map((e) => e.message).join(", ");
    }

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to process booking", details }),
    };
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
