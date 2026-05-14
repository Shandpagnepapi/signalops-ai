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
  UserRoundCheck,
  Workflow
} from "lucide-react";
import {
  EnvoAssetImage,
  EnvoBrandBoard,
  EnvoCtaButton,
  EnvoDarkCard,
  EnvoFeaturePill,
  EnvoGlassCard,
  EnvoLogo,
  EnvoMark,
  EnvoSection
} from "@/components/site/envo/envo-brand-system";
import { PACKAGE_NAMES, PUBLIC_BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const howItWorks = [
  {
    copy: "Give Envo your services, pricing rules, service area, hours, and how you want leads handled.",
    icon: BookOpenCheck,
    title: "Train Envo"
  },
  {
    copy: "Envo answers, sorts, follows up, and keeps calls, texts, forms, DMs, quote requests, and missed calls organized.",
    icon: MessageSquareReply,
    title: "Envo handles the front line"
  },
  {
    copy: "Approve sensitive replies, take over when needed, and see every lead, message, and handoff in one place.",
    icon: UserRoundCheck,
    title: "You stay in control"
  }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

const trainingCards = [
  {
    copy: "Services, FAQs, intake questions, and the details customers usually ask about.",
    icon: ClipboardList,
    title: "Business knowledge"
  },
  {
    copy: "Quote ranges, discounts, service limits, and what Envo should send to you before responding.",
    icon: ShieldAlert,
    title: "Pricing rules"
  },
  {
    copy: "Service area, hours, team routing, availability, and when a lead should go to a real person.",
    icon: RadioTower,
    title: "Handoff process"
  },
  {
    copy: "Your tone, approval settings, customer priorities, and the situations you want handled carefully.",
    icon: SlidersHorizontal,
    title: "Owner preferences"
  }
] satisfies Array<{ copy: string; icon: LucideIcon; title: string }>;

const ownerControls = [
  { copy: "Let Envo draft, then approve sensitive replies before they go out.", icon: CheckCircle2, title: "Approval mode" },
  { copy: "Step into urgent, high-value, or uncertain conversations with the context already gathered.", icon: UserRoundCheck, title: "Human takeover" },
  { copy: "Keep quotes, discounts, service claims, and scheduling inside the rules you set.", icon: ShieldCheck, title: "Pricing and discount guardrails" },
  { copy: "Route leads by service area, urgency, team, schedule, and any red flags you define.", icon: BellRing, title: "Escalation rules" },
  { copy: "See what Envo received, asked, drafted, followed up on, and handed off.", icon: History, title: "Activity history" }
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

const dashboardStats = [
  ["New leads", "18"],
  ["Follow-ups", "42"],
  ["Handoffs", "7"]
] as const;

export function EnvoPage() {
  return (
    <div className="overflow-hidden bg-[#F8FAFF] text-[#071126]">
      <HeroSection />
      <DashboardPreview />
      <HowEnvoWorks />
      <TrainingSection />
      <OwnerControlSection />
      <PricingSection />
      <FinalCta />
    </div>
  );
}

function HeroSection() {
  return (
    <EnvoSection className="border-b border-[#D8E2F7] bg-[#FBFAF7]">
      <div className="py-2 lg:py-6">
        <EnvoBrandBoard className="mx-auto max-w-6xl" showVariations={false} />
        <EnvoGlassCard className="mx-auto mt-7 max-w-6xl bg-white/84 p-5 sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
            <div>
              <EnvoFeaturePill className="normal-case tracking-normal">
                Envo by {PUBLIC_BRAND_NAME}
              </EnvoFeaturePill>
            </div>
            <div>
              <h1 className="max-w-4xl text-[2.45rem] font-black leading-[0.98] tracking-normal text-[#071126] sm:text-6xl lg:text-7xl">
                Your AI worker for customer calls and leads.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#647084] sm:text-xl">
                Envo is trained to your business, answers and organizes incoming leads, follows up automatically, and alerts you when a real person needs to step in.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#647084]">
                Built for small business lead management, AI lead response, AI appointment booking, automated lead follow-up, missed call text back, AI receptionist, and AI front desk workflows.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <EnvoCtaButton href="/preview">Preview Envo</EnvoCtaButton>
                <EnvoCtaButton href="/demo" variant="secondary">View Demo</EnvoCtaButton>
              </div>
            </div>
          </div>
        </EnvoGlassCard>
      </div>
    </EnvoSection>
  );
}

function DashboardPreview() {
  return (
    <EnvoSection className="bg-[#F8FAFF]">
      <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <SectionIntro
          eyebrow="Product dashboard"
          icon={Workflow}
          title="The inbox your leads should have had all along."
          copy="Envo gives each customer a practical owner control center: lead stages, customer messages, social leads, missed calls, follow-ups, and handoffs without the clutter."
        />
        <EnvoDarkCard className="p-3 sm:p-4">
          <div className="mb-3 grid gap-2 sm:grid-cols-3">
            {dashboardStats.map(([label, value]) => (
              <div key={label} className="rounded-[1.15rem] border border-white/10 bg-white/7 px-4 py-3">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-xs font-bold text-[#BFD3FF]">{label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-[1.45rem] border border-white/12 bg-white/7 p-2 shadow-inner shadow-white/5 sm:p-3">
            <Image
              src="/brand/envo/envo-dashboard-desktop.png"
              alt="Envo customer lead dashboard showing lead stages, customer messages, missed calls, follow-ups, owner handoffs, and dashboard status."
              width={731}
              height={596}
              className="hidden h-auto w-full rounded-[1.2rem] md:block"
            />
            <Image
              src="/brand/envo/envo-dashboard-mobile.png"
              alt="Envo mobile owner command center showing lead follow-up, message history, and handoff controls."
              width={288}
              height={604}
              className="mx-auto h-auto max-h-[34rem] w-auto rounded-[1.2rem] md:hidden"
            />
          </div>
        </EnvoDarkCard>
      </div>
    </EnvoSection>
  );
}

function HowEnvoWorks() {
  return (
    <EnvoSection className="border-y border-[#D8E2F7] bg-[#FBFAF7]">
      <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionIntro
          eyebrow="How Envo works"
          icon={PhoneCall}
          title="Simple setup. Real lead coverage."
          copy="Envo is configured first, then works the front line with the same routing and handoff rules your business already trusts."
        />
        <div className="grid gap-4">
          <EnvoGlassCard className="overflow-hidden p-3">
            <EnvoAssetImage
              asset="leadWorkflow"
              alt="Envo lead workflow showing calls, texts, forms, and DMs flowing into Envo for follow-up and handoffs."
              className="rounded-[1.25rem]"
              sizes="(min-width: 1024px) 760px, 100vw"
            />
          </EnvoGlassCard>
          {howItWorks.map((step, index) => {
            const Icon = step.icon;

            return (
              <EnvoGlassCard key={step.title} className="p-4 sm:p-5">
                <div className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] text-sm font-black text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-xl font-black text-[#071126]">
                      <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#647084]">{step.copy}</p>
                  </div>
                </div>
              </EnvoGlassCard>
            );
          })}
        </div>
      </div>
    </EnvoSection>
  );
}

function TrainingSection() {
  return (
    <EnvoSection className="bg-[#F8FAFF]">
      <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <SectionIntro
            eyebrow="Trained to your business"
            icon={BookOpenCheck}
            title="Envo learns the business before it answers."
            copy="Envo is configured around your services, policies, service area, tone, schedule, and handoff process before it responds to customers."
          />
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#647084]">
            Sensitive situations can require approval, escalation, or a human takeover, so speed does not come at the expense of judgment.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {trainingCards.map((card) => (
            <OperatingCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </EnvoSection>
  );
}

function OwnerControlSection() {
  return (
    <EnvoSection className="bg-[#071126] text-white" tone="dark">
      <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <EnvoFeaturePill className="border-white/12 bg-white/10 text-[#BFD3FF]" icon={ShieldCheck}>
            Owner control
          </EnvoFeaturePill>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
            A clean operating system for customer follow-through.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#D7E2F7] sm:text-base">
            You decide what Envo can answer, what needs approval, when to escalate, and how every customer handoff should look.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ownerControls.map((control) => (
              <OperatingCard key={control.title} {...control} dark />
            ))}
          </div>
        </div>
        <EnvoDarkCard className="border-white/16 bg-[#0B1024] p-3 sm:p-4">
          <Image
            src="/brand/envo/envo-owner-command-center.png"
            alt="Envo owner command center dashboard with approval mode, human takeover, pricing guardrails, escalation rules, and activity history."
            width={456}
            height={597}
            className="h-auto w-full rounded-[1.25rem]"
          />
        </EnvoDarkCard>
      </div>
    </EnvoSection>
  );
}

function PricingSection() {
  return (
    <EnvoSection className="border-y border-[#D8E2F7] bg-[#FBFAF7]" id="pricing">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <EnvoFeaturePill>Pricing</EnvoFeaturePill>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal text-[#071126] sm:text-5xl">
            Simple pricing. Powerful lead coverage.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#647084]">
          Keep the current package pricing exact and choose the level of lead coverage, training, and owner control your business needs.
        </p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {PACKAGE_NAMES.map((plan) => {
          const name = plan.name as keyof typeof priceDisplayByPlan;

          return (
            <PricingCard
              key={plan.name}
              id={plan.name === "Custom" ? "custom-agent-system" : plan.name.toLowerCase()}
              name={plan.name}
              price={priceDisplayByPlan[name]}
              summary={`${pricingCopyByPlan[name]} ${setupCopyByPlan[name]}`}
              features={plan.features}
            />
          );
        })}
      </div>
    </EnvoSection>
  );
}

function PricingCard({
  features,
  id,
  name,
  price,
  summary
}: {
  features: string[];
  id: string;
  name: string;
  price: string;
  summary: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <EnvoDarkCard className="h-full p-5">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-black text-white">{name}</p>
            <EnvoMark className="size-9" />
          </div>
          <p className="mt-5 text-4xl font-black tracking-normal text-white">{price}</p>
          <p className="mt-4 text-sm leading-6 text-[#D7E2F7]">{summary}</p>
          <div className="mt-5 grid flex-1 gap-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/7 px-3 py-2 text-sm font-bold text-white/82">
                <CheckCircle2 className="size-4 text-[#8EBBFF]" aria-hidden="true" />
                {feature}
              </div>
            ))}
          </div>
          <EnvoCtaButton className="mt-6 w-full border-white/18 sm:w-fit" href="/preview">
            Preview Envo
          </EnvoCtaButton>
        </div>
      </EnvoDarkCard>
    </div>
  );
}

function FinalCta() {
  return (
    <EnvoSection className="bg-[#F8FAFF]">
      <EnvoGlassCard className="mx-auto max-w-6xl bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(234,241,255,0.82))] p-5 sm:p-7 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <EnvoAssetImage
            asset="signatureCard"
            className="mx-auto max-w-xl rounded-[1.4rem]"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          <div className="text-center lg:text-left">
            <EnvoLogo className="mx-auto lg:mx-0" size="md" />
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-normal text-[#071126] sm:text-5xl">
              Ready to preview Envo for your business?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#647084] sm:text-base">
              Show us your lead flow and SignalOpsAI will map how Envo should answer, organize, follow up, and hand off customers.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <EnvoCtaButton href="/preview">Preview Envo</EnvoCtaButton>
              <EnvoCtaButton href="/demo" variant="secondary">View Demo</EnvoCtaButton>
            </div>
          </div>
        </div>
      </EnvoGlassCard>
    </EnvoSection>
  );
}

function SectionIntro({
  copy,
  eyebrow,
  icon: Icon,
  title
}: {
  copy: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div>
      <EnvoFeaturePill icon={Icon}>{eyebrow}</EnvoFeaturePill>
      <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal text-[#071126] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#647084] sm:text-base">{copy}</p>
    </div>
  );
}

function OperatingCard({
  className,
  copy,
  dark = false,
  icon: Icon,
  title
}: {
  className?: string;
  copy: string;
  dark?: boolean;
  icon: LucideIcon;
  title: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-2xl",
          dark ? "border border-white/12 bg-white/8 text-[#8EBBFF]" : "bg-[#EAF1FF] text-[#2563EB]"
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className={cn("text-sm font-black", dark ? "text-white" : "text-[#071126]")}>{title}</h3>
        <p className={cn("mt-1 text-xs leading-5", dark ? "text-[#D7E2F7]" : "text-[#647084]")}>{copy}</p>
      </div>
    </div>
  );

  if (dark) {
    return <EnvoDarkCard className={cn("rounded-[1.25rem] p-4", className)}>{content}</EnvoDarkCard>;
  }

  return <EnvoGlassCard className={cn("p-4", className)}>{content}</EnvoGlassCard>;
}
