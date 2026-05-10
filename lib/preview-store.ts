import "server-only";

import { randomUUID } from "node:crypto";
import {
  generateManagerDrafts,
  generatePreviewData,
  getPreviewSharePath
} from "@/lib/preview-generator";
import { buildClientBuildPrompt, buildSignalOpsChatPrompt } from "@/lib/prompt-worker/prompt-builder";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";
import type {
  ClientBuildPromptResult,
  PromptWorkerResult,
  PromptWorkerStatus
} from "@/lib/prompt-worker/prompt-types";
import type {
  PreviewData,
  PreviewManagerNotes,
  PreviewPromptArchiveItem,
  PreviewSubmission,
  PreviewSubmissionInput,
  PreviewSubmissionStatus
} from "@/lib/preview-types";
import { previewSubmissionStatuses } from "@/lib/preview-types";
import type { Database, Json } from "@/lib/supabase/database.types";
import { getSupabaseDatabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

type PreviewStoreGlobal = typeof globalThis & {
  __signalOpsPreviewSubmissions?: PreviewSubmission[];
};

type PreviewRow = Database["public"]["Tables"]["preview_submissions"]["Row"];
type PreviewInsert = Database["public"]["Tables"]["preview_submissions"]["Insert"];

const storeGlobal = globalThis as PreviewStoreGlobal;

function getStore() {
  storeGlobal.__signalOpsPreviewSubmissions ??= [];
  return storeGlobal.__signalOpsPreviewSubmissions;
}

function asJson(value: unknown): Json {
  return value as Json;
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function safeStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function isNonEmptyRecord(value: unknown) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).length > 0;
}

function safeStatus(value: unknown): PreviewSubmissionStatus {
  if (typeof value !== "string") {
    return "New";
  }

  if ((previewSubmissionStatuses as readonly string[]).includes(value)) {
    return value as PreviewSubmissionStatus;
  }

  const legacyStatuses: Record<string, PreviewSubmissionStatus> = {
    "Preview Generated": "Draft Generated",
    "Approved to Send": "Approved",
    "Discovery Booked": "Approved",
    "Project Initiated": "Approved",
    Lost: "Needs Review"
  };

  return legacyStatuses[value] ?? "New";
}

function getStoredNotes(submission: PreviewSubmission) {
  return [
    submission.mainServices ? `Main services: ${submission.mainServices}` : "",
    submission.currentTools ? `Current tools/CRM: ${submission.currentTools}` : "",
    submission.leadProcess ? `After a lead comes in: ${submission.leadProcess}` : "",
    submission.notes ? `Anything else: ${submission.notes}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function withPromptManagerFields(
  managerNotes: PreviewManagerNotes,
  patch: Partial<PreviewManagerNotes>
): PreviewManagerNotes {
  return {
    ...managerNotes,
    ...patch
  };
}

function appendPromptArchive(
  managerNotes: PreviewManagerNotes,
  item: PreviewPromptArchiveItem
): PreviewPromptArchiveItem[] {
  return [item, ...(managerNotes.promptArchive ?? [])].slice(0, 20);
}

function toPreviewInsert(submission: PreviewSubmission): PreviewInsert {
  return {
    id: submission.id,
    business_name: submission.businessName,
    contact_name: submission.contactName,
    email: submission.email,
    phone: submission.phone || null,
    website: submission.website || null,
    industry: submission.industry,
    main_lead_sources: submission.mainLeadSources,
    current_problem: submission.currentProblem,
    average_job_value: submission.averageJobValue || null,
    monthly_lead_volume: submission.monthlyLeadVolume,
    notes: getStoredNotes(submission) || null,
    preview_data: asJson(submission.previewData),
    manager_notes: asJson(submission.managerNotes),
    status: submission.status,
    owner_approved: submission.ownerApproved,
    created_at: submission.createdAt
  };
}

function toPromptColumnValues(submission: PreviewSubmission): Partial<PreviewInsert> {
  const classification = submission.managerNotes.promptClassification ?? submission.promptWorkerResult?.classification;

  return {
    main_services: submission.mainServices || submission.managerNotes.submissionDetails?.mainServices || null,
    biggest_bottleneck: submission.currentProblem || null,
    current_tools: submission.currentTools || submission.managerNotes.submissionDetails?.currentTools || null,
    lead_process: submission.leadProcess || submission.managerNotes.submissionDetails?.leadProcess || null,
    anything_else: submission.notes || submission.managerNotes.submissionDetails?.anythingElse || null,
    selected_system_template: submission.selectedSystemTemplate ?? submission.managerNotes.selectedSystemTemplate ?? null,
    selected_package: submission.selectedPackage ?? submission.managerNotes.selectedPackage ?? null,
    classification_json: asJson(classification ?? {}),
    prompt_worker_result_json: asJson(submission.promptWorkerResult ?? submission.managerNotes.promptWorkerResult ?? {}),
    generated_chatgpt_prompt:
      submission.generatedChatGPTPrompt ??
      submission.managerNotes.generatedChatGPTPrompt ??
      submission.promptWorkerResult?.copyPastePrompt ??
      null,
    prompt_status: submission.promptStatus ?? submission.managerNotes.promptStatus ?? "not_generated",
    internal_notes: submission.internalNotes ?? submission.managerNotes.internalNotes ?? null,
    contact_allowed: classification?.contactAllowed ?? true,
    is_test_submission: classification?.isTestSubmission ?? false,
    test_reason: classification?.testReason ?? null,
    customer_email_sent_at: submission.customerEmailSentAt ?? submission.managerNotes.customerEmailSentAt ?? null,
    marked_paid_at: submission.markedPaidAt ?? submission.managerNotes.markedPaidAt ?? null,
    marked_lost_at: submission.markedLostAt ?? submission.managerNotes.markedLostAt ?? null
  };
}

function toLegacyPreviewInsert(submission: PreviewSubmission): PreviewInsert {
  const insert = toPreviewInsert(submission);

  return {
    id: insert.id,
    created_at: insert.created_at,
    business_name: insert.business_name,
    contact_name: insert.contact_name,
    email: insert.email,
    phone: insert.phone,
    website: insert.website,
    industry: insert.industry,
    main_lead_sources: insert.main_lead_sources,
    current_problem: insert.current_problem,
    average_job_value: insert.average_job_value,
    monthly_lead_volume: insert.monthly_lead_volume,
    notes: insert.notes,
    preview_data: insert.preview_data,
    manager_notes: insert.manager_notes,
    status: insert.status,
    owner_approved: insert.owner_approved
  };
}

function toPreviewSubmission(row: PreviewRow): PreviewSubmission {
  const managerNotes = (row.manager_notes ?? {}) as PreviewManagerNotes;
  const submissionDetails = managerNotes.submissionDetails;
  const promptClassification = managerNotes.promptClassification ?? (isNonEmptyRecord(row.classification_json) ? row.classification_json : undefined);

  return {
    id: row.id,
    createdAt: row.created_at,
    businessName: safeString(row.business_name),
    contactName: safeString(row.contact_name),
    email: safeString(row.email),
    phone: safeString(row.phone),
    website: safeString(row.website),
    industry: safeString(row.industry) as PreviewSubmissionInput["industry"],
    mainLeadSources: safeStringArray(row.main_lead_sources) as PreviewSubmissionInput["mainLeadSources"],
    currentProblem: safeString(row.current_problem) as PreviewSubmissionInput["currentProblem"],
    averageJobValue: safeNumber(row.average_job_value),
    monthlyLeadVolume: safeString(row.monthly_lead_volume) as PreviewSubmissionInput["monthlyLeadVolume"],
    mainServices: safeString(row.main_services) || submissionDetails?.mainServices || "",
    currentTools: safeString(row.current_tools) || submissionDetails?.currentTools || "",
    leadProcess: safeString(row.lead_process) || submissionDetails?.leadProcess || "",
    notes: safeString(row.anything_else) || submissionDetails?.anythingElse || safeString(row.notes),
    previewData: row.preview_data as PreviewData,
    managerNotes: {
      ...managerNotes,
      promptClassification: promptClassification as PreviewManagerNotes["promptClassification"],
      promptStatus: (row.prompt_status as PreviewManagerNotes["promptStatus"]) ?? managerNotes.promptStatus,
      internalNotes: safeString(row.internal_notes) || managerNotes.internalNotes,
      selectedPackage: (safeString(row.selected_package) as PreviewManagerNotes["selectedPackage"]) || managerNotes.selectedPackage,
      selectedSystemTemplate:
        (safeString(row.selected_system_template) as PreviewManagerNotes["selectedSystemTemplate"]) || managerNotes.selectedSystemTemplate,
      generatedChatGPTPrompt: safeString(row.generated_chatgpt_prompt) || managerNotes.generatedChatGPTPrompt,
      customerEmailSentAt: row.customer_email_sent_at ?? managerNotes.customerEmailSentAt,
      markedPaidAt: row.marked_paid_at ?? managerNotes.markedPaidAt,
      markedLostAt: row.marked_lost_at ?? managerNotes.markedLostAt
    },
    status: safeStatus(row.status),
    ownerApproved: Boolean(row.owner_approved),
    promptWorkerResult: managerNotes.promptWorkerResult,
    promptStatus: (row.prompt_status as PreviewSubmission["promptStatus"]) ?? managerNotes.promptStatus ?? "not_generated",
    internalNotes: safeString(row.internal_notes) || managerNotes.internalNotes || "",
    selectedPackage: (safeString(row.selected_package) as PreviewSubmission["selectedPackage"]) || managerNotes.selectedPackage,
    selectedSystemTemplate:
      (safeString(row.selected_system_template) as PreviewSubmission["selectedSystemTemplate"]) || managerNotes.selectedSystemTemplate,
    generatedChatGPTPrompt:
      safeString(row.generated_chatgpt_prompt) || managerNotes.generatedChatGPTPrompt || managerNotes.promptWorkerResult?.copyPastePrompt,
    customerEmailSentAt: row.customer_email_sent_at ?? managerNotes.customerEmailSentAt,
    markedPaidAt: row.marked_paid_at ?? managerNotes.markedPaidAt,
    markedLostAt: row.marked_lost_at ?? managerNotes.markedLostAt
  };
}

function rememberMockSubmission(submission: PreviewSubmission) {
  getStore().unshift(submission);
  return submission;
}

function getSupabaseErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string" && message.trim() ? message : "Unknown Supabase error.";
  }

  return "Unknown Supabase error.";
}

function warnAndUseMock(error: unknown) {
  const message = getSupabaseErrorMessage(error);
  console.warn(`SignalOps preview storage unavailable. Using mock fallback. ${message}`);
}

function warnAndUseMockAdmin(error: unknown) {
  const message = getSupabaseErrorMessage(error);
  console.warn(`SignalOps admin persistence unavailable. Using mock fallback. ${message}`);
}

function updateMockSubmission(id: string, updater: (submission: PreviewSubmission) => PreviewSubmission) {
  const store = getStore();
  const index = store.findIndex((submission) => submission.id === id);

  if (index === -1) {
    return null;
  }

  const updated = updater(store[index]);
  store[index] = updated;
  return updated;
}

async function updateSupabasePreview(id: string, patch: Partial<PreviewInsert>) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const { data, error } = await database.client
    .from("preview_submissions")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return toPreviewSubmission(data);
}

async function updateSupabasePreviewWithSchemaFallback(
  id: string,
  richPatch: Partial<PreviewInsert>,
  legacyPatch: Partial<PreviewInsert>
) {
  try {
    return await updateSupabasePreview(id, richPatch);
  } catch (error) {
    console.warn(
      `SignalOps preview prompt columns unavailable or update failed. Retrying legacy manager_notes persistence. ${getSupabaseErrorMessage(error)}`
    );
    return updateSupabasePreview(id, legacyPatch);
  }
}

async function updatePreviewManagerNotes(
  id: string,
  updater: (submission: PreviewSubmission) => Partial<PreviewManagerNotes>,
  rowPatch: Partial<PreviewInsert> = {}
) {
  const current = await getPreviewSubmissionById(id);

  if (!current) {
    return null;
  }

  const nextManagerNotes = withPromptManagerFields(current.managerNotes, updater(current));
  const nextSubmission: PreviewSubmission = {
    ...current,
    managerNotes: nextManagerNotes,
    promptWorkerResult: nextManagerNotes.promptWorkerResult,
    promptStatus: nextManagerNotes.promptStatus ?? current.promptStatus,
    internalNotes: nextManagerNotes.internalNotes ?? current.internalNotes,
    selectedPackage: nextManagerNotes.selectedPackage ?? current.selectedPackage,
    selectedSystemTemplate: nextManagerNotes.selectedSystemTemplate ?? current.selectedSystemTemplate,
    generatedChatGPTPrompt: nextManagerNotes.generatedChatGPTPrompt ?? current.generatedChatGPTPrompt,
    customerEmailSentAt: nextManagerNotes.customerEmailSentAt ?? current.customerEmailSentAt,
    markedPaidAt: nextManagerNotes.markedPaidAt ?? current.markedPaidAt,
    markedLostAt: nextManagerNotes.markedLostAt ?? current.markedLostAt,
    status: rowPatch.status ? safeStatus(rowPatch.status) : current.status,
    ownerApproved:
      typeof rowPatch.owner_approved === "boolean" ? rowPatch.owner_approved : current.ownerApproved
  };

  if (!isSupabaseConfigured()) {
    return updateMockSubmission(id, () => nextSubmission) ?? nextSubmission;
  }

  try {
    const legacyPatch = {
      ...rowPatch,
      manager_notes: asJson(nextManagerNotes)
    };
    const richPatch = {
      ...legacyPatch,
      ...toPromptColumnValues(nextSubmission)
    };

    return await updateSupabasePreviewWithSchemaFallback(id, richPatch, legacyPatch);
  } catch (error) {
    warnAndUseMockAdmin(error);
    return updateMockSubmission(id, () => nextSubmission) ?? nextSubmission;
  }
}

async function createSupabasePreview(submission: PreviewSubmission) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const legacyInsert = toLegacyPreviewInsert(submission);
  const insert = {
    ...toPreviewInsert(submission),
    ...toPromptColumnValues(submission)
  };

  if (database.mode === "publishable") {
    let { error } = await database.client.from("preview_submissions").insert(insert);

    if (error) {
      console.warn(
        `SignalOps preview prompt columns unavailable or insert failed. Retrying legacy insert. ${getSupabaseErrorMessage(error)}`
      );
      const retry = await database.client.from("preview_submissions").insert(legacyInsert);
      error = retry.error;
    }

    if (error) {
      throw error;
    }

    return submission;
  }

  let { data, error } = await database.client
    .from("preview_submissions")
    .insert(insert)
    .select("*")
    .single();

  if (error) {
    console.warn(
      `SignalOps preview prompt columns unavailable or insert failed. Retrying legacy insert. ${getSupabaseErrorMessage(error)}`
    );
    const retry = await database.client
      .from("preview_submissions")
      .insert(legacyInsert)
      .select("*")
      .single();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    throw error;
  }

  return data ? toPreviewSubmission(data) : submission;
}

async function getSupabasePreviewById(id: string) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const { data, error } = await database.client
    .from("preview_submissions")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] ? toPreviewSubmission(data[0]) : null;
}

async function listSupabasePreviews() {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const { data, error } = await database.client
    .from("preview_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw error;
  }

  return (data ?? []).map(toPreviewSubmission);
}

export async function createPreviewSubmission(input: PreviewSubmissionInput) {
  const id = randomUUID();
  const previewData = generatePreviewData(input);
  const promptClassification = classifyPreviewIntake(input);
  const managerNotes: PreviewManagerNotes = {
    ...generateManagerDrafts(input, previewData, getPreviewSharePath(id)),
    promptClassification,
    promptStatus: "not_generated",
    internalNotes: "",
    selectedPackage: promptClassification.recommendedPackage,
    selectedSystemTemplate: promptClassification.recommendedSystemTemplate
  };

  const submission: PreviewSubmission = {
    ...input,
    id,
    createdAt: new Date().toISOString(),
    previewData,
    managerNotes,
    status: "Needs Review",
    ownerApproved: false,
    promptStatus: "not_generated",
    internalNotes: "",
    selectedPackage: promptClassification.recommendedPackage,
    selectedSystemTemplate: promptClassification.recommendedSystemTemplate
  };

  if (!isSupabaseConfigured()) {
    return rememberMockSubmission(submission);
  }

  try {
    return await createSupabasePreview(submission);
  } catch (error) {
    warnAndUseMock(error);
    return rememberMockSubmission(submission);
  }
}

export async function getPreviewSubmissionById(id: string) {
  if (!isSupabaseConfigured()) {
    return getStore().find((submission) => submission.id === id) ?? null;
  }

  try {
    return await getSupabasePreviewById(id);
  } catch (error) {
    warnAndUseMock(error);
    return getStore().find((submission) => submission.id === id) ?? null;
  }
}

export async function listPreviewSubmissions() {
  if (!isSupabaseConfigured()) {
    return getStore();
  }

  try {
    return await listSupabasePreviews();
  } catch (error) {
    warnAndUseMock(error);
    return getStore();
  }
}

export async function listPreviewSubmissionsWithMeta() {
  if (!isSupabaseConfigured()) {
    return {
      submissions: getStore(),
      persistenceEnabled: false,
      warning:
        "Supabase is not configured. Admin workflow persistence is disabled. Data will not sync across devices."
    };
  }

  try {
    return {
      submissions: await listSupabasePreviews(),
      persistenceEnabled: true,
      warning: null
    };
  } catch (error) {
    const message = getSupabaseErrorMessage(error);
    warnAndUseMockAdmin(error);

    return {
      submissions: getStore(),
      persistenceEnabled: false,
      warning:
        `Supabase admin persistence is unavailable. Data will not sync across devices. ${message}`
    };
  }
}

export async function updatePreviewSubmissionStatus(
  id: string,
  status: PreviewSubmissionStatus,
  ownerApproved = false
) {
  return updatePreviewManagerNotes(
    id,
    () => ({}),
    {
      status,
      owner_approved: ownerApproved
    }
  );
}

export async function updatePromptWorkerResult(id: string) {
  const current = await getPreviewSubmissionById(id);

  if (!current) {
    return null;
  }

  const result: PromptWorkerResult = buildSignalOpsChatPrompt(current);
  const archiveItem: PreviewPromptArchiveItem = {
    type: "preview",
    title: result.title,
    createdAt: result.createdAt,
    prompt: result.copyPastePrompt
  };

  return updatePreviewManagerNotes(id, (submission) => ({
    promptWorkerResult: result,
    promptClassification: result.classification,
    promptStatus: "generated",
    selectedPackage: result.recommendedPackage,
    selectedSystemTemplate: result.recommendedSystemTemplate,
    generatedChatGPTPrompt: result.copyPastePrompt,
    promptArchive: appendPromptArchive(submission.managerNotes, archiveItem)
  }));
}

export async function updatePromptStatus(id: string, promptStatus: PromptWorkerStatus) {
  const timestamp = new Date().toISOString();

  return updatePreviewManagerNotes(id, () => ({
    promptStatus,
    ...(promptStatus === "sent_to_customer" ? { customerEmailSentAt: timestamp } : {}),
    ...(promptStatus === "paid" ? { markedPaidAt: timestamp } : {}),
    ...(promptStatus === "lost" ? { markedLostAt: timestamp } : {})
  }));
}

export async function updateInternalNotes(id: string, internalNotes: string) {
  return updatePreviewManagerNotes(id, () => ({
    internalNotes
  }));
}

export async function generateClientBuildPrompt(id: string) {
  const current = await getPreviewSubmissionById(id);

  if (!current) {
    return null;
  }

  const result: ClientBuildPromptResult = buildClientBuildPrompt(current);
  const archiveItem: PreviewPromptArchiveItem = {
    type: "build",
    title: result.title,
    createdAt: result.createdAt,
    prompt: result.copyPastePrompt
  };
  const timestamp = new Date().toISOString();

  return updatePreviewManagerNotes(id, (submission) => ({
    promptStatus: "paid",
    buildPromptResult: result,
    selectedPackage: result.recommendedPackage,
    selectedSystemTemplate: result.recommendedSystemTemplate,
    markedPaidAt: timestamp,
    promptArchive: appendPromptArchive(submission.managerNotes, archiveItem)
  }));
}

export async function markSentToCustomer(id: string) {
  return updatePromptStatus(id, "sent_to_customer");
}

export async function markPaid(id: string) {
  return generateClientBuildPrompt(id);
}

export async function markLost(id: string) {
  return updatePromptStatus(id, "lost");
}
