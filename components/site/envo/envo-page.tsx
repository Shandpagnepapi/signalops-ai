import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  History,
  MessageSquareReply,
  PhoneCall,
  RadioTower,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRoundCheck,
  Workflow
} from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton,
  PremiumPricingCard,
  RuleCard
} from "@/components/site/visual-system";
import {
  PACKAGE_NAMES,
  PRODUCT_FULL_NAME,
  PUBLIC_BRAND_NAME
} from "@/lib/constants";
import { visualThemes } from "@/lib/visual-themes";

const theme = visualThemes.envoWarm;

const howItWorks = [
  {
    copy: "Give Envo your services, pricing rules, service area, hours, and how you want leads handled.",
    icon: BookOpenCheck,
    title: "Train Envo"
  },
  {
    copy: "Calls, texts, forms, DMs, missed calls, quote requests, and follow-ups stay organized.",
    icon: MessageSquareReply,
    title: "Envo handles the front line"
  },
  {
    copy: "Approve sensitive replies, take over when needed, and see every lead in one dashboard.",
    icon: UserRoundCheck,
    title: "You stay in control"
  }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

const trainingCards = [
  { copy: "Services, FAQs, intake questions, and the details customers usually ask about.", icon: ClipboardList, title: "Business knowledge" },
  { copy: "Pricing boundaries, quote ranges, discounts, and what Envo should never promise.", icon: ShieldAlert, title: "Pricing rules" },
  { copy: "Service area, hours, availability, team routing, and when to send a lead to a person.", icon: RadioTower, title: "Handoff process" },
  { copy: "Your tone, approval preferences, sensitive situations, and escalation rules.", icon: SlidersHorizontal, title: "Owner preferences" }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

const ownerControls = [
  { copy: "Let Envo draft, then approve sensitive replies before they go out.", icon: CheckCircle2, title: "Approval mode" },
  { copy: "Jump in on urgent, high-value, or uncertain conversations.", icon: UserRoundCheck, title: "Human takeover" },
  { copy: "Keep pricing, discounts, service claims, and scheduling inside your rules.", icon: ShieldCheck, title: "Pricing and discount guardrails" },
  { copy: "Route leads based on location, service area, team, urgency, and red flags.", icon: BellRing, title: "Escalation rules" },
  { copy: "See what Envo received, asked, drafted, routed, and handed off.", icon: History, title: "Activity history" }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

const priceDisplayByPlan = {
  Starter: "$250/mo",
  Growth: "$500/mo",
  Custom: "from $1,000/mo"
} as const;

const setupCopyByPlan = {
  Starter: "Starter setup from $750.",
  Growth: "Growth setup from $1,500.",
  Custom: "Custom buildout from $5,000+."
} as const;

const pricingCopyByPlan = {
  Starter: "Start Envo on one main lead channel.",
  Growth: "Let Envo manage multiple lead sources and follow-up paths.",
  Custom: "Train Envo around complex workflows, teams, dashboards, and integrations."
} as const;

export function EnvoPage() {
  return (
    <div className="overflow-hidden bg-[#05030a] text-white">
      <ProductHero />
      <DashboardPreview />
      <HowEnvoWorks />
      <TrainingSection />
      <OwnerControlSection />
      <PricingSection />
      <FinalCta />
    </div>
  );
}

function ProductHero() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="strong" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <GlassPanel className="cinematic-panel grid gap-7 p-4 sm:p-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-8" theme={theme}>
          <div className="py-3 lg:py-8">
            <FloatingBadge icon={Sparkles} theme={theme}>{PRODUCT_FULL_NAME}</FloatingBadge>
            <h1 className="mt-5 max-w-4xl text-[2.65rem] font-black leading-[0.94] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Your AI worker for customer calls and leads.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--vs-muted)] sm:mt-6 sm:text-xl">
              Envo is trained to your business, answers and organizes incoming leads, follows up automatically, and alerts you when a real person needs to step in.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62">
              Built for small business lead management, AI lead response, AI appointment booking, automated lead follow-up, missed call text back, AI receptionist, and AI front desk workflows.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
              <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" theme={theme}>
                Preview Envo
              </GlowButton>
              <GlowButton className="w-full !px-3 sm:w-auto" href="/demo" icon={false} theme={theme} variant="secondary">
                View Demo
              </GlowButton>
            </div>
          </div>

          <ProductPreviewFrame />
        </GlassPanel>
      </div>
    </section>
  );
}

function ProductPreviewFrame() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08050d]/62 p-2 shadow-2xl shadow-black/30">
      <Image
        src="/product-previews/envo-dashboard-desktop.svg"
        alt="Envo customer lead dashboard with left-side lead stages and customer lead cards"
        width={1200}
        height={760}
        priority
        className="hidden h-auto w-full rounded-[1.25rem] md:block"
      />
      <Image
        src="/product-previews/envo-dashboard-mobile.svg"
        alt="Envo mobile owner inbox with status chips, lead cards, and owner actions"
        width={430}
        height={760}
        priority
        className="mx-auto h-auto max-h-[34rem] w-auto rounded-[1.25rem] md:hidden"
      />
    </div>
  );
}

function DashboardPreview() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <FloatingBadge icon={Workflow} theme={theme}>Customer lead dashboard</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              The inbox your leads should have had all along.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
              Envo gives each customer a practical owner control center: lead stages, customer messages, social leads, missed calls, follow-ups, and handoffs without the clutter.
            </p>
          </div>
          <GlassPanel className="p-2 sm:p-3" theme={theme}>
            <Image
              src="/product-previews/envo-dashboard-desktop.svg"
              alt="Dark glass Envo desktop dashboard preview"
              width={1200}
              height={760}
              className="hidden h-auto w-full rounded-[1.6rem] md:block"
            />
            <Image
              src="/product-previews/envo-dashboard-mobile.svg"
              alt="Dark glass Envo mobile lead dashboard preview"
              width={430}
              height={760}
              className="mx-auto h-auto max-h-[34rem] w-auto rounded-[1.6rem] md:hidden"
            />
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}

function HowEnvoWorks() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center" theme={theme}>
          <div>
            <FloatingBadge icon={PhoneCall} theme={theme}>How Envo works</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              Simple setup. Real lead coverage.
            </h2>
            <div className="mt-6 grid gap-3">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;

                return (
                  <GlassCard key={step.title} className="p-4" theme={theme}>
                    <div className="flex gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--vs-button-gradient)] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="flex items-center gap-2 text-lg font-black text-white">
                          <Icon className="size-5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
                          {step.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[color:var(--vs-muted)]">{step.copy}</p>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
          <Image
            src="/product-previews/envo-lead-pipeline.svg"
            alt="Envo lead pipeline preview showing training, front-line handling, and owner control"
            width={980}
            height={560}
            className="h-auto w-full rounded-[1.6rem]"
          />
        </GlassPanel>
      </div>
    </section>
  );
}

function TrainingSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <FloatingBadge icon={BookOpenCheck} theme={theme}>Trained to your business</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              Envo is not a random chatbot.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
              It is configured around your business before it ever talks to a customer. Envo learns your services, FAQs, pricing rules, service area, tone, schedule, and handoff process.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
              Envo should never promise things outside the rules. Sensitive situations can require approval, escalation, or a human takeover.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trainingCards.map((card) => (
              <RuleCard key={card.title} copy={card.copy} icon={card.icon} title={card.title} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OwnerControlSection() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center" theme={theme}>
          <div>
            <FloatingBadge icon={ShieldCheck} theme={theme}>Owner control</FloatingBadge>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
              Envo moves fast because the rules are clear.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
              You decide what Envo can answer, what needs approval, when to escalate, and how every customer handoff should look.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {ownerControls.map((control) => (
                <RuleCard key={control.title} copy={control.copy} icon={control.icon} title={control.title} theme={theme} />
              ))}
            </div>
          </div>
          <Image
            src="/product-previews/envo-owner-inbox.svg"
            alt="Envo owner control preview with approval and escalation rules"
            width={900}
            height={640}
            className="h-auto w-full rounded-[1.6rem]"
          />
        </GlassPanel>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="premium-section" id="pricing">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">Pricing</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl">
              Simple pricing. Powerful lead coverage.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--vs-muted)]">
            Keep the current package pricing exact. No guaranteed revenue claims, just a clearer way to organize customer calls and leads.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PACKAGE_NAMES.map((plan) => {
            const name = plan.name as keyof typeof priceDisplayByPlan;

            return (
              <div key={plan.name} id={plan.name === "Custom" ? "custom-agent-system" : plan.name.toLowerCase()} className="scroll-mt-28">
                <PremiumPricingCard
                  copy={`${pricingCopyByPlan[name]} ${setupCopyByPlan[name]}`}
                  cta="Preview Envo"
                  href="/preview"
                  name={plan.name}
                  price={priceDisplayByPlan[name]}
                  theme={theme}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="premium-section">
      <AmbientBackground intensity="quiet" theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">
        <GlassPanel className="p-6 text-center sm:p-8 lg:p-10" theme={theme}>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
            Envo by {PUBLIC_BRAND_NAME}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-normal text-white sm:text-5xl">
            Ready to preview Envo for your business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
            Show us your lead flow and SignalOpsAI will map how Envo should answer, organize, follow up, and hand off customers.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
            <GlowButton className="w-full !px-3 sm:w-auto" href="/preview" theme={theme}>
              Preview Envo
            </GlowButton>
            <GlowButton className="w-full !px-3 sm:w-auto" href="/demo" icon={false} theme={theme} variant="secondary">
              View Demo
            </GlowButton>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
