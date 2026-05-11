import {
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  PhoneCall,
  TrendingUp,
  UserRoundCheck
} from "lucide-react";

const metrics = [
  { label: "New Leads", value: "482", delta: "+29%" },
  { label: "Booked Jobs", value: "127", delta: "+24%" },
  { label: "Response Time", value: "4.3s", delta: "-72%" }
];

const leadSources = [
  { label: "Google", value: 48 },
  { label: "Facebook", value: 20 },
  { label: "Website", value: 16 },
  { label: "Other", value: 16 }
];

const timeline = [
  { title: "Instant reply sent", detail: "Lead answered in 4.3s", icon: MessageSquareText },
  { title: "Fleet details requested", detail: "Fleet size, sites, and wash window collected", icon: PhoneCall },
  { title: "Owner alerted", detail: "Recurring account routed with context", icon: BellRing },
  { title: "Quote handoff", detail: "After-hours route window suggested", icon: CalendarCheck2 }
];

export function EnterpriseCommandDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
      <div className="absolute inset-x-4 bottom-0 top-10 rounded-lg bg-[#34d399]/12 blur-3xl" />
      <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#080d18]/92 shadow-[0_28px_120px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(99,102,241,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_22%)]" />
        <div className="relative border-b border-white/10 px-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md border border-white/12 bg-white/[0.06]">
                <TrendingUp className="size-4 text-[#7dd3fc]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-4 text-white">SignalOps Command</p>
                <p className="mt-1 text-[0.68rem] leading-4 text-white/50">Lead response layer</p>
              </div>
            </div>
            <div className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-[0.62rem] font-semibold text-emerald-100">
              Live
            </div>
          </div>
        </div>

        <div className="relative p-3">
          <div className="grid grid-cols-3 gap-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-h-24 rounded-md border border-white/10 bg-white/[0.055] p-2.5">
                <p className="text-[0.62rem] font-medium leading-4 text-white/48">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold tracking-normal text-white">{metric.value}</p>
                <p className="mt-1 text-[0.62rem] font-semibold text-emerald-200">{metric.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-md border border-white/10 bg-[#0d1424]/84 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-white">Hot lead</p>
                <span className="rounded-md bg-[#fb7185]/14 px-2 py-1 text-[0.62rem] font-semibold text-[#fecdd3]">
                  Score 91
                </span>
              </div>
              <div className="mt-3 rounded-md border border-white/10 bg-white/[0.055] p-3">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#7dd3fc]/12 text-[#bae6fd]">
                    <UserRoundCheck className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-5 text-white">RouteWash Mobile Fleet Care</p>
                    <p className="mt-1 text-xs leading-5 text-white/60">
                      Fleet wash quote, 28 vans, two sites, after-hours window.
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {["Recurring account", "Owner handoff"].map((tag) => (
                    <div key={tag} className="rounded-md border border-white/10 bg-[#050914] px-2 py-2 text-[0.68rem] font-medium text-white/70">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[0.62rem] font-semibold uppercase text-white/48">
                  <span>Follow-up readiness</span>
                  <span>82%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#38bdf8,#34d399)]" />
                </div>
              </div>
            </div>

            <div className="rounded-md border border-white/10 bg-[#0d1424]/84 p-3">
              <p className="text-xs font-semibold text-white">Lead source breakdown</p>
              <div className="mt-3 space-y-3">
                {leadSources.map((source) => (
                  <div key={source.label}>
                    <div className="mb-1 flex justify-between text-[0.68rem] text-white/58">
                      <span>{source.label}</span>
                      <span>{source.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#818cf8,#38bdf8,#34d399)]"
                        style={{ width: `${source.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-white/10 bg-white/[0.045] p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Clock3 className="size-4 text-[#7dd3fc]" aria-hidden="true" />
                  Next best action
                </div>
                <p className="mt-2 text-xs leading-5 text-white/60">
                  Send quote follow-up if site notes are not confirmed in 20 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-md border border-white/10 bg-[#0d1424]/84 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-white">Follow-up timeline</p>
              <CheckCircle2 className="size-4 text-emerald-200" aria-hidden="true" />
            </div>
            <div className="mt-3 grid gap-2">
              {timeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="grid grid-cols-[2rem_1fr] gap-2">
                    <div className="flex flex-col items-center">
                      <div className="flex size-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.055]">
                        <Icon className="size-3.5 text-[#a5b4fc]" aria-hidden="true" />
                      </div>
                      {index < timeline.length - 1 ? <div className="h-5 w-px bg-white/10" /> : null}
                    </div>
                    <div className="pb-1">
                      <p className="text-xs font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[0.68rem] leading-4 text-white/54">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
