# SignalOps SEO QA Checklist

Use this checklist before publishing major page changes, launching a new SEO page batch, or deploying to production.

## Recommended Command Sequence

Run the automated checks first:

```bash
npm run lint
npm run typecheck
npm run build
npm run seo:qa
```

`npm run seo:qa` inspects the built HTML in `.next/server/app`, so it must run after `npm run build`.

The automated script checks:

- Missing title metadata
- Missing meta descriptions
- Duplicate page titles
- Missing canonical URLs
- Missing H1s
- Multiple H1s
- Images missing `alt` attributes
- Broken internal links in rendered HTML
- Built sitemap output
- Built robots output
- Sitemap URLs that do not map to built pages
- Robots `Sitemap` directive

The script is intentionally lightweight. It does not replace a browser QA pass, Search Console review, or structured data validation.

## Metadata

- Each indexable page should have a unique title.
- Each page should have a clear meta description written for business owners, not search engines only.
- Canonical URLs should use the production domain through `NEXT_PUBLIC_SITE_URL`.
- Open Graph and Twitter/X metadata should be present on important public pages.
- Avoid duplicated titles across service, industry, and use-case pages.
- Keep titles specific enough to match search intent.

## Schema Validation

- Validate JSON-LD with Google's Rich Results Test or Schema.org validator before launch.
- Confirm Organization and WebSite schema render on the site.
- Confirm Service schema describes the SignalOps AI Lead Response & Intake System.
- Confirm FAQPage schema appears only on pages with visible FAQ content.
- Confirm BreadcrumbList schema uses real, reachable URLs.
- Do not use fake reviews, ratings, case studies, or claims in schema.

## Sitemap

- Visit `/sitemap.xml` on the preview or production deployment.
- Confirm important public pages are included:
  - Homepage
  - Free Missed Lead Check page
  - Service SEO pages
  - Industry SEO pages
  - How-it-works page
  - Live demo page
  - ROI calculator
  - Privacy and terms
- Confirm intentionally internal/demo-only pages are excluded if they should not rank.
- Submit the production sitemap in Google Search Console after launch.

## Robots

- Visit `/robots.txt` on preview or production.
- Confirm public pages are allowed.
- Confirm private/internal/API routes are disallowed where appropriate.
- Confirm the sitemap URL points to the production domain.
- Do not block CSS, JS, or public assets required for rendering.

## Page Speed

- Run Lighthouse or PageSpeed Insights on the homepage and a sample SEO landing page.
- Check mobile and desktop separately.
- Watch for oversized images, render-blocking scripts, unused JavaScript, and layout shift.
- Keep analytics scripts conditional and only load them when env vars are configured.
- Avoid adding large client-side libraries for static SEO pages.

## Mobile Usability

- Test each new page on a narrow viewport.
- Confirm the H1 wraps cleanly.
- Confirm CTA buttons do not overflow.
- Confirm cards stack in a readable order.
- Confirm the footer remains usable with many service and industry links.
- Confirm forms remain easy to complete on mobile.

## Core Web Vitals

- Review Largest Contentful Paint for hero sections.
- Review Cumulative Layout Shift for image, card, and CTA areas.
- Review Interaction to Next Paint on interactive pages like `/audit`, `/demo`, `/live-demo`, and `/roi-calculator`.
- Keep SEO pages mostly server-rendered and static.
- Use optimized images and stable dimensions where meaningful visuals are used.

## Search Console

- Add and verify the production domain in Google Search Console.
- Submit `/sitemap.xml`.
- Inspect the homepage and key service pages after deployment.
- Check indexing status after Google crawls the site.
- Review coverage issues, canonical mismatches, blocked pages, and mobile usability warnings.

## Internal Links

- Every SEO page should link to the Free Missed Lead Check.
- Every industry page should link to `/live-demo`.
- Service pages should link to related service/use-case pages.
- Footer links should include key services and industries without overwhelming the main navigation.
- Avoid orphan pages.
- Avoid linking heavily to pages that are blocked from indexing unless they are intentionally demo/internal pages.

## Indexing Status

- Confirm new pages are in the sitemap.
- Confirm canonical URLs match the final production URLs.
- Confirm important pages are not accidentally `noindex`.
- Confirm duplicate or thin pages are not being created.
- Keep `/dashboard` treated as demo/internal unless intentionally changed.

## Conversion Tracking

- Confirm CTA clicks still work after SEO changes.
- Confirm `audit_cta_clicked` fires when analytics env vars are configured.
- Confirm form start and form submit events still fire for `/audit`.
- Confirm demo lead submission events still fire for `/demo`.
- Confirm tracking scripts do not load when env vars are blank.
- Confirm analytics IDs are public-safe and no server secrets are exposed.

## Manual Copy Review

- Use plain-English business-owner language.
- Avoid generic AI buzzwords.
- Avoid fake guarantees or implied results.
- Use industry-specific examples.
- Make human review conditions clear for urgent, risky, regulated, or uncertain situations.
- Keep the primary CTA consistent: `Get a Free Missed Lead Check`.
