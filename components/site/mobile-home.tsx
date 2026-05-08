import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BellRing,
  Bot,
  CalendarCheck2,
  ClipboardList,
  Clock3,
  FileText,
  Mail,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  RefreshCcw,
  Route,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRoundCheck
} from "lucide-react";
import { MobileCommandCenterSlider } from "@/components/site/mobile-command-center-slider";
import { TrackedLink } from "@/components/site/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { PRIMARY_CTA, SECONDARY_CTA, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const mobileShell = "mx-auto w-full max-w-md px-4";

const conversation = [
  {
    speaker: "Customer",
    tone: "customer",
    text: "Hey, I have curb rash on two wheels. Can you do mobile repair?"
  },
  {
    speaker: "SignalOps AI",
    tone: "ai",
    text: "Yes. Send photos of each wheel and your vehicle details. I can get the quote started and check mobile availability."
  },
  {
    speaker: "Customer",
    tone: "customer",
    text: "2018 BMW, 19 inch wheels, both passenger side."
  },
  {
    speaker: "SignalOps AI",
    tone: "ai",
    text: "Got it. I will flag this as a mobile cosmetic repair quote and send the shop your details."
  }
] satisfies Array<{
  speaker: string;
  tone: "customer" | "ai";
  text: string;
}>;

const timelineSteps = [
  { title: "Lead captured", detail: "Form, call, text, DM, or quote request comes in.", icon: MessageCircle },
  { title: "AI replied in 4.3s", detail: "The lead gets a useful first response before going cold.", icon: Clock3 },
  { title: "Details collected", detail: "Service, urgency, location, photos, and fit are structured.", icon: ClipboardList },
  { title: "Owner alerted", detail: "Hot leads get routed with context and suggested action.", icon: UserRoundCheck },
  { title: "Follow-up scheduled", detail: "No-replies, missing photos, and quote reminders keep moving.", icon: RefreshCcw },
  { title: "Booking handoff ready", detail: "Ready leads move toward a calendar, callback, or sales handoff.", icon: CalendarCheck2 }
];

const leadDetails = [
  ["Priority", "Warm / High intent"],
  ["Service", "Curb rash repair"],
  ["Source", "Text message"],
  ["Needs photos", "Yes"],
  ["Next action", "Request photos + offer mobile appointment window"]
];

const responseLayers = [
  {
    title: "AI Receptionist",
    copy: "Replies fast across forms, calls, texts, DMs, and quote requests.",
    icon: Bot
  },
  {
    title: "Qualifier",
    copy: "Asks the questions your team needs before quoting or booking.",
    icon: ClipboardList
  },
  {
    title: "Follow-Up Engine",
    copy: "Nudges no-replies, missing photos, stale quotes, and forgotten leads.",
    icon: RefreshCcw
  },
  {
    title: "Human Handoff",
    copy: "Routes unsure or high-value leads to a person with usable notes.",
    icon: ShieldCheck
  }
];

const useCases = [
  { title: "Wheel repair quote intake", icon: Tags },
  { title: "Missed-call text back", icon: PhoneCall },
  { title: "Med spa consult booking", icon: CalendarCheck2 },
  { title: "Contractor estimates", icon: ClipboardList },
  { title: "Insurance qualification", icon: Route }
];

const previewOutputs = [
  { title: "Preview Report", copy: "Where leads slow down and what system should fix it.", icon: FileText },
  { title: "Proposal Draft", copy: "Recommended scope, package, and next steps.", icon: ClipboardList },
  { title: "Email Draft", copy: "Reviewed before anything customer-facing is sent.", icon: Mail }
];

export function MobileSignalOpsHome() {
  return (
    <div className="relative overflow-hidden bg-[#071018] pb-24 text-white md:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_-8%,rgba(55,240,189,0.26),transparent_18rem),radial-gradient(circle_at_92%_6%,rgba(139,183,255,0.26),transparent_18rem),linear-gradient(180deg,#071018_0%,#0a101a_48%,#f4f7fb_48%,#f4f7fb_68%,#08111a_68%,#08111a_100%)]" />

      <div className="relative">
        <MobileAppHeader />
        <MobileHero />
        <ConversationSection />
        <MobileCommandCenterSlider />
        <LeadSystemStory />
        <ResponseLayer />
        <PreviewPackage />
        <UseCases />
        <MobileFinalCTA />
        <MobileStickyCTA />
      </div>
    </div>
  );
}

function MobileAppHeader() {
  return (
    <header className={`${mobileShell} pt-3`}>
      <div className="rounded-3xl border border-white/12 bg-white/[0.08] p-3 shadow-2xl shadow-black/24 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-base font-black tracking-normal">SignalOps</p>
            <p className="text-xs font-semibold text-white/54">AI lead command layer</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#37f0bd]/24 bg-[#37f0bd]/12 px-3 py-2 text-[0.68rem] font-black text-[#cffff2]">
            <span className="size-2 rounded-full bg-[#37f0bd] shadow-[0_0_0_5px_rgba(55,240,189,0.12)]" />
            Online
          </span>
        </div>
      </div>
    </header>
  );
}

function MobileHero() {
  return (
    <section className={`${mobileShell} py-8`}>
      <div className="inline-flex items-center gap-2 rounded-full border border-[#f7ff73]/25 bg-[#f7ff73]/12 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#fbffad]">
        <Sparkles className="size-4" aria-hidden="true" />
        Free Preview
      </div>
      <h1 className="mt-5 text-[2.8rem] font-black leading-[0.96] tracking-normal text-white">
        Meet the AI layer that answers leads before they go cold.
      </h1>
      <p className="mt-5 text-base leading-7 text-white/72">
        SignalOps builds AI receptionist, qualification, follow-up, and booking handoff systems for local service businesses.
      </p>
      <div className="mt-6 grid gap-3">
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_hero" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#f7ff73] px-5 text-sm font-black text-[#071018] shadow-xl shadow-[#f7ff73]/15 transition hover:bg-[#fbffad]"
        >
          {PRIMARY_CTA.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
        <TrackedLink
          href={SECONDARY_CTA.href}
          eventName={ANALYTICS_EVENTS.demoViewed}
          eventProperties={{ location: "mobile_home_hero_demo" }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/[0.07] px-5 text-sm font-black text-white transition hover:bg-white/[0.12]"
        >
          {SECONDARY_CTA.label}
        </TrackedLink>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          ["482", "new leads"],
          ["4.3s", "response"],
          ["127", "booked"]
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
            <p className="text-xl font-black">{value}</p>
            <p className="mt-1 text-[0.65rem] font-black uppercase leading-4 text-white/54">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConversationSection() {
  return (
    <section className={`${mobileShell} pb-7`} aria-labelledby="mobile-conversation-title">
      <div className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-3 shadow-2xl shadow-black/28 backdrop-blur-2xl">
        <div className="rounded-[1.5rem] bg-[#0a0f18] p-3">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#37f0bd]/12 text-[#37f0bd]">
                <MessageSquareText className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="mobile-conversation-title" className="text-sm font-black">
                  Live lead assistant
                </h2>
                <p className="text-xs font-semibold text-white/54">Apex Wheel Repair example</p>
              </div>
            </div>
            <span className="rounded-full bg-[#37f0bd]/12 px-2.5 py-1 text-[0.68rem] font-black text-[#cffff2]">
              4.3s
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {conversation.map((message) => (
              <article
                key={message.text}
                className={cn(
                  "max-w-[88%] rounded-3xl p-3",
                  message.tone === "ai"
                    ? "mr-auto border border-[#37f0bd]/18 bg-[#37f0bd]/12 text-[#eafff8]"
                    : "ml-auto bg-white text-[#071018]"
                )}
              >
                <p className={cn("text-[0.68rem] font-black uppercase", message.tone === "ai" ? "text-[#b8ffec]/74" : "text-[#071018]/52")}>
                  {message.speaker}
                </p>
                <p className="mt-1 text-sm leading-6">{message.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadSystemStory() {
  return (
    <section className={`${mobileShell} grid gap-4 pb-8`} aria-labelledby="mobile-story-title">
      <div className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#37f0bd]">Lead card</p>
        <h2 id="mobile-story-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          Warm quote request, ready for review.
        </h2>
        <div className="mt-4 grid gap-2">
          {leadDetails.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.12em] text-white/46">{label}</p>
              <p className="mt-1 text-sm font-black leading-5">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-[#f7ff73]/18 bg-[#f7ff73]/10 p-3">
          <p className="flex gap-2 text-sm font-black text-[#fbffad]">
            <BellRing className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Owner alert: summary and next action are ready.
          </p>
        </div>
      </div>

      <Timeline />
    </section>
  );
}

function Timeline() {
  return (
    <div className="rounded-[2rem] border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-black/20 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#37f0bd]">Handoff timeline</p>
      <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal">
        From captured to booking-ready.
      </h2>
      <div className="mt-5 grid gap-3">
        {timelineSteps.map((step, index) => (
          <TimelineRow key={step.title} index={index} {...step} />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({
  detail,
  icon: Icon,
  index,
  title
}: {
  detail: string;
  icon: LucideIcon;
  index: number;
  title: string;
}) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-3">
      <div className="relative flex justify-center">
        {index < timelineSteps.length - 1 ? (
          <span className="absolute bottom-[-0.8rem] top-9 w-px bg-[linear-gradient(180deg,rgba(247,255,115,0.5),rgba(55,240,189,0.1))]" aria-hidden="true" />
        ) : null}
        <div className="relative z-10 flex size-9 items-center justify-center rounded-2xl bg-[#f7ff73]/14 text-[#f7ff73]">
          <Icon className="size-4" aria-hidden="true" />
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
        <p className="text-sm font-black">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/62">{detail}</p>
      </div>
    </div>
  );
}

function ResponseLayer() {
  return (
    <section className="bg-[#f4f7fb] px-4 py-9 text-[#071018]" aria-labelledby="mobile-response-layer-title">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#08785d]">Not just a chatbot</p>
        <h2 id="mobile-response-layer-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          A response layer behind your business.
        </h2>
        <div className="mt-5 grid gap-3">
          {responseLayers.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-3xl border border-[#dfe8ee] bg-white p-4 shadow-xl shadow-[#071018]/5">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e7fff7] text-[#08785d]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-normal">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#071018]/64">{item.copy}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PreviewPackage() {
  return (
    <section className="bg-[#f4f7fb] px-4 pb-9 text-[#071018]" aria-labelledby="mobile-preview-title">
      <div className="mx-auto max-w-md rounded-[2rem] border border-[#dfe8ee] bg-white p-4 shadow-2xl shadow-[#071018]/8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#08785d]">Free Preview</p>
        <h2 id="mobile-preview-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          See the system before we build it.
        </h2>
        <div className="mt-5 grid gap-3">
          {previewOutputs.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-3xl border border-[#e8eef3] bg-[#f7fafc] p-4">
                <Icon className="size-5 text-[#08785d]" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-black tracking-normal">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#071018]/64">{item.copy}</p>
              </article>
            );
          })}
        </div>
        <p className="mt-4 flex gap-2 rounded-2xl bg-[#e7fff7] p-3 text-sm font-bold leading-6 text-[#08785d]">
          <ShieldCheck className="mt-1 size-4 shrink-0" aria-hidden="true" />
          We review your preview before it is emailed. Nothing auto-sends.
        </p>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="bg-[#08111a] px-4 py-9" aria-labelledby="mobile-use-cases-title">
      <div className="mx-auto max-w-md">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f7ff73]">Built for service businesses</p>
        <h2 id="mobile-use-cases-title" className="mt-2 text-3xl font-black leading-tight tracking-normal">
          Broad lead workflows, one command layer.
        </h2>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {useCases.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="min-w-[12.5rem] rounded-3xl border border-white/12 bg-white/[0.07] p-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#f7ff73]/14 text-[#f7ff73]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-black tracking-normal">{item.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileFinalCTA() {
  return (
    <section className={`${mobileShell} bg-[#08111a] pb-9`}>
      <div className="rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_88%_0%,rgba(55,240,189,0.2),transparent_14rem),rgba(255,255,255,0.08)] p-5 shadow-2xl shadow-black/24">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#37f0bd]">Start here</p>
        <h2 className="mt-2 text-3xl font-black leading-tight tracking-normal">
          Free Preview first. Build only after the system makes sense.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/68">
          SignalOps maps your lead flow, drafts the system preview, and reviews it before anything is emailed.
        </p>
        <div className="mt-5 grid gap-3">
          <TrackedLink
            href={PRIMARY_CTA.href}
            eventName={ANALYTICS_EVENTS.previewCtaClicked}
            eventProperties={{ location: "mobile_home_final" }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#f7ff73] px-5 text-sm font-black text-[#071018] transition hover:bg-[#fbffad]"
          >
            {PRIMARY_CTA.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <TrackedLink
            href={SECONDARY_CTA.href}
            eventName={ANALYTICS_EVENTS.demoViewed}
            eventProperties={{ location: "mobile_home_final_demo" }}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/14 bg-white/[0.07] px-5 text-sm font-black text-white transition hover:bg-white/[0.12]"
          >
            {SECONDARY_CTA.label}
          </TrackedLink>
        </div>
        <p className="mt-4 text-xs font-semibold text-white/50">{SITE_CONFIG.email}</p>
      </div>
    </section>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/12 bg-[#071018]/94 px-3 py-3 text-white shadow-[0_-22px_55px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] items-center gap-3">
        <div>
          <p className="text-xs font-black uppercase">Free Preview</p>
          <p className="text-xs text-white/54">Reviewed before email</p>
        </div>
        <TrackedLink
          href={PRIMARY_CTA.href}
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "mobile_home_sticky" }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#f7ff73] px-5 text-sm font-black text-[#071018] transition hover:bg-[#fbffad]"
        >
          Start
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </div>
    </div>
  );
}
