# SignalOps AI

SignalOps builds AI-powered lead response systems that help small and local businesses capture, qualify, route, follow up with, and book more leads automatically. This app contains the marketing site, demo client pages, lead intake demos, dashboard, documentation, and brand assets.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style UI primitives
- Supabase client helpers for database and auth
- Mobile-first responsive pages

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

If Windows PowerShell blocks `npm`, use:

```bash
npm.cmd run dev
```

## Verification

Run lint:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

Run a production build:

```bash
npm run build
```

Run the SEO QA checker after a production build:

```bash
npm run seo:qa
```

The SEO QA script inspects the generated HTML in `.next/server/app`, so `npm run build` must run first. It checks titles, descriptions, canonicals, H1s, image alt attributes, internal links, sitemap output, and robots output.

For a final local smoke test, start the dev server and check the key routes:

```bash
npm run dev
```

Open `http://localhost:3000` and verify `/`, `/live-demo`, `/demo`, `/audit`, `/dashboard`, `/how-it-works`, `/roi-calculator`, `/privacy`, and `/terms`.

## Project Structure

```txt
app/
  (marketing)/page.tsx
  live-demo/page.tsx
  audit/page.tsx
  demo/page.tsx
  dashboard/page.tsx
  how-it-works/page.tsx
  roi-calculator/page.tsx
  privacy/page.tsx
  terms/page.tsx
  sitemap.ts
  robots.ts
  api/lead/route.ts
  api/live-demo/route.ts
components/
  site/
  ui/
  forms/
  demo/
  dashboard/
scripts/
  seo-qa.mjs
lib/
  supabase/server.ts
  supabase/client.ts
  supabase/database.types.ts
  constants.ts
  demo-generator.ts
  demo-templates.ts
  lead-scoring.ts
  lead-store.ts
  mock-data.ts
  seo.ts
  utils.ts
docs/
  signalops-brand-kit.md
  seo/seo-qa-checklist.md
  seo/technical-seo-checklist.md
  supabase-schema.sql
public/
  brand/
```

## Environment

Copy `.env.example` to `.env.local` and add real values as integrations are added. The current demo runs without external services.

Set the public site URL before production launch so canonical URLs, sitemap URLs, robots, and Open Graph metadata use the real domain:

```bash
NEXT_PUBLIC_SITE_URL=https://signalops.pro
```

### Supabase Setup

SignalOps works in mock mode when Supabase variables are blank. To use Supabase:

1. Create a Supabase project.
2. Open the Supabase SQL editor and run `docs/supabase-schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` both work as the public browser-safe key. Use one or both depending on the Supabase dashboard label. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed in browser code.

Lead submissions are written through `/api/lead`, which uses the server storage layer. With only the public key configured, the app can submit leads if the public insert policy from `docs/supabase-schema.sql` has been applied. For dashboard reads, status updates, and internal operations, add `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

If the Supabase variables are missing, the app falls back to the in-memory mock lead store so local demos keep working.

The Supabase packages are already installed:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

`proxy.ts` keeps Supabase auth sessions refreshed with the Next.js 16 proxy convention.

### Email and Notification Policy

Client-facing email is currently:

```bash
OWNER_ALERT_EMAIL=signalopspro@gmail.com
EMAIL_DELIVERY_MODE=draft
```

SignalOps is intentionally draft-only for email replies. Even if `RESEND_API_KEY` is configured later, the current integration layer prepares draft/review output and does not send customer emails automatically. Do not change this behavior unless the owner explicitly approves live sending.

### AI Qualification Setup

AI qualification and the live demo generator are optional. Add these server-only values to `.env.local` when you are ready to use OpenAI:

```bash
OPENAI_API_KEY=
OPENAI_MODEL=
```

If `OPENAI_API_KEY` is blank or an AI request fails, SignalOps uses deterministic fallbacks. Lead scoring falls back to `lib/lead-scoring.ts`; the live demo generator falls back to stored industry templates in `lib/demo-templates.ts`.

### Analytics Setup

Analytics is optional and disabled by default. Add any of these public IDs to `.env.local` when you are ready to activate tracking:

```bash
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=
```

`components/site/AnalyticsProvider.tsx` only loads Google Analytics, Meta Pixel, or LinkedIn Insight scripts when the matching env variable is present. Conversion events are centralized in `lib/analytics.ts` and currently include audit CTA clicks, demo views, audit form start/submission, demo lead submissions, package clicks, and contact clicks.

For Vercel Analytics, add the official Vercel Analytics package/provider later if desired. SignalOps already forwards events to `window.va` when that client is available, while still working safely when it is absent.

## Routes

- `/` - SignalOps marketing homepage
- `/live-demo` - Live demo generator for prospect-specific SignalOps examples
- `/how-it-works` - Visual AI Lead Engine explainer
- `/roi-calculator` - Revenue impact estimate calculator for lead response and follow-up
- `/audit` - Free Lead Leak Audit request page
- `/demo` - Fictional client website and intake demo
- `/dashboard` - Lightweight internal dashboard demo
- `/privacy` - Privacy policy
- `/terms` - Terms of use
- `/api/lead` - Lead intake API endpoint
- `/api/live-demo` - Server-side live demo generation endpoint

## Launch and Deployment

- Launch checklist: `docs/launch-checklist.md`
- SignalOps brand kit: `docs/signalops-brand-kit.md`
- Vercel deployment guide: `docs/deployment-vercel.md`
- Technical SEO checklist: `docs/seo/technical-seo-checklist.md`
- SEO QA checklist: `docs/seo/seo-qa-checklist.md`
- Final SEO launch audit: `docs/seo/final-seo-audit.md`
- Performance checklist: `docs/seo/performance-checklist.md`
- Social sharing checklist: `docs/seo/social-sharing-checklist.md`
- Google Search Console setup: `docs/seo/google-search-console-setup.md`

Before deploying an SEO page batch, run:

```bash
npm run lint
npm run typecheck
npm run build
npm run seo:qa
```
