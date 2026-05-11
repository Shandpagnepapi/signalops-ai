import {
  BellRing,
  CalendarCheck2,
  CalendarClock,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Send,
  UserRoundCheck
} from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";
import { OSLeadPath } from "@/components/site/mobile-os/OSLeadPath";
import { OSMetricPill } from "@/components/site/mobile-os/OSMetricPill";

const intakeItems = [
  ["Service", "Consultation"],
  ["Window", "Thu afternoon"],
  ["Customer", "New"],
  ["Contact", "Text first"]
];

const calendarDays = [
  ["Mon", "Full"],
  ["Tue", "2 open"],
  ["Wed", "AM"],
  ["Thu", "PM"],
  ["Fri", "Waitlist"]
];

const reminders = [
  ["No-book", "If link is not used"],
  ["Day-before", "Confirm appointment"],
  ["No-response", "Soft follow-up"]
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
    <OSDeviceFrame accent="sky" eyebrow="Booking console" title="Appointment Flow OS">
      <div className="mt-3 flex flex-wrap gap-2">
        <OSMetricPill icon={CalendarClock} label="Preferred" value="Thu PM" className="text-sky-100" />
        <OSMetricPill icon={Clock3} label="Status" value="Scheduling" className="text-sky-100" />
      </div>

      <div className="mt-4 rounded-3xl border border-sky-300/18 bg-sky-300/10 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-sky-100/64">Customer inquiry</p>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.62rem] font-black text-white/58">11:18 AM</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-sky-50">
          I am interested in a consultation this week.
        </p>
      </div>

      <div className="mt-3 rounded-3xl border border-white/10 bg-white/[0.055] p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">Schedule view</p>
          <span className="rounded-full bg-sky-300/18 px-2.5 py-1 text-[0.62rem] font-black text-sky-50">
            Match found
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {calendarDays.map(([day, label]) => {
            const isActive = day === "Thu";

            return (
              <div
                key={day}
                className={
                  isActive
                    ? "rounded-2xl bg-sky-300 p-2 text-center text-slate-950 shadow-lg shadow-sky-300/15"
                    : "rounded-2xl border border-white/10 bg-slate-950/54 p-2 text-center"
                }
              >
                <p className="text-[0.6rem] font-black uppercase">{day}</p>
                <p className="mt-1 text-[0.58rem] font-bold opacity-70">{label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 grid gap-2 rounded-3xl border border-white/10 bg-slate-950/56 p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">Smart intake</p>
          <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-2.5 py-1 text-[0.62rem] font-black text-sky-100">
            4 fields
          </span>
        </div>
        {intakeItems.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2.5">
            <span className="text-[0.65rem] font-black uppercase tracking-wide text-white/38">{label}</span>
            <span className="text-xs font-black text-white">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-[1.05fr_0.95fr] gap-2">
        <div className="rounded-3xl border border-sky-300/18 bg-sky-300/10 p-3">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-sky-100/70">Booking handoff</p>
          <p className="mt-2 text-sm font-black text-white">Thursday afternoon</p>
          <p className="mt-1 text-xs leading-5 text-sky-50/72">Time window and next step prepared.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-3">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">Team sees</p>
          <p className="mt-2 text-sm font-black leading-5 text-white">Consultation request ready</p>
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-white/10 bg-white/[0.055] p-3">
        <div className="mb-3 flex items-center gap-2">
          <Send className="size-4 text-sky-200" aria-hidden="true" />
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-white/42">Reminder flow</p>
        </div>
        <div className="grid gap-2">
          {reminders.map(([name, detail]) => (
            <div key={name} className="grid grid-cols-[4.4rem_1fr] gap-2 rounded-2xl border border-white/10 bg-slate-950/56 px-3 py-2">
              <p className="text-[0.65rem] font-black text-sky-100">{name}</p>
              <p className="text-[0.65rem] font-bold text-white/56">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-3xl border border-sky-300/18 bg-sky-300/10 p-3">
        <p className="text-sm font-black text-sky-50">Booking handoff ready</p>
        <CheckCircle2 className="size-5 text-sky-200" aria-hidden="true" />
      </div>

      <OSLeadPath activeIndex={4} steps={flow} tone="sky" />
    </OSDeviceFrame>
  );
}
