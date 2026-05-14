import type { ReactNode } from "react";
import {
  Bell,
  Bot,
  CalendarCheck,
  CheckCircle2,
  FileText,
  Instagram,
  MessageCircle,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  UsersRound,
  Zap,
  type LucideIcon
} from "lucide-react";
import {
  EnvoAppIcon,
  EnvoDarkCard,
  EnvoFeatureStack,
  EnvoGlassCard,
  EnvoLogo,
  EnvoMark,
  EnvoSignatureCard,
  EnvoWaveLines
} from "@/components/site/envo/envo-brand";
import { cn } from "@/lib/utils";

const metricCards = [
  ["New Leads", "128", "+24%"],
  ["Responded", "98%", "+10%"],
  ["Handoffs", "32", "+12%"],
  ["Conversion", "27%", "+9%"]
] as const;

const pipelineColumns = [
  {
    title: "New",
    count: "34",
    color: "#328BFF",
    leads: ["Roof repair quote", "Driveway cleaning", "Gutter cleaning"]
  },
  {
    title: "Qualified",
    count: "26",
    color: "#34C759",
    leads: ["House washing", "Patio cleaning", "Window cleaning"]
  },
  {
    title: "Pending",
    count: "18",
    color: "#F6B84B",
    leads: ["Commercial job", "Deck restoration", "Soft wash service"]
  },
  {
    title: "Handoff",
    count: "12",
    color: "#A99BFF",
    leads: ["Price approval", "Discount request", "Schedule on call"]
  }
] as const;

const messageSources = [
  { label: "(205) 555-0124", copy: "Hey! I need a quote.", icon: Phone, color: "bg-[#328BFF]" },
  { label: "Instagram DM", copy: "Can you wash my roof?", icon: Instagram, color: "bg-[#C13CF2]" },
  { label: "Messenger", copy: "Is this available today?", icon: MessageCircle, color: "bg-[#6F4DFF]" },
  { label: "Website Form", copy: "Request a free estimate.", icon: FileText, color: "bg-[#2563EB]" }
] as const;

const ownerControlRows = [
  { title: "Approval Mode", copy: "Review before Envo takes action", action: "On", icon: ShieldCheck, color: "text-[#8EBBFF]" },
  { title: "Human Takeover", copy: "Jump in and reply anytime", action: "Take Over", icon: UserRound, color: "text-[#BFD3FF]" },
  { title: "Pricing & Discount Guardrails", copy: "Envo follows your pricing rules", action: "Manage", icon: SlidersHorizontal, color: "text-[#F5A4BD]" },
  { title: "Escalation Rules", copy: "When to escalate to you or your team", action: "Configure", icon: Bell, color: "text-[#F7BE62]" },
  { title: "Activity History", copy: "See everything Envo has done", action: "View All", icon: CheckCircle2, color: "text-[#34C759]" }
] as const;

export function EnvoDashboardDesktopMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#071126] p-4 text-white shadow-[0_28px_90px_rgba(7,17,38,0.28)]",
        className
      )}
    >
      <div className="grid min-h-[34rem] gap-4 lg:grid-cols-[12rem_1fr]">
        <aside className="rounded-[1.35rem] border border-white/10 bg-[#0B1024]/72 p-4">
          <EnvoLogo size="sm" tone="dark" />
          <nav className="mt-7 grid gap-2 text-sm font-bold text-[#D7E2F7]/70">
            {["Overview", "Leads", "Messages", "Calls", "Follow-ups", "Handoffs", "Customers", "Analytics", "Settings"].map((item, index) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5",
                  index === 0
                    ? "bg-[linear-gradient(135deg,#328BFF,#6F4DFF)] text-white shadow-[0_16px_36px_rgba(37,99,235,0.24)]"
                    : "bg-white/[0.035]"
                )}
              >
                <span className="size-2 rounded-full bg-current opacity-70" />
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 rounded-[1.35rem] border border-white/10 bg-[#0B1024]/52 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8EBBFF]">Owner command center</p>
              <h3 className="mt-2 text-3xl font-black">Overview</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/7 px-3 py-2 text-xs font-black text-[#D7E2F7]">This Week</span>
              <span className="flex size-10 items-center justify-center rounded-full bg-[#EAF1FF] text-sm font-black text-[#2563EB]">AB</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metricCards.map(([label, value, delta]) => (
              <div key={label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-4">
                <p className="text-xs font-black text-[#8EBBFF]">{label}</p>
                <p className="mt-2 text-4xl font-black">{value}</p>
                <p className="mt-2 text-xs font-bold text-[#34C759]">{delta} vs last week</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_0.75fr]">
            <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <h4 className="text-lg font-black">Lead Pipeline</h4>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {pipelineColumns.map((column) => (
                  <div key={column.title} className="min-w-0">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xs font-black" style={{ color: column.color }}>{column.title}</p>
                        <p className="text-2xl font-black">{column.count}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1 rounded-full" style={{ backgroundColor: column.color }} />
                    <div className="mt-3 grid gap-2">
                      {column.leads.map((lead) => (
                        <div key={lead} className="rounded-xl border border-white/8 bg-[#071126]/64 p-3">
                          <p className="truncate text-xs font-black text-white">{lead}</p>
                          <p className="mt-1 text-[0.68rem] font-bold text-[#D7E2F7]/46">2h ago</p>
                        </div>
                      ))}
                      <div className="rounded-xl bg-white/[0.055] p-2 text-center text-xs font-black text-[#D7E2F7]">
                        + more
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black">Recent Messages</h4>
                <span className="text-xs font-black text-[#8EBBFF]">View all</span>
              </div>
              <div className="mt-4 grid gap-3">
                {messageSources.map((source, index) => {
                  const Icon = source.icon;
                  return (
                    <div key={source.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#071126]/56 p-3">
                      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-white", source.color)}>
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black">{source.label}</p>
                        <p className="truncate text-xs text-[#D7E2F7]/62">{source.copy}</p>
                      </div>
                      <span className="text-xs text-[#D7E2F7]/46">{2 + index * 10}m</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {[
              ["Missed Calls", "6", "text-[#F87171]"],
              ["Follow-ups", "24", "text-[#328BFF]"],
              ["Due Today", "17", "text-[#A99BFF]"],
              ["Handoffs", "8", "text-[#34C759]"]
            ].map(([label, value, color]) => (
              <div key={label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.055] p-4">
                <p className="text-sm font-black text-white">{label}</p>
                <p className={cn("mt-2 text-3xl font-black", color)}>{value}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export function EnvoDashboardMobileMockup({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[22rem] rounded-[2.5rem] border-[10px] border-[#050B18] bg-[#050B18] shadow-[0_30px_80px_rgba(7,17,38,0.28)]", className)}>
      <div className="overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#071126] text-white">
        <div className="flex items-center justify-between bg-[#0B1024] px-5 py-4">
          <span className="text-xs font-black">2:01</span>
          <EnvoLogo size="sm" tone="dark" />
          <Bell className="size-4 text-[#D7E2F7]" aria-hidden="true" />
        </div>
        <div className="p-5">
          <h3 className="text-2xl font-black">Overview</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {metricCards.map(([label, value, delta]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <p className="text-xs font-black text-[#328BFF]">{label}</p>
                <p className="mt-2 text-3xl font-black">{value}</p>
                <p className="mt-1 text-[0.68rem] font-bold text-[#34C759]">{delta}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <h4 className="font-black">Recent Messages</h4>
            <span className="text-xs font-black text-[#328BFF]">View all</span>
          </div>
          <div className="mt-3 grid gap-3">
            {messageSources.map((source, index) => {
              const Icon = source.icon;
              return (
                <div key={source.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.045] p-3">
                  <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", source.color)}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{source.label}</p>
                    <p className="truncate text-xs text-[#D7E2F7]/60">{source.copy}</p>
                  </div>
                  <span className="text-[0.68rem] text-[#D7E2F7]/48">{2 + index * 10}m</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-5 border-t border-white/10 bg-[#0B1024] px-3 py-3 text-[0.62rem] font-bold text-[#D7E2F7]/58">
          {["Overview", "Leads", "Messages", "Follow-up", "More"].map((item, index) => (
            <div key={item} className={cn("flex flex-col items-center gap-1", index === 0 && "text-[#8EBBFF]")}>
              <span className="size-2 rounded-full bg-current" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EnvoOwnerCommandCenterMockup({ className }: { className?: string }) {
  return (
    <EnvoDarkCard className={cn("rounded-[1.85rem] p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black">Control Center</h3>
          <p className="mt-1 text-sm text-[#D7E2F7]/70">You are in control. Envo handles the rest.</p>
        </div>
        <EnvoMark className="h-12 w-16" />
      </div>

      <div className="mt-6 grid gap-3">
        {ownerControlRows.map((row, index) => {
          const Icon = row.icon;
          return (
            <div key={row.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
              <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#071126]/72", row.color)}>
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-white">{row.title}</p>
                <p className="mt-1 text-xs leading-5 text-[#D7E2F7]/62">{row.copy}</p>
              </div>
              {index === 0 ? (
                <span className="relative h-8 w-14 rounded-full bg-[linear-gradient(135deg,#328BFF,#6F4DFF)]">
                  <span className="absolute right-1 top-1 size-6 rounded-full bg-white shadow" />
                </span>
              ) : (
                <span className="rounded-xl bg-white/[0.075] px-3 py-2 text-xs font-black text-white">{row.action}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#071126]/56 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="font-black">Recent Activity</h4>
          <span className="text-xs font-black text-[#8EBBFF]">View all</span>
        </div>
        {[
          "Quote sent to (205) 555-0124",
          "Follow-up sent for house washing",
          "Handoff created for price approval",
          "Discount request flagged"
        ].map((activity, index) => (
          <div key={activity} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span className="flex items-center gap-3 text-[#EAF1FF]">
              <span className="size-2 rounded-full bg-[#328BFF]" />
              {activity}
            </span>
            <span className="text-xs text-[#D7E2F7]/48">{2 + index * 14}m ago</span>
          </div>
        ))}
      </div>
    </EnvoDarkCard>
  );
}

export function EnvoLeadWorkflowVisual({ className }: { className?: string }) {
  const incoming = [
    ["Phone Calls", Phone],
    ["Text Messages", MessageCircle],
    ["Website Forms", FileText],
    ["Social DMs", Instagram]
  ] as const;
  const routes = [
    ["You / Owner", UserRound],
    ["Your Team", UsersRound],
    ["Calendar / CRM", CalendarCheck]
  ] as const;
  const outcomes = ["Faster Response", "More Booked Jobs", "Happier Customers", "No More Missed Leads"];

  return (
    <EnvoGlassCard className={cn("overflow-hidden bg-white/88 p-5 sm:p-7", className)}>
      <div className="grid gap-6 lg:grid-cols-[0.76fr_1fr_0.78fr_0.72fr] lg:items-center">
        <WorkflowColumn title="Incoming Leads">
          {incoming.map(([label, Icon]) => (
            <WorkflowItem key={label} icon={Icon} label={label} />
          ))}
        </WorkflowColumn>

        <div className="relative rounded-[1.55rem] bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] p-6 text-white shadow-[0_24px_70px_rgba(37,99,235,0.28)]">
          <EnvoLogo size="lg" tone="dark" />
          <p className="mt-5 text-2xl font-black">AI Lead Manager</p>
          <div className="mt-5 grid gap-3">
            {["Captures & Qualifies", "Answers Instantly", "Gathers Key Details", "Follows Up Automatically", "Organizes & Prioritizes"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <WorkflowColumn title="Routes & Hands Off">
          {routes.map(([label, Icon]) => (
            <WorkflowItem key={label} icon={Icon} label={label} />
          ))}
        </WorkflowColumn>

        <WorkflowColumn title="Outcome">
          {outcomes.map((outcome) => (
            <div key={outcome} className="flex items-center gap-3 rounded-xl border border-[#D8E2F7] bg-white/72 p-3 text-sm font-black text-[#071126]">
              <CheckCircle2 className="size-5 shrink-0 text-[#34C759]" aria-hidden="true" />
              {outcome}
            </div>
          ))}
        </WorkflowColumn>
      </div>
      <p className="mt-8 text-center text-base font-black text-[#647084]">
        Envo keeps the next step moving so good opportunities do not sit unanswered.
      </p>
    </EnvoGlassCard>
  );
}

function WorkflowColumn({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[#D8E2F7] bg-white/70 p-4 shadow-[0_18px_54px_rgba(37,99,235,0.08)]">
      <h3 className="mb-4 text-sm font-black text-[#071126]">{title}</h3>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function WorkflowItem({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#D8E2F7] bg-white/72 p-3 text-sm font-bold text-[#071126]">
      <Icon className="size-5 shrink-0 text-[#6F4DFF]" aria-hidden="true" />
      {label}
    </div>
  );
}

export function EnvoPreviewCockpitMockup({ className }: { className?: string }) {
  return (
    <EnvoGlassCard className={cn("overflow-hidden bg-white/88 p-5 sm:p-7", className)}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 text-center sm:text-left">
        <div>
          <h3 className="text-3xl font-black text-[#071126]">Preview Envo for Your Business</h3>
          <p className="mt-2 text-sm font-bold text-[#647084]">
            Show us your lead flow and we will map how Envo should handle it.
          </p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#328BFF,#6F4DFF)] text-sm font-black text-white">AB</span>
      </div>
      <div className="grid gap-4 lg:grid-cols-[12rem_1fr_17rem]">
        <div className="rounded-[1.25rem] border border-[#D8E2F7] bg-white/74 p-3">
          {["Lead Map", "Envo Build Plan", "Next Steps"].map((step, index) => (
            <div
              key={step}
              className={cn(
                "mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-black",
                index === 0 ? "bg-[linear-gradient(135deg,#328BFF,#6F4DFF)] text-white" : "text-[#647084]"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-full", index === 0 ? "bg-white/18" : "bg-[#EAF1FF] text-[#2563EB]")}>
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.25rem] border border-[#D8E2F7] bg-white/74 p-5">
            <h4 className="font-black text-[#071126]">Lead Map</h4>
            <p className="mt-1 text-xs font-bold text-[#647084]">We analyze how leads come in and what happens next.</p>
            <div className="mt-5 flex items-center justify-center gap-5">
              <div className="grid gap-2 text-xs font-bold text-[#647084]">
                {["Calls", "Forms", "DMs"].map((item) => (
                  <span key={item} className="rounded-full border border-[#D8E2F7] bg-white px-3 py-2">{item}</span>
                ))}
              </div>
              <EnvoMark className="h-24 w-32" />
              <div className="grid gap-2 text-xs font-bold text-[#647084]">
                {["You / Team", "Calendar / CRM"].map((item) => (
                  <span key={item} className="rounded-full border border-[#D8E2F7] bg-white px-3 py-2">{item}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-[#D8E2F7] bg-white/74 p-5">
            <h4 className="font-black text-[#071126]">Top Lead Sources</h4>
            <div className="mt-4 grid gap-3">
              {[
                ["Phone Calls", "42%"],
                ["Text Messages", "28%"],
                ["Website Forms", "18%"],
                ["Instagram DMs", "12%"]
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-3 text-xs font-bold text-[#647084]">
                  <span>{label}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-[#EAF1FF]">
                    <span className="block h-full rounded-full bg-[linear-gradient(90deg,#328BFF,#6F4DFF)]" style={{ width: value }} />
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-[#D8E2F7] bg-white/74 p-5">
          <h4 className="font-black text-[#071126]">Business Details</h4>
          <div className="mt-5 grid gap-4 text-sm">
            {[
              ["Business Type", "Home Services"],
              ["Location", "Birmingham, AL"],
              ["Main Services", "House washing, roof cleaning, driveway cleaning"],
              ["Hours", "Mon - Sat, 8AM - 6PM"]
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-black text-[#647084]">{label}</p>
                <p className="mt-1 font-bold text-[#071126]">{value}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-xl bg-[linear-gradient(135deg,#328BFF,#6F4DFF)] px-4 py-3 text-sm font-black text-white" type="button">
            Continue to Build Plan
          </button>
        </div>
      </div>
    </EnvoGlassCard>
  );
}

export function EnvoOgImageMockup({ className }: { className?: string }) {
  return (
    <div className={cn("relative isolate h-[630px] w-[1200px] overflow-hidden bg-[#FBFAF7] p-14 text-[#071126]", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_82%,rgba(111,77,255,0.18),transparent_36%),radial-gradient(circle_at_20%_16%,rgba(50,139,255,0.12),transparent_28%)]" />
      <EnvoWaveLines className="absolute -right-10 top-8 h-64 w-96 text-[#328BFF]/24" />
      <div className="grid h-full grid-cols-[1fr_0.62fr] items-center gap-12">
        <div>
          <EnvoLogo size="md" />
          <p className="mt-6 text-lg font-black uppercase tracking-[0.3em] text-[#647084]">
            RESPOND FASTER.
            <br />
            AUTOMATE SMARTER.
          </p>
          <p className="mt-6 max-w-[38rem] text-[3.3rem] font-black leading-[1.04] tracking-normal">
            Your AI worker for customer calls and leads.
          </p>
          <div className="mt-7 grid max-w-[32rem] grid-cols-3 gap-4">
            {["Respond Faster", "Automate Smarter", "Delight Customers"].map((item, index) => (
              <div key={item} className="text-center">
                <span className={cn("mx-auto flex size-12 items-center justify-center rounded-full", index === 0 ? "bg-[#EEEAFE] text-[#5968FF]" : index === 1 ? "bg-[#EAF1FF] text-[#2563EB]" : "bg-[#E3F8E9] text-[#34C759]")}>
                  {index === 0 ? <Zap className="size-6" aria-hidden="true" /> : index === 1 ? <Bot className="size-6" aria-hidden="true" /> : <UsersRound className="size-6" aria-hidden="true" />}
                </span>
                <p className="mt-2 text-xs font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <EnvoSignatureCard className="min-h-[21rem] rotate-[-4deg] rounded-[2rem] shadow-[0_38px_110px_rgba(7,17,38,0.24)]" />
      </div>
    </div>
  );
}

export function EnvoBrandBoardReference({ className }: { className?: string }) {
  return (
    <div className={cn("w-full rounded-[2.2rem] bg-[#FBFAF7]", className)}>
      <div className="mx-auto max-w-[86rem]">
        <div className="rounded-[2.2rem] border border-[#D8E2F7] bg-white/70 shadow-[0_34px_110px_rgba(7,17,38,0.12)]">
          <div className="px-8 py-12 text-center">
            <EnvoLogo className="justify-center" size="hero" />
            <p className="mt-5 text-sm font-black uppercase tracking-[0.38em] text-[#647084]">
              RESPOND FASTER. AUTOMATE SMARTER.
            </p>
          </div>
          <div className="border-y border-[#D8E2F7] px-8 py-8">
            <div className="grid gap-7 lg:grid-cols-[0.62fr_1.35fr_1fr] lg:items-center">
              <div className="flex flex-col items-center gap-4">
                <EnvoAppIcon className="w-44" />
                <p className="text-xs font-black uppercase tracking-normal text-[#647084]">APP ICON</p>
              </div>
              <EnvoSignatureCard className="min-h-[19rem]" />
              <EnvoFeatureStack panel />
            </div>
          </div>
          <div className="grid overflow-hidden rounded-b-[2.2rem] sm:grid-cols-4">
            {[
              "bg-white",
              "bg-[#EEEAFE]",
              "bg-[#071126]",
              "bg-black"
            ].map((surface, index) => (
              <div key={surface} className={cn("flex min-h-36 items-center justify-center", surface)}>
                <EnvoLogo size="md" tone={index >= 2 ? "dark" : "light"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
