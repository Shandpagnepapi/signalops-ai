"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LeadSubmission } from "@/lib/lead-scoring";
import { apexDashboardLeads, type ApexDashboardLead, type DashboardLeadStatus } from "@/lib/mock-data";
import { DashboardFilters } from "./dashboard-filters";
import { DashboardMetrics } from "./dashboard-metrics";
import {
  defaultDashboardFilters,
  filterLeads,
  getUniqueOptions,
  type DashboardFilters as DashboardFiltersState
} from "./dashboard-utils";
import { LeadDetailCard } from "./lead-detail-card";
import { LeadPipeline } from "./lead-pipeline";
import { LeadTable } from "./lead-table";

type LeadListResponse = {
  leads?: LeadSubmission[];
};

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isWheelRepairLead(lead: LeadSubmission) {
  const text = [
    lead.source,
    lead.businessName,
    lead.industry,
    lead.serviceNeeded,
    lead.damageType,
    lead.tags.join(" ")
  ]
    .join(" ")
    .toLowerCase();

  return text.includes("apex") || text.includes("wheel");
}

function mapLeadStatus(lead: LeadSubmission): DashboardLeadStatus {
  if (lead.status === "booked") {
    return "booked";
  }

  if (lead.status === "closed") {
    return "won";
  }

  if (lead.status === "archived") {
    return "lost";
  }

  if (lead.tags.some((tag) => tag.includes("photo") || tag === "needs-photos")) {
    return "needs-photos";
  }

  if (lead.score >= 75) {
    return "qualified";
  }

  return lead.status === "contacted" ? "contacted" : "new";
}

function mapApiLead(lead: LeadSubmission): ApexDashboardLead {
  const urgency = lead.aiQualification?.urgency ?? "unknown";
  const summary = lead.aiQualification?.summary ?? lead.aiSummary;

  return {
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    source: titleCase(lead.source || "API lead"),
    vehicle: lead.vehicleYearMakeModel || "Vehicle not provided",
    wheelSize: lead.wheelSize,
    damageType: lead.serviceNeeded || titleCase(lead.damageType || "Wheel repair"),
    numberOfWheels: lead.numberOfWheels || 1,
    vehicleDrivable: lead.vehicleDrivable || "unsure",
    needsMobileService: lead.needsMobileService === "yes",
    address: lead.address || "Not provided",
    score: lead.score,
    priority: lead.priority,
    urgency,
    status: mapLeadStatus(lead),
    createdAt: lead.createdAt,
    preferredTime: lead.preferredTime,
    message: lead.message || "No customer message provided.",
    summary,
    recommendedAction: lead.recommendedAction,
    customerReply: lead.customerReply,
    internalNote: lead.internalNote,
    tags: lead.tags,
    timeline: [
      {
        time: "API",
        event: "Lead received from /api/lead"
      },
      {
        time: "AI",
        event: `Qualified as ${lead.priority} priority with ${urgency} urgency`
      },
      {
        time: "Next",
        event: lead.recommendedAction
      }
    ]
  };
}

export function DashboardShell() {
  const [filters, setFilters] = useState<DashboardFiltersState>(defaultDashboardFilters);
  const [selectedLeadId, setSelectedLeadId] = useState(apexDashboardLeads[0]?.id ?? "");
  const [apiLeads, setApiLeads] = useState<ApexDashboardLead[]>([]);
  const [apiStatus, setApiStatus] = useState<"idle" | "connected" | "unavailable">("idle");

  useEffect(() => {
    let active = true;

    async function loadApiLeads() {
      try {
        const response = await fetch("/api/lead", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Lead API unavailable");
        }

        const payload = (await response.json()) as LeadListResponse;
        const mappedLeads = (payload.leads ?? [])
          .filter(isWheelRepairLead)
          .map(mapApiLead);

        if (active) {
          setApiLeads(mappedLeads);
          setApiStatus("connected");
        }
      } catch {
        if (active) {
          setApiStatus("unavailable");
        }
      }
    }

    void loadApiLeads();

    return () => {
      active = false;
    };
  }, []);

  const allLeads = useMemo(() => {
    const apiLeadIds = new Set(apiLeads.map((lead) => lead.id));
    return [...apiLeads, ...apexDashboardLeads.filter((lead) => !apiLeadIds.has(lead.id))];
  }, [apiLeads]);

  const filteredLeads = useMemo(() => filterLeads(allLeads, filters), [allLeads, filters]);
  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;
  const sourceOptions = useMemo(() => getUniqueOptions(allLeads, "source"), [allLeads]);
  const damageOptions = useMemo(() => getUniqueOptions(allLeads, "damageType"), [allLeads]);

  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(47,124,255,0.12),rgba(6,12,24,0))]">
        <div className="surface-grid mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <Badge className="mb-4 bg-blue-500/14 text-blue-100">Apex Wheel Repair portal demo</Badge>
              <h1 className="max-w-xs text-3xl font-semibold tracking-normal text-white sm:max-w-none sm:text-4xl">
                Lead pipeline dashboard for Apex Wheel Repair
              </h1>
              <p className="mt-3 max-w-xs text-base leading-7 text-slate-300 sm:max-w-3xl">
                A daily operating view for quote requests, wheel damage triage, photo follow-up,
                appointment booking, and shop-owner alerts.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={apiStatus === "connected" ? "success" : "outline"}>
                {apiStatus === "connected" ? "Lead API connected" : "Mock data ready"}
              </Badge>
              <Badge variant="outline">Dallas wheel repair</Badge>
              <Badge variant="outline">No live messages sent</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-xs space-y-6 px-4 py-8 sm:max-w-7xl sm:px-6 lg:px-8">
        <DashboardMetrics leads={allLeads} />

        <Card className="border-blue-300/20 bg-blue-500/10">
          <CardContent className="p-5">
            <p className="text-sm leading-6 text-blue-50">
              This dashboard is a demo view. In production, LeadOps connects this to your CRM,
              forms, ads, missed calls, quote requests, photo submissions, and appointment calendar.
            </p>
          </CardContent>
        </Card>

        <DashboardFilters
          filters={filters}
          sources={sourceOptions}
          damageTypes={damageOptions}
          onChange={setFilters}
        />

        <LeadPipeline
          leads={filteredLeads}
          selectedLeadId={selectedLead?.id}
          onSelectLead={setSelectedLeadId}
        />

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
          <LeadTable
            leads={filteredLeads}
            selectedLeadId={selectedLead?.id}
            onSelectLead={setSelectedLeadId}
          />
          <LeadDetailCard lead={selectedLead} />
        </div>
      </div>
    </div>
  );
}
