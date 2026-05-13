import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { RouteWashDashboardLead } from "@/lib/mock-data";
import {
  pipelineStatuses,
  priorityBadgeClass,
  priorityLabels,
  statusLabels
} from "./dashboard-utils";

type LeadPipelineProps = {
  leads: RouteWashDashboardLead[];
  selectedLeadId?: string;
  onSelectLead: (leadId: string) => void;
};

export function LeadPipeline({ leads, selectedLeadId, onSelectLead }: LeadPipelineProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Lead pipeline</CardTitle>
            <CardDescription>From new fleet quote requests to booked and won accounts.</CardDescription>
          </div>
          <Badge variant="outline">{leads.length} visible leads</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pipelineStatuses.map((status) => {
            const columnLeads = leads.filter((lead) => lead.status === status);

            return (
              <div key={status} className="w-[220px] shrink-0 rounded-2xl border border-white/10 bg-[#0B1024]/62 p-3">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{statusLabels[status]}</p>
                  <span className="rounded-xl bg-white/6 px-2 py-1 text-xs text-[#D7E2F7]/62">{columnLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {columnLeads.length > 0 ? (
                    columnLeads.map((lead) => (
                      <button
                        key={lead.id}
                        type="button"
                        onClick={() => onSelectLead(lead.id)}
                        className={cn(
                          "w-full rounded-xl border border-white/10 bg-white/[0.035] p-3 text-left transition hover:border-[#8EBBFF]/40 hover:bg-[#328BFF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          selectedLeadId === lead.id && "border-[#8EBBFF]/50 bg-[#328BFF]/12"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">{lead.name}</p>
                            <p className="mt-1 truncate text-xs text-[#D7E2F7]/62">{lead.requestType}</p>
                          </div>
                          <Badge className={cn("shrink-0", priorityBadgeClass(lead.priority))}>
                            {priorityLabels[lead.priority]}
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-[#D7E2F7]/42">
                          <span>{lead.score} priority</span>
                          <span>{lead.afterHoursRequested ? "After-hours" : "Standard"}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="rounded-xl border border-dashed border-white/10 p-3 text-xs leading-5 text-[#D7E2F7]/42">
                      No leads in this stage.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
