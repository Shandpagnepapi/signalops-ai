# SignalOps Visual Audit

SignalOps uses GitHub Actions artifacts as the normal visual audit workflow. After a push to `main`, GitHub captures screenshots of the live public site and stores them as a downloadable artifact for 30 days.

## How It Works

1. Push a release update to `main`, or run the `Visual Audit Artifact` workflow manually.
2. GitHub waits 90 seconds for the live Vercel site to update.
3. Playwright captures public-page screenshots from `https://www.signalops.pro`.
4. The workflow uploads the screenshots and contact sheet as a GitHub Actions artifact.
5. The workflow updates `docs/visual-audit-latest.json` with the latest artifact metadata.

Screenshots are not committed to GitHub. Only the small metadata JSON file is committed.

## ChatGPT Review

Tell ChatGPT:

```text
review latest visual audit
```

ChatGPT can use the GitHub connector to inspect `docs/visual-audit-latest.json`, find the latest workflow run and artifact, and review the contact sheet/screenshots. No manual screenshot upload is needed.

## Captured Routes

Public pages only:

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

The audit must never capture `/admin/*`, `/api/*`, or private/authenticated pages.

## Viewports

- `mobile-390`: `390x844`
- `mobile-430`: `430x932`, homepage and preview only
- `desktop`: `1440x1400`

## Artifact Contents

Artifact name:

```text
signalops-visual-audit-${GITHUB_RUN_ID}
```

Contents:

- page screenshots as JPEG files
- `contact-sheet.html`
- `contact-sheet.png`
- `manifest.json`

Retention: 30 days.

## Manual Run

In GitHub:

1. Open the repository Actions tab.
2. Choose `Visual Audit Artifact`.
3. Click `Run workflow`.

## Skip Behavior

The workflow skips commits that contain:

```text
[skip visual-audit]
```

It also ignores pushes where only `docs/visual-audit-latest.json` changed. This prevents the metadata update commit from triggering another screenshot run.

## Legacy Supabase Workflow

The older Supabase Storage visual audit workflow is deprecated for normal review. Keep it only as a fallback or archive path. The preferred workflow is GitHub Actions artifacts.
