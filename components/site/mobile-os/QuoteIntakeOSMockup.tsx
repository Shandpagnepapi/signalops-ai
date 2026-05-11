import {
  BellRing,
  Camera,
  Car,
  CheckCircle2,
  ClipboardList,
  FileText,
  ImagePlus,
  MessageCircle,
  RefreshCcw,
  Route
} from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";
import { OSLeadPath } from "@/components/site/mobile-os/OSLeadPath";
import { OSMetricPill } from "@/components/site/mobile-os/OSMetricPill";
import { cn } from "@/lib/utils";

const requestFields = [
  { label: "Photos", value: "Requested", icon: Camera },
  { label: "Vehicle", value: "Needed", icon: Car },
  { label: "Service", value: "Curb rash", icon: FileText },
  { label: "Mobile", value: "Requested", icon: Route }
];

const estimatePrep = [
  ["Wheel count", "2"],
  ["Damage", "Cosmetic"],
  ["Visit", "Mobile"],
  ["Next", "Photo check"]
];

const flow = [
  { label: "Request", icon: MessageCircle },
  { label: "Photos", icon: Camera },
  { label: "Prep", icon: ClipboardList },
  { label: "Owner", icon: BellRing },
  { label: "Handoff", icon: CheckCircle2 }
];

export function QuoteIntakeOSMockup() {
  return (
    <OSDeviceFrame accent="emerald" eyebrow="Estimate workbench" title="Quote Intake OS">
      <div className="mt-3 flex flex-wrap gap-2">
        <OSMetricPill icon={FileText} label="Ticket" value="#QR-1842" className="text-emerald-100" />
        <OSMetricPill icon={RefreshCcw} label="Queue" value="Photo reminder" className="text-emerald-100" />
      </div>

      <div className="mt-4 rounded-3xl border border-emerald-300/18 bg-emerald-300/[0.07] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-wide text-emerald-100/60">Customer request</p>
            <p className="mt-1 text-sm font-black text-white">Apex Wheel Repair</p>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.62rem] font-black text-white/58">9:42 AM</span>
        </div>
        <div className="mt-3 grid gap-3">
          <MessageBubble tone="customer" label="Customer">
            I have curb rash on two wheels. Can you do mobile repair?
          </MessageBubble>
          <MessageBubble tone="system" label="SignalOps">
            Send photos of both wheels and your vehicle details. I will get the quote started.
          </MessageBubble>
        </div>
      </div>

      <div className="mt-3 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.055] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">Photo + detail request</p>
          <span className="rounded-full bg-emerald-300/18 px-2.5 py-1 text-[0.62rem] font-black text-emerald-50">
            Waiting on customer
          </span>
        </div>
        <div className="grid grid-cols-[0.72fr_1fr] gap-2">
          <div className="grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-2xl border",
                  item < 2 ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100" : "border-white/10 bg-slate-950/58 text-white/30"
                )}
              >
                <ImagePlus className="size-4" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="grid gap-1.5">
            {requestFields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.label} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/54 px-2.5 py-2">
                  <Icon className="size-3.5 shrink-0 text-lime-300" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[0.58rem] font-black uppercase tracking-wide text-white/35">{field.label}</p>
                    <p className="truncate text-xs font-black text-white">{field.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[0.95fr_1.05fr] gap-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/40">Estimate prep</p>
          <div className="mt-3 grid gap-2">
            {estimatePrep.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span className="text-[0.65rem] font-bold text-white/44">{label}</span>
                <span className="text-xs font-black text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-lime-300/20 bg-lime-300/10 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-wide text-lime-100/66">Owner mode</p>
              <p className="mt-1 text-sm font-black text-white">Quote packet ready</p>
            </div>
            <BellRing className="size-5 text-lime-300" aria-hidden="true" />
          </div>
          <p className="mt-2 text-xs leading-5 text-lime-50/72">
            Request photos, confirm mobile window, then send quote path.
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-3xl border border-emerald-300/18 bg-emerald-300/10 p-3">
        <div>
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-emerald-100/60">Final handoff</p>
          <p className="mt-1 text-sm font-black text-white">Quote handoff ready</p>
        </div>
        <span className="rounded-full bg-emerald-300 px-3 py-1 text-[0.68rem] font-black text-slate-950">Ready</span>
      </div>

      <OSLeadPath activeIndex={4} steps={flow} tone="emerald" />
    </OSDeviceFrame>
  );
}

function MessageBubble({ children, label, tone }: { children: string; label: string; tone: "customer" | "system" }) {
  return (
    <div
      className={cn(
        "max-w-[92%] rounded-3xl p-3 text-sm leading-6 shadow-lg",
        tone === "customer"
          ? "ml-auto bg-white text-slate-950 shadow-black/10"
          : "mr-auto border border-emerald-300/20 bg-emerald-300/10 text-emerald-50 shadow-emerald-950/20"
      )}
    >
      <p className={cn("text-[0.62rem] font-black uppercase", tone === "customer" ? "text-slate-500" : "text-emerald-100/70")}>{label}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
