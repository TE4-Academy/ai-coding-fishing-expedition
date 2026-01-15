const form = document.getElementById("booking-form");
const messageDiv = document.getElementById("form-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  const originalText = button.innerText;
  button.disabled = true;
  button.innerText = "Skickar...";

  const data = new FormData(form);
  const json = Object.fromEntries(data);

  try {
    const response = await fetch("/.netlify/functions/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.details || "Submission failed");

    form.reset();
    messageDiv.innerHTML =
      "<p class='text-green-600 font-medium'>✅ Förfrågan skickad! Du får en automatisk bekräftelse i din e-post. Peter kollar och återkommer så snart han kan.</p>";
    messageDiv.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    messageDiv.innerHTML =
      `<p class='text-red-600'>❌ Något gick fel. ${error.message ? `(${error.message})` : ""} Försök igen.</p>`;
  }
});
