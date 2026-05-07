"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Gauge,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  PhoneCall,
  RefreshCw,
  Route,
  SearchCheck,
  type LucideIcon
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { Card } from "@/components/ui/card";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FlowStep = {
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  ownerView: string;
};

const flowSteps: FlowStep[] = [
  {
    title: "Lead comes in",
    eyebrow: "Forms, calls, ads, DMs, email",
    description:
      "Every inquiry is captured from the places customers already use to reach the business.",
    icon: Inbox,
    details: [
      "Website forms and landing pages",
      "Missed calls and quote requests",
      "Ad leads, DMs, email, and chat"
    ],
    ownerView: "A new lead appears with source, contact details, service need, and timestamp."
  },
  {
    title: "AI responds instantly",
    eyebrow: "SMS, email, or chat",
    description:
      "The customer gets a useful reply while their intent is still fresh, even after hours.",
    icon: MessageSquareText,
    details: [
      "Confirms the request was received",
      "Sets expectations for next steps",
      "Asks for missing details or photos"
    ],
    ownerView: "The lead is acknowledged before a competitor has time to call back."
  },
  {
    title: "AI qualifies the lead",
    eyebrow: "Intent, urgency, budget, service",
    description:
      "SignalOps asks practical follow-up questions and turns messy messages into structured context.",
    icon: SearchCheck,
    details: [
      "Extracts service need and buying intent",
      "Flags urgent language or risky requests",
      "Detects missing contact or job details"
    ],
    ownerView: "The team sees what the prospect needs without reading a long thread first."
  },
  {
    title: "Lead gets scored and routed",
    eyebrow: "Hot leads get fast alerts",
    description:
      "Strong opportunities are pushed to the right owner, salesperson, or service team immediately.",
    icon: Route,
    details: [
      "Scores quality from 0 to 100",
      "Labels hot, warm, cold, or junk",
      "Routes by service, urgency, and location"
    ],
    ownerView: "High-value or urgent leads move to the top instead of sitting in an inbox."
  },
  {
    title: "Appointment gets booked",
    eyebrow: "Calendar or booking link",
    description:
      "Qualified prospects are guided toward a calendar, booking link, or direct sales handoff.",
    icon: CalendarCheck2,
    details: [
      "Sends the right booking path",
      "Captures preferred appointment windows",
      "Prepares the team before the call or visit"
    ],
    ownerView: "The conversation moves from inquiry to scheduled next step with less admin work."
  },
  {
    title: "Follow-up sequence starts",
    eyebrow: "Day 1, 2, 5, 10, nurture",
    description:
      "If the customer does not book, the system follows up with helpful reminders and context.",
    icon: RefreshCw,
    details: [
      "Short-term quote and booking reminders",
      "Photo or information requests",
      "Longer-term nurture for research-stage buyers"
    ],
    ownerView: "Good leads do not disappear just because nobody had time to chase them."
  },
  {
    title: "Dashboard updates",
    eyebrow: "Pipeline, quality, missed opportunities",
    description:
      "Owners can see lead volume, priority, response gaps, booking progress, and follow-up status.",
    icon: LayoutDashboard,
    details: [
      "Live pipeline and status tracking",
      "Lead score and priority views",
      "Missed opportunities and photo requests"
    ],
    ownerView: "The business gets a clear daily operating view instead of scattered notifications."
  }
];

const beforeAfter = [
  {
    label: "Before SignalOps",
    tone: "warning",
    items: [
      "Leads sit in inboxes, voicemails, and form notifications.",
      "Staff manually asks the same qualifying questions.",
      "Hot opportunities get mixed with low-intent shoppers.",
      "Follow-up depends on memory, sticky notes, or spare time."
    ]
  },
  {
    label: "After SignalOps",
    tone: "success",
    items: [
      "Every lead gets an instant response and a clear next step.",
      "AI collects the details your team needs before handoff.",
      "Urgent and high-intent prospects get routed first.",
      "Follow-up happens automatically until the lead books or cools off."
    ]
  }
] as const;

const aiExamples = [
  {
    label: "Customer reply",
    icon: MessageSquareText,
    value:
      "Thanks for reaching out. We can help review this today. Please send 2-3 photos and your preferred appointment window so we can get you an accurate next step."
  },
  {
    label: "Internal sales note",
    icon: PhoneCall,
    value:
      "High-intent quote request. Customer mentioned vibration and wants availability. Call first, then send booking link if they do not answer."
  },
  {
    label: "Lead score",
    icon: Gauge,
    value: "92 / Hot / Soon. Complete contact info, clear service need, strong buying intent, appointment language included."
  },
  {
    label: "Follow-up message",
    icon: RefreshCw,
    value:
      "Quick follow-up on your quote request. We still have a few openings this week if you want us to take a look."
  }
];

export function HowItWorksDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = flowSteps[activeIndex];
  const ActiveStepIcon = activeStep.icon;

  const activeNumber = String(activeIndex + 1).padStart(2, "0");

  return (
    <div className="overflow-x-hidden">
      <section className="surface-grid border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-blue-300/25 bg-blue-400/10 text-blue-100">
                AI Lead Engine
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
                  How the SignalOps AI Lead Engine Works
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  A simple operating layer for capturing, responding, qualifying,
                  routing, booking, and following up before good opportunities go cold.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  href={PRIMARY_CTA.href}
                  eventName={ANALYTICS_EVENTS.auditCtaClicked}
                  eventProperties={{ location: "how_it_works_hero" }}
                  className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
                >
                  {PRIMARY_CTA.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </TrackedLink>
                <TrackedLink
                  href="/demo"
                  eventName={ANALYTICS_EVENTS.demoViewed}
                  eventProperties={{ location: "how_it_works_hero_demo_click" }}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
                >
                  View Apex Demo
                </TrackedLink>
              </div>
              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                {["No vague autoresponder", "Clear human handoff", "Follow-up that keeps moving"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Card className="relative overflow-hidden p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300" />
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-normal text-slate-400">
                      Live qualification snapshot
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">
                      Lead response in under 60 seconds
                    </h2>
                  </div>
                  <div className="rounded-lg border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-right">
                    <p className="text-xs text-emerald-100">Score</p>
                    <p className="text-2xl font-semibold text-white">92</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ["Source", "Website quote form"],
                    ["Priority", "Hot lead"],
                    ["Route", "Owner alert + booking link"],
                    ["Next step", "Request photos, then schedule"]
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/5 px-3 py-3"
                    >
                      <span className="text-sm text-slate-400">{label}</span>
                      <span className="text-right text-sm font-medium text-slate-100">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:max-w-3xl">
          <Badge>Step-by-step flow</Badge>
          <h2 className="text-3xl font-semibold tracking-normal text-white">
            From first touch to booked appointment
          </h2>
          <p className="text-sm leading-6 text-slate-300 sm:text-base">
            SignalOps connects the moments that usually live in separate tools: the inquiry,
            response, qualification, routing, booking, follow-up, and reporting.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
          <div className="relative">
            <div
              className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-blue-300/15 via-cyan-300/35 to-emerald-300/15 lg:left-8 lg:right-8 lg:top-1/2 lg:h-px lg:w-auto lg:-translate-y-1/2 lg:bg-gradient-to-r"
              aria-hidden="true"
            />
            <div className="grid gap-3 lg:grid-cols-7">
              {flowSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = activeIndex === index;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "relative z-10 flex min-h-28 w-full items-start gap-3 rounded-lg border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:min-h-44 lg:flex-col",
                      isActive
                        ? "border-blue-300/45 bg-blue-400/15 shadow-xl shadow-blue-950/25"
                        : "border-white/10 bg-card/88 hover:border-blue-300/30 hover:bg-white/5"
                    )}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg border",
                        isActive
                          ? "border-blue-200/40 bg-blue-300/20 text-blue-100"
                          : "border-white/10 bg-white/5 text-slate-300"
                      )}
                    >
                      <StepIcon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 space-y-1">
                      <span className="block text-xs font-medium uppercase tracking-normal text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-sm font-semibold leading-5 text-white">
                        {step.title}
                      </span>
                      <span className="block text-xs leading-5 text-slate-400">{step.eyebrow}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                <ActiveStepIcon className="size-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-normal text-slate-400">
                  Step {activeNumber}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-normal text-white">
                  {activeStep.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{activeStep.description}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {activeStep.details.map((detail) => (
                <div key={detail} className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-200" aria-hidden="true" />
                  <p className="text-sm leading-6 text-slate-200">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-blue-300/20 bg-blue-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-normal text-blue-100">
                What the owner sees
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{activeStep.ownerView}</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/35">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:px-8">
          {beforeAfter.map((group) => (
            <Card key={group.label} className="p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-normal text-white">{group.label}</h2>
                <Badge variant={group.tone}>{group.tone === "success" ? "Cleaner" : "Leaky"}</Badge>
              </div>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        group.tone === "success" ? "text-emerald-200" : "text-amber-200"
                      )}
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div className="space-y-3">
            <Badge variant="outline" className="border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              Generated operating examples
            </Badge>
            <h2 className="text-3xl font-semibold tracking-normal text-white">
              The useful output your team actually needs
            </h2>
          </div>
          <p className="text-sm leading-6 text-slate-300 sm:text-base">
            The system is designed to make the next action obvious, not bury your team in generic
            automation noise.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiExamples.map((example) => {
            const ExampleIcon = example.icon;

            return (
              <Card key={example.label} className="p-5">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-100">
                  <ExampleIcon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold tracking-normal text-white">{example.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{example.value}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/18 via-card to-slate-950 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="space-y-3">
              <Badge variant="success">Free audit</Badge>
              <h2 className="text-3xl font-semibold tracking-normal text-white">
                See where leads are being missed.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                We will review how your business handles calls, texts, forms, DMs,
                and follow-ups, then show where leads are getting missed, delayed,
                or forgotten.
              </p>
            </div>
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.auditCtaClicked}
              eventProperties={{ location: "how_it_works_final_cta" }}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Get a Free Missed Lead Checkup
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
