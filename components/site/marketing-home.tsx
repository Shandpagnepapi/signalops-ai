import Link from "next/link";
import { ArrowRight, Camera, Zap } from "lucide-react";
import { getEmailHref, PUBLIC_BRAND_NAME } from "@/lib/constants";

export function MarketingHome() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-hidden bg-[#071126] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,rgba(50,139,255,0.24),transparent_34%),radial-gradient(circle_at_12%_72%,rgba(111,77,255,0.16),transparent_30%),linear-gradient(180deg,#071126_0%,#0B1024_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-white/20" />

      <section className="mx-auto flex min-h-[100svh] max-w-[1040px] flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-6 sm:gap-8 sm:py-8">
            <header className="mx-auto text-center">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
                <span className="flex size-9 items-center justify-center rounded-xl border border-white/12 bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] text-white shadow-[0_0_32px_rgba(50,139,255,0.28)]">
                  <Zap className="size-5" aria-hidden="true" />
                </span>
                <h1 className="text-xl font-black text-white sm:text-2xl">
                  {PUBLIC_BRAND_NAME}
                </h1>
              </div>
              <p className="mt-4 text-lg font-semibold leading-7 text-[#F8FAFF]">
                Choose what you need.
              </p>
            </header>

            <div className="grid w-full gap-3.5 md:grid-cols-2 lg:gap-5">
              <EnvoDoorwayCard />
              <DroneDoorwayCard />
            </div>
        </div>

        <footer className="flex flex-wrap items-center justify-center gap-1 pb-1 text-xs font-bold text-white/48 sm:gap-2">
            <a className="inline-flex min-h-9 items-center rounded-full px-3 transition hover:bg-white/8 hover:text-white" href={getEmailHref()}>
              Contact
            </a>
            <span aria-hidden="true">/</span>
            <a className="inline-flex min-h-9 items-center rounded-full px-3 transition hover:bg-white/8 hover:text-white" href="/privacy">
              Privacy
            </a>
            <span aria-hidden="true">/</span>
            <a className="inline-flex min-h-9 items-center rounded-full px-3 transition hover:bg-white/8 hover:text-white" href="/terms">
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
      className="group relative isolate flex min-h-[15.5rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#FBFAF7] p-5 text-[#071126] shadow-[0_28px_90px_rgba(37,99,235,0.22)] outline-none transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_110px_rgba(37,99,235,0.28)] focus-visible:ring-4 focus-visible:ring-[#328BFF]/45 sm:min-h-[18rem] sm:p-6"
      href="/envo"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_0%,rgba(50,139,255,0.16),transparent_34%),radial-gradient(circle_at_90%_8%,rgba(111,77,255,0.13),transparent_30%)]" />
      <div>
        <div>
          <h2 className="text-3xl font-black tracking-normal text-[#071126] sm:text-5xl">
            Envo
          </h2>
          <p className="mt-3 text-lg font-black leading-snug text-[#071126] sm:text-xl">
            Your AI worker for customer calls and leads.
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#647084] sm:text-base sm:leading-7">
            Respond faster, automate follow-up, and keep every lead organized.
          </p>
        </div>
      </div>

      <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(37,99,235,0.32)] transition group-hover:shadow-[0_22px_48px_rgba(37,99,235,0.42)] sm:min-h-12 sm:w-fit">
        Enter Envo
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function DroneDoorwayCard() {
  return (
    <Link
      className="group flex min-h-[15.5rem] flex-col justify-between rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] outline-none backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09] focus-visible:ring-4 focus-visible:ring-white/24 sm:min-h-[18rem] sm:p-6"
      href="/drone"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-normal text-white sm:text-5xl">
              Drone Services
            </h2>
            <p className="mt-3 text-base font-black leading-snug text-white sm:text-xl">
              FAA Part 107 aerial photo and video in Birmingham, AL.
            </p>
          </div>
          <div className="flex size-14 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/12 bg-white/[0.08] text-[#D8E5FF] shadow-[0_18px_42px_rgba(0,0,0,0.22)] sm:size-16">
            <Camera className="size-6" aria-hidden="true" />
          </div>
        </div>
        <p className="mt-4 max-w-md text-sm leading-6 text-[#CFD8EA] sm:text-base sm:leading-7">
          Real estate, property, construction, local business, land, event, and vehicle visuals.
        </p>
      </div>
      <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.08] px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition group-hover:bg-white/[0.12] sm:min-h-12 sm:w-fit">
        View Drone Services
        <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
