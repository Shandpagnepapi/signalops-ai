import Image from "next/image";
import { Camera, Sparkles, Zap } from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton
} from "@/components/site/visual-system";
import { getEmailHref, PUBLIC_BRAND_NAME } from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

export function MarketingHome() {
  return (
    <div className="overflow-hidden bg-[#05030a] text-white">
      <section className="premium-section min-h-[100svh]">
        <AmbientBackground intensity="strong" theme={theme} />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1180px] flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-7 py-6 sm:gap-9 lg:py-10">
            <header className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-[1.35rem] border border-white/12 bg-white/[0.055] px-4 py-3 shadow-2xl shadow-black/24 backdrop-blur-2xl">
                <Image
                  src="/brand/signalops-logo-mark.svg"
                  alt=""
                  width={42}
                  height={42}
                  priority
                  className="size-10"
                />
                <h1 className="text-2xl font-black tracking-normal text-white sm:text-3xl">
                  {PUBLIC_BRAND_NAME}
                </h1>
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[color:var(--vs-muted)] sm:text-lg">
                AI lead automation and local aerial media, built for small businesses.
              </p>
            </header>

            <div className="grid w-full gap-4 lg:grid-cols-[1.07fr_0.93fr] lg:items-stretch">
              <EnvoDoorwayCard />
              <DroneDoorwayCard />
            </div>
          </div>

          <footer className="flex flex-wrap items-center justify-center gap-3 pb-1 text-xs font-bold text-white/48">
            <a className="transition hover:text-white" href={getEmailHref()}>
              Contact
            </a>
            <span aria-hidden="true">/</span>
            <a className="transition hover:text-white" href="/privacy">
              Privacy
            </a>
            <span aria-hidden="true">/</span>
            <a className="transition hover:text-white" href="/terms">
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
    <GlassPanel className="cinematic-panel flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7" theme={theme}>
      <div>
        <FloatingBadge icon={Zap} theme={theme}>Main option</FloatingBadge>
        <div className="mt-7 flex items-start justify-between gap-5">
          <div>
            <h2 className="text-5xl font-black tracking-normal text-white sm:text-6xl">
              Envo
            </h2>
            <p className="mt-3 text-xl font-black leading-snug text-white sm:text-2xl">
              Your AI worker for customer calls and leads.
            </p>
          </div>
          <div className="hidden size-16 shrink-0 items-center justify-center rounded-[1.35rem] border border-white/12 bg-[image:var(--vs-button-gradient)] text-white shadow-[0_0_42px_var(--vs-glow)] sm:flex">
            <Sparkles className="size-7" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
          Trained to your business. Built to answer, organize, follow up, and hand off every opportunity.
        </p>
      </div>
      <GlowButton className="mt-7 w-full sm:w-fit" href="/envo" theme={theme}>
        Enter Envo
      </GlowButton>
    </GlassPanel>
  );
}

function DroneDoorwayCard() {
  return (
    <GlassCard className="flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7" hover theme={theme}>
      <div>
        <FloatingBadge icon={Camera} theme={theme}>FAA Part 107</FloatingBadge>
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
      </div>
      <GlowButton className="mt-7 w-full sm:w-fit" href="/drone" icon={false} theme={theme} variant="secondary">
        View Drone Services
      </GlowButton>
    </GlassCard>
  );
}
