import { chromium, type Browser } from "playwright";
import { execFileSync } from "node:child_process";
import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

type AuditRoute = {
  path: string;
  slug: string;
  label: string;
};

type AuditViewport = {
  name: string;
  width: number;
  height: number;
};

type AuditScreenshot = {
  route: string;
  routeSlug: string;
  routeLabel: string;
  viewport: string;
  width: number;
  height: number;
  fileName: string;
  src: string;
};

type VisualReviewContactSheet = {
  label: string;
  fileName: string;
  src: string;
  routes: string[];
};

type VisualReviewManifest = {
  createdAt: string;
  baseUrl: string;
  commitSha?: string;
  workflowRunId?: string | null;
  artifactId?: string | null;
  reviewUrl: string;
  routes: string[];
  viewports: AuditViewport[];
  contactSheets: VisualReviewContactSheet[];
  screenshots: AuditScreenshot[];
  note: string;
};

const outputDir = path.resolve(process.cwd(), ".visual-audit-output", "latest");
const publicReviewDir = path.resolve(process.cwd(), "public", "visual-review", "latest");
const publicReviewUrl = "/visual-review";

const routes: AuditRoute[] = [
  { path: "/", slug: "home", label: "Home" },
  { path: "/envo", slug: "envo", label: "Envo" },
  { path: "/preview", slug: "preview", label: "Preview" },
  { path: "/demo", slug: "demo", label: "Demo" },
  { path: "/roi-calculator", slug: "roi-calculator", label: "ROI Calculator" },
  { path: "/how-it-works", slug: "how-it-works", label: "How It Works" },
  { path: "/services/ai-lead-response", slug: "service-ai-lead-response", label: "Service: AI Lead Response" },
  { path: "/industries/mobile-fleet-wash", slug: "industry-mobile-fleet-wash", label: "Industry: Mobile Fleet Wash" },
  { path: "/alternatives", slug: "alternatives", label: "Alternatives" }
];

const contactSheetGroups: Array<Omit<VisualReviewContactSheet, "src">> = [
  {
    label: "Home + Envo + Preview",
    fileName: "contact-sheet-home-preview.jpg",
    routes: ["/", "/envo", "/preview"]
  },
  {
    label: "Demo + ROI + How It Works",
    fileName: "contact-sheet-demo-roi.jpg",
    routes: ["/demo", "/roi-calculator", "/how-it-works"]
  },
  {
    label: "Service + Industry + Alternatives",
    fileName: "contact-sheet-seo-pages.jpg",
    routes: ["/services/ai-lead-response", "/industries/mobile-fleet-wash", "/alternatives"]
  }
];

const mobile390: AuditViewport = {
  name: "mobile-390",
  width: 390,
  height: 844
};

const mobile430: AuditViewport = {
  name: "mobile-430",
  width: 430,
  height: 932
};

const desktop1440: AuditViewport = {
  name: "desktop-1440",
  width: 1440,
  height: 1400
};

function parseArgs() {
  const args = new Map<string, string>();

  for (const arg of process.argv.slice(2)) {
    if (!arg.startsWith("--")) {
      continue;
    }

    const [key, ...valueParts] = arg.slice(2).split("=");
    args.set(key, valueParts.join("=") || "true");
  }

  return {
    baseUrl: args.get("base-url") || "https://www.signalops.pro"
  };
}

function assertPublicRoute(route: AuditRoute) {
  if (
    route.path.startsWith("/admin") ||
    route.path.startsWith("/api") ||
    route.path.startsWith("/auth") ||
    route.path.includes("..")
  ) {
    throw new Error(`Refusing to capture non-public route: ${route.path}`);
  }
}

function getRouteViewports(route: AuditRoute) {
  if (route.path === "/" || route.path === "/envo" || route.path === "/preview") {
    return [mobile390, mobile430, desktop1440];
  }

  return [mobile390, desktop1440];
}

function screenshotFileName(route: AuditRoute, viewport: AuditViewport) {
  return `${route.slug}-${viewport.name}.jpg`;
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

async function newPage(browser: Browser, viewport: AuditViewport) {
  const context = await browser.newContext({
    viewport: {
      width: viewport.width,
      height: viewport.height
    },
    deviceScaleFactor: 1,
    reducedMotion: "reduce"
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);
  return page;
}

async function capture({
  browser,
  baseUrl,
  route,
  viewport
}: {
  browser: Browser;
  baseUrl: string;
  route: AuditRoute;
  viewport: AuditViewport;
}) {
  const page = await newPage(browser, viewport);
  const fileName = screenshotFileName(route, viewport);
  const filePath = path.join(outputDir, fileName);

  try {
    await page.goto(new URL(route.path, baseUrl).toString(), {
      waitUntil: "domcontentloaded",
      timeout: 45_000
    });
    await page
      .waitForLoadState("networkidle", {
        timeout: 10_000
      })
      .catch(() => undefined);
    await page.screenshot({
      path: filePath,
      type: "jpeg",
      quality: 80,
      fullPage: true
    });
  } finally {
    await page.context().close();
  }

  return {
    route: route.path,
    routeSlug: route.slug,
    routeLabel: route.label,
    viewport: viewport.name,
    width: viewport.width,
    height: viewport.height,
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

function renderArtifactContactSheet(manifest: VisualReviewManifest) {
  const grouped = new Map<string, AuditScreenshot[]>();

  for (const screenshot of manifest.screenshots) {
    const group = grouped.get(screenshot.route) ?? [];
    group.push(screenshot);
    grouped.set(screenshot.route, group);
  }

  const sections = Array.from(grouped.entries())
    .map(([route, screenshots]) => {
      const label = screenshots[0]?.routeLabel ?? route;
      const cards = screenshots
        .map(
          (screenshot) => `
          <figure>
            <div class="shot-meta">
              <strong>${escapeHtml(screenshot.viewport)}</strong>
              <span>${screenshot.width}x${screenshot.height}</span>
            </div>
            <img src="./${escapeHtml(screenshot.fileName)}" alt="${escapeHtml(label)} ${escapeHtml(screenshot.viewport)} screenshot" />
          </figure>
        `
        )
        .join("");

      return `
        <section>
          <div class="route-heading">
            <p>${escapeHtml(label)}</p>
            <code>${escapeHtml(route)}</code>
          </div>
          <div class="grid">${cards}</div>
        </section>
      `;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SignalOps Visual Review Contact Sheet</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #100818;
        --panel: rgba(255, 255, 255, 0.055);
        --border: rgba(255, 255, 255, 0.12);
        --text: #fff8fb;
        --muted: rgba(234, 208, 223, 0.68);
        --accent: #c8ff69;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at 18% 0%, rgba(255, 111, 156, 0.18), transparent 28%),
          radial-gradient(circle at 78% 8%, rgba(255, 179, 109, 0.16), transparent 26%),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        width: min(1500px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 48px;
      }
      header,
      section {
        border: 1px solid var(--border);
        border-radius: 24px;
        background: var(--panel);
        padding: 20px;
        margin-top: 22px;
      }
      header { margin-top: 0; }
      .eyebrow {
        margin: 0 0 10px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: clamp(34px, 5vw, 64px);
        letter-spacing: 0;
      }
      .summary {
        margin: 14px 0 0;
        color: var(--muted);
        line-height: 1.6;
      }
      .route-heading {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 14px;
      }
      .route-heading p {
        margin: 0;
        font-size: 20px;
        font-weight: 800;
      }
      code { color: var(--muted); }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 14px;
      }
      figure {
        margin: 0;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 18px;
        background: rgba(23, 18, 45, 0.74);
      }
      .shot-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-bottom: 1px solid var(--border);
        padding: 10px 12px;
        color: var(--muted);
        font-size: 12px;
      }
      .shot-meta strong { color: var(--text); }
      img {
        display: block;
        width: 100%;
        height: 560px;
        object-fit: cover;
        object-position: top;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">SignalOps Visual Review</p>
        <h1>Latest Public Site Screenshots</h1>
        <p class="summary">
          Created ${escapeHtml(manifest.createdAt)} from ${escapeHtml(manifest.baseUrl)}.
          Commit: ${escapeHtml(manifest.commitSha ?? "not available")}.
          Public pages only. No admin or API routes captured.
        </p>
      </header>
      ${sections}
    </main>
  </body>
</html>
`;
}

function renderCommittedContactSheet(manifest: VisualReviewManifest, sheet: VisualReviewContactSheet) {
  const screenshots = manifest.screenshots.filter((screenshot) => sheet.routes.includes(screenshot.route));
  const grouped = new Map<string, AuditScreenshot[]>();

  for (const screenshot of screenshots) {
    const group = grouped.get(screenshot.route) ?? [];
    group.push(screenshot);
    grouped.set(screenshot.route, group);
  }

  const sections = Array.from(grouped.entries())
    .map(([route, routeScreenshots]) => {
      const label = routeScreenshots[0]?.routeLabel ?? route;
      const cards = routeScreenshots
        .map((screenshot) => {
          const isMobile = screenshot.viewport.startsWith("mobile");
          return `
            <figure class="${isMobile ? "mobile-shot" : "desktop-shot"}">
              <figcaption>
                <strong>${escapeHtml(route)}</strong>
                <span>${escapeHtml(screenshot.viewport)} · ${screenshot.width}x${screenshot.height}</span>
              </figcaption>
              <img src="./${escapeHtml(screenshot.fileName)}" alt="${escapeHtml(label)} ${escapeHtml(screenshot.viewport)} screenshot" />
            </figure>
          `;
        })
        .join("");

      return `
        <section>
          <div class="route-title">
            <h2>${escapeHtml(label)}</h2>
            <code>${escapeHtml(route)}</code>
          </div>
          <div class="shots">${cards}</div>
        </section>
      `;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SignalOps Visual Review ${escapeHtml(sheet.label)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #080611;
        --panel: rgba(255, 255, 255, 0.06);
        --border: rgba(255, 255, 255, 0.14);
        --text: #fff8fb;
        --muted: rgba(235, 218, 230, 0.72);
        --accent: #c8ff69;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        background:
          radial-gradient(circle at 16% 0%, rgba(255, 111, 156, 0.2), transparent 22%),
          radial-gradient(circle at 86% 0%, rgba(200, 255, 105, 0.14), transparent 24%),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        width: 1780px;
        padding: 34px;
      }
      header {
        border: 1px solid var(--border);
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.07);
        padding: 24px;
        margin-bottom: 24px;
      }
      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: 54px;
        line-height: 1;
        letter-spacing: 0;
      }
      .meta {
        margin: 12px 0 0;
        color: var(--muted);
        font-size: 18px;
      }
      section {
        border: 1px solid var(--border);
        border-radius: 26px;
        background: rgba(255, 255, 255, 0.045);
        padding: 22px;
        margin-top: 24px;
      }
      .route-title {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 18px;
      }
      h2 {
        margin: 0;
        font-size: 30px;
        letter-spacing: 0;
      }
      code {
        color: var(--muted);
        font-size: 18px;
      }
      .shots {
        display: grid;
        grid-template-columns: 560px 1fr;
        gap: 18px;
        align-items: start;
      }
      figure {
        margin: 0;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 22px;
        background: rgba(0, 0, 0, 0.32);
      }
      figcaption {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        border-bottom: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.055);
        padding: 14px 16px;
        font-size: 15px;
      }
      figcaption strong {
        color: var(--text);
      }
      figcaption span {
        color: var(--accent);
        font-weight: 800;
      }
      img {
        display: block;
        width: 100%;
        height: auto;
        background: #05040a;
      }
      .mobile-shot img {
        max-height: 2200px;
        object-fit: contain;
        object-position: top;
      }
      .desktop-shot {
        grid-column: 2;
      }
      .desktop-shot img {
        max-height: 2200px;
        object-fit: contain;
        object-position: top;
      }
      .mobile-shot + .mobile-shot {
        grid-column: 1;
      }
      @media (max-width: 1200px) {
        main { width: 1100px; }
        .shots { grid-template-columns: 1fr; }
        .desktop-shot { grid-column: auto; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">SignalOps Visual Review</p>
        <h1>${escapeHtml(sheet.label)}</h1>
        <p class="meta">
          Created ${escapeHtml(manifest.createdAt)} · Commit ${escapeHtml(manifest.commitSha ?? "not available")} · ${escapeHtml(manifest.baseUrl)}
        </p>
      </header>
      ${sections}
    </main>
  </body>
</html>`;
}

async function saveArtifactContactSheet(browser: Browser, manifest: VisualReviewManifest) {
  const html = renderArtifactContactSheet(manifest);
  const htmlPath = path.join(outputDir, "contact-sheet.html");
  const pngPath = path.join(outputDir, "contact-sheet.png");
  const pdfPath = path.join(outputDir, "contact-sheet.pdf");

  await writeFile(htmlPath, html);

  const page = await newPage(browser, {
    name: "contact-sheet",
    width: 1440,
    height: 1400
  });

  try {
    await page.goto(pathToFileURL(htmlPath).toString(), {
      waitUntil: "domcontentloaded"
    });
    await page.screenshot({
      path: pngPath,
      type: "png",
      fullPage: true
    });
    await page.pdf({
      path: pdfPath,
      format: "A3",
      printBackground: true
    });
  } finally {
    await page.context().close();
  }
}

async function saveCommittedContactSheets(browser: Browser, manifest: VisualReviewManifest) {
  for (const sheet of manifest.contactSheets) {
    const html = renderCommittedContactSheet(manifest, sheet);
    const htmlPath = path.join(outputDir, sheet.fileName.replace(/\.jpg$/, ".html"));
    const imagePath = path.join(outputDir, sheet.fileName);
    const page = await newPage(browser, {
      name: sheet.fileName,
      width: 1848,
      height: 2400
    });

    await writeFile(htmlPath, html);

    try {
      await page.goto(pathToFileURL(htmlPath).toString(), {
        waitUntil: "domcontentloaded"
      });
      await page.screenshot({
        path: imagePath,
        type: "jpeg",
        quality: 82,
        fullPage: true
      });
    } finally {
      await page.context().close();
    }
  }
}

async function publishLatestVisualReview(manifest: VisualReviewManifest) {
  await rm(publicReviewDir, {
    force: true,
    recursive: true
  });
  await mkdir(publicReviewDir, {
    recursive: true
  });

  for (const screenshot of manifest.screenshots) {
    await copyFile(path.join(outputDir, screenshot.fileName), path.join(publicReviewDir, screenshot.fileName));
  }

  for (const sheet of manifest.contactSheets) {
    await copyFile(path.join(outputDir, sheet.fileName), path.join(publicReviewDir, sheet.fileName));
  }

  await writeFile(path.join(publicReviewDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

async function main() {
  const { baseUrl } = parseArgs();
  const createdAt = new Date().toISOString();
  const screenshots: AuditScreenshot[] = [];

  await rm(outputDir, {
    force: true,
    recursive: true
  });
  await mkdir(outputDir, {
    recursive: true
  });

  const browser = await chromium.launch({
    headless: true
  });

  try {
    for (const route of routes) {
      assertPublicRoute(route);

      for (const viewport of getRouteViewports(route)) {
        const screenshot = await capture({
          browser,
          baseUrl,
          route,
          viewport
        });
        screenshots.push(screenshot);
        console.log(`Captured ${route.path} ${viewport.name}`);
      }
    }

    const manifest: VisualReviewManifest = {
      createdAt,
      baseUrl,
      commitSha: getGitCommit(),
      workflowRunId: process.env.GITHUB_RUN_ID ?? null,
      artifactId: process.env.VISUAL_AUDIT_ARTIFACT_ID ?? null,
      reviewUrl: publicReviewUrl,
      routes: routes.map((route) => route.path),
      viewports: [mobile390, mobile430, desktop1440],
      contactSheets: contactSheetGroups.map((sheet) => ({
        ...sheet,
        src: `/visual-review/latest/${sheet.fileName}`
      })),
      screenshots,
      note: "Tell ChatGPT: review https://www.signalops.pro/visual-review."
    };

    await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await saveArtifactContactSheet(browser, manifest);
    await saveCommittedContactSheets(browser, manifest);
    await publishLatestVisualReview(manifest);
  } finally {
    await browser.close();
  }

  console.log(`Visual review screenshots written to ${publicReviewDir}`);
  console.log(`Visual audit artifact written to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
