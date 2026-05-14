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

const markSvg = `<svg aria-label="Envo AI worker mark" fill="none" viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="envo-mark-gradient" x1="36" x2="222" y1="38" y2="142" gradientUnits="userSpaceOnUse">
      <stop stop-color="#328BFF"/>
      <stop offset="0.48" stop-color="#2563EB"/>
      <stop offset="1" stop-color="#6F4DFF"/>
    </linearGradient>
    <linearGradient id="envo-mark-highlight" x1="92" x2="174" y1="44" y2="136" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="envo-mark-shadow" x="0" y="0" width="260" height="180" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="14" stdDeviation="13" flood-color="#2563EB" flood-opacity="0.2"/>
    </filter>
  </defs>
  <g filter="url(#envo-mark-shadow)" stroke-linecap="round">
    <path d="M42 70h42" stroke="url(#envo-mark-gradient)" stroke-width="14"/>
    <path d="M28 92h54" stroke="url(#envo-mark-gradient)" stroke-width="14" opacity="0.82"/>
    <path d="M48 114h36" stroke="url(#envo-mark-gradient)" stroke-width="14" opacity="0.66"/>
    <path d="M120 28h48c34 0 60 25 60 57 0 33-26 58-60 58h-26l-42 29v-33c-26-7-44-28-44-54 0-32 27-57 64-57Z" fill="url(#envo-mark-gradient)"/>
    <path d="M122 35h43c30 0 52 22 52 50 0 29-22 51-52 51h-25l-30 21v-25c-22-6-38-24-38-47 0-28 22-50 50-50Z" fill="url(#envo-mark-highlight)" opacity="0.14"/>
  </g>
  <g stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
    <path d="M118 91c0-20 16-35 37-35 19 0 33 13 33 30 0 4-1 7-2 10h-49" stroke-width="16"/>
    <path d="M186 116c-8 9-18 13-31 13-22 0-37-15-37-38" stroke-width="16"/>
  </g>
</svg>`;

function logoSvg({ dark = false } = {}) {
  const wordmark = dark ? "#ffffff" : "#071126";
  return `<svg aria-label="Envo AI worker logo" fill="none" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="envo-logo-gradient" x1="36" x2="222" y1="38" y2="142" gradientUnits="userSpaceOnUse">
      <stop stop-color="#328BFF"/>
      <stop offset="0.48" stop-color="#2563EB"/>
      <stop offset="1" stop-color="#6F4DFF"/>
    </linearGradient>
    <linearGradient id="envo-logo-highlight" x1="92" x2="174" y1="44" y2="136" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="envo-logo-shadow" x="0" y="0" width="260" height="180" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="14" stdDeviation="13" flood-color="#2563EB" flood-opacity="0.2"/>
    </filter>
  </defs>
  <g filter="url(#envo-logo-shadow)" stroke-linecap="round">
    <path d="M42 70h42" stroke="url(#envo-logo-gradient)" stroke-width="14"/>
    <path d="M28 92h54" stroke="url(#envo-logo-gradient)" stroke-width="14" opacity="0.82"/>
    <path d="M48 114h36" stroke="url(#envo-logo-gradient)" stroke-width="14" opacity="0.66"/>
    <path d="M120 28h48c34 0 60 25 60 57 0 33-26 58-60 58h-26l-42 29v-33c-26-7-44-28-44-54 0-32 27-57 64-57Z" fill="url(#envo-logo-gradient)"/>
    <path d="M122 35h43c30 0 52 22 52 50 0 29-22 51-52 51h-25l-30 21v-25c-22-6-38-24-38-47 0-28 22-50 50-50Z" fill="url(#envo-logo-highlight)" opacity="0.14"/>
  </g>
  <g stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
    <path d="M118 91c0-20 16-35 37-35 19 0 33 13 33 30 0 4-1 7-2 10h-49" stroke-width="16"/>
    <path d="M186 116c-8 9-18 13-31 13-22 0-37-15-37-38" stroke-width="16"/>
  </g>
  <text x="270" y="122" fill="${wordmark}" font-family="Inter, ui-rounded, Avenir Next, Segoe UI, Arial, sans-serif" font-size="96" font-weight="850" letter-spacing="-2">Envo</text>
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
