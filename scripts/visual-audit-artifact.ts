import { chromium, type Browser } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
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
  routes: string[];
  viewports: AuditViewport[];
  screenshots: AuditScreenshot[];
  note: string;
};

const outputDir = path.resolve(process.cwd(), ".visual-audit-output", "latest");

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

async function saveContactSheet(browser: Browser, manifest: ArtifactManifest) {
  const html = renderContactSheet(manifest);
  const htmlPath = path.join(outputDir, "contact-sheet.html");
  const pngPath = path.join(outputDir, "contact-sheet.png");

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
  } finally {
    await page.context().close();
  }
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
      routes: routes.map((route) => route.path),
      viewports: [mobile390, mobile430, desktop],
      screenshots,
      note: "Tell ChatGPT: review latest visual audit."
    };

    await writeFile(path.join(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
    await saveContactSheet(browser, manifest);
  } finally {
    await browser.close();
  }

  console.log(`Visual audit artifact written to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
