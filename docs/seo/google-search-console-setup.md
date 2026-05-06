# Google Search Console Setup for SignalOps

Use this guide when the SignalOps site is live on its production domain. The goal is to verify ownership, submit the sitemap, and monitor indexing without guessing.

Official Google references:

- Add a website property: https://support.google.com/webmasters/answer/34592
- URL Inspection tool: https://support.google.com/webmasters/answer/9012289

## Before You Start

Confirm these are ready:

- The production site is live on the final domain.
- `NEXT_PUBLIC_SITE_URL` is set to the production URL in Vercel.
- `/sitemap.xml` loads on the production domain.
- `/robots.txt` loads on the production domain.
- Important pages are not blocked in `robots.txt`.
- Canonical URLs use the production domain, not `localhost`.

Run this before launch:

```bash
npm run lint
npm run typecheck
npm run build
npm run seo:qa
```

## 1) Create a Google Search Console Property

1. Go to https://search.google.com/search-console.
2. Sign in with the Google account that should own the property.
3. Open the property selector in the top-left.
4. Click **Add property**.
5. Choose either **Domain** or **URL prefix**.

## 2) Choose Domain Property vs URL Prefix

### Recommended: Domain Property

Use a Domain property for the main SignalOps site if you have DNS access.

Example:

```txt
signalops.ai
```

Do not include:

```txt
https://
www.
/path
```

Why this is usually best:

- Covers `https://signalops.ai`
- Covers `https://www.signalops.ai`
- Covers future subdomains if needed
- Covers HTTP and HTTPS versions
- Gives the cleanest long-term Search Console view

Important: Domain properties require DNS verification.

### Alternative: URL Prefix Property

Use URL prefix if DNS access is not available or you need to verify only one exact site version.

Example:

```txt
https://signalops.ai/
```

URL-prefix properties only include URLs that start with that exact prefix. `https://signalops.ai/` and `https://www.signalops.ai/` are treated as different prefixes.

## 3) Verify Domain Ownership with DNS

For a Domain property:

1. Google will show a TXT record.
2. Copy the TXT record value.
3. Open the DNS provider for the domain.
4. Add a new TXT record:
   - Host/name: usually `@` or blank, depending on the DNS provider.
   - Type: `TXT`
   - Value: paste the Google verification value.
   - TTL: default is fine.
5. Save the DNS record.
6. Go back to Google Search Console.
7. Click **Verify**.

If verification fails, wait and try again. DNS propagation can take a few minutes, but sometimes it can take several hours.

Do not remove the TXT record after verification. Keeping it in DNS helps ownership stay verified.

## 4) Submit the Sitemap

After verification:

1. Open the verified property in Search Console.
2. Go to **Sitemaps**.
3. Enter:

```txt
sitemap.xml
```

or the full URL:

```txt
https://yourdomain.com/sitemap.xml
```

4. Click **Submit**.
5. Confirm Search Console shows the sitemap as submitted successfully.

If the sitemap fails:

- Open `/sitemap.xml` directly in the browser.
- Confirm it returns XML, not a 404.
- Confirm sitemap URLs use the production domain.
- Confirm `robots.txt` is not blocking the sitemap or important pages.

## 5) Check Indexing Status

Use the URL Inspection tool for key pages:

1. Paste the full production URL into the inspection bar at the top of Search Console.
2. Review whether Google says the URL is on Google.
3. If it is not indexed yet, run **Test live URL**.
4. Confirm the page is available to Google.
5. Click **Request indexing** for important pages.

Google notes that requesting indexing does not guarantee indexing. It may take days or longer. For many pages, submitting a sitemap is the better signal than requesting each URL manually.

## 6) Pages to Submit or Check

Check these first:

- Homepage: `/`
- Free Lead Leak Audit: `/audit`
- Demo page: `/demo`
- How It Works: `/how-it-works`
- ROI Calculator: `/roi-calculator`
- Privacy: `/privacy`
- Terms: `/terms`

Then check priority SEO pages:

- `/ai-lead-response`
- `/missed-call-text-back`
- `/ai-lead-qualification`
- `/ai-follow-up-automation`
- `/lead-management-for-small-business`
- `/no-crm-lead-tracking`
- `/industries/wheel-repair`
- `/industries/well-water-service-companies`
- `/industries/auto-shops`
- `/industries/roofers`
- `/industries/hvac`
- `/industries/plumbers`
- `/industries/med-spas`
- `/industries/insurance-agencies`

## 7) Review Coverage and Indexing Issues

In Search Console, review:

- **Pages** report for indexed and not-indexed pages.
- **Sitemaps** report for sitemap parsing issues.
- **Crawled - currently not indexed** pages.
- **Discovered - currently not indexed** pages.
- **Duplicate without user-selected canonical** warnings.
- **Alternate page with proper canonical tag** messages.
- **Blocked by robots.txt** issues.
- **Server error** or **Not found** issues.

For each issue:

1. Open the affected URL.
2. Confirm the page loads.
3. Check its canonical URL.
4. Check whether it appears in `/sitemap.xml`.
5. Check whether it is blocked by `/robots.txt`.
6. Fix the site if needed.
7. Use URL Inspection and request indexing again for important fixed pages.

## 8) Review Performance Reports

After Google has crawled and indexed the site, use **Performance** reports to monitor:

- Queries that show SignalOps in search results.
- Pages getting impressions.
- Click-through rate.
- Average position.
- Branded vs non-branded queries.
- Industry page performance.
- Service page performance.

Early SEO data can be sparse. Watch trends over weeks, not hours.

## 9) Canonical URL Checks

For each important page:

- Open the production page.
- View source or inspect the built HTML.
- Confirm the canonical uses the production domain.
- Confirm the canonical path matches the page.
- Avoid canonicals pointing to `localhost`.
- Avoid canonicals pointing to preview deployment URLs.

Example correct canonical:

```html
<link rel="canonical" href="https://yourdomain.com/ai-lead-response" />
```

## 10) Robots.txt Checks

Open:

```txt
https://yourdomain.com/robots.txt
```

Confirm:

- Public pages are allowed.
- `/api/` is disallowed.
- `/auth/` is disallowed.
- `/dashboard` is disallowed if it remains an internal/demo page.
- The sitemap line points to the production sitemap.

Example:

```txt
Sitemap: https://yourdomain.com/sitemap.xml
```

## 11) Sitemap Domain Checks

Open:

```txt
https://yourdomain.com/sitemap.xml
```

Confirm:

- URLs use the production domain.
- URLs are HTTPS.
- Important public pages are included.
- Removed or private pages are not included.
- The XML loads without authentication.

If the sitemap still shows `localhost`, update `NEXT_PUBLIC_SITE_URL` in Vercel and redeploy.

## 12) Ongoing Monitoring

Check Search Console weekly during the first month after launch:

- Sitemap status
- Indexing coverage
- New crawl errors
- Query impressions
- Top pages
- Manual actions
- Security issues
- Mobile usability or experience reports if available

Recommended weekly routine:

1. Review Pages report.
2. Inspect any important page that is not indexed.
3. Check whether sitemap and canonical URLs are correct.
4. Review Performance for new queries.
5. Note pages that need stronger copy, better internal links, or clearer search intent.

## Quick Launch Checklist

- [ ] Production domain is live.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to production domain.
- [ ] `/sitemap.xml` loads.
- [ ] `/robots.txt` loads.
- [ ] Canonicals use production URLs.
- [ ] Domain property created in Google Search Console.
- [ ] DNS TXT verification added.
- [ ] Property verified.
- [ ] Sitemap submitted.
- [ ] Homepage inspected.
- [ ] `/audit` inspected.
- [ ] `/demo` inspected.
- [ ] `/how-it-works` inspected.
- [ ] `/roi-calculator` inspected.
- [ ] Privacy and terms inspected.
- [ ] Priority SEO pages inspected.
- [ ] Important pages requested for indexing when appropriate.
- [ ] Search Console reviewed weekly after launch.
