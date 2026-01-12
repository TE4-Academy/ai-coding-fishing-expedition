# Team Collaboration Guide - 4-Hour MVP Sprint

## Overview

9-person team, 1 shared GitHub repo, 4-hour sprint to MVP/POC. Target: Working booking form that captures customer info and sends confirmation email. Inexperienced team = keep it simple, no complexity.

**Hard stop**: 4 hours. Launch what works, fix later.

---

## Team Roles & Responsibilities

### Role 1: **Project Manager** (1 person)

**Primary Role**: Coordinate work, maintain schedule, manage scope.

**AI-Assisted Tasks**:

- Use AI to generate sprint plans, task breakdowns, risk logs
- Prompt AI to create status update templates
- Use AI to draft communication to team

**Key Responsibilities**:

- Review COMPLETE_BRIEF.md and ARCHITECTURE_VALIDATION.md weekly
- Track progress on 6-step build plan
- Maintain GitHub issues/milestones
- Daily 15-min standup notes in Slack
- Escalate blockers immediately

**Prompt Template for PM**:

```
Act as project manager for [sprint]. Review this list of tasks:
[paste tasks]. Identify:
1. Critical path items (must complete before next tasks)
2. Parallel work (can happen simultaneously)
3. Blocker risks (need immediate attention)
Suggest 2-day sprint breakdown.
```

**AI Token Budget**: ~20K/month

---

### Role 2: **Frontend Lead** (2 people - A & B)

**Primary Role**: Build homepage, booking form, styling.

**Responsibilities**:

**Frontend A** (Homepage & Packages):

- index.html: Hero section, navigation, package cards
- CSS: Global styles, Tailwind theme customization
- Assets: Logo, images, design tokens

**Frontend B** (Booking Form & Validation):

- booking.html: Multi-step form (customer details, date/time picker, review)
- js/booking-form.js: Form handling, client-side validation
- js/validation.js: Reusable validators (email, date range, passenger count)

**AI-Assisted Tasks**:

- Generate HTML boilerplate + Tailwind structure
- Create responsive CSS layouts
- Debug form validation logic
- Generate accessibility improvements (ARIA labels, keyboard nav)

**Prompt Template for Frontend**:

```
Create a responsive HTML5 booking form for [feature] with:
- Fields: [list fields]
- Validation rules: [list rules]
- Mobile-first design using Tailwind CSS
- Accessibility: ARIA labels, focus states
Include client-side validation in vanilla JS.
```

**AI Token Budget**: ~30K/month each (60K total)

---

### Role 3: **Backend Lead** (2 people - A & B)

**Primary Role**: Build Netlify Functions, data layer, email integration.

**Responsibilities**:

**Backend A** (Data & Booking Functions):

- data/packages.json, data/config.json schemas
- functions/send-confirmation.js: Booking submission, validation, email trigger
- functions/process-cancellation.js: Cancel/reschedule flow

**Backend B** (Admin & Reminders):

- functions/approve-booking.js, functions/reject-booking.js
- functions/send-reminders.js: Scheduled email logic
- functions/get-bookings.js: Fetch bookings for admin dashboard

**AI-Assisted Tasks**:

- Generate Node.js/SendGrid boilerplate
- Debug JSON file read/write logic
- Test email template rendering
- Create error handling patterns

**Prompt Template for Backend**:

```
Create a Netlify Function that:
- Receives POST request with [data structure]
- Validates [business rules]
- Reads/updates data/bookings.json
- Calls SendGrid API to send [email type]
- Returns [response format]
Include error handling and logging.
```

**AI Token Budget**: ~40K/month each (80K total)

---

### Role 4: **Admin Dashboard Developer** (1 person)

**Primary Role**: Build operator dashboard.

**Responsibilities**:

- admin/index.html: Dashboard layout (pending/approved/cancelled lists)
- js/admin-dashboard.js: Fetch bookings, render UI, handle approve/reject buttons
- Authentication check (localStorage + password validation)
- Styling (Tailwind cards, buttons, status badges)

**AI-Assisted Tasks**:

- Generate dashboard HTML/CSS structure
- Create table/list components for bookings
- Debug DOM manipulation
- Generate modal/confirmation dialogs

**Prompt Template for Admin**:

```
Build an admin dashboard that:
- Shows [list types] of bookings in separate tabs
- Each booking displays: [fields]
- Actions: Approve, Reject, View Details
- Filter/search by [criteria]
- Authentication: Check localStorage for token
Use Tailwind CSS for styling, vanilla JS for interactivity.
```

**AI Token Budget**: ~25K/month

---

### Role 5: **QA / Testing** (1 person)

**Primary Role**: Test all features, find bugs, create test cases.

**Responsibilities**:

- Test booking flow end-to-end (form → email → admin approval)
- Test date validation (boundary cases: 1 week, 3 months)
- Test email delivery (SendGrid sandbox)
- Test admin approval workflow
- Test cancellation & rescheduling
- Document bugs in GitHub issues

**AI-Assisted Tasks**:

- Generate test case checklists (acceptance criteria)
- Create bug report templates
- Generate edge case scenarios
- Debug reproduction steps

**Prompt Template for QA**:

```
Create comprehensive test cases for [feature]:
- Happy path (success scenario)
- Unhappy paths (all error scenarios)
- Edge cases (boundary values, special inputs)
- Integration tests (multi-step flows)
Format as checklist; include expected vs. actual results.
```

**AI Token Budget**: ~15K/month

---

### Role 6: **DevOps / Deployment** (1 person)

**Primary Role**: Set up GitHub, Netlify, environment variables, deployment pipeline.

**Responsibilities**:

- GitHub repo setup (branching strategy, PR templates, CI/CD)
- Netlify project setup (environment variables, function configuration)
- SendGrid API key configuration
- GitHub Actions (optional: linting, tests before merge)
- Deployment checklist
- Production monitoring setup (UptimeRobot, Netlify logs)

**AI-Assisted Tasks**:

- Generate netlify.toml configuration
- Create GitHub Actions workflow YAML
- Generate deployment checklist
- Create runbooks for common issues

**Prompt Template for DevOps**:

```
Create Netlify setup for a project with:
- Static site (HTML/CSS/JS in root)
- Functions in /functions directory
- Environment variables: [list]
- Automatic deployment from GitHub main branch
Generate netlify.toml, GitHub Actions workflow, and deployment checklist.
```

**AI Token Budget**: ~20K/month

---

### Role 7: **Documentation / Technical Writer** (1 person)

**Primary Role**: Document code, create setup guides, maintain README.

**Responsibilities**:

- Update/maintain README.md (setup instructions, how to run locally, deployment)
- Document each module (functions, JS files) with comments
- Create API documentation (function inputs/outputs)
- Create user guide (operator manual for admin dashboard)
- Create developer setup guide (for new team members)

**AI-Assisted Tasks**:

- Generate code comments & JSDoc
- Create README sections
- Generate function API docs
- Create troubleshooting guide

**Prompt Template for Tech Writer**:

```
Create documentation for [component]:
- Purpose & overview (2-3 sentences)
- Inputs/parameters (table format)
- Outputs/return values
- Example usage (code snippet)
- Common errors & solutions
Use clear, beginner-friendly language.
```

**AI Token Budget**: ~20K/month

---

### Role 8: **UI/UX Reviewer** (1 person)

**Primary Role**: Ensure responsive design, accessibility, consistency.

**Responsibilities**:

- Review all HTML/CSS for Tailwind consistency
- Test responsive design (mobile, tablet, desktop)
- Verify accessibility (keyboard nav, screen reader, color contrast)
- Test form usability (error messages, field labels, focus states)
- Review email templates (plain text & HTML rendering)

**AI-Assisted Tasks**:

- Generate accessibility audit checklist
- Create responsive design test matrix
- Generate Tailwind CSS refactoring suggestions
- Create design system documentation

**Prompt Template for UX**:

```
Review [component] for UX/accessibility:
- Responsive? Test at breakpoints: [list]
- Accessible? Check: keyboard nav, ARIA labels, color contrast
- Consistent styling? (Tailwind classes, spacing, colors)
- Form usability? (Error messages clear, labels visible)
Generate improvement recommendations.
```

**AI Token Budget**: ~15K/month

---

## GitHub Workflow for 9 People

### Branch Strategy

```
main (production-ready)
  └── develop (integration branch)
       ├── feature/homepage (Frontend A)
       ├── feature/booking-form (Frontend B)
       ├── feature/send-confirmation (Backend A)
       ├── feature/admin-dashboard (Admin Dev)
       ├── feature/approval-workflow (Backend B)
       └── feature/reminders (Backend B)
```

### PR Process (Minimize Merge Conflicts)

1. **Create feature branch** from `develop`: `git checkout -b feature/[name]`
2. **Work independently** on assigned files (see role responsibilities above)
3. **Commit frequently** with clear messages: `git commit -m "feat: add date validation to booking form"`
4. **Push to GitHub**: `git push origin feature/[name]`
5. **Create PR** with checklist:
   - [ ] Code follows module structure (js/functions/etc.)
   - [ ] Changes tested locally
   - [ ] No merge conflicts with develop
   - [ ] QA signoff (if applicable)
6. **Merge when approved** → auto-deploy to Netlify staging

### File Ownership (Prevents Conflicts)

```
index.html                  → Frontend A only
booking.html                → Frontend B only
admin/index.html            → Admin Dev only
js/booking-form.js          → Frontend B only
js/admin-dashboard.js       → Admin Dev only
js/validation.js            → Frontend B (Backend A consults)
functions/send-confirmation.js → Backend A only
functions/approve-booking.js → Backend B only
functions/send-reminders.js → Backend B only
data/packages.json          → Backend A only
data/config.json            → Backend A only
data/bookings.json          → Auto-generated by functions (no manual edits)
```

### Commit Message Format

```
type(scope): message

feat(booking): add date range validation
fix(admin): fix approve button styling
docs(readme): update deployment instructions
test(validation): add edge case tests
refactor(functions): extract email template
```

---

## Work Phases & AI-Assisted Task Breakdown

### **Phase 0: Foundation (Week 1) - 25% team effort**

**Goal**: Set up infrastructure, create boilerplate.

| Task                                      | Owner        | AI Assistance                               | Effort  |
| ----------------------------------------- | ------------ | ------------------------------------------- | ------- |
| GitHub repo setup + branching             | DevOps       | Generate gitignore, branch protection rules | 2h      |
| Netlify project + env vars                | DevOps       | Generate netlify.toml, .env template        | 2h      |
| SendGrid API key setup                    | DevOps       | Generate API key setup guide                | 1h      |
| Project README skeleton                   | Tech Writer  | AI generates initial README structure       | 2h      |
| HTML boilerplate (all pages)              | Frontend A/B | AI generates responsive HTML5 template      | 4h      |
| Data schemas (packages, config, bookings) | Backend A    | AI generates JSON schemas with comments     | 2h      |
| Function skeleton (all 5 functions)       | Backend A/B  | AI generates Node.js function templates     | 4h      |
| **Phase 0 Total**                         | —            | —                                           | **17h** |

**AI Prompts to Use**:

```
1. "Generate GitHub .gitignore for Node.js + Netlify project"
2. "Create Netlify configuration (netlify.toml) for serverless functions"
3. "Create HTML5 boilerplate with Tailwind CDN for responsive design"
4. "Generate JSON schemas for bookings, config, packages with JSDoc"
5. "Create Netlify Function templates (Node.js) with error handling"
```

---

### **Phase 1: Core Features (Week 2-3) - 60% team effort**

**Goal**: Build functional MVP (booking submission → email → admin approval).

| Task                                           | Owner       | AI Assistance                                             | Effort  |
| ---------------------------------------------- | ----------- | --------------------------------------------------------- | ------- |
| **Homepage**                                   |             |                                                           |         |
| Hero + package cards (HTML/CSS)                | Frontend A  | AI generates responsive cards with Tailwind               | 4h      |
| Navigation + mobile menu                       | Frontend A  | AI generates responsive nav component                     | 2h      |
| **Booking Form**                               |             |                                                           |         |
| Multi-step form HTML                           | Frontend B  | AI generates form structure (4 fields + review)           | 3h      |
| Form styling (Tailwind)                        | Frontend B  | AI generates responsive form styles                       | 2h      |
| Client-side validation (JS)                    | Frontend B  | AI generates date/email/passenger validators              | 4h      |
| Date picker (HTML5 + JS)                       | Frontend B  | AI generates date range picker logic                      | 3h      |
| Form submission handler                        | Frontend B  | AI generates fetch POST to /functions/send-confirmation   | 2h      |
| **Backend: Booking Submission**                |             |                                                           |         |
| functions/send-confirmation.js                 | Backend A   | AI generates complete function with validation + SendGrid | 6h      |
| data/bookings.json write logic                 | Backend A   | AI generates fs read/write with JSON parsing              | 2h      |
| Booking confirmation email template            | Backend A   | AI generates plain-text & HTML email                      | 2h      |
| **Backend: Email Testing**                     |             |                                                           |         |
| SendGrid sandbox setup                         | Backend A   | AI generates SendGrid test config                         | 1h      |
| Test email delivery                            | QA          | AI generates test checklist (inbox checks)                | 2h      |
| **Admin Dashboard**                            |             |                                                           |         |
| Dashboard HTML (pending bookings list)         | Admin Dev   | AI generates table structure with Tailwind                | 3h      |
| Admin authentication (localStorage + password) | Admin Dev   | AI generates login form + token validation                | 3h      |
| Dashboard styling                              | Admin Dev   | AI generates responsive layout + status badges            | 2h      |
| **Backend: Admin Actions**                     |             |                                                           |         |
| functions/approve-booking.js                   | Backend B   | AI generates approval logic + email trigger               | 4h      |
| functions/reject-booking.js                    | Backend B   | AI generates rejection logic + email trigger              | 2h      |
| Approval/rejection email templates             | Backend B   | AI generates emails                                       | 1h      |
| **QA & Testing**                               |             |                                                           |         |
| End-to-end test checklist                      | QA          | AI generates comprehensive test cases                     | 2h      |
| Manual testing (booking flow)                  | QA          | Manual testing                                            | 3h      |
| Bug documentation                              | QA          | AI generates bug report template                          | 1h      |
| **Documentation**                              |             |                                                           |         |
| README: Setup & deployment                     | Tech Writer | AI generates README section                               | 2h      |
| API documentation (functions)                  | Tech Writer | AI generates function API docs                            | 2h      |
| Code comments                                  | Tech Writer | AI generates JSDoc for all functions                      | 3h      |
| **Phase 1 Total**                              | —           | —                                                         | **62h** |

**AI Prompts to Use**:

```
1. "Create responsive hero section + package cards (name, description, CTA)"
2. "Generate form validation for: email (regex), date (1 week - 3 months), passengers (1-5)"
3. "Create Netlify Function that: receives booking form, validates, saves to bookings.json, calls SendGrid"
4. "Generate SendGrid email templates: confirmation, approval, rejection (plain text)"
5. "Create admin dashboard list showing pending bookings with approve/reject buttons"
6. "Generate localStorage-based login form + token validation in vanilla JS"
7. "Create comprehensive E2E test checklist: form submission → confirmation email → admin approval → approval email"
```

---

### **Phase 2: Advanced Features (Week 4) - 10% team effort**

**Goal**: Add reminders, cancellation, polish.

| Task                                    | Owner      | AI Assistance                                     | Effort  |
| --------------------------------------- | ---------- | ------------------------------------------------- | ------- |
| functions/send-reminders.js (scheduled) | Backend B  | AI generates cron job + email logic               | 4h      |
| Reminder email template                 | Backend B  | AI generates 3-day & 1-day reminder emails        | 1h      |
| functions/process-cancellation.js       | Backend A  | AI generates cancel/reschedule logic              | 4h      |
| Cancellation link in emails             | Backend A  | AI generates unique token generation + validation | 2h      |
| Cancel/reschedule UI (optional)         | Frontend B | AI generates cancellation form modal              | 3h      |
| Test reminders (manual)                 | QA         | Manual testing (verify email sends)               | 2h      |
| Admin manual trigger (optional)         | Admin Dev  | AI generates manual reminder send button          | 2h      |
| **Phase 2 Total**                       | —          | —                                                 | **18h** |

---

### **Phase 3: Polish & Launch (Week 5) - 5% team effort**

**Goal**: Final QA, responsiveness, accessibility, deploy to production.

| Task                                 | Owner                  | AI Assistance                                                 | Effort  |
| ------------------------------------ | ---------------------- | ------------------------------------------------------------- | ------- |
| Responsive design testing            | UX Reviewer            | AI generates responsive test matrix (mobile, tablet, desktop) | 3h      |
| Accessibility audit                  | UX Reviewer            | AI generates WCAG checklist + fixes                           | 3h      |
| Performance optimization             | DevOps                 | AI suggests optimization (minify, lazy load)                  | 2h      |
| Production deployment                | DevOps                 | Execute deployment checklist                                  | 1h      |
| Final bug fixes                      | Frontend/Backend teams | Fix issues from testing                                       | 3h      |
| User documentation (operator manual) | Tech Writer            | AI generates admin user guide                                 | 2h      |
| Launch checklist                     | PM                     | AI generates final launch verification                        | 1h      |
| **Phase 3 Total**                    | —                      | —                                                             | **15h** |

---

## AI Token Budget Allocation

**Total for 9 people × 5 weeks**:

- Frontend (2 people × 60K): **120K tokens**
- Backend (2 people × 80K): **160K tokens**
- PM: **20K tokens**
- Admin Dev: **25K tokens**
- QA: **15K tokens**
- DevOps: **20K tokens**
- Tech Writer: **20K tokens**
- UX Reviewer: **15K tokens**
- **TOTAL: ~395K tokens** (each person gets ~44K average)

**Free tier estimate**: Most free plans give 100K-200K tokens/month per account.

- If everyone uses free tier: **900K-1.8M tokens available** (plenty!)
- **Recommendation**: Share 1 primary AI account for common tasks (PM, DevOps, Tech Writer), others use personal accounts for specialized work.

---

## Daily Workflow (Suggested Schedule)

### **9:00 AM - 15-min Standup** (All)

- What did you complete yesterday?
- What will you work on today?
- Any blockers?

**PM collects notes**, adds to GitHub Projects board.

### **9:15 AM - 12:30 PM (3.5h) - Focused Work**

Each person works on their assigned tasks, uses AI as needed:

- Frontend: Building components (with AI HTML/CSS generation)
- Backend: Writing functions (with AI code templates)
- QA: Testing features (with AI test case generation)
- DevOps: Monitoring & infrastructure (with AI automation suggestions)
- Tech Writer: Documenting (with AI comment/docs generation)

### **12:30 PM - 1:00 PM - Code Review & Integration**

- Frontend A/B review each other's PRs (5-10 min)
- Backend A/B review each other's PRs (5-10 min)
- DevOps reviews & merges to `develop` (5 min)

### **1:00 PM - 5:00 PM (4h) - Implementation & Testing**

- Continue building OR start new task
- QA tests completed features
- Tech Writer documents new code
- UX Reviewer checks responsive design

### **5:00 PM - End of Day**

- Commit & push work
- Update GitHub Projects (move cards to "In Review" or "Done")
- Slack summary of daily progress

---

## Slack Communication Guidelines

### Channels

```
#general          → Announcements, team-wide discussions
#development      → Code questions, technical discussions
#blockers         → URGENT: Anything blocking progress
#daily-standup    → PM posts standup summary
#deployment       → DevOps deployment updates
#qa-testing       → QA test results, bugs found
#wins             → Celebrate completed features
```

### Response Times

- **Blockers**: 30 min
- **Code questions**: 1 hour
- **General discussions**: Same day
- **Status updates**: By 5 PM

### PR Review SLA

- Assign reviewer explicitly
- Review within 4 hours
- Comment format: `[MUST FIX]`, `[SUGGESTION]`, `[NICE TO HAVE]`

---

## AI Efficiency Tips for Each Role

### For Frontend Developers

```
✓ Use AI to generate HTML/CSS structure, then manually refine
✓ Ask AI for Tailwind class combinations (it knows the classes)
✓ Use AI to debug form validation logic
✓ Ask for responsive design breakpoint suggestions
✗ Don't rely on AI for pixel-perfect design (that's your job)
```

### For Backend Developers

```
✓ Use AI to generate function boilerplate + error handling
✓ Ask AI to explain SendGrid API response format
✓ Use AI to debug JSON parsing / file read/write
✓ Ask AI for cron job syntax (Netlify scheduled functions)
✗ Don't trust AI's SendGrid API key handling (security: verify docs)
```

### For QA

```
✓ Use AI to generate test case checklists from requirements
✓ Ask AI to suggest edge cases for your features
✓ Use AI to create bug report templates
✓ Ask for testing matrix (mobile/desktop/browser combos)
✗ Don't skip manual testing (automation can miss UX issues)
```

### For DevOps

```
✓ Use AI to generate YAML configs (netlify.toml, GitHub Actions)
✓ Ask AI for deployment checklists
✓ Use AI to debug environment variable issues
✓ Ask for monitoring/alerting setup suggestions
✗ Don't blindly copy-paste configs (understand what you're deploying)
```

### For Tech Writer

```
✓ Use AI to generate code comments & JSDoc
✓ Ask AI to explain technical concepts in simple terms
✓ Use AI to create README sections & API docs
✓ Ask for glossary of project terms
✗ Don't accept AI's initial writing as-is (always review & refine)
```

---

## Approval Process (Avoid Merge Conflicts)

**Before merging to `develop`**:

1. **Self-check**:

   - Code follows module structure (your assigned files only)
   - No unrelated changes
   - Tested locally
   - No merge conflicts

2. **Peer review** (assign appropriate reviewer):

   - Frontend: Frontend A ↔ Frontend B
   - Backend: Backend A ↔ Backend B
   - Other: PM or Tech Writer

3. **QA sign-off** (if code impacts user flow):

   - QA tests feature on develop branch
   - Approves or files bugs

4. **Merge** (DevOps executes):

   - Squash commits if requested
   - Merge to `develop`
   - Auto-deploy to Netlify staging

5. **Weekly sync** (Friday, 4 PM):
   - Test staging environment end-to-end
   - Identify issues before production
   - Schedule prod deployment

---

## Risk Mitigation

### **Risk: Merge Conflicts**

- **Mitigation**: Clear file ownership (each person owns their files)
- **Mitigation**: Frontend A ↔ B sync daily on shared files (validation.js)

### **Risk: AI Generated Code Has Bugs**

- **Mitigation**: Code review catches bugs before merge
- **Mitigation**: QA tests every feature
- **Mitigation**: Don't trust AI for security-critical code (auth, data validation)

### **Risk: Team Member Absent (1 of 9)**

- **Mitigation**: Document all tasks in GitHub Issues (not just in heads)
- **Mitigation**: Rotate responsibilities so no single person is critical path
- **Mitigation**: PM tracks dependencies; can reassign mid-week if needed

### **Risk: AI Quota Depleted Mid-Sprint**

- **Mitigation**: Share 1 main AI account for common tasks (PM, DevOps, Tech Writer)
- **Mitigation**: Reserve quota for blocker resolution
- **Mitigation**: Plan non-AI work (testing, review) for end of sprint

### **Risk: Scope Creep**

- **Mitigation**: PM strictly enforces 6-step build plan from COMPLETE_BRIEF.md
- **Mitigation**: Nice-to-haves deferred to Phase 2+
- **Mitigation**: Any feature request = new GitHub Issue, not immediate work

---

## Success Metrics (Team Level)

| Metric                 | Target                       | Measure                               |
| ---------------------- | ---------------------------- | ------------------------------------- |
| **Time to MVP**        | 5 weeks                      | Complete Phase 1 by end of week 3     |
| **Code Quality**       | 0 critical bugs post-launch  | QA finds + fixes all bugs before prod |
| **Team Velocity**      | 62h Phase 1 in 2 weeks       | Track hours/day in GitHub Projects    |
| **AI Efficiency**      | 395K tokens used, not wasted | Track token usage by role             |
| **Deployment Success** | 100% first-time success      | Prod deploy works without rollback    |
| **Team Satisfaction**  | No burnout                   | Max 8h/day work, flexible hours       |

---

## GitHub Projects Board (Kanban)

```
📋 Backlog
├─ Phase 0: Foundation
│  ├─ [ ] GitHub + Netlify setup (DevOps)
│  ├─ [ ] HTML boilerplate (Frontend A/B)
│  ├─ [ ] Function templates (Backend A/B)
│  └─ [ ] Data schemas (Backend A)
│
├─ Phase 1: Core Features
│  ├─ [ ] Homepage (Frontend A)
│  ├─ [ ] Booking form (Frontend B)
│  ├─ [ ] send-confirmation function (Backend A)
│  ├─ [ ] Admin dashboard (Admin Dev)
│  ├─ [ ] approve/reject functions (Backend B)
│  └─ [ ] E2E testing (QA)
│
└─ Phase 2+: Advanced
   ├─ [ ] Reminders (Backend B)
   ├─ [ ] Cancellation flow (Backend A)
   └─ [ ] Polish & accessibility (UX Reviewer)

🟡 In Progress
├─ feature/homepage (Frontend A)
├─ feature/booking-form (Frontend B)
└─ feature/send-confirmation (Backend A)

🔄 In Review
├─ PR #3: Homepage styling (Frontend A)
└─ PR #4: Form validation (Frontend B)

✅ Done
├─ GitHub repo setup (DevOps)
├─ Netlify project setup (DevOps)
└─ Boilerplate HTML (Frontend A/B)
```

---

## Template: Daily AI Prompt for Each Role

### Frontend Developer (Daily)

```
I'm building [component] for a fishing trip booking system.
Current status: [what you did yesterday]
Today: [what you need to build]

Help me:
1. Generate HTML structure for [component]
2. Suggest Tailwind CSS classes for [specific styling need]
3. Debug this validation error: [error message]

Remember: No build tools, vanilla ES6, Tailwind CDN.
```

### Backend Developer (Daily)

```
I'm building [function name] - a Netlify serverless function.
Input: [data structure]
Output: [expected response]
Business logic: [business rule]

Help me:
1. Generate Node.js function template with error handling
2. Explain SendGrid API response format for [scenario]
3. Debug this JSON file read error: [error message]

Remember: No npm deps, Node.js built-ins only, free tier SendGrid.
```

### QA (Daily)

```
I'm testing [feature] which just merged to develop.
Expected behavior: [from acceptance criteria]

Create test checklist for:
1. Happy path (successful booking)
2. Error cases (validation failures)
3. Edge cases (date boundaries, passenger limits)

Include step-by-step actions + expected results.
```

---

## Next Steps (Week 1)

1. **PM**: Create GitHub Projects board with Phase 0 tasks
2. **DevOps**: Set up GitHub repo + Netlify project (use AI prompts above)
3. **PM**: Schedule 5-week sprint kickoff meeting (explain roles + timeline)
4. **Everyone**: Read COMPLETE_BRIEF.md + ARCHITECTURE_VALIDATION.md
5. **Everyone**: Set up local dev environment (git clone, open in editor)
6. **Team**: First standup (Monday 9 AM) - assign initial tasks

---

## Useful AI Prompts Library

```
=== General Project ===
"Create a GitHub issue template for bug reports"
"Generate project README table of contents"
"Create a deployment checklist for production launch"

=== Frontend ===
"Create responsive Tailwind navbar component"
"Generate form validation regex for [field type]"
"Create multi-step form wizard in vanilla JS"
"Generate ARIA labels for accessibility"

=== Backend ===
"Create Netlify Function that reads/writes JSON file"
"Generate SendGrid email template (plain text + HTML)"
"Create Node.js date comparison logic for [scenario]"
"Generate error handling middleware for API"

=== QA ===
"Create test matrix for mobile/tablet/desktop"
"Generate acceptance criteria checklist for [feature]"
"Create bug report template"

=== DevOps ===
"Generate netlify.toml configuration"
"Create GitHub Actions workflow for [purpose]"
"Generate environment variables template (.env.example)"

=== Documentation ===
"Generate JSDoc comments for this function: [code]"
"Create API documentation for [function name]"
"Generate user guide for [admin feature]"
```

---

## Summary

**9-person team, 1 repo, 5 weeks**:

- ✅ Clear role definitions (no confusion about who owns what)
- ✅ Clear file ownership (no merge conflicts)
- ✅ AI-assisted workflow (each person leverages AI for their specialty)
- ✅ Parallel work (6 people can code simultaneously)
- ✅ Efficient QA & deployment (2-person support structure)
- ✅ Realistic timeline (62h Phase 1 ÷ 6 devs = 10h/person, doable in 2 weeks)
- ✅ Sufficient free AI quota (~900K tokens available, 395K needed)

**Key to success**: Stick to assigned files, use AI prompts effectively, review code carefully, test thoroughly.
