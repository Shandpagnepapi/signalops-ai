import "server-only";

import { randomUUID } from "node:crypto";
import { qualifyLeadWithAI } from "@/lib/ai-qualifier";
import type {
  LeadPriority,
  LeadStatus,
  LeadSubmission,
  LeadSubmissionDraft,
  LeadUrgency,
  QualifiedLeadResult
} from "@/lib/lead-scoring";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabaseDatabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

type LeadStoreGlobal = typeof globalThis & {
  __leadOpsMockLeads?: LeadSubmission[];
};

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

type ChoiceValue = LeadSubmissionDraft["vehicleDrivable"];

const storeGlobal = globalThis as LeadStoreGlobal;
const leadStatuses = ["new", "reviewing", "contacted", "booked", "closed", "archived"] as const;
const leadPriorities = ["hot", "warm", "cold", "junk"] as const;
const leadUrgencies = ["emergency", "soon", "researching", "unknown"] as const;
const choiceValues = ["yes", "no", "unsure", ""] as const;

function getStore() {
  storeGlobal.__leadOpsMockLeads ??= [];
  return storeGlobal.__leadOpsMockLeads;
}

function createLeadId() {
  return randomUUID();
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 0;
}

function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && leadStatuses.includes(value as LeadStatus);
}

function isLeadPriority(value: unknown): value is LeadPriority {
  return typeof value === "string" && leadPriorities.includes(value as LeadPriority);
}

function isLeadUrgency(value: unknown): value is LeadUrgency {
  return typeof value === "string" && leadUrgencies.includes(value as LeadUrgency);
}

function toChoiceValue(value: unknown): ChoiceValue {
  return typeof value === "string" && choiceValues.includes(value as ChoiceValue)
    ? (value as ChoiceValue)
    : "";
}

function toTags(value: unknown) {
  return Array.isArray(value) ? value.filter((tag): tag is string => typeof tag === "string") : [];
}

function createLeadFromQualification(input: LeadSubmissionDraft, qualification: QualifiedLeadResult): LeadSubmission {
  return {
    ...input,
    id: createLeadId(),
    createdAt: new Date().toISOString(),
    status: input.status ?? "new",
    tags: qualification.tags,
    score: qualification.score,
    priority: qualification.priority,
    aiSummary: qualification.summary,
    recommendedAction: qualification.recommendedAction,
    customerReply: qualification.customerReply,
    internalNote: qualification.internalNote,
    aiQualification: qualification
  };
}

function toLeadInsert(lead: LeadSubmission): LeadInsert {
  return {
    id: lead.id,
    source: lead.source,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    business_name: lead.businessName,
    website: lead.website,
    industry: lead.industry,
    service_needed: lead.serviceNeeded,
    urgency: lead.urgency,
    address: lead.address,
    message: lead.message,
    vehicle_year_make_model: lead.vehicleYearMakeModel,
    wheel_size: lead.wheelSize,
    damage_type: lead.damageType,
    number_of_wheels: lead.numberOfWheels,
    vehicle_drivable: lead.vehicleDrivable,
    needs_mobile_service: lead.needsMobileService,
    photo_notes: lead.photoNotes,
    preferred_time: lead.preferredTime,
    score: lead.score,
    priority: lead.priority,
    status: lead.status,
    ai_summary: lead.aiSummary,
    ai_urgency: lead.aiQualification.urgency,
    ai_confidence: lead.aiQualification.confidence,
    needs_human_review: lead.aiQualification.needsHumanReview,
    recommended_action: lead.recommendedAction,
    customer_reply: lead.customerReply,
    internal_note: lead.internalNote,
    tags: lead.tags,
    created_at: lead.createdAt,
    updated_at: lead.createdAt
  };
}

function toLeadSubmission(row: LeadRow): LeadSubmission {
  const score = safeNumber(row.score);
  const priority = isLeadPriority(row.priority) ? row.priority : "cold";
  const tags = toTags(row.tags);
  const aiSummary = safeString(row.ai_summary);
  const recommendedAction = safeString(row.recommended_action);
  const customerReply = safeString(row.customer_reply);
  const internalNote = safeString(row.internal_note);
  const aiUrgency = isLeadUrgency(row.ai_urgency) ? row.ai_urgency : "unknown";
  const aiQualification: QualifiedLeadResult = {
    score,
    priority,
    urgency: aiUrgency,
    summary: aiSummary,
    recommendedAction,
    customerReply,
    internalNote,
    tags,
    confidence: typeof row.ai_confidence === "number" ? row.ai_confidence : 0.5,
    needsHumanReview: Boolean(row.needs_human_review)
  };

  return {
    id: row.id,
    source: safeString(row.source),
    name: safeString(row.name),
    email: safeString(row.email),
    phone: safeString(row.phone),
    businessName: safeString(row.business_name),
    website: safeString(row.website),
    industry: safeString(row.industry),
    message: safeString(row.message),
    serviceNeeded: safeString(row.service_needed),
    urgency: safeString(row.urgency),
    address: safeString(row.address),
    vehicleYearMakeModel: safeString(row.vehicle_year_make_model),
    wheelSize: safeString(row.wheel_size),
    damageType: safeString(row.damage_type),
    numberOfWheels: safeNumber(row.number_of_wheels),
    vehicleDrivable: toChoiceValue(row.vehicle_drivable),
    needsMobileService: toChoiceValue(row.needs_mobile_service),
    photoNotes: safeString(row.photo_notes),
    preferredTime: safeString(row.preferred_time),
    createdAt: row.created_at ?? new Date().toISOString(),
    status: isLeadStatus(row.status) ? row.status : "new",
    tags,
    score,
    priority,
    aiSummary,
    recommendedAction,
    customerReply,
    internalNote,
    aiQualification
  };
}

async function createSupabaseLead(lead: LeadSubmission) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const insert = toLeadInsert(lead);

  if (database.mode === "publishable") {
    const { error } = await database.client.from("leads").insert(insert);

    if (error) {
      throw error;
    }

    return lead;
  }

  const { data, error } = await database.client.from("leads").insert(insert).select("*").single();

  if (error) {
    throw error;
  }

  return data ? toLeadSubmission(data) : lead;
}

async function listSupabaseLeads() {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const { data, error } = await database.client
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(toLeadSubmission);
}

async function getSupabaseLeadById(id: string) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const { data, error } = await database.client.from("leads").select("*").eq("id", id).limit(1);

  if (error) {
    throw error;
  }

  return data?.[0] ? toLeadSubmission(data[0]) : null;
}

async function updateSupabaseLeadStatus(id: string, status: LeadStatus) {
  const database = getSupabaseDatabaseClient();

  if (!database) {
    throw new Error("Supabase database client is not configured.");
  }

  const update = {
    status,
    updated_at: new Date().toISOString()
  };

  if (database.mode === "publishable") {
    const { error } = await database.client.from("leads").update(update).eq("id", id);

    if (error) {
      throw error;
    }

    return null;
  }

  const { data, error } = await database.client
    .from("leads")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data ? toLeadSubmission(data) : null;
}

function rememberMockLead(lead: LeadSubmission) {
  getStore().unshift(lead);
  return lead;
}

function warnAndUseMock(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown Supabase error.";
  console.warn(`LeadOps Supabase storage unavailable. Using mock store fallback. ${message}`);
}

export async function createLead(input: LeadSubmissionDraft) {
  const qualification = await qualifyLeadWithAI(input);
  const lead = createLeadFromQualification(input, qualification);

  if (!isSupabaseConfigured()) {
    return rememberMockLead(lead);
  }

  try {
    return await createSupabaseLead(lead);
  } catch (error) {
    warnAndUseMock(error);
    return rememberMockLead(lead);
  }
}

export async function listLeads() {
  if (!isSupabaseConfigured()) {
    return [...getStore()];
  }

  try {
    return await listSupabaseLeads();
  } catch (error) {
    warnAndUseMock(error);
    return [...getStore()];
  }
}

export async function getLeadById(id: string) {
  if (!isSupabaseConfigured()) {
    return getStore().find((lead) => lead.id === id) ?? null;
  }

  try {
    return await getSupabaseLeadById(id);
  } catch (error) {
    warnAndUseMock(error);
    return getStore().find((lead) => lead.id === id) ?? null;
  }
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  if (!isSupabaseConfigured()) {
    const lead = getStore().find((item) => item.id === id);

    if (!lead) {
      return null;
    }

    lead.status = status;
    return lead;
  }

  try {
    return await updateSupabaseLeadStatus(id, status);
  } catch (error) {
    warnAndUseMock(error);
    const lead = getStore().find((item) => item.id === id);

    if (!lead) {
      return null;
    }

    lead.status = status;
    return lead;
  }
}
