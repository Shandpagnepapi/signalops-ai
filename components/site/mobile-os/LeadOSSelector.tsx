"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CalendarDays, Flame, Sparkles, Workflow } from "lucide-react";
import { AppointmentFlowOSMockup } from "@/components/site/mobile-os/AppointmentFlowOSMockup";
import { QuoteIntakeOSMockup } from "@/components/site/mobile-os/QuoteIntakeOSMockup";
import { UrgentResponseOSMockup } from "@/components/site/mobile-os/UrgentResponseOSMockup";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LeadOsKey = "quote" | "appointment" | "urgent";

type LeadOsOption = {
  activeClass: string;
  bestFor: string;
  chip: string;
  handles: string;
  icon: LucideIcon;
  key: LeadOsKey;
  name: string;
  output: string;
};

const leadOsOptions: LeadOsOption[] = [
  {
    activeClass: "border-[#ffb36d]/36 bg-[#ffb36d]/14 text-[#ffe1bd] shadow-pink-950/24",
    bestFor: "Quote requests",
    chip: "Quotes",
    handles: "Fleet details, route notes, owner alerts",
    icon: Workflow,
    key: "quote",
    name: "Quote Intake OS",
    output: "Quote handoff"
  },
  {
    activeClass: "border-sky-300/40 bg-sky-300/15 text-sky-50 shadow-sky-950/30",
    bestFor: "Consultations",
    chip: "Appointments",
    handles: "Service interest, timing, reminders",
    icon: CalendarDays,
    key: "appointment",
    name: "Appointment Flow OS",
    output: "Booking handoff"
  },
  {
    activeClass: "border-amber-300/45 bg-amber-300/15 text-amber-50 shadow-amber-950/30",
    bestFor: "Urgent calls",
    chip: "Urgent Calls",
    handles: "Issue, address, priority alert",
    icon: Flame,
    key: "urgent",
    name: "Urgent Response OS",
    output: "Callback handoff"
  }
];

export function LeadOSSelector() {
  const [activeKey, setActiveKey] = useState<LeadOsKey>("quote");
  const active = leadOsOptions.find((option) => option.key === activeKey) ?? leadOsOptions[0];

  return (
    <section className="px-4 py-8" aria-labelledby="mobile-lead-os-title">
      <div className="mx-auto max-w-[23rem]">
        <div className="rounded-[2rem] border border-white/14 bg-white/[0.085] p-4 shadow-2xl shadow-black/22">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#ffb36d]">Choose Your Lead OS</p>
              <h2 id="mobile-lead-os-title" className="mt-2 text-2xl font-black leading-tight tracking-normal text-white">
                What kind of lead system does your business need?
              </h2>
            </div>
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ffb36d]/12 text-[#ffb36d]">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/62">
            Switch between operating systems and see the kind of interface SignalOps can shape around your lead flow.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2" role="tablist" aria-label="Lead operating system options">
            {leadOsOptions.map((option) => {
              const Icon = option.icon;
              const isActive = active.key === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`lead-os-panel-${option.key}`}
                  onClick={() => setActiveKey(option.key)}
                  className={cn(
                    "relative min-h-[4.75rem] overflow-hidden rounded-[1.25rem] border p-3 text-left shadow-lg transition duration-200",
                    isActive ? option.activeClass : "border-white/10 bg-[#100818]/46 text-white/58 shadow-black/12"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-x-4 top-2 h-0.5 rounded-full transition",
                      isActive ? "bg-current opacity-80" : "bg-transparent opacity-0"
                    )}
                  />
                  <Icon className="mb-2 size-4" aria-hidden="true" />
                  <span className="block text-[0.7rem] font-black leading-3">{option.chip}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id={`lead-os-panel-${active.key}`} role="tabpanel" className="mt-4 transition duration-200">
          {active.key === "quote" ? <QuoteIntakeOSMockup /> : null}
          {active.key === "appointment" ? <AppointmentFlowOSMockup /> : null}
          {active.key === "urgent" ? <UrgentResponseOSMockup /> : null}
        </div>

        <IdentityStrip active={active} />

        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: `mobile_lead_os_${active.key}` }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ff9f75_46%,#ffb36d)] px-5 text-sm font-black text-white shadow-xl shadow-pink-950/25"
        >
          Show Me My OS
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}

function IdentityStrip({ active }: { active: LeadOsOption }) {
  const items = [
    ["Best for", active.bestFor],
    ["Handles", active.handles],
    ["Output", active.output]
  ];

  return (
    <div className="mt-3 rounded-[1.4rem] border border-white/12 bg-white/[0.075] p-3">
      <div className="grid gap-2">
        {items.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[4.7rem_1fr] gap-3 rounded-2xl border border-white/10 bg-[#100818]/36 px-3 py-2.5">
            <p className="text-[0.64rem] font-black uppercase tracking-wide text-white/38">{label}</p>
            <p className="text-xs font-bold leading-5 text-white/78">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
