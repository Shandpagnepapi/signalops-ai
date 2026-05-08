import "server-only";

import { randomUUID } from "node:crypto";
import {
  generateManagerDrafts,
  generatePreviewData,
  getPreviewSharePath
} from "@/lib/preview-generator";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";
import type {
  PreviewData,
  PreviewManagerNotes,
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

function toPreviewSubmission(row: PreviewRow): PreviewSubmission {
  const managerNotes = (row.manager_notes ?? {}) as PreviewManagerNotes;
  const submissionDetails = managerNotes.submissionDetails;

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
    mainServices: submissionDetails?.mainServices ?? "",
    currentTools: submissionDetails?.currentTools ?? "",
    leadProcess: submissionDetails?.leadProcess ?? "",
    notes: submissionDetails?.anythingElse ?? safeString(row.notes),
    previewData: row.preview_data as PreviewData,
    managerNotes,
    status: safeStatus(row.status),
    ownerApproved: Boolean(row.owner_approved),
    promptWorkerResult: managerNotes.promptWorkerResult,
    promptStatus: managerNotes.promptStatus ?? "not_generated",
    internalNotes: managerNotes.internalNotes ?? "",
    selectedPackage: managerNotes.selectedPackage,
    selectedSystemTemplate: managerNotes.selectedSystemTemplate
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

async function createSupabasePreview(submission: PreviewSubmission) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const insert = toPreviewInsert(submission);

  if (database.mode === "publishable") {
    const { error } = await database.client.from("preview_submissions").insert(insert);

    if (error) {
      throw error;
    }

    return submission;
  }

  const { data, error } = await database.client
    .from("preview_submissions")
    .insert(insert)
    .select("*")
    .single();

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

  const submission: PreviewSubmission = {
    ...input,
    id,
    createdAt: new Date().toISOString(),
    previewData,
    managerNotes: generateManagerDrafts(input, previewData, getPreviewSharePath(id)),
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
