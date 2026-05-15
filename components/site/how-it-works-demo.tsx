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
import { EnvoFeaturePanel, EnvoGlassCard } from "@/components/site/envo/envo-brand-system";
import { EnvoLeadWorkflowVisual } from "@/components/site/envo/envo-dashboard-mockups";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { Card } from "@/components/ui/card";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SignalOpsCommandLayer } from "@/components/site/product-story-visuals";

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
    title: "Envo responds instantly",
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
    title: "Envo collects the right details",
    eyebrow: "Service, urgency, timing, next step",
    description:
      "Envo asks practical follow-up questions and turns messy messages into structured context.",
    icon: SearchCheck,
    details: [
      "Extracts service need and buying intent",
      "Flags urgent language or risky requests",
      "Detects missing contact or job details"
    ],
    ownerView: "The team sees what the prospect needs without reading a long thread first."
  },
  {
    title: "Priority is sorted and routed",
    eyebrow: "Important leads get fast alerts",
    description:
      "Strong opportunities are pushed to the right owner, salesperson, or service team immediately.",
    icon: Route,
    details: [
      "Sorts priority and next action",
      "Labels urgent, warm, quiet, or needs review",
      "Routes by service, urgency, and location"
    ],
    ownerView: "High-value or urgent leads move to the top instead of sitting in an inbox."
  },
  {
    title: "Appointment gets booked",
    eyebrow: "Calendar or booking link",
    description:
      "Ready prospects are guided toward a calendar, booking link, or direct sales handoff.",
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
      "Priority and next-action views",
      "Missed opportunities and photo requests"
    ],
    ownerView: "The business gets a clear daily operating view instead of scattered notifications."
  }
];

const beforeAfter = [
  {
    label: "Before Envo",
    tone: "warning",
    items: [
      "Leads sit in inboxes, voicemails, and form notifications.",
      "Staff manually asks the same intake questions.",
      "Hot opportunities get mixed with low-intent shoppers.",
      "Follow-up depends on memory, sticky notes, or spare time."
    ]
  },
  {
    label: "After Envo",
    tone: "success",
    items: [
      "Every lead gets an instant response and a clear next step.",
      "Envo collects the details your team needs before handoff.",
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
    label: "Priority view",
    icon: Gauge,
    value: "High priority / Soon. Complete contact info, clear service need, strong intent, appointment language included."
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
    <div className="overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="border-b border-[#D8E2F7] bg-[#FBFAF7]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-[#CBD8F2] bg-white/74 text-[#2563EB]">
                Envo by SignalOpsAI
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-black leading-tight tracking-normal text-[#071126] sm:text-5xl">
                  How Envo handles lead work
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#647084] sm:text-lg">
                  A simple AI lead manager for capturing, responding, sorting,
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
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-[#CBD8F2] bg-white/72 text-[#071126] hover:bg-white sm:w-auto")}
                >
                  View Demo
                </TrackedLink>
              </div>
              <div className="grid gap-3 text-sm text-[#647084] sm:grid-cols-3">
                {["No vague autoresponder", "Clear team handoff", "Follow-up that keeps moving"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-[#34C759]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <EnvoGlassCard className="overflow-hidden p-3">
              <EnvoLeadWorkflowVisual className="rounded-[1.35rem] shadow-none" />
            </EnvoGlassCard>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <SignalOpsCommandLayer />
          <EnvoFeaturePanel />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:max-w-3xl">
          <Badge className="border border-[#CBD8F2] bg-white/74 text-[#2563EB]">Step-by-step flow</Badge>
          <h2 className="text-3xl font-black tracking-normal text-[#071126]">
            From first touch to booked appointment
          </h2>
          <p className="text-sm leading-6 text-[#647084] sm:text-base">
            Envo connects the moments that usually live in separate tools: the inquiry,
            response, intake, routing, booking, follow-up, and reporting.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
          <div className="relative">
            <div
              className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-[#328BFF]/15 via-[#6F4DFF]/35 to-[#8d6bff]/15 lg:left-8 lg:right-8 lg:top-1/2 lg:h-px lg:w-auto lg:-translate-y-1/2 lg:bg-gradient-to-r"
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
                      "relative z-10 flex min-h-28 w-full items-start gap-3 rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:min-h-44 lg:flex-col",
                      isActive
                        ? "border-[#8EBBFF]/45 bg-[#328BFF]/15 shadow-xl shadow-blue-950/25"
                        : "border-white/10 bg-[#111A3A]/88 hover:border-[#8EBBFF]/30 hover:bg-white/5"
                    )}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-2xl border",
                        isActive
                          ? "border-[#BFD3FF]/40 bg-[#8EBBFF]/20 text-[#D7E8FF]"
                          : "border-white/10 bg-white/5 text-[#D7E2F7]/78"
                      )}
                    >
                      <StepIcon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 space-y-1">
                      <span className="block text-xs font-medium uppercase tracking-normal text-[#D7E2F7]/62">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="block text-sm font-semibold leading-5 text-white">
                        {step.title}
                      </span>
                      <span className="block text-xs leading-5 text-[#D7E2F7]/62">{step.eyebrow}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Card className="bg-[#0B1024]/78 p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#6F4DFF]/25 bg-[#6F4DFF]/10 text-[#EAF1FF]">
                <ActiveStepIcon className="size-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-normal text-[#D7E2F7]/62">
                  Step {activeNumber}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-normal text-white">
                  {activeStep.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#D7E2F7]/78">{activeStep.description}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {activeStep.details.map((detail) => (
                <div key={detail} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-200" aria-hidden="true" />
                  <p className="text-sm leading-6 text-[#EAF1FF]">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#8EBBFF]/20 bg-[#328BFF]/10 p-4">
              <p className="text-xs font-medium uppercase tracking-normal text-[#D7E8FF]">
                What the owner sees
              </p>
              <p className="mt-2 text-sm leading-6 text-[#EAF1FF]">{activeStep.ownerView}</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-y border-[#D8E2F7] bg-[#F8FAFF]">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:px-8">
          {beforeAfter.map((group) => (
            <Card key={group.label} className="bg-[#0B1024]/78 p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-normal text-white">{group.label}</h2>
                <Badge variant={group.tone}>{group.tone === "success" ? "Cleaner" : "Leaky"}</Badge>
              </div>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        group.tone === "success" ? "text-emerald-200" : "text-amber-200"
                      )}
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-6 text-[#EAF1FF]">{item}</p>
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
            <Badge variant="outline" className="border-[#CBD8F2] bg-white/74 text-[#2563EB]">
              Generated operating examples
            </Badge>
            <h2 className="text-3xl font-black tracking-normal text-[#071126]">
              The useful output your team actually needs
            </h2>
          </div>
          <p className="text-sm leading-6 text-[#647084] sm:text-base">
            The system is designed to make the next action obvious, not bury your team in generic
            automation noise.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiExamples.map((example) => {
            const ExampleIcon = example.icon;

            return (
              <Card key={example.label} className="bg-[#0B1024]/78 p-5">
                <div className="mb-4 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#D7E8FF]">
                  <ExampleIcon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold tracking-normal text-white">{example.label}</h3>
                <p className="mt-3 text-sm leading-6 text-[#D7E2F7]/78">{example.value}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#328BFF]/18 via-[#111A3A] to-[#0B1024] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="space-y-3">
              <Badge variant="success">Project inquiry</Badge>
              <h2 className="text-3xl font-semibold tracking-normal text-white">
                See where leads are being missed.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-[#D7E2F7]/78 sm:text-base">
                Tell us how leads come in, what tools you use, and which package you are considering.
            SignalOpsAI will reply with the best next step for Envo.
              </p>
            </div>
            <TrackedLink
              href={PRIMARY_CTA.href}
              eventName={ANALYTICS_EVENTS.auditCtaClicked}
              eventProperties={{ location: "how_it_works_final_cta" }}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Meet Envo
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
