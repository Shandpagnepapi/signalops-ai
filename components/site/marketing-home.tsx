import Image from "next/image";
import {
  Camera,
  MapPin,
  Sparkles,
  Video,
  Zap
} from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton,
  TranslucentNav
} from "@/components/site/visual-system";
import {
  PRODUCT_NAME,
  PRODUCT_ROLE,
  PUBLIC_BRAND_NAME
} from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const navItems = [
  { href: "/envo", label: "Envo" },
  { href: "/drone", label: "Drone" },
  { href: "/demo", label: "Demo" },
  { href: "/preview", label: "Preview Envo" }
];

export function MarketingHome() {
  return (
    <div className="overflow-hidden bg-[#05030a] text-white">
      <HeroSplash />
      <DoorwayCards />
    </div>
  );
}

function HeroSplash() {
  return (
    <section className="premium-section min-h-[70vh]">
      <AmbientBackground intensity="strong" theme={theme} />
      <div className="relative mx-auto flex min-h-[70vh] max-w-[1450px] flex-col px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <TranslucentNav brand={PUBLIC_BRAND_NAME} brandHref="/" items={navItems} theme={theme} />

        <div className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl text-center">
            <FloatingBadge icon={Sparkles} theme={theme}>
              {PUBLIC_BRAND_NAME}
            </FloatingBadge>
            <h1 className="mt-5 text-[2.65rem] font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              SignalOpsAI builds Envo, your AI worker for customer calls and leads.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[color:var(--vs-muted)] sm:text-xl">
              Envo is trained to your business, handles customer calls and leads, follows up, and keeps every opportunity organized.
            </p>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none sm:justify-center">
              <GlowButton className="w-full !px-3 sm:w-auto" href="/envo" theme={theme}>
                Enter Envo
              </GlowButton>
              <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" icon={false} theme={theme} variant="secondary">
                Preview Envo
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoorwayCards() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 sm:pb-16 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.32fr_0.68fr] lg:items-stretch">
          <EnvoDoorwayCard />
          <DroneDoorwayCard />
        </div>
      </div>
    </section>
  );
}

function EnvoDoorwayCard() {
  return (
    <GlassPanel className="cinematic-panel grid gap-5 p-4 sm:p-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" theme={theme}>
      <GlassCard className="p-5 sm:p-6" theme={theme}>
        <FloatingBadge icon={Zap} theme={theme}>Main focus</FloatingBadge>
        <h2 className="mt-5 text-4xl font-black tracking-normal text-white sm:text-5xl">
          {PRODUCT_NAME}
        </h2>
        <p className="mt-1 text-sm font-black uppercase tracking-[0.18em] text-[color:var(--vs-accent-3)]">
          {PRODUCT_ROLE}
        </p>
        <p className="mt-5 text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
          AI worker for customer calls, missed calls, messages, leads, follow-ups, organization, and owner handoffs.
        </p>
        <div className="mt-6 grid gap-2">
          {["Customer calls", "Lead dashboard", "Owner handoffs"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-white/78">
              <span className="size-2 rounded-full bg-[color:var(--vs-accent-3)]" />
              {item}
            </div>
          ))}
        </div>
        <GlowButton className="mt-6 w-full sm:w-auto" href="/envo" theme={theme}>
          Enter Envo
        </GlowButton>
      </GlassCard>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08050d]/62 p-2 shadow-2xl shadow-black/30">
        <Image
          src="/product-previews/envo-dashboard-desktop.svg"
          alt="Envo customer dashboard preview with lead stages and customer messages"
          width={1200}
          height={760}
          priority
          className="hidden h-auto w-full rounded-[1.25rem] md:block"
        />
        <Image
          src="/product-previews/envo-dashboard-mobile.svg"
          alt="Envo mobile owner inbox preview"
          width={430}
          height={760}
          priority
          className="mx-auto h-auto max-h-[28rem] w-auto rounded-[1.25rem] md:hidden"
        />
      </div>
    </GlassPanel>
  );
}

function DroneDoorwayCard() {
  return (
    <GlassCard className="flex h-full flex-col justify-between p-5 sm:p-6" hover theme={theme}>
      <div>
        <FloatingBadge icon={Camera} theme={theme}>Coming Soon / Planning</FloatingBadge>
        <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#08050d]/54 p-4">
          <div className="relative min-h-44">
            <div className="absolute inset-0 rounded-[1rem] bg-[radial-gradient(circle_at_50%_45%,rgba(255,179,109,0.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.02))]" />
            <div className="absolute inset-4 rounded-[1rem] border border-white/10" />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/26 px-3 py-2 text-xs font-black text-white/72">
              <MapPin className="size-3.5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
              Local aerial visuals
            </div>
            <div className="absolute bottom-5 right-5 flex size-16 items-center justify-center rounded-[1.25rem] border border-white/12 bg-white/[0.06] text-[color:var(--vs-accent-3)] shadow-[0_0_36px_var(--vs-glow)]">
              <Video className="size-7" aria-hidden="true" />
            </div>
            <div className="absolute bottom-8 left-7 h-px w-32 bg-[linear-gradient(90deg,var(--vs-accent-3),transparent)]" />
            <div className="absolute bottom-14 left-12 h-px w-20 bg-[linear-gradient(90deg,var(--vs-accent),transparent)]" />
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-black tracking-normal text-white sm:text-4xl">
          Local Drone Operator
        </h2>
        <p className="mt-4 text-sm leading-7 text-[color:var(--vs-muted)]">
          Aerial photo and video services for real estate, property, construction, local businesses, and special projects.
        </p>
        <div className="mt-5 grid gap-2 text-xs font-black text-white/70">
          {["Property photos", "Listing visuals", "Construction progress", "Local promo footage"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </div>
      <GlowButton className="mt-6 w-full" href="/drone" icon={false} theme={theme} variant="secondary">
        View Drone Services
      </GlowButton>
    </GlassCard>
  );
}
