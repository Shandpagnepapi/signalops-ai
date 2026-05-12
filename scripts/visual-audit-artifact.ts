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
};

type ArtifactManifest = {
  createdAt: string;
  baseUrl: string;
  commitSha?: string;
  workflowRunId?: string | null;
  artifactId?: string | null;
  pdfUrl: string;
  routes: string[];
  viewports: AuditViewport[];
  screenshots: AuditScreenshot[];
  note: string;
};

const outputDir = path.resolve(process.cwd(), ".visual-audit-output", "latest");
const publicAuditDir = path.resolve(process.cwd(), "public", "visual-audits");
const publicPdfUrl = "/visual-audits/latest.pdf";

const routes: AuditRoute[] = [
  { path: "/", slug: "home", label: "Home" },
  { path: "/preview", slug: "preview", label: "Preview" },
  { path: "/demo", slug: "demo", label: "Demo" },
  { path: "/roi-calculator", slug: "roi-calculator", label: "ROI Calculator" },
  { path: "/how-it-works", slug: "how-it-works", label: "How It Works" },
  { path: "/privacy", slug: "privacy", label: "Privacy" },
  { path: "/terms", slug: "terms", label: "Terms" },
  { path: "/services/ai-lead-response", slug: "service-ai-lead-response", label: "Service: AI Lead Response" },
  { path: "/industries/mobile-fleet-wash", slug: "industry-mobile-fleet-wash", label: "Industry: Mobile Fleet Wash" },
  { path: "/alternatives", slug: "alternatives", label: "Alternatives" }
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

const desktop: AuditViewport = {
  name: "desktop",
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
  if (route.path === "/" || route.path === "/preview") {
    return [mobile390, mobile430, desktop];
  }

  return [mobile390, desktop];
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
    await page.waitForLoadState("networkidle", {
      timeout: 10_000
    }).catch(() => undefined);
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
    fileName
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderContactSheet(manifest: ArtifactManifest) {
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
        .map((screenshot) => `
          <figure>
            <div class="shot-meta">
              <strong>${escapeHtml(screenshot.viewport)}</strong>
              <span>${screenshot.width}x${screenshot.height}</span>
            </div>
            <img src="./${escapeHtml(screenshot.fileName)}" alt="${escapeHtml(label)} ${escapeHtml(screenshot.viewport)} screenshot" />
          </figure>
        `)
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
    <title>SignalOps Visual Audit Contact Sheet</title>
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
      header {
        border: 1px solid var(--border);
        border-radius: 28px;
        background: var(--panel);
        padding: 24px;
        box-shadow: 0 28px 80px rgba(0, 0, 0, 0.28);
      }
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
      section {
        margin-top: 24px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.04);
        padding: 18px;
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
      code {
        color: var(--muted);
      }
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
      .shot-meta strong {
        color: var(--text);
      }
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
        <p class="eyebrow">SignalOps Visual Audit</p>
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

function renderPdfContactSheet(manifest: ArtifactManifest) {
  const routeList = manifest.routes
    .map((route) => `<li><code>${escapeHtml(route)}</code></li>`)
    .join("");
  const viewportList = manifest.viewports
    .map((viewport) => `<li>${escapeHtml(viewport.name)} <span>${viewport.width}x${viewport.height}</span></li>`)
    .join("");

  const pages = manifest.screenshots
    .map((screenshot) => `
      <section class="screenshot-page">
        <div class="shot-header">
          <div>
            <p>${escapeHtml(screenshot.routeLabel)}</p>
            <code>${escapeHtml(screenshot.route)}</code>
          </div>
          <div class="viewport-pill">
            ${escapeHtml(screenshot.viewport)}
            <span>${screenshot.width}x${screenshot.height}</span>
          </div>
        </div>
        <img src="./${escapeHtml(screenshot.fileName)}" alt="${escapeHtml(screenshot.routeLabel)} ${escapeHtml(screenshot.viewport)} screenshot" />
      </section>
    `)
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SignalOps Visual Audit PDF</title>
    <style>
      @page {
        size: A3 portrait;
        margin: 16mm;
      }
      :root {
        color-scheme: dark;
        --bg: #090611;
        --panel: rgba(255, 255, 255, 0.07);
        --panel-strong: rgba(255, 255, 255, 0.12);
        --border: rgba(255, 255, 255, 0.14);
        --text: #fff8fb;
        --muted: rgba(238, 219, 231, 0.72);
        --accent: #c8ff69;
        --pink: #ff6f9c;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .cover {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        break-after: page;
        background:
          radial-gradient(circle at 15% 4%, rgba(255, 111, 156, 0.24), transparent 30%),
          radial-gradient(circle at 86% 10%, rgba(200, 255, 105, 0.16), transparent 28%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 34px;
      }
      .eyebrow {
        margin: 0 0 14px;
        color: var(--accent);
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 760px;
        margin: 0;
        font-size: 64px;
        line-height: 0.96;
        letter-spacing: 0;
      }
      .summary {
        max-width: 760px;
        margin-top: 22px;
        color: var(--muted);
        font-size: 18px;
        line-height: 1.55;
      }
      .cover-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-top: 36px;
      }
      .cover-card {
        border: 1px solid var(--border);
        border-radius: 22px;
        background: rgba(8, 7, 18, 0.62);
        padding: 18px;
      }
      .cover-card h2 {
        margin: 0 0 12px;
        font-size: 16px;
        color: var(--text);
      }
      ul {
        margin: 0;
        padding-left: 18px;
        color: var(--muted);
        line-height: 1.7;
      }
      li span,
      code {
        color: rgba(255, 255, 255, 0.84);
      }
      .run-meta {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 30px;
      }
      .meta-tile {
        border: 1px solid var(--border);
        border-radius: 18px;
        background: var(--panel);
        padding: 14px;
      }
      .meta-tile span {
        display: block;
        color: var(--muted);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .meta-tile strong {
        display: block;
        margin-top: 6px;
        overflow-wrap: anywhere;
        font-size: 14px;
      }
      .screenshot-page {
        break-before: page;
        background:
          radial-gradient(circle at 12% 0%, rgba(255, 111, 156, 0.16), transparent 22%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025));
        border: 1px solid var(--border);
        border-radius: 22px;
        padding: 16px;
      }
      .shot-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 14px;
      }
      .shot-header p {
        margin: 0 0 4px;
        font-size: 24px;
        font-weight: 900;
      }
      .viewport-pill {
        flex: 0 0 auto;
        border: 1px solid rgba(200, 255, 105, 0.3);
        border-radius: 999px;
        background: rgba(200, 255, 105, 0.1);
        color: var(--accent);
        padding: 9px 12px;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .viewport-pill span {
        color: rgba(255, 255, 255, 0.72);
        margin-left: 8px;
        text-transform: none;
      }
      .screenshot-page img {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 16px;
        background: #05040a;
      }
    </style>
  </head>
  <body>
    <main>
      <section class="cover">
        <div>
          <p class="eyebrow">SignalOps Visual Audit</p>
          <h1>Latest Public Site Screenshots</h1>
          <p class="summary">
            A single PDF contact sheet for fast design review. Public pages only.
            No admin routes, API routes, secrets, or private customer data are captured.
          </p>
          <div class="run-meta">
            <div class="meta-tile"><span>Run date</span><strong>${escapeHtml(manifest.createdAt)}</strong></div>
            <div class="meta-tile"><span>Commit</span><strong>${escapeHtml(manifest.commitSha ?? "not available")}</strong></div>
            <div class="meta-tile"><span>Base URL</span><strong>${escapeHtml(manifest.baseUrl)}</strong></div>
            <div class="meta-tile"><span>PDF URL</span><strong>${escapeHtml(manifest.pdfUrl)}</strong></div>
          </div>
        </div>
        <div class="cover-grid">
          <div class="cover-card">
            <h2>Routes Captured</h2>
            <ul>${routeList}</ul>
          </div>
          <div class="cover-card">
            <h2>Viewports Captured</h2>
            <ul>${viewportList}</ul>
          </div>
        </div>
      </section>
      ${pages}
    </main>
  </body>
</html>
`;
}

async function saveContactSheet(browser: Browser, manifest: ArtifactManifest) {
  const html = renderContactSheet(manifest);
  const htmlPath = path.join(outputDir, "contact-sheet.html");
  const pngPath = path.join(outputDir, "contact-sheet.png");
  const pdfHtml = renderPdfContactSheet(manifest);
  const pdfHtmlPath = path.join(outputDir, "contact-sheet-pdf.html");
  const pdfPath = path.join(outputDir, "contact-sheet.pdf");

  await writeFile(htmlPath, html);
  await writeFile(pdfHtmlPath, pdfHtml);

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
  } finally {
    await page.context().close();
  }

  const pdfPage = await newPage(browser, {
    name: "contact-sheet-pdf",
    width: 1122,
    height: 1587
  });

  try {
    await pdfPage.goto(pathToFileURL(pdfHtmlPath).toString(), {
      waitUntil: "domcontentloaded"
    });
    await pdfPage.emulateMedia({
      media: "print"
    });
    await pdfPage.pdf({
      path: pdfPath,
      format: "A3",
      printBackground: true,
      preferCSSPageSize: true
    });
  } finally {
    await pdfPage.context().close();
  }
}

async function publishLatestVisualAudit(manifest: ArtifactManifest) {
  const pdfPath = path.join(outputDir, "contact-sheet.pdf");
  const publicPdfPath = path.join(publicAuditDir, "latest.pdf");
  const publicJsonPath = path.join(publicAuditDir, "latest.json");
  const latest = {
    createdAt: manifest.createdAt,
    commitSha: manifest.commitSha ?? null,
    workflowRunId: process.env.GITHUB_RUN_ID ?? null,
    artifactId: process.env.VISUAL_AUDIT_ARTIFACT_ID ?? null,
    pdfUrl: publicPdfUrl,
    routes: manifest.routes,
    viewports: manifest.viewports
  };

  await mkdir(publicAuditDir, {
    recursive: true
  });
  await copyFile(pdfPath, publicPdfPath);
  await writeFile(publicJsonPath, `${JSON.stringify(latest, null, 2)}\n`);
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

    const manifest: ArtifactManifest = {
      createdAt,
      baseUrl,
      commitSha: getGitCommit(),
      workflowRunId: process.env.GITHUB_RUN_ID ?? null,
      artifactId: process.env.VISUAL_AUDIT_ARTIFACT_ID ?? null,
      pdfUrl: publicPdfUrl,
      routes: routes.map((route) => route.path),
      viewports: [mobile390, mobile430, desktop],
      screenshots,
      note: "Tell ChatGPT: review latest visual audit."
    };

    await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await saveContactSheet(browser, manifest);
    await publishLatestVisualAudit(manifest);
  } finally {
    await browser.close();
  }

  console.log(`Visual audit artifact written to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
