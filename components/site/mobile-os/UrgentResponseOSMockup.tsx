import {
  BellRing,
  CheckCircle2,
  Clock3,
  Flame,
  Home,
  MapPin,
  PhoneCall,
  RefreshCcw,
  ShieldAlert,
  Siren
} from "lucide-react";
import { OSCorePipeline, OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";
import { OSLeadPath } from "@/components/site/mobile-os/OSLeadPath";
import { OSMetricPill } from "@/components/site/mobile-os/OSMetricPill";

const details = [
  ["Address", "Collected"],
  ["Issue", "Pipe burst"],
  ["Callback", "On file"],
  ["Timing", "ASAP"]
];

const dispatchItems = [
  ["Owner alert", "Call now"],
  ["Customer update", "Callback expected"],
  ["Retry path", "Ready if no answer"]
];

const flow = [
  { label: "Urgent", icon: Siren },
  { label: "Address", icon: MapPin },
  { label: "Alert", icon: BellRing },
  { label: "Callback", icon: PhoneCall },
  { label: "Retry", icon: RefreshCcw }
];

export function UrgentResponseOSMockup() {
  return (
    <OSDeviceFrame accent="amber" eyebrow="Dispatch console" title="Urgent Response OS">
      <div className="mt-3 flex flex-wrap gap-2">
        <OSMetricPill icon={Flame} label="Urgency" value="Urgent" className="text-amber-100" />
        <OSMetricPill icon={Clock3} label="Response" value="Call now" className="text-amber-100" />
      </div>
      <OSCorePipeline accent="amber" />

      <div className="mt-4 overflow-hidden rounded-3xl border border-red-300/20 bg-red-400/10">
        <div className="flex items-center justify-between gap-3 border-b border-red-200/10 bg-red-400/10 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-2xl bg-red-300 text-slate-950">
              <Siren className="size-4" aria-hidden="true" />
            </span>
            <p className="text-[0.65rem] font-black uppercase tracking-wide text-red-100/72">High priority intake</p>
          </div>
          <span className="rounded-full bg-red-300 px-2.5 py-1 text-[0.62rem] font-black text-slate-950">00:18</span>
        </div>
        <div className="p-3">
          <p className="text-sm leading-6 text-red-50">
            Pipe burst in the kitchen. Can someone call me ASAP?
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {details.map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.055] p-3">
            <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/38">{label}</p>
            <p className="mt-1 text-sm font-black text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-wide text-amber-100/70">Owner mode</p>
            <p className="mt-1 text-sm font-black text-white">Dispatch alert packaged</p>
          </div>
          <ShieldAlert className="size-5 text-amber-200" aria-hidden="true" />
        </div>
        <div className="mt-3 grid gap-2">
          {dispatchItems.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200/10 bg-slate-950/46 px-3 py-2">
              <span className="text-[0.65rem] font-bold text-amber-50/66">{label}</span>
              <span className="text-[0.65rem] font-black text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[0.9fr_1.1fr] gap-2">
        <div className="rounded-3xl border border-red-300/20 bg-red-400/10 p-3">
          <PhoneCall className="size-5 text-red-200" aria-hidden="true" />
          <p className="mt-3 text-xs font-black uppercase leading-4 text-white/70">Suggested next action</p>
          <p className="mt-1 text-sm font-black text-white">Call now</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-3">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-amber-200" aria-hidden="true" />
            <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">Customer update</p>
          </div>
          <p className="mt-2 text-xs leading-5 text-white/68">Customer told to expect a callback.</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-3xl border border-amber-300/18 bg-amber-300/10 p-3">
        <Home className="size-5 shrink-0 text-amber-200" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-black text-white">Callback handoff ready</p>
          <p className="truncate text-xs leading-5 text-amber-50/68">Issue, address, phone, timing, retry path.</p>
        </div>
        <CheckCircle2 className="ml-auto size-5 shrink-0 text-amber-200" aria-hidden="true" />
      </div>

      <OSLeadPath activeIndex={2} steps={flow} tone="amber" />
    </OSDeviceFrame>
  );
}
