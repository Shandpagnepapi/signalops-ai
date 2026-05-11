"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, CheckCircle2, CircleDollarSign, Info, Mail, TrendingUp } from "lucide-react";
import { BreakEvenCalculator } from "@/components/site/break-even-calculator";
import { ProductFrame, StatusPill } from "@/components/site/signalops-gui";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { EMAIL_CTA, getEmailHref, PACKAGE_NAMES, PRIMARY_CTA } from "@/lib/constants";

type CalculatorInputs = {
  monthlyLeads: number;
  averageCustomerValue: number;
  currentCloseRate: number;
  missedLeadPercentage: number;
  expectedImprovementPercentage: number;
  monthlySignalOpsCost: number;
};

type SuggestedPackage = {
  name: string;
  reason: string;
};

const initialInputs: CalculatorInputs = {
  monthlyLeads: 120,
  averageCustomerValue: 1200,
  currentCloseRate: 28,
  missedLeadPercentage: 20,
  expectedImprovementPercentage: 25,
  monthlySignalOpsCost: 500
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1
  }).format(value);
}

function formatPercent(value: number) {
  return `${formatNumber(value)}%`;
}

function getSuggestedPackage(inputs: CalculatorInputs, recoveredRevenue: number): SuggestedPackage {
  if (inputs.monthlyLeads <= 70 || recoveredRevenue <= 2500) {
    return {
      name: PACKAGE_NAMES[0]?.name ?? "Starter",
      reason: "Good fit when lead volume is moderate and you want one clean response + follow-up system first."
    };
  }

  if (inputs.monthlyLeads <= 200 || recoveredRevenue <= 10000) {
    return {
      name: PACKAGE_NAMES[1]?.name ?? "Growth",
      reason: "Best fit when multiple lead sources need smarter intake, routing, and repeatable follow-up."
    };
  }

  return {
    name: PACKAGE_NAMES[2]?.name ?? "Custom",
    reason: "Best fit for higher-volume teams that need deeper automation, integrations, and custom workflows."
  };
}

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function RoiCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);

  function updateInput<Key extends keyof CalculatorInputs>(key: Key, value: string) {
    const parsed = parseNumber(value);

    setInputs((current) => {
      if (key === "currentCloseRate" || key === "missedLeadPercentage" || key === "expectedImprovementPercentage") {
        return {
          ...current,
          [key]: clamp(parsed, 0, 100)
        };
      }

      return {
        ...current,
        [key]: clamp(parsed, 0, 1000000)
      };
    });
  }

  const results = useMemo(() => {
    const closeRate = inputs.currentCloseRate / 100;
    const missedLeadRate = inputs.missedLeadPercentage / 100;
    const improvementRate = inputs.expectedImprovementPercentage / 100;

    const estimatedMissedLeads = inputs.monthlyLeads * missedLeadRate;
    const estimatedCurrentMissedRevenue = estimatedMissedLeads * closeRate * inputs.averageCustomerValue;

    const estimatedRecoveredLeads = estimatedMissedLeads * improvementRate;
    const estimatedRecoveredRevenue = estimatedRecoveredLeads * closeRate * inputs.averageCustomerValue;

    const estimatedRoi =
      inputs.monthlySignalOpsCost > 0
        ? ((estimatedRecoveredRevenue - inputs.monthlySignalOpsCost) / inputs.monthlySignalOpsCost) * 100
        : 0;
    const estimatedBreakEvenJobs =
      inputs.averageCustomerValue > 0 ? inputs.monthlySignalOpsCost / inputs.averageCustomerValue : 0;

    const suggestedPackage = getSuggestedPackage(inputs, estimatedRecoveredRevenue);

    return {
      estimatedCurrentMissedRevenue,
      estimatedRecoveredLeads,
      estimatedRecoveredRevenue,
      estimatedRoi,
      estimatedBreakEvenJobs,
      suggestedPackage
    };
  }, [inputs]);

  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,111,156,0.14),rgba(6,12,24,0))]">
        <div className="surface-grid mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-[#ff6f9c]/14 text-[#ffd7e6]">ROI calculator</Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
              Estimate how much slow response and weak follow-up may be costing you.
            </h1>
            <p className="mt-4 text-base leading-7 text-[#ead0df]/78">
              Use conservative inputs to model missed revenue, likely recovered leads, and whether a SignalOps package could make financial sense.
            </p>
          </div>

          <div className="rounded-2xl border border-[#ff9ec0]/20 bg-[#17122d]/78 p-5 shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold text-white">What this estimates</p>
            <div className="mt-4 grid gap-3">
              {[
                "How many leads may be slipping between inquiry and follow-up",
                "How much revenue could be recovered from cleaner response habits",
                "Which package is most realistic for your current lead volume"
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  <p className="text-sm leading-6 text-[#ead0df]/78">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <ProductFrame accent="pink" eyebrow="Inputs" title="Business assumptions">
          <div className="mb-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="size-4 text-[#ffc0d5]" aria-hidden="true" />
              <p className="text-sm font-semibold text-white">Use conservative numbers</p>
            </div>
            <StatusPill accent="pink">Live</StatusPill>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Monthly leads"
              type="number"
              min={0}
              value={inputs.monthlyLeads}
              onChange={(value) => updateInput("monthlyLeads", value)}
            />
            <InputField
              label="Average customer value ($)"
              type="number"
              min={0}
              value={inputs.averageCustomerValue}
              onChange={(value) => updateInput("averageCustomerValue", value)}
            />
            <InputField
              label="Current close rate (%)"
              type="number"
              min={0}
              max={100}
              value={inputs.currentCloseRate}
              onChange={(value) => updateInput("currentCloseRate", value)}
            />
            <InputField
              label="Estimated missed lead percentage (%)"
              type="number"
              min={0}
              max={100}
              value={inputs.missedLeadPercentage}
              onChange={(value) => updateInput("missedLeadPercentage", value)}
            />
            <InputField
              label="Expected improvement percentage (%)"
              type="number"
              min={0}
              max={100}
              value={inputs.expectedImprovementPercentage}
              onChange={(value) => updateInput("expectedImprovementPercentage", value)}
            />
            <InputField
              label="Monthly SignalOps cost ($)"
              type="number"
              min={0}
              value={inputs.monthlySignalOpsCost}
              onChange={(value) => updateInput("monthlySignalOpsCost", value)}
            />
          </div>
        </ProductFrame>

        <ProductFrame accent="emerald" eyebrow="Estimated outputs" title="Recovery picture">
          <div className="mb-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="size-4 text-emerald-200" aria-hidden="true" />
              <p className="text-sm font-semibold text-white">Live result card</p>
            </div>
            <StatusPill accent="emerald">Estimate</StatusPill>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <OutputTile
              label="Estimated current missed revenue"
              value={formatCurrency(results.estimatedCurrentMissedRevenue)}
            />
            <OutputTile
              label="Estimated recovered leads"
              value={formatNumber(results.estimatedRecoveredLeads)}
            />
            <OutputTile
              label="Estimated recovered revenue"
              value={formatCurrency(results.estimatedRecoveredRevenue)}
            />
            <OutputTile
              label="Estimated ROI"
              value={formatPercent(results.estimatedRoi)}
              tone={results.estimatedRoi >= 0 ? "positive" : "neutral"}
            />
            <OutputTile
              label="Jobs to cover monthly cost"
              value={`${formatNumber(results.estimatedBreakEvenJobs)} jobs`}
            />
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#17122d]/60 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#ead0df]/42">Suggested package</p>
            <p className="mt-2 text-lg font-semibold text-white">{results.suggestedPackage.name}</p>
            <p className="mt-2 text-sm leading-6 text-[#ead0df]/78">{results.suggestedPackage.reason}</p>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-300/18 bg-emerald-300/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-emerald-50">Recovered opportunity visual</p>
              <span className="text-sm font-semibold text-white">
                {formatNumber(results.estimatedRecoveredLeads)} leads
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-950/60">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#37f0bd,#dfff5f)]"
                style={{ width: `${clamp(results.estimatedRecoveredLeads * 8, 6, 100)}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-emerald-50/68">
              This shows the portion of missed opportunities your assumptions say could be brought back into conversation.
            </p>
          </div>

          <p className="mt-5 text-sm leading-6 text-[#fff1f7]">
            This calculator is an estimate only. Actual results depend on your offer, market, sales process,
            response quality, and follow-up.
          </p>

          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.auditCtaClicked}
            eventProperties={{ location: "roi_calculator" }}
            className={`${buttonVariants({ size: "lg" })} mt-6 w-full sm:w-auto`}
          >
            {PRIMARY_CTA.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href={getEmailHref({
              subject: "SignalOps ROI Calculator Inquiry",
              body: "Hi SignalOps, I used the ROI calculator and want help with lead response and follow-up.\n\nBusiness name:\nWebsite:\nIndustry:\nPackage I'm considering:\nWhat I need help with:"
            })}
            eventName={ANALYTICS_EVENTS.contactClicked}
            eventProperties={{ location: "roi_calculator", type: "email" }}
            className={`${buttonVariants({ variant: "outline", size: "lg" })} mt-3 w-full border-white/18 bg-white/[0.045] sm:ml-3 sm:w-auto`}
          >
            <Mail className="size-4" aria-hidden="true" />
            {EMAIL_CTA.label}
          </TrackedLink>
        </ProductFrame>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <BreakEvenCalculator defaultAverageValue={inputs.averageCustomerValue} />
      </section>

      <section className="mx-auto mb-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#17122d]/68 p-6" aria-labelledby="roi-math">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-[#ffca91]" aria-hidden="true" />
            <h2 id="roi-math" className="text-lg font-semibold text-white">
              How the math works
            </h2>
          </div>
          <p className="text-sm leading-7 text-[#ead0df]/78">
            1) Estimated missed leads = monthly leads x missed lead percentage.
            2) Estimated current missed revenue = estimated missed leads x current close rate x average customer value.
            3) Estimated recovered leads = estimated missed leads x expected improvement percentage.
            4) Estimated recovered revenue = estimated recovered leads x current close rate x average customer value.
            5) Estimated ROI = (estimated recovered revenue - monthly SignalOps cost) / monthly SignalOps cost.
          </p>
          <p className="mt-3 flex gap-2 text-sm leading-6 text-[#ead0df]/62">
            <Info className="mt-0.5 size-4 shrink-0 text-[#ead0df]/42" aria-hidden="true" />
            We use your current close rate in both baseline and recovered scenarios to keep the estimate conservative.
          </p>
        </div>
      </section>
    </div>
  );
}

function InputField({
  label,
  type,
  min,
  max,
  value,
  onChange
}: {
  label: string;
  type: "number";
  min: number;
  max?: number;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#f2d9e8]">
      {label}
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-input bg-[#17122d]/70 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}

function OutputTile({
  label,
  value,
  tone = "neutral"
}: {
  label: string;
  value: string;
  tone?: "neutral" | "positive";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#17122d]/60 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#ead0df]/42">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${tone === "positive" ? "text-emerald-200" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
