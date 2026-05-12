# SignalOps Visual Review

SignalOps now uses a normal public noindex webpage for visual review. This is the preferred path because ChatGPT can inspect regular images on a webpage more reliably than artifact ZIPs, PDFs, or external screenshot URLs.

## Preferred Review Workflow

1. Codex pushes an update to `main`.
2. The `Visual Audit Artifact` workflow runs automatically.
3. GitHub waits 90 seconds for the live Vercel site to update.
4. Playwright captures public-page screenshots from `https://www.signalops.pro`.
5. The workflow replaces the latest screenshot set in `public/visual-review/latest/`.
6. The workflow commits the latest screenshots and manifest back to `main`.
7. Dillon tells ChatGPT:

```text
Review https://www.signalops.pro/visual-review
```

## ChatGPT Review URL

Use:

```text
https://www.signalops.pro/visual-review
```

The page displays committed contact sheet images first, then the individual latest screenshots grouped by route and viewport. No manual upload, artifact ZIP, PDF, public key, or Supabase setup is needed.

## Captured Routes

Public pages only:

- `/`
- `/preview`
- `/demo`
- `/roi-calculator`
- `/how-it-works`
- `/services/ai-lead-response`
- `/industries/mobile-fleet-wash`
- `/alternatives`

The audit must never capture `/admin/*`, `/api/*`, authenticated pages, private pages, or customer/admin screenshots.

## Viewports

- `mobile-390`: `390x844`
- `desktop-1440`: `1440x1400`
- `mobile-430`: `430x932`, homepage and preview only

## Storage Rules

- Only the latest screenshot set is committed.
- Latest files live under `public/visual-review/latest/`.
- Contact sheets are committed in the same folder, currently:
  - `contact-sheet-home-preview.jpg`
  - `contact-sheet-demo-roi.jpg`
  - `contact-sheet-seo-pages.jpg`
- Historical screenshot runs are not kept in the repo.
- Raw temporary output stays under `.visual-audit-output/` and is ignored by Git.
- The GitHub Actions artifact is still uploaded as a backup for 30 days.

## Workflow Details

Workflow:

```text
.github/workflows/visual-audit-artifact.yml
```

Script:

```text
scripts/visual-audit-artifact.ts
```

Commit message used by the workflow:

```text
Update visual review screenshots [skip visual-audit]
```

The workflow skips commits containing either:

```text
[skip visual-audit]
[skip visual-review]
```

It also ignores pushes where only `public/visual-review/**` or `docs/visual-audit-latest.json` changed. This prevents loops.

## Deprecated Fallbacks

The old PDF, GitHub artifact ZIP, and Supabase Storage approaches are fallback/deprecated for normal review. The primary review path is the public noindex image page:

```text
https://www.signalops.pro/visual-review
```
