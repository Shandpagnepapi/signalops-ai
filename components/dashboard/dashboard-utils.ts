import type { LeadPriority, LeadUrgency } from "@/lib/lead-scoring";
import type { ApexDashboardLead, DashboardLeadStatus } from "@/lib/mock-data";

export type DashboardFilters = {
  priority: LeadPriority | "all";
  status: DashboardLeadStatus | "all";
  source: string;
  urgency: LeadUrgency | "all";
  damageType: string;
  mobileService: "all" | "yes" | "no";
};

export const defaultDashboardFilters: DashboardFilters = {
  priority: "all",
  status: "all",
  source: "all",
  urgency: "all",
  damageType: "all",
  mobileService: "all"
};

export const pipelineStatuses: DashboardLeadStatus[] = [
  "new",
  "contacted",
  "needs-photos",
  "qualified",
  "booked",
  "won",
  "lost"
];

export const statusLabels: Record<DashboardLeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  "needs-photos": "Needs Photos",
  qualified: "Qualified",
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
    return "border-sky-300/25 bg-sky-400/12 text-sky-100";
  }

  return "border-slate-500/35 bg-slate-500/12 text-slate-200";
}

export function statusBadgeClass(status: DashboardLeadStatus) {
  const classes: Record<DashboardLeadStatus, string> = {
    new: "border-blue-300/25 bg-blue-400/12 text-blue-100",
    contacted: "border-cyan-300/25 bg-cyan-400/12 text-cyan-100",
    "needs-photos": "border-amber-300/25 bg-amber-400/12 text-amber-100",
    qualified: "border-emerald-300/25 bg-emerald-400/12 text-emerald-100",
    booked: "border-violet-300/25 bg-violet-400/12 text-violet-100",
    won: "border-green-300/25 bg-green-400/12 text-green-100",
    lost: "border-slate-500/35 bg-slate-500/12 text-slate-200"
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

export function getUniqueOptions(leads: ApexDashboardLead[], key: "source" | "damageType") {
  return Array.from(new Set(leads.map((lead) => lead[key]).filter(Boolean))).sort();
}

export function filterLeads(leads: ApexDashboardLead[], filters: DashboardFilters) {
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

    if (filters.damageType !== "all" && lead.damageType !== filters.damageType) {
      return false;
    }

    if (filters.mobileService === "yes" && !lead.needsMobileService) {
      return false;
    }

    if (filters.mobileService === "no" && lead.needsMobileService) {
      return false;
    }

    return true;
  });
}
