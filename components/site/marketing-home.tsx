import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  MessageSquareReply,
  PhoneCall,
  Sparkles,
  SquarePen,
  Workflow,
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
  { href: "/demo", label: "Demo" },
  { href: "/envo#pricing", label: "Pricing" },
  { href: "/preview", label: "Preview Envo" }
];

const handleCards = [
  {
    copy: "Answer, organize, and route customer calls.",
    icon: PhoneCall,
    title: "Customer calls"
  },
  {
    copy: "Turn missed calls and texts into clean next steps.",
    icon: MessageSquareReply,
    title: "Missed calls and texts"
  },
  {
    copy: "Collect quote details without losing the lead.",
    icon: SquarePen,
    title: "New leads and quote requests"
  },
  {
    copy: "Follow up and hand off when a person should step in.",
    icon: BellRing,
    title: "Follow-ups and handoffs"
  }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

export function MarketingHome() {
  return (
    <div className="overflow-hidden bg-[#05030a] text-white">
      <HeroSplash />
      <WhatEnvoHandles />
      <DashboardPreview />
      <FinalCta />
    </div>
  );
}

function HeroSplash() {
  return (
    <section className="premium-section min-h-[92vh]">
      <AmbientBackground intensity="strong" theme={theme} />
      <div className="relative mx-auto flex min-h-[92vh] max-w-[1450px] flex-col px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <TranslucentNav brand={PUBLIC_BRAND_NAME} brandHref="/" items={navItems} theme={theme} />

        <div className="grid flex-1 gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-14">
          <div className="max-w-4xl">
            <FloatingBadge icon={Sparkles} theme={theme}>
              {PUBLIC_BRAND_NAME} builds Envo
            </FloatingBadge>
            <h1 className="mt-5 text-[2.8rem] font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Meet Envo, the AI worker for customer calls and leads.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--vs-muted)] sm:text-xl">
              Envo is trained to your business, handles customer calls and leads, follows up, and keeps every opportunity organized.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-row">
              <GlowButton className="w-full !px-3 sm:w-auto" href="/envo" theme={theme}>
                Enter Envo
              </GlowButton>
              <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" icon={false} theme={theme} variant="secondary">
                Preview Envo
              </GlowButton>
            </div>
          </div>

          <SplashProductVisual />
        </div>
      </div>
    </section>
  );
}

function SplashProductVisual() {
  return (
    <GlassPanel className="cinematic-panel grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.72fr_1.28fr] xl:items-center" theme={theme}>
      <GlassCard className="p-5" theme={theme}>
        <FloatingBadge icon={Zap} theme={theme}>One product</FloatingBadge>
        <h2 className="mt-5 text-4xl font-black tracking-normal text-white">{PRODUCT_NAME}</h2>
        <p className="mt-1 text-sm font-black uppercase tracking-[0.18em] text-[color:var(--vs-accent-3)]">
          {PRODUCT_ROLE}
        </p>
        <p className="mt-5 text-sm leading-7 text-[color:var(--vs-muted)]">
          Envo answers, organizes, follows up, and prepares owner handoffs from one customer lead dashboard.
        </p>
        <div className="mt-6 grid gap-2">
          {["Trained to your business", "Customer inbox organized", "Owner handoff ready"].map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-black text-white/78">
              <span className="size-2 rounded-full bg-[color:var(--vs-accent-3)]" />
              {item}
            </div>
          ))}
        </div>
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
          className="mx-auto h-auto max-h-[34rem] w-auto rounded-[1.25rem] md:hidden"
        />
      </div>
    </GlassPanel>
  );
}

function WhatEnvoHandles() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {handleCards.map((card) => {
            const Icon = card.icon;

            return (
              <GlassCard key={card.title} className="p-5" hover theme={theme}>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[image:var(--vs-button-gradient)] text-white shadow-[0_0_28px_var(--vs-glow)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl font-black text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">{card.copy}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-center" theme={theme}>
          <div>
            <FloatingBadge icon={Workflow} theme={theme}>Customer dashboard preview</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              A simple owner inbox for every opportunity.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
              Envo keeps calls, missed calls, messages, social leads, quote requests, follow-ups, and handoffs in one clean control center.
            </p>
          </div>
          <Image
            src="/product-previews/envo-dashboard-desktop.svg"
            alt="Dark glass Envo dashboard preview with lead stages and customer lead cards"
            width={1200}
            height={760}
            className="hidden h-auto w-full rounded-[1.6rem] md:block"
          />
          <Image
            src="/product-previews/envo-dashboard-mobile.svg"
            alt="Mobile Envo lead queue preview with owner action buttons"
            width={430}
            height={760}
            className="mx-auto h-auto max-h-[34rem] w-auto rounded-[1.6rem] md:hidden"
          />
        </GlassPanel>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 lg:px-8">
        <GlassPanel className="p-6 text-center sm:p-8 lg:p-10" theme={theme}>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
            Envo by {PUBLIC_BRAND_NAME}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl">
            See how Envo would work for your business.
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
            <GlowButton className="w-full !px-3 sm:w-auto" href="/envo" theme={theme}>
              Enter Envo
            </GlowButton>
            <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" icon={false} theme={theme} variant="secondary">
              Preview Envo
            </GlowButton>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
