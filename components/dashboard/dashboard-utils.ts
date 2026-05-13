import type { LeadPriority, LeadUrgency } from "@/lib/lead-scoring";
import type { DashboardLeadStatus, RouteWashDashboardLead } from "@/lib/mock-data";

export type DashboardFilters = {
  priority: LeadPriority | "all";
  status: DashboardLeadStatus | "all";
  source: string;
  urgency: LeadUrgency | "all";
  requestType: string;
  afterHours: "all" | "yes" | "no";
};

export const defaultDashboardFilters: DashboardFilters = {
  priority: "all",
  status: "all",
  source: "all",
  urgency: "all",
  requestType: "all",
  afterHours: "all"
};

export const pipelineStatuses: DashboardLeadStatus[] = [
  "new",
  "contacted",
  "needs-details",
  "ready",
  "booked",
  "won",
  "lost"
];

export const statusLabels: Record<DashboardLeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "needs-details": "Needs Details",
  ready: "Ready",
  booked: "Booked",
  won: "Won",
  lost: "Lost"
};

export const priorityLabels: Record<LeadPriority, string> = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
  junk: "Junk"
};

export const urgencyLabels: Record<LeadUrgency, string> = {
  emergency: "Emergency",
  soon: "Soon",
  researching: "Researching",
  unknown: "Unknown"
};

export function priorityBadgeClass(priority: LeadPriority) {
  if (priority === "hot") {
    return "border-red-300/25 bg-red-400/12 text-red-100";
  }

  if (priority === "warm") {
    return "border-amber-300/25 bg-amber-400/12 text-amber-100";
  }

  if (priority === "cold") {
    return "border-[#6F4DFF]/25 bg-[#6F4DFF]/12 text-[#EAF1FF]";
  }

  return "border-[#9c6c93]/35 bg-[#9c6c93]/12 text-[#EAF1FF]";
}

export function statusBadgeClass(status: DashboardLeadStatus) {
  const classes: Record<DashboardLeadStatus, string> = {
    new: "border-[#8EBBFF]/25 bg-[#328BFF]/12 text-[#D7E8FF]",
    contacted: "border-[#6F4DFF]/25 bg-[#6F4DFF]/12 text-[#EAF1FF]",
    "needs-details": "border-amber-300/25 bg-amber-400/12 text-amber-100",
    ready: "border-emerald-300/25 bg-emerald-400/12 text-emerald-100",
    booked: "border-violet-300/25 bg-violet-400/12 text-violet-100",
    won: "border-green-300/25 bg-green-400/12 text-green-100",
    lost: "border-[#9c6c93]/35 bg-[#9c6c93]/12 text-[#EAF1FF]"
  };

  return classes[status];
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function getUniqueOptions(leads: RouteWashDashboardLead[], key: "source" | "requestType") {
  return Array.from(new Set(leads.map((lead) => lead[key]).filter(Boolean))).sort();
}

export function filterLeads(leads: RouteWashDashboardLead[], filters: DashboardFilters) {
  return leads.filter((lead) => {
    if (filters.priority !== "all" && lead.priority !== filters.priority) {
      return false;
    }

    if (filters.status !== "all" && lead.status !== filters.status) {
      return false;
    }

    if (filters.source !== "all" && lead.source !== filters.source) {
      return false;
    }

    if (filters.urgency !== "all" && lead.urgency !== filters.urgency) {
      return false;
    }

    if (filters.requestType !== "all" && lead.requestType !== filters.requestType) {
      return false;
    }

    if (filters.afterHours === "yes" && !lead.afterHoursRequested) {
      return false;
    }

    if (filters.afterHours === "no" && lead.afterHoursRequested) {
      return false;
    }

    return true;
  });
}
