import { CheckCircle2, Edit3, ShieldAlert } from "lucide-react";
import {
  FloatingBadge,
  GlassCard,
  MobileDeviceFrame
} from "@/components/site/visual-system";
import { visualThemes } from "@/lib/visual-themes";
import { cn } from "@/lib/utils";

const theme = visualThemes.envoWarm;

const triageCards = [
  {
    actions: ["Approve"],
    count: "08",
    copy: "Envo has qualified the lead and proposed Tuesday at 10:00 AM.",
    icon: CheckCircle2,
    label: "Lisa M. - Kitchen remodel inquiry",
    status: "Ready to send",
    tone: "ready"
  },
  {
    actions: ["Edit", "Approve"],
    count: "03",
    copy: "Envo recommends a site visit this week and prepared a pricing-range reply.",
    icon: Edit3,
    label: "David R. - Roof repair",
    status: "Needs approval",
    tone: "approval"
  },
  {
    actions: ["Take over"],
    count: "01",
    copy: "Lead mentioned insurance claim and legal concerns.",
    icon: ShieldAlert,
    label: "Sarah K. - Water damage",
    status: "Human review recommended",
    tone: "review"
  }
] as const;

export function EnvoOwnerTriage() {
  const stats = [
    { label: "Ready", value: "8" },
    { label: "Approve", value: "3" },
    { label: "Review", value: "1" }
  ];

  return (
    <section className="premium-section">
      <div className="relative mx-auto grid max-w-[1450px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <FloatingBadge theme={theme}>Owner Triage</FloatingBadge>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
            Approve, edit, or take over from your phone.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
            Envo handles the routine path and surfaces the judgment calls. The mobile triage view makes it feel like a
            real AI employee your team can supervise instead of a black box.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {triageCards.map((card) => (
              <GlassCard key={card.status} className="p-4" theme={theme}>
                <p className="text-2xl font-black text-[color:var(--vs-accent-3)]">{card.count}</p>
                <p className="text-sm font-black text-white">{card.status}</p>
                <p className="mt-1 text-xs leading-5 text-[color:var(--vs-muted)]">{card.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <MobileDeviceFrame
          className="w-full max-w-md"
          eyebrow="Owner Triage"
          footerItems={["Queue", "Rules", "Team"]}
          stats={stats}
          status="Live"
          theme={theme}
          title="Today's lead queue"
        >
          {triageCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className={cn(
                  "rounded-[1.35rem] border p-3 shadow-xl shadow-black/18 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/24",
                  card.tone === "ready" && "border-emerald-300/24 bg-emerald-300/10",
                  card.tone === "approval" && "border-[color:var(--vs-border)] bg-white/[0.07]",
                  card.tone === "review" && "border-[#ff6f9c]/28 bg-[#ff6f9c]/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--vs-button-gradient)] text-white">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[color:var(--vs-accent-3)]">
                      {card.status}
                    </p>
                    <p className="mt-1 text-sm font-black leading-5 text-white">{card.label}</p>
                    <p className="mt-2 text-xs leading-5 text-[color:var(--vs-muted)]">{card.copy}</p>
                  </div>
                </div>
                <div className={cn("mt-3 grid gap-2", card.actions.length === 2 ? "grid-cols-2" : "grid-cols-1")}>
                  {card.actions.map((action, index) => (
                    <button
                      key={action}
                      className={cn(
                        "h-10 rounded-2xl text-xs font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]",
                        index === card.actions.length - 1
                          ? "bg-[image:var(--vs-button-gradient)] text-white"
                          : "border border-white/12 bg-white/[0.055] text-white/76"
                      )}
                      type="button"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </MobileDeviceFrame>
      </div>
    </section>
  );
}
