# Fishing Expedition Booking System - Complete Build Brief

## Project Overview

Stockholm-based exclusive fishing trip booking system. Single operator, 1 trip/day, 1-5 customers max. Self-serve booking with operator approval workflow, email confirmations, and configurable reminders.

---

## 6-Step Build Plan

### Step 1: Foundation & Data Model

**Files/Modules**: `data/bookings.json`, `data/config.json`, `data/packages.json`

- Create JSON schema for bookings (id, date, time, customer name/email/phone, status, passenger count)
- Create config schema (reminder timings, cancellation rules, operator email, packages)
- Create package definitions (name, description, duration, capacity, price display)

### Step 2: Static Homepage & Package Display

**Files/Modules**: `index.html`, `css/styles.css`, `css/tailwind.config.js`

- Build responsive homepage with header, hero, package cards (Tailwind)
- Display each package with description, max capacity, duration, "Book Now" CTA
- Static page structure, no dynamic rendering yet

### Step 3: Booking Form & Validation

**Files/Modules**: `js/booking-form.js`, `js/validation.js`, `html/booking-page.html`

- Create booking form: name, email, phone, package select, date/time picker
- Client-side validation (email format, date within 1 week to 3 months, passenger count 1-5)
- Form submission handler (serialize to JSON)
- Unique booking ID generation

### Step 4: Email Confirmation & Admin Submission

**Files/Modules**: `js/email-handler.js`, `functions/send-confirmation.js` (Netlify Function)

- On form submit: save booking to `bookings.json` with status "pending"
- Trigger email confirmation to customer (include cancellation link with unique token)
- Email notification to operator about new pending booking
- Generate unique cancel/reschedule token per booking

### Step 5: Admin Dashboard & Approval Workflow

**Files/Modules**: `admin/index.html`, `js/admin-dashboard.js`, `functions/approve-booking.js`, `functions/reject-booking.js`

- Admin login (simple: hardcoded password or token in localStorage for MVP)
- Display pending/approved/cancelled bookings with customer details
- Approve/reject buttons → update status in `bookings.json`
- View all bookings filtered by status
- Manual email trigger for reminders (or auto-schedule)

### Step 6: Reminders & Cancellation System

**Files/Modules**: `functions/send-reminders.js`, `functions/process-cancellation.js`, `js/cancel-reschedule.js`

- Scheduled function (Netlify cron) to send reminders 3 days & 1 day before trip
- Cancel/reschedule link in emails → unique token validation
- Customer can cancel (status → "cancelled") or request reschedule (status → "pending reschedule")
- Operator approves rescheduled dates via admin dashboard

---

## Minimal Folder Structure

```
fishing-expedition/
├── index.html                    # Homepage
├── booking.html                  # Booking form page
├── admin/
│   └── index.html               # Admin dashboard
├── css/
│   ├── styles.css               # Custom Tailwind styles
│   └── tailwind.config.js        # Tailwind config
├── js/
│   ├── booking-form.js           # Form handling & validation
│   ├── admin-dashboard.js        # Admin dashboard logic
│   ├── validation.js             # Shared validation utilities
│   ├── email-handler.js          # Email-related utilities
│   └── utils.js                  # Helpers (date formatting, token gen)
├── functions/                    # Netlify serverless functions
│   ├── send-confirmation.js      # POST: save booking, send email
│   ├── send-reminders.js         # Scheduled: send reminder emails
│   ├── approve-booking.js        # POST: approve booking
│   ├── reject-booking.js         # POST: reject booking
│   └── process-cancellation.js   # POST: handle cancellation via email link
├── data/
│   ├── bookings.json             # All bookings (created/updated by functions)
│   ├── config.json               # Reminders, cancellation rules, operator email
│   └── packages.json             # Package definitions
└── README.md
```

---

## Acceptance Criteria Checklist

### Phase 1: MVP (Core Booking)

- [ ] Homepage displays 2-3 fishing packages with descriptions
- [ ] Booking form validates: date (1 week - 3 months ahead), passengers (1-5), email format
- [ ] Booking submission creates entry in `bookings.json` with status "pending"
- [ ] Customer receives confirmation email with booking details & cancellation link
- [ ] Operator receives notification email of new pending booking
- [ ] Admin dashboard shows pending/approved bookings with approve/reject actions
- [ ] Operator can approve booking → customer receives approval email
- [ ] Cancel link from email works → booking marked "cancelled"

### Phase 2: Reminders & Rules

- [ ] Config file allows setting reminder timings (3 days, 1 day before)
- [ ] Reminder emails send automatically on correct dates (via scheduled function)
- [ ] Cancellation rules enforced (e.g., min 7 days before trip to cancel)
- [ ] Cancellation denial email sent if customer tries to cancel too close
- [ ] Reschedule request flow works (customer can propose new date)

### Phase 3: Admin & Usability

- [ ] Admin can filter bookings by status (pending/approved/cancelled)
- [ ] Admin can manually trigger reminder emails
- [ ] Admin can view all booked trips with customer info
- [ ] Config file can be edited to adjust reminder times & cancellation windows
- [ ] Responsive design on mobile (Tailwind)
- [ ] All emails are readable and include booking confirmation number

### Technical Requirements

- [ ] No runtime errors in browser console
- [ ] Email sending uses free tier service (e.g., Netlify Functions with SendGrid free)
- [ ] Deployable to Netlify from GitHub repo
- [ ] Data persists in `bookings.json` across sessions
- [ ] Code is readable, modular, documented (for beginners)

---

## Key Implementation Notes

1. **Email Service**: Use **Netlify Functions + SendGrid free tier** (100/day) or **Resend** (free tier). Both have Node.js SDKs.
2. **Date Constraints**:
   - Min: 7 days from today
   - Max: 90 days from today
   - Only 1 trip per day (check `bookings.json` for existing approved bookings on that date)
3. **Token Generation**: Use simple crypto or UUID for cancellation tokens (store in booking record).
4. **Admin Authentication**: For MVP, use localStorage token + hardcoded password (no real auth library).
5. **Data Sync**: Each Netlify Function reads/writes `bookings.json` directly (small volume OK).

---

## Ready for Coding Agent ✓

This brief is **complete, specific, and actionable**. The coding agent can now:

1. Follow the 6-step plan sequentially
2. Reference the exact folder structure
3. Check progress against acceptance criteria
4. Ask focused questions only if clarification is needed on implementation details
