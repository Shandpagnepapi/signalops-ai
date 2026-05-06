# LeadOps Deployment Guide (Vercel)

This guide walks a beginner through deploying LeadOps from local development to a live production domain on Vercel.

## 1) Prerequisites

- A GitHub account
- A Vercel account
- Node.js installed locally
- Project working locally with:
  - `npm install`
  - `npm run dev`
  - `npm run build`

## 2) Push the Project to GitHub

If your repo is not on GitHub yet, run these commands from the project root:

```bash
git init
git add .
git commit -m "Initial LeadOps launch-ready build"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If the repo already exists, commit and push your current changes:

```bash
git add .
git commit -m "Prepare LeadOps for deployment"
git push origin main
```

## 3) Connect the GitHub Repo to Vercel

1. Sign in to [Vercel](https://vercel.com/).
2. Click `Add New...` then `Project`.
3. Import your GitHub repository.
4. Keep framework preset as `Next.js`.
5. Keep default build settings unless you have a custom setup.
6. Continue to environment variable setup before first production deploy.

## 4) Configure Environment Variables in Vercel

In Vercel project settings, open `Environment Variables` and add variables from `.env.example`.

### Core recommended variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DEMO_CLIENT_NAME`

### Analytics variables (optional)

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`

If blank, analytics scripts will not load and the app still works.

### AI qualification variable (optional but recommended)

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

If missing, app uses deterministic fallback scoring.

### Supabase variables (optional if staying in mock mode)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Important:
- `SUPABASE_SERVICE_ROLE_KEY` is server-only.
- Never put service role keys in client code.

### Integration placeholders (optional)

- Calendar: `CALENDLY_URL`, `CALENDLY_ROUTING_URL`
- Notifications: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`, `RESEND_API_KEY`
- Alerts: `OWNER_ALERT_EMAIL`, `OWNER_ALERT_PHONE`
- CRM/Webhooks: `GHL_WEBHOOK_URL`, `CRM_WEBHOOK_URL`

## 5) Create and Test a Preview Deployment

Every pull request and non-production push can create a Vercel preview deployment.

1. Push a branch to GitHub.
2. Open the generated preview URL in Vercel.
3. Run a full smoke test:
   - `/`
   - `/audit`
   - `/demo`
   - `/dashboard`
   - `/how-it-works`
   - `/privacy`
   - `/terms`
4. Submit test forms on `/audit` and `/demo`.
5. Verify `/api/lead` behavior through UI success/error states.

## 6) Promote to Production

Option A (simple):
1. Merge your tested branch into `main`.
2. Vercel auto-deploys `main` to production (default setup).

Option B (manual promote):
1. Open the verified preview deployment in Vercel.
2. Use `Promote to Production` when available in your plan/workflow.

After production deploy:
- Re-test core routes and forms on the live domain.

## 7) Add a Custom Domain

1. In Vercel project settings, go to `Domains`.
2. Add your root domain (example: `leadops.ai`).
3. Add `www` if needed.
4. Update DNS records at your domain provider as instructed by Vercel.
5. Wait for DNS propagation and SSL provisioning.
6. Confirm:
   - HTTPS works
   - Root and `www` resolve correctly
   - Redirect behavior is correct
7. Update `NEXT_PUBLIC_SITE_URL` to your production URL.

## 8) Post-Launch Verification

- Run a live Free Missed Lead Checkup submission through `/audit`
- Run a live demo lead through `/demo`
- Confirm analytics events in your analytics tools (if enabled)
- Confirm legal links in footer (`/privacy`, `/terms`)
- Confirm contact method is monitored

## 9) Troubleshooting

### Build fails on Vercel but works locally

- Re-run:
  - `npm run typecheck`
  - `npm run build`
- Ensure Node/npm versions are compatible.
- Check for missing environment variables in Vercel settings.

### API route errors in production

- Check Vercel function logs for `/api/lead`.
- Confirm required env vars are set.
- If using Supabase, verify URL/key values and table schema from `docs/supabase-schema.sql`.

### Forms submit locally but fail on production

- Confirm production domain is using the correct deployment.
- Confirm no CORS or proxy issue if external services were added.
- Check browser console and Vercel logs for request failures.

### Analytics not firing

- Confirm relevant `NEXT_PUBLIC_*` analytics IDs are set in Vercel.
- Verify no ad-blocker interference during testing.
- Confirm events are triggered by UI actions.

### Supabase integration not writing leads

- Confirm `NEXT_PUBLIC_SUPABASE_URL` and public key values.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` for server operations when needed.
- Confirm schema and policies are applied.

## 10) Recommended Operating Rhythm

For safer releases:

1. Ship to preview first.
2. Use `/docs/launch-checklist.md` before production.
3. Promote only after form and API validation passes.
4. Keep a rollback plan (previous stable deployment in Vercel).
