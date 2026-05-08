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
   - Requested output format
6. Dillon clicks **Copy Prompt**.
7. Dillon pastes the prompt into ChatGPT.
8. ChatGPT creates:
   - Preview Report
   - Proposal Draft
   - Email Draft
   - Recommended Package
   - Missing Info
   - Next Steps
   - Internal Notes for Dillon
   - Implementation Build Outline if the customer pays
9. Dillon reviews and edits the output.
10. Dillon sends manually only after review.

## Status Tracking

The current manager UI can track:

- Not generated
- Generated
- Pasted to ChatGPT
- Preview drafted
- Sent to customer
- Paid
- Lost

Prompt status and prompt archive are stored in the browser for now. Backend persistence can be added later with admin auth.

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

## Safety

- Do not expose secrets.
- Do not call OpenAI from the app for this worker.
- Do not auto-send emails.
- Do not claim the customer system is already built.
- Keep all customer-facing output draft-first and manually reviewed.
