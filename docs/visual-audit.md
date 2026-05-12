# SignalOps Visual Audit

SignalOps uses a public PDF contact sheet as the normal visual audit workflow. After a push to `main`, GitHub captures screenshots of the live public site, publishes the latest PDF at `/visual-audits/latest.pdf`, and stores the full screenshot folder as a backup artifact for 30 days.

## How It Works

1. Push a release update to `main`, or run the `Visual Audit Artifact` workflow manually.
2. GitHub waits 90 seconds for the live Vercel site to update.
3. Playwright captures public-page screenshots from `https://www.signalops.pro`.
4. The workflow creates a PDF contact sheet.
5. The workflow uploads the full screenshot folder as a GitHub Actions artifact.
6. The workflow commits only the latest public PDF and metadata JSON files back to `main`.

Raw screenshots are not committed to GitHub. Only `public/visual-audits/latest.pdf`, `public/visual-audits/latest.json`, and `docs/visual-audit-latest.json` are updated.

## Preferred Review Workflow

1. Codex pushes an update to `main`.
2. The `Visual Audit Artifact` workflow runs automatically.
3. It publishes:

```text
https://www.signalops.pro/visual-audits/latest.pdf
```

4. Dillon tells ChatGPT:

```text
Review the latest visual audit PDF.
```

5. ChatGPT opens the PDF and visually reviews the site.

No manual upload and no artifact ZIP download is needed for normal review.

## Backup Artifact Review

The GitHub Actions artifact still exists as a backup. Tell ChatGPT:

```text
review latest visual audit
```

ChatGPT can use the GitHub connector to inspect `docs/visual-audit-latest.json`, find the latest workflow run and artifact, and review the full screenshot folder if the PDF is not enough.

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
- `contact-sheet.pdf`
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

The workflow also ignores pushes where only the latest public visual-audit files changed:

- `public/visual-audits/latest.pdf`
- `public/visual-audits/latest.json`

## Legacy Supabase Workflow

The older Supabase Storage visual audit workflow is deprecated for normal review. Keep it only as a fallback or archive path. The preferred workflow is GitHub Actions artifacts.
