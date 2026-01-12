# 4-Hour MVP Sprint - Team Collaboration Guide

## The Goal (Do This, Nothing Else)

**By end of today (4 hours)**:

1. ✅ Working homepage with booking form
2. ✅ Form submits to Netlify Function
3. ✅ Function saves booking + sends email
4. ✅ Deploy to live URL
5. ✅ Manual test (fill form → receive email)

Everything else = **DEFER TO LATER**.

---

## Team Structure (Keep It Simple)

**9 people → 3 groups of 3, 1 on standby**

| Group         | Task                     | People | Deliverable                  | Time      |
| ------------- | ------------------------ | ------ | ---------------------------- | --------- |
| **Frontend**  | Homepage + Booking Form  | 3      | `index.html` + form working  | 1.5h      |
| **Backend**   | Netlify Function + Email | 2      | POST endpoint saves + emails | 1.5h      |
| **DevOps/QA** | Deploy + Test            | 3      | Live URL + verified working  | 1h        |
| **Reserve**   | Unblock others           | 1      | Help troubleshoot            | As needed |

---

## Frontend Group (3 people, 1.5 hours)

### What to Build

**Single page**: `index.html` with:

- Minimal hero ("Book your fishing trip")
- Booking form (5 fields: name, email, phone, date, passengers)
- Submit button
- Success message on submit

**Styling**: Use Tailwind CDN. Make it look OK, not perfect.

### Tasks

**Person 1: HTML Structure** (30 min)

```html
<form id="booking-form">
  <input type="text" name="name" placeholder="Your name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" required />
  <input type="date" name="date" required />
  <input type="number" name="passengers" min="1" max="5" required />
  <button type="submit">Book Now</button>
</form>
```

**Person 2: Styling** (30 min)

- Add Tailwind CDN to `<head>`
- Style form (center, spacing, button)
- Basic mobile responsive (no fancy breakpoints)

**Person 3: Form Handler** (30 min)

```javascript
const form = document.getElementById("booking-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const json = Object.fromEntries(data);

  const response = await fetch("/functions/send-confirmation", {
    method: "POST",
    body: JSON.stringify(json),
  });

  if (response.ok) {
    document.body.innerHTML += "<p>✅ Booking submitted! Check email.</p>";
  }
});
```

### AI Prompts (Use These)

```
1. "Generate HTML5 form with name, email, phone, date, passengers fields using Tailwind CSS"
2. "Create vanilla JavaScript form submission handler that POSTs to /functions/send-confirmation"
3. "Make form responsive on mobile using Tailwind (no breakpoints, just flexbox)"
```

---

## Backend Group (2 people, 1.5 hours)

### What to Build

**One Netlify Function**: `functions/send-confirmation.js`

Does 3 things:

1. Receives POST with booking data
2. Saves to `data/bookings.json`
3. Calls SendGrid to send email

### Tasks

**Person 1: Function Template + SendGrid** (45 min)

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const booking = JSON.parse(event.body);

  const msg = {
    to: booking.email,
    from: "operator@example.com",
    subject: "Booking Confirmed",
    text: `Hi ${booking.name}, your booking for ${booking.passengers} people on ${booking.date} is pending approval.`,
  };

  await sgMail.send(msg);
  return { statusCode: 200, body: "Email sent" };
};
```

**Person 2: Save to JSON** (45 min)

```javascript
const fs = require("fs");
const path = require("path");

// Before sending email, add:
const bookingsPath = path.join(__dirname, "../data/bookings.json");
const bookings = JSON.parse(fs.readFileSync(bookingsPath, "utf8"));
booking.id = Date.now();
booking.status = "pending";
bookings.push(booking);
fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
```

### Data File (`data/bookings.json`)

Start with empty array:

```json
[]
```

### AI Prompts

```
1. "Create Netlify Function that receives POST, validates data, calls SendGrid to send email"
2. "Write Node.js code to read/append to JSON file"
3. "Generate SendGrid email template for booking confirmation"
```

---

## DevOps/QA Group (3 people, 1 hour)

**Person 1 (DevOps)**: Setup only

- [ ] GitHub repo: `git init`, push to remote
- [ ] Netlify: Connect repo, add env var `SENDGRID_API_KEY`
- [ ] Create `.env.example` with placeholder keys

**Person 2 (QA)**: Test the flow

- [ ] Fill form → submit → watch network tab (POST goes to function)
- [ ] Check email inbox for confirmation
- [ ] Check `data/bookings.json` has new entry
- [ ] Document any errors in GitHub Issues

**Person 3 (Blockers)**: Help unblock

- If Frontend stuck on form → ask AI for code example
- If Backend stuck on SendGrid → verify API key is set
- If Netlify won't deploy → check netlify.toml syntax

### Minimal Netlify Config (netlify.toml)

```toml
[build]
command = "echo 'No build step'"
publish = "."

[[redirects]]
from = "/functions/*"
to = "/.netlify/functions/:splat"
status = 200
```

### AI Prompts

```
1. "How do I deploy a GitHub repo to Netlify with serverless functions?"
2. "Check this SendGrid API call for syntax errors: [paste code]"
3. "What does this Netlify error mean: [paste error]"
```

---

## Quick Timeline (Keep to It!)

| Time          | What Happens                                 |
| ------------- | -------------------------------------------- |
| **0:00-0:05** | All groups: Read this guide, ask questions   |
| **0:05-0:15** | DevOps: Push repo to GitHub, connect Netlify |
| **0:15-1:45** | Frontend & Backend: Code in parallel         |
| **1:45-2:45** | Merge code, QA tests end-to-end              |
| **2:45-3:00** | Fix critical bugs (if any)                   |
| **3:00-4:00** | Buffer/polish                                |

**Hard stop at 4:00**. Deploy and call it done.

---

## Blockers? Do This (In Order)

### "I don't know how to start"

→ Ask AI this exact prompt:

```
I'm building [component]. I need to:
[list 2-3 things]

Give me a working code example I can copy-paste.
```

### "My code has an error"

→ Copy error message + code snippet, ask AI:

```
This code gives this error: [error]
[paste code]

What's wrong and how do I fix it?
```

### "Netlify says 'function not found'"

→ Check:

1. Function file in `functions/` folder?
2. Filename matches URL? (`/functions/send-confirmation` → `functions/send-confirmation.js`)
3. `netlify.toml` redirects are correct?

### "SendGrid email not arriving"

→ Check:

1. API key in Netlify env vars? (Settings → Build & Deploy → Environment)
2. `from` email is valid?
3. Check SendGrid dashboard for bounces

---

## What's **NOT** in Scope (Do Not Build)

❌ Admin dashboard  
❌ Reminders (3-day, 1-day emails)  
❌ Cancellation flow  
❌ Date validation (just use HTML5 `<input type="date">`)  
❌ Approval workflow (manual for now)  
❌ Responsive breakpoints (just mobile-first flexbox)  
❌ Accessibility audit  
❌ Multi-page site  
❌ Database (JSON only)

**These go in Phase 2** (if time permits, or next sprint).

---

## File Structure (That's It)

```
fishing-expedition/
├── index.html                 # Form + hero (Frontend)
├── css/styles.css             # Tailwind CDN link in HTML (Frontend)
├── js/booking-form.js         # Form handler (Frontend)
├── functions/
│   └── send-confirmation.js   # POST endpoint (Backend)
├── data/
│   └── bookings.json          # Starts empty [] (Backend)
├── netlify.toml               # Deploy config (DevOps)
└── .gitignore                 # Minimal (DevOps)
```

---

## Slack / Chat Checklist

**Before you start**: Post in team chat

```
✅ I'm in [Frontend/Backend/DevOps] group
✅ I'm working on [specific task]
✅ I have SendGrid API key / GitHub access / Netlify connected
```

**If stuck**: Post in #blockers

```
🚨 BLOCKER: [one sentence problem]
I've tried: [what you tried]
Code/error: [paste relevant code or error message]
```

**When done**: Post in #wins

```
✅ [Task] complete
Next: [What's next for this group]
```

---

## Success = This Works

By end of 4 hours, this should happen:

1. Go to live Netlify URL
2. Fill booking form (name, email, phone, date, passengers)
3. Click "Book Now"
4. See "✅ Booking submitted! Check email."
5. Check email inbox → see confirmation from operator
6. Check `data/bookings.json` → see new entry with all details

If all 5 work → **MVP complete**. Ship it.

---

## If You Finish Early

Only pick ONE (in this order):

1. Add date validation: `<input type="date" min="..." max="...">`
2. Add error message display if form fails
3. Add operator email notification (send duplicate email to operator)
4. Write README.md with setup instructions

**Do NOT**:

- Refactor code for "cleanliness"
- Add CSS animations
- Build admin dashboard
- Change tech stack

---

## Remember

- **Simple code > Perfect code**
- **Working > Pretty**
- **Done > Not done**
- **Ask AI, not Stack Overflow** (faster)
- **If stuck > Ask for help, don't debug 30 min**

Go build. 4 hours. Let's go. 🚀
