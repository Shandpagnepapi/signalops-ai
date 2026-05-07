"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { apexDashboardLeads } from "@/lib/mock-data";
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
  const [selectedLeadId, setSelectedLeadId] = useState(apexDashboardLeads[0]?.id ?? "");

  const allLeads = apexDashboardLeads;

  const filteredLeads = useMemo(() => filterLeads(allLeads, filters), [allLeads, filters]);
  const selectedLead = filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;
  const sourceOptions = useMemo(() => getUniqueOptions(allLeads, "source"), [allLeads]);
  const damageOptions = useMemo(() => getUniqueOptions(allLeads, "damageType"), [allLeads]);

  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,111,156,0.12),rgba(6,12,24,0))]">
        <div className="surface-grid mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <Badge className="mb-4 bg-[#ff6f9c]/14 text-[#ffd7e6]">Apex Wheel Repair portal demo</Badge>
              <h1 className="max-w-xs text-3xl font-semibold tracking-normal text-white sm:max-w-none sm:text-4xl">
                Lead pipeline dashboard for Apex Wheel Repair
              </h1>
              <p className="mt-3 max-w-xs text-base leading-7 text-slate-300 sm:max-w-3xl">
                A daily operating view for quote requests, wheel damage triage, photo follow-up,
                appointment booking, and shop-owner alerts.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Demo data only</Badge>
              <Badge variant="outline">Dallas wheel repair</Badge>
              <Badge variant="outline">No live messages sent</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-xs space-y-6 px-4 py-8 sm:max-w-7xl sm:px-6 lg:px-8">
        <DashboardMetrics leads={allLeads} />

        <Card className="border-[#ff9ec0]/20 bg-[#ff6f9c]/10">
          <CardContent className="p-5">
            <p className="text-sm leading-6 text-[#fff1f7]">
              This public dashboard uses mock Apex Wheel Repair data only. Production lead records
              stay behind internal access, while real client installs connect securely to CRM,
              forms, ads, missed calls, quote requests, photo submissions, and calendars.
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
