import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Bot, Camera, Sparkles, Zap } from "lucide-react";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { getEmailHref, PUBLIC_BRAND_NAME } from "@/lib/constants";

const homeBody = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-home-body"
});

const homeHeading = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-home-heading"
});

const bodyStyle = {
  fontFamily: "var(--font-home-body)"
} satisfies CSSProperties;

const headingStyle = {
  fontFamily: "var(--font-home-heading)"
} satisfies CSSProperties;

export function MarketingHome() {
  return (
    <main
      className={`${homeBody.variable} ${homeHeading.variable} relative isolate min-h-[100svh] overflow-hidden bg-[#050814] text-white antialiased`}
      style={bodyStyle}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-16%,rgba(50,139,255,0.34),transparent_34%),radial-gradient(circle_at_14%_26%,rgba(111,77,255,0.22),transparent_26%),radial-gradient(circle_at_86%_72%,rgba(52,199,89,0.16),transparent_28%),linear-gradient(180deg,#050814_0%,#071126_48%,#030611_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(circle_at_50%_30%,black,transparent_72%)]" />
      <div className="pointer-events-none absolute -left-24 top-16 -z-10 size-72 rounded-full bg-[#328BFF]/18 blur-3xl sm:size-96" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 size-72 rounded-full bg-[#34C759]/12 blur-3xl sm:size-96" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(50,139,255,0.7),rgba(111,77,255,0.65),transparent)]" />

      <section className="mx-auto flex min-h-[100svh] w-full max-w-[1180px] flex-col px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col justify-center py-8 sm:py-10 lg:py-12">
          <header className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] px-3.5 py-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:px-4">
              <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-2xl border border-white/14 bg-[linear-gradient(135deg,#328BFF,#2563EB_46%,#6F4DFF)] text-white shadow-[0_0_36px_rgba(50,139,255,0.34)]">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_16%,rgba(255,255,255,0.45),transparent_38%)]" />
                <Zap className="relative size-5" aria-hidden="true" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl" style={headingStyle}>
                {PUBLIC_BRAND_NAME}
              </h1>
            </div>
            <p className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#F8FAFF] sm:text-4xl md:text-5xl" style={headingStyle}>
              Choose what you need.
            </p>
          </header>

          <div className="mt-8 grid w-full gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5">
            <EnvoDoorwayCard />
            <DroneDoorwayCard />
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-2 pb-3 text-xs font-bold text-[#D7E2F7]/58 sm:pb-4">
          <a className="inline-flex min-h-10 items-center rounded-full border border-white/0 px-3 transition hover:border-white/10 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328BFF]/60" href={getEmailHref()}>
            Contact
          </a>
          <a className="inline-flex min-h-10 items-center rounded-full border border-white/0 px-3 transition hover:border-white/10 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328BFF]/60" href="/privacy">
            Privacy
          </a>
          <a className="inline-flex min-h-10 items-center rounded-full border border-white/0 px-3 transition hover:border-white/10 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#328BFF]/60" href="/terms">
            Terms
          </a>
        </footer>
      </section>
    </main>
  );
}

function EnvoDoorwayCard() {
  return (
    <Link
      className="group relative isolate flex min-h-[21rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 text-white shadow-[0_30px_110px_rgba(37,99,235,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] outline-none backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-[#328BFF]/48 hover:bg-white/[0.105] hover:shadow-[0_34px_120px_rgba(37,99,235,0.3)] focus-visible:ring-4 focus-visible:ring-[#328BFF]/45 sm:min-h-[24rem] sm:p-6 lg:p-7"
      href="/envo"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_0%,rgba(50,139,255,0.24),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(111,77,255,0.18),transparent_30%),radial-gradient(circle_at_86%_100%,rgba(52,199,89,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute -right-28 bottom-3 h-48 w-56 rounded-[2rem] border border-white/12 bg-[#071126]/42 p-3 opacity-80 shadow-2xl shadow-black/30 backdrop-blur-2xl transition duration-300 group-hover:translate-x-[-0.35rem] group-hover:opacity-100 max-sm:hidden lg:-right-24">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-[#328BFF]/80" />
          <span className="size-2 rounded-full bg-[#6F4DFF]/75" />
          <span className="size-2 rounded-full bg-[#34C759]/75" />
        </div>
        <div className="space-y-2">
          <span className="block h-9 rounded-2xl border border-white/10 bg-white/[0.075]" />
          <span className="block h-9 w-4/5 rounded-2xl border border-white/10 bg-white/[0.055]" />
          <span className="block h-9 w-11/12 rounded-2xl border border-white/10 bg-white/[0.065]" />
          <span className="block h-9 w-3/5 rounded-2xl bg-[linear-gradient(135deg,rgba(50,139,255,0.45),rgba(111,77,255,0.32))]" />
        </div>
      </div>

      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <span className="flex size-14 items-center justify-center rounded-3xl border border-white/12 bg-white/[0.08] text-[#BFD3FF] shadow-[0_18px_54px_rgba(50,139,255,0.18)] backdrop-blur-xl sm:size-16">
            <Bot className="size-7" aria-hidden="true" />
          </span>
          <span className="flex size-12 items-center justify-center rounded-full border border-[#34C759]/25 bg-[#34C759]/10 text-[#BAF2C7] opacity-90">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
        </div>
        <div className="max-w-[23rem]">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={headingStyle}>
            Envo
          </h2>
          <p className="mt-4 text-xl font-bold leading-snug text-white sm:text-2xl" style={headingStyle}>
            Your AI worker for customer calls and leads.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#D7E2F7]/76 sm:text-base sm:leading-7">
            Respond faster, automate follow-up, and keep every lead organized.
          </p>
        </div>
      </div>

      <span className="relative mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] px-5 text-sm font-bold text-white shadow-[0_18px_52px_rgba(37,99,235,0.36)] transition group-hover:shadow-[0_22px_62px_rgba(37,99,235,0.48)] sm:w-fit">
        Enter Envo
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function DroneDoorwayCard() {
  return (
    <Link
      className="group relative isolate flex min-h-[21rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.055] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] outline-none backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/22 hover:bg-white/[0.08] hover:shadow-[0_34px_120px_rgba(0,0,0,0.38)] focus-visible:ring-4 focus-visible:ring-white/24 sm:min-h-[24rem] sm:p-6 lg:p-7"
      href="/drone"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_0%,rgba(111,77,255,0.16),transparent_34%),radial-gradient(circle_at_80%_84%,rgba(50,139,255,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute -right-14 -top-14 -z-10 size-56 rounded-full border border-white/12 bg-[radial-gradient(circle,rgba(255,255,255,0.13),transparent_58%)] transition duration-300 group-hover:scale-105 sm:size-72" />
      <div className="pointer-events-none absolute right-6 top-6 hidden size-28 rounded-[2rem] border border-white/12 bg-white/[0.045] shadow-2xl shadow-black/20 sm:block">
        <span className="absolute inset-5 rounded-full border border-white/18" />
        <span className="absolute inset-9 rounded-full border border-[#328BFF]/35" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
      </div>

      <div className="relative">
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-3xl border border-white/12 bg-white/[0.075] text-[#D8E5FF] shadow-[0_18px_54px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:size-16">
            <Camera className="size-7" aria-hidden="true" />
          </span>
          <span className="mt-1 flex h-10 w-16 items-center justify-center rounded-full border border-white/12 bg-white/[0.055]">
            <span className="size-3 rounded-full bg-[#328BFF]/70 shadow-[0_0_28px_rgba(50,139,255,0.45)]" />
          </span>
        </div>
        <div className="max-w-[28rem]">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={headingStyle}>
            Drone Services
          </h2>
          <p className="mt-4 text-xl font-bold leading-snug text-white sm:text-2xl" style={headingStyle}>
            FAA Part 107 aerial photo and video in Birmingham, AL.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#D7E2F7]/74 sm:text-base sm:leading-7">
            Real estate, property, construction, local business, land, event, and vehicle visuals.
          </p>
        </div>
      </div>
      <span className="relative mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.08] px-5 text-sm font-bold text-white shadow-[0_18px_46px_rgba(0,0,0,0.18)] transition group-hover:border-white/24 group-hover:bg-white/[0.12] sm:w-fit">
        View Drone Services
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
