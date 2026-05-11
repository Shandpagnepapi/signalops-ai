import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

type SupabaseStorageFile = {
  name: string;
  id?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  last_accessed_at?: string | null;
  metadata?: {
    size?: number;
    [key: string]: unknown;
  } | null;
};

export type VisualAuditRunSummary = {
  runId: string;
  createdAt: string;
  path: string;
  publicUrl: string;
  fileCount: number;
  sizeBytes: number;
};

export type VisualAuditCleanupOptions = {
  keepRunId?: string;
  dryRun?: boolean;
};

export type VisualAuditCleanupSummary = {
  deletedRuns: string[];
  deletedFiles: number;
  deletedBytes: number;
  remainingRuns: number;
  remainingBytes: number;
};

export type VisualAuditEnv = {
  supabaseUrl: string;
  serviceRoleKey: string;
  bucket: string;
  maxAgeDays: number;
  maxRuns: number;
  maxStorageMb: number;
  enabled: boolean;
};

const envFiles = [".env.local", ".env"];

export function loadEnvFiles() {
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);

    if (!existsSync(fullPath)) {
      continue;
    }

    const content = readFileSync(fullPath, "utf8");

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();

      if (!line || line.startsWith("#")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  }
}

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function parseNumberEnv(name: string, fallback: number) {
  const parsed = Number(readEnv(name));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getVisualAuditEnv(): VisualAuditEnv {
  loadEnvFiles();

  const supabaseUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  const enabledValue = readEnv("VISUAL_AUDIT_ENABLED").toLowerCase();

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is required for cloud visual audits.");
  }

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for cloud visual audits.");
  }

  return {
    supabaseUrl,
    serviceRoleKey,
    bucket: readEnv("VISUAL_AUDIT_BUCKET") || "visual-audits",
    maxAgeDays: parseNumberEnv("VISUAL_AUDIT_MAX_AGE_DAYS", 30),
    maxRuns: parseNumberEnv("VISUAL_AUDIT_MAX_RUNS", 12),
    maxStorageMb: parseNumberEnv("VISUAL_AUDIT_MAX_STORAGE_MB", 300),
    enabled: enabledValue !== "false"
  };
}

export function createVisualAuditSupabaseClient(env = getVisualAuditEnv()) {
  if (!env.enabled) {
    throw new Error("VISUAL_AUDIT_ENABLED is set to false.");
  }

  return createClient(env.supabaseUrl, env.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  });
}

export async function ensureVisualAuditBucket(
  client: SupabaseClient,
  bucket: string
) {
  const { data, error } = await client.storage.getBucket(bucket);

  if (error || !data) {
    const createResult = await client.storage.createBucket(bucket, {
      public: true
    });

    if (createResult.error) {
      throw createResult.error;
    }

    return;
  }

  if (!data.public) {
    const updateResult = await client.storage.updateBucket(bucket, {
      public: true
    });

    if (updateResult.error) {
      throw updateResult.error;
    }
  }
}

export function getPublicStorageUrl(env: VisualAuditEnv, storagePath: string) {
  const encodedPath = storagePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${env.supabaseUrl}/storage/v1/object/public/${env.bucket}/${encodedPath}`;
}

export function formatRunId(date = new Date(), label = "") {
  const base = date
    .toISOString()
    .replace(/\.\d{3}Z$/, "")
    .replace("T", "-")
    .replace(/:/g, "");
  const cleanLabel = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36);

  return cleanLabel ? `${base}-${cleanLabel}` : base;
}

export function getRunDate(runId: string) {
  const match = runId.match(/^(\d{4})-(\d{2})-(\d{2})-(\d{2})(\d{2})(\d{2})/);

  if (!match) {
    return new Date(0);
  }

  const [, year, month, day, hour, minute, second] = match;
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`);
}

export function getGitCommit() {
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

function getFileSize(file: SupabaseStorageFile) {
  return typeof file.metadata?.size === "number" ? file.metadata.size : 0;
}

async function listRunFiles(client: SupabaseClient, bucket: string, runId: string) {
  const { data, error } = await client.storage.from(bucket).list(`runs/${runId}`, {
    limit: 1000,
    offset: 0,
    sortBy: {
      column: "name",
      order: "asc"
    }
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as SupabaseStorageFile[];
}

export async function listVisualAuditRuns(
  client: SupabaseClient,
  env: VisualAuditEnv
): Promise<VisualAuditRunSummary[]> {
  const { data, error } = await client.storage.from(env.bucket).list("runs", {
    limit: 1000,
    offset: 0,
    sortBy: {
      column: "name",
      order: "desc"
    }
  });

  if (error) {
    throw error;
  }

  const runFolders = ((data ?? []) as SupabaseStorageFile[])
    .map((item) => item.name)
    .filter((name) => /^\d{4}-\d{2}-\d{2}-\d{6}/.test(name));
  const runs: VisualAuditRunSummary[] = [];

  for (const runId of runFolders) {
    const files = await listRunFiles(client, env.bucket, runId);
    const sizeBytes = files.reduce((sum, file) => sum + getFileSize(file), 0);

    runs.push({
      runId,
      createdAt: getRunDate(runId).toISOString(),
      path: `runs/${runId}/manifest.json`,
      publicUrl: getPublicStorageUrl(env, `runs/${runId}/manifest.json`),
      fileCount: files.length,
      sizeBytes
    });
  }

  return runs.sort((a, b) => getRunDate(b.runId).getTime() - getRunDate(a.runId).getTime());
}

async function deleteRun(
  client: SupabaseClient,
  env: VisualAuditEnv,
  run: VisualAuditRunSummary,
  dryRun: boolean
) {
  const files = await listRunFiles(client, env.bucket, run.runId);
  const paths = files.map((file) => `runs/${run.runId}/${file.name}`);

  if (!dryRun && paths.length > 0) {
    const { error } = await client.storage.from(env.bucket).remove(paths);

    if (error) {
      throw error;
    }
  }

  return {
    files: paths.length,
    bytes: run.sizeBytes
  };
}

export async function cleanupVisualAudits(
  client: SupabaseClient,
  env: VisualAuditEnv,
  options: VisualAuditCleanupOptions = {}
): Promise<VisualAuditCleanupSummary> {
  const dryRun = options.dryRun ?? false;
  const maxBytes = env.maxStorageMb * 1024 * 1024;
  const now = Date.now();
  const maxAgeMs = env.maxAgeDays * 24 * 60 * 60 * 1000;
  const deletedRuns: string[] = [];
  let deletedFiles = 0;
  let deletedBytes = 0;
  let runs = await listVisualAuditRuns(client, env);

  async function removeRun(run: VisualAuditRunSummary) {
    if (run.runId === options.keepRunId) {
      return;
    }

    const deleted = await deleteRun(client, env, run, dryRun);
    deletedRuns.push(run.runId);
    deletedFiles += deleted.files;
    deletedBytes += deleted.bytes;
    runs = runs.filter((existing) => existing.runId !== run.runId);
  }

  for (const run of [...runs].reverse()) {
    const age = now - getRunDate(run.runId).getTime();

    if (age > maxAgeMs) {
      await removeRun(run);
    }
  }

  while (runs.length > env.maxRuns) {
    const oldest = [...runs].reverse().find((run) => run.runId !== options.keepRunId);

    if (!oldest) {
      break;
    }

    await removeRun(oldest);
  }

  let remainingBytes = runs.reduce((sum, run) => sum + run.sizeBytes, 0);

  while (remainingBytes > maxBytes && runs.some((run) => run.runId !== options.keepRunId)) {
    const oldest = [...runs].reverse().find((run) => run.runId !== options.keepRunId);

    if (!oldest) {
      break;
    }

    await removeRun(oldest);
    remainingBytes = runs.reduce((sum, run) => sum + run.sizeBytes, 0);
  }

  return {
    deletedRuns,
    deletedFiles,
    deletedBytes,
    remainingRuns: runs.length,
    remainingBytes
  };
}
