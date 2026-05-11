import { BellRing, Camera, Car, CheckCircle2, FileText, MessageCircle, RefreshCcw, Route } from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";
import { OSFlowStep } from "@/components/site/mobile-os/OSFlowStep";
import { OSMetricPill } from "@/components/site/mobile-os/OSMetricPill";
import { cn } from "@/lib/utils";

const requestFields = [
  { label: "Photos", value: "Requested", icon: Camera },
  { label: "Vehicle", value: "Needed", icon: Car },
  { label: "Service", value: "Curb rash", icon: FileText },
  { label: "Mobile", value: "Requested", icon: Route }
];

const flow = [
  { label: "Message", icon: MessageCircle },
  { label: "Photos", icon: Camera },
  { label: "Alert", icon: BellRing },
  { label: "Queue", icon: RefreshCcw },
  { label: "Handoff", icon: CheckCircle2 }
];

export function QuoteIntakeOSMockup() {
  return (
    <OSDeviceFrame accent="emerald" eyebrow="Quote workflow" title="Quote Intake OS">
      <div className="mt-3 flex flex-wrap gap-2">
        <OSMetricPill icon={FileText} label="Lead type" value="Quote" className="text-emerald-100" />
        <OSMetricPill icon={RefreshCcw} label="Queue" value="1 ready" className="text-emerald-100" />
      </div>

      <div className="mt-4 grid gap-3">
        <MessageBubble tone="customer" label="Customer">
          I have curb rash on two wheels. Can you do mobile repair?
        </MessageBubble>
        <MessageBubble tone="system" label="SignalOps">
          Send photos of both wheels and your vehicle details. I will get the quote started.
        </MessageBubble>
      </div>

      <div className="mt-4 rounded-3xl border border-emerald-300/18 bg-emerald-300/[0.08] p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-100/70">Photo/detail request</p>
          <span className="rounded-full bg-emerald-300/18 px-2.5 py-1 text-[0.65rem] font-black text-emerald-50">
            In progress
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {requestFields.map((field) => {
            const Icon = field.icon;

            return (
              <div key={field.label} className="rounded-2xl border border-white/10 bg-slate-950/54 p-3">
                <Icon className="size-4 text-lime-300" aria-hidden="true" />
                <p className="mt-2 text-[0.62rem] font-black uppercase tracking-wide text-white/40">{field.label}</p>
                <p className="mt-0.5 text-sm font-black text-white">{field.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-lime-300/20 bg-lime-300/10 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-lime-100/70">Owner alert</p>
            <p className="mt-1 text-sm font-black text-white">Priority: Quote ready</p>
          </div>
          <BellRing className="size-5 text-lime-300" aria-hidden="true" />
        </div>
        <p className="mt-2 text-xs leading-5 text-lime-50/72">
          Next action: request photos and offer a mobile window.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-white/42">Follow-up queue</p>
          <p className="mt-1 text-sm font-black text-white">Photo reminder queued</p>
        </div>
        <span className="rounded-full bg-emerald-300 px-3 py-1 text-[0.68rem] font-black text-slate-950">Ready</span>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {flow.map((step, index) => (
          <OSFlowStep key={step.label} active={index === flow.length - 1} icon={step.icon} label={step.label} tone="emerald" />
        ))}
      </div>
    </OSDeviceFrame>
  );
}

function MessageBubble({ children, label, tone }: { children: string; label: string; tone: "customer" | "system" }) {
  return (
    <div
      className={cn(
        "max-w-[92%] rounded-3xl p-3 text-sm leading-6",
        tone === "customer"
          ? "ml-auto bg-white text-slate-950"
          : "mr-auto border border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
      )}
    >
      <p className={cn("text-[0.62rem] font-black uppercase", tone === "customer" ? "text-slate-500" : "text-emerald-100/70")}>{label}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
