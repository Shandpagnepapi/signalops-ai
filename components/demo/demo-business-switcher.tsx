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
    <div className="min-h-screen overflow-x-hidden bg-[#071126] text-white">
      <section className="premium-section relative isolate px-3 py-4 sm:px-5 sm:py-5 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(50,139,255,0.24),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(111,77,255,0.18),transparent_30%),linear-gradient(135deg,#0B1024_0%,#17264A_44%,#111A3A_100%)]" />
        <div className="surface-grid absolute inset-0 opacity-[0.13]" />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="glass-panel mb-4 flex flex-col gap-3 rounded-3xl border border-white/14 bg-white/[0.07] p-3.5 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div>
              <Badge className="mb-2 bg-[#328BFF]/14 text-[#D7E8FF]">Envo by SignalOpsAI demo</Badge>
              <p className="text-sm text-[#D7E2F7]/72">
                See Envo handle a lead. Watch Envo answer, qualify, follow up, and prepare the handoff.
              </p>
            </div>
            <label className="relative grid gap-2 text-sm font-medium text-[#D7E2F7] sm:w-80">
              <span className="sr-only">Choose a demo workflow</span>
              <select
                value={selectedBusiness}
                onChange={(event) => setSelectedBusiness(event.target.value as DemoBusinessKey)}
                className="h-12 w-full appearance-none rounded-2xl border border-white/14 bg-[#0B1024]/88 px-4 pr-10 text-sm font-semibold text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EBBFF]"
              >
                {demoBusinessOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 size-4 text-[#6F4DFF]" aria-hidden="true" />
            </label>
          </div>

          <RouteWashDemoSite business={business} />
        </div>
      </section>
    </div>
  );
}
