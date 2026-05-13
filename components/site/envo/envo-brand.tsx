import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, MessageSquareReply, Sparkles, Zap } from "lucide-react";
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
    copy: "Capture, prioritize, and reply in real time."
  },
  {
    title: "Automate Smarter",
    copy: "Automate repetitive conversations with ease."
  },
  {
    title: "Delight Customers",
    copy: "Provide faster, more personalized experiences."
  }
] as const;

type EnvoLogoTone = "light" | "dark";

type EnvoLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: EnvoLogoTone;
};

const logoSizes = {
  sm: {
    mark: "size-8",
    wordmark: "text-xl"
  },
  md: {
    mark: "size-11",
    wordmark: "text-3xl"
  },
  lg: {
    mark: "size-14",
    wordmark: "text-5xl"
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
        "font-black tracking-normal",
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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <EnvoMark className={cn(logoSizes[size].mark, markClassName)} />
      {showWordmark ? <EnvoWordmark className={logoSizes[size].wordmark} tone={tone} /> : null}
    </span>
  );
}

export function EnvoAppIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-[1.55rem] border border-white/70 bg-[linear-gradient(145deg,#F8FAFF,#EEEAFE)] p-3 shadow-[0_24px_70px_rgba(37,99,235,0.18)]",
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
        "rounded-[1.5rem] border border-white/80 bg-white/72 p-5 text-[#071126] shadow-[0_24px_80px_rgba(37,99,235,0.13)] backdrop-blur-2xl",
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
        "relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#071126] p-5 text-white shadow-[0_28px_90px_rgba(7,17,38,0.28)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.28),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(111,77,255,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.07),transparent)]" />
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
        "inline-flex items-center gap-2 rounded-full border border-[#CBD8F2] bg-white/74 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#2563EB] shadow-sm backdrop-blur-xl",
        className
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

export function EnvoFeatureStack({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3", className)}>
      {envoFeatureItems.map((item) => (
        <EnvoGlassCard key={item.title} className="p-4">
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-black text-[#071126]">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#647084]">{item.copy}</p>
            </div>
          </div>
        </EnvoGlassCard>
      ))}
    </div>
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
    <EnvoSection className={cn("border-b border-[#D8E2F7]", className)}>
      <div className="grid gap-8 py-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-8">
        <div>
          <EnvoLogo size="lg" />
          <EnvoFeaturePill className="mt-6">{eyebrow}</EnvoFeaturePill>
          <h1 className="mt-5 max-w-4xl text-[2.65rem] font-black leading-[0.94] tracking-normal text-[#071126] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#647084] sm:text-xl">
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

        <EnvoDarkCard className="p-4 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4 backdrop-blur-xl">
              <EnvoAppIcon className="mx-auto max-w-[11rem]" />
              <p className="mt-5 text-center text-xs font-black uppercase tracking-[0.18em] text-[#BFD3FF]">
                RESPOND FASTER. AUTOMATE SMARTER.
              </p>
            </div>
            <div>
              <EnvoFeaturePill className="border-white/12 bg-white/10 text-[#BFD3FF]" icon={Zap}>
                AI employee
              </EnvoFeaturePill>
              <h2 className="mt-5 text-4xl font-black leading-tight tracking-normal text-white sm:text-5xl">
                Smarter conversations. Stronger connections.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#D7E2F7]">
                A premium, glass-like workspace for capturing lead intent, answering quickly, and keeping the owner in control.
              </p>
              <div className="mt-5 grid gap-2">
                {["Capture every inquiry", "Prioritize the next action", "Route the clean handoff"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/7 px-3 py-2 text-sm font-bold text-white/82">
                    <MessageSquareReply className="size-4 text-[#8EBBFF]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EnvoDarkCard>
      </div>
    </EnvoSection>
  );
}
