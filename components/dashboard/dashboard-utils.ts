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
    return "border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]";
  }

  return "border-[#9c6c93]/35 bg-[#9c6c93]/12 text-[#f2d9e8]";
}

export function statusBadgeClass(status: DashboardLeadStatus) {
  const classes: Record<DashboardLeadStatus, string> = {
    new: "border-[#ff9ec0]/25 bg-[#ff6f9c]/12 text-[#ffd7e6]",
    contacted: "border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]",
    "needs-photos": "border-amber-300/25 bg-amber-400/12 text-amber-100",
    qualified: "border-emerald-300/25 bg-emerald-400/12 text-emerald-100",
    booked: "border-violet-300/25 bg-violet-400/12 text-violet-100",
    won: "border-green-300/25 bg-green-400/12 text-green-100",
    lost: "border-[#9c6c93]/35 bg-[#9c6c93]/12 text-[#f2d9e8]"
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
