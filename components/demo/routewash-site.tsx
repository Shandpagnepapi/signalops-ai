"use client";

import {
  ArrowRight,
  BellRing,
  CalendarCheck2,
  ClipboardList,
  Mail,
  MapPin,
  MessageSquareReply,
  Route,
  SearchCheck,
  Sparkles,
  Truck,
  Zap
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { EMAIL_CTA, getEmailHref, PRIMARY_CTA } from "@/lib/constants";
import type { DemoBusinessConfig } from "@/lib/demo-businesses";
import { cn } from "@/lib/utils";
import { DemoLeadForm } from "./demo-lead-form";

const timeline = [
  { label: "Inquiry", icon: MessageSquareReply, tone: "emerald" },
  { label: "Envo reply", icon: Zap, tone: "blue" },
  { label: "Details", icon: SearchCheck, tone: "violet" },
  { label: "Follow-up", icon: Route, tone: "amber" },
  { label: "Booked", icon: CalendarCheck2, tone: "green" }
] as const;

export function RouteWashDemoSite({ business }: { business: DemoBusinessConfig }) {
  return (
    <>
      <section id="scenario" className="border-t border-zinc-800/40 px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-emerald-400">{business.heroBadge}</p>
            <h2 className="font-heading text-3xl leading-tight tracking-tight text-white md:text-5xl">
              {business.headline}
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 md:text-lg">
              {business.subheadline}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo-lead-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                {business.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={business.secondaryHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                {business.secondaryCta}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ScenarioBriefPanel business={business} />
          </div>
        </div>
      </section>

      <TimelineSection business={business} />

      <section id="service-plans" className="border-t border-zinc-800/40 px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <SectionIntro
              eyebrow={business.servicesSection.eyebrow}
              title={business.servicesSection.title}
              description={business.servicesSection.description}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
            {business.services.slice(0, 6).map((service) => (
              <GlassPanel key={service.title} className="group p-5 transition duration-300 hover:border-emerald-500/30">
                <Truck className="mb-4 h-5 w-5 text-emerald-400" aria-hidden="true" />
                <h3 className="font-heading text-lg text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{service.description}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section id={business.callout.id} className="border-t border-zinc-800/40 px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <GlassPanel className="p-5 md:p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">{business.commonIssues.eyebrow}</p>
            <h2 className="mt-3 font-heading text-2xl tracking-tight text-white md:text-3xl">{business.commonIssues.title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{business.commonIssues.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {business.commonIssues.items.map((item) => (
                <span key={item} className="rounded-full border border-zinc-700/70 bg-zinc-950/45 px-3 py-2 text-xs font-semibold text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 md:p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-violet-400">{business.process.eyebrow}</p>
            <h2 className="mt-3 font-heading text-2xl tracking-tight text-white md:text-3xl">{business.process.title}</h2>
            <div className="mt-5 grid gap-3">
              {business.process.steps.slice(0, 5).map((step, index) => (
                <div key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl border border-zinc-800/70 bg-zinc-950/40 p-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-heading text-sm text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </section>

      <section className="border-t border-zinc-800/40 px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.88fr)] lg:items-start">
          <div id="demo-lead-form" className="scroll-mt-8">
            <DemoLeadForm key={business.key} business={business} />
          </div>
          <div className="grid gap-5">
            <WhatThisShows business={business} />
            <AccountValuePanel business={business} />
            <PreviewCards business={business} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function ScenarioBriefPanel({ business }: { business: DemoBusinessConfig }) {
  return (
    <div className="relative">
      <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_70%_20%,rgba(50,139,255,0.28),transparent_36%),radial-gradient(circle_at_36%_82%,rgba(111,77,255,0.18),transparent_34%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/80 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <div className="flex items-center gap-2 border-b border-zinc-800/60 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-4 h-5 max-w-sm flex-1 rounded-md bg-zinc-800/60" />
        </div>
        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Demo scenario</p>
              <h3 className="mt-2 font-heading text-2xl text-white">{business.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{business.location}</p>
            </div>
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              {business.qualificationPreview.badge}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {business.stats.slice(0, 3).map((stat) => (
              <Metric key={`${stat.value}-${stat.label}`} label={stat.label} value={stat.value} />
            ))}
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {business.qualificationPreview.cards.slice(0, 3).map((card) => (
              <div key={card.title} className="rounded-xl border border-zinc-800/60 bg-zinc-950/42 p-4">
                <p className="font-heading text-sm text-white">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineSection({ business }: { business: DemoBusinessConfig }) {
  return (
    <section className="border-t border-zinc-800/40 px-6 py-10 md:px-12 md:py-14 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Lead journey</p>
            <h2 className="mt-2 font-heading text-2xl tracking-tight text-white md:text-3xl">
              From first request to clean owner handoff.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-zinc-500">{business.leadOpsPanel.description}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {timeline.map((step, index) => {
            const Icon = step.icon;

            return (
              <GlassPanel key={step.label} className="relative p-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                      step.tone === "emerald" && "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
                      step.tone === "blue" && "border-blue-500/20 bg-blue-500/10 text-blue-400",
                      step.tone === "violet" && "border-violet-500/20 bg-violet-500/10 text-violet-400",
                      step.tone === "amber" && "border-amber-500/20 bg-amber-500/10 text-amber-400",
                      step.tone === "green" && "border-green-500/20 bg-green-500/10 text-green-400"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs text-zinc-600">0{index + 1}</p>
                    <p className="font-heading text-sm text-white">{step.label}</p>
                  </div>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhatThisShows({ business }: { business: DemoBusinessConfig }) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
          <Sparkles className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-xl text-white">What this demo shows</h2>
          <p className="text-sm text-zinc-500">{business.selectorLabel}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {business.leadOpsPanel.items.slice(0, 4).map((item) => (
          <div key={item.title} className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
            <p className="font-heading text-sm text-white">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-zinc-400">{item.description}</p>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

function AccountValuePanel({ business }: { business: DemoBusinessConfig }) {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
          <MapPin className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-heading text-xl text-white">{business.beforeAfter.title}</h2>
          <p className="text-sm text-zinc-500">{business.beforeAfter.eyebrow}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-zinc-400">{business.beforeAfter.description}</p>
      {business.beforeAfter.visualCards ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {business.beforeAfter.visualCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">{card.label}</p>
              <p className="mt-2 font-heading text-2xl text-white">{card.value}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">{card.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </GlassPanel>
  );
}

function PreviewCards({ business }: { business: DemoBusinessConfig }) {
  const cards = [
    {
      title: "Customer reply",
      description:
        business.key === "well-water"
          ? "Asks for address, current water status, and system details."
          : "Asks for fleet size, vehicle types, locations, wash window, and site notes.",
      icon: MessageSquareReply,
      tone: "emerald"
    },
    {
      title: "Owner alert",
      description:
        business.key === "well-water"
          ? "Escalates no-water, pressure, and commercial requests."
          : "Flags recurring account opportunities and route-friendly quote handoffs.",
      icon: BellRing,
      tone: "violet"
    },
    {
      title: "Dashboard update",
      description: "Logs the lead, priority, tags, recommendation, and follow-up status.",
      icon: ClipboardList,
      tone: "blue"
    }
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <GlassPanel key={card.title} className="p-4">
            <Icon
              className={cn(
                "mb-4 h-5 w-5",
                card.tone === "emerald" && "text-emerald-400",
                card.tone === "violet" && "text-violet-400",
                card.tone === "blue" && "text-blue-400"
              )}
              aria-hidden="true"
            />
            <p className="font-heading text-sm text-white">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{card.description}</p>
          </GlassPanel>
        );
      })}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-zinc-800/40 px-6 py-14 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-6 shadow-2xl shadow-black/30 md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(52,199,89,0.16),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(50,139,255,0.16),transparent_34%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Ready for your business?</p>
              <h2 className="mt-3 font-heading text-3xl tracking-tight text-white md:text-4xl">
                Want this built for your business?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                Send your lead sources, tools, package interest, and timeline so SignalOpsAI can scope where Envo should start.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.previewCtaClicked}
                eventProperties={{ location: "demo_final_cta" }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={getEmailHref()}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "demo_final_cta", type: "email" }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-700 px-7 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {EMAIL_CTA.shortLabel}
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  description,
  eyebrow,
  title
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl leading-tight tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{description}</p>
    </div>
  );
}

function GlassPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-800/70 bg-zinc-900/60 shadow-2xl shadow-black/18 backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-800/50 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-heading text-lg text-white">{value}</p>
    </div>
  );
}
