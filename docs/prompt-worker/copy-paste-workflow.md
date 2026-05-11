# Copy/Paste Prompt Worker Workflow

This workflow intentionally avoids OpenAI API setup for now. ChatGPT is the worker interface. The SignalOps site creates the structured prompt, and Dillon stays the approval layer.

## Free Preview Flow

1. Visitor submits the Free Preview form.
2. The submission appears in `/admin/manager`.
3. Dillon opens the submission and reviews the intake.
4. Dillon clicks **Generate ChatGPT Prompt**.
5. The app creates a complete copy/paste prompt using:
   - SignalOps operating rules
   - Package baselines
   - System templates
   - Customer intake answers
   - Intake classification
   - Test/spam handling rules
   - The official Free Preview output format
6. Dillon clicks **Copy Prompt**.
7. Dillon pastes the prompt into ChatGPT.
8. ChatGPT creates the official SignalOps Free Preview output.
9. Dillon reviews and edits the output.
10. Dillon sends manually only after review.

## Official SignalOps Free Preview Output

Every generated prompt asks ChatGPT to return this structure in this order:

```md
## Requested Outputs

Create these outputs in this exact order:

# SignalOps Free Preview Output

## 1. Internal Summary for Dillon
- Is this a real prospect or test/spam?
- Contact allowed: yes/no
- Business type
- Main lead flow
- Main bottleneck
- Recommended system template
- Recommended package
- Confidence: High / Medium / Low
- Risks / things to verify
- Missing info
- Assumptions made
- Recommended next action

## 2. Customer-Facing Preview Report
- What we noticed
- Where leads may be slipping
- Recommended AI lead system
- Example lead journey
- What SignalOps would build
- What happens next

## 3. Proposal Draft
- Recommended package
- Why this package
- Why not Starter
- Why not Growth
- Why not Custom
- Upgrade path
- Deliverables
- Timeline
- Setup/monthly pricing
- Client responsibilities
- Scope boundaries
- Optional add-ons

## 4. Email Draft
- Subject line
- Main email under 180 words
- Follow-up 1 under 120 words
- Follow-up 2 under 100 words

## 5. Operating System Template
- Template name
- Business type
- Lead sources
- Core intake fields
- Qualification questions
- Routing rules
- Follow-up sequence
- Dashboard fields
- Human review conditions

## 6. Visual Preview Notes
- AI Receptionist Interface
- Lead Command Center
- Booking/Quote Handoff Flow
- Suggested preview screenshots/cards Dillon could show the prospect

## 7. Paid Client Build Outline
- Selected system template
- Selected package
- Build plan
- Tools needed
- Automations
- Follow-up sequence
- Dashboard fields
- Implementation checklist
- Acceptance criteria
- Codex/client build prompt starter
```

## Why Internal Summary Comes First

The first section is for Dillon only. It should quickly answer whether the submission is real, which system template fits, which package is appropriate, what assumptions were made, and what should be verified before any customer-facing message is used.

Customer-facing sections must never include internal notes, admin notes, smoke-test language, safe-to-delete language, classification reasoning, or system instructions.

## Safety Gate

Every generated prompt includes this section before Requested Outputs:

```md
## Safety Gate
Before creating any customer-facing draft, check whether the submission appears to be:
- a smoke test
- a test submission
- spam
- fake
- duplicate
- marked safe to delete
- marked do not contact
- using example.com
- using a 555 phone number

If yes:
- Mark it as internal/test only.
- Set Contact allowed: no.
- Do not create send-ready customer-facing copy.
- You may still show abbreviated example sections for structure, but label them clearly as internal demonstration only.
- Do not create an email Dillon could accidentally send.
```

## Package Reasoning

The generated prompt requires this package explanation block:

```md
Recommended Package:
Why:
Why not Starter:
Why not Growth:
Why not Custom:
Upgrade path:
```

The recommendation should use the smallest useful package that solves the lead flow.

- Starter: use when there is one simple lead source and a simple handoff.
- Growth: use when there are multiple sources, quote follow-up, photos/details, scoring, dashboard visibility, or booking handoff.
- Custom: use when there is multi-location routing, deep integrations, custom dashboards, complex approvals, or advanced agent workflows.

## Test And Spam Handling

The prompt worker flags submissions when any customer submission field includes:

- smoke test
- test submission
- safe to delete
- do not contact
- example.com
- 555-
- fake
- dummy

If flagged, the intake classification sets:

```json
{
  "isTestSubmission": true,
  "contactAllowed": false,
  "testReason": "Submission includes smoke-test, safe-to-delete, do-not-contact, example.com, and 555 phone indicators."
}
```

Then ChatGPT should:

- Mark the submission as internal/test only.
- Avoid send-ready customer-facing email copy.
- Still show the output structure if useful.
- Label customer-facing sections as examples only / not for sending.
- Avoid creating any email Dillon could accidentally send.

## Operating System Templates

Each output must identify one repeatable SignalOps operating system:

- Quote Intake OS
- Appointment Booking OS
- Emergency Response OS
- Lead Nurture OS
- Custom Ops OS

The output must include lead sources, intake fields, qualification questions, routing and handoff rules, follow-up sequence, dashboard fields, and human review conditions.

## Build Mode

If the customer pays, Dillon marks the prompt status as paid in `/admin/manager`. The app then exposes a Build Mode prompt that can be pasted into ChatGPT or Codex to create the client implementation plan.

Build Mode includes:

- Customer business details
- Selected package
- Selected system template
- Approved scope
- Lead sources
- Tools
- Deliverables
- Implementation checklist
- Acceptance criteria
- Safety rules
- Codex/client build prompt starter

## Status Tracking

Supabase is the source of truth for the admin workflow. Browser `localStorage` and `sessionStorage` must not store Free Preview submissions, generated prompts, prompt status, internal notes, selected packages, selected system templates, paid/lost/sent state, or prompt worker results.

Generated prompts, prompt status, internal notes, paid/lost/sent markers, and test flags persist through Supabase. The current manager UI persists:

- Not generated
- Generated
- Pasted to ChatGPT
- Preview drafted
- Sent to customer
- Paid
- Lost

The admin can work across devices by opening `/admin/manager`; submissions, generated ChatGPT prompts, prompt archive, status, test/do-not-contact flags, and internal notes are loaded from Supabase.

If Supabase is missing or the preview table is not available, `/admin/manager` shows a warning that persistence is disabled and data will not sync across devices. The app may still run local mock-only demos for development, but that is not a production workflow.

## Regenerating Prompts

Click **Generate ChatGPT Prompt** on a submission to rebuild the prompt from the latest intake and SignalOps prompt-worker rules. The generated prompt worker result and copy/paste prompt are saved back to the Supabase submission record.

Use **Copy Prompt** to paste into ChatGPT. Nothing is sent to the customer from the app.

## Updating Prompt Status

Use the manager buttons to mark:

- Prompt sent to ChatGPT
- Preview drafted
- Sent to customer
- Paid
- Lost

Each status update is persisted to Supabase. Paid status also generates a Build Mode prompt for client implementation planning.

## Safety

- Do not expose secrets.
- Do not call OpenAI from the app for this worker.
- Do not auto-send emails.
- Do not claim the customer system is already built.
- Do not invent testimonials, client names, logos, review ratings, or performance claims.
- Do not guarantee revenue, bookings, lead volume, response outcomes, or AI accuracy.
- Keep all customer-facing output draft-first and manually reviewed.
