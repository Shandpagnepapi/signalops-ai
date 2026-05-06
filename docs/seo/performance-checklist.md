# SignalOps Performance and Core Web Vitals Checklist

Use this checklist before launch, after adding major pages, and after changing images, analytics, forms, dashboards, or interactive demos.

## Recommended Command Sequence

Run:

```bash
npm run lint
npm run typecheck
npm run build
npm run seo:qa
```

Then test the deployed production or preview URL with Lighthouse and PageSpeed Insights.

## Lighthouse

Run Lighthouse on:

- Homepage: `/`
- Free Lead Leak Audit: `/audit`
- Demo: `/demo`
- Live Demo: `/live-demo`
- ROI Calculator: `/roi-calculator`
- A service SEO page: `/ai-lead-response`
- An industry SEO page: `/industries/wheel-repair`

Check:

- Performance score
- Accessibility score
- Best Practices score
- SEO score
- Largest Contentful Paint
- Cumulative Layout Shift
- Interaction to Next Paint
- Total Blocking Time

Run both mobile and desktop reports. Mobile is the priority for local service prospects.

## PageSpeed Insights

Tool:

```txt
https://pagespeed.web.dev/
```

Use the production URL, not localhost.

Review:

- Field data if available
- Lab data
- Core Web Vitals assessment
- Image optimization warnings
- Render-blocking resources
- Unused JavaScript
- Third-party script impact

If field data is unavailable, use lab data as a starting point and revisit after traffic accumulates.

## Core Web Vitals

### Largest Contentful Paint

Check:

- Hero H1 appears quickly.
- Above-the-fold images are not unnecessarily large.
- Decorative background images are not marked high priority unless they are essential.
- The main font stack does not wait on a remote font file.

### Cumulative Layout Shift

Check:

- Images have stable dimensions or use `fill` inside stable containers.
- Cards, dashboards, forms, and calculators do not jump as content loads.
- Sticky bars do not cover important mobile content.
- Result states in forms have enough spacing and do not overlap.

### Interaction to Next Paint

Check:

- Forms stay responsive while submitting.
- Demo business selector responds quickly.
- Dashboard filters and lead detail selection feel immediate.
- ROI calculator updates without visible lag.
- Live demo generator shows a clear loading state while the server works.

## Image Optimization

Check:

- Use `next/image` for meaningful page images.
- Add `width` and `height` for fixed-format images.
- Use `fill` only inside containers with stable dimensions.
- Add `sizes` for responsive images.
- Use lower `quality` for decorative or atmospheric visuals.
- Keep Open Graph images under 5 MB and preferably under 500 KB.
- Use PNG/JPG/WEBP for social card metadata; keep SVG as editable source only.
- Add useful `alt` text for meaningful images.
- Use `alt=""` for decorative images.

Current SignalOps image notes:

- Homepage hero background is decorative.
- Demo preview and before/after images are meaningful and should keep descriptive alt text.
- Logo mark in the navbar is decorative because visible text says `SignalOps`.
- Footer logo has meaningful alt text.
- Social sharing metadata uses PNG files in `public/og`.

## JavaScript Bundle Size

Check:

- Keep static SEO pages as Server Components.
- Use `"use client"` only for forms, calculators, dashboards, selectors, and genuinely interactive sections.
- Avoid moving large static page bodies into client components unless interaction requires it.
- Keep analytics scripts conditional and loaded only when env vars exist.
- Avoid adding charting, animation, or UI libraries unless the feature clearly needs them.
- Prefer CSS and server-rendered markup for marketing pages.

Good SignalOps defaults:

- Service and industry SEO pages are server-rendered.
- Analytics script loading is conditional.
- Heavy integrations are server-side.
- Forms and calculators are client-side only where needed.

## Mobile Testing

Test on narrow widths:

- `360 x 740`
- `390 x 844`
- `430 x 932`

Check:

- Hero text wraps cleanly.
- CTA buttons do not overflow.
- Cards stack naturally.
- Sticky mobile CTAs do not hide form fields.
- Forms are easy to tap.
- Dropdowns and selects are readable.
- No text overlaps inside cards or buttons.
- Dashboard tables can scroll horizontally where needed.

## Effects and Visual Polish

Check:

- Blur and glass effects are subtle.
- Hover effects do not cause layout shift.
- Gradients do not dominate the page.
- No excessive animations.
- Background images do not make text hard to read.
- Mobile pages still feel crisp when effects are reduced.

## Third-Party Scripts

Before enabling analytics:

- Confirm only required IDs are set.
- Confirm scripts do not load when env vars are blank.
- Re-run Lighthouse after enabling Google Analytics, Meta Pixel, or LinkedIn Insight Tag.
- Watch third-party script impact in PageSpeed Insights.

## Launch Performance Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `npm run seo:qa` passes.
- [ ] Homepage tested in Lighthouse mobile.
- [ ] Audit page tested in Lighthouse mobile.
- [ ] Demo page tested in Lighthouse mobile.
- [ ] ROI calculator tested in Lighthouse mobile.
- [ ] One service SEO page tested.
- [ ] One industry SEO page tested.
- [ ] No oversized image warnings remain.
- [ ] No unexpected layout shift.
- [ ] Analytics scripts are conditional.
- [ ] Production `NEXT_PUBLIC_SITE_URL` is correct.
- [ ] Social sharing images load from production URLs.
