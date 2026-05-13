import { AiManagerShell } from "@/components/dashboard/ai-manager-shell";
import { listPreviewSubmissionsWithMeta } from "@/lib/preview-store";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "SignalOps Envo Preview Queue",
  description:
    "Internal SignalOps review queue for Envo Preview submissions, draft preview reports, proposal drafts, email drafts, and approval statuses.",
  path: "/admin/manager",
  noIndex: true
});

export const dynamic = "force-dynamic";

export default async function AdminManagerPage() {
  const { submissions, warning, persistenceEnabled } = await listPreviewSubmissionsWithMeta();

  return (
    <AiManagerShell
      submissions={submissions}
      persistenceEnabled={persistenceEnabled}
      persistenceWarning={warning}
    />
  );
}
