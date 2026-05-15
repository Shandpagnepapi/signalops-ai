import { chromium, type Browser } from "playwright";
import { execFileSync, spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

type ReviewRoute = {
  path: string;
  slug: string;
  label: string;
  group: string;
};

type ReviewViewport = {
  name: string;
  width: number;
  height: number;
};

type ReviewScreenshot = {
  route: string;
  routeSlug: string;
  routeLabel: string;
  group: string;
  viewport: string;
  width: number;
  height: number;
  kind: "full" | "viewport" | "segment";
  scrollY?: number;
  segmentIndex?: number;
  fileName: string;
  src: string;
};

type ReviewContactSheet = {
  label: string;
  fileName: string;
  src: string;
  routes: string[];
};

type ReviewManifest = {
  createdAt: string;
  baseUrl: string;
  commitSha?: string;
  reviewUrl: string;
  routes: string[];
  viewports: ReviewViewport[];
  contactSheets: ReviewContactSheet[];
  screenshots: ReviewScreenshot[];
  issues: string[];
  note: string;
};

const outputDir = path.resolve(process.cwd(), "public", "visual-review", "latest");
const defaultPort = 3015;
const defaultBaseUrl = `http://127.0.0.1:${defaultPort}`;

const viewports: ReviewViewport[] = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1024", width: 1024, height: 768 },
  { name: "desktop-1366", width: 1366, height: 768 },
  { name: "desktop-1440-tall", width: 1440, height: 1400 },
  { name: "desktop-1920", width: 1920, height: 1080 }
];

const routes: ReviewRoute[] = [
  route("/", "home", "Home", "Home"),
  route("/envo", "envo", "Envo", "Core Envo"),
  route("/preview", "preview", "Preview", "Core Envo"),
  route("/demo", "demo", "Demo", "Core Envo"),
  route("/live-demo", "live-demo", "Live Demo", "Core Envo"),
  route("/dashboard", "dashboard", "Dashboard", "Core Envo"),
  route("/audit", "audit", "Audit", "Core Envo"),
  route("/how-it-works", "how-it-works", "How It Works", "Core Envo"),
  route("/roi-calculator", "roi-calculator", "ROI Calculator", "Core Envo"),
  route("/alternatives", "alternatives", "Alternatives", "SEO"),
  route("/ai-lead-response", "ai-lead-response", "AI Lead Response", "SEO"),
  route("/missed-call-text-back", "missed-call-text-back", "Missed Call Text Back", "SEO"),
  route("/ai-follow-up-automation", "ai-follow-up-automation", "AI Follow-up Automation", "SEO"),
  route("/ai-lead-qualification", "ai-lead-qualification", "AI Lead Qualification", "SEO"),
  route("/lead-management-for-small-business", "lead-management-small-business", "Lead Management", "SEO"),
  route("/no-crm-lead-tracking", "no-crm-lead-tracking", "No CRM Lead Tracking", "SEO"),
  route("/services/ai-lead-response", "service-ai-lead-response", "Service: AI Lead Response", "Services"),
  route("/services/ai-lead-qualification", "service-ai-lead-qualification", "Service: AI Lead Qualification", "Services"),
  route("/services/automated-lead-follow-up", "service-automated-lead-follow-up", "Service: Automated Lead Follow-up", "Services"),
  route("/services/missed-lead-recovery", "service-missed-lead-recovery", "Service: Missed Lead Recovery", "Services"),
  route("/services/lead-routing-automation", "service-lead-routing-automation", "Service: Lead Routing Automation", "Services"),
  route("/services/ai-appointment-booking", "service-ai-appointment-booking", "Service: AI Appointment Booking", "Services"),
  route("/services/quote-intake-automation", "service-quote-intake-automation", "Service: Quote Intake Automation", "Services"),
  route("/industries/mobile-fleet-wash", "industry-mobile-fleet-wash", "Industry: Mobile Fleet Wash", "Industries"),
  route("/industries/auto-shops", "industry-auto-shops", "Industry: Auto Shops", "Industries"),
  route("/industries/detailers", "industry-detailers", "Industry: Detailers", "Industries"),
  route("/industries/tint-wrap-shops", "industry-tint-wrap-shops", "Industry: Tint/Wrap Shops", "Industries"),
  route("/industries/home-services", "industry-home-services", "Industry: Home Services", "Industries"),
  route("/industries/med-spas", "industry-med-spas", "Industry: Med Spas", "Industries"),
  route("/industries/insurance-agencies", "industry-insurance-agencies", "Industry: Insurance Agencies", "Industries"),
  route("/drone", "drone", "Drone Services", "Other"),
  route("/privacy", "privacy", "Privacy", "Other"),
  route("/terms", "terms", "Terms", "Other")
];

function route(pathname: string, slug: string, label: string, group: string): ReviewRoute {
  return { path: pathname, slug, label, group };
}

function parseArgs() {
  const args = new Map<string, string>();

  for (const arg of process.argv.slice(2)) {
    if (!arg.startsWith("--")) continue;
    const [key, ...valueParts] = arg.slice(2).split("=");
    args.set(key, valueParts.join("=") || "true");
  }

  return {
    baseUrl: args.get("base-url") ?? defaultBaseUrl,
    contactOnly: args.get("contact-only") === "true",
    skipServer: args.get("skip-server") === "true"
  };
}

function getGitCommit() {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return undefined;
  }
}

async function canReach(baseUrl: string) {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1500) });
    return response.ok;
  } catch {
    return false;
  }
}

async function ensureServer(baseUrl: string, skipServer: boolean) {
  if (skipServer || await canReach(baseUrl)) {
    return null;
  }

  const parsed = new URL(baseUrl);
  if (!["127.0.0.1", "localhost"].includes(parsed.hostname)) {
    throw new Error(`Base URL is not reachable and will not be auto-started: ${baseUrl}`);
  }

  const server = spawn("cmd.exe", ["/d", "/c", "npm.cmd", "run", "dev", "--", "--hostname", parsed.hostname, "--port", parsed.port || String(defaultPort)], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"]
  });

  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (await canReach(baseUrl)) return server;
    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  stopServer(server.pid);
  throw new Error(`Timed out waiting for local server at ${baseUrl}`);
}

function stopServer(pid?: number) {
  if (!pid || process.platform !== "win32") return;
  try {
    execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
  } catch {
    // Best effort cleanup.
  }
}

function screenshotName(routeInfo: ReviewRoute, viewport: ReviewViewport, kind: ReviewScreenshot["kind"], index?: number, scrollY?: number) {
  const suffix = kind === "segment" ? `segment-${String(index).padStart(2, "0")}-${scrollY}` : kind;
  return `${routeInfo.slug}-${viewport.name}-${suffix}.jpg`;
}

async function captureRoute(browser: Browser, baseUrl: string, routeInfo: ReviewRoute, viewport: ReviewViewport, issues: string[]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce"
  });
  const page = await context.newPage();
  const screenshots: ReviewScreenshot[] = [];

  page.on("pageerror", (error) => issues.push(`${routeInfo.path} ${viewport.name}: page error: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") {
      issues.push(`${routeInfo.path} ${viewport.name}: console error: ${message.text().slice(0, 240)}`);
    }
  });

  try {
    await page.goto(new URL(routeInfo.path, baseUrl).toString(), {
      waitUntil: "domcontentloaded",
      timeout: 45_000
    });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
    await page.addStyleTag({
      content: `
        nextjs-portal,
        [data-nextjs-dev-overlay],
        [data-nextjs-dev-tools],
        [data-nextjs-dev-tools-button],
        [data-nextjs-toast] {
          display: none !important;
          pointer-events: none !important;
        }
      `
    }).catch(() => undefined);
    await page.waitForTimeout(250);

    const metrics = await page.evaluate(() => ({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      scrollHeight: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
      scrollWidth: document.documentElement.scrollWidth
    }));

    if (metrics.scrollWidth > metrics.innerWidth + 1) {
      issues.push(`${routeInfo.path} ${viewport.name}: horizontal overflow ${metrics.scrollWidth}px > ${metrics.innerWidth}px`);
    }

    const fullName = screenshotName(routeInfo, viewport, "full");
    await page.screenshot({ path: path.join(outputDir, fullName), type: "jpeg", quality: 76, fullPage: true });
    screenshots.push(toScreenshot(routeInfo, viewport, "full", fullName));

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    const viewportName = screenshotName(routeInfo, viewport, "viewport");
    await page.screenshot({ path: path.join(outputDir, viewportName), type: "jpeg", quality: 82, fullPage: false });
    screenshots.push(toScreenshot(routeInfo, viewport, "viewport", viewportName, 0));

    const step = Math.max(1, Math.floor(viewport.height * 0.85));
    const scrollPositions = new Set<number>();
    for (let y = 0; y < metrics.scrollHeight; y += step) {
      scrollPositions.add(Math.min(y, Math.max(0, metrics.scrollHeight - viewport.height)));
    }
    scrollPositions.add(Math.max(0, metrics.scrollHeight - viewport.height));

    let index = 0;
    for (const scrollY of Array.from(scrollPositions).sort((a, b) => a - b)) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(80);
      const fileName = screenshotName(routeInfo, viewport, "segment", index, scrollY);
      await page.screenshot({ path: path.join(outputDir, fileName), type: "jpeg", quality: 82, fullPage: false });
      screenshots.push(toScreenshot(routeInfo, viewport, "segment", fileName, scrollY, index));
      index += 1;
    }
  } finally {
    await context.close();
  }

  return screenshots;
}

function toScreenshot(
  routeInfo: ReviewRoute,
  viewport: ReviewViewport,
  kind: ReviewScreenshot["kind"],
  fileName: string,
  scrollY?: number,
  segmentIndex?: number
): ReviewScreenshot {
  return {
    route: routeInfo.path,
    routeSlug: routeInfo.slug,
    routeLabel: routeInfo.label,
    group: routeInfo.group,
    viewport: viewport.name,
    width: viewport.width,
    height: viewport.height,
    kind,
    scrollY,
    segmentIndex,
    fileName,
    src: `/visual-review/latest/${fileName}`
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function createContactSheets(browser: Browser, manifest: ReviewManifest) {
  const groups = Array.from(new Set(routes.map((item) => item.group)));
  const sheets: ReviewContactSheet[] = [];

  for (const group of groups) {
    const groupRoutes = routes.filter((item) => item.group === group).map((item) => item.path);
    const screenshots = manifest.screenshots.filter((item) => item.group === group && item.kind === "viewport");
    const html = renderContactSheet(group, screenshots);
    const page = await browser.newPage({ viewport: { width: 1800, height: 1400 }, deviceScaleFactor: 1 });
    const fileName = `contact-sheet-${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
    const htmlName = `${fileName.replace(/\.jpg$/, "")}.html`;
    const htmlPath = path.join(outputDir, htmlName);
    await writeFile(htmlPath, html);
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
    await page.screenshot({ path: path.join(outputDir, fileName), type: "jpeg", quality: 78, fullPage: true });
    await page.close();
    await rm(htmlPath, { force: true });
    sheets.push({
      label: `${group} contact sheet`,
      fileName,
      src: `/visual-review/latest/${fileName}`,
      routes: groupRoutes
    });
  }

  return sheets;
}

function renderContactSheet(group: string, screenshots: ReviewScreenshot[]) {
  const cards = screenshots
    .map((screenshot) => `
      <figure>
        <figcaption>
          <strong>${escapeHtml(screenshot.route)}</strong>
          <span>${escapeHtml(screenshot.viewport)} &middot; ${screenshot.width}x${screenshot.height}</span>
        </figcaption>
        <img src="./${escapeHtml(screenshot.fileName)}" alt="${escapeHtml(screenshot.routeLabel)} ${escapeHtml(screenshot.viewport)}" />
      </figure>
    `)
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: #071126;
        color: #f8faff;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main { width: 1800px; padding: 34px; }
      header {
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 26px;
        background: rgba(255,255,255,0.06);
        padding: 24px;
        margin-bottom: 22px;
      }
      p { margin: 0; color: #8ebbff; font-size: 13px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; }
      h1 { margin: 8px 0 0; font-size: 52px; line-height: 1; }
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      figure {
        margin: 0;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 18px;
        background: rgba(255,255,255,0.05);
      }
      figcaption {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        color: rgba(248,250,255,0.72);
        font-size: 12px;
      }
      figcaption strong { color: white; }
      img { display: block; width: 100%; height: 420px; object-fit: cover; object-position: top; background: #050916; }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p>SignalOps visual review</p>
        <h1>${escapeHtml(group)} contact sheet</h1>
      </header>
      <div class="grid">${cards}</div>
    </main>
  </body>
</html>`;
}

async function main() {
  const args = parseArgs();
  if (args.contactOnly) {
    const manifestPath = path.join(outputDir, "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as ReviewManifest;
    const browser = await chromium.launch();
    try {
      manifest.contactSheets = await createContactSheets(browser, manifest);
      await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
      console.log(`Regenerated ${manifest.contactSheets.length} contact sheets in ${outputDir}`);
    } finally {
      await browser.close();
    }
    return;
  }

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const server = await ensureServer(args.baseUrl, args.skipServer);
  const browser = await chromium.launch();
  const issues: string[] = [];
  const screenshots: ReviewScreenshot[] = [];

  try {
    for (const routeInfo of routes) {
      for (const viewport of viewports) {
        console.log(`Capturing ${routeInfo.path} at ${viewport.name}`);
        screenshots.push(...await captureRoute(browser, args.baseUrl, routeInfo, viewport, issues));
      }
    }

    const manifest: ReviewManifest = {
      createdAt: new Date().toISOString(),
      baseUrl: args.baseUrl,
      commitSha: getGitCommit(),
      reviewUrl: "/visual-review",
      routes: routes.map((item) => item.path),
      viewports,
      contactSheets: [],
      screenshots,
      issues,
      note: "Full-page, viewport, and scroll segment screenshots generated for human visual QA."
    };

    manifest.contactSheets = await createContactSheets(browser, manifest);
    await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Visual review created ${screenshots.length} screenshots and ${manifest.contactSheets.length} contact sheets in ${outputDir}`);
    if (issues.length) {
      console.warn(`Visual review recorded ${issues.length} issue(s). See manifest.json.`);
    }
  } finally {
    await browser.close();
    if (server) stopServer(server.pid);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).then(() => {
  process.exit(0);
});
