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
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { EMAIL_CTA, getEmailHref, PRIMARY_CTA } from "@/lib/constants";
import type { DemoBusinessConfig } from "@/lib/demo-businesses";
import { DemoLeadForm } from "./demo-lead-form";

const timeline = [
  { label: "Inquiry", icon: MessageSquareReply },
  { label: "Envo reply", icon: Zap },
  { label: "Details", icon: SearchCheck },
  { label: "Follow-up", icon: Route },
  { label: "Booked", icon: CalendarCheck2 }
];

export function RouteWashDemoSite({ business }: { business: DemoBusinessConfig }) {
  return (
    <div className="cinematic-panel overflow-hidden rounded-[1.35rem] border border-white/16 bg-white/[0.06] shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:rounded-[2.25rem]">
      <section className="relative overflow-hidden px-4 py-8 sm:px-9 sm:py-14 lg:px-11">
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-[#ff6f9c]/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-[#ffb36d]/14 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <Badge className="border border-[#ff9ec0]/22 bg-white/8 text-[#ffd7e6]">
              {business.heroBadge}
            </Badge>
            <h1 className="mt-5 max-w-3xl text-[2.15rem] font-semibold leading-[0.98] tracking-normal text-white sm:mt-6 sm:text-6xl">
              {business.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#ead0df]/76 sm:text-lg">
              {business.subheadline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#demo-lead-form" className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}>
                {business.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <TrackedLink
                href={business.secondaryHref}
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "demo_service_plans" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/20 bg-white/[0.045] sm:w-auto`}
              >
                {business.secondaryCta}
              </TrackedLink>
              <TrackedLink
                href={getEmailHref()}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "demo_hero", type: "email" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/20 bg-white/[0.045] sm:w-auto`}
              >
                <Mail className="size-4" aria-hidden="true" />
                {EMAIL_CTA.label}
              </TrackedLink>
            </div>
          </div>

          <DemoWorkflowPanel business={business} />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#17122d]/42 px-5 py-6 sm:px-9 lg:px-11">
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {business.trustBadges.map((badge) => (
            <div key={badge} className="hover-lift rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white">
              {badge}
            </div>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          {timeline.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="hover-lift relative rounded-2xl border border-white/12 bg-white/[0.05] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]">
                    <Icon className="size-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[#ead0df]/58">0{index + 1}</p>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="service-plans" className="grid gap-5 border-b border-white/10 px-5 py-8 sm:px-9 lg:grid-cols-[0.72fr_1.28fr] lg:px-11">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
            {business.servicesSection.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-white">
            {business.servicesSection.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#ead0df]/72">
            {business.servicesSection.description}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {business.services.slice(0, 6).map((service) => (
            <article key={service.title} className="hover-lift rounded-2xl border border-white/12 bg-white/[0.045] p-4">
              <Truck className="mb-4 size-5 text-[#ffb36d]" aria-hidden="true" />
              <h3 className="font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#ead0df]/70">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 border-b border-white/10 px-5 py-8 sm:px-9 lg:grid-cols-2 lg:px-11">
        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.055] p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
            {business.commonIssues.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{business.commonIssues.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#ead0df]/72">{business.commonIssues.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {business.commonIssues.items.map((item) => (
              <span key={item} className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-[#f6e8f0]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#ffb36d]/20 bg-[#ffb36d]/10 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffe1bd]">
            {business.process.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">{business.process.title}</h2>
          <div className="mt-5 grid gap-3">
            {business.process.steps.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[2.2rem_1fr] gap-3 rounded-2xl border border-white/12 bg-[#17122d]/46 p-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-[#17122d]">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-5 text-[#ead0df]/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 px-5 py-8 sm:px-9 lg:grid-cols-[0.95fr_1.05fr] lg:px-11">
        <div id="demo-lead-form">
          <DemoLeadForm key={business.key} business={business} />
        </div>
        <div className="grid gap-5">
          <WhatThisShows business={business} />
          <AccountValuePanel business={business} />
          <PreviewCards business={business} />
        </div>
      </section>

      <section className="px-5 pb-5 sm:px-9 sm:pb-9 lg:px-11">
        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.075] p-5 shadow-2xl shadow-black/18 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
                Ready for your business?
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white">
                Want this built for your business?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#ead0df]/76">
                Send your lead sources, tools, package interest, and timeline so SignalOpsAI can scope where Envo should start.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.auditCtaClicked}
                eventProperties={{ location: "demo_final_cta" }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto lg:w-full xl:w-auto`}
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={getEmailHref()}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "demo_final_cta", type: "email" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto lg:w-full xl:w-auto`}
              >
                <Mail className="size-4" aria-hidden="true" />
                {EMAIL_CTA.label}
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DemoWorkflowPanel({ business }: { business: DemoBusinessConfig }) {
  const primary = business.qualificationPreview.cards[0];
  const secondary = business.qualificationPreview.cards[1];

  return (
    <div className="relative">
      <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_70%_20%,rgba(255,111,156,0.36),transparent_36%),radial-gradient(circle_at_40%_78%,rgba(255,179,109,0.18),transparent_34%)] blur-2xl" />
      <div className="cinematic-panel relative overflow-hidden rounded-[1.6rem] border border-white/14 bg-[#17122d]/82 shadow-2xl shadow-black/25 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">Envo command workspace</p>
            <p className="text-xs text-[#ead0df]/52">{business.industry}</p>
          </div>
          <Badge className="border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">Demo mode</Badge>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          <Metric label="Response" value="4.3s" />
          <Metric label="Priority" value={business.key === "well-water" ? "Hot" : "Warm"} />
          <Metric label="Next action" value="Reply" />
        </div>
        <div className="grid gap-3 p-4 pt-0 md:grid-cols-[1fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Incoming lead</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{primary?.title ?? "New request"}</h2>
            <p className="mt-3 text-sm leading-6 text-[#ead0df]/72">{primary?.description ?? business.qualificationPreview.subtitle}</p>
          </div>
          <div className="rounded-2xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd7e6]">Internal note</p>
            <p className="mt-3 text-sm leading-6 text-white">{secondary?.description ?? "Route with a clean summary and next step."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountValuePanel({ business }: { business: DemoBusinessConfig }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]">
          <MapPin className="size-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{business.beforeAfter.title}</h2>
          <p className="text-sm text-[#ead0df]/58">{business.beforeAfter.eyebrow}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#ead0df]/72">{business.beforeAfter.description}</p>
      {business.beforeAfter.visualCards ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {business.beforeAfter.visualCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-white/10 bg-[#17122d]/62 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/52">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
              <p className="mt-1 text-xs leading-5 text-[#ead0df]/62">{card.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function WhatThisShows({ business }: { business: DemoBusinessConfig }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)]">
          <Sparkles className="size-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">What this demo shows</h2>
          <p className="text-sm text-[#ead0df]/58">{business.selectorLabel}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {business.leadOpsPanel.items.slice(0, 4).map((item) => (
          <div key={item.title} className="rounded-xl border border-white/10 bg-[#17122d]/62 p-4">
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-[#ead0df]/70">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCards({ business }: { business: DemoBusinessConfig }) {
  const cards = [
    {
      title: "Customer reply",
      description: business.key === "well-water"
        ? "Asks for address, current water status, and system details."
        : "Asks for fleet size, vehicle types, locations, wash window, and site notes.",
      icon: MessageSquareReply
    },
    {
      title: "Owner alert",
      description: business.key === "well-water"
        ? "Escalates no-water, pressure, and commercial requests."
        : "Flags recurring account opportunities and route-friendly quote handoffs.",
      icon: BellRing
    },
    {
      title: "Dashboard update",
      description: "Logs the lead, priority, tags, recommendation, and follow-up status.",
      icon: ClipboardList
    }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="rounded-2xl border border-white/12 bg-white/[0.045] p-4">
            <Icon className="mb-4 size-5 text-[#ffb36d]" aria-hidden="true" />
            <p className="font-semibold text-white">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#ead0df]/70">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.055] p-3">
      <p className="text-xs text-[#ead0df]/58">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
