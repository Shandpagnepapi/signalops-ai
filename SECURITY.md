# SignalOps Security Policy

SignalOps is a public marketing/demo project with lead intake, demo qualification, and dashboard preview features. Keep launch security simple and strict.

## Secrets

- Do not commit `.env`, `.env.local`, or other local secret files.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, Twilio tokens, Resend keys, and internal tokens server-only.
- Never put secrets in variables that start with `NEXT_PUBLIC_`.
- Store production secrets in Vercel Environment Variables, not in the repository.

## Public Demo Data

- The public dashboard must only show mock/demo data.
- Real lead submissions must not be exposed through public pages or browser-side API calls.
- `GET /api/lead` must stay protected by internal authentication.
- Public `POST /api/lead` may accept form submissions, but should keep payload limits and rate limiting enabled.

## Reporting Issues

Report security issues privately to:

`signalopspro@gmail.com`

Please include the affected URL, reproduction steps, and any relevant screenshots or request details. Do not post public exploit details before there has been time to review and fix the issue.
