import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseProjectRefFromUrl,
  getVisualAuditAdminKey,
  loadEnvFiles,
  readVisualAuditEnv
} from "./visual-audit-cloud-utils";

type JwtDetails = {
  header?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  error?: string;
};

type KeyKind =
  | "legacy-jwt"
  | "new-secret"
  | "publishable"
  | "unknown";

function printLine(label: string, value: string | number | boolean | null | undefined) {
  console.log(`${label}: ${value ?? "not available"}`);
}

function safeFingerprint(value: string) {
  if (!value) {
    return "missing";
  }

  if (value.length <= 12) {
    return `${value.slice(0, 2)}...${value.slice(-2)} (${value.length} chars)`;
  }

  return `${value.slice(0, 6)}...${value.slice(-4)} (${value.length} chars)`;
}

function classifyKey(key: string): KeyKind {
  if (key.startsWith("eyJ")) {
    return "legacy-jwt";
  }

  if (key.startsWith("sb_secret_")) {
    return "new-secret";
  }

  if (key.startsWith("sb_publishable_")) {
    return "publishable";
  }

  return "unknown";
}

function decodeBase64Url(segment: string) {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function decodeJwt(key: string): JwtDetails {
  const [headerSegment, payloadSegment] = key.split(".");

  if (!headerSegment || !payloadSegment) {
    return {
      error: "JWT does not have header and payload segments."
    };
  }

  try {
    return {
      header: JSON.parse(decodeBase64Url(headerSegment)) as Record<string, unknown>,
      payload: JSON.parse(decodeBase64Url(payloadSegment)) as Record<string, unknown>
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "JWT could not be decoded."
    };
  }
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function formatExp(value: unknown) {
  if (typeof value !== "number") {
    return "not available";
  }

  return `${value} (${new Date(value * 1000).toISOString()})`;
}

function diagnoseStorageError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("signature verification failed")) {
    return [
      "Supabase rejected the key signature.",
      "Most likely causes: wrong project key, stale rotated key, copied anon/publishable key, or extra whitespace/newlines in the GitHub secret."
    ];
  }

  if (lower.includes("invalid api key") || lower.includes("jwt")) {
    return [
      "Supabase rejected the API key.",
      "Confirm GitHub Actions has SUPABASE_SECRET_KEY or the legacy SUPABASE_SERVICE_ROLE_KEY for the same project as NEXT_PUBLIC_SUPABASE_URL."
    ];
  }

  return ["Supabase Storage request failed. Check the URL, key, and bucket permissions."];
}

async function main() {
  loadEnvFiles();

  const supabaseUrl = readVisualAuditEnv("NEXT_PUBLIC_SUPABASE_URL").replace(/\/$/, "");
  const bucket = readVisualAuditEnv("VISUAL_AUDIT_BUCKET") || "visual-audits";
  const adminKey = getVisualAuditAdminKey();
  const keyKind = classifyKey(adminKey.key);
  const projectRef = getSupabaseProjectRefFromUrl(supabaseUrl);
  let failed = false;

  console.log("SignalOps Supabase visual audit preflight");
  console.log("--------------------------------------------");
  printLine("NEXT_PUBLIC_SUPABASE_URL configured", Boolean(supabaseUrl));
  printLine("Parsed Supabase URL project ref", projectRef || "not parsed");
  printLine("Visual audit bucket", bucket);
  printLine("Admin key source", adminKey.key ? adminKey.source : "missing");
  printLine("Admin key fingerprint", safeFingerprint(adminKey.key));
  printLine("Admin key format", keyKind);

  if (!supabaseUrl) {
    console.error("FAIL: NEXT_PUBLIC_SUPABASE_URL is missing.");
    failed = true;
  }

  try {
    if (supabaseUrl) {
      const parsed = new URL(supabaseUrl);

      if (!parsed.protocol.startsWith("http")) {
        console.error("FAIL: NEXT_PUBLIC_SUPABASE_URL must be an https URL.");
        failed = true;
      }
    }
  } catch {
    console.error("FAIL: NEXT_PUBLIC_SUPABASE_URL is not a valid URL.");
    failed = true;
  }

  if (!adminKey.key) {
    console.error("FAIL: SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY is missing.");
    failed = true;
  }

  if (keyKind === "publishable") {
    console.error("FAIL: The configured key looks like a publishable key. Use SUPABASE_SECRET_KEY or legacy service_role key for uploads.");
    failed = true;
  }

  if (keyKind === "unknown" && adminKey.key) {
    console.warn("WARN: Key format is unknown. Expected legacy JWT starting with eyJ or new secret key starting with sb_secret_.");
  }

  if (keyKind === "legacy-jwt") {
    const decoded = decodeJwt(adminKey.key);

    if (decoded.error) {
      console.warn(`WARN: Legacy JWT could not be decoded locally: ${decoded.error}`);
    } else {
      const role = safeString(decoded.payload?.role);
      const issuer = safeString(decoded.payload?.iss);
      const tokenRef = safeString(decoded.payload?.ref);

      printLine("JWT header alg", safeString(decoded.header?.alg));
      printLine("JWT role", role || "not present");
      printLine("JWT issuer", issuer || "not present");
      printLine("JWT exp", formatExp(decoded.payload?.exp));
      printLine("JWT project ref", tokenRef || "not present");
      printLine("JWT role looks like service_role", role === "service_role");

      if (role && role !== "service_role") {
        console.error("FAIL: Legacy JWT role is not service_role. Do not use anon/publishable JWTs for visual audit uploads.");
        failed = true;
      }

      if (tokenRef && projectRef) {
        printLine("JWT ref appears to match URL ref", tokenRef === projectRef);

        if (tokenRef !== projectRef) {
          console.error("FAIL: JWT project ref does not match NEXT_PUBLIC_SUPABASE_URL project ref.");
          failed = true;
        }
      }
    }
  }

  if (failed) {
    process.exit(1);
  }

  const client = createClient(supabaseUrl, adminKey.key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  });

  console.log("");
  console.log("Testing Supabase Storage access...");

  const listResult = await client.storage.listBuckets();

  if (listResult.error) {
    console.error(`FAIL: Could not list Supabase Storage buckets: ${listResult.error.message}`);

    for (const line of diagnoseStorageError(listResult.error.message)) {
      console.error(`DIAGNOSIS: ${line}`);
    }

    process.exit(1);
  }

  printLine("Storage bucket list accessible", true);

  const matchingBucket = listResult.data.find((item) => item.name === bucket);

  if (!matchingBucket) {
    console.error(`FAIL: Bucket "${bucket}" was not found. Create it in Supabase Storage and make it public.`);
    process.exit(1);
  }

  printLine("Visual audit bucket exists", true);
  printLine("Visual audit bucket public", matchingBucket.public);

  if (!matchingBucket.public) {
    console.error(`FAIL: Bucket "${bucket}" exists but is private. The screenshot viewer needs public object URLs.`);
    process.exit(1);
  }

  const bucketResult = await client.storage.getBucket(bucket);

  if (bucketResult.error) {
    console.error(`FAIL: Bucket "${bucket}" exists but is not accessible: ${bucketResult.error.message}`);

    for (const line of diagnoseStorageError(bucketResult.error.message)) {
      console.error(`DIAGNOSIS: ${line}`);
    }

    process.exit(1);
  }

  console.log("PASS: Supabase visual audit preflight succeeded.");
}

main().catch((error) => {
  console.error(`FAIL: ${error instanceof Error ? error.message : "Unknown preflight error."}`);
  process.exit(1);
});
