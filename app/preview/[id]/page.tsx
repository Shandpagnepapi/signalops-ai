import type { Metadata } from "next";
import { PreviewResult } from "@/components/site/preview-result";
import { getPreviewSubmissionById } from "@/lib/preview-store";
import { toPublicPreviewSubmission } from "@/lib/public-preview";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const submission = await getPreviewSubmissionById(id);
  const businessName = submission?.businessName ?? "Business";

  return createPageMetadata({
    title: `${businessName} AI Lead System Preview`,
    description:
      "A private SignalOps preview showing a sample AI receptionist, lead dashboard, follow-up timeline, value snapshot, and recommended package.",
    path: `/preview/${id}`,
    noIndex: true
  });
}

export default async function PreviewDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getPreviewSubmissionById(id);

  return <PreviewResult previewId={id} initialSubmission={submission ? toPublicPreviewSubmission(submission) : null} />;
}
