import { Camera, Zap } from "lucide-react";
import {
  EnvoAppIcon,
  EnvoCtaButton,
  EnvoGlassCard,
  EnvoLogo
} from "@/components/site/envo/envo-brand-system";
import {
  AmbientBackground,
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
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1120px] flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-6 sm:gap-8">
            <header className="mx-auto text-center">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-[1.15rem] border border-white/12 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/24 backdrop-blur-2xl">
                <span className="flex size-9 items-center justify-center rounded-2xl border border-white/12 bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] text-white shadow-[0_0_32px_rgba(50,139,255,0.28)]">
                  <Zap className="size-5" aria-hidden="true" />
                </span>
                <h1 className="text-xl font-black tracking-normal text-white sm:text-2xl">
                  {PUBLIC_BRAND_NAME}
                </h1>
              </div>
              <p className="mt-4 text-lg font-semibold leading-7 text-[#F8FAFF] sm:text-xl">
                Choose what you need.
              </p>
            </header>

            <div className="grid w-full gap-4 md:grid-cols-2 lg:gap-5">
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
    <EnvoGlassCard className="relative isolate flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-[1.65rem] bg-[linear-gradient(145deg,rgba(248,250,255,0.98),rgba(238,234,254,0.9))] p-5 shadow-[0_34px_110px_rgba(37,99,235,0.22)] sm:rounded-[2rem] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(50,139,255,0.22),transparent_32%),radial-gradient(circle_at_86%_12%,rgba(111,77,255,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-[#6F4DFF]/18 blur-3xl" />

      <div className="relative">
        <div className="text-center">
          <EnvoLogo className="justify-center" size="lg" />
          <p className="mt-3 text-xs font-black uppercase tracking-normal text-[#647084]">
            RESPOND FASTER. AUTOMATE SMARTER.
          </p>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-[8rem_1fr] sm:items-center">
          <EnvoAppIcon className="mx-auto size-28 rounded-[1.7rem] p-2.5 sm:mx-0" />
          <div>
            <h2 className="sr-only">Envo</h2>
            <p className="text-xl font-black leading-snug text-[#071126]">
              Your AI worker for customer calls and leads.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#647084]">
              Respond faster, automate follow-up, and keep every lead organized.
            </p>
          </div>
        </div>
      </div>

      <EnvoCtaButton className="relative mt-7 w-full sm:w-fit" href="/envo">
        Enter Envo
      </EnvoCtaButton>
    </EnvoGlassCard>
  );
}

function DroneDoorwayCard() {
  return (
    <GlassCard className="flex min-h-[24rem] flex-col justify-between p-5 sm:p-6" hover theme={droneTheme}>
      <div>
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-4xl font-black tracking-normal text-white sm:text-5xl">
              Drone Services
            </h2>
            <p className="mt-3 text-lg font-black leading-snug text-white sm:text-xl">
              FAA Part 107 aerial photo and video in Birmingham, AL.
            </p>
          </div>
          <div className="flex size-14 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white/[0.06] text-[color:var(--vs-accent-3)] shadow-[0_0_32px_var(--vs-glow)]">
            <Camera className="size-6" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
          Real estate, property, construction, local business, land, event, and vehicle visuals.
        </p>
      </div>
      <GlowButton className="mt-7 w-full sm:w-fit" href="/drone" icon={false} theme={droneTheme} variant="secondary">
        View Drone Services
      </GlowButton>
    </GlassCard>
  );
}
