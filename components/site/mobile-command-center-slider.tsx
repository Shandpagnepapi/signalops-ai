"use client";

import { useRef, useState, type TouchEvent } from "react";
import {
  BellRing,
  CheckCircle2,
  CircleDot,
  RadioTower,
  Route,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

type CommandSlide = {
  id: string;
  name: string;
  eyebrow: string;
  summary: string;
  accent: string;
  surface: "enterprise" | "glassy" | "minimal";
};

const slides: CommandSlide[] = [
  {
    id: "enterprise",
    name: "Dark Enterprise Dashboard",
    eyebrow: "Style 01",
    summary: "Serious SaaS visibility for lead volume, sources, follow-up, and owner alerts.",
    accent: "#37f0bd",
    surface: "enterprise"
  },
  {
    id: "glassy",
    name: "Glassy Futuristic UI",
    eyebrow: "Style 02",
    summary: "Layered command cards with signal glow, AI status, and active lead routing.",
    accent: "#8bb7ff",
    surface: "glassy"
  },
  {
    id: "minimal",
    name: "Minimal Executive Overview",
    eyebrow: "Style 03",
    summary: "Calmer overview for owners who want the numbers, the risk, and the next action.",
    accent: "#f7ff73",
    surface: "minimal"
  }
];

export function MobileCommandCenterSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = slides[activeIndex];

  function goTo(index: number) {
    const nextIndex = (index + slides.length) % slides.length;
    setActiveIndex(nextIndex);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - endX;
    touchStartX.current = null;

    if (Math.abs(delta) < 34) {
      return;
    }

    goTo(activeIndex + (delta > 0 ? 1 : -1));
  }

  return (
    <section className="px-4 py-7" aria-labelledby="command-center-slider-title">
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#37f0bd]">Command Center</p>
            <h2 id="command-center-slider-title" className="mt-2 text-3xl font-black leading-tight tracking-normal text-white">
              Pick the control room vibe.
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-white/70">
            {activeIndex + 1}/3
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="rounded-[1.55rem] border border-white/10 bg-[#071018] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: activeSlide.accent }}>
                  {activeSlide.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-black leading-tight tracking-normal text-white">
                  {activeSlide.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/66">{activeSlide.summary}</p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <RadioTower className="size-5" style={{ color: activeSlide.accent }} aria-hidden="true" />
              </div>
            </div>

            <div className="mt-5">
              {activeSlide.surface === "enterprise" ? <EnterpriseDashboard /> : null}
              {activeSlide.surface === "glassy" ? <GlassyDashboard /> : null}
              {activeSlide.surface === "minimal" ? <MinimalDashboard /> : null}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2" role="tablist" aria-label="Command center styles">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "min-h-12 rounded-2xl border px-2 text-center text-[0.68rem] font-black leading-4 transition",
                activeIndex === index
                  ? "border-[#37f0bd]/50 bg-[#37f0bd]/14 text-[#cffff2]"
                  : "border-white/10 bg-white/[0.045] text-white/56"
              )}
              role="tab"
              aria-selected={activeIndex === index}
            >
              {slide.name.replace(" Dashboard", "").replace(" UI", "")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseDashboard() {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-[#0b121c] p-3">
      <div className="grid grid-cols-3 gap-2">
        <Metric label="New leads" value="482" tone="green" />
        <Metric label="Response" value="4.3s" tone="blue" />
        <Metric label="Bookings" value="127" tone="yellow" />
      </div>

      <div className="mt-3 grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/54">Lead sources</p>
            <TrendingUp className="size-4 text-[#37f0bd]" aria-hidden="true" />
          </div>
          <div className="mt-3 grid gap-2">
            {[
              ["Google", "48%", "w-[78%]"],
              ["Website", "24%", "w-[46%]"],
              ["Missed calls", "18%", "w-[34%]"],
              ["DMs", "10%", "w-[22%]"]
            ].map(([label, value, width]) => (
              <div key={label} className="grid grid-cols-[4.8rem_1fr_2.4rem] items-center gap-2 text-xs">
                <span className="text-white/62">{label}</span>
                <span className="h-2 overflow-hidden rounded-full bg-white/8">
                  <span className={cn("block h-full rounded-full bg-[#37f0bd]", width)} />
                </span>
                <span className="text-right font-black text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <OwnerAlert tone="enterprise" />
      </div>
    </div>
  );
}

function GlassyDashboard() {
  return (
    <div className="relative min-h-[21rem] overflow-hidden rounded-[1.4rem] border border-white/12 bg-[radial-gradient(circle_at_18%_8%,rgba(139,183,255,0.32),transparent_10rem),radial-gradient(circle_at_80%_70%,rgba(55,240,189,0.2),transparent_11rem),#09111b] p-3">
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8bb7ff]/20" />
      <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#37f0bd]/20" />
      <div className="relative grid gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-3xl border border-white/14 bg-white/[0.12] p-4 backdrop-blur-2xl">
            <Sparkles className="size-5 text-[#8bb7ff]" aria-hidden="true" />
            <p className="mt-5 text-3xl font-black text-white">4.3s</p>
            <p className="text-xs font-black uppercase text-white/54">AI response</p>
          </div>
          <div className="grid gap-2">
            <MiniTile label="New leads" value="482" />
            <MiniTile label="Booked" value="127" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/14 bg-white/[0.11] p-4 backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#cfe0ff]">Signal layer</p>
              <p className="mt-2 text-sm font-black text-white">Lead captured → qualified → routed</p>
            </div>
            <Route className="size-5 text-[#37f0bd]" aria-hidden="true" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {["Form", "AI", "Score", "Owner"].map((label, index) => (
              <div key={label} className="text-center">
                <div className="mx-auto flex size-9 items-center justify-center rounded-full border border-white/14 bg-white/10">
                  <span className="text-xs font-black text-white">{index + 1}</span>
                </div>
                <p className="mt-1 text-[0.64rem] font-black uppercase text-white/56">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <OwnerAlert tone="glassy" />
      </div>
    </div>
  );
}

function MinimalDashboard() {
  return (
    <div className="rounded-[1.4rem] border border-[#dfe8ee] bg-[#f7fafc] p-3 text-[#071018]">
      <div className="flex items-start justify-between gap-3 rounded-3xl bg-white p-4 shadow-sm">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#617282]">Executive overview</p>
          <p className="mt-2 text-2xl font-black">Lead system healthy</p>
        </div>
        <CheckCircle2 className="size-7 text-[#08785d]" aria-hidden="true" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Leads" value="482" tone="minimal" />
        <Metric label="Speed" value="4.3s" tone="minimal" />
        <Metric label="Booked" value="127" tone="minimal" />
      </div>
      <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#617282]">Follow-up status</p>
          <span className="rounded-full bg-[#e7fff7] px-2.5 py-1 text-xs font-black text-[#08785d]">Active</span>
        </div>
        <div className="mt-4 grid gap-3">
          {[
            ["Quote reminders", "91%"],
            ["Photo requests", "74%"],
            ["Owner alerts", "100%"]
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-[#e8eef3] pb-2 last:border-0 last:pb-0">
              <span className="text-sm font-semibold text-[#27323d]">{label}</span>
              <span className="text-sm font-black">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-3xl bg-[#071018] p-4 text-white">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#f7ff73]">Top priority</p>
        <p className="mt-2 text-sm font-black">Warm quote request needs owner review</p>
        <p className="mt-1 text-xs leading-5 text-white/62">Summary, source, service, and suggested action are ready.</p>
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "green" | "blue" | "yellow" | "minimal" }) {
  const toneClass = {
    green: "bg-[#37f0bd]/12 text-[#baffec] border-[#37f0bd]/22",
    blue: "bg-[#8bb7ff]/12 text-[#dbe7ff] border-[#8bb7ff]/22",
    yellow: "bg-[#f7ff73]/12 text-[#fbffad] border-[#f7ff73]/22",
    minimal: "bg-white text-[#071018] border-[#dfe8ee]"
  }[tone];

  return (
    <div className={cn("rounded-2xl border p-3", toneClass)}>
      <p className="text-xl font-black">{value}</p>
      <p className="mt-1 text-[0.64rem] font-black uppercase opacity-70">{label}</p>
    </div>
  );
}

function MiniTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/14 bg-white/[0.11] p-3 backdrop-blur-2xl">
      <p className="text-xl font-black text-white">{value}</p>
      <p className="mt-1 text-[0.64rem] font-black uppercase text-white/54">{label}</p>
    </div>
  );
}

function OwnerAlert({ tone }: { tone: "enterprise" | "glassy" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        tone === "enterprise"
          ? "border-[#f7ff73]/20 bg-[#f7ff73]/10"
          : "border-white/14 bg-white/[0.12] backdrop-blur-2xl"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7ff73]/14 text-[#f7ff73]">
          <BellRing className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-black text-white">Owner alert ready</p>
          <p className="mt-1 text-xs leading-5 text-white/64">
            Warm curb rash quote. Needs photos, mobile availability, and callback window.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["High intent", "Follow-up queued", "Human review"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[0.64rem] font-black text-white/72">
                <CircleDot className="size-3" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
