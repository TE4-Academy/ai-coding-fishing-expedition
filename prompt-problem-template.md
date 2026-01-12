You are my coding assistant.

Project idea:
Stockholm-based exclusive fishing trip booking system. Single operator offers 1-trip-per-day exclusive service (1-5 customers max per trip). Customers self-serve book trips online, with operator managing approvals and availability. Includes homepage describing packages, booking calendar, email confirmations with configurable reminders, and admin dashboard for operator oversight.

Users:

- **End users (customers)**: Browse packages → book trip → receive confirmation email → get reminders → option to cancel/reschedule via email link
- **Admin (operator)**: Review pending bookings → approve/reject → see all booking states → configure reminder timing & cancellation rules

Goal (one sentence):
Enable customers to self-serve book exclusive fishing trips with email confirmations and operator approval workflow, freeing the operator from manual scheduling.

Must have:

- Public homepage with 2-3 fishing package descriptions (duration, price info, what's included)
- Booking form with date/time picker (availability: 3 months ahead, min 1 week before trip)
- Email confirmation on booking submission (plain text or basic HTML)
- Admin dashboard: pending bookings list, approve/reject actions, view all booked trips with status
- Cancel/reschedule functionality via unique email link (rules configurable: e.g., min 7 days before)
- Data persistence (JSON file with bookings & config)
- Configurable reminder emails (send 3 days before & 1 day before trip)
- Simple email sending (use free service: Netlify Functions, SendGrid free tier, or serverless alternative)

Nice to have:

- Auto-calculate available dates (exclude booked dates, weekends optional)
- Customer dashboard to view their own bookings
- Admin ability to edit/delete bookings
- Booking confirmation number in emails
- SMS reminders (if email service allows)
- Analytics: bookings per month, occupancy rate

Constraints:

- Platform: Web (HTML5, ES6 JavaScript, Tailwind CSS)
- Hosting: GitHub + Netlify (free tier)
- Data storage: Simple JSON files (no database)
- No paid external services (use free tier email service only)
- No npm dependencies beyond Tailwind CLI if needed
- Keep it simple: modular, readable, beginner-friendly code
- One operator, small volume (~5-10 bookings/month expected)

Output exactly:

1. 5 clarification questions (ANSWERED ✓)
2. A 6-step build plan (each step names files/modules)
3. A minimal folder structure
4. Acceptance criteria checklist
   Keep it concise.
