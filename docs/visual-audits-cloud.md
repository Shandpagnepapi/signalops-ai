# SignalOps Cloud Visual Audits

SignalOps can generate browser screenshots of public pages, upload them to Supabase Storage, and display the latest run at a hidden noindex URL for design review.

## What It Captures

The visual audit script captures public pages only:

- `/`
- `/preview`
- `/demo`
- `/roi-calculator`
- `/how-it-works`
- `/privacy`
- `/terms`
- `/services/ai-lead-response`
- `/industries/mobile-fleet-wash`
- `/alternatives`

It must never capture `/admin/*`, `/api/*`, or any authenticated/private page.

## Supabase Storage Setup

Create a Supabase Storage bucket:

```text
visual-audits
```

Set the bucket to public. This is acceptable because the screenshots are public website pages only. Do not upload admin or private screenshots.

The upload script can create or update the bucket as public when it has `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`. The preflight check is stricter and expects the bucket to already exist so configuration problems are caught before screenshots start.

## Environment Variables

Set these in Vercel and GitHub Actions secrets:

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
VISUAL_AUDIT_ENABLED=true
VISUAL_AUDIT_PUBLIC_KEY=choose-a-long-unlisted-review-key
VISUAL_AUDIT_BUCKET=visual-audits
VISUAL_AUDIT_MAX_AGE_DAYS=30
VISUAL_AUDIT_MAX_RUNS=12
VISUAL_AUDIT_MAX_STORAGE_MB=300
```

Use `SUPABASE_SECRET_KEY` for new Supabase API keys when available. Use `SUPABASE_SERVICE_ROLE_KEY` only for legacy `service_role` JWT keys.

`SUPABASE_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are server-side/script-only. Never expose them to browser code. Never use anon or publishable keys for visual audit uploads.

GitHub Actions secrets are separate from Vercel environment variables. If the site works in Vercel but the workflow fails, check the GitHub repo secrets too.

`VISUAL_AUDIT_PUBLIC_KEY` is not an admin password. It is only an unlisted review key for the hidden visual audit page.

## Run Locally

Install dependencies and Playwright browsers first:

```bash
npm install
npx playwright install chromium
```

Run against the live site:

```bash
npm run visual:audit:cloud
```

Run against local development:

```bash
npm run visual:audit:cloud:local
```

Optional direct usage:

```bash
npm exec -- tsx scripts/visual-audit-cloud.ts --base-url=https://www.signalops.pro --run-label=pre-launch
```

Run the safe Supabase preflight before a screenshot run:

```bash
npm run visual:audit:preflight
```

The preflight prints only safe diagnostics. It never prints full keys.

## View Screenshots

Open:

```text
https://www.signalops.pro/visual-audits?key=YOUR_PUBLIC_REVIEW_KEY
```

The page is hidden and noindex/nofollow. It is not added to navigation or the sitemap.

## ChatGPT Review URL

Use this format:

```text
https://www.signalops.pro/visual-audits?key=YOUR_VISUAL_AUDIT_PUBLIC_KEY
```

Workflow:

1. Run the visual audit first so `latest.json` and the screenshots exist in Supabase Storage.
2. Paste the review URL into ChatGPT.
3. ChatGPT can open the hidden page and review the screenshots visually.
4. No manual screenshot upload is needed.

Do not commit the actual key to the repo. Keep it in Vercel and GitHub secrets only.

## GitHub Action

Manual workflow:

```text
.github/workflows/visual-audit-cloud.yml
```

Run it from GitHub Actions with `workflow_dispatch`. It installs dependencies, installs Playwright Chromium, captures public pages, uploads screenshots, uploads `manifest.json`, updates `latest.json`, and applies retention cleanup.

The workflow runs `scripts/supabase-visual-audit-preflight.ts` before Playwright starts. If Supabase rejects the URL/key/bucket, the job stops before screenshot capture.

Required GitHub secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SECRET_KEY` if using new Supabase secret keys
- `SUPABASE_SERVICE_ROLE_KEY`
- `VISUAL_AUDIT_ENABLED`
- `VISUAL_AUDIT_PUBLIC_KEY`
- `VISUAL_AUDIT_BUCKET`
- `VISUAL_AUDIT_MAX_AGE_DAYS`
- `VISUAL_AUDIT_MAX_RUNS`
- `VISUAL_AUDIT_MAX_STORAGE_MB`

## Storage Layout

```text
visual-audits/
  latest.json
  runs/
    YYYY-MM-DD-HHMMSS/
      home-mobile-390.jpg
      preview-mobile-390.jpg
      ...
      manifest.json
```

Manifest shape:

```json
{
  "runId": "2026-05-11-171500",
  "createdAt": "2026-05-11T22:15:00.000Z",
  "baseUrl": "https://www.signalops.pro",
  "routes": ["/", "/preview"],
  "viewports": [
    {
      "name": "mobile-390",
      "width": 390,
      "height": 844
    }
  ],
  "screenshots": [
    {
      "route": "/",
      "routeSlug": "home",
      "viewport": "mobile-390",
      "width": 390,
      "height": 844,
      "publicUrl": "https://...",
      "path": "runs/2026-05-11-171500/home-mobile-390.jpg"
    }
  ],
  "notes": "Public SignalOps visual audit screenshots only. No admin/private pages captured.",
  "commit": "abc1234"
}
```

## Retention

Defaults:

- 30 days
- 12 runs
- 300 MB total

Cleanup deletes oldest runs first and only operates inside the `visual-audits` bucket under `runs/*`. It never deletes outside the visual audit bucket/path.

Run cleanup manually:

```bash
npm run visual:audit:cleanup:cloud
```

Dry run:

```bash
npm exec -- tsx scripts/cleanup-visual-audits-cloud.ts --dry-run
```

## Troubleshooting

### `StorageApiError: signature verification failed`

This means Supabase rejected the key signature. Common causes:

- The key belongs to a different Supabase project than `NEXT_PUBLIC_SUPABASE_URL`.
- The key was rotated and GitHub Actions still has the stale value.
- An anon or publishable key was copied instead of `SUPABASE_SECRET_KEY` or legacy `service_role`.
- The GitHub secret has extra spaces, quotes, or newlines.
- Vercel has the right env var but GitHub Actions does not. They are separate stores.

Run:

```bash
npm run visual:audit:preflight
```

The preflight prints safe fingerprints only, such as the key source, key format, first 6 / last 4 character fingerprint, parsed URL project ref, JWT role if using a legacy JWT, and whether Storage bucket access works.

### Wrong Project Key

The project ref in `NEXT_PUBLIC_SUPABASE_URL` should match the Supabase project where the admin/secret key was created. If using a legacy JWT and the token includes a `ref` claim, the preflight compares it to the URL ref.

### Anon Or Publishable Key Used

Visual audit uploads require elevated server-side access. Do not use:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `sb_publishable_...`
- legacy JWTs with role `anon`

Use:

- `SUPABASE_SECRET_KEY=sb_secret_...`
- or legacy `SUPABASE_SERVICE_ROLE_KEY=eyJ...` with role `service_role`

### Bucket Missing Or Private

Create the `visual-audits` bucket in Supabase Storage and make it public. The viewer page uses public object URLs, and screenshots are public-site-only.

## Security Rules

- Never capture `/admin/*`.
- Never capture `/api/*`.
- Never upload private/admin screenshots.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Keep `/visual-audits` hidden and noindex.
- Treat the visual audit key as an unlisted review key, not admin security.
