"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  Bell,
  CalendarCheck,
  ClipboardCheck,
  Clock3,
  Menu,
  MessageCircle,
  PhoneCall,
  PlayCircle,
  Sparkles,
  X,
  Zap
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref } from "@/lib/constants";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#results", label: "Results" }
] as const;

const activityItems = [
  {
    icon: PhoneCall,
    iconClassName: "bg-emerald-500/15 text-emerald-400",
    title: "Inbound call - Sarah M.",
    detail: "Booked for Tue 3pm",
    time: "2m ago"
  },
  {
    icon: MessageCircle,
    iconClassName: "bg-blue-500/15 text-blue-400",
    title: "Follow-up sent - James R.",
    detail: "Quote for kitchen remodel",
    time: "18m ago"
  },
  {
    icon: CalendarCheck,
    iconClassName: "bg-amber-500/15 text-amber-400",
    title: "Appointment confirmed - Lisa T.",
    detail: "Wed 10am - AC inspection",
    time: "1h ago"
  }
] as const;

const mobileLeadCards = [
  {
    badge: "Booked",
    badgeClassName: "bg-emerald-500/20 text-emerald-400",
    name: "Sarah Martinez",
    detail: "Drain repair - Tue 3:00 PM"
  },
  {
    badge: "Pending",
    badgeClassName: "bg-amber-500/20 text-amber-400",
    name: "James Reed",
    detail: "Kitchen quote - awaiting reply"
  },
  {
    badge: "Booked",
    badgeClassName: "bg-emerald-500/20 text-emerald-400",
    name: "Lisa Thompson",
    detail: "AC inspection - Wed 10:00 AM"
  }
] as const;

const workflowCards = [
  {
    copy: "Every call, text, and web inquiry gets answered instantly. No more missed leads at 9pm or during a job.",
    icon: PhoneCall,
    tone: "emerald",
    title: "Capture"
  },
  {
    copy: "Envo gathers the customer's name, service need, address, photos, urgency, and preferred times so every lead is ready for you to review or book.",
    icon: ClipboardCheck,
    tone: "blue",
    title: "Prep the Job"
  },
  {
    copy: "Automatic follow-ups via text and email at the right intervals. No lead goes cold because you were busy.",
    icon: Clock3,
    tone: "amber",
    title: "Follow Up"
  },
  {
    copy: "Envo checks your calendar, confirms availability, and books the appointment. You just show up.",
    icon: CalendarCheck,
    tone: "violet",
    title: "Book"
  }
] as const;

const resultStats = [
  { label: "Total Leads", value: "47", change: "+23%" },
  { label: "Booked", value: "31", change: "66% rate" },
  { label: "Revenue", value: "$9.8k", change: "+$2.4k" },
  { label: "Avg Response", value: "8s", change: "Instant" }
] as const;

const notificationCards = [
  {
    body: "Mike D. - Lawn maintenance",
    meta: "Thu Jan 15 at 9:00 AM",
    status: "New Booking",
    time: "Just now",
    wrapperClassName: "bg-emerald-500/10 border border-emerald-500/20",
    statusClassName: "text-emerald-400"
  },
  {
    body: "Karen W. - Tree trimming quote",
    meta: "Waiting for reply",
    status: "Follow-up Sent",
    time: "12m ago",
    wrapperClassName: "bg-zinc-800/60",
    statusClassName: "text-blue-400"
  },
  {
    body: "Tom B. - Patio design inquiry",
    meta: "Envo responded via text",
    status: "Missed Call Handled",
    time: "1h ago",
    wrapperClassName: "bg-zinc-800/60",
    statusClassName: "text-amber-400"
  }
] as const;

const pricingStats = [
  { label: "Setup time", tone: "neutral", value: "48h" },
  { label: "Setup by package", tone: "neutral", value: "Tiered" },
  { label: "Always answering", tone: "neutral", value: "24/7" },
  { label: "Day one momentum", tone: "emerald", value: "ROI" }
] as const;

const emailHref = getEmailHref();

export function ShuffleEnvoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".envo-shuffle .section-reveal"));

    if (!reveals.length) {
      return;
    }

    const revealElement = (element: HTMLElement, delay = 0) => {
      if (element.classList.contains("is-visible")) {
        return;
      }

      element.style.transitionDelay = `${delay}ms`;
      element.classList.add("is-visible");
    };

    const revealVisibleElements = () => {
      reveals.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 40 && rect.bottom > 40;

        if (isVisible) {
          revealElement(element);
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      reveals.forEach((element) => revealElement(element));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const parent = element.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll<HTMLElement>(".section-reveal"))
            : reveals;
          const delay = Math.max(siblings.indexOf(element), 0) * 70;

          revealElement(element, delay);
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1
      }
    );

    reveals.forEach((element) => observer.observe(element));

    const timeouts = [
      window.setTimeout(revealVisibleElements, 0),
      window.setTimeout(revealVisibleElements, 250),
      window.setTimeout(revealVisibleElements, 800)
    ];

    window.addEventListener("hashchange", revealVisibleElements);
    window.addEventListener("scroll", revealVisibleElements, { passive: true });

    return () => {
      observer.disconnect();
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("hashchange", revealVisibleElements);
      window.removeEventListener("scroll", revealVisibleElements);
    };
  }, []);

  return (
    <div className="envo-shuffle min-h-screen overflow-hidden bg-zinc-950 font-body text-zinc-100 antialiased">
      <EnvoNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <HowItWorksSection />
      <ResultsSection />
      <PricingCtaSection />
      <EnvoFooter />
    </div>
  );
}

function EnvoNav({
  isMenuOpen,
  setIsMenuOpen
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <nav className="w-full px-6 py-5 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="SignalOpsAI home">
          <LogoMark className="h-9 w-9" iconClassName="h-5 w-5" />
          <span className="font-heading text-lg tracking-tight text-white">SignalOpsAI</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-200 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <TrackedLink
          href="/preview"
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "envo_shuffle_nav" }}
          className="hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-400 active:scale-95 md:inline-flex"
        >
          <span>Get Envo</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
        </TrackedLink>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 md:hidden"
          aria-controls="envo-mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="envo-mobile-menu"
        className={`${isMenuOpen ? "flex" : "hidden"} mt-4 flex-col gap-4 border-t border-zinc-800/60 pb-4 pt-4 md:hidden`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <Link
          href="/preview"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950"
          onClick={() => setIsMenuOpen(false)}
        >
          Get Envo
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="w-full overflow-hidden px-6 py-14 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <h1 className="section-reveal mb-5 font-heading text-4xl leading-tight tracking-tight text-white md:text-5xl xl:text-6xl">
              <span>Stop missing calls.</span>
              <br />
              <span className="text-emerald-400">Start booking jobs.</span>
            </h1>
            <p className="section-reveal mb-8 max-w-lg text-lg leading-relaxed text-zinc-400 md:text-xl">
              Envo is an AI employee trained on your business. It answers inquiries, follows up with every lead, and books
              appointments while you focus on the work.
            </p>
            <div className="section-reveal flex flex-col gap-4 sm:flex-row">
              <TrackedLink
                href="/preview"
                eventName={ANALYTICS_EVENTS.previewCtaClicked}
                eventProperties={{ location: "envo_shuffle_hero" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-emerald-400 active:scale-95"
              >
                <span>See Envo in Action</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
              </TrackedLink>
            </div>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="relative md:pb-8">
              <div className="section-reveal relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/80 shadow-2xl shadow-emerald-500/5">
                <DashboardChrome />
                <div className="p-5 md:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="font-heading text-sm text-white">Envo Dashboard</div>
                      <div className="mt-0.5 text-xs text-zinc-500">Martin&apos;s Plumbing Co.</div>
                    </div>
                  </div>
                  <div className="mb-5 grid grid-cols-3 gap-3">
                    <HeroStat label="Today's Leads" value="12" detail="+4 from calls" />
                    <HeroStat label="Booked" value="8" detail="67% rate" />
                    <HeroStat label="Revenue" value="$4.2k" detail="This week" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-800/30">
                    <div className="flex items-center justify-between border-b border-zinc-800/50 px-4 py-2.5">
                      <span className="text-xs font-medium text-zinc-400">Recent Activity</span>
                      <span className="text-xs text-zinc-600">Live feed</span>
                    </div>
                    <div className="divide-y divide-zinc-800/40">
                      {activityItems.map((item) => (
                        <ActivityRow key={item.title} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-reveal relative z-10 mt-4 ml-auto w-44 md:absolute md:-bottom-2 md:right-6 md:mt-0 md:w-52">
                <MiniPhone />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full border-t border-zinc-800/40 px-6 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-11 lg:grid-cols-12 lg:gap-10">
          <div className="section-reveal lg:col-span-4">
            <div className="mb-4 text-xs font-medium uppercase tracking-widest text-emerald-400">How Envo Works</div>
            <h2 className="mb-5 font-heading text-3xl leading-snug tracking-tight text-white md:text-4xl">
              <span>Trained on </span>
              <span className="text-emerald-400">your</span>
              <span> business. Handles leads like </span>
              <span className="text-emerald-400">you</span>
              <span> would.</span>
            </h2>
            <p className="leading-relaxed text-zinc-400">
              We learn how you talk to customers, what services you offer, your pricing, your availability. Then Envo
              takes over the repetitive work you do not have time for.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4 md:grid-cols-2">
              {workflowCards.map((card, index) => (
                <WorkflowCard key={card.title} {...card} className={index % 2 === 1 ? "md:translate-y-7" : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  return (
    <section id="results" className="w-full border-t border-zinc-800/40 px-6 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="section-reveal mb-11 text-center">
          <div className="mb-4 text-xs font-medium uppercase tracking-widest text-emerald-400">See It Live</div>
          <h2 className="mb-4 font-heading text-3xl tracking-tight text-white md:text-4xl">
            <span>Your AI employee. </span>
            <span className="text-zinc-500">Your rules.</span>
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400">
            Whether you are checking leads from the truck or reviewing your week at the desk, Envo keeps everything in
            one place.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-12">
          <div className="section-reveal lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-zinc-900/80 px-5 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                <div className="ml-4 flex h-5 max-w-sm flex-1 items-center rounded-md bg-zinc-800/60 px-3">
                  <span className="text-[10px] text-zinc-600">app.signalops.ai/dashboard</span>
                </div>
              </div>
              <div className="p-5 md:p-7">
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <LogoMark className="h-9 w-9" iconClassName="h-5 w-5" />
                    <div>
                      <div className="font-heading text-sm text-white">Rivera Landscaping</div>
                      <div className="text-xs text-zinc-500">Week of Jan 12, 2026</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-zinc-800/60 px-3 py-1.5 text-xs text-zinc-400">This Week</div>
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/15 px-3 py-1.5 text-xs text-emerald-400">
                      Live View
                    </div>
                  </div>
                </div>
                <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {resultStats.map((stat) => (
                    <ResultStat key={stat.label} {...stat} />
                  ))}
                </div>
                <ConversationPreview />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 sm:flex-row lg:col-span-5 lg:flex-col">
            <div className="section-reveal mx-auto w-full max-w-[260px] sm:mx-0">
              <NotificationsPhone />
            </div>
            <div className="section-reveal mx-auto w-full max-w-[260px] sm:mx-0">
              <UseCaseCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCtaSection() {
  return (
    <section id="pricing" className="w-full border-t border-zinc-800/40 px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-900">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent" />
          <div className="relative grid items-center gap-8 p-6 md:p-10 lg:grid-cols-12 lg:p-12">
            <div className="section-reveal lg:col-span-7">
              <h2 className="mb-5 font-heading text-3xl leading-snug tracking-tight text-white md:text-4xl lg:text-5xl">
                <span>Every missed call is </span>
                <span className="text-emerald-400">money left on the table.</span>
              </h2>
              <p className="mb-7 max-w-lg text-lg leading-relaxed text-zinc-400">
                Get Envo set up quickly. We train it on your business, your rules, your services. You keep doing what you
                do best.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <TrackedLink
                  href="/preview"
                  eventName={ANALYTICS_EVENTS.previewCtaClicked}
                  eventProperties={{ location: "envo_shuffle_pricing" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 font-semibold text-zinc-950 transition-all duration-200 hover:bg-emerald-400 active:scale-95"
                >
                  <span>Start with Envo</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
                </TrackedLink>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-700 px-8 py-4 text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-white"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  <span>See a demo</span>
                </Link>
              </div>
            </div>
            <div className="section-reveal lg:col-span-5">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {pricingStats.map((stat) => (
                  <PricingStat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnvoFooter() {
  return (
    <footer className="w-full border-t border-zinc-800/40 px-6 py-8 md:px-12 md:py-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" iconClassName="h-4 w-4" />
            <div>
              <span className="font-heading text-sm text-white">SignalOpsAI</span>
              <span className="ml-2 text-xs text-zinc-600">/ Envo</span>
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
              eventProperties={{ location: "envo_shuffle_footer", type: "email" }}
              className="transition-colors hover:text-zinc-300"
            >
              Contact
            </TrackedLink>
          </div>
        </div>
        <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/30 pt-5 sm:flex-row">
          <p className="text-xs text-zinc-600">2026 SignalOpsAI. All rights reserved.</p>
          <p className="text-xs text-zinc-700">AI systems that work while you work.</p>
        </div>
      </div>
    </footer>
  );
}

function DashboardChrome() {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-800/60 px-5 py-3">
      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
      <div className="ml-4 h-5 max-w-xs flex-1 rounded-md bg-zinc-800/60" />
    </div>
  );
}

function HeroStat({ detail, label, value }: { detail: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-800/50 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 font-heading text-xl text-white">{value}</div>
      <div className="mt-0.5 text-xs text-emerald-400">{detail}</div>
    </div>
  );
}

function ActivityRow({
  detail,
  icon: Icon,
  iconClassName,
  time,
  title
}: {
  detail: string;
  icon: typeof PhoneCall;
  iconClassName: string;
  time: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-white">{title}</div>
        <div className="text-xs text-zinc-500">{detail}</div>
      </div>
      <span className="shrink-0 text-xs text-zinc-600">{time}</span>
    </div>
  );
}

function MiniPhone() {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-zinc-700/80 bg-zinc-900 shadow-2xl shadow-black/40">
      <div className="flex justify-center pb-1 pt-2">
        <div className="h-4 w-20 rounded-full bg-zinc-800" />
      </div>
      <div className="px-3 pb-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <div className="text-[9px] text-zinc-500">Envo Mobile</div>
            <div className="font-heading text-[10px] text-white">Your Leads</div>
          </div>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
        </div>
        <div className="space-y-2">
          {mobileLeadCards.map((card) => (
            <div key={card.name} className="rounded-lg bg-zinc-800/60 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate text-[9px] font-medium text-white">{card.name}</div>
                <div className={`rounded px-1.5 py-0.5 text-[8px] ${card.badgeClassName}`}>{card.badge}</div>
              </div>
              <div className="mt-1 text-[8px] text-zinc-500">{card.detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-emerald-500 py-2 text-center">
          <span className="text-[9px] font-semibold text-zinc-950">View All Leads</span>
        </div>
      </div>
    </div>
  );
}

function WorkflowCard({
  className = "",
  copy,
  icon: Icon,
  title,
  tone
}: {
  className?: string;
  copy: string;
  icon: typeof PhoneCall;
  title: string;
  tone: "amber" | "blue" | "emerald" | "violet";
}) {
  const toneClasses = {
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20"
  };

  return (
    <div
      className={`section-reveal group rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-emerald-500/30 md:p-6 ${className}`}
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${toneClasses[tone]}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
      </div>
      <h3 className="mb-2 font-heading text-lg text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{copy}</p>
    </div>
  );
}

function ResultStat({ change, label, value }: { change: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-800/40 p-3 md:p-4">
      <div className="mb-1 text-xs text-zinc-500">{label}</div>
      <div className="font-heading text-2xl text-white">{value}</div>
      <div className="mt-1 flex items-center gap-1">
        <ArrowUp className="h-3 w-3 text-emerald-400" aria-hidden="true" />
        <span className="text-[10px] text-emerald-400">{change}</span>
      </div>
    </div>
  );
}

function ConversationPreview() {
  return (
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-800/30 p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-zinc-400">AI Conversation - Inbound Call</span>
        <span className="shrink-0 text-xs text-zinc-600">Today, 2:14 PM</span>
      </div>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-700">
            <span className="text-[9px] text-zinc-400">C</span>
          </div>
          <div className="max-w-xs rounded-xl rounded-tl-sm bg-zinc-800/80 px-3.5 py-2.5">
            <p className="text-xs text-zinc-300">
              Hi, I need someone to come look at my sprinkler system. A few heads are broken.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <div className="max-w-xs rounded-xl rounded-tr-sm border border-emerald-500/20 bg-emerald-500/15 px-3.5 py-2.5">
            <p className="text-xs text-emerald-300">
              Hi! Thanks for calling Rivera Landscaping. I can definitely help with that. We do sprinkler repair and can
              usually get out within a day or two. Can I grab your address and find a time that works?
            </p>
          </div>
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
            <Zap className="h-3 w-3 text-emerald-400" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsPhone() {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-zinc-700/80 bg-zinc-900 shadow-2xl shadow-black/30">
      <div className="flex justify-center pb-1.5 pt-2.5">
        <div className="h-5 w-24 rounded-full bg-zinc-800" />
      </div>
      <div className="px-4 pb-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-zinc-500">Notifications</div>
            <div className="font-heading text-xs text-white">3 New Leads</div>
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15">
            <Bell className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          </div>
        </div>
        <div className="space-y-2.5">
          {notificationCards.map((card) => (
            <div key={card.body} className={`rounded-xl p-3 ${card.wrapperClassName}`}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`text-[10px] font-medium ${card.statusClassName}`}>{card.status}</span>
                <span className="text-[9px] text-zinc-500">{card.time}</span>
              </div>
              <div className="text-[10px] text-white">{card.body}</div>
              <div className="text-[9px] text-zinc-500">{card.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UseCaseCard() {
  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-5 md:p-6">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        <span>USE CASE</span>
      </div>
      <p className="mb-5 text-sm leading-relaxed text-zinc-300">
        Built for the moments you&apos;re already on a job, driving, or helping another customer. Envo answers fast, collects
        the key details, follows up, and gives you one clean next step.
      </p>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700">
          <span className="text-[10px] font-medium text-zinc-300">EO</span>
        </div>
        <div>
          <div className="text-xs text-white">Busy owner-operator</div>
          <div className="text-[10px] text-zinc-500">Calls • texts • forms • follow-ups</div>
        </div>
      </div>
    </div>
  );
}

function PricingStat({
  label,
  tone,
  value
}: {
  label: string;
  tone: "emerald" | "neutral";
  value: string;
}) {
  const className =
    tone === "emerald"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      : "border-zinc-800/50 bg-zinc-800/40 text-white";
  const labelClassName = tone === "emerald" ? "text-emerald-400/70" : "text-zinc-500";

  return (
    <div className={`rounded-2xl border p-4 md:p-5 ${className}`}>
      <div className="mb-1 font-heading text-2xl leading-tight md:text-3xl">{value}</div>
      <div className={`text-xs ${labelClassName}`}>{label}</div>
    </div>
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
      className={`flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/20 ${className}`}
      aria-hidden="true"
    >
      <Zap className={`text-emerald-400 ${iconClassName}`} />
    </span>
  );
}
