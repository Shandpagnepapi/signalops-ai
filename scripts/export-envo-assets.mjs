import { mkdir, writeFile } from "node:fs/promises";
import { execFile, spawn } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { chromium } from "playwright";

const outputDir = path.join(process.cwd(), "public", "brand", "envo", "generated");
const baseUrl = process.env.ENVO_ASSET_BASE_URL ?? "http://127.0.0.1:3000";
const execFileAsync = promisify(execFile);

const pngAssets = [
  "envo-brand-board-reference",
  "envo-app-icon",
  "envo-signature-card",
  "envo-feature-stack-reference",
  "envo-logo-variations-row",
  "envo-dashboard-desktop",
  "envo-dashboard-mobile",
  "envo-owner-command-center",
  "envo-lead-workflow",
  "envo-preview-cockpit",
  "envo-og-image"
];

function markDefs(gradientId) {
  return `<linearGradient id="${gradientId}" x1="34" x2="214" y1="42" y2="142" gradientUnits="userSpaceOnUse">
      <stop stop-color="#328BFF"/>
      <stop offset="0.52" stop-color="#4D63F6"/>
      <stop offset="1" stop-color="#7C3AED"/>
    </linearGradient>`;
}

function markBody(gradientId) {
  const gradient = `url(#${gradientId})`;
  return `<path d="M108 128c8 7 20 11 35 12l-50 31c-6 4-12-2-10-9l14-38c3 2 7 3 11 4Z" fill="${gradient}"/>
  <g stroke="${gradient}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M37 59h27" stroke-width="13"/>
    <path d="M17 87h47" stroke-width="13" opacity="0.8"/>
    <path d="M39 114h27" stroke-width="13" opacity="0.68"/>
    <path d="M211 45h-80c-34 0-55 19-55 46s22 49 57 49h76" stroke-width="34"/>
    <path d="M131 92h78" stroke-width="34"/>
  </g>`;
}

const markSvg = `<svg aria-label="Envo AI worker mark" fill="none" viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${markDefs("envo-mark-gradient")}
  </defs>
  ${markBody("envo-mark-gradient")}
</svg>`;

function logoSvg({ dark = false } = {}) {
  const wordmark = dark ? "#ffffff" : "#071126";
  return `<svg aria-label="Envo AI worker logo" fill="none" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${markDefs("envo-logo-gradient")}
  </defs>
  ${markBody("envo-logo-gradient")}
  <text x="280" y="122" fill="${wordmark}" font-family="Inter, ui-rounded, Avenir Next, Segoe UI, Arial, sans-serif" font-size="96" font-weight="850" letter-spacing="-2">Envo</text>
</svg>`;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "envo-mark-gradient.svg"), markSvg);
  await writeFile(path.join(outputDir, "envo-logo-primary.svg"), logoSvg());
  await writeFile(path.join(outputDir, "envo-logo-dark.svg"), logoSvg({ dark: true }));

  const server = await ensureServer();

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1500, height: 1200 },
    deviceScaleFactor: 3
  });

  await page.goto(`${baseUrl.replace(/\/$/, "")}/envo-assets`, {
    waitUntil: "networkidle",
    timeout: 60000
  });

  for (const asset of pngAssets) {
    const locator = page.locator(`[data-envo-export="${asset}"]`);
    await locator.waitFor({ state: "visible", timeout: 30000 });
    await locator.screenshot({
      path: path.join(outputDir, `${asset}.png`),
      omitBackground: true
    });
  }

  await browser.close();
  await stopServer(server);
  console.log(`Exported ${pngAssets.length} Envo PNG assets and 3 SVG assets to ${outputDir}`);
  process.exit(0);
}

async function ensureServer() {
  if (await canReachAssetsPage()) {
    return null;
  }

  const server = process.platform === "win32"
    ? spawn("npm.cmd run dev -- --hostname 127.0.0.1 --port 3000", {
        cwd: process.cwd(),
        shell: true,
        stdio: "ignore"
      })
    : spawn("npm", ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3000"], {
    cwd: process.cwd(),
    stdio: "ignore"
  });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await canReachAssetsPage()) {
      return server;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await stopServer(server);
  throw new Error("Could not start local Next.js server for Envo asset export.");
}

async function canReachAssetsPage() {
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/envo-assets`, {
      signal: AbortSignal.timeout(1500)
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function stopServer(server) {
  if (!server?.pid) {
    return;
  }

  if (process.platform === "win32") {
    await execFileAsync("taskkill", ["/pid", String(server.pid), "/T", "/F"]).catch(() => undefined);
    return;
  }

  server.kill("SIGTERM");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
