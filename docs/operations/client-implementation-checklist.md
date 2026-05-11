# SignalOps Client Implementation Checklist

## Purpose

Use this checklist to install a SignalOps AI Lead Engine from intake through optimization. It is designed for real client delivery, not internal brainstorming.

## How To Use

- Assign one implementation owner.
- Review this checklist with the client before build starts.
- Mark each line `Not Started`, `In Progress`, `Blocked`, or `Done`.
- Do not move to launch until all QA items are complete.

---

## Phase 1: Client Intake

### Business profile

- [ ] Business info captured (legal entity, DBA, website, phone, service area).
- [ ] Legal business name, DBA name, and primary location collected.
- [ ] Main point of contact identified (owner, operator, or sales manager).
- [ ] Backup point of contact identified.
- [ ] Industry confirmed.
- [ ] Offer/services documented (core and secondary).
- [ ] High-margin services identified.

### Current lead operations

- [ ] Current lead sources listed and ranked by volume.
- [ ] Current CRM/tools documented (CRM, forms, phone, email, calendar, ad platforms).
- [ ] Current response process mapped (business hours and after-hours).
- [ ] Sales team contacts documented with role and routing priority.
- [ ] Calendar and booking process documented.
- [ ] Compliance concerns captured (industry rules, privacy, consent language, legal disclaimers).

### Intake approvals

- [ ] Client approved implementation scope.
- [ ] Success metrics agreed (response speed, ready-lead rate, booking rate).
- [ ] Escalation contacts documented for urgent lead exceptions.

---

## Phase 2: Lead Flow Mapping

### Source-by-source mapping

- [ ] Website forms mapped (fields, thank-you pages, notifications, tracking).
- [ ] Calls mapped (answered, missed, voicemail, callback path).
- [ ] Ads mapped (Meta, Google, lead forms, landing pages).
- [ ] DMs mapped (Instagram, Facebook, other channels).
- [ ] Emails mapped (inbound aliases, owner inbox, shared inbox behavior).
- [ ] Landing pages mapped (all campaign pages and tracking tags).
- [ ] Missed-call workflow mapped (text-back and callback ownership).
- [ ] Existing automations documented (what exists, what is broken, what duplicates effort).

### Mapping outputs

- [ ] One visual lead flow approved by client.
- [ ] Source priority tiers set (`high value`, `standard`, `low value`).
- [ ] Every source has a defined first-response path.

---

## Phase 3: Intake Logic

### Fit and quality rules

- [ ] Good lead definition documented with examples.
- [ ] Bad lead definition documented with examples.
- [ ] Urgency levels defined (`emergency`, `soon`, `researching`, `unknown`).
- [ ] Required fields by lead type documented.
- [ ] Disqualifiers documented (out of area, wrong service, spam, no valid contact).
- [ ] Routing rules documented by service type, urgency, and location.
- [ ] Human review conditions documented (safety-sensitive, legal-sensitive, unclear high-value leads).

### Intake outputs

- [ ] Score bands approved (for example 0-39, 40-69, 70-84, 85-100).
- [ ] Priority labels approved (`hot`, `warm`, `cold`, `junk`).
- [ ] Recommended next actions defined by priority.

---

## Phase 4: Messaging

### External messaging

- [ ] Initial reply template approved (SMS/email/chat variants).
- [ ] Follow-up sequence approved (Day 1, Day 2, Day 5, Day 10, nurture).
- [ ] No-response sequence approved.
- [ ] Re-engagement copy approved for older leads.

### Internal messaging

- [ ] Urgent lead alert template approved.
- [ ] Internal sales note format approved (summary, urgency, action, tags).
- [ ] Escalation language approved for uncertain or risky cases.

### Messaging controls

- [ ] Brand voice and compliance language checks completed.
- [ ] Stop conditions defined (booked, disready, no response threshold).

---

## Phase 5: Build

### Systems implementation

- [ ] Forms configured and connected.
- [ ] CRM pipeline stages aligned to new lead flow.
- [ ] AI intake rules implemented.
- [ ] Notification adapters configured (customer reply, owner alert, CRM webhook).
- [ ] Calendar or booking links integrated.
- [ ] Dashboard views configured for owner and sales team.

### Technical readiness

- [ ] Environment variables configured per environment.
- [ ] Mock mode behavior verified for missing integrations.
- [ ] Logging and error handling added.
- [ ] Basic rollback path documented.

### Build testing baseline

- [ ] Sample lead fixtures created for normal and edge-case scenarios.
- [ ] Internal test accounts verified.

---

## Phase 6: QA

### Functional QA

- [ ] Test submissions pass from every source path.
- [ ] Bad data tests pass (missing contact, invalid email, sparse message, spam-like input).
- [ ] Mobile tests pass for all client-facing forms.
- [ ] Speed tests pass for lead capture and first-response trigger.
- [ ] CRM tests pass for create/update/status changes.
- [ ] Notification tests pass in mock mode and configured mode.
- [ ] Human fallback tests pass for review-required scenarios.

### QA sign-off

- [ ] Implementation owner sign-off complete.
- [ ] Client stakeholder sign-off complete.
- [ ] Known issues list created with owners and due dates.

---

## Phase 7: Launch

### Pre-launch

- [ ] Final client approval captured in writing.
- [ ] DNS/embed/install tasks completed (if applicable).
- [ ] Launch window confirmed with client team.
- [ ] Internal support coverage assigned for launch day.

### Go-live

- [ ] Go-live checklist completed.
- [ ] Live test lead submitted and verified end-to-end.
- [ ] Monitoring dashboard reviewed within first hour.

### First-week controls

- [ ] Daily check-in for first 3 business days.
- [ ] First-week performance check completed.
- [ ] Immediate tuning issues documented and assigned.

---

## Phase 8: Optimization

### Weekly review cadence

- [ ] Weekly review meeting scheduled.
- [ ] Lead quality and booking report delivered.
- [ ] Response speed and follow-up completion reviewed.

### Optimization actions

- [ ] Lead quality tuning updates implemented.
- [ ] Follow-up copy improvements implemented.
- [ ] Routing logic refinements implemented.
- [ ] Reporting updates implemented.

### Expansion opportunities

- [ ] Additional lead sources identified for rollout.
- [ ] Additional workflows identified (missed calls, reactivation, upsell, referral asks).
- [ ] Phase 2 implementation proposal drafted.

---

## Client Intake Questionnaire

Use these questions in onboarding before build starts.

### Business and offer

1. What services do you want more booked appointments for?
2. Which services are highest priority this quarter?
3. What geographic areas do you serve?

### Lead flow

1. Where do most leads come from today?
2. Which sources generate the best customers?
3. What happens when a lead arrives after-hours?

### Sales process

1. Who responds first to new leads?
2. What information must be collected before booking?
3. What is your current average time-to-first-response?

### Tools

1. What CRM are you using?
2. What form builder or landing page tools are you using?
3. What calendar or booking system do you use?
4. What call, text, and email systems do you use?

### Constraints and compliance

1. Are there any consent requirements for SMS/email outreach?
2. Are there legal or safety scenarios that must always be reviewed by a human?
3. Are there message types you do not want automated?

---

## Internal Implementation Notes

Use this template per client.

- Client:
- Implementation owner:
- Kickoff date:
- Target launch date:
- Primary success metric:
- Secondary success metric:
- Risks identified:
- Blockers:
- Escalation contact:
- Current phase:
- Next milestone:

---

## Red Flags

- No clear owner on client side.
- Client cannot define what a ready lead looks like.
- Multiple disconnected tools with no reliable source tracking.
- Response expectations are high but team availability is low.
- Compliance concerns are unresolved before build.
- Client wants "fully autonomous AI" with no human review path.

---

## Scope Creep Warnings

- "Can we also rebuild the whole website while you do this?"
- "Can you also run all our ads as part of this setup?"
- "Can we add three more business units before launch?"
- "Can we replace the CRM during pilot?"
- "Can we custom-build every message path before first launch?"

When these come up:

- [ ] Log request in change list.
- [ ] Estimate impact on timeline and cost.
- [ ] Separate phase-1 launch scope from phase-2 expansion scope.
- [ ] Get written approval before adding net-new scope.

---

## Upsell Opportunities

- Add missed-call text-back workflow.
- Add lead reactivation for old estimate requests.
- Add multi-location routing and territory-based assignment.
- Add service-specific quote intake flows.
- Add conversion-focused reporting and weekly operator review.
- Add custom CRM automation and pipeline hygiene layer.
- Add retention and referral automation after completed jobs.
