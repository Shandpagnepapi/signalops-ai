# Prompt Worker Smoke-Test Example

Use this example to verify that the prompt worker handles fake/test submissions without creating send-ready customer copy.

## Fake Submission

```md
Business name: SignalOps Smoke Test Shop
Contact name: Test User
Email: test@example.com
Phone: (555) 555-0123
Website: https://example.com
Industry: Mobile fleet washing
Main services: Mobile fleet washing, recurring wash plans, dealership lot refresh, service van washing, box truck washing
Main lead sources: Website form, Missed calls, Google Business Profile, referrals
Biggest bottleneck: Quotes and recurring account follow-up
Current tools/CRM: Spreadsheet
What happens after a lead comes in: Fleet manager asks for pricing. Owner manually asks for fleet size, vehicle types, locations, frequency, and wash window. Follow-up is inconsistent. This is a smoke test and safe to delete. Do not contact.
Average account value: 750/month
Monthly lead volume: 21-75
Anything else: Test submission only.
```

## Expected Prompt Worker Classification

- isTestSubmission: true
- contactAllowed: false
- testReason should mention example.com, 555 phone, smoke-test, safe-to-delete, do-not-contact, or test-submission indicators.
- Recommended system template may still be Quote Intake OS because the fake business is quote-based mobile fleet washing.
- Recommended package may still be Growth because the fake intake has multiple lead sources and follow-up needs.
- Confidence should be low because the record is likely internal/test data.

## Expected ChatGPT Handling

ChatGPT should return the official structure:

```md
# SignalOps Free Preview Output
```

The first section should mark the record as internal/test only.

The first section should include `Contact allowed: no`.

The customer-facing Preview Report, Proposal Draft, and Email Draft should either be omitted as send-ready copy or clearly labeled as examples only / not for sending.

The Email Draft section should not include a send-ready prospect email. It should say the record appears to be a smoke test and should not be sent unless Dillon verifies it is real.

The output should still demonstrate:

- Internal Summary for Dillon
- Customer-facing preview structure as example-only
- Proposal reasoning
- Operating System Template
- Visual Preview Notes
- Paid Client Build Outline
