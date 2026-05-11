# SignalOps Social Sharing Checklist

Use this checklist after deploying a production or preview URL. Social platforms cache link previews, so always test the final public URL, not `localhost`.

## Assets in This Repo

SignalOps has branded Open Graph assets in:

```txt
public/og/
```

Current PNG assets used by metadata:

- `signalops-default.png`
- `signalops-home.png`
- `signalops-audit.png`
- `signalops-demo.png`
- `signalops-roi.png`

The matching SVG files are kept as editable source placeholders. The metadata points to PNG files because X/Twitter card images do not support SVG.

## Recommended Image Dimensions

Use:

```txt
1200 x 630 px
```

This is the common Open Graph size for LinkedIn, Facebook, Slack, iMessage, and similar previews.

For X/Twitter `summary_large_image`, the official guidance supports a 2:1 image with a minimum of `300 x 157`, maximum of `4096 x 4096`, under `5 MB`, using JPG, PNG, WEBP, or GIF. SVG is not supported for X cards.

## Pages to Test First

- Homepage: `/`
- Free Missed Lead Check: `/audit`
- Demo: `/demo`
- ROI Calculator: `/roi-calculator`
- How It Works: `/how-it-works`
- A service page: `/ai-lead-response`
- An industry page: `/industries/mobile-fleet-wash`

## LinkedIn Post Inspector

Tool:

```txt
https://www.linkedin.com/post-inspector/
```

Steps:

1. Paste the full production URL.
2. Click **Inspect**.
3. Confirm the preview shows the correct title, description, and image.
4. If LinkedIn shows an old image, inspect the URL again to refresh LinkedIn's cache.
5. Recheck after deployment if the production domain or OG image path changes.

Check:

- Image appears and is not cropped awkwardly.
- Title is clear and not too long.
- Description matches the page.
- Canonical URL is production, not preview or localhost.

## Facebook Sharing Debugger

Tool:

```txt
https://developers.facebook.com/tools/debug/sharing/
```

Steps:

1. Paste the full production URL.
2. Click **Debug**.
3. Review warnings.
4. Click **Scrape Again** after deploying metadata or image changes.
5. Confirm the Link Preview section shows the correct image, title, and description.

Check:

- `og:title` is present.
- `og:description` is present.
- `og:image` points to a public HTTPS URL.
- Image is accessible without authentication.
- Facebook is not reading an old cached image.

## X/Twitter Card Preview

Reference:

```txt
https://developer.x.com/cards/types/summary-large-image
```

SignalOps uses:

```html
<meta name="twitter:card" content="summary_large_image">
```

Steps:

1. Confirm the page has `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
2. Confirm `twitter:image` points to a PNG, JPG, WEBP, or GIF, not SVG.
3. Confirm the image is less than `5 MB`.
4. Paste the production URL into the X post composer and confirm the preview card renders.
5. If the image does not refresh immediately, wait and retry with a new post draft. X can cache card data.

Check:

- The preview uses a large image card.
- The title is readable in one or two lines.
- The image crop still shows the SignalOps brand and page message.
- The image URL loads directly in a browser.
- `robots.txt` does not block X/Twitter crawlers from reading the page or image.

## Messages, Slack, and Other Link Previews

Test by pasting production URLs into:

- iMessage
- Slack
- Discord
- Microsoft Teams
- Gmail compose window

These tools often use Open Graph tags and cache aggressively.

Check:

- The default image appears when no page-specific image is assigned.
- Page-specific images appear for homepage, audit, demo, and ROI.
- Link previews do not show stale localhost metadata.
- The title and description make sense without extra context.

## Local Metadata Checks

After building locally:

```bash
npm run build
npm run seo:qa
```

Then inspect a built page or production page source and look for:

```html
<meta property="og:image" ...>
<meta name="twitter:image" ...>
```

Confirm URLs point to:

```txt
/og/signalops-default.png
/og/signalops-home.png
/og/signalops-audit.png
/og/signalops-demo.png
/og/signalops-roi.png
```

## Troubleshooting

If the wrong image appears:

- Confirm `NEXT_PUBLIC_SITE_URL` is set to the production domain.
- Confirm the image URL opens directly over HTTPS.
- Confirm the image file exists in `public/og`.
- Confirm the page metadata references the intended image.
- Use LinkedIn Post Inspector to refresh LinkedIn cache.
- Use Facebook Sharing Debugger and click **Scrape Again**.
- Wait for X/Twitter cache to refresh if a previous card was cached.

If no image appears:

- Confirm `og:image` and `twitter:image` are present in the page source.
- Confirm the image is PNG/JPG/WEBP/GIF for X/Twitter.
- Confirm the image is under `5 MB`.
- Confirm `robots.txt` is not blocking the page or image.
- Confirm the deployment is public and not protected by auth.

## Launch Checklist

- [ ] Default OG image exists.
- [ ] Homepage OG image exists.
- [ ] Audit page OG image exists.
- [ ] Demo page OG image exists.
- [ ] ROI Calculator OG image exists.
- [ ] Metadata uses production URLs.
- [ ] LinkedIn Post Inspector preview is correct.
- [ ] Facebook Sharing Debugger preview is correct.
- [ ] X/Twitter preview renders a large image card.
- [ ] Message app previews look clean.
- [ ] Images are not stale or cached from old deploys.
