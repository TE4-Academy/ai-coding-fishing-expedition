const form = document.getElementById("booking-form");
const messageDiv = document.getElementById("form-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Disable button to prevent double submit
  const button = form.querySelector('button');
  const originalText = button.innerText;
  button.disabled = true;
  button.innerText = "Booking...";

  const data = new FormData(form);
  const json = Object.fromEntries(data);

  try {
const response = await fetch("/.netlify/functions/send-confirmation", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(json),
});

    if (response.ok) {
      form.reset();
      messageDiv.innerHTML = "<p class='text-green-600 font-medium'>✅ Booking submitted! Check your email for confirmation.</p>";
      messageDiv.classList.remove("hidden");
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error(error);
    messageDiv.innerHTML = "<p class='text-red-600'>❌ Something went wrong. Please try again.</p>";
    messageDiv.classList.remove("hidden");
  } finally {
    button.disabled = false;
    button.innerText = originalText;
  }
});