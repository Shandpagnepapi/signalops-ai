# Prompt Worker Smoke-Test Example

Use this example to verify that the prompt worker handles fake/test submissions without creating send-ready customer copy.

## Fake Submission

```md
Business name: SignalOps Smoke Test Shop
Contact name: Test User
Email: test@example.com
Phone: (555) 555-0123
Website: https://example.com
Industry: Wheel repair
Main services: curb rash repair, bent wheel repair, refinishing
Main lead sources: Website form, Missed calls, Instagram
Biggest bottleneck: No follow-up
Current tools/CRM: Spreadsheet
What happens after a lead comes in: This is a smoke test and safe to delete. Do not contact.
Average job value: 250
Monthly lead volume: 21-75
Anything else: Test submission only.
```

## Expected Prompt Worker Classification

- Suspected test submission: yes
- Test signals should include example.com, 555-style phone number, smoke test, safe to delete, do not contact, or test submission.
- Recommended system template may still be Quote Intake OS because the fake business is wheel repair.
- Recommended package may still be Growth because the fake intake has multiple lead sources and follow-up needs.
- Confidence should be low because the record is likely internal/test data.

## Expected ChatGPT Handling

ChatGPT should return the official structure:

```md
# SignalOps Free Preview Output
```

The first section should mark the record as internal/test only.

The customer-facing Preview Report, Proposal Draft, and Email Draft should either be omitted as send-ready copy or clearly labeled as examples only / not for sending.

The Email Draft section should not include a send-ready prospect email. It should say the record appears to be a smoke test and should not be sent unless Dillon verifies it is real.

The output should still demonstrate:

- Internal Summary for Dillon
- Customer-facing preview structure as example-only
- Proposal reasoning
- Operating System Template
- Visual Preview Notes
- Paid Client Build Outline
