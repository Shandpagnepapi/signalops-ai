import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const appBuildDir = path.join(root, ".next", "server", "app");
const sitemapPath = path.join(appBuildDir, "sitemap.xml.body");
const robotsPath = path.join(appBuildDir, "robots.txt.body");

const ignoredRoutes = new Set(["/_global-error", "/_not-found"]);
const intentionallyNonIndexableRoutes = new Set([
  "/dashboard",
  "/admin/manager",
  "/mobile-tests",
  "/mobile-test-1",
  "/mobile-test-2",
  "/mobile-test-3"
]);
const allowedNonPageInternalPaths = new Set(["/sitemap.xml", "/robots.txt"]);

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readText(filePath) {
  return readFileSync(filePath, "utf8");
}

function walkFiles(directory, extension) {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = readdirSync(directory);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...walkFiles(fullPath, extension));
      continue;
    }

    if (fullPath.endsWith(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFromHtmlPath(filePath) {
  const relative = path.relative(appBuildDir, filePath).replaceAll(path.sep, "/");
  const withoutExtension = relative.replace(/\.html$/, "");

  if (withoutExtension === "index") {
    return "/";
  }

  return `/${withoutExtension.replace(/\/index$/, "")}`;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " "));
}

function getAttributes(tag) {
  const attributes = {};
  const attributePattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let match;

  while ((match = attributePattern.exec(tag)) !== null) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? "";
  }

  return attributes;
}

function getTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : "";
}

function getMetaDescription(html) {
  return getMetaContent(html, "name", "description");
}

function getMetaContent(html, attributeName, attributeValue) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const attributes = getAttributes(tag);

    if (attributes[attributeName]?.toLowerCase() === attributeValue.toLowerCase()) {
      return decodeHtml(attributes.content ?? "");
    }
  }

  return "";
}

function hasNoIndex(html) {
  const robots = getMetaContent(html, "name", "robots").toLowerCase();
  const googleBot = getMetaContent(html, "name", "googlebot").toLowerCase();

  return robots.includes("noindex") || googleBot.includes("noindex");
}

function getCanonical(html) {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const attributes = getAttributes(tag);

    if (attributes.rel?.toLowerCase() === "canonical") {
      return decodeHtml(attributes.href ?? "");
    }
  }

  return "";
}

function getH1s(html) {
  const h1Pattern = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
  const h1s = [];
  let match;

  while ((match = h1Pattern.exec(html)) !== null) {
    h1s.push(stripTags(match[1]));
  }

  return h1s;
}

function getImageTags(html) {
  return html.match(/<img\b[^>]*>/gi) ?? [];
}

function getAnchorHrefs(html) {
  const anchorTags = html.match(/<a\b[^>]*>/gi) ?? [];
  return anchorTags
    .map((tag) => getAttributes(tag).href)
    .filter(Boolean)
    .map(decodeHtml);
}

function normalizeInternalPath(href) {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  ) {
    return "";
  }

  if (!href.startsWith("/")) {
    return "";
  }

  const [withoutHash] = href.split("#");
  const [withoutQuery] = withoutHash.split("?");
  const normalized = withoutQuery.replace(/\/$/, "") || "/";

  if (normalized.startsWith("/_next") || normalized.startsWith("/api/")) {
    return "";
  }

  return normalized;
}

function pathFromAbsoluteUrl(url) {
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return "";
  }
}

if (!existsSync(appBuildDir)) {
  fail("Missing .next/server/app. Run `npm run build` before `npm run seo:qa`.");
}

const htmlFiles = walkFiles(appBuildDir, ".html");
const pages = htmlFiles
  .map((filePath) => ({
    filePath,
    route: routeFromHtmlPath(filePath),
    html: readText(filePath)
  }))
  .filter((page) => !ignoredRoutes.has(page.route));

if (pages.length === 0) {
  fail("No built HTML pages found. Run `npm run build` before `npm run seo:qa`.");
}

const routeSet = new Set([
  ...pages.map((page) => page.route),
  ...allowedNonPageInternalPaths
]);
const titleMap = new Map();

for (const page of pages) {
  const title = getTitle(page.html);
  const description = getMetaDescription(page.html);
  const canonical = getCanonical(page.html);
  const ogTitle = getMetaContent(page.html, "property", "og:title");
  const ogDescription = getMetaContent(page.html, "property", "og:description");
  const ogImage = getMetaContent(page.html, "property", "og:image");
  const twitterCard = getMetaContent(page.html, "name", "twitter:card");
  const h1s = getH1s(page.html);
  const imageTags = getImageTags(page.html);
  const hrefs = getAnchorHrefs(page.html);
  const isIntentionallyNonIndexable = intentionallyNonIndexableRoutes.has(page.route);

  if (!title) {
    fail(`${page.route}: missing <title> metadata.`);
  } else {
    const routesForTitle = titleMap.get(title) ?? [];
    routesForTitle.push(page.route);
    titleMap.set(title, routesForTitle);
  }

  if (!description) {
    fail(`${page.route}: missing meta description.`);
  }

  if (!isIntentionallyNonIndexable && !canonical) {
    fail(`${page.route}: missing canonical URL.`);
  }

  if (!isIntentionallyNonIndexable && !ogTitle) {
    fail(`${page.route}: missing Open Graph title.`);
  }

  if (!isIntentionallyNonIndexable && !ogDescription) {
    fail(`${page.route}: missing Open Graph description.`);
  }

  if (!isIntentionallyNonIndexable && !ogImage) {
    fail(`${page.route}: missing Open Graph image.`);
  }

  if (!isIntentionallyNonIndexable && !twitterCard) {
    fail(`${page.route}: missing Twitter/X card metadata.`);
  }

  if (!isIntentionallyNonIndexable && hasNoIndex(page.html)) {
    fail(`${page.route}: has noindex metadata but is expected to be indexable.`);
  }

  if (h1s.length === 0) {
    fail(`${page.route}: missing H1.`);
  }

  if (h1s.length > 1) {
    fail(`${page.route}: has multiple H1s (${h1s.length}).`);
  }

  for (const tag of imageTags) {
    const attributes = getAttributes(tag);

    if (!("alt" in attributes)) {
      fail(`${page.route}: image is missing alt text (${tag.slice(0, 120)}...).`);
    }
  }

  for (const href of hrefs) {
    const internalPath = normalizeInternalPath(href);

    if (!internalPath) {
      continue;
    }

    if (!routeSet.has(internalPath)) {
      fail(`${page.route}: broken internal link to ${href}.`);
    }
  }
}

for (const [title, routes] of titleMap.entries()) {
  if (routes.length > 1) {
    fail(`Duplicate page title "${title}" used by: ${routes.join(", ")}.`);
  }
}

if (!existsSync(sitemapPath)) {
  fail("Missing built sitemap output at .next/server/app/sitemap.xml.body.");
} else {
  const sitemap = readText(sitemapPath);
  const sitemapRoutes = new Set(
    [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
      pathFromAbsoluteUrl(decodeHtml(match[1]))
    )
  );

  if (sitemapRoutes.size === 0) {
    fail("Sitemap exists but does not contain any <loc> entries.");
  }

  for (const route of sitemapRoutes) {
    if (!routeSet.has(route)) {
      fail(`Sitemap includes ${route}, but no matching built page was found.`);
    }
  }

  for (const page of pages) {
    if (intentionallyNonIndexableRoutes.has(page.route)) {
      continue;
    }

    if (!sitemapRoutes.has(page.route)) {
      warn(`${page.route}: built page is not listed in sitemap.`);
    }
  }
}

if (!existsSync(robotsPath)) {
  fail("Missing built robots output at .next/server/app/robots.txt.body.");
} else {
  const robots = readText(robotsPath);

  if (!/Sitemap:\s*\S+\/sitemap\.xml/i.test(robots)) {
    fail("Robots file exists but does not include a Sitemap directive.");
  }

  if (!/Disallow:\s*\/api\//i.test(robots)) {
    warn("Robots file does not explicitly disallow /api/.");
  }
}

console.log(`SEO QA checked ${pages.length} built HTML pages.`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("\nFailures:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEO QA passed.");
