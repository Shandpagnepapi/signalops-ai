# SignalOps Security Policy

SignalOps is a public marketing/demo project with lead intake, demo qualification, and dashboard preview features. Keep launch security simple and strict.

## Secrets

- Do not commit `.env`, `.env.local`, or other local secret files.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, Twilio tokens, Resend keys, and internal tokens server-only.
- Never put secrets in variables that start with `NEXT_PUBLIC_`.
- Store production secrets in Vercel Environment Variables, not in the repository.
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` protect `/admin/*` and `/api/admin/*` with HTTP Basic Auth. Do not hardcode or commit real admin credentials.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used in server-only modules and must never be returned from API responses or exposed to client components.

## Admin Access

- `/admin/*` and `/api/admin/*` are protected by Basic Auth.
- If `ADMIN_USERNAME` or `ADMIN_PASSWORD` is missing, admin routes are blocked with `Admin access is not configured.`
- Public routes such as `/`, `/preview`, `/demo`, `/live-demo`, `/roi-calculator`, `/how-it-works`, `/privacy`, `/terms`, and `/api/preview` remain public.
- Admin pages are marked noindex and `/admin/` is disallowed in robots rules.

## Public Demo Data

- The public dashboard must only show mock/demo data.
- Real lead submissions must not be exposed through public pages or browser-side API calls.
- `GET /api/lead` must stay protected by internal authentication.
- Public `POST /api/lead` may accept form submissions, but should keep payload limits and rate limiting enabled.
- Public `/api/preview` accepts Free Preview submissions. It must keep payload limits, field validation, a honeypot, and IP-based rate limiting enabled.

## Admin Workflow Persistence

- Supabase is the source of truth for Free Preview and Prompt Worker admin workflow persistence.
- Generated prompts, prompt status, internal notes, paid/lost/sent markers, selected package/template fields, and test/do-not-contact flags persist through Supabase.
- Browser `localStorage` and `sessionStorage` must not be used for business workflow persistence.
- If Supabase is missing, admin persistence is disabled or local mock-only for development.

## Reporting Issues

Report security issues privately to:

`signalopspro@gmail.com`

Please include the affected URL, reproduction steps, and any relevant screenshots or request details. Do not post public exploit details before there has been time to review and fix the issue.
