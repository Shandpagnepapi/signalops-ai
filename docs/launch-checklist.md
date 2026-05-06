# SignalOps Launch Checklist

Use this checklist before making SignalOps publicly accessible. Mark each item complete only after you verify it in a live browser session.

## 1) Brand Review

- [ ] Logo files load correctly across key pages (`/`, `/demo`, `/audit`, `/dashboard`)
- [ ] Brand name appears consistently as `SignalOps`
- [ ] Tagline and offer language match the current brand kit
- [ ] Colors and typography feel consistent across mobile and desktop

## 2) Copy Review

- [ ] Homepage copy is clear and free of placeholder text
- [ ] Demo page copy reflects Apex Wheel Repair use case accurately
- [ ] Dashboard labels are understandable for non-technical owners
- [ ] No outdated references (including old client names)
- [ ] Typos and grammar pass final review

## 3) Mobile QA

- [ ] Test at common sizes: `390x844`, `428x926`, `768x1024`
- [ ] Navigation and CTAs are tappable without overlap
- [ ] Forms are usable without horizontal scrolling
- [ ] Sticky/mobile CTA behavior works as intended
- [ ] Hero sections remain readable on small screens

## 4) Form Testing

- [ ] `/audit` form submits successfully
- [ ] `/demo` lead intake form submits successfully
- [ ] Required field validation appears when inputs are missing
- [ ] Success state renders with score, priority, and AI qualification details
- [ ] Error state renders friendly messaging when submission fails

## 5) API Route Testing

- [ ] `POST /api/lead` accepts valid payloads
- [ ] `POST /api/lead` rejects invalid/empty payloads with useful errors
- [ ] `GET /api/lead` returns a lead list
- [ ] `GET /api/lead?id=...` returns a specific lead when available
- [ ] Fallback behavior works when optional integrations are not configured

## 6) Demo Testing

- [ ] Apex Wheel Repair page loads fully (`/demo`)
- [ ] Service sections and conversion CTAs display correctly
- [ ] SignalOps demo workflow panel is visible and understandable
- [ ] Demo lead qualification logic appears realistic and useful
- [ ] No unsafe repair claims (cracked/structural cases route to inspection/replacement guidance)

## 7) Dashboard Testing

- [ ] `/dashboard` loads without errors
- [ ] KPI cards show realistic values
- [ ] Pipeline columns render correctly
- [ ] Lead table supports filtering and detail inspection
- [ ] Timeline events appear for qualification and mock integrations

## 8) SEO Metadata

- [ ] Global metadata title/description are set
- [ ] Route metadata exists for homepage, audit, demo, dashboard, how-it-works
- [ ] Open Graph image references are valid
- [ ] Canonical URLs are set where needed
- [ ] `NEXT_PUBLIC_SITE_URL` is updated for production domain

## 9) Privacy and Terms Links

- [ ] `/privacy` page is accessible and readable
- [ ] `/terms` page is accessible and readable
- [ ] Footer links to Privacy Policy and Terms of Use work
- [ ] Legal copy has attorney review before public launch

## 10) Analytics Setup

- [ ] Optional IDs configured as needed:
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_META_PIXEL_ID`
  - `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- [ ] Events are firing for key conversions:
  - `audit_cta_clicked`
  - `demo_viewed`
  - `audit_form_started`
  - `audit_form_submitted`
  - `demo_lead_submitted`
- [ ] Site has no runtime errors when analytics IDs are blank

## 11) Domain Setup

- [ ] Production domain purchased and controlled
- [ ] Domain connected in Vercel
- [ ] DNS records validated
- [ ] HTTPS certificate active
- [ ] `www` redirect behavior confirmed

## 12) Contact Method

- [ ] Contact email in constants is correct and monitored
- [ ] Footer contact link opens correctly
- [ ] Owner alert placeholders updated if using notification integrations

## 13) Calendly and Audit CTA

- [ ] Primary CTA points to `/audit`
- [ ] Calendly URL env var configured if using direct booking links
- [ ] Audit page final CTA works on desktop and mobile
- [ ] Demo and how-it-works pages include visible path to the Free Lead Leak Audit

## 14) Test Lead Submission (Final Dry Run)

- [ ] Submit one realistic audit lead in production preview
- [ ] Submit one realistic Apex wheel repair lead in production preview
- [ ] Confirm scoring, priority, and summary output quality
- [ ] Confirm dashboard reflects new mock/store data path
- [ ] Confirm no sensitive keys are exposed in browser devtools

## 15) Final Deployment

- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Preview deployment verified by stakeholder
- [ ] Production deployment promoted in Vercel
- [ ] Post-launch smoke test completed on live domain (`/`, `/audit`, `/demo`, `/dashboard`, `/privacy`, `/terms`)

## Launch Sign-Off

- Launch owner: `[Name]`
- Date approved: `[YYYY-MM-DD]`
- Version/commit: `[Git SHA or release tag]`
