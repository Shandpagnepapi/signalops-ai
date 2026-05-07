# SignalOps Technical SEO Checklist

This checklist documents the SEO foundation added to the SignalOps Next.js app and what should be reviewed before launch.

## Metadata

- Reusable metadata helpers live in `/lib/seo.ts`.
- Every public route should have a unique title and meta description.
- Page titles use the `SignalOps` title template.
- Open Graph and Twitter/X card metadata use the shared SignalOps OG image unless a page has a better page-specific image.
- Canonical URLs should point to the preferred public route.
- The dashboard is marked as a demo/internal page and should not be treated as a primary indexable SEO page.

## Sitemap

- Sitemap route: `/sitemap.xml`.
- Implemented with `app/sitemap.ts` using Next.js App Router conventions.
- Included pages:
  - `/`
  - `/audit`
  - `/live-demo`
  - `/how-it-works`
  - `/roi-calculator`
  - `/demo`
  - `/privacy`
  - `/terms`
- Excluded:
  - `/dashboard`
  - `/api/*`
  - `/auth/*`

## Robots

- Robots route: `/robots.txt`.
- Implemented with `app/robots.ts`.
- Allows the main public pages.
- Disallows private, internal, and API routes:
  - `/api/`
  - `/auth/`
  - `/dashboard`
- Includes the sitemap URL.

## Schema

- JSON-LD helpers live in `/lib/seo.ts`.
- App-wide schema:
  - `Organization`
  - `WebSite`
- Page-level schema:
  - `WebPage`
  - `Service` for the AI Lead Response & Qualification System on service-focused pages
  - `BreadcrumbList`
  - `FAQPage` where FAQ content exists
- Schema is server-rendered with `application/ld+json` script tags.

## Core Web Vitals

- Keep hero images optimized and served from `/public`.
- Use `next/image` for meaningful page images.
- Avoid layout shift by specifying image dimensions or using stable fill containers.
- Keep client components focused on interactive areas only.
- Avoid adding heavy dependencies for simple UI behavior.
- Test mobile viewports before launch, especially homepage, audit page, demo page, and ROI calculator.

## Internal Links

- Keep the main navigation and footer linking to:
  - Homepage
  - Free Lead Leak Audit
  - Live Demo
  - How It Works
  - ROI Calculator
  - Client Demo
- Homepage CTAs should point to `/audit`, `/live-demo`, and `/demo`.
- How It Works and ROI pages should point back to `/audit`.
- Demo pages should make the SignalOps value clear and provide a path back to the audit offer.

## Crawlability

- Important marketing copy should be visible in server-rendered HTML.
- Avoid hiding primary SEO content behind client-only interactions.
- Interactive tools can use client state, but each route still needs crawlable explanatory copy.
- Keep one clear H1 per page.
- Use logical heading hierarchy: H1 for the page promise, H2 for major sections, H3 for cards or subsections.
- Meaningful images should have descriptive alt text. Decorative logo marks next to visible brand text can use empty alt text.

## Indexing

- Set `NEXT_PUBLIC_SITE_URL` to the production domain before launch.
- Confirm canonical URLs use the production domain.
- Confirm `/robots.txt` and `/sitemap.xml` load on the production deployment.
- Submit the sitemap in Google Search Console after launch.
- Inspect the homepage, audit page, live demo, and ROI calculator in Google Search Console URL Inspection.

## Google Search Console Setup

1. Create or open a Google Search Console property for the production domain.
2. Prefer a Domain property if DNS access is available.
3. Verify ownership through DNS or the method Google recommends.
4. Submit `https://yourdomain.com/sitemap.xml`.
5. Inspect `/`, `/audit`, `/live-demo`, `/how-it-works`, and `/roi-calculator`.
6. Review indexing status after Google crawls the site.
7. Monitor Coverage, Page Experience, Core Web Vitals, and search query data weekly after launch.

## Pre-Launch SEO QA

- Run `npm run lint`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Open `/sitemap.xml` and confirm URLs are correct.
- Open `/robots.txt` and confirm dashboard/API/auth routes are blocked.
- View page source for public routes and confirm title, description, canonical, OG tags, and JSON-LD are present.
- Test metadata with Google Rich Results Test and a social preview tool before sending the site to prospects.
