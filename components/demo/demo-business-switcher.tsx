"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { demoBusinessOptions, demoBusinesses, type DemoBusinessKey } from "@/lib/demo-businesses";
import { RouteWashDemoSite } from "./routewash-site";

export function DemoBusinessSwitcher() {
  const [selectedBusiness, setSelectedBusiness] = useState<DemoBusinessKey>("fleet-wash");
  const business = demoBusinesses[selectedBusiness];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#14102b] text-white">
      <section className="premium-section relative isolate px-3 py-4 sm:px-5 sm:py-5 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,111,156,0.24),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(255,179,109,0.18),transparent_30%),linear-gradient(135deg,#241641_0%,#2a1a48_44%,#241331_100%)]" />
        <div className="surface-grid absolute inset-0 opacity-[0.13]" />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="glass-panel mb-4 flex flex-col gap-3 rounded-3xl border border-white/14 bg-white/[0.07] p-3.5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div>
              <Badge className="mb-2 bg-[#ff6f9c]/14 text-[#ffd7e6]">Envo by SignalOps demo</Badge>
              <p className="text-sm text-[#ead0df]/72">
                See Envo handle a lead. Watch Envo answer, qualify, follow up, and prepare the handoff.
              </p>
            </div>
            <label className="relative grid gap-2 text-sm font-medium text-[#ead0df] sm:w-80">
              <span className="sr-only">Choose a demo workflow</span>
              <select
                value={selectedBusiness}
                onChange={(event) => setSelectedBusiness(event.target.value as DemoBusinessKey)}
                className="h-12 w-full appearance-none rounded-2xl border border-white/14 bg-[#17122d]/88 px-4 pr-10 text-sm font-semibold text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9ec0]"
              >
                {demoBusinessOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-[#ffb36d]" aria-hidden="true" />
            </label>
          </div>

          <RouteWashDemoSite business={business} />
        </div>
      </section>
    </div>
  );
}
