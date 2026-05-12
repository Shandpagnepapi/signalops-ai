import { AlertTriangle, BellRing, CheckCircle2, Home, MapPin, PhoneCall, RefreshCcw, Siren } from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";

const details = [
  ["Issue", "Pipe burst"],
  ["Address", "Collected"],
  ["Callback", "On file"],
  ["Timing", "ASAP"]
];

export function UrgentResponseOSMockup() {
  return (
    <OSDeviceFrame accent="amber" eyebrow="Dispatch console" title="Urgent Response OS">
      <div className="mt-4 overflow-hidden rounded-[1.45rem] border border-red-300/20 bg-red-400/10">
        <div className="flex items-center justify-between gap-3 border-b border-red-200/10 bg-red-400/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-red-300 text-slate-950">
              <Siren className="size-5" aria-hidden="true" />
            </span>
            <p className="text-xs font-black uppercase tracking-wide text-red-100/78">Urgent issue</p>
          </div>
          <span className="rounded-full bg-red-300 px-3 py-1 text-xs font-black text-slate-950">Call now</span>
        </div>
        <p className="p-4 text-sm font-semibold leading-6 text-red-50">
          Pipe burst in the kitchen. Can someone call me ASAP?
        </p>
      </div>

      <div className="mt-3 rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-white/42">Details collected</p>
            <h4 className="mt-1 text-lg font-black text-white">Ready for priority callback</h4>
          </div>
          <MapPin className="size-7 text-amber-200" aria-hidden="true" />
        </div>
        <div className="grid gap-2">
          {details.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#100818]/46 px-3 py-3">
              <span className="text-xs font-bold text-white/48">{label}</span>
              <span className="text-sm font-black text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        <div className="rounded-[1.45rem] border border-amber-300/22 bg-amber-300/10 p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-300 text-slate-950">
              <BellRing className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-amber-100/72">Priority alert</p>
              <p className="mt-1 text-base font-black leading-5 text-white">Owner or tech gets the callback packet.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ff6f9c]/14 text-[#ff9fbd]">
              <PhoneCall className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/42">Callback handoff</p>
              <p className="mt-1 text-base font-black leading-5 text-white">Customer told to expect a call.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[1.45rem] border border-emerald-300/18 bg-emerald-300/10 p-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-100/70">If no answer</p>
            <p className="mt-1 text-base font-black text-white">Retry sequence ready</p>
          </div>
          <CheckCircle2 className="size-6 text-emerald-300" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <AlertTriangle className="size-4 text-red-200" aria-hidden="true" />
          Priority
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <Home className="size-4 text-amber-200" aria-hidden="true" />
          Address ready
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <RefreshCcw className="size-4 text-emerald-300" aria-hidden="true" />
          Retry ready
        </span>
      </div>
    </OSDeviceFrame>
  );
}
