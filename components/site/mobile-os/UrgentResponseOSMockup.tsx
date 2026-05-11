import { AlertTriangle, BellRing, Clock3, Flame, Home, MapPin, PhoneCall, RefreshCcw, Siren } from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";
import { OSFlowStep } from "@/components/site/mobile-os/OSFlowStep";
import { OSMetricPill } from "@/components/site/mobile-os/OSMetricPill";

const details = [
  ["Address", "Collected"],
  ["Issue type", "Pipe burst"],
  ["Callback", "On file"],
  ["Timing", "ASAP"]
];

const flow = [
  { label: "Call", icon: PhoneCall },
  { label: "Issue", icon: AlertTriangle },
  { label: "Alert", icon: BellRing },
  { label: "Window", icon: Clock3 },
  { label: "Retry", icon: RefreshCcw }
];

export function UrgentResponseOSMockup() {
  return (
    <OSDeviceFrame accent="amber" eyebrow="Urgent response" title="Urgent Response OS">
      <div className="mt-3 flex flex-wrap gap-2">
        <OSMetricPill icon={Flame} label="Urgency" value="Urgent" className="text-amber-100" />
        <OSMetricPill icon={Clock3} label="Window" value="Call now" className="text-amber-100" />
      </div>

      <div className="mt-4 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-amber-100/70">Customer message</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-[0.65rem] font-black text-slate-950">
            <Siren className="size-3.5" aria-hidden="true" />
            Urgent
          </span>
        </div>
        <p className="text-sm leading-6 text-amber-50">
          Pipe burst in the kitchen. Can someone call me ASAP?
        </p>
      </div>

      <div className="mt-3 rounded-3xl border border-white/10 bg-white/[0.06] p-3">
        <p className="text-xs font-black uppercase tracking-wide text-white/42">Details collected</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {details.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/58 p-3">
              <p className="text-[0.62rem] font-black uppercase tracking-wide text-white/40">{label}</p>
              <p className="mt-1 text-sm font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-red-300/20 bg-red-400/10 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-red-100/70">Priority alert</p>
            <p className="mt-1 text-sm font-black text-white">Owner/tech alert</p>
          </div>
          <BellRing className="size-5 text-red-200" aria-hidden="true" />
        </div>
        <p className="mt-2 text-xs leading-5 text-red-50/72">Suggested next action: call now.</p>
      </div>

      <div className="mt-3 grid grid-cols-[0.8fr_1fr] gap-2">
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-3">
          <PhoneCall className="size-5 text-amber-200" aria-hidden="true" />
          <p className="mt-3 text-xs font-black uppercase leading-4 text-white/58">Callback expected</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-3">
          <p className="text-xs font-black uppercase tracking-wide text-white/42">If no answer</p>
          <p className="mt-1 text-sm font-black text-white">Retry sequence ready</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-3xl border border-amber-300/18 bg-amber-300/10 p-3">
        <MapPin className="size-5 shrink-0 text-amber-200" aria-hidden="true" />
        <div>
          <p className="text-sm font-black text-white">Callback handoff ready</p>
          <p className="text-xs leading-5 text-amber-50/68">Issue, address, phone, and timing are packaged.</p>
        </div>
        <Home className="ml-auto size-5 shrink-0 text-amber-200" aria-hidden="true" />
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {flow.map((step, index) => (
          <OSFlowStep key={step.label} active={index === 2} icon={step.icon} label={step.label} tone="amber" />
        ))}
      </div>
    </OSDeviceFrame>
  );
}
