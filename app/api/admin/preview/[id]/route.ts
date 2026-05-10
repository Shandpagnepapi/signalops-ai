import { NextResponse } from "next/server";
import type { PromptWorkerStatus } from "@/lib/prompt-worker/prompt-types";
import {
  generateClientBuildPrompt,
  updateInternalNotes,
  updatePreviewSubmissionStatus,
  updatePromptStatus,
  updatePromptWorkerResult
} from "@/lib/preview-store";
import { previewSubmissionStatuses, type PreviewSubmissionStatus } from "@/lib/preview-types";

type AdminPreviewAction =
  | "generate_prompt"
  | "generate_build_prompt"
  | "set_prompt_status"
  | "set_review_status"
  | "update_internal_notes";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

const promptStatuses: readonly PromptWorkerStatus[] = [
  "not_generated",
  "generated",
  "pasted_to_chatgpt",
  "preview_drafted",
  "sent_to_customer",
  "paid",
  "lost"
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getAction(payload: Record<string, unknown>): AdminPreviewAction | null {
  const action = payload.action;

  if (
    action === "generate_prompt" ||
    action === "generate_build_prompt" ||
    action === "set_prompt_status" ||
    action === "set_review_status" ||
    action === "update_internal_notes"
  ) {
    return action;
  }

  return null;
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const payload = await request.json().catch(() => null);

  if (!id) {
    return NextResponse.json({ error: "Preview id is required." }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const action = getAction(payload);

  if (!action) {
    return NextResponse.json({ error: "Unknown admin preview action." }, { status: 400 });
  }

  let submission = null;

  if (action === "generate_prompt") {
    submission = await updatePromptWorkerResult(id);
  }

  if (action === "generate_build_prompt") {
    submission = await generateClientBuildPrompt(id);
  }

  if (action === "set_prompt_status") {
    const promptStatus = payload.promptStatus;

    if (typeof promptStatus !== "string" || !promptStatuses.includes(promptStatus as PromptWorkerStatus)) {
      return NextResponse.json({ error: "Invalid prompt status." }, { status: 400 });
    }

    submission = await updatePromptStatus(id, promptStatus as PromptWorkerStatus);
  }

  if (action === "set_review_status") {
    const status = payload.status;
    const ownerApproved = payload.ownerApproved === true;

    if (typeof status !== "string" || !(previewSubmissionStatuses as readonly string[]).includes(status)) {
      return NextResponse.json({ error: "Invalid review status." }, { status: 400 });
    }

    submission = await updatePreviewSubmissionStatus(id, status as PreviewSubmissionStatus, ownerApproved);
  }

  if (action === "update_internal_notes") {
    const internalNotes = payload.internalNotes;

    if (typeof internalNotes !== "string") {
      return NextResponse.json({ error: "Internal notes must be a string." }, { status: 400 });
    }

    submission = await updateInternalNotes(id, internalNotes);
  }

  if (!submission) {
    return NextResponse.json({ error: "Preview submission not found." }, { status: 404 });
  }

  return NextResponse.json({ submission });
}
