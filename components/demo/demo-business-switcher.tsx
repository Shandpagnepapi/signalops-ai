"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Menu,
  PlayCircle,
  Sparkles,
  X,
  Zap
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref, PRIMARY_CTA, PUBLIC_BRAND_NAME } from "@/lib/constants";
import {
  demoBusinessOptions,
  demoBusinesses,
  type DemoBusinessConfig,
  type DemoBusinessKey
} from "@/lib/demo-businesses";
import { cn } from "@/lib/utils";
import { RouteWashDemoSite } from "./routewash-site";

const emailHref = getEmailHref();

const navLinks = [
  { href: "/envo", label: "Envo" },
  { href: "#demo-lead-form", label: "Try the demo" },
  { href: "/preview", label: "Preview" }
] as const;

export function DemoBusinessSwitcher() {
  const [selectedBusiness, setSelectedBusiness] = useState<DemoBusinessKey>("fleet-wash");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const business = demoBusinesses[selectedBusiness];

  function selectBusiness(value: DemoBusinessKey) {
    setSelectedBusiness(value);
    setIsMenuOpen(false);
  }

  return (
    <div className="envo-shuffle min-h-screen overflow-hidden bg-zinc-950 font-body text-zinc-100 antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.2),transparent_34%),radial-gradient(circle_at_78%_10%,rgba(111,77,255,0.16),transparent_31%),radial-gradient(circle_at_82%_72%,rgba(52,199,89,0.13),transparent_30%),linear-gradient(180deg,#05060A_0%,#071126_48%,#030611_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:58px_58px] [mask-image:radial-gradient(circle_at_50%_12%,black,transparent_68%)]" />

      <DemoNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <section className="relative px-6 pb-12 pt-8 md:px-12 md:pb-16 md:pt-14 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Envo by SignalOpsAI demo
            </div>
            <h1 className="font-heading text-4xl leading-tight tracking-tight text-white md:text-5xl xl:text-6xl">
              <span>See Envo handle a lead.</span>
              <br />
              <span className="text-emerald-400">Watch the handoff happen.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              Watch Envo answer, qualify, follow up, and prepare the handoff for a sample service business.
            </p>

            <WorkflowSelector selectedBusiness={selectedBusiness} onSelect={selectBusiness} />

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo-lead-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-emerald-400 active:scale-95"
              >
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                <span>Run sample lead</span>
              </a>
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName={ANALYTICS_EVENTS.previewCtaClicked}
                eventProperties={{ location: "demo_hero" }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-700 px-7 py-3 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-white"
              >
                <span>{PRIMARY_CTA.label}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <HeroWorkspace business={business} />
          </div>
        </div>
      </section>

      <RouteWashDemoSite business={business} />
      <DemoFooter />
    </div>
  );
}

function DemoNav({
  isMenuOpen,
  setIsMenuOpen
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <nav className="w-full px-6 py-5 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={`${PUBLIC_BRAND_NAME} home`}>
          <LogoMark className="h-9 w-9" iconClassName="h-5 w-5" />
          <span className="font-heading text-lg tracking-tight text-white">{PUBLIC_BRAND_NAME}</span>
          <span className="hidden rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-500 sm:inline">
            Envo demo
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <TrackedLink
          href="/preview"
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "demo_nav" }}
          className="hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-400 active:scale-95 md:inline-flex"
        >
          <span>Get Envo</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
        </TrackedLink>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 md:hidden"
          aria-controls="demo-mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="demo-mobile-menu"
        className={`${isMenuOpen ? "flex" : "hidden"} mt-4 flex-col gap-4 border-t border-zinc-800/60 pb-4 pt-4 md:hidden`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/preview"
          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950"
          onClick={() => setIsMenuOpen(false)}
        >
          Get Envo
        </Link>
      </div>
    </nav>
  );
}

function WorkflowSelector({
  onSelect,
  selectedBusiness
}: {
  onSelect: (value: DemoBusinessKey) => void;
  selectedBusiness: DemoBusinessKey;
}) {
  return (
    <div className="mt-7 rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-2 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <p className="px-2 pb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">Choose workflow</p>
      <div className="grid gap-2 sm:grid-cols-2" role="tablist" aria-label="Choose a demo workflow">
        {demoBusinessOptions.map((option) => {
          const isSelected = selectedBusiness === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={cn(
                "min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                isSelected
                  ? "border-emerald-500/30 bg-emerald-500/15 text-white shadow-[0_14px_36px_rgba(16,185,129,0.16)]"
                  : "border-zinc-800/70 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700 hover:text-white"
              )}
              onClick={() => onSelect(option.value as DemoBusinessKey)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HeroWorkspace({ business }: { business: DemoBusinessConfig }) {
  const cards = business.qualificationPreview.cards.slice(0, 3);

  return (
    <div className="relative">
      <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_68%_12%,rgba(50,139,255,0.28),transparent_34%),radial-gradient(circle_at_32%_86%,rgba(52,199,89,0.16),transparent_36%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/80 shadow-2xl shadow-emerald-500/5">
        <div className="flex items-center gap-2 border-b border-zinc-800/60 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="ml-4 h-5 max-w-sm flex-1 rounded-md bg-zinc-800/60" />
        </div>
        <div className="p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Envo command workspace</p>
              <h2 className="mt-2 font-heading text-2xl tracking-tight text-white md:text-3xl">{business.selectorLabel}</h2>
              <p className="mt-1 text-sm text-zinc-500">{business.industry}</p>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Demo mode
            </span>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <HeroMetric label="Response time" value="Fast reply" detail="Demo sequence" />
            <HeroMetric label="Priority" value={business.key === "well-water" ? "Urgent" : "Account"} detail="Owner review" />
            <HeroMetric label="Next action" value="Handoff" detail="Packaged lead" />
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-800/30">
              <div className="flex items-center justify-between border-b border-zinc-800/50 px-4 py-2.5">
                <span className="text-xs font-medium text-zinc-400">Incoming lead summary</span>
                <span className="text-xs text-zinc-600">Live demo</span>
              </div>
              <div className="divide-y divide-zinc-800/40">
                {cards.map((card, index) => (
                  <div key={card.title} className="flex items-start gap-3 px-4 py-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                        index === 0 && "bg-emerald-500/15 text-emerald-400",
                        index === 1 && "bg-blue-500/15 text-blue-400",
                        index === 2 && "bg-violet-500/15 text-violet-400"
                      )}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">{card.title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-zinc-500">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <BarChart3 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-emerald-400">Owner sees</p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">{business.qualificationPreview.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {business.trustBadges.slice(0, 3).map((badge) => (
                  <span key={badge} className="rounded-full border border-zinc-700/70 bg-zinc-950/45 px-3 py-1 text-xs text-zinc-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroMetric({ detail, label, value }: { detail: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-800/50 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 font-heading text-xl text-white">{value}</div>
      <div className="mt-0.5 text-xs text-emerald-400">{detail}</div>
    </div>
  );
}

function DemoFooter() {
  return (
    <footer className="w-full border-t border-zinc-800/40 px-6 py-8 md:px-12 md:py-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" iconClassName="h-4 w-4" />
            <div>
              <span className="font-heading text-sm text-white">{PUBLIC_BRAND_NAME}</span>
              <span className="ml-2 text-xs text-zinc-600">/ Envo demo</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 md:gap-8">
            <Link href="/privacy" className="transition-colors hover:text-zinc-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-zinc-300">
              Terms
            </Link>
            <TrackedLink
              href={emailHref}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "demo_footer", type: "email" }}
              className="transition-colors hover:text-zinc-300"
            >
              Contact
            </TrackedLink>
          </div>
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/30 pt-5 sm:flex-row">
          <p className="text-xs text-zinc-600">2026 SignalOpsAI. All rights reserved.</p>
          <p className="text-xs text-zinc-700">Demo workflows for Envo lead handling.</p>
        </div>
      </div>
    </footer>
  );
}

function LogoMark({
  className,
  iconClassName
}: {
  className: string;
  iconClassName: string;
}) {
  return (
    <span
      className={cn("flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/20", className)}
      aria-hidden="true"
    >
      <Zap className={cn("text-emerald-400", iconClassName)} />
    </span>
  );
}
