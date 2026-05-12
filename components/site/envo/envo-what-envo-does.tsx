import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  CalendarCheck2,
  ClipboardCheck,
  MessageSquareReply,
  PackageCheck,
  RefreshCcw
} from "lucide-react";
import {
  FloatingBadge,
  RuleCard
} from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const actions = [
  {
    copy: "New inquiries receive a useful response while the lead is still engaged.",
    icon: MessageSquareReply,
    title: "Answers new leads fast"
  },
  {
    copy: "Envo asks practical intake questions before your team has to chase basics.",
    icon: ClipboardCheck,
    title: "Collects the right details"
  },
  {
    copy: "Quote and appointment requests get sorted by intent, urgency, and next step.",
    icon: CalendarCheck2,
    title: "Qualifies quote and appointment requests"
  },
  {
    copy: "No-replies and missing details get calm nudges that keep the lead warm.",
    icon: RefreshCcw,
    title: "Sends follow-up nudges"
  },
  {
    copy: "Urgent or high-value requests can go straight to the right person.",
    icon: BellRing,
    title: "Routes urgent leads"
  },
  {
    copy: "Your team gets source, status, details, and the recommended next action.",
    icon: PackageCheck,
    title: "Prepares owner handoffs"
  }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

export function EnvoWhatEnvoDoes() {
  return (
    <section className="premium-section">
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <FloatingBadge theme={theme}>What Envo does</FloatingBadge>
          <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
            The lead work that usually falls through the cracks.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
            Envo gives busy local businesses a dedicated AI Lead Manager for response, intake, follow-up, missed lead
            recovery, priority routing, and clean human handoff.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <RuleCard key={action.title} copy={action.copy} icon={action.icon} title={action.title} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
