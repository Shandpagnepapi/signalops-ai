"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { demoBusinessOptions, demoBusinesses, type DemoBusinessKey } from "@/lib/demo-businesses";
import { ApexWheelSite } from "./apex-wheel-site";

const selectClass =
  "h-11 w-full rounded-md border border-white/12 bg-slate-950 px-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9ec0] sm:w-80";

export function DemoBusinessSwitcher() {
  const [selectedBusiness, setSelectedBusiness] = useState<DemoBusinessKey>("wheel-repair");
  const business = demoBusinesses[selectedBusiness];

  return (
    <div className="bg-[#080a0f]">
      <section className="sticky top-[61px] z-40 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-[#ffb36d]/15 text-[#ffe1bd]">SignalOps client demo</Badge>
            <p className="text-sm text-slate-300">Choose a demo business</p>
          </div>
          <label className="grid gap-1 text-sm font-medium text-slate-200 sm:flex sm:items-center sm:gap-3">
            <span className="sr-only">Choose a demo business</span>
            <select
              value={selectedBusiness}
              onChange={(event) => setSelectedBusiness(event.target.value as DemoBusinessKey)}
              className={selectClass}
            >
              {demoBusinessOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <ApexWheelSite business={business} />
    </div>
  );
}
