import { AiManagerShell } from "@/components/dashboard/ai-manager-shell";
import { createDemoPreviewSubmissions } from "@/lib/preview-generator";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "SignalOps AI Manager",
  description:
    "Internal SignalOps AI Manager demo for preview submissions, draft replies, kickoff checklists, approval states, and build plans.",
  path: "/admin/manager",
  noIndex: true
});

export default function AdminManagerPage() {
  return <AiManagerShell submissions={createDemoPreviewSubmissions()} />;
}
