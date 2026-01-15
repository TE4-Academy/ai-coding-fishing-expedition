const store = getStore("bookings", {
  consistency: "strong",
  siteID: process.env.NETLIFY_SITE_ID,
  token: process.env.NETLIFY_AUTH_TOKEN,
});


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const store = getStore("bookings", { consistency: "strong" });
    const status = String(event.queryStringParameters?.status || "").toLowerCase();
    const { blobs } = await store.list();

    const items = await Promise.all(
      blobs.map(async (b) => {
        const rec = await store.getJSON(b.key);
        return rec || null;
      })
    );

    const cleaned = items
      .filter(Boolean)
      .filter((r) => (status ? String(r.status || "").toLowerCase() === status : true))
      .sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.createdAt).localeCompare(String(b.createdAt)));

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ bookings: cleaned }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Failed", details: error.message }) };
  }
};
