"use client";

import { useMemo, useState } from "react";
import { EnvoFeatureStack, EnvoLogo } from "@/components/site/envo/envo-brand-system";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { routeWashDashboardLeads } from "@/lib/mock-data";
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

export function DashboardShell() {
  const [filters, setFilters] = useState<DashboardFiltersState>(defaultDashboardFilters);
  const [selectedLeadId, setSelectedLeadId] = useState(routeWashDashboardLeads[0]?.id ?? "");

  const allLeads = routeWashDashboardLeads;

  const filteredLeads = useMemo(() => filterLeads(allLeads, filters), [allLeads, filters]);
  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;
  const sourceOptions = useMemo(() => getUniqueOptions(allLeads, "source"), [allLeads]);
  const requestOptions = useMemo(() => getUniqueOptions(allLeads, "requestType"), [allLeads]);

  return (
    <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.58fr)] lg:items-end">
            <div className="min-w-0">
              <EnvoLogo size="sm" />
              <Badge className="mb-4 mt-4 border border-[#CBD8F2] bg-white/74 text-[#2563EB]">RouteWash Mobile Fleet Care portal demo</Badge>
              <h1 className="max-w-xs text-3xl font-black tracking-normal text-[#071126] sm:max-w-none sm:text-4xl">
                Lead pipeline dashboard for RouteWash Mobile Fleet Care
              </h1>
              <p className="mt-3 max-w-xs text-base leading-7 text-[#647084] sm:max-w-3xl">
                A daily operating view for fleet quote requests, recurring account follow-up,
                route-friendly scheduling, and owner handoffs.
              </p>
            </div>
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge variant="success">Demo data only</Badge>
                <Badge variant="outline">DFW fleet wash</Badge>
                <Badge variant="outline">No live messages sent</Badge>
              </div>
              <EnvoFeatureStack panel />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-xs space-y-6 px-4 py-8 sm:max-w-7xl sm:px-6 lg:px-8">
        <DashboardMetrics leads={allLeads} />

        <Card className="border-white/10 bg-[#071126]">
          <CardContent className="p-5">
            <p className="text-sm leading-6 text-[#F8FAFF]">
              This public dashboard uses mock RouteWash Mobile Fleet Care data only. Production lead records
              stay behind internal access, while real client installs connect securely to CRM,
              forms, ads, missed calls, quote requests, account handoffs, and calendars.
            </p>
          </CardContent>
        </Card>

        <DashboardFilters
          filters={filters}
          sources={sourceOptions}
          requestTypes={requestOptions}
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
