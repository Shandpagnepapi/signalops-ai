import { AiManagerShell } from "@/components/dashboard/ai-manager-shell";
import { createDemoPreviewSubmissions } from "@/lib/preview-generator";
import { listPreviewSubmissions } from "@/lib/preview-store";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "SignalOps Free Preview Queue",
  description:
    "Internal SignalOps review queue for Free Preview submissions, draft preview reports, proposal drafts, email drafts, and approval statuses.",
  path: "/admin/manager",
  noIndex: true
});

export const dynamic = "force-dynamic";

export default async function AdminManagerPage() {
  const submissions = await listPreviewSubmissions();

  return <AiManagerShell submissions={submissions.length > 0 ? submissions : createDemoPreviewSubmissions()} />;
}
