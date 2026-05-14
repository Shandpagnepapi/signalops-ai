import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bot, Sparkles, UsersRound, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const envoBrandTokens = {
  ink: "#071126",
  ink2: "#0B1024",
  bg: "#F8FAFF",
  bgWarm: "#FBFAF7",
  muted: "#647084",
  soft: "#EAF1FF",
  lavender: "#EEEAFE",
  blue: "#328BFF",
  blue2: "#2563EB",
  purple: "#6F4DFF",
  purple2: "#7C3AED",
  greenSoft: "#E3F8E9",
  green: "#34C759"
} as const;

export const envoFeatureItems = [
  {
    title: "Respond Faster",
    copy: "Capture, prioritize, and reply in real time.",
    icon: Zap,
    iconClassName: "bg-[#EEEAFE] text-[#5968FF]"
  },
  {
    title: "Automate Smarter",
    copy: "Automate repetitive conversations with ease.",
    icon: Bot,
    iconClassName: "bg-[#EAF1FF] text-[#2563EB]"
  },
  {
    title: "Delight Customers",
    copy: "Provide faster, more personalized experiences.",
    icon: UsersRound,
    iconClassName: "bg-[#E3F8E9] text-[#34C759]"
  }
] as const;

type EnvoLogoTone = "light" | "dark";

type EnvoLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  tone?: EnvoLogoTone;
};

const logoSizes = {
  sm: {
    mark: "size-8",
    wordmark: "text-xl",
    gap: "gap-2"
  },
  md: {
    mark: "size-11",
    wordmark: "text-3xl",
    gap: "gap-2.5"
  },
  lg: {
    mark: "size-14",
    wordmark: "text-5xl",
    gap: "gap-3"
  },
  hero: {
    mark: "size-20 sm:size-28",
    wordmark: "text-6xl sm:text-8xl",
    gap: "gap-3 sm:gap-5"
  }
} as const;

export function EnvoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("block", className)}
      fill="none"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="envo-mark-gradient" x1="12" x2="88" y1="22" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor={envoBrandTokens.blue} />
          <stop offset="0.48" stopColor={envoBrandTokens.blue2} />
          <stop offset="1" stopColor={envoBrandTokens.purple} />
        </linearGradient>
        <linearGradient id="envo-mark-highlight" x1="30" x2="70" y1="22" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.28" />
        </linearGradient>
        <filter id="envo-mark-shadow" x="0" y="0" width="96" height="96" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#2563EB" floodOpacity="0.28" />
        </filter>
      </defs>
      <g strokeLinecap="round" filter="url(#envo-mark-shadow)">
        <path d="M9 36h17" stroke="url(#envo-mark-gradient)" strokeWidth="7" />
        <path d="M5 49h20" stroke="url(#envo-mark-gradient)" strokeWidth="7" opacity="0.82" />
        <path d="M13 62h13" stroke="url(#envo-mark-gradient)" strokeWidth="7" opacity="0.66" />
        <path
          d="M39 19h22c14.5 0 26 11.2 26 25.4C87 58.7 75.5 70 61 70H49.4L32.5 82.2V68.5C21.1 65.8 13 56.2 13 44.4 13 30.2 24.5 19 39 19Z"
          fill="url(#envo-mark-gradient)"
        />
        <path
          d="M40 21.5h19.5c13.2 0 23.2 10 23.2 22.8 0 12.9-10 22.9-23.2 22.9H48.3L35.4 76.6V65.4C25.8 63 19 54.8 19 44.3 19 31.5 28.9 21.5 40 21.5Z"
          fill="url(#envo-mark-highlight)"
          opacity="0.13"
        />
      </g>
      <g stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round">
        <path d="M38.5 47.3c0-8.7 7.1-15.2 16-15.2 8.2 0 14.2 5.6 14.2 13.2 0 1.4-.2 2.8-.5 4H47.5" strokeWidth="7.2" />
        <path d="M67.8 58.1c-3.1 3.7-7.5 5.7-13 5.7-9.5 0-16.3-6.6-16.3-16.5" strokeWidth="7.2" />
      </g>
    </svg>
  );
}

export function EnvoWordmark({
  className,
  tone = "light"
}: {
  className?: string;
  tone?: EnvoLogoTone;
}) {
  return (
    <span
      className={cn(
        "font-[850] leading-none tracking-normal",
        tone === "dark" ? "text-white" : "text-[#071126]",
        className
      )}
    >
      Envo
    </span>
  );
}

export function EnvoLogo({
  className,
  markClassName,
  showWordmark = true,
  size = "md",
  tone = "light"
}: EnvoLogoProps) {
  return (
    <span className={cn("inline-flex items-center", logoSizes[size].gap, className)}>
      <EnvoMark className={cn(logoSizes[size].mark, markClassName)} />
      {showWordmark ? <EnvoWordmark className={logoSizes[size].wordmark} tone={tone} /> : null}
    </span>
  );
}

export function EnvoAppIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-[1.9rem] border border-white bg-[linear-gradient(145deg,#FFFFFF,#F7F8FC)] p-3 shadow-[0_24px_60px_rgba(7,17,38,0.18),inset_0_1px_0_rgba(255,255,255,0.95)]",
        className
      )}
    >
      <EnvoMark className="size-full" />
    </div>
  );
}

export function EnvoGlassCard({
  children,
  className,
  style
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.65rem] border border-white/85 bg-white/78 p-5 text-[#071126] shadow-[0_24px_80px_rgba(37,99,235,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function EnvoDarkCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.65rem] border border-white/12 bg-[#071126] p-5 text-white shadow-[0_28px_90px_rgba(7,17,38,0.3)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.24),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(111,77,255,0.2),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.075),transparent)]" />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-6 h-44 w-64 text-[#6F4DFF]/42"
        fill="none"
        viewBox="0 0 260 180"
      >
        {[0, 18, 36, 54, 72].map((offset) => (
          <path
            key={offset}
            d={`M12 ${170 - offset}C74 ${154 - offset} 88 ${92 - offset} 136 ${76 - offset}C178 ${62 - offset} 210 ${96 - offset} 248 ${34 - offset}`}
            stroke="currentColor"
            strokeWidth="1.25"
          />
        ))}
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

export function EnvoSection({
  children,
  className,
  id,
  tone = "light"
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden",
        tone === "dark" ? "bg-[#071126] text-white" : "bg-[#F8FAFF] text-[#071126]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(50,139,255,0.16),transparent_34%),radial-gradient(circle_at_82%_4%,rgba(111,77,255,0.13),transparent_34%)]" />
      <div className="relative mx-auto max-w-[1450px] px-4 py-12 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function EnvoCtaButton({
  children,
  className,
  href,
  icon = true,
  variant = "primary"
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: boolean;
  variant?: "primary" | "secondary";
}) {
  const content = (
    <>
      <span>{children}</span>
      {icon ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
    </>
  );
  const classNames = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328BFF] focus-visible:ring-offset-2",
    variant === "primary"
      ? "border border-white/30 bg-[linear-gradient(135deg,#328BFF,#2563EB_46%,#6F4DFF)] text-white shadow-[0_18px_52px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:brightness-110"
      : "border border-[#CBD8F2] bg-white/72 text-[#071126] shadow-[0_14px_34px_rgba(37,99,235,0.12)] hover:-translate-y-0.5 hover:border-[#328BFF]/45 hover:bg-white",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    );
  }

  return <button className={classNames} type="button">{content}</button>;
}

export function EnvoFeaturePill({
  children,
  className,
  icon: Icon = Sparkles
}: {
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[#CBD8F2] bg-white/74 px-3 py-2 text-xs font-black uppercase tracking-normal text-[#2563EB] shadow-sm backdrop-blur-xl",
        className
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export function EnvoFeatureItem({
  className,
  dark = false,
  index,
  item
}: {
  className?: string;
  dark?: boolean;
  index: number;
  item: (typeof envoFeatureItems)[number];
}) {
  const Icon = item.icon;

  return (
    <div
      className={cn(
        "flex gap-4 py-4",
        index > 0 && (dark ? "border-t border-white/10" : "border-t border-[#D8E2F7]"),
        className
      )}
    >
      <span
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-full shadow-[0_12px_28px_rgba(37,99,235,0.12)] ring-1 ring-white/70",
          item.iconClassName,
          dark && "bg-white/10 text-[#BFD3FF]"
        )}
      >
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <div>
        <h3 className={cn("text-base font-black tracking-normal", dark ? "text-white" : "text-[#071126]")}>
          {item.title}
        </h3>
        <p className={cn("mt-1 text-sm leading-6", dark ? "text-[#D7E2F7]/72" : "text-[#647084]")}>
          {item.copy}
        </p>
      </div>
    </div>
  );
}

export function EnvoFeatureStack({
  className,
  dark = false,
  panel = false
}: {
  className?: string;
  dark?: boolean;
  panel?: boolean;
}) {
  return (
    <div
      className={cn(
        panel &&
          (dark
            ? "rounded-[1.55rem] border border-white/10 bg-white/[0.045] px-4"
            : "rounded-[1.55rem] border border-[#D8E2F7]/75 bg-white/58 px-4 shadow-[0_18px_54px_rgba(37,99,235,0.08)] backdrop-blur-xl"),
        className
      )}
    >
      {envoFeatureItems.map((item, index) => (
        <EnvoFeatureItem key={item.title} dark={dark} index={index} item={item} />
      ))}
    </div>
  );
}

export function EnvoSignatureCard({
  className,
  compact = false,
  title = "Smarter conversations. Stronger connections."
}: {
  className?: string;
  compact?: boolean;
  title?: string;
}) {
  const [firstLine, secondLine = "Stronger connections."] = title.split(". ");

  return (
    <EnvoDarkCard
      className={cn(
        "flex min-h-[15.5rem] flex-col justify-between rounded-[1.55rem] p-6 sm:p-7",
        compact ? "min-h-[14rem]" : "sm:min-h-[17rem]",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <EnvoLogo size={compact ? "sm" : "md"} tone="dark" />
      </div>
      <p className="mt-8 text-2xl font-black leading-tight tracking-normal text-white sm:text-3xl">
        <span className="text-[#328BFF]">{firstLine}.</span>
        <br />
        <span className="text-[#A99BFF]">{secondLine}</span>
      </p>
    </EnvoDarkCard>
  );
}

export function EnvoBrandBoard({
  className,
  compact = false,
  showVariations = true
}: {
  className?: string;
  compact?: boolean;
  showVariations?: boolean;
}) {
  return (
    <EnvoGlassCard
      className={cn(
        "overflow-hidden rounded-[2.2rem] border-[#E2E8F7] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(251,250,247,0.95)_48%,rgba(248,250,255,0.94))] p-0 shadow-[0_30px_100px_rgba(7,17,38,0.13)]",
        className
      )}
    >
      <div className={cn("px-5 pb-8 pt-9 sm:px-8 sm:pt-11", compact ? "lg:px-7" : "lg:px-10 lg:pb-10 lg:pt-14")}>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <EnvoLogo size={compact ? "lg" : "hero"} className="justify-center" />
          <p className="mt-4 text-xs font-black uppercase tracking-normal text-[#647084] sm:text-sm">
            RESPOND FASTER. AUTOMATE SMARTER.
          </p>
        </div>
      </div>

      <div className="border-t border-[#D8E2F7]" />

      <div className={cn("px-5 py-7 sm:px-8", compact ? "lg:px-7" : "lg:px-10 lg:py-9")}>
        <div
          className={cn(
            "grid gap-6 lg:items-center",
            compact ? "lg:grid-cols-[0.64fr_1.08fr_0.96fr]" : "lg:grid-cols-[0.68fr_1.18fr_0.92fr]"
          )}
        >
          <div className="order-1 text-center">
            <EnvoAppIcon
              className={cn("mx-auto rounded-[2rem]", compact ? "size-32 sm:size-36" : "size-40 sm:size-48")}
            />
            <p className="mt-4 text-xs font-black uppercase tracking-normal text-[#647084]">
              APP ICON
            </p>
          </div>

          <EnvoSignatureCard className="order-3 lg:order-2" compact={compact} />

          <EnvoFeatureStack className="order-2 lg:order-3" panel />
        </div>
      </div>

      {showVariations ? (
        <div className="grid border-t border-[#D8E2F7] sm:grid-cols-4">
          {[
            { name: "White", className: "bg-white", tone: "light" as const },
            { name: "Lavender", className: "bg-[#EEEAFE]", tone: "light" as const },
            { name: "Navy", className: "bg-[#071126]", tone: "dark" as const },
            { name: "Black", className: "bg-black", tone: "dark" as const }
          ].map((surface) => (
            <div
              key={surface.name}
              className={cn("flex min-h-24 items-center justify-center px-4 py-6", surface.className)}
            >
              <EnvoLogo size="sm" tone={surface.tone} />
            </div>
          ))}
        </div>
      ) : null}
    </EnvoGlassCard>
  );
}

export function EnvoFeaturePanel({
  className,
  compact = false,
  title = "Smarter conversations. Stronger connections."
}: {
  className?: string;
  compact?: boolean;
  title?: string;
}) {
  return (
    <EnvoGlassCard
      className={cn(
        "overflow-hidden border-[#E2E8F7] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(251,250,247,0.94)_48%,rgba(248,250,255,0.92))] p-0",
        className
      )}
    >
      <div className="border-b border-[#D8E2F7] px-5 py-6 text-center">
        <EnvoLogo className="justify-center" size={compact ? "md" : "lg"} />
        <p className="mt-3 text-[0.68rem] font-black uppercase tracking-normal text-[#647084]">
          RESPOND FASTER. AUTOMATE SMARTER.
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:p-5">
        <div className={cn("grid gap-4", compact ? "" : "sm:grid-cols-[0.48fr_1fr]")}>
          <div className="flex flex-col items-center justify-center rounded-[1.45rem] border border-[#D8E2F7]/75 bg-white/58 p-4 text-center shadow-[0_18px_54px_rgba(37,99,235,0.08)]">
            <EnvoAppIcon className="size-24 rounded-[1.55rem] p-2.5" />
            <p className="mt-3 text-[0.68rem] font-black uppercase tracking-normal text-[#647084]">
              APP ICON
            </p>
          </div>

          <EnvoSignatureCard
            className="min-h-[12rem] rounded-[1.45rem] p-5"
            compact
            title={title}
          />
        </div>
        <EnvoFeatureStack panel />
      </div>
    </EnvoGlassCard>
  );
}

export function EnvoBrandHero({
  actions,
  className,
  eyebrow = "Envo by SignalOpsAI",
  subtitle = "Envo is the AI employee for busy businesses: trained to respond, organize, follow up, and hand off customer conversations with speed and care.",
  title = "Your friendly AI employee for customer calls and leads."
}: {
  actions?: ReactNode;
  className?: string;
  eyebrow?: string;
  subtitle?: string;
  title?: string;
}) {
  return (
    <EnvoSection className={cn("border-b border-[#D8E2F7] bg-[#FBFAF7]", className)}>
      <div className="py-2 lg:py-6">
        <EnvoBrandBoard className="mx-auto max-w-6xl" showVariations={false} />
        <EnvoGlassCard className="mx-auto mt-7 max-w-6xl bg-white/82 p-5 sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <EnvoFeaturePill className="w-fit tracking-normal">{eyebrow}</EnvoFeaturePill>
            <div>
              <h1 className="max-w-4xl text-[2.45rem] font-black leading-[0.98] tracking-normal text-[#071126] sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#647084] sm:text-xl">
                {subtitle}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {actions ?? (
                  <>
                    <EnvoCtaButton href="/preview">Preview Envo</EnvoCtaButton>
                    <EnvoCtaButton href="/demo" variant="secondary">View Demo</EnvoCtaButton>
                  </>
                )}
              </div>
            </div>
          </div>
        </EnvoGlassCard>
      </div>
    </EnvoSection>
  );
}

export const EnvoHeroSection = EnvoBrandHero;
export const EnvoSectionShell = EnvoSection;
export const EnvoButton = EnvoCtaButton;
