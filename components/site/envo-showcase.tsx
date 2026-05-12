import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Facebook,
  Instagram,
  Mail,
  MessageSquareText,
  Phone,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  UserRoundCheck
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRODUCT_FULL_NAME, PRODUCT_NAME, PRODUCT_ROLE, SECONDARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

const leadSources = [
  { label: "Phone", icon: Phone },
  { label: "SMS", icon: Smartphone },
  { label: "Web Chat", icon: MessageSquareText },
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Google", icon: SearchCheck },
  { label: "Email", icon: Mail }
] satisfies Array<{ label: string; icon: LucideIcon }>;

const guardrails = [
  "Business info and services",
  "Intake questions and routing logic",
  "Availability, hours, and settings",
  "Handoff rules and team routing",
  "Do-not-schedule rules and red flags",
  "Human review for sensitive or uncertain leads"
];

const triageItems = [
  {
    title: "Ready to send",
    count: "12",
    detail: "Safe replies waiting for approval.",
    action: "Approve",
    tone: "ready"
  },
  {
    title: "Needs approval",
    count: "5",
    detail: "Pricing, discounts, or special requests.",
    action: "Edit",
    tone: "approval"
  },
  {
    title: "Human review",
    count: "3",
    detail: "Urgent, unclear, or sensitive leads.",
    action: "Take over",
    tone: "review"
  }
] satisfies Array<{ action: string; count: string; detail: string; title: string; tone: "ready" | "approval" | "review" }>;

export function EnvoWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("leading-none", className)}>
      <p className="bg-[linear-gradient(90deg,#ff6f9c,#ff9f75,#ffb36d)] bg-clip-text text-4xl font-black tracking-normal text-transparent">
        envo
      </p>
      <p className="mt-1 text-xs font-semibold text-white/62">by SignalOps</p>
    </div>
  );
}

export function EnvoOrbVisual({ className }: { className?: string }) {
  const cards = [
    ["Answers instantly", "Hi, thanks for reaching out."],
    ["Asks smart questions", "What service and timing do you need?"],
    ["Follows up", "Still need help with this quote?"],
    ["Hands off to humans", "Owner alert with next action."]
  ];

  return (
    <div className={cn("relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/12 bg-[#080713]/86 p-5 shadow-2xl shadow-black/35", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(255,111,156,0.28),transparent_15rem),radial-gradient(circle_at_68%_38%,rgba(255,179,109,0.26),transparent_12rem),radial-gradient(circle_at_38%_58%,rgba(160,94,255,0.20),transparent_13rem)]" />
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffb36d]/28 bg-[radial-gradient(circle_at_38%_32%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(135deg,rgba(255,111,156,0.28),rgba(255,179,109,0.24),rgba(93,56,170,0.22))] shadow-[0_0_70px_rgba(255,111,156,0.34)]" />
      <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff6f9c]/22" />
      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffb36d]/12" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="bg-[linear-gradient(90deg,#ff6f9c,#ffb36d)] bg-clip-text text-5xl font-black text-transparent">envo</p>
      </div>
      <div className="relative grid min-h-[25rem] gap-3 sm:grid-cols-2">
        {cards.map(([title, detail], index) => (
          <div
            key={title}
            className={cn(
              "w-full max-w-[14rem] rounded-2xl border border-white/12 bg-white/[0.075] p-3 shadow-2xl shadow-black/20 backdrop-blur-2xl",
              index === 0 && "self-start justify-self-start",
              index === 1 && "self-center justify-self-end",
              index === 2 && "self-center justify-self-start",
              index === 3 && "self-end justify-self-end"
            )}
          >
            <div className="flex items-start gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]">
                <SparkIcon index={index} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[#ead0df]/62">{detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SparkIcon({ index }: { index: number }) {
  const icons = [MessageSquareText, SearchCheck, CalendarCheck2, UserRoundCheck] as const;
  const Icon = icons[index] ?? MessageSquareText;
  return <Icon className="size-4 text-white" aria-hidden="true" />;
}

export function EnvoOwnerTriagePanel({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[2rem] border border-white/14 bg-[#080713]/90 p-4 shadow-2xl shadow-black/30", className)}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">Owner Triage</p>
          <h3 className="mt-1 text-2xl font-black tracking-normal text-white">Supervise Envo.</h3>
        </div>
        <Badge className="border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">Live queue</Badge>
      </div>
      <p className="mt-2 text-sm leading-6 text-[#ead0df]/66">Approve, edit, or take over when Envo needs a human.</p>

      <div className="mt-5 grid gap-3">
        {triageItems.map((item) => (
          <TriageCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function TriageCard({ item }: { item: (typeof triageItems)[number] }) {
  const tone =
    item.tone === "ready"
      ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
      : item.tone === "approval"
        ? "border-[#ffb36d]/24 bg-[#ffb36d]/10 text-[#ffe1bd]"
        : "border-[#ff6f9c]/24 bg-[#ff6f9c]/10 text-[#ffd7e6]";

  return (
    <article className={cn("rounded-3xl border p-3", tone)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-white">{item.title}</p>
          <p className="mt-1 text-xs leading-5 text-white/62">{item.detail}</p>
        </div>
        <span className="rounded-xl border border-white/10 bg-white/[0.08] px-2.5 py-1 text-sm font-black">{item.count}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" className="h-10 rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-xs font-black text-white">
          {item.action}
        </button>
        <button type="button" className="h-10 rounded-2xl border border-white/12 bg-white/[0.055] text-xs font-black text-white/76">
          {item.tone === "review" ? "Assign" : "Take over"}
        </button>
      </div>
    </article>
  );
}

export function EnvoLeadSources() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {leadSources.map((source) => {
        const Icon = source.icon;
        return (
          <div key={source.label} className="rounded-2xl border border-white/12 bg-white/[0.055] p-3 text-center shadow-lg shadow-black/10">
            <Icon className="mx-auto size-5 text-[#ffb36d]" aria-hidden="true" />
            <p className="mt-2 text-xs font-semibold text-white/78">{source.label}</p>
          </div>
        );
      })}
    </div>
  );
}

export function EnvoGuardrailsPanel({ className }: { className?: string }) {
  return (
    <section className={cn("rounded-[2rem] border border-white/14 bg-white/[0.07] p-5 shadow-2xl shadow-black/24", className)}>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <div className="flex size-16 items-center justify-center rounded-3xl bg-[radial-gradient(circle,rgba(255,179,109,0.24),rgba(255,111,156,0.16))] text-[#ffb36d] shadow-[0_0_38px_rgba(255,111,156,0.22)]">
            <ShieldCheck className="size-8" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-white">Envo follows your rules.</h2>
          <p className="mt-3 text-sm leading-6 text-[#ead0df]/70">
            You set the basics, limits, and handoff rules so Envo helps without pretending to know what it should not.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {guardrails.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#080713]/42 p-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ffb36d]" aria-hidden="true" />
              <p className="text-sm leading-6 text-[#f6e8f0]/82">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EnvoProductPage({ designLab = false }: { designLab?: boolean }) {
  return (
    <div className="overflow-hidden bg-[#080713] text-white">
      <section className="relative isolate px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,111,156,0.25),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(255,179,109,0.22),transparent_28%),linear-gradient(135deg,#080713,#17102b_48%,#27102a)]" />
        <div className="surface-grid absolute inset-0 opacity-[0.13]" />
        <div className="relative mx-auto max-w-[1450px]">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.46)] backdrop-blur-2xl sm:p-8 lg:p-10">
            {designLab ? (
              <Badge className="mb-5 border border-[#ffb36d]/24 bg-[#ffb36d]/12 text-[#ffe1bd]">Design Lab Preview</Badge>
            ) : null}
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div>
                <EnvoWordmark />
                <Badge className="mt-8 border border-[#ffb36d]/24 bg-[#ffb36d]/12 text-[#ffe1bd]">
                  {PRODUCT_FULL_NAME}
                </Badge>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
                  Meet {PRODUCT_NAME}, your {PRODUCT_ROLE}.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#ead0df]/76 sm:text-lg">
                  Envo answers leads instantly, asks the right intake questions, follows up automatically, and hands off to your team when it is time.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <TrackedLink
                    href="/preview"
                    eventName={ANALYTICS_EVENTS.previewCtaClicked}
                    eventProperties={{ location: designLab ? "design_lab_envo_hero" : "envo_hero" }}
                    className={buttonVariants({ size: "lg" })}
                  >
                    Preview Envo
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </TrackedLink>
                  <TrackedLink
                    href={SECONDARY_CTA.href}
                    eventName={ANALYTICS_EVENTS.demoViewed}
                    eventProperties={{ location: designLab ? "design_lab_envo_demo" : "envo_hero_demo" }}
                    className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/18 bg-white/[0.045]`}
                  >
                    {SECONDARY_CTA.label}
                  </TrackedLink>
                </div>
              </div>
              <EnvoOrbVisual />
            </div>

            <div className="mt-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#ead0df]/52">
                Works where your leads come from
              </p>
              <EnvoLeadSources />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1450px] gap-6 lg:grid-cols-[1fr_0.82fr]">
          <EnvoGuardrailsPanel />
          <EnvoOwnerTriagePanel />
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1450px] gap-4 lg:grid-cols-3">
          {[
            ["Starter", "$250/mo", "Start Envo on one main lead source."],
            ["Growth", "$500/mo", "Let Envo manage multiple lead sources and follow-up paths."],
            ["Custom", "From $1,000/mo", "Build Envo around complex routing, dashboards, teams, and integrations."]
          ].map(([plan, price, copy]) => (
            <article key={plan} className="rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-5 shadow-2xl shadow-black/16">
              <p className="text-lg font-semibold text-white">{plan}</p>
              <p className="mt-4 text-4xl font-semibold tracking-normal text-white">{price}</p>
              <p className="mt-3 text-sm leading-6 text-[#ead0df]/70">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SignalOpsStudioPreview({ palette = "warm" }: { palette?: "warm" | "blue" }) {
  const warm = palette === "warm";
  const accent = warm
    ? "bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]"
    : "bg-[linear-gradient(135deg,#38bdf8,#2dd4bf)]";
  const bg = warm
    ? "bg-[radial-gradient(circle_at_18%_0%,rgba(255,111,156,0.22),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(255,179,109,0.16),transparent_26%),linear-gradient(135deg,#090714,#17102b,#24102b)]"
    : "bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.2),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(45,212,191,0.16),transparent_26%),linear-gradient(135deg,#06111f,#081827,#101827)]";

  return (
    <div className={cn("overflow-hidden rounded-[2rem] border border-white/14 p-5 text-white shadow-2xl shadow-black/28", bg)}>
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <Badge className="border border-white/14 bg-white/[0.08] text-white/82">SignalOps Studio</Badge>
          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl">
            SignalOps builds AI workers for local businesses.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#ead0df]/74">
            We build AI products that handle real work, book more jobs, and help local businesses grow.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href="/envo" eventName={ANALYTICS_EVENTS.previewCtaClicked} eventProperties={{ location: `design_lab_studio_${palette}` }} className={buttonVariants({ size: "lg" })}>
              Explore Envo
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            <a href="#products" className={`${buttonVariants({ variant: "outline", size: "lg" })} border-white/18 bg-white/[0.045]`}>
              View Products
            </a>
          </div>
        </div>
        <div id="products" className="grid gap-3">
          <ProductStudioCard accent={accent} featured title={PRODUCT_NAME} role={PRODUCT_ROLE} status="Featured / Live">
            The {PRODUCT_ROLE} that answers, collects details, follows up, and hands off leads so you never miss the next job.
          </ProductStudioCard>
          <div className="grid gap-3 sm:grid-cols-3">
            <ProductStudioCard accent={accent} title="Rally" role="AI Review Manager" status="Coming Soon" />
            <ProductStudioCard accent={accent} title="Flux" role="AI Operations Assistant" status="Coming Soon" />
            <ProductStudioCard accent={accent} title="Ledger" role="AI Finance Copilot" status="Coming Soon" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductStudioCard({
  accent,
  children,
  featured = false,
  role,
  status,
  title
}: {
  accent: string;
  children?: ReactNode;
  featured?: boolean;
  role: string;
  status: string;
  title: string;
}) {
  return (
    <article className={cn("relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5", featured && "min-h-60")}>
      <div className={cn("absolute right-4 top-4 size-12 rounded-2xl opacity-80 shadow-lg shadow-black/20", accent)} />
      <p className="text-2xl font-black text-white">{title}</p>
      <p className="mt-1 text-sm font-semibold text-[#ffb36d]">{role}</p>
      <Badge className="mt-4 border border-white/14 bg-white/[0.075] text-white/76">{status}</Badge>
      {children ? <p className="mt-5 max-w-lg text-sm leading-6 text-[#ead0df]/70">{children}</p> : null}
    </article>
  );
}
