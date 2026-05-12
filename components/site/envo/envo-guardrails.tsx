import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  CalendarCog,
  ClipboardList,
  History,
  ListChecks,
  RadioTower,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck
} from "lucide-react";
import {
  FloatingBadge,
  GlassPanel,
  RuleCard
} from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const guardrails = [
  { copy: "Approved business details, service areas, and what you do or do not offer.", icon: BookOpenCheck, title: "Business info and services" },
  { copy: "The exact questions Envo should ask before routing or recommending next steps.", icon: ClipboardList, title: "Intake questions and qualification logic" },
  { copy: "Hours, availability windows, calendar assumptions, and booking preferences.", icon: CalendarCog, title: "Availability, hours, and settings" },
  { copy: "Who gets which lead, when, and with what context attached.", icon: RadioTower, title: "Handoff rules and team routing" },
  { copy: "Boundaries for pricing, scheduling, promises, emergencies, and sensitive cases.", icon: ShieldAlert, title: "Do-not-schedule rules and red flags" },
  { copy: "Envo escalates sensitive, uncertain, or high-risk leads for a person to review.", icon: UserRoundCheck, title: "Human review for sensitive or uncertain leads" },
  { copy: "When the answer is not clear, Envo routes the issue instead of guessing.", icon: ShieldCheck, title: "Escalation instead of guessing" },
  { copy: "See what Envo received, asked, drafted, routed, and handed off.", icon: History, title: "Activity history" }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

export function EnvoGuardrails() {
  return (
    <section className="premium-section">
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:p-8" theme={theme}>
          <div>
            <FloatingBadge icon={ShieldCheck} theme={theme}>Guardrails</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              Envo follows your rules.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
              You set the rules. Envo follows them every time.
            </p>
            <RuleCard
              className="mt-6"
              copy="If a lead mentions emergency after hours, qualify and route to the on-call person."
              icon={ListChecks}
              title="Example rule"
              theme={theme}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {guardrails.map((guardrail) => (
              <RuleCard
                key={guardrail.title}
                copy={guardrail.copy}
                icon={guardrail.icon}
                title={guardrail.title}
                theme={theme}
              />
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
