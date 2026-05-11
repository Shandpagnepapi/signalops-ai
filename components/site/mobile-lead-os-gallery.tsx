"use client";

import { useState, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  CalendarDays,
  Camera,
  FileText,
  Flame,
  Home,
  MapPin,
  MessageCircle,
  PhoneCall,
  RefreshCcw,
  Sparkles,
  UserRoundCheck,
  Wrench
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LeadOsKey = "quote" | "appointment" | "urgent";

type LeadOsOption = {
  key: LeadOsKey;
  chip: string;
  name: string;
  bestFor: string;
  icon: LucideIcon;
  accent: string;
  activeClass: string;
  surfaceClass: string;
  glow: string;
};

const leadOsOptions: LeadOsOption[] = [
  {
    key: "quote",
    chip: "Quotes",
    name: "Quote Intake OS",
    bestFor: "Wheel repair, detailers, tint/wrap, contractors, quote-based services.",
    icon: FileText,
    accent: "text-emerald-200",
    activeClass: "border-emerald-300/40 bg-emerald-300/15 text-emerald-50",
    surfaceClass: "border-emerald-300/18 bg-emerald-300/[0.08]",
    glow: "radial-gradient(circle at 12% 8%, rgba(52,211,153,0.26), transparent 10rem)"
  },
  {
    key: "appointment",
    chip: "Appointments",
    name: "Appointment Flow OS",
    bestFor: "Med spas, consultations, clinics, wellness, and booking-based services.",
    icon: CalendarDays,
    accent: "text-sky-200",
    activeClass: "border-sky-300/40 bg-sky-300/15 text-sky-50",
    surfaceClass: "border-sky-300/18 bg-sky-300/[0.08]",
    glow: "radial-gradient(circle at 88% 0%, rgba(125,211,252,0.24), transparent 10rem)"
  },
  {
    key: "urgent",
    chip: "Urgent Calls",
    name: "Urgent Response OS",
    bestFor: "HVAC, plumbing, restoration, emergency service, and time-sensitive teams.",
    icon: Flame,
    accent: "text-amber-200",
    activeClass: "border-amber-300/40 bg-amber-300/15 text-amber-50",
    surfaceClass: "border-amber-300/18 bg-amber-300/[0.08]",
    glow: "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.24), transparent 10rem)"
  }
];

export function MobileLeadOsGallery() {
  const [activeKey, setActiveKey] = useState<LeadOsKey>("quote");
  const active = leadOsOptions.find((option) => option.key === activeKey) ?? leadOsOptions[0];
  const ActiveIcon = active.icon;

  return (
    <section className="px-4 py-8" aria-labelledby="mobile-lead-os-title">
      <div className="mx-auto max-w-[23rem]">
        <p className="text-xs font-black uppercase tracking-wide text-lime-300">Choose Your Lead OS</p>
        <h2 id="mobile-lead-os-title" className="mt-2 text-2xl font-black leading-tight tracking-normal text-white">
          What kind of lead system does your business need?
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/62">
          Pick the closest flow and see what SignalOps can shape around your business.
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
                  "min-h-20 rounded-3xl border p-2 text-left transition",
                  isActive ? option.activeClass : "border-white/10 bg-white/10 text-white/56"
                )}
              >
                <Icon className="mb-2 size-4" aria-hidden="true" />
                <span className="block text-[0.72rem] font-black leading-4">{option.chip}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`lead-os-panel-${active.key}`}
          role="tabpanel"
          className={cn("mt-4 overflow-hidden rounded-[1.75rem] border p-3 shadow-2xl shadow-black/25", active.surfaceClass)}
          style={{ backgroundImage: active.glow }}
        >
          <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/82 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={cn("text-xs font-black uppercase tracking-wide", active.accent)}>Selected OS</p>
                <h3 className="mt-1 text-xl font-black leading-tight tracking-normal text-white">{active.name}</h3>
              </div>
              <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10", active.accent)}>
                <ActiveIcon className="size-5" aria-hidden="true" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/62">{active.bestFor}</p>

            <div className="mt-5">
              {active.key === "quote" ? <QuoteIntakeRendering /> : null}
              {active.key === "appointment" ? <AppointmentFlowRendering /> : null}
              {active.key === "urgent" ? <UrgentResponseRendering /> : null}
            </div>
          </div>
        </div>

        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: `mobile_lead_os_${active.key}` }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-lime-300 px-5 text-sm font-black text-slate-950 shadow-xl shadow-lime-300/15"
        >
          Show Me My OS
          <Sparkles className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </section>
  );
}

function QuoteIntakeRendering() {
  return (
    <div className="grid gap-3">
      <ChatLine tone="customer" label="Customer">
        I have curb rash on two wheels. Can you do mobile repair?
      </ChatLine>
      <ChatLine tone="ai" label="SignalOps">
        Yes. Send photos of both wheels and your vehicle details. I can get the quote started.
      </ChatLine>

      <div className="grid grid-cols-2 gap-2">
        <MiniField icon={Camera} label="Photos" value="Requested" />
        <MiniField icon={Wrench} label="Service" value="Curb rash" />
        <MiniField icon={BellRing} label="Owner alert" value="Ready" />
        <MiniField icon={RefreshCcw} label="Follow-up" value="Queued" />
      </div>

      <AlertCard tone="emerald" title="Quote handoff ready">
        Photos needed, mobile repair requested, service type selected, next action prepared.
      </AlertCard>
    </div>
  );
}

function AppointmentFlowRendering() {
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl border border-sky-300/16 bg-sky-300/10 p-3">
        <p className="text-xs font-black uppercase tracking-wide text-sky-100/70">Service inquiry</p>
        <p className="mt-2 text-sm leading-6 text-sky-50">
          New Botox consultation request. Prefers Friday afternoon. Wants price range and next opening.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Fri 2:00", "Fri 3:30", "Sat 10:00"].map((slot, index) => (
          <div
            key={slot}
            className={cn(
              "rounded-2xl border p-3 text-center",
              index === 1 ? "border-sky-300/35 bg-sky-300/15" : "border-white/10 bg-white/10"
            )}
          >
            <CalendarClock className="mx-auto mb-2 size-4 text-sky-200" aria-hidden="true" />
            <p className="text-[0.7rem] font-black text-white">{slot}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <FlowRow icon={MessageCircle} label="Smart questions" value="Service, timing, first visit" />
        <FlowRow icon={UserRoundCheck} label="Appointment-ready" value="Front desk handoff prepared" />
        <FlowRow icon={RefreshCcw} label="Reminder" value="No-book follow-up queued" />
      </div>

      <AlertCard tone="sky" title="Booking handoff ready">
        Preferred time, service interest, and next step are packaged for your team.
      </AlertCard>
    </div>
  );
}

function UrgentResponseRendering() {
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl border border-amber-300/18 bg-amber-300/10 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-amber-100/75">Urgent inquiry</p>
          <span className="rounded-full bg-amber-300/20 px-2.5 py-1 text-[0.65rem] font-black text-amber-50">
            Same-day
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-amber-50">
          AC stopped cooling. Home is occupied. Customer wants the earliest callback window.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <MiniField icon={MapPin} label="Address" value="Collected" />
        <MiniField icon={AlertTriangle} label="Urgency" value="High" />
        <MiniField icon={PhoneCall} label="Callback" value="15 min" />
        <MiniField icon={Home} label="Dispatch" value="Owner handoff" />
      </div>

      <div className="rounded-3xl border border-amber-300/18 bg-amber-300/10 p-3">
        <p className="flex items-center gap-2 text-sm font-black text-amber-50">
          <BellRing className="size-4" aria-hidden="true" />
          Priority alert
        </p>
        <p className="mt-2 text-xs leading-5 text-amber-50/72">
          Issue, address, urgency, callback path, and owner handoff are ready.
        </p>
      </div>
    </div>
  );
}

function ChatLine({ children, label, tone }: { children: ReactNode; label: string; tone: "customer" | "ai" }) {
  return (
    <div
      className={cn(
        "max-w-[92%] rounded-3xl p-3 text-sm leading-6",
        tone === "customer" ? "ml-auto bg-white text-slate-950" : "mr-auto border border-emerald-300/18 bg-emerald-300/10 text-emerald-50"
      )}
    >
      <p className={cn("text-xs font-black uppercase", tone === "customer" ? "text-slate-500" : "text-emerald-100/70")}>{label}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function MiniField({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
      <Icon className="size-4 text-lime-300" aria-hidden="true" />
      <p className="mt-3 text-[0.66rem] font-black uppercase tracking-wide text-white/42">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function FlowRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-300/10 text-sky-200">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-wide text-white/42">{label}</p>
        <p className="mt-0.5 text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function AlertCard({ children, title, tone }: { children: ReactNode; title: string; tone: "emerald" | "sky" }) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-3",
        tone === "emerald" ? "border-emerald-300/20 bg-emerald-300/10" : "border-sky-300/20 bg-sky-300/10"
      )}
    >
      <p className={cn("text-sm font-black", tone === "emerald" ? "text-emerald-100" : "text-sky-100")}>{title}</p>
      <p className={cn("mt-1 text-xs leading-5", tone === "emerald" ? "text-emerald-50/72" : "text-sky-50/72")}>{children}</p>
    </div>
  );
}
