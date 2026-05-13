"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EnvoLogo } from "@/components/site/envo/envo-brand-system";
import { Badge } from "@/components/ui/badge";
import { demoBusinessOptions, demoBusinesses, type DemoBusinessKey } from "@/lib/demo-businesses";
import { RouteWashDemoSite } from "./routewash-site";

export function DemoBusinessSwitcher() {
  const [selectedBusiness, setSelectedBusiness] = useState<DemoBusinessKey>("fleet-wash");
  const business = demoBusinesses[selectedBusiness];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FBFAF7] text-[#071126]">
      <section className="relative isolate px-3 py-4 sm:px-5 sm:py-5 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.16),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(111,77,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-[1500px]">
          <div className="mb-4 flex flex-col gap-3 rounded-[1.75rem] border border-[#D8E2F7] bg-white/78 p-3.5 shadow-[0_20px_70px_rgba(37,99,235,0.12)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div>
              <EnvoLogo size="sm" />
              <Badge className="mb-2 mt-3 border border-[#CBD8F2] bg-white/74 text-[#2563EB]">Envo by SignalOpsAI demo</Badge>
              <p className="text-sm text-[#647084]">
                See Envo handle a lead. Watch Envo answer, qualify, follow up, and prepare the handoff.
              </p>
            </div>
            <label className="relative grid gap-2 text-sm font-medium text-[#071126] sm:w-80">
              <span className="sr-only">Choose a demo workflow</span>
              <select
                value={selectedBusiness}
                onChange={(event) => setSelectedBusiness(event.target.value as DemoBusinessKey)}
                className="h-12 w-full appearance-none rounded-2xl border border-[#CBD8F2] bg-white px-4 pr-10 text-sm font-semibold text-[#071126] shadow-inner shadow-blue-950/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328BFF]"
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
