# SignalOps Public Site Release Audit

Date: May 11, 2026

## Pages Audited

- `/`
- `/preview`
- `/demo`
- `/live-demo`
- `/roi-calculator`
- `/how-it-works`
- `/audit`
- `/privacy`
- `/terms`
- `/alternatives`
- Top-level SEO pages: `/ai-lead-response`, `/missed-call-text-back`, `/ai-follow-up-automation`, `/ai-lead-qualification`, `/lead-management-for-small-business`, `/no-crm-lead-tracking`
- Service pages from `app/sitemap.ts`
- Industry pages from `app/sitemap.ts`
- Alternative pages from `app/sitemap.ts`

## Major Fixes Made

- Replaced the mobile floating “Lead OS / Start” CTA with a calmer floating email option.
- Added a public floating email pill that links to `signalopspro@gmail.com` and stays hidden on admin/API/test routes.
- Simplified `/preview` around the current mobile direction: System Map, Build Plan, Next Steps, then the form.
- Added conditional form inputs for “Other lead source” and “Other industry.”
- Persisted those custom form values through the preview submission model, Supabase store mapping, admin details, and prompt-worker intake data.
- Fixed ROI calculator singular/plural wording for labels like job/jobs and account/accounts.
- Updated Privacy and Terms launch dates to May 11, 2026.
- Removed the public placeholder legal-counsel sentence from Terms.
- Cleaned public-facing language away from qualification/scoring phrasing where it was visible to visitors.
- Reduced repeated “Free Preview” CTA pressure on service, SEO, industry, and alternative pages.
- Confirmed RouteWash Mobile Fleet Care remains the featured demo direction.

## Mobile Checks

Checked target mobile widths:

- 320px
- 375px
- 390px
- 430px

Focus areas:

- No old mobile sticky Lead OS CTA.
- Floating Email Us pill present without blocking the main flow.
- Mobile homepage keeps the newer OS/product direction.
- `/preview` is form-focused and visually aligned.
- Footer remains simplified on mobile.

## Link And Route Checks

Smoke-check scope:

- Public navigation routes
- Sitemap routes
- Preview form route
- Demo and ROI CTAs
- Footer links
- Email links

## Remaining Notes

- Supabase remains the source of truth for admin/prompt-worker persistence.
- The updated Supabase SQL includes dedicated `other_industry` and `other_lead_source` columns for cleaner cross-device storage.
- Admin/internal pages can still use operational labels such as prompt-worker, draft, and internal status; the public site avoids those phrases.
