import { AlertTriangle, CheckCircle2, Clock3, Mail, MapPin, Phone, Wrench } from "lucide-react";
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

type LeadDetailCardProps = {
  lead: ApexDashboardLead | null;
};

export function LeadDetailCard({ lead }: LeadDetailCardProps) {
  if (!lead) {
    return (
      <Card className="bg-[#17122d]/75">
        <CardHeader>
          <CardTitle>Lead detail</CardTitle>
          <CardDescription>Select a lead to inspect the intake record and recommended next action.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const leadOpsTimeline = [
    {
      time: formatDateTime(lead.createdAt),
      event: "Lead submitted"
    },
    {
      time: "AI",
      event: `AI marked ${priorityLabels[lead.priority]} with ${urgencyLabels[lead.urgency]} urgency`
    },
    {
      time: "Reply",
      event: "Customer reply prepared/sent"
    },
    {
      time: "Alert",
      event: "Owner alert prepared/sent"
    },
    {
      time: "Follow-up",
      event: "Follow-up sequence started"
    },
    ...lead.timeline.map((item) => ({
      time: item.time,
      event: item.event
    }))
  ];

  return (
    <Card className="min-w-0 bg-[#17122d]/78">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardDescription>Selected lead</CardDescription>
            <CardTitle className="mt-1 text-2xl">{lead.name}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-[#ead0df]/62">{lead.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={priorityBadgeClass(lead.priority)}>{priorityLabels[lead.priority]}</Badge>
            <Badge className={statusBadgeClass(lead.status)}>{statusLabels[lead.status]}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="grid gap-3 sm:grid-cols-2" aria-label="Contact and vehicle info">
          <InfoItem icon={Phone} label="Phone" value={lead.phone || "Missing"} />
          <InfoItem icon={Mail} label="Email" value={lead.email || "Missing"} />
          <InfoItem icon={Wrench} label="Vehicle" value={lead.vehicle} />
          <InfoItem icon={MapPin} label="Area" value={lead.address || "Not provided"} />
        </section>

        <section className="grid gap-3 sm:grid-cols-4" aria-label="Wheel and damage details">
          <DetailStat label="Damage" value={lead.damageType} />
          <DetailStat label="Wheel size" value={lead.wheelSize || "Unknown"} />
          <DetailStat label="Wheels" value={String(lead.numberOfWheels)} />
          <DetailStat label="Mobile" value={lead.needsMobileService ? "Requested" : "Not requested"} />
        </section>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <TextBlock title="Customer message" body={lead.message} />
          <TextBlock title="AI recommendation" body={lead.recommendedAction} />
          <TextBlock title="Suggested reply" body={lead.customerReply} />
          <TextBlock title="Internal note" body={lead.internalNote} warning={lead.tags.includes("inspection-required")} />
        </div>

        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[#ead0df]/42">Lead signals</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Priority {lead.priority}</Badge>
            <Badge variant="outline">Urgency {urgencyLabels[lead.urgency]}</Badge>
            <Badge variant="outline">Created {formatDateTime(lead.createdAt)}</Badge>
            {lead.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/15 bg-white/5 text-[#f2d9e8]">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[#ead0df]/42">Timeline</p>
          <div className="space-y-3">
            {leadOpsTimeline.map((item, index) => (
              <div key={`${index}-${item.time}-${item.event}`} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#ff6f9c]/12 text-[#ffc0d5]">
                  <Clock3 className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.time}</p>
                  <p className="mt-1 text-sm leading-6 text-[#ead0df]/62">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4">
      <Icon className="mt-0.5 size-4 shrink-0 text-[#ffc0d5]" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.14em] text-[#ead0df]/42">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#ead0df]/42">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function TextBlock({ title, body, warning }: { title: string; body: string; warning?: boolean }) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-white/[0.035] p-4", warning && "border-amber-300/25 bg-amber-400/10")}>
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#ead0df]/42">
        {warning ? <AlertTriangle className="size-3.5 text-amber-300" aria-hidden="true" /> : <CheckCircle2 className="size-3.5 text-emerald-300" aria-hidden="true" />}
        {title}
      </p>
      <p className="text-sm leading-6 text-[#f2d9e8]">{body}</p>
    </div>
  );
}
