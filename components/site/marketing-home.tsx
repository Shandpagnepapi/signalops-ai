import { Camera, ShieldCheck, Zap } from "lucide-react";
import {
  EnvoAppIcon,
  EnvoCtaButton,
  EnvoDarkCard,
  EnvoFeaturePill,
  EnvoGlassCard,
  EnvoLogo,
  EnvoMark,
  envoFeatureItems
} from "@/components/site/envo/envo-brand-system";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlowButton
} from "@/components/site/visual-system";
import { getEmailHref, PUBLIC_BRAND_NAME } from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;
const droneTheme = visualThemes.studioCool;

export function MarketingHome() {
  return (
    <div className="overflow-hidden bg-[#071126] text-white">
      <section className="premium-section min-h-[100svh]">
        <AmbientBackground intensity="strong" theme={theme} />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1240px] flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-5 sm:gap-8 lg:py-9">
            <header className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-[1.25rem] border border-white/12 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/24 backdrop-blur-2xl">
                <span className="flex size-10 items-center justify-center rounded-2xl border border-white/12 bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] text-white shadow-[0_0_32px_rgba(50,139,255,0.28)]">
                  <Zap className="size-5" aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-black tracking-normal text-white sm:text-3xl">
                  {PUBLIC_BRAND_NAME}
                </h1>
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#D7E2F7]/78 sm:text-lg">
                A parent venture studio for practical AI operations and local media services.
              </p>
            </header>

            <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:items-stretch">
              <EnvoDoorwayCard />
              <DroneDoorwayCard />
            </div>
          </div>

          <footer className="flex flex-wrap items-center justify-center gap-1 pb-1 text-xs font-bold text-white/48 sm:gap-2">
            <a className="inline-flex min-h-9 items-center rounded-full px-3 transition hover:bg-white/8 hover:text-white" href={getEmailHref()}>
              Contact
            </a>
            <span aria-hidden="true">/</span>
            <a className="inline-flex min-h-9 items-center rounded-full px-3 transition hover:bg-white/8 hover:text-white" href="/privacy">
              Privacy
            </a>
            <span aria-hidden="true">/</span>
            <a className="inline-flex min-h-9 items-center rounded-full px-3 transition hover:bg-white/8 hover:text-white" href="/terms">
              Terms
            </a>
          </footer>
        </div>
      </section>
    </div>
  );
}

function EnvoDoorwayCard() {
  return (
    <EnvoGlassCard className="relative isolate overflow-hidden rounded-[1.65rem] bg-[linear-gradient(145deg,rgba(248,250,255,0.96),rgba(238,234,254,0.88))] p-4 shadow-[0_34px_110px_rgba(37,99,235,0.22)] sm:rounded-[2rem] sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(50,139,255,0.22),transparent_32%),radial-gradient(circle_at_86%_12%,rgba(111,77,255,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#6F4DFF]/18 blur-3xl" />

      <div className="relative grid h-full gap-5 lg:grid-cols-[minmax(0,0.98fr)_minmax(250px,0.82fr)] lg:items-stretch">
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <EnvoFeaturePill className="normal-case tracking-normal" icon={Zap}>
              Main option
            </EnvoFeaturePill>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <EnvoLogo size="lg" />
                <p className="mt-4 text-2xl font-black leading-tight tracking-normal text-[#071126] sm:text-3xl">
                  Your AI worker for customer calls and leads.
                </p>
              </div>
              <EnvoAppIcon className="hidden w-16 shrink-0 rounded-[1.35rem] p-2 sm:flex" />
            </div>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#647084]">
              Trained to your business. Built to answer, organize, follow up, and hand off every opportunity.
            </p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {envoFeatureItems.map((feature) => (
                <EnvoGlassCard
                  key={feature.title}
                  className="rounded-2xl bg-white/68 px-3 py-3 shadow-[0_12px_34px_rgba(37,99,235,0.08)]"
                >
                  <p className="text-sm font-black leading-5 text-[#071126]">{feature.title}</p>
                </EnvoGlassCard>
              ))}
            </div>
          </div>

          <EnvoCtaButton className="mt-6 w-full sm:w-fit" href="/envo">
            Enter Envo
          </EnvoCtaButton>
        </div>

        <div className="grid min-w-0 gap-3">
          <EnvoDarkCard className="rounded-[1.35rem] p-5">
            <div className="flex items-start justify-between gap-4">
              <EnvoLogo size="sm" tone="dark" />
              <EnvoMark className="size-10 shrink-0" />
            </div>
            <p className="mt-8 text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl lg:text-3xl xl:text-4xl">
              Smarter conversations.
              <br />
              Stronger connections.
            </p>
          </EnvoDarkCard>

          <EnvoGlassCard className="rounded-[1.25rem] bg-white/62 p-4 shadow-none">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Reply", "4.3s"],
                ["Priority", "High"],
                ["Handoff", "Ready"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#D8E2F7] bg-[#F8FAFF]/88 p-3 text-center">
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#647084]">{label}</p>
                  <p className="mt-1 text-sm font-black text-[#071126]">{value}</p>
                </div>
              ))}
            </div>
          </EnvoGlassCard>
        </div>
      </div>
    </EnvoGlassCard>
  );
}

function DroneDoorwayCard() {
  return (
    <GlassCard className="flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7" hover theme={droneTheme}>
      <div>
        <FloatingBadge icon={Camera} theme={droneTheme}>FAA Part 107</FloatingBadge>
        <div className="mt-7 flex items-start justify-between gap-5">
          <div>
            <h2 className="text-4xl font-black tracking-normal text-white sm:text-5xl">
              Drone Services
            </h2>
            <p className="mt-3 text-lg font-black leading-snug text-white sm:text-xl">
              FAA Part 107 aerial photo and video in Birmingham, AL.
            </p>
          </div>
          <div className="hidden size-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white/[0.06] text-[color:var(--vs-accent-3)] shadow-[0_0_32px_var(--vs-glow)] sm:flex">
            <Camera className="size-6" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
          Real estate, property, construction, local business, land, event, and vehicle visuals.
        </p>
        <div className="mt-5 grid gap-2">
          {["Birmingham area", "Commercial drone work", "Clean local visuals"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-white/76">
              <ShieldCheck className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <GlowButton className="mt-7 w-full sm:w-fit" href="/drone" icon={false} theme={droneTheme} variant="secondary">
        View Drone Services
      </GlowButton>
    </GlassCard>
  );
}
