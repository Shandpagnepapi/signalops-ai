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

The script will also try to create or update the bucket as public when it has `SUPABASE_SERVICE_ROLE_KEY`.

## Environment Variables

Set these in Vercel and GitHub Actions secrets:

```text
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
VISUAL_AUDIT_ENABLED=true
VISUAL_AUDIT_PUBLIC_KEY=choose-a-long-unlisted-review-key
VISUAL_AUDIT_BUCKET=visual-audits
VISUAL_AUDIT_MAX_AGE_DAYS=30
VISUAL_AUDIT_MAX_RUNS=12
VISUAL_AUDIT_MAX_STORAGE_MB=300
```

`SUPABASE_SERVICE_ROLE_KEY` is server-side/script-only. Never expose it to browser code.

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

## View Screenshots

Open:

```text
https://www.signalops.pro/visual-audits?key=YOUR_PUBLIC_REVIEW_KEY
```

The page is hidden and noindex/nofollow. It is not added to navigation or the sitemap.

## GitHub Action

Manual workflow:

```text
.github/workflows/visual-audit-cloud.yml
```

Run it from GitHub Actions with `workflow_dispatch`. It installs dependencies, installs Playwright Chromium, captures public pages, uploads screenshots, uploads `manifest.json`, updates `latest.json`, and applies retention cleanup.

Required GitHub secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
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

## Security Rules

- Never capture `/admin/*`.
- Never capture `/api/*`.
- Never upload private/admin screenshots.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.
- Keep `/visual-audits` hidden and noindex.
- Treat the visual audit key as an unlisted review key, not admin security.
