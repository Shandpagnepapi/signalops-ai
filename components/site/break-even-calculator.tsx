"use client";

import { useMemo, useState } from "react";
import { Calculator, CircleDollarSign, Info, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const packageOptions = [
  {
    name: "Starter",
    monthly: 250,
    setup: 750,
    note: "One main lead source, faster replies, simple intake, and owner handoff."
  },
  {
    name: "Growth",
    monthly: 500,
    setup: 1500,
    note: "Multiple lead sources, follow-up, routing, and dashboard visibility."
  },
  {
    name: "Custom",
    monthly: 1000,
    setup: 5000,
    note: "From $1,000/mo. Final custom pricing depends on scope."
  }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatJobs(value: number) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value < 10 ? 1 : 0
  }).format(Math.max(value, 0));
}

function parseCurrencyInput(value: string) {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function BreakEvenCalculator({
  className,
  defaultAverageValue = 250,
  defaultUnitLabel = "jobs"
}: {
  className?: string;
  defaultAverageValue?: number;
  defaultUnitLabel?: string;
}) {
  const [averageValue, setAverageValue] = useState(defaultAverageValue);
  const [unitLabel, setUnitLabel] = useState(defaultUnitLabel);
  const [selectedPackageName, setSelectedPackageName] = useState("Growth");

  const selectedPackage =
    packageOptions.find((option) => option.name === selectedPackageName) ?? packageOptions[1];

  const result = useMemo(() => {
    const safeAverageValue = Math.max(averageValue, 1);
    const monthlyUnits = selectedPackage.monthly / safeAverageValue;
    const setupUnits = selectedPackage.setup / safeAverageValue;

    return {
      monthlyUnits,
      setupUnits,
      safeAverageValue
    };
  }, [averageValue, selectedPackage]);

  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-[#ffb36d]/18 bg-[radial-gradient(circle_at_15%_0%,rgba(255,111,156,0.16),transparent_35%),rgba(255,179,109,0.07)] p-5 shadow-2xl shadow-black/18",
        className
      )}
      aria-labelledby="break-even-heading"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] shadow-lg shadow-pink-950/20">
              <Calculator className="size-5 text-white" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb36d]">
              Quick value check
            </p>
          </div>
          <h2 id="break-even-heading" className="mt-4 text-2xl font-semibold tracking-normal text-white sm:text-3xl">
            See how many jobs cover SignalOps.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#ead0df]/76">
            Put in what one typical service or account is worth. We will translate the package into a simple break-even number, like how many jobs, accounts, or appointments cover the monthly investment.
          </p>
          <p className="mt-2 text-xs leading-5 text-[#ead0df]/54">
            For a fleet wash company, use your average monthly account value and type accounts as the sale label.
          </p>
        </div>

        <div className="rounded-2xl border border-white/12 bg-[#17122d]/66 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-[#f2d9e8] sm:col-span-1">
              Package
              <select
                value={selectedPackageName}
                onChange={(event) => setSelectedPackageName(event.target.value)}
                className="h-11 rounded-xl border border-white/12 bg-[#17122d]/80 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {packageOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#f2d9e8]">
              Average service value
              <input
                type="number"
                min="1"
                value={averageValue}
                onChange={(event) => setAverageValue(parseCurrencyInput(event.target.value))}
                className="h-11 rounded-xl border border-white/12 bg-[#17122d]/80 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#f2d9e8]">
              What to call one sale
              <input
                value={unitLabel}
                onChange={(event) => setUnitLabel(event.target.value)}
                placeholder="jobs, accounts, appointments"
                className="h-11 rounded-xl border border-white/12 bg-[#17122d]/80 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2 text-[#ffe1bd]">
                <CircleDollarSign className="size-4" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">Monthly support</p>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">
                {formatJobs(result.monthlyUnits)} {unitLabel || "jobs"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#ead0df]/70">
                {formatCurrency(selectedPackage.monthly)} per month at {formatCurrency(result.safeAverageValue)} per {unitLabel || "job"}.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2 text-[#ffd7e6]">
                <TrendingUp className="size-4" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">Setup/build fee</p>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">
                {formatJobs(result.setupUnits)} {unitLabel || "jobs"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#ead0df]/70">
                {formatCurrency(selectedPackage.setup)} starting build fee as a one-time benchmark.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#ffb36d]/18 bg-[#ffb36d]/8 p-3 text-sm leading-6 text-[#ffe1bd]">
            If one {unitLabel || "job"} is worth {formatCurrency(result.safeAverageValue)}, {selectedPackage.name} needs about{" "}
            <span className="font-semibold text-white">{formatJobs(result.monthlyUnits)} {unitLabel || "jobs"} per month</span>{" "}
            to cover monthly support.
          </div>
          <p className="mt-3 flex gap-2 text-xs leading-5 text-[#ead0df]/52">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Break-even math is a simple planning estimate. It does not guarantee revenue, bookings, or profit.
          </p>
        </div>
      </div>
    </section>
  );
}
