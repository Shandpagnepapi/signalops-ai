import { BellRing, Building2, CheckCircle2, Clock3, MessageCircle, RefreshCcw, Truck } from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";

const fleetDetails = [
  ["Fleet size", "28 vehicles"],
  ["Locations", "2 DFW sites"],
  ["Frequency", "Biweekly"],
  ["Wash window", "After-hours"]
];

export function QuoteIntakeOSMockup() {
  return (
    <OSDeviceFrame accent="pink" eyebrow="Quote console" title="Quote Intake OS">
      <div className="mt-4 rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#ffb36d]/14 text-[#ffb36d]">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/42">Fleet quote request</p>
              <p className="text-sm font-black text-white">RouteWash Mobile Fleet Care</p>
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/58">9:42 AM</span>
        </div>
        <p className="mt-4 rounded-3xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-950">
          We have 28 service vans across two locations. Can you quote biweekly after-hours washes?
        </p>
      </div>

      <div className="mt-3 rounded-[1.45rem] border border-[#ffb36d]/20 bg-[#ffb36d]/10 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#ffe1bd]/70">Fleet details</p>
            <h4 className="mt-1 text-lg font-black text-white">Recurring account opportunity</h4>
          </div>
          <Truck className="size-7 text-[#ffb36d]" aria-hidden="true" />
        </div>
        <div className="grid gap-2">
          {fleetDetails.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#100818]/46 px-3 py-3">
              <span className="text-xs font-bold text-white/48">{label}</span>
              <span className="text-sm font-black text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ff6f9c]/14 text-[#ff9fbd]">
              <BellRing className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/42">Owner handoff</p>
              <p className="mt-1 text-base font-black leading-5 text-white">Confirm service area and send fleet quote path.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[1.45rem] border border-emerald-300/18 bg-emerald-300/10 p-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-100/70">Follow-up</p>
            <p className="mt-1 text-base font-black text-white">Quote follow-up ready</p>
          </div>
          <CheckCircle2 className="size-6 text-emerald-300" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <Clock3 className="size-4 text-[#ffb36d]" aria-hidden="true" />
          Intake ready
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <Building2 className="size-4 text-[#ffb36d]" aria-hidden="true" />
          Account handoff
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <RefreshCcw className="size-4 text-emerald-300" aria-hidden="true" />
          Ready
        </span>
      </div>
    </OSDeviceFrame>
  );
}
