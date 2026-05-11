import { BellRing, CalendarCheck2, CalendarClock, Clock3, MessageCircle, RefreshCcw, UserRoundCheck } from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";
import { OSFlowStep } from "@/components/site/mobile-os/OSFlowStep";
import { OSMetricPill } from "@/components/site/mobile-os/OSMetricPill";

const intakeItems = [
  ["Service interest", "Consultation"],
  ["Preferred time", "Thu afternoon"],
  ["Customer type", "New"],
  ["Contact", "Text first"]
];

const reminders = [
  "No-book reminder",
  "Day-before reminder",
  "Follow-up if no response"
];

const flow = [
  { label: "Inquiry", icon: MessageCircle },
  { label: "Intake", icon: UserRoundCheck },
  { label: "Window", icon: CalendarClock },
  { label: "Reminder", icon: BellRing },
  { label: "Booking", icon: CalendarCheck2 }
];

export function AppointmentFlowOSMockup() {
  return (
    <OSDeviceFrame accent="sky" eyebrow="Scheduling flow" title="Appointment Flow OS">
      <div className="mt-3 flex flex-wrap gap-2">
        <OSMetricPill icon={CalendarClock} label="Window" value="Thu PM" className="text-sky-100" />
        <OSMetricPill icon={Clock3} label="Status" value="Ready" className="text-sky-100" />
      </div>

      <div className="mt-4 rounded-3xl border border-sky-300/18 bg-sky-300/10 p-3">
        <p className="text-xs font-black uppercase tracking-wide text-sky-100/70">Customer inquiry</p>
        <p className="mt-2 text-sm leading-6 text-sky-50">
          I am interested in a consultation this week.
        </p>
      </div>

      <div className="mt-3 rounded-3xl border border-white/10 bg-white/[0.06] p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-wide text-white/45">Smart intake</p>
          <span className="rounded-full bg-sky-300/18 px-2.5 py-1 text-[0.65rem] font-black text-sky-50">
            4 fields
          </span>
        </div>
        <div className="grid gap-2">
          {intakeItems.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/52 px-3 py-2.5">
              <span className="text-[0.68rem] font-black uppercase tracking-wide text-white/40">{label}</span>
              <span className="text-sm font-black text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_0.8fr] gap-2">
        <div className="rounded-3xl border border-sky-300/18 bg-sky-300/10 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-sky-100/70">Calendar handoff</p>
          <p className="mt-2 text-sm font-black text-white">Thursday afternoon</p>
          <p className="mt-1 text-xs leading-5 text-sky-50/70">Booking handoff ready</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-3">
          <CalendarCheck2 className="size-5 text-sky-200" aria-hidden="true" />
          <p className="mt-3 text-xs font-black uppercase leading-4 text-white/52">Ready for scheduling</p>
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-white/10 bg-slate-950/56 p-3">
        <p className="text-xs font-black uppercase tracking-wide text-white/42">Reminder flow</p>
        <div className="mt-3 grid gap-2">
          {reminders.map((reminder) => (
            <div key={reminder} className="flex items-center gap-2 text-sm font-bold text-white/78">
              <RefreshCcw className="size-3.5 text-sky-200" aria-hidden="true" />
              {reminder}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-sky-300/20 bg-sky-300/10 p-3">
        <p className="text-sm font-black text-sky-50">Consultation request ready for scheduling</p>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {flow.map((step, index) => (
          <OSFlowStep key={step.label} active={index === flow.length - 1} icon={step.icon} label={step.label} tone="sky" />
        ))}
      </div>
    </OSDeviceFrame>
  );
}
