"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Radar } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import styles from "./mobile-test-2.module.css";

const industries = ["Fleet Wash", "Auto Shop", "Detailer", "Med Spa", "Home Services"];
const leadSources = ["Website form", "Missed calls", "Instagram DMs", "Quote requests", "Facebook leads"];
const biggestLeaks = ["Slow replies", "No follow-up", "Bad intake", "No booking handoff", "Scattered lead notes"];

const industryOutputs: Record<
  string,
  {
    flow: string;
    questions: string;
    handoff: string;
  }
> = {
  "Fleet Wash": {
    flow: "Account intake for fleet size, vehicle types, locations, service frequency, and route window.",
    questions: "Fleet size, vehicle mix, sites, wash cadence, water access, after-hours need.",
    handoff: "Route recurring account opportunities to the owner with a clear quote path."
  },
  "Auto Shop": {
    flow: "Repair request intake with urgency, symptoms, vehicle details, and appointment readiness.",
    questions: "Year, make, model, issue, warning lights, drivability, preferred appointment window.",
    handoff: "Push urgent safety issues and ready-to-book customers to the service desk."
  },
  Detailer: {
    flow: "Package-fit intake for detail, ceramic, tint, correction, and maintenance requests.",
    questions: "Vehicle type, service interest, condition, photos, timing, pickup or drop-off.",
    handoff: "Summarize package fit and upsell opportunities before booking."
  },
  "Med Spa": {
    flow: "Consultation intake with treatment interest, timeline, intake rules, and review handoff.",
    questions: "Treatment goal, timing, prior services, contact preference, consult availability.",
    handoff: "Route sensitive or unsure answers to the team before scheduling."
  },
  "Home Services": {
    flow: "Estimate intake with service area, urgency, project type, photos, and property details.",
    questions: "Address or ZIP, issue, photos, urgency, access notes, ideal appointment window.",
    handoff: "Escalate emergencies and route ready estimates to calendar or callback."
  }
};

export function LeadLeakPreviewBuilder() {
  const [industry, setIndustry] = useState(industries[0]);
  const [leadSource, setLeadSource] = useState(leadSources[1]);
  const [biggestLeak, setBiggestLeak] = useState(biggestLeaks[0]);

  const output = useMemo(() => industryOutputs[industry], [industry]);

  const previewRows = [
    ["Recommended AI receptionist flow", output.flow],
    ["Lead intake questions", output.questions],
    ["Follow-up sequence", `${leadSource} + ${biggestLeak.toLowerCase()} recovery path with reminders and owner alerts.`],
    ["Booking handoff", output.handoff],
    ["Dashboard view", "Lead source, priority, missing info, next action, and follow-up status."]
  ];

  return (
    <section className={cn(styles.scannerCard, "mx-auto w-full max-w-7xl rounded-[2rem] border p-4 sm:p-6")} aria-labelledby="preview-builder-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>Interactive-style scanner</p>
          <h2 id="preview-builder-title" className="mt-2 text-3xl font-black leading-tight tracking-normal text-white sm:text-5xl">
            Build your preview
          </h2>
          <p className={cn(styles.heroCopy, "mt-3 max-w-2xl text-sm leading-7")}>
            Pick the business, lead source, and leak. SignalOps turns that into a previewable response system.
          </p>
        </div>
        <div className={cn(styles.miniPill, "hidden rounded-full border px-3 py-2 text-xs font-black sm:inline-flex")}>
          Preview engine
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <ChipGroup label="Industry" options={industries} value={industry} onSelect={setIndustry} />
          <ChipGroup label="Lead sources" options={leadSources} value={leadSource} onSelect={setLeadSource} />
          <ChipGroup label="Biggest leak" options={biggestLeaks} value={biggestLeak} onSelect={setBiggestLeak} />
        </div>

        <div className={cn(styles.outputCard, "rounded-[1.5rem] border p-4")}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={cn(styles.sectionEyebrow, "text-xs font-black uppercase")}>SignalOps preview output</p>
              <h3 className="mt-1 text-2xl font-black tracking-normal text-white">{industry} leak system</h3>
            </div>
            <Radar className={cn(styles.accent, "size-7 shrink-0")} aria-hidden="true" />
          </div>

          <div className="mt-4 grid gap-2">
            {previewRows.map(([label, copy]) => (
              <div key={label} className={cn(styles.outputRow, "rounded-2xl border p-3")}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={cn(styles.accent, "mt-0.5 size-4 shrink-0")} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-black text-white">{label}</p>
                    <p className={cn(styles.heroCopy, "mt-1 text-xs leading-5")}>{copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_test_2_builder" }}
            className={cn(styles.primaryButton, "mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition")}
          >
            Run My Free Lead Leak Scan
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

function ChipGroup({
  label,
  onSelect,
  options,
  value
}: {
  label: string;
  onSelect: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <div>
      <p className={cn(styles.chipLabel, "mb-2 text-xs font-black uppercase")}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              styles.chip,
              option === value ? styles.chipActive : undefined,
              "rounded-full border px-3 py-2 text-sm font-black transition"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
