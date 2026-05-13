import type { LeadPriority, LeadUrgency } from "@/lib/lead-scoring";
import type { DashboardLeadStatus } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  defaultDashboardFilters,
  priorityLabels,
  statusLabels,
  urgencyLabels,
  type DashboardFilters
} from "./dashboard-utils";

type DashboardFiltersProps = {
  filters: DashboardFilters;
  sources: string[];
  requestTypes: string[];
  onChange: (filters: DashboardFilters) => void;
};

const selectClass =
  "h-10 w-full min-w-0 rounded-xl border border-input bg-[#0B1024]/70 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const priorities: LeadPriority[] = ["hot", "warm", "cold", "junk"];
const statuses: DashboardLeadStatus[] = ["new", "contacted", "needs-details", "ready", "booked", "won", "lost"];
const urgencies: LeadUrgency[] = ["emergency", "soon", "researching", "unknown"];

export function DashboardFilters({ filters, sources, requestTypes, onChange }: DashboardFiltersProps) {
  function updateFilter<Key extends keyof DashboardFilters>(key: Key, value: DashboardFilters[Key]) {
    onChange({
      ...filters,
      [key]: value
    });
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0B1024]/68 p-4" aria-label="Lead filters">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2F7]/42">
          Priority
          <select value={filters.priority} onChange={(event) => updateFilter("priority", event.target.value as DashboardFilters["priority"])} className={selectClass}>
            <option value="all">All priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priorityLabels[priority]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2F7]/42">
          Status
          <select value={filters.status} onChange={(event) => updateFilter("status", event.target.value as DashboardFilters["status"])} className={selectClass}>
            <option value="all">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2F7]/42">
          Source
          <select value={filters.source} onChange={(event) => updateFilter("source", event.target.value)} className={selectClass}>
            <option value="all">All sources</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2F7]/42">
          Urgency
          <select value={filters.urgency} onChange={(event) => updateFilter("urgency", event.target.value as DashboardFilters["urgency"])} className={selectClass}>
            <option value="all">All urgency</option>
            {urgencies.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgencyLabels[urgency]}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2F7]/42">
          Request
          <select value={filters.requestType} onChange={(event) => updateFilter("requestType", event.target.value)} className={selectClass}>
            <option value="all">All requests</option>
            {requestTypes.map((requestType) => (
              <option key={requestType} value={requestType}>
                {requestType}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#D7E2F7]/42">
          Timing
          <select value={filters.afterHours} onChange={(event) => updateFilter("afterHours", event.target.value as DashboardFilters["afterHours"])} className={selectClass}>
            <option value="all">All leads</option>
            <option value="yes">After-hours requested</option>
            <option value="no">Standard window</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={() => onChange(defaultDashboardFilters)}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}
