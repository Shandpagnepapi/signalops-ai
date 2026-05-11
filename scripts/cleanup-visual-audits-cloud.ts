import { pathToFileURL } from "node:url";
import {
  cleanupVisualAudits,
  createVisualAuditSupabaseClient,
  ensureVisualAuditBucket,
  getVisualAuditEnv
} from "./visual-audit-cloud-utils";

function parseArgs() {
  return {
    dryRun: process.argv.includes("--dry-run")
  };
}

export async function runVisualAuditCleanup() {
  const { dryRun } = parseArgs();
  const env = getVisualAuditEnv();
  const client = createVisualAuditSupabaseClient(env);

  await ensureVisualAuditBucket(client, env.bucket);

  const summary = await cleanupVisualAudits(client, env, {
    dryRun
  });

  console.log(
    JSON.stringify(
      {
        bucket: env.bucket,
        dryRun,
        ...summary
      },
      null,
      2
    )
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runVisualAuditCleanup().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
