import { BellRing, CalendarCheck2, CalendarClock, CheckCircle2, MessageCircle, Send, UserRoundCheck } from "lucide-react";
import { OSDeviceFrame } from "@/components/site/mobile-os/OSDeviceFrame";

const intakeItems = [
  ["Service", "Consultation"],
  ["Preferred time", "Thursday PM"],
  ["Customer", "New"],
  ["Contact", "Text first"]
];

export function AppointmentFlowOSMockup() {
  return (
    <OSDeviceFrame accent="sky" eyebrow="Booking console" title="Appointment Flow OS">
      <div className="mt-4 rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sky-300/12 text-sky-200">
            <MessageCircle className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-white/42">Service inquiry</p>
            <p className="text-sm font-black leading-5 text-white">I am interested in a consultation this week.</p>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-[1.45rem] border border-sky-300/20 bg-sky-300/10 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-sky-100/70">Smart intake</p>
            <h4 className="mt-1 text-lg font-black text-white">Appointment-ready details</h4>
          </div>
          <UserRoundCheck className="size-7 text-sky-200" aria-hidden="true" />
        </div>
        <div className="grid gap-2">
          {intakeItems.map(([label, value]) => (
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
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-300/12 text-sky-200">
              <CalendarClock className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/42">Booking handoff</p>
              <p className="mt-1 text-base font-black leading-5 text-white">Preferred window prepared for scheduling.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ffb36d]/12 text-[#ffb36d]">
              <BellRing className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-white/42">Reminder flow</p>
              <p className="mt-1 text-base font-black leading-5 text-white">No-book and day-before reminders ready.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[1.45rem] border border-emerald-300/18 bg-emerald-300/10 p-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-100/70">Team view</p>
            <p className="mt-1 text-base font-black text-white">Booking handoff ready</p>
          </div>
          <CheckCircle2 className="size-6 text-emerald-300" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <CalendarCheck2 className="size-4 text-sky-200" aria-hidden="true" />
          Thu PM
        </span>
        <span className="inline-flex items-center gap-2 text-xs font-black text-white/60">
          <Send className="size-4 text-[#ffb36d]" aria-hidden="true" />
          Reminder ready
        </span>
      </div>
    </OSDeviceFrame>
  );
}
