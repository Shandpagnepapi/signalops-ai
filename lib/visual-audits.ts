import "server-only";

export type VisualAuditViewport = {
  name: string;
  width: number;
  height: number;
};

export type VisualAuditScreenshot = {
  route: string;
  routeSlug: string;
  viewport: string;
  width: number;
  height: number;
  publicUrl: string;
  path: string;
};

export type VisualAuditManifest = {
  runId: string;
  createdAt: string;
  baseUrl: string;
  routes: string[];
  viewports: VisualAuditViewport[];
  screenshots: VisualAuditScreenshot[];
  notes: string;
  commit?: string;
};

export type VisualAuditRecentRun = {
  runId: string;
  createdAt: string;
  path: string;
  publicUrl: string;
};

export type VisualAuditLatestPointer = {
  runId: string;
  createdAt: string;
  baseUrl: string;
  manifestPath: string;
  manifestPublicUrl: string;
  recentRuns?: VisualAuditRecentRun[];
};

export type VisualAuditData = {
  latest: VisualAuditLatestPointer;
  manifest: VisualAuditManifest;
  recentRuns: VisualAuditRecentRun[];
};

function cleanEnv(value: string | undefined) {
  return value?.trim() ?? "";
}

function getVisualAuditBucket() {
  return cleanEnv(process.env.VISUAL_AUDIT_BUCKET) || "visual-audits";
}

function getSupabaseUrl() {
  return cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
}

function encodeStoragePath(storagePath: string) {
  return storagePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function getPublicStorageUrl(storagePath: string) {
  const supabaseUrl = getSupabaseUrl();

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }

  return `${supabaseUrl}/storage/v1/object/public/${getVisualAuditBucket()}/${encodeStoragePath(storagePath)}`;
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Visual audit file could not be loaded: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function isVisualAuditEnabled() {
  return cleanEnv(process.env.VISUAL_AUDIT_ENABLED).toLowerCase() !== "false";
}

export function isValidVisualAuditKey(key: string | undefined) {
  const expected = cleanEnv(process.env.VISUAL_AUDIT_PUBLIC_KEY);

  return Boolean(expected && key && key === expected);
}

export async function getVisualAuditData(runId?: string): Promise<VisualAuditData> {
  const latest = await fetchJson<VisualAuditLatestPointer>(getPublicStorageUrl("latest.json"));
  const safeRunId = runId?.match(/^\d{4}-\d{2}-\d{2}-\d{6}[a-z0-9-]*$/)
    ? runId
    : "";
  const manifestUrl = safeRunId
    ? getPublicStorageUrl(`runs/${safeRunId}/manifest.json`)
    : latest.manifestPublicUrl;
  const manifest = await fetchJson<VisualAuditManifest>(manifestUrl);

  return {
    latest,
    manifest,
    recentRuns: latest.recentRuns ?? []
  };
}
