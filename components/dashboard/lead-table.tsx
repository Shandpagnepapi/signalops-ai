import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ApexDashboardLead } from "@/lib/mock-data";
import {
  formatDateTime,
  priorityBadgeClass,
  priorityLabels,
  statusBadgeClass,
  statusLabels,
  urgencyLabels
} from "./dashboard-utils";

type LeadTableProps = {
  leads: ApexDashboardLead[];
  selectedLeadId?: string;
  onSelectLead: (leadId: string) => void;
};

export function LeadTable({ leads, selectedLeadId, onSelectLead }: LeadTableProps) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Lead table</CardTitle>
        <CardDescription>Priority, urgency, and recommended next step for each wheel repair inquiry.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-[#ead0df]/42">
              <tr>
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Source</th>
                <th className="py-3 pr-4 font-medium">Vehicle</th>
                <th className="py-3 pr-4 font-medium">Damage type</th>
                <th className="py-3 pr-4 font-medium">Priority value</th>
                <th className="py-3 pr-4 font-medium">Priority</th>
                <th className="py-3 pr-4 font-medium">Urgency</th>
                <th className="py-3 pr-4 font-medium">Recommended action</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 font-medium">Created date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-[#ead0df]/78">
              {leads.map((lead) => (
                <tr key={lead.id} className={cn(selectedLeadId === lead.id && "bg-[#ff6f9c]/8")}>
                  <td className="py-4 pr-4 align-top">
                    <button
                      type="button"
                      onClick={() => onSelectLead(lead.id)}
                      className="text-left font-medium text-white underline-offset-4 hover:text-[#ffc0d5] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {lead.name}
                    </button>
                    <p className="mt-1 text-xs text-[#ead0df]/42">{lead.phone || lead.email}</p>
                  </td>
                  <td className="py-4 pr-4 align-top">{lead.source}</td>
                  <td className="py-4 pr-4 align-top">{lead.vehicle}</td>
                  <td className="py-4 pr-4 align-top">{lead.damageType}</td>
                  <td className="py-4 pr-4 align-top">
                    <Badge variant={lead.score >= 80 ? "success" : "warning"}>{lead.score}</Badge>
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <Badge className={priorityBadgeClass(lead.priority)}>{priorityLabels[lead.priority]}</Badge>
                  </td>
                  <td className="py-4 pr-4 align-top">{urgencyLabels[lead.urgency]}</td>
                  <td className="max-w-[320px] py-4 pr-4 align-top text-[#ead0df]/62">{lead.recommendedAction}</td>
                  <td className="py-4 pr-4 align-top">
                    <Badge className={statusBadgeClass(lead.status)}>{statusLabels[lead.status]}</Badge>
                  </td>
                  <td className="py-4 align-top text-[#ead0df]/62">{formatDateTime(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-[#ead0df]/62">
            No leads match the current filters.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
