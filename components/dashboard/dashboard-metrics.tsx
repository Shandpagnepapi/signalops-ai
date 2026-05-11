import { AlertTriangle, CalendarCheck2, Camera, Flame, Gauge, MessageSquareReply, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ApexDashboardLead } from "@/lib/mock-data";

type DashboardMetricsProps = {
  leads: ApexDashboardLead[];
};

function averageScore(leads: ApexDashboardLead[]) {
  if (leads.length === 0) {
    return 0;
  }

  return Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);
}

export function DashboardMetrics({ leads }: DashboardMetricsProps) {
  const hotLeads = leads.filter((lead) => lead.priority === "hot").length;
  const responseNeeded = leads.filter((lead) => lead.status === "new" || lead.tags.includes("response-needed")).length;
  const bookedAppointments = leads.filter((lead) => lead.status === "booked").length;
  const missedOpportunities = leads.filter((lead) => lead.status === "lost").length;
  const photoRequestsPending = leads.filter((lead) => lead.status === "needs-photos" || lead.tags.includes("needs-photos")).length;

  const metrics = [
    {
      label: "Total leads",
      value: String(leads.length),
      note: "Last 7 days",
      icon: Gauge
    },
    {
      label: "Hot leads",
      value: String(hotLeads),
      note: "Needs fast human attention",
      icon: Flame
    },
    {
      label: "Average priority",
      value: String(averageScore(leads)),
      note: "AI-ready intake quality",
      icon: Trophy
    },
    {
      label: "Response needed",
      value: String(responseNeeded),
      note: "New or urgent queue",
      icon: MessageSquareReply
    },
    {
      label: "Booked appointments",
      value: String(bookedAppointments),
      note: "Scheduled repair work",
      icon: CalendarCheck2
    },
    {
      label: "Missed opportunities",
      value: String(missedOpportunities),
      note: "No response or poor contact info",
      icon: AlertTriangle
    },
    {
      label: "Photo requests pending",
      value: String(photoRequestsPending),
      note: "Waiting on damage photos",
      icon: Camera
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard overview metrics">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.label} className="min-h-[142px] bg-[#17122d]/78">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardDescription>{metric.label}</CardDescription>
                <Icon className="size-5 text-[#ffc0d5]" aria-hidden="true" />
              </div>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-5 text-[#ead0df]/62">{metric.note}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
