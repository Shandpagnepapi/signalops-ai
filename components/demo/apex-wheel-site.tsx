"use client";

import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Camera,
  Car,
  CheckCircle2,
  Clock3,
  Gauge,
  MapPin,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { DemoBusinessConfig } from "@/lib/demo-businesses";
import { DemoLeadForm } from "./wheel-lead-form";

const serviceIcons = [Wrench, Gauge, ShieldCheck, Sparkles, BadgeCheck, Camera, Car, CheckCircle2];
const damageIcons = [Wrench, Gauge, AlertTriangle, Sparkles, BadgeCheck, Camera, CheckCircle2];
const signalFlowOffsets = ["mr-0", "mr-10", "mr-20", "mr-28"];

export function ApexWheelSite({ business }: { business: DemoBusinessConfig }) {
  const CalloutIcon = business.key === "well-water" ? Wrench : Car;

  return (
    <div className="overflow-x-hidden bg-[#080a0f] pb-20 text-zinc-100 md:pb-0">
      <section className="relative isolate min-h-[84vh] overflow-hidden border-b border-white/10">
        {business.heroImage ? (
          <Image
            src={business.heroImage.src}
            alt={business.heroImage.alt}
            fill
            priority
            quality={72}
            className="object-cover opacity-48"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,111,156,0.24),transparent_34%),linear-gradient(135deg,#160d22_0%,#2b193c_40%,#080a0f_100%)]">
            <div className="absolute right-0 top-14 hidden w-[48rem] max-w-[55vw] rounded-l-full border-y border-l border-[#ffb36d]/10 bg-[#ffb36d]/8 p-10 blur-[0.2px] lg:block">
              <div className="grid gap-4">
                {["Call", "Text", "Form", "Follow-up"].map((item, index) => (
                  <div
                    key={item}
                    className={`ml-auto flex w-[70%] items-center gap-3 rounded-lg border border-white/10 bg-black/24 p-4 ${signalFlowOffsets[index] ?? "mr-0"}`}
                  >
                    <div className="size-3 rounded-full bg-[#ffb36d]" />
                    <div className="h-2 flex-1 rounded-full bg-white/20" />
                    <span className="text-xs font-medium text-[#fff1f7]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#080a0f_0%,rgba(8,10,15,0.94)_36%,rgba(8,10,15,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#080a0f_96%)]" />
        <div className="relative mx-auto grid min-h-[84vh] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_0.75fr] lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-5 border-[#ffb36d]/25 bg-[#ffb36d]/10 text-[#ffe1bd]">
              {business.heroBadge}
            </Badge>
            <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
              <MapPin className="size-4 text-[#ffb36d]" aria-hidden="true" />
              {business.location}
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              {business.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-200 sm:text-lg">
              {business.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#ff6f9c] px-5 text-base font-semibold text-white shadow-lg shadow-pink-950/30 transition hover:bg-[#ff8ab0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9ec0]"
              >
                {business.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a
                href={business.secondaryHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-zinc-900 px-5 text-base font-semibold text-zinc-100 transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9ec0]"
              >
                {business.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/55 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{business.qualificationPreview.title}</p>
                <p className="text-xs text-zinc-500">{business.qualificationPreview.subtitle}</p>
              </div>
              <Badge className="bg-emerald-400/12 text-emerald-100">{business.qualificationPreview.badge}</Badge>
            </div>
            <div className="space-y-3">
              {business.qualificationPreview.cards.map(({ title, description }) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
            {business.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {business.trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-zinc-200">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
              {badge}
            </div>
          ))}
        </div>
      </section>

      <SectionIntro
        id="services"
        eyebrow={business.servicesSection.eyebrow}
        title={business.servicesSection.title}
        description={business.servicesSection.description}
      />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {business.services.map((service, index) => {
          const Icon = serviceIcons[index] ?? Wrench;
          return (
            <Card key={service.title} className="border-white/10 bg-zinc-950/82">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-[#ffb36d]/12 text-[#ffd0a4]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-base">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#10131a,#080a0f)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="mb-4 bg-amber-400/15 text-amber-100">{business.beforeAfter.eyebrow}</Badge>
            <h2 className="text-3xl font-semibold tracking-normal text-white">
              {business.beforeAfter.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              {business.beforeAfter.description}
            </p>
            <div className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              {business.beforeAfter.points.map((point) => (
                <ValuePoint key={point.title} title={point.title} description={point.description} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-black/30">
            {business.beforeAfter.image ? (
              <Image
                src={business.beforeAfter.image.src}
                alt={business.beforeAfter.image.alt}
                width={1400}
                height={720}
                quality={72}
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid min-h-[22rem] gap-4 bg-[radial-gradient(circle_at_top_right,rgba(255,179,109,0.18),transparent_34%),#160d22] p-5 sm:grid-cols-3">
                {(business.beforeAfter.visualCards ?? []).map((card) => (
                  <div key={card.label} className="flex min-h-48 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.045] p-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ffca91]">{card.label}</p>
                      <p className="mt-4 text-2xl font-semibold text-white">{card.value}</p>
                    </div>
                    <p className="text-sm leading-6 text-zinc-300">{card.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <SectionIntro
        id={business.commonIssues.id}
        eyebrow={business.commonIssues.eyebrow}
        title={business.commonIssues.title}
        description={business.commonIssues.description}
      />
      <section className="mx-auto grid max-w-7xl gap-3 px-4 pb-16 sm:px-6 sm:grid-cols-2 lg:grid-cols-7 lg:px-8">
        {business.commonIssues.items.map((damage, index) => {
          const Icon = damageIcons[index] ?? Wrench;
          return (
            <div key={damage} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <Icon className="mb-3 size-5 text-[#ffd0a4]" aria-hidden="true" />
              <p className="text-sm font-medium text-white">{damage}</p>
            </div>
          );
        })}
      </section>

      <section className="border-y border-white/10 bg-zinc-950/80">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <Badge className="mb-4 bg-[#ffb36d]/15 text-[#ffe1bd]">{business.process.eyebrow}</Badge>
            <h2 className="text-3xl font-semibold tracking-normal text-white">{business.process.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {business.process.steps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-white/10 bg-black/28 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-[#ff6f9c] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id={business.callout.id} className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8">
        <div className="rounded-lg border border-[#ffb36d]/20 bg-[#ffb36d]/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-md bg-[#ff6f9c] text-white">
              <CalloutIcon className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#ffe1bd]">{business.callout.eyebrow}</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">{business.callout.title}</h2>
            </div>
          </div>
          <p className="mt-5 text-base leading-7 text-zinc-200">
            {business.callout.description}
          </p>
        </div>

        <Card className="border-amber-300/20 bg-amber-400/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-amber-200" aria-hidden="true" />
              {business.callout.noteTitle}
            </CardTitle>
            <CardDescription className="text-amber-50/80">
              {business.callout.noteDescription}
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {business.operationsSection ? (
        <section className="border-y border-[#ffb36d]/10 bg-[linear-gradient(180deg,#160d22,#080a0f)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <Badge className="mb-4 bg-[#ffb36d]/15 text-[#ffe1bd]">{business.operationsSection.eyebrow}</Badge>
              <h2 className="text-3xl font-semibold tracking-normal text-white">{business.operationsSection.title}</h2>
              <p className="mt-4 text-base leading-7 text-zinc-300">{business.operationsSection.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {business.operationsSection.points.map((point) => (
                <div key={point} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-medium text-zinc-100">
                  <CheckCircle2 className="mb-3 size-5 text-emerald-300" aria-hidden="true" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-white/10 bg-[linear-gradient(180deg,#080a0f,#11151d)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge className="mb-4 bg-emerald-400/15 text-emerald-100">{business.testimonialsSection.eyebrow}</Badge>
            <h2 className="text-3xl font-semibold tracking-normal text-white">{business.testimonialsSection.title}</h2>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              {business.testimonialsSection.description}
            </p>
          </div>
          <div className="grid gap-4">
            {business.testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-zinc-950/82">
                <CardContent className="pt-6">
                  <p className="text-sm leading-7 text-zinc-200">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-zinc-500">{testimonial.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <Badge className="mb-4 bg-[#ffb36d]/15 text-[#ffe1bd]">{business.faqSection.eyebrow}</Badge>
          <h2 className="text-3xl font-semibold tracking-normal text-white">{business.faqSection.title}</h2>
          <p className="mt-4 text-base leading-7 text-zinc-300">
            {business.faqSection.description}
          </p>
        </div>
        <div className="grid gap-3">
          {business.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-white/10 bg-zinc-950/82 p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-white">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="lead-form" className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <DemoLeadForm key={business.key} business={business} />
          <div className="space-y-4">
            <Card className="border-[#ffb36d]/20 bg-[#ffb36d]/10">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-zinc-950 text-[#ffe1bd]">{business.leadOpsPanel.badge}</Badge>
                <CardTitle>{business.leadOpsPanel.title}</CardTitle>
                <CardDescription className="text-[#fff1f7]/82">
                  {business.leadOpsPanel.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {business.leadOpsPanel.items.map(({ title, description }) => (
                    <div key={title} className="rounded-md border border-white/10 bg-black/28 p-4">
                      <p className="font-medium text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/80">
              <CardHeader>
                <CardTitle>{business.whySignalOpsPanel.title}</CardTitle>
                <CardDescription>
                  {business.whySignalOpsPanel.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-zinc-300">
                {business.whySignalOpsPanel.bullets.map((bullet, index) => {
                  const Icon = index === 0 ? Clock3 : index === 1 ? MessageSquareText : ShieldCheck;
                  const iconClass = index === 0 ? "text-[#ffb36d]" : index === 1 ? "text-emerald-300" : "text-amber-300";
                  return (
                    <p key={bullet} className="flex gap-2">
                      <Icon className={`mt-0.5 size-4 shrink-0 ${iconClass}`} aria-hidden="true" />
                      {bullet}
                    </p>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-semibold text-white">{business.name}</p>
            <p className="mt-1 text-sm text-zinc-500">{business.location} | Fictional SignalOps sales demo</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-zinc-300 sm:items-end">
            <TrackedLink
              href={`tel:${business.phone}`}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: `${business.key}_footer`, type: "phone" }}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <PhoneCall className="size-4" aria-hidden="true" />
              {business.phone}
            </TrackedLink>
            <a href="#quote" className="inline-flex items-center gap-2 hover:text-white">
              {business.footerCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/96 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a href="#quote" className="inline-flex h-11 items-center justify-center rounded-md bg-[#ff6f9c] text-sm font-semibold text-white">
            {business.stickyPrimaryCta}
          </a>
          <a href={business.secondaryHref} className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-800 text-sm font-semibold text-white">
            {business.stickySecondaryCta}
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({
  id,
  eyebrow,
  title,
  description
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge className="mb-4 bg-[#ffb36d]/15 text-[#ffe1bd]">{eyebrow}</Badge>
        <h2 className="text-3xl font-semibold tracking-normal text-white">{title}</h2>
        <p className="mt-4 text-base leading-7 text-zinc-300">{description}</p>
      </div>
    </section>
  );
}

function ValuePoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <p className="font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}
