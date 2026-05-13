import Image from "next/image";
import Link from "next/link";
import { readdir } from "node:fs/promises";
import path from "node:path";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Facebook,
  Instagram,
  Mail,
  MessageSquareText,
  Phone,
  RadioTower,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap
} from "lucide-react";
import {
  AmbientBackground,
  FloatingBadge,
  GlassCard,
  GlassPanel,
  GlowButton,
  LeadSourceTile,
  MobileDeviceFrame,
  OrbitalProductVisual,
  OwnerTriageCard,
  PremiumPricingCard,
  ProductSpotlight,
  RuleCard,
  ThemeSwatches,
  TranslucentNav,
  TrustLogoStrip
} from "@/components/site/visual-system";
import { visualThemeList, visualThemes, type VisualTheme } from "@/lib/visual-themes";

type ReferenceImage = {
  alt: string;
  name: string;
  src: string;
};

const labNavLinks = [
  { href: "/design-lab", label: "Index" },
  { href: "/design-lab/studio", label: "Studio" },
  { href: "/design-lab/envo", label: "Envo" },
  { href: "/design-lab/themes", label: "Themes" }
] satisfies Array<{ href: string; label: string }>;

const leadSources = [
  { label: "Phone", icon: Phone },
  { label: "SMS", icon: Smartphone },
  { label: "Web Chat", icon: MessageSquareText },
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Google", icon: SearchCheck },
  { label: "Email", icon: Mail }
] satisfies Array<{ icon: LucideIcon; label: string }>;

const ruleCards = [
  {
    copy: "Use approved service language, pricing rules, and handoff boundaries.",
    icon: ShieldCheck,
    title: "Business guardrails"
  },
  {
    copy: "Route hot leads, edge cases, and uncertain answers to the owner with context.",
    icon: RadioTower,
    title: "Human escalation"
  },
  {
    copy: "Keep follow-up warm without over-messaging or ignoring quiet hours.",
    icon: CalendarCheck2,
    title: "Follow-up limits"
  },
  {
    copy: "Collect only the lead details needed for the next useful action.",
    icon: ClipboardCheck,
    title: "Smart intake"
  }
];

const pricingPlans = [
  {
    copy: "One primary lead source, instant response, intake, owner alerts, and first-pass follow-up.",
    name: "Starter",
    price: "$250/mo"
  },
  {
    copy: "Multiple lead sources, priority routing, richer follow-up paths, CRM notes, and weekly signal review.",
    name: "Growth",
    price: "$500/mo"
  },
  {
    copy: "Custom workflows, multi-location routing, deeper integrations, dashboards, and managed optimization.",
    name: "Custom",
    price: "From $1,000/mo"
  }
];

export async function getDesignReferenceImages(): Promise<ReferenceImage[]> {
  const referenceDir = path.join(process.cwd(), "public", "design-references");

  try {
    const entries = await readdir(referenceDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && /\.(avif|gif|jpe?g|png|webp)$/i.test(entry.name))
      .map((entry) => ({
        alt: entry.name
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .trim(),
        name: entry.name,
        src: `/design-references/${encodeURIComponent(entry.name)}`
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

function DesignLabShell({
  children,
  copy,
  eyebrow,
  theme = visualThemes.envoWarm,
  title
}: {
  children: ReactNode;
  copy: string;
  eyebrow: string;
  theme?: VisualTheme;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-[#05030a] text-white">
      <section className="premium-section lg:min-h-screen" style={themeStyle(theme)}>
        <AmbientBackground theme={theme} />
        <div className="relative mx-auto max-w-[1450px] px-4 pb-12 pt-4 sm:px-6 sm:pt-5 lg:px-8">
          <TranslucentNav brand="SignalOps Design Lab" items={labNavLinks} theme={theme} />
          <div className="mt-10 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">{eyebrow}</p>
            <h1 className="mt-4 text-[2.35rem] font-black leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">{copy}</p>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

function themeStyle(theme: VisualTheme) {
  return {
    "--vs-bg": theme.colors.base,
    "--vs-bg-alt": theme.colors.baseAlt,
    "--vs-surface": theme.colors.surface,
    "--vs-surface-strong": theme.colors.surfaceStrong,
    "--vs-border": theme.colors.border,
    "--vs-text": theme.colors.text,
    "--vs-muted": theme.colors.muted,
    "--vs-accent": theme.colors.accent,
    "--vs-accent-2": theme.colors.accent2,
    "--vs-accent-3": theme.colors.accent3,
    "--vs-glow": theme.colors.glow,
    "--vs-glow-2": theme.colors.glow2,
    "--vs-success": theme.colors.success,
    "--vs-warning": theme.colors.warning,
    "--vs-page-gradient": theme.gradients.page,
    "--vs-panel-gradient": theme.gradients.panel,
    "--vs-button-gradient": theme.gradients.button,
    "--vs-border-gradient": theme.gradients.border,
    "--vs-orb-gradient": theme.gradients.orb,
    "--vs-spotlight-gradient": theme.gradients.spotlight
  } as CSSProperties;
}

export function DesignLabIndex({ referenceImages }: { referenceImages: ReferenceImage[] }) {
  const cards = [
    {
      copy: "Warm parent-studio concept with Envo featured and future products as secondary cards.",
      href: "/design-lab/studio#warm",
      label: "Studio Homepage - Warm Theme",
      theme: visualThemes.studioWarm
    },
    {
      copy: "Cool parent-studio concept with a more technical, venture-backed SignalOps feel.",
      href: "/design-lab/studio#cool",
      label: "Studio Homepage - Cool Theme",
      theme: visualThemes.studioCool
    },
    {
      copy: "Dedicated Envo product page concept with orb visual, lead bubbles, guardrails, triage, and pricing preview.",
      href: "/design-lab/envo",
      label: "Envo Product Page - Warm Theme",
      theme: visualThemes.envoWarm
    },
    {
      copy: "Reusable tokens, utilities, and visual components for the premium glassmorphism direction.",
      href: "/design-lab/themes",
      label: "Theme + Component System",
      theme: visualThemes.studioWarm
    },
    {
      copy: "Internal notes on how this lab compares to the current live SignalOps site.",
      href: "#current-site-notes",
      label: "Current Site Notes",
      theme: visualThemes.currentSignalOps
    }
  ] satisfies Array<{ copy: string; href: string; label: string; theme: VisualTheme }>;

  return (
    <DesignLabShell
      copy="Temporary noindex previews for reviewing the selected SignalOps Warm direction, the Envo Warm product treatment, and any remaining alternate concepts before this lab is deleted."
      eyebrow="Internal visual playground"
      title="Premium glassmorphism reference lab."
    >
      <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="block">
            <GlassCard className="flex min-h-[13rem] flex-col justify-between p-5 sm:min-h-[16rem]" hover theme={card.theme}>
              <span className="flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-[image:var(--vs-button-gradient)] text-white shadow-xl shadow-black/20">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-lg font-black leading-tight text-white">{card.label}</span>
                <span className="mt-3 block text-sm leading-6 text-[color:var(--vs-muted)]">{card.copy}</span>
              </span>
            </GlassCard>
          </Link>
        ))}
      </section>

      <section id="current-site-notes" className="mt-8 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
        <GlassPanel className="p-5" theme={visualThemes.currentSignalOps}>
          <FloatingBadge icon={Sparkles} theme={visualThemes.currentSignalOps}>Current Site Notes</FloatingBadge>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-white">SignalOps Warm is selected.</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--vs-muted)]">
            This lab is now a temporary reference for the chosen warm production direction. It remains hidden from
            public navigation and marked noindex while final visual decisions are reviewed.
          </p>
        </GlassPanel>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Design lab routes stay noindex and out of public navigation.",
            "Production pages now use the warm SignalOps studio direction.",
            "Warm Envo remains the product system for orb, triage, rules, and pricing.",
            "Cool SignalOps remains here only as a comparison reference."
          ].map((note) => (
            <RuleCard key={note} copy={note} icon={CheckCircle2} title="Foundation note" theme={visualThemes.envoWarm} />
          ))}
        </div>
      </section>

      <DesignReferenceStrip referenceImages={referenceImages} theme={visualThemes.envoWarm} />
    </DesignLabShell>
  );
}

export function StudioLabPage() {
  return (
    <DesignLabShell
      copy="Two parent-studio homepage directions shown together for comparison: warm cinematic SignalOps and cool technical SignalOps. Envo remains the featured product in both."
      eyebrow="Studio homepage concepts"
      theme={visualThemes.studioWarm}
      title="One studio, two different kinds of signal."
    >
      <div className="mt-10 grid gap-8">
        <StudioConcept id="warm" theme={visualThemes.studioWarm} />
        <StudioConcept id="cool" theme={visualThemes.studioCool} />
      </div>
    </DesignLabShell>
  );
}

function StudioConcept({ id, theme }: { id: "cool" | "warm"; theme: VisualTheme }) {
  const warm = id === "warm";
  const products = warm
    ? [
        ["Envo", "AI Lead Manager", "Featured"],
        ["Rally", "AI Review Manager", "Future"],
        ["Pulse", "AI Follow-up Monitor", "Future"],
        ["Ledger", "AI Revenue Copilot", "Future"]
      ]
    : [
        ["Envo", "Lead Intelligence Agent", "Featured"],
        ["SignalGraph", "Journey Data Layer", "Future"],
        ["OpsCore", "Workflow Automation OS", "Future"],
        ["Beacon", "Revenue Signal Monitor", "Future"]
      ];

  return (
    <GlassPanel id={id} className="scroll-mt-8 p-5 sm:p-7 lg:p-9" theme={theme}>
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <FloatingBadge theme={theme}>{warm ? "Warm SignalOps Studio" : "Cool SignalOps Studio"}</FloatingBadge>
          <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-5xl lg:text-6xl">
            {warm
              ? "AI products with a founder-built, cinematic glow."
              : "The AI operations studio behind local-business revenue systems."}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">
            {warm
              ? "This direction makes SignalOps feel warm, premium, and product-led. Envo is the bright first launch, with future workers orbiting as a growing studio portfolio."
              : "This direction makes SignalOps feel more technical and venture-backed. The parent brand owns the system layer, while Envo becomes the first visible agent in a broader AI operations suite."}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <GlowButton href="/design-lab/envo" theme={theme}>Explore Envo</GlowButton>
            <GlowButton href="/design-lab/themes" icon={false} theme={theme} variant="secondary">View Components</GlowButton>
          </div>
        </div>
        <div className="relative min-h-[23rem] sm:min-h-[30rem]">
          <OrbitalProductVisual
            features={products.map(([name, role, status]) => ({
              copy: `${role} / ${status}`,
              icon: status === "Featured" ? Zap : RadioTower,
              title: name
            }))}
            label={warm ? "studio" : "signal"}
            theme={theme}
          />
        </div>
      </div>
    </GlassPanel>
  );
}

export function EnvoLabPage({ referenceImages }: { referenceImages: ReferenceImage[] }) {
  return (
    <DesignLabShell
      copy="A premium Envo product-page concept using the reusable warm visual system: glass panels, glow buttons, orb visual, lead tiles, guardrails, mobile triage, and pricing cards."
      eyebrow="Envo product page concept"
      theme={visualThemes.envoWarm}
      title="Meet Envo, your AI Lead Manager."
    >
      <ProductSpotlight
        actions={
          <>
            <GlowButton href="/preview" theme={visualThemes.envoWarm}>Preview Envo</GlowButton>
            <GlowButton href="/design-lab/themes" icon={false} theme={visualThemes.envoWarm} variant="secondary">View components</GlowButton>
          </>
        }
        className="mt-10"
        description="Envo captures lead intent the moment it appears, asks the right next question, keeps follow-up warm, and sends the owner the action that matters."
        eyebrow="Envo by SignalOpsAI"
        orbLabel="envo"
        theme={visualThemes.envoWarm}
        title="Meet Envo, your AI Lead Manager"
      />

      <section className="mt-7">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[color:var(--vs-accent-3)]">Lead source layer</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {leadSources.map((source) => (
            <LeadSourceTile key={source.label} icon={source.icon} label={source.label} theme={visualThemes.envoWarm} />
          ))}
        </div>
      </section>

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <GlassPanel className="p-5 sm:p-6" theme={visualThemes.envoWarm}>
          <FloatingBadge icon={ShieldCheck} theme={visualThemes.envoWarm}>Guardrails</FloatingBadge>
          <h2 className="mt-5 text-3xl font-black tracking-normal text-white">Guardrails that feel premium, not restrictive.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)]">
            The product story should make supervision feel like a strength: Envo can move fast because the rules are clear.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ruleCards.map((rule) => (
              <RuleCard key={rule.title} {...rule} theme={visualThemes.envoWarm} />
            ))}
          </div>
        </GlassPanel>
        <GlassPanel className="p-5" theme={visualThemes.envoWarm}>
          <MobileDeviceFrame
            footerItems={["Queue", "Rules", "Team"]}
            stats={[
              { label: "Ready", value: "12" },
              { label: "Owner", value: "5" },
              { label: "Review", value: "3" }
            ]}
            theme={visualThemes.envoWarm}
          >
            <OwnerTriageCard count="12" detail="Safe replies waiting for approval." label="Ready to approve" theme={visualThemes.envoWarm} />
            <OwnerTriageCard count="5" detail="Pricing, discounts, or special requests." label="Needs owner" secondaryAction="Assign" theme={visualThemes.envoWarm} />
            <OwnerTriageCard action="Take over" count="3" detail="Urgent, unclear, or sensitive leads." label="Human review" secondaryAction="Route" theme={visualThemes.envoWarm} />
          </MobileDeviceFrame>
        </GlassPanel>
      </section>

      <PricingPreview theme={visualThemes.envoWarm} />
      <DesignReferenceStrip referenceImages={referenceImages} theme={visualThemes.envoWarm} />
    </DesignLabShell>
  );
}

function PricingPreview({ theme }: { theme: VisualTheme }) {
  return (
    <section className="mt-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[color:var(--vs-accent-3)]">Pricing preview</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-white">Lab-only package cards.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[color:var(--vs-muted)]">
          These cards mirror the requested preview pricing for the concept. Production pricing was not edited.
        </p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PremiumPricingCard key={plan.name} {...plan} cta="Concept CTA" theme={theme} />
        ))}
      </div>
    </section>
  );
}

export function ThemesLabPage() {
  return (
    <DesignLabShell
      copy="Reusable ingredients for the selected SignalOps Warm / Envo Warm direction: theme tokens, CSS utilities, nav, glass cards, glow buttons, floating badges, pricing cards, owner triage cards, rule cards, lead tiles, mobile frames, product spotlights, trust strips, and ambient backgrounds."
      eyebrow="Theme and component system"
      theme={visualThemes.studioWarm}
      title="Every reusable component under the same light."
    >
      <section className="mt-10 grid gap-6">
        {visualThemeList.map((theme) => (
          <ThemeSystemCard key={theme.name} theme={theme} />
        ))}
      </section>

      <section className="mt-8">
        <GlassPanel className="p-5 sm:p-6" theme={visualThemes.envoWarm}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <FloatingBadge icon={Sparkles} theme={visualThemes.envoWarm}>Ambient background example</FloatingBadge>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-white">Layered light, grid, and translucent depth.</h2>
            </div>
            <GlowButton href="/design-lab/envo" theme={visualThemes.envoWarm}>Open Envo concept</GlowButton>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <ProductSpotlight
              description="The spotlight component pairs a premium product story with an orbital AI-core visual, floating bubbles, and reusable action slots."
              eyebrow="ProductSpotlight"
              orbLabel="envo"
              theme={visualThemes.envoWarm}
              title="Reusable hero layer for product pages."
            />
            <MobileDeviceFrame
              footerItems={["Queue", "Rules", "Team"]}
              stats={[
                { label: "Ready", value: "12" },
                { label: "Owner", value: "5" },
                { label: "Review", value: "3" }
              ]}
              theme={visualThemes.envoWarm}
            >
              <OwnerTriageCard count="12" detail="Safe replies waiting for approval." label="Ready to approve" theme={visualThemes.envoWarm} />
              <OwnerTriageCard count="5" detail="Pricing or edge-case requests." label="Needs owner" theme={visualThemes.envoWarm} />
            </MobileDeviceFrame>
          </div>
        </GlassPanel>
      </section>
    </DesignLabShell>
  );
}

function ThemeSystemCard({ theme }: { theme: VisualTheme }) {
  return (
    <GlassPanel className="p-5 sm:p-6" theme={theme}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <FloatingBadge theme={theme}>{theme.label}</FloatingBadge>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-white">{theme.label}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--vs-muted)]">{theme.description}</p>
        </div>
        <ThemeSwatches theme={theme} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <GlassCard className="p-4" theme={theme}>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/48">Buttons and badges</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <GlowButton theme={theme}>Primary</GlowButton>
              <GlowButton icon={false} theme={theme} variant="secondary">Secondary</GlowButton>
              <FloatingBadge icon={BadgeCheck} theme={theme}>Qualified</FloatingBadge>
            </div>
          </GlassCard>

          <TrustLogoStrip items={["Meta", "Google", "CRM", "SMS"]} theme={theme} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <PremiumPricingCard copy="Concise offer text with a bright but contained action." name="Pricing card" price="$500/mo" theme={theme} />
          <RuleCard copy="A reusable glass card for guardrails, rules, and product constraints." icon={ShieldCheck} title="Rule card" theme={theme} />
          <MobileDeviceFrame className="max-w-none" status="Live" theme={theme} title="Owner queue">
            <OwnerTriageCard count="12" detail="Ready, review, and takeover states." label="Triage card" theme={theme} />
          </MobileDeviceFrame>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {leadSources.map((source) => (
          <LeadSourceTile key={source.label} icon={source.icon} label={source.label} theme={theme} />
        ))}
      </div>
    </GlassPanel>
  );
}

function DesignReferenceStrip({
  referenceImages,
  theme
}: {
  referenceImages: ReferenceImage[];
  theme: VisualTheme;
}) {
  return (
    <GlassPanel className="mt-8 p-5" theme={theme}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <FloatingBadge theme={theme}>Design references</FloatingBadge>
          <h2 className="mt-4 text-2xl font-black tracking-normal text-white">Local inspiration only.</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[color:var(--vs-muted)]">
          Files in <span className="font-mono text-white/80">public/design-references</span> render only in this internal lab.
        </p>
      </div>

      {referenceImages.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {referenceImages.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/22">
              <Image
                src={image.src}
                alt={image.alt}
                width={720}
                height={460}
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="border-t border-white/10 px-3 py-2 text-xs font-bold text-white/56">{image.name}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.25rem] border border-dashed border-white/14 bg-black/18 p-4 text-sm leading-6 text-white/62">
          No local reference images are present yet. Drop concept images into the folder when you want them displayed here.
        </div>
      )}
    </GlassPanel>
  );
}
