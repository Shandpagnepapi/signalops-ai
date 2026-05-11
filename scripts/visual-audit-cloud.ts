import { chromium, type Browser, type Page } from "playwright";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  cleanupVisualAudits,
  createVisualAuditSupabaseClient,
  ensureVisualAuditBucket,
  formatRunId,
  getGitCommit,
  getPublicStorageUrl,
  getVisualAuditEnv,
  listVisualAuditRuns,
  type VisualAuditRunSummary
} from "./visual-audit-cloud-utils";

type AuditRoute = {
  path: string;
  slug: string;
};

type AuditViewport = {
  name: string;
  width: number;
  height: number;
};

type AuditScreenshot = {
  route: string;
  routeSlug: string;
  viewport: string;
  width: number;
  height: number;
  publicUrl: string;
  path: string;
};

type AuditManifest = {
  runId: string;
  createdAt: string;
  baseUrl: string;
  routes: string[];
  viewports: AuditViewport[];
  screenshots: AuditScreenshot[];
  notes: string;
  commit?: string;
};

type LatestPointer = {
  runId: string;
  createdAt: string;
  baseUrl: string;
  manifestPath: string;
  manifestPublicUrl: string;
  recentRuns: Pick<VisualAuditRunSummary, "runId" | "createdAt" | "path" | "publicUrl">[];
};

const routes: AuditRoute[] = [
  { path: "/", slug: "home" },
  { path: "/preview", slug: "preview" },
  { path: "/demo", slug: "demo" },
  { path: "/roi-calculator", slug: "roi-calculator" },
  { path: "/how-it-works", slug: "how-it-works" },
  { path: "/privacy", slug: "privacy" },
  { path: "/terms", slug: "terms" },
  { path: "/services/ai-lead-response", slug: "service-ai-lead-response" },
  { path: "/industries/mobile-fleet-wash", slug: "industry-mobile-fleet-wash" },
  { path: "/alternatives", slug: "alternatives" }
];

const standardViewports: AuditViewport[] = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1400 }
];

const narrowMobileViewport: AuditViewport = {
  name: "mobile-320",
  width: 320,
  height: 844
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
    baseUrl: args.get("base-url") || "https://www.signalops.pro",
    runLabel: args.get("run-label") || ""
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
    return [narrowMobileViewport, ...standardViewports];
  }

  return standardViewports;
}

function getScreenshotFileName(route: AuditRoute, viewport: AuditViewport) {
  return `${route.slug}-${viewport.name}.jpg`;
}

async function preparePage(browser: Browser, viewport: AuditViewport) {
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

async function captureScreenshot({
  page,
  baseUrl,
  route,
  filePath
}: {
  page: Page;
  baseUrl: string;
  route: AuditRoute;
  filePath: string;
}) {
  const url = new URL(route.path, baseUrl).toString();
  await page.goto(url, {
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
}

async function uploadFile({
  bucket,
  contentType,
  localPath,
  remotePath,
  client
}: {
  bucket: string;
  contentType: string;
  localPath: string;
  remotePath: string;
  client: ReturnType<typeof createVisualAuditSupabaseClient>;
}) {
  const file = await readFile(localPath);
  const { error } = await client.storage.from(bucket).upload(remotePath, file, {
    cacheControl: "2592000",
    contentType,
    upsert: true
  });

  if (error) {
    throw error;
  }
}

async function uploadJson({
  bucket,
  remotePath,
  client,
  value
}: {
  bucket: string;
  remotePath: string;
  client: ReturnType<typeof createVisualAuditSupabaseClient>;
  value: unknown;
}) {
  const { error } = await client.storage.from(bucket).upload(
    remotePath,
    Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8"),
    {
      cacheControl: "300",
      contentType: "application/json",
      upsert: true
    }
  );

  if (error) {
    throw error;
  }
}

async function main() {
  const { baseUrl, runLabel } = parseArgs();
  const env = getVisualAuditEnv();
  const client = createVisualAuditSupabaseClient(env);
  const runId = formatRunId(new Date(), runLabel);
  const createdAt = new Date().toISOString();
  const runDir = path.resolve(process.cwd(), ".visual-audit-temp", runId);
  const runStoragePrefix = `runs/${runId}`;
  const screenshots: AuditScreenshot[] = [];

  await ensureVisualAuditBucket(client, env.bucket);
  await mkdir(runDir, {
    recursive: true
  });

  const browser = await chromium.launch({
    headless: true
  });

  try {
    for (const route of routes) {
      assertPublicRoute(route);

      for (const viewport of getRouteViewports(route)) {
        const fileName = getScreenshotFileName(route, viewport);
        const localPath = path.join(runDir, fileName);
        const remotePath = `${runStoragePrefix}/${fileName}`;
        const page = await preparePage(browser, viewport);

        try {
          await captureScreenshot({
            page,
            baseUrl,
            route,
            filePath: localPath
          });
        } finally {
          await page.context().close();
        }

        await uploadFile({
          bucket: env.bucket,
          contentType: "image/jpeg",
          localPath,
          remotePath,
          client
        });

        screenshots.push({
          route: route.path,
          routeSlug: route.slug,
          viewport: viewport.name,
          width: viewport.width,
          height: viewport.height,
          publicUrl: getPublicStorageUrl(env, remotePath),
          path: remotePath
        });

        console.log(`Uploaded ${remotePath}`);
      }
    }
  } finally {
    await browser.close();
  }

  const viewports = [
    narrowMobileViewport,
    ...standardViewports
  ];
  const manifest: AuditManifest = {
    runId,
    createdAt,
    baseUrl,
    routes: routes.map((route) => route.path),
    viewports,
    screenshots,
    notes: "Public SignalOps visual audit screenshots only. No admin/private pages captured.",
    commit: getGitCommit()
  };
  const manifestPath = `${runStoragePrefix}/manifest.json`;
  const localManifestPath = path.join(runDir, "manifest.json");

  await writeFile(localManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await uploadFile({
    bucket: env.bucket,
    contentType: "application/json",
    localPath: localManifestPath,
    remotePath: manifestPath,
    client
  });

  const cleanupSummary = await cleanupVisualAudits(client, env, {
    keepRunId: runId
  });
  const recentRuns = await listVisualAuditRuns(client, env);
  const latest: LatestPointer = {
    runId,
    createdAt,
    baseUrl,
    manifestPath,
    manifestPublicUrl: getPublicStorageUrl(env, manifestPath),
    recentRuns: recentRuns.slice(0, env.maxRuns).map((run) => ({
      runId: run.runId,
      createdAt: run.createdAt,
      path: run.path,
      publicUrl: run.publicUrl
    }))
  };

  await uploadJson({
    bucket: env.bucket,
    remotePath: "latest.json",
    client,
    value: latest
  });

  await rm(runDir, {
    force: true,
    recursive: true
  });

  console.log(`Visual audit uploaded: ${latest.manifestPublicUrl}`);
  console.log(
    `Cleanup deleted ${cleanupSummary.deletedRuns.length} runs, ${cleanupSummary.deletedFiles} files.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
