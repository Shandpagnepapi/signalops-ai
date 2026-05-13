import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Layers3,
  MessageSquareText,
  RadioTower,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { visualThemes, type VisualTheme } from "@/lib/visual-themes";
import { cn } from "@/lib/utils";

type VisualStyle = CSSProperties & Record<`--vs-${string}`, string>;

type VisualComponentProps = {
  className?: string;
  style?: CSSProperties;
  theme?: VisualTheme;
};

function themeVars(theme: VisualTheme, style?: CSSProperties): VisualStyle {
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
    "--vs-spotlight-gradient": theme.gradients.spotlight,
    ...style
  } as VisualStyle;
}

export function AmbientBackground({
  className,
  intensity = "default",
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  intensity?: "default" | "quiet" | "strong";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensity === "quiet" && "opacity-70",
        intensity === "strong" && "opacity-100",
        className
      )}
      style={themeVars(theme, style)}
    >
      <div className="absolute inset-0 bg-[image:var(--vs-page-gradient)]" />
      <div className="ambient-grid absolute inset-0 opacity-[0.11]" />
      <div className="gradient-noise absolute inset-0 opacity-[0.16]" />
      <span className="light-orb animate-slow-glow left-[6%] top-[-8rem] size-[16rem] sm:size-[24rem]" />
      <span className="light-orb animate-slow-glow animation-delay-2000 right-[5%] top-[8%] size-[14rem] opacity-70 sm:size-[20rem]" />
      <span className="light-orb animate-slow-glow animation-delay-4000 bottom-[-10rem] left-[15%] size-[16rem] opacity-45 sm:left-[38%] sm:size-[22rem]" />
    </div>
  );
}

export function SectionShell({
  children,
  className,
  eyebrow,
  intro,
  style,
  theme = visualThemes.envoWarm,
  title
}: VisualComponentProps & {
  children: ReactNode;
  eyebrow?: string;
  intro?: string;
  title?: string;
}) {
  return (
    <section className={cn("premium-section section-reveal-ready", className)} style={themeVars(theme, style)}>
      <AmbientBackground theme={theme} />
      <div className="relative mx-auto max-w-[1450px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {eyebrow || title || intro ? (
          <div className="max-w-4xl">
            {eyebrow ? (
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[color:var(--vs-accent-3)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
                {title}
              </h1>
            ) : null}
            {intro ? <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-base">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function GlassCard({
  children,
  className,
  hover = false,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div className={cn("glass-card", hover && "hover-lift", className)} style={themeVars(theme, style)}>
      {children}
    </div>
  );
}

export function GlassPanel({
  children,
  className,
  id,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  children: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className={cn("glass-panel", className)} style={themeVars(theme, style)}>
      {children}
    </div>
  );
}

export function GlowButton({
  children,
  className,
  href,
  icon = true,
  style,
  theme = visualThemes.envoWarm,
  type = "button",
  variant = "primary"
}: VisualComponentProps & {
  children: ReactNode;
  href?: string;
  icon?: boolean;
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
}) {
  const content = (
    <>
      <span>{children}</span>
      {icon ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
    </>
  );
  const buttonClassName = cn("glow-button hover-lift", variant === "secondary" && "glow-button-secondary", className);
  const buttonStyle = themeVars(theme, style);

  if (href) {
    return (
      <Link href={href} className={buttonClassName} style={buttonStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassName} style={buttonStyle}>
      {content}
    </button>
  );
}

export function FloatingBadge({
  children,
  className,
  icon: Icon = Sparkles,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  children: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <span className={cn("floating-badge", className)} style={themeVars(theme, style)}>
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export function TranslucentNav({
  brand = "SignalOps Design Lab",
  brandHref = "/",
  className,
  items,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  brand?: string;
  brandHref?: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <GlassPanel className={cn("flex flex-col gap-3 p-2.5 sm:flex-row sm:items-center sm:justify-between sm:p-3.5", className)} style={style} theme={theme}>
      <Link href={brandHref} className="flex min-w-0 items-center gap-2.5 px-1">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[1rem] border border-[color:var(--vs-border)] bg-[image:var(--vs-button-gradient)] text-white shadow-[0_0_26px_var(--vs-glow)] sm:size-10 sm:rounded-2xl">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <span className="truncate text-sm font-black text-white sm:text-base">{brand}</span>
      </Link>
      <nav className="-mx-1 flex max-w-full flex-wrap gap-2 overflow-visible px-1 sm:mx-0 sm:justify-end" aria-label={`${brand} navigation`}>
        {items.map((item) => (
          item.href.startsWith("mailto:") ? (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/72 transition hover:border-white/22 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]"
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/72 transition hover:border-white/22 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]"
            >
              {item.label}
            </Link>
          )
        ))}
      </nav>
    </GlassPanel>
  );
}

export function ProductSpotlight({
  actions,
  className,
  description,
  eyebrow,
  orbLabel,
  style,
  theme = visualThemes.envoWarm,
  title
}: VisualComponentProps & {
  actions?: ReactNode;
  description: string;
  eyebrow: string;
  orbLabel?: string;
  title: string;
}) {
  return (
    <GlassPanel className={cn("cinematic-panel grid gap-7 p-4 sm:p-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-9", className)} style={style} theme={theme}>
      <div>
        <FloatingBadge theme={theme}>{eyebrow}</FloatingBadge>
        <h2 className="mt-5 text-4xl font-black leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--vs-muted)] sm:text-lg">{description}</p>
        {actions ? <div className="mt-7 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
      <OrbitalProductVisual label={orbLabel} theme={theme} />
    </GlassPanel>
  );
}

export function OrbitalProductVisual({
  className,
  features,
  label = "envo",
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  features?: Array<{ copy: string; icon?: LucideIcon; title: string }>;
  label?: string;
}) {
  const items =
    features ??
    [
      { copy: "New lead captured", icon: MessageSquareText, title: "Listen" },
      { copy: "Intake question ready", icon: Bot, title: "Qualify" },
      { copy: "Owner action routed", icon: RadioTower, title: "Route" },
      { copy: "Follow-up queued", icon: CheckCircle2, title: "Follow up" }
    ];

  return (
    <div className={cn("floating-layer relative min-h-[22rem] overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#071126]/48 p-3 shadow-2xl shadow-black/34 backdrop-blur-xl sm:min-h-[30rem] sm:rounded-[1.75rem] sm:p-4", className)} style={themeVars(theme, style)}>
      <div className="absolute inset-0 bg-[image:var(--vs-spotlight-gradient)]" />
      <div className="soft-pulse absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--vs-border)] bg-[image:var(--vs-orb-gradient)] shadow-[0_0_78px_var(--vs-glow)] sm:size-52" />
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.085] sm:size-72" />
      <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:size-96" />
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="bg-[image:var(--vs-button-gradient)] bg-clip-text text-4xl font-black text-transparent sm:text-6xl">{label}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/54">Product core</p>
      </div>
      <div className="relative z-20 grid min-h-[20rem] gap-2 sm:min-h-[28rem] sm:grid-cols-2 sm:gap-3">
        {items.map((item, index) => {
          const Icon = item.icon ?? Layers3;

          return (
            <GlassCard
              key={item.title}
              className={cn(
                "gentle-float w-full max-w-[13.5rem] p-2.5 sm:max-w-[15rem] sm:p-3",
                index === 0 && "self-start justify-self-start",
                index === 1 && "self-center justify-self-end",
                index === 2 && "self-center justify-self-start",
                index === 3 && "self-end justify-self-end"
              )}
              theme={theme}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--vs-button-gradient)] text-white">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-black text-white sm:text-sm">{item.title}</span>
                  <span className="mt-1 block text-[0.7rem] leading-4 text-[color:var(--vs-muted)] sm:text-xs sm:leading-5">{item.copy}</span>
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

export function MobileDeviceFrame({
  children,
  className,
  eyebrow = "Owner Triage",
  footerItems,
  stats,
  status = "Live",
  style,
  theme = visualThemes.envoWarm,
  title = "Today's handoffs"
}: VisualComponentProps & {
  children: ReactNode;
  eyebrow?: string;
  footerItems?: string[];
  stats?: Array<{ label: string; value: string }>;
  status?: string;
  title?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-sm rounded-[2rem] border border-white/14 bg-[#071126]/94 p-2 shadow-[0_24px_78px_rgba(0,0,0,0.48)] sm:p-2.5", className)} style={themeVars(theme, style)}>
      <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-white/12" />
      <div className="rounded-[1.55rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.028)),rgba(11,16,36,0.78)] p-3 backdrop-blur-xl sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--vs-accent-3)]">{eyebrow}</p>
            <h3 className="mt-2 text-xl font-black tracking-normal text-white sm:text-2xl">{title}</h3>
          </div>
          <span className="rounded-full border border-[color:var(--vs-success)] bg-emerald-300/[0.08] px-2.5 py-1 text-xs font-black text-[color:var(--vs-success)]">
            {status}
          </span>
        </div>
        {stats ? (
          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {stats.map((item) => (
              <div key={item.label} className="rounded-[1rem] border border-white/10 bg-white/[0.045] px-2 py-2 text-center">
                <p className="text-lg font-black leading-none text-white">{item.value}</p>
                <p className="mt-1 text-[0.62rem] font-bold leading-3 text-[color:var(--vs-muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-4 grid gap-2.5 sm:gap-3">{children}</div>
        {footerItems ? (
          <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-[1.2rem] border border-white/10 bg-black/24 p-1.5">
            {footerItems.map((item, index) => (
              <button
                key={item}
                className={cn(
                  "h-9 rounded-[0.95rem] text-[0.68rem] font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]",
                  index === 0 ? "bg-white/[0.12] text-white shadow-inner shadow-white/5" : "text-white/48 hover:bg-white/[0.06] hover:text-white/78"
                )}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function OwnerTriageCard({
  action = "Approve",
  className,
  count,
  detail,
  label,
  secondaryAction = "Edit",
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  action?: string;
  count: string;
  detail: string;
  label: string;
  secondaryAction?: string;
}) {
  return (
    <article className={cn("glass-card rounded-[1.15rem] p-3", className)} style={themeVars(theme, style)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-white">{label}</p>
          <p className="mt-1 text-xs leading-5 text-[color:var(--vs-muted)]">{detail}</p>
        </div>
        <span className="rounded-xl border border-white/10 bg-white/[0.08] px-2.5 py-1 text-sm font-black text-[color:var(--vs-accent-3)]">
          {count}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="glow-button h-10 rounded-2xl px-2 text-xs" type="button">
          {action}
        </button>
        <button
          className="h-10 rounded-2xl border border-white/12 bg-white/[0.055] text-xs font-black text-white/70 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)]"
          type="button"
        >
          {secondaryAction}
        </button>
      </div>
    </article>
  );
}

export function RuleCard({
  className,
  copy,
  icon: Icon = ShieldCheck,
  style,
  theme = visualThemes.envoWarm,
  title
}: VisualComponentProps & {
  copy: string;
  icon?: LucideIcon;
  title: string;
}) {
  return (
    <GlassCard className={cn("p-4", className)} hover style={style} theme={theme}>
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--vs-border)] bg-white/[0.06] text-[color:var(--vs-accent-3)]">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-black text-white">{title}</p>
          <p className="mt-1 text-xs leading-5 text-[color:var(--vs-muted)]">{copy}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export function LeadSourceTile({
  className,
  icon: Icon,
  label,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <GlassCard className={cn("p-4 text-center", className)} hover style={style} theme={theme}>
      <Icon className="mx-auto size-5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
      <p className="mt-2 text-xs font-black text-white/78">{label}</p>
    </GlassCard>
  );
}

export function PremiumPricingCard({
  className,
  copy,
  cta = "Select preview",
  href,
  name,
  price,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  copy: string;
  cta?: string;
  href?: string;
  name: string;
  price: string;
}) {
  return (
    <GlassCard className={cn("flex h-full flex-col p-5", className)} hover style={style} theme={theme}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-lg font-black text-white">{name}</p>
        <CircleDollarSign className="size-5 text-[color:var(--vs-accent-3)]" aria-hidden="true" />
      </div>
      <p className="mt-5 text-4xl font-black tracking-normal text-white">{price}</p>
      <p className="mt-4 flex-1 text-sm leading-6 text-[color:var(--vs-muted)]">{copy}</p>
      <div className="mt-6 h-px bg-[image:linear-gradient(90deg,var(--vs-accent),var(--vs-accent-3),transparent)]" />
      {href ? (
        <Link
          href={href}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl text-sm font-black text-[color:var(--vs-accent-3)] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--vs-accent-2)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {cta}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[color:var(--vs-accent-3)]">
          {cta}
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </GlassCard>
  );
}

export function TrustLogoStrip({
  className,
  items,
  style,
  theme = visualThemes.envoWarm
}: VisualComponentProps & {
  items: string[];
}) {
  return (
    <GlassPanel className={cn("p-4", className)} style={style} theme={theme}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white/58">
            {item}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function ThemeSwatches({
  className,
  theme = visualThemes.envoWarm
}: {
  className?: string;
  theme?: VisualTheme;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {theme.swatches.map((swatch) => (
        <span
          key={swatch}
          className="size-9 rounded-2xl border border-white/14 shadow-lg shadow-black/18"
          style={{ background: swatch }}
          title={swatch}
        />
      ))}
    </div>
  );
}
