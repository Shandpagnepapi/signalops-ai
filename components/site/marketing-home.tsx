import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  Bot,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Mail,
  MessageSquareReply,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton,
  LeadSourceTile,
  OrbitalProductVisual,
  PremiumPricingCard,
  RuleCard,
  TranslucentNav,
  TrustLogoStrip
} from "@/components/site/visual-system";
import { TrackedLink } from "@/components/site/tracked-link";
import { buttonVariants } from "@/components/ui/button";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import {
  getEmailHref,
  getPlanEmailHref,
  PACKAGE_NAMES,
  PRODUCT_FULL_NAME,
  PRODUCT_NAME,
  PRODUCT_ROLE,
  SITE_CONFIG
} from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";
import type { VisualTheme } from "@/lib/visual-themes";

const studioTheme = visualThemes.studioWarm;
const envoTheme = visualThemes.envoWarm;
const coolTheme = visualThemes.studioCool;

const navItems = [
  { href: "/#studio", label: "Studio" },
  { href: "/#products", label: "Products" },
  { href: "/envo", label: "Envo" },
  { href: "/demo", label: "Demo" },
  { href: "/#pricing", label: "Packages" },
  { href: getEmailHref(), label: "Contact" }
];

const leadSources = [
  { label: "Calls", icon: MessageSquareReply },
  { label: "Forms", icon: ClipboardCheck },
  { label: "Texts", icon: Mail },
  { label: "Calendar", icon: CalendarCheck2 },
  { label: "CRM", icon: Workflow },
  { label: "Owner", icon: BellRing }
] satisfies Array<{ icon: LucideIcon; label: string }>;

const productLineup = [
  {
    copy: "Answers, qualifies, follows up, and hands off leads so you never miss the next job.",
    name: "Envo",
    role: "AI Lead Manager",
    status: "Featured / Live",
    theme: envoTheme
  },
  {
    copy: "Turns happy-customer moments into review requests and reputation workflows.",
    name: "Rally",
    role: "AI Review Manager",
    status: "Coming Soon",
    theme: studioTheme
  },
  {
    copy: "Keeps internal workflows moving across teams, tools, and recurring operating tasks.",
    name: "Flux",
    role: "AI Operations Assistant",
    status: "Coming Soon",
    theme: coolTheme
  },
  {
    copy: "Surfaces cash-flow, invoices, job value, and finance follow-ups for owner review.",
    name: "Ledger",
    role: "AI Finance Copilot",
    status: "Coming Soon",
    theme: studioTheme
  }
];

const envoFeatures = [
  {
    copy: "Replies to new inquiries while intent is still fresh.",
    icon: MessageSquareReply,
    title: "24/7 AI lead response"
  },
  {
    copy: "Asks for timing, service needs, location, photos, and missing details.",
    icon: ClipboardCheck,
    title: "Smart lead qualification"
  },
  {
    copy: "Keeps quote requests and no-replies from quietly going cold.",
    icon: RefreshCcw,
    title: "Automated follow-ups"
  },
  {
    copy: "Prepares booking, CRM notes, owner alerts, and clean next steps.",
    icon: CalendarCheck2,
    title: "Calendar / CRM sync"
  }
];

const outcomeMetrics = [
  { copy: "Answer while the lead is still paying attention.", label: "Faster response" },
  { copy: "Send the owner source, details, status, and suggested next action.", label: "Cleaner handoffs" },
  { copy: "Keep no-replies and missing details from disappearing.", label: "Fewer forgotten follow-ups" },
  { copy: "See where leads came from and what needs attention next.", label: "Better lead visibility" }
];

const pricingCards = [
  {
    copy: `${PACKAGE_NAMES[0].summary} Setup from $750.`,
    name: PACKAGE_NAMES[0].name,
    price: PACKAGE_NAMES[0].price
  },
  {
    copy: `${PACKAGE_NAMES[1].summary} Setup from $1,500.`,
    name: PACKAGE_NAMES[1].name,
    price: PACKAGE_NAMES[1].price
  },
  {
    copy: `${PACKAGE_NAMES[2].summary} Buildout from $5,000+.`,
    name: PACKAGE_NAMES[2].name,
    price: PACKAGE_NAMES[2].price
  }
];

export function MarketingHome() {
  return (
    <main className="overflow-hidden bg-[#07040f] text-white">
      <HeroSection />
      <FeaturedProductSection />
      <ProductLineupSection />
      <StudioVisionSection />
      <TrustAndOutcomesSection />
      <PackagesSection />
      <FinalCTASection />
    </main>
  );
}

function HeroSection() {
  return (
    <section id="studio" className="premium-section lg:min-h-screen">
      <AmbientBackground intensity="strong" theme={studioTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <TranslucentNav brand={SITE_CONFIG.name} brandHref="/" items={navItems} theme={studioTheme} />

        <div className="grid gap-8 pb-4 pt-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:pt-16">
          <div>
            <FloatingBadge icon={Sparkles} theme={studioTheme}>AI venture studio for local operators</FloatingBadge>
            <h1 className="mt-5 max-w-4xl text-[2.75rem] font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              SignalOps builds AI workers for local businesses.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#ead0df] sm:mt-6 sm:text-xl">
              We build AI products that handle real work, book more jobs, and help local businesses grow.
            </p>
            <GlassCard className="mt-6 p-4 sm:hidden" theme={envoTheme}>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--vs-accent-3)]">
                {PRODUCT_FULL_NAME}
              </p>
              <p className="mt-2 text-2xl font-black tracking-normal text-white">{PRODUCT_ROLE}</p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">
                Answers, qualifies, follows up, and hands off leads so you never miss the next job.
              </p>
            </GlassCard>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-row">
              <GlowButton className="w-full !px-3" href="/envo" theme={studioTheme}>Explore Envo</GlowButton>
              <GlowButton className="w-full !px-3" href="#products" icon={false} theme={studioTheme}>View Products</GlowButton>
            </div>
            <div className="mt-8 hidden gap-2 sm:grid sm:grid-cols-3">
              {["AI lead response", "Automated follow-up", "Owner-ready handoffs"].map((item) => (
                <GlassCard key={item} className="p-3" theme={studioTheme}>
                  <p className="flex items-center gap-2 text-sm font-black text-white">
                    <CheckCircle2 className="size-4 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                    {item}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <StudioHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioHeroVisual() {
  return (
    <GlassPanel className="cinematic-panel relative p-4 sm:p-5" theme={envoTheme}>
      <div className="absolute right-8 top-8 hidden rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-black text-white/70 sm:block">
        Flagship product
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <GlassCard className="p-5 lg:min-h-[30rem]" theme={envoTheme}>
          <FloatingBadge icon={BadgeCheck} theme={envoTheme}>{PRODUCT_FULL_NAME}</FloatingBadge>
          <h2 className="mt-5 text-4xl font-black tracking-normal text-white">{PRODUCT_NAME}</h2>
          <p className="mt-1 text-sm font-black uppercase tracking-[0.18em] text-[color:var(--vs-accent-3)]">
            {PRODUCT_ROLE}
          </p>
          <p className="mt-5 text-sm leading-7 text-[color:var(--vs-muted)]">
            Answers, qualifies, follows up, and hands off leads so you never miss the next job.
          </p>
          <div className="mt-6 grid gap-2">
            {["New lead captured", "Qualification in progress", "Owner handoff ready"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2">
                <span className="text-xs font-bold text-white/78">{item}</span>
                <span className="rounded-full bg-[image:var(--vs-button-gradient)] px-2 py-1 text-[0.65rem] font-black text-white">
                  {index === 0 ? "Now" : index === 1 ? "AI" : "Next"}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
        <OrbitalProductVisual
          features={[
            { copy: "Lead source detected", icon: MessageSquareReply, title: "Answers" },
            { copy: "Service, timing, and details", icon: ClipboardCheck, title: "Qualifies" },
            { copy: "No-reply sequence ready", icon: RefreshCcw, title: "Follows up" },
            { copy: "Owner action prepared", icon: BellRing, title: "Hands off" }
          ]}
          label="envo"
          theme={envoTheme}
        />
      </div>
    </GlassPanel>
  );
}

function FeaturedProductSection() {
  return (
    <section className="premium-section" id="envo">
      <AmbientBackground intensity="quiet" theme={envoTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <FloatingBadge icon={Zap} theme={envoTheme}>Featured Product</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              Envo by SignalOps is the AI Lead Manager.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#ead0df] sm:text-base">
              Envo handles the first mile of lead management: response, qualification, follow-up, and clean human handoff.
              It is the flagship AI employee in the SignalOps studio.
            </p>
            <div className="mt-6">
              <GlowButton href="/envo" theme={envoTheme}>Explore Envo</GlowButton>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {envoFeatures.map((feature) => (
              <RuleCard key={feature.title} copy={feature.copy} icon={feature.icon} title={feature.title} theme={envoTheme} />
            ))}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {leadSources.map((source) => (
            <LeadSourceTile key={source.label} icon={source.icon} label={source.label} theme={envoTheme} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductLineupSection() {
  return (
    <section className="premium-section" id="products">
      <AmbientBackground intensity="quiet" theme={studioTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <FloatingBadge icon={Bot} theme={studioTheme}>Product Lineup</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              A studio of AI workers, starting with Envo.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#ead0df]">
            Future products should feel exciting, but Envo is the live flagship product and the center of the current SignalOps offer.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
          {productLineup.map((product, index) => (
            <ProductCard key={product.name} featured={index === 0} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  copy,
  featured = false,
  name,
  role,
  status,
  theme
}: {
  copy: string;
  featured?: boolean;
  name: string;
  role: string;
  status: string;
  theme: VisualTheme;
}) {
  return (
    <GlassCard className={featured ? "min-h-[21rem] p-5 sm:min-h-[26rem] sm:p-6" : "min-h-[16rem] p-5 sm:min-h-[20rem]"} hover theme={theme}>
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <FloatingBadge icon={featured ? BadgeCheck : Sparkles} theme={theme}>{status}</FloatingBadge>
          <h3 className={featured ? "mt-5 text-4xl font-black tracking-normal text-white sm:text-5xl" : "mt-5 text-3xl font-black tracking-normal text-white"}>
            {name}
          </h3>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-[color:var(--vs-accent-3)]">{role}</p>
          <p className="mt-5 text-sm leading-7 text-[color:var(--vs-muted)]">{copy}</p>
        </div>
        {featured ? (
          <GlowButton href="/envo" theme={theme}>Explore Envo</GlowButton>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm font-black text-white/58">
            Product concept
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </GlassCard>
  );
}

function StudioVisionSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={coolTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" theme={coolTheme}>
          <div>
            <FloatingBadge icon={Sparkles} theme={coolTheme}>Studio Vision</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-6xl">
              The future workforce is AI.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#c8d6e5]">
              We build autonomous AI workers that operate in the background, get things done, and deliver measurable
              results for local businesses.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Operate", "AI workers run recurring workflows without adding more admin."],
              ["Escalate", "Unclear, urgent, or sensitive work moves to the right person."],
              ["Measure", "Owners get visibility into what happened and what needs action."],
              ["Improve", "SignalOps keeps the product layer practical, useful, and focused."]
            ].map(([title, copy]) => (
              <RuleCard key={title} copy={copy} icon={Workflow} title={title} theme={coolTheme} />
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}

function TrustAndOutcomesSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={studioTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <FloatingBadge icon={ShieldCheck} theme={studioTheme}>Built for local operators</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              Built for local operators, service teams, and growing businesses.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#ead0df]">
              SignalOps is designed around practical workflows: missed calls, quote intake, appointment booking,
              automated lead follow-up, missed lead recovery, lead routing automation, and better owner visibility.
            </p>
          </div>
          <div className="grid gap-4">
            <TrustLogoStrip items={["Owner-led crews", "Service teams", "Route operators", "Front desks"]} theme={studioTheme} />
            <div className="grid gap-3 sm:grid-cols-2">
              {outcomeMetrics.map((metric) => (
                <GlassCard key={metric.label} className="p-4" theme={studioTheme}>
                  <p className="text-lg font-black text-white">{metric.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">{metric.copy}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section className="premium-section" id="pricing">
      <AmbientBackground intensity="quiet" theme={envoTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <FloatingBadge icon={BarChart3} theme={envoTheme}>Packages</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-5xl">
              Start with the Envo package that matches your lead flow.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#ead0df]">
            Pricing values are preserved from the current SignalOps packages. Use these as a starting point for the build conversation.
          </p>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {pricingCards.map((plan) => (
            <PremiumPricingCard
              key={plan.name}
              {...plan}
              cta={`Ask About ${plan.name}`}
              theme={envoTheme}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {PACKAGE_NAMES.map((plan) => (
            <TrackedLink
              key={plan.name}
              href={getPlanEmailHref(plan.name)}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "studio_home_packages", type: "email", package: plan.name }}
              className={`${buttonVariants({ variant: "outline" })} border-white/14 bg-white/[0.045]`}
            >
              Ask About {plan.name}
              <Mail className="size-4" aria-hidden="true" />
            </TrackedLink>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={studioTheme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="cinematic-panel grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto_auto] lg:items-center" theme={studioTheme}>
          <div>
            <FloatingBadge icon={Eye} theme={studioTheme}>Next Step</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black tracking-normal text-white">Ready to see Envo in action?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)]">
              Explore the flagship AI employee now, or preview how SignalOps could shape Envo around your lead sources.
            </p>
          </div>
          <GlowButton className="w-full sm:w-auto" href="/envo" theme={studioTheme}>Explore Envo</GlowButton>
          <GlowButton className="w-full sm:w-auto" href="/preview" icon={false} theme={studioTheme}>Preview Envo</GlowButton>
        </GlassPanel>
      </div>
    </section>
  );
}
