const crypto = require("node:crypto");
const { getStore } = require("@netlify/blobs");


const sgMail = require("@sendgrid/mail");
const store = getStore("bookings", {
  consistency: "strong",
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_AUTH_TOKEN,
});


const apiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const operatorEmail = process.env.OPERATOR_EMAIL;
const tokenSecret = process.env.BOOKING_TOKEN_SECRET;

if (apiKey) sgMail.setApiKey(apiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "text/html; charset=utf-8",
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function page({ title, body }) {
  return `<!doctype html>
  <html lang="sv">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; background:#0b1220; color:#e2e8f0; margin:0; padding:28px}
      .card{max-width:720px; margin:0 auto; background:#0f172a; border:1px solid rgba(148,163,184,.2); border-radius:18px; padding:20px}
      .muted{color:#94a3b8}
      .lnk{color:#a5b4fc}
      .grid{display:grid; grid-template-columns:1fr; gap:8px; margin-top:14px}
      @media (min-width:640px){.grid{grid-template-columns:1fr 1fr}}
      .row{background:rgba(148,163,184,.08); border:1px solid rgba(148,163,184,.15); border-radius:14px; padding:12px}
      .k{font-weight:800}
    </style>
  </head>
  <body>
    <div class="card">
      ${body}
    </div>
  </body>
  </html>`;
}

exports.handler = async (event) => {
  try {
    if (!tokenSecret) {
      return { statusCode: 500, headers: corsHeaders, body: page({ title: "Saknar config", body: `<h1>❌ Saknar BOOKING_TOKEN_SECRET</h1>` }) };
    }

    if (!apiKey || !senderEmail) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: page({
          title: "Saknar email-config",
          body: `<h1>❌ Email är inte konfigurerat</h1><p class="muted">Sätt SENDGRID_API_KEY och SENDER_EMAIL i Netlify.</p>`,
        }),
      };
    }

    const qs = event.queryStringParameters || {};
    const action = String(qs.action || "").toLowerCase();
    const id = String(qs.id || "");
    const token = String(qs.token || "");

    if (!id || !token || (action !== "accept" && action !== "deny")) {
      return { statusCode: 400, headers: corsHeaders, body: page({ title: "Ogiltig länk", body: `<h1>❌ Ogiltig länk</h1>` }) };
    }

    const store = getStore("bookings", {
  consistency: "strong",
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_AUTH_TOKEN,
});

    const record = await store.getJSON(id);

    if (!record) {
      return { statusCode: 404, headers: corsHeaders, body: page({ title: "Hittar inte", body: `<h1>❌ Bokning hittas inte</h1>` }) };
    }

    const expected = hmac(`${id}|${record.createdAt}`);
    if (token !== expected) {
      return { statusCode: 403, headers: corsHeaders, body: page({ title: "Fel token", body: `<h1>❌ Länken är inte giltig</h1>` }) };
    }

    if (record.status !== "pending") {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: page({
          title: "Redan hanterad",
          body: `<h1>ℹ️ Redan hanterad</h1><p class="muted">Den här bokningen är redan markerad som <strong>${escapeHtml(record.status)}</strong>.</p>`,
        }),
      };
    }

    const newStatus = action === "accept" ? "accepted" : "denied";
    const updated = { ...record, status: newStatus, decidedAt: new Date().toISOString() };
    await store.setJSON(id, updated);

    // Notify customer about decision
    const subject =
      newStatus === "accepted"
        ? "✅ Din fisketur är bekräftad – Petersfiske"
        : "❌ Bokningsförfrågan – Petersfiske";

    const customerText =
      newStatus === "accepted"
        ? `Hej ${updated.name}!\n\nDin tur är bekräftad 🎣\n\nDetaljer:\n- Paket: ${packageLabel(updated.package)}\n- Datum: ${updated.date}\n- Antal: ${updated.passengers}\n\nPeter hör av sig med plats/tid och sista detaljerna.\n\nTight lines!\n/ Petersfiske`
        : `Hej ${updated.name}!\n\nTyvärr kan Peter inte ta den här förfrågan just nu.\n\nOm du vill: skicka ett nytt datum så löser vi det.\n\n/ Petersfiske`;

    const customerHtml =
      newStatus === "accepted"
        ? `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
            <h2 style="color:#0b2b5b;margin:0 0 12px;">✅ Bokningen är bekräftad</h2>
            <p style="margin:0 0 12px;">Hej <strong>${escapeHtml(updated.name)}</strong>!</p>
            <p style="margin:0 0 16px;">Din tur är bekräftad 🎣 Peter hör av sig med plats/tid och sista detaljerna.</p>
            <div style="background:#f1f5f9;padding:16px;border-radius:12px;">
              <p style="margin:0 0 6px;"><strong>Paket:</strong> ${escapeHtml(packageLabel(updated.package))}</p>
              <p style="margin:0 0 6px;"><strong>Datum:</strong> ${escapeHtml(updated.date)}</p>
              <p style="margin:0;"><strong>Antal:</strong> ${updated.passengers}</p>
            </div>
          </div>`
        : `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
            <h2 style="color:#0b2b5b;margin:0 0 12px;">❌ Förfrågan kunde tyvärr inte bekräftas</h2>
            <p style="margin:0 0 12px;">Hej <strong>${escapeHtml(updated.name)}</strong>!</p>
            <p style="margin:0 0 16px;">Peter kan tyvärr inte ta den här förfrågan just nu. Om du vill kan du skicka ett nytt datum så försöker vi lösa det.</p>
          </div>`;

    const messages = [
      sgMail.send({
        to: updated.email,
        from: senderEmail,
        subject,
        text: customerText,
        html: customerHtml,
      }),
    ];

    if (operatorEmail) {
      messages.push(
        sgMail.send({
          to: operatorEmail,
          from: senderEmail,
          subject: `Bokning ${newStatus.toUpperCase()} – ${updated.date}`,
          text: `Bokningen ${updated.id} är nu ${newStatus}.`,
          html: `<p style="font-family:Arial,sans-serif;">Bokningen <strong>${escapeHtml(updated.id)}</strong> är nu <strong>${escapeHtml(newStatus)}</strong>.</p>`,
        })
      );
    }

    await Promise.all(messages);

    const body = `
      <h1 style="margin:0 0 10px;">${newStatus === "accepted" ? "✅ Accepterad" : "❌ Nekad"}</h1>
      <p class="muted" style="margin:0 0 14px;">Kunden har fått ett automatiskt mail.</p>
      <div class="grid">
        <div class="row"><div class="k">Datum</div><div>${escapeHtml(updated.date)}</div></div>
        <div class="row"><div class="k">Paket</div><div>${escapeHtml(packageLabel(updated.package))}</div></div>
        <div class="row"><div class="k">Personer</div><div>${updated.passengers}</div></div>
        <div class="row"><div class="k">Namn</div><div>${escapeHtml(updated.name)}</div></div>
      </div>
      <p class="muted" style="margin:14px 0 0;">Tips: lägg admin-sidan som bokmärke: <span class="lnk">/admin.html</span></p>
    `;

    return { statusCode: 200, headers: corsHeaders, body: page({ title: "Klart", body }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers: corsHeaders, body: page({ title: "Fel", body: `<h1>❌ Något gick fel</h1><p class="muted">${escapeHtml(error.message || "Unknown")}</p>` }) };
  }
};
