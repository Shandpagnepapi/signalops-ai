"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Clipboard,
  Copy,
  FileText,
  Loader2,
  MessageSquareReply,
  RefreshCw,
  Route,
  Save,
  Sparkles
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { industryIds, preferredTones, type IndustryId, type PreferredTone } from "@/lib/demo-templates";
import type { GeneratedLiveDemo } from "@/lib/demo-generator";
import { cn } from "@/lib/utils";

type LiveDemoFormState = {
  businessName: string;
  industry: IndustryId;
  cityState: string;
  servicesOffered: string;
  mainLeadProblem: string;
  currentLeadHandling: string;
  averageCustomerValue: string;
  preferredTone: PreferredTone;
  websiteUrl: string;
};

type LiveDemoResponse = {
  demo?: GeneratedLiveDemo;
  error?: string;
  errors?: string[];
};

const industryLabels: Record<IndustryId, string> = {
  roofing: "Roofing",
  hvac: "HVAC",
  plumbing: "Plumbing",
  electrical: "Electrical",
  "med-spa": "Med spa",
  dental: "Dental",
  "law-firm": "Law firm",
  "insurance-agency": "Insurance agency",
  "real-estate-team": "Real estate team",
  "auto-shop": "Auto shop",
  "general-local-service": "General local service"
};

const toneLabels: Record<PreferredTone, string> = {
  professional: "Professional",
  friendly: "Friendly",
  luxury: "Luxury",
  urgent: "Urgent",
  local: "Local"
};

const initialForm: LiveDemoFormState = {
  businessName: "Northline Auto Care",
  industry: "auto-shop",
  cityState: "Dallas, TX",
  servicesOffered: "Diagnostics, brake repair, maintenance, performance upgrades",
  mainLeadProblem: "We miss calls during busy shop hours and quote requests do not always get followed up.",
  currentLeadHandling: "Phone calls, website form notifications, Google Business Profile messages, and manual callbacks.",
  averageCustomerValue: "950",
  preferredTone: "professional",
  websiteUrl: ""
};

const selectClass =
  "h-11 w-full min-w-0 rounded-md border border-input bg-slate-950/70 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function LiveDemoGenerator() {
  const [form, setForm] = useState<LiveDemoFormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [demo, setDemo] = useState<GeneratedLiveDemo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");

  function updateField<Key extends keyof LiveDemoFormState>(field: Key, value: LiveDemoFormState[Key]) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    setCopyStatus("idle");
    setSaveMessage("");

    try {
      const response = await fetch("/api/live-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          averageCustomerValue: Number(form.averageCustomerValue) || 0
        })
      });

      const payload = (await response.json()) as LiveDemoResponse;

      if (!response.ok || !payload.demo) {
        throw new Error(payload.errors?.join(" ") || payload.error || "The live demo could not be generated.");
      }

      setDemo(payload.demo);
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  async function copyDemo() {
    if (!demo) {
      return;
    }

    try {
      await navigator.clipboard.writeText(demo.copyText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  function resetDemo() {
    setDemo(null);
    setStatus("idle");
    setError(null);
    setCopyStatus("idle");
    setSaveMessage("");
  }

  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="surface-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,124,255,0.16),rgba(6,12,24,0)_64%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="mb-5 border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              Template-backed live demo generator
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              Build a tailored LeadOps demo while the prospect is watching.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Enter a business name, industry, services, and lead problem. LeadOps uses stored industry templates,
              then enhances the output server-side when an OpenAI key is configured.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {[
                "No website scrape required",
                "Works without an API key",
                "Built for live sales calls"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Card className="border-blue-300/20 bg-slate-950/82">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge className="mb-3 bg-blue-500/14 text-blue-100">Prospect inputs</Badge>
                  <CardTitle className="text-2xl">Generate a mini strategy demo</CardTitle>
                  <CardDescription>
                    Keep it quick. The goal is a credible example, not a full implementation plan.
                  </CardDescription>
                </div>
                <Badge variant={status === "success" ? "success" : "outline"}>
                  {demo?.generatedBy === "ai-enhanced" ? "AI-enhanced" : "Template-ready"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business name">
                    <Input
                      required
                      value={form.businessName}
                      onChange={(event) => updateField("businessName", event.target.value)}
                      placeholder="Example: Apex Wheel Repair"
                    />
                  </Field>
                  <Field label="Industry">
                    <select
                      value={form.industry}
                      onChange={(event) => updateField("industry", event.target.value as IndustryId)}
                      className={selectClass}
                    >
                      {industryIds.map((industry) => (
                        <option key={industry} value={industry}>
                          {industryLabels[industry]}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_0.72fr]">
                  <Field label="City/state">
                    <Input
                      required
                      value={form.cityState}
                      onChange={(event) => updateField("cityState", event.target.value)}
                      placeholder="Dallas, TX"
                    />
                  </Field>
                  <Field label="Average customer value">
                    <Input
                      required
                      type="number"
                      min="0"
                      value={form.averageCustomerValue}
                      onChange={(event) => updateField("averageCustomerValue", event.target.value)}
                      placeholder="1200"
                    />
                  </Field>
                </div>

                <Field label="Services offered">
                  <Textarea
                    required
                    value={form.servicesOffered}
                    onChange={(event) => updateField("servicesOffered", event.target.value)}
                    placeholder="Curb rash repair, bent wheel inspection, refinishing, mobile repair"
                  />
                </Field>

                <Field label="Main lead problem">
                  <Textarea
                    required
                    value={form.mainLeadProblem}
                    onChange={(event) => updateField("mainLeadProblem", event.target.value)}
                    placeholder="Slow response, missed calls, no photo follow-up, low-quality quote requests..."
                  />
                </Field>

                <Field label="Current lead handling method">
                  <Textarea
                    required
                    value={form.currentLeadHandling}
                    onChange={(event) => updateField("currentLeadHandling", event.target.value)}
                    placeholder="Website form, missed calls, ads, spreadsheet, inbox, CRM, manual callbacks..."
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Preferred tone">
                    <select
                      value={form.preferredTone}
                      onChange={(event) => updateField("preferredTone", event.target.value as PreferredTone)}
                      className={selectClass}
                    >
                      {preferredTones.map((tone) => (
                        <option key={tone} value={tone}>
                          {toneLabels[tone]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Website URL optional">
                    <Input
                      value={form.websiteUrl}
                      onChange={(event) => updateField("websiteUrl", event.target.value)}
                      placeholder="https://example.com"
                    />
                  </Field>
                </div>

                <p className="rounded-md border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-slate-400">
                  Website URL is stored as context only for now. This generator does not scrape or inspect websites yet.
                </p>

                <Button type="submit" size="lg" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Sparkles className="size-4" aria-hidden="true" />
                  )}
                  Generate tailored demo
                </Button>
              </form>

              {status === "error" ? (
                <div className="mt-5 rounded-lg border border-red-300/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
                  {error}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>

      {status === "loading" ? <LoadingPreview /> : null}

      {demo ? (
        <GeneratedDemoPreview
          demo={demo}
          copyStatus={copyStatus}
          saveMessage={saveMessage}
          onCopy={copyDemo}
          onReset={resetDemo}
          onSave={() => setSaveMessage("Save Demo is ready for future database storage.")}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function LoadingPreview() {
  const steps = [
    "Selecting the right industry template",
    "Customizing intake questions and replies",
    "Building scoring, routing, and follow-up examples",
    "Assembling a sales-call-ready strategy preview"
  ];

  return (
    <section className="border-b border-white/10 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border-cyan-300/20 bg-cyan-400/10">
          <CardContent className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-cyan-100">
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Building the tailored demo
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The system starts with stored templates so the output stays fast and reliable.
                </p>
              </div>
              <Badge variant="outline" className="border-cyan-300/25 text-cyan-100">
                Usually a few seconds
              </Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step} className="rounded-md border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm leading-6 text-slate-200">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      {[
        ["Before", "Prospect says leads are slow, scattered, or hard to qualify."],
        ["During", "You enter their details and generate a tailored strategy example live."],
        ["After", "They can see the exact response, routing, follow-up, and dashboard logic LeadOps would install."]
      ].map(([title, body]) => (
        <Card key={title} className="bg-slate-950/72">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{body}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </section>
  );
}

function GeneratedDemoPreview({
  demo,
  copyStatus,
  saveMessage,
  onCopy,
  onReset,
  onSave
}: {
  demo: GeneratedLiveDemo;
  copyStatus: "idle" | "copied" | "error";
  saveMessage: string;
  onCopy: () => void;
  onReset: () => void;
  onSave: () => void;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge className="mb-4 bg-blue-500/14 text-blue-100">
            {demo.generatedBy === "ai-enhanced" ? "AI-enhanced strategy" : "Template fallback strategy"}
          </Badge>
          <h2 className="max-w-4xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            {demo.installTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">{demo.strategySummary}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={onCopy}>
            <Copy className="size-4" aria-hidden="true" />
            {copyStatus === "copied" ? "Copied" : "Copy strategy"}
          </Button>
          <Button type="button" variant="secondary" onClick={onSave}>
            <Save className="size-4" aria-hidden="true" />
            Save Demo
          </Button>
          <Button type="button" variant="ghost" onClick={onReset}>
            <RefreshCw className="size-4" aria-hidden="true" />
            Generate Another Demo
          </Button>
        </div>
      </div>

      {copyStatus === "error" ? (
        <p className="mb-5 rounded-md border border-amber-300/20 bg-amber-400/10 p-3 text-sm text-amber-100">
          Copy failed in this browser. You can still select the generated strategy text manually.
        </p>
      ) : null}

      {saveMessage ? (
        <p className="mb-5 rounded-md border border-blue-300/20 bg-blue-500/10 p-3 text-sm text-blue-100">
          {saveMessage}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.78fr]">
        <Card className="border-blue-300/20 bg-blue-500/10">
          <CardHeader>
            <Badge className="mb-3 bg-slate-950 text-blue-100">Generated positioning</Badge>
            <CardTitle className="text-3xl leading-tight">{demo.headline}</CardTitle>
            <CardDescription className="text-base leading-7">{demo.subheadline}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Industry" value={demo.industryLabel} />
              <Metric label="Market" value={demo.cityState} />
              <Metric label="Mode" value={demo.generatedBy === "ai-enhanced" ? "Enhanced" : "Template"} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested package</CardTitle>
            <CardDescription>Based on lead complexity, customer value, and likely automation scope.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-white">{demo.suggestedPackage.name}</p>
            <p className="mt-1 text-sm font-medium text-blue-100">{demo.suggestedPackage.price}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">{demo.suggestedPackage.reason}</p>
            <TrackedLink
              href="/audit"
              eventName={ANALYTICS_EVENTS.auditCtaClicked}
              eventProperties={{ location: "live_demo_setup_call", businessName: demo.businessName }}
              className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
            >
              Book Free Setup Call
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard icon={Route} title="Before / after framing">
          <div className="grid gap-3">
            {demo.beforeAfter.map((item) => (
              <div key={`${item.before}-${item.after}`} className="grid gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-amber-100/70">Before</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.before}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-100/70">After LeadOps</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Clipboard} title="Suggested lead intake questions">
          <ul className="grid gap-2">
            {demo.leadIntakeQuestions.map((question) => (
              <li key={question} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-200">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                {question}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard icon={MessageSquareReply} title="Instant reply message">
          <MessageBlock>{demo.instantReplyMessage}</MessageBlock>
        </SectionCard>

        <SectionCard icon={FileText} title="Internal sales note">
          <MessageBlock>{demo.internalSalesNote}</MessageBlock>
        </SectionCard>

        <SectionCard icon={BarChart3} title="Lead scoring logic example">
          <div className="grid gap-3">
            {demo.leadScoringLogic.map((rule) => (
              <div key={`${rule.label}-${rule.impact}`} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium text-white">{rule.label}</p>
                  <Badge variant="outline">{rule.impact}</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{rule.rule}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={RefreshCw} title="Follow-up sequence example">
          <div className="grid gap-3">
            {demo.followUpSequence.map((step) => (
              <div key={`${step.timing}-${step.goal}`} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm font-semibold text-white">{step.timing}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{step.message}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">Goal: {step.goal}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <SectionCard icon={BadgeCheck} title="Recommended automations">
          <div className="flex flex-wrap gap-2">
            {demo.recommendedAutomations.map((automation) => (
              <Badge key={automation} variant="outline" className="border-white/15 bg-white/5 text-slate-200">
                {automation}
              </Badge>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={BarChart3} title="Dashboard preview cards">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {demo.dashboardPreviewCards.map((card) => (
              <div key={`${card.label}-${card.value}`} className="rounded-md border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
                <p className="mt-2 text-sm leading-5 text-slate-400">{card.note}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-200">
      {label}
      {children}
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/60 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  children
}: {
  icon: typeof Sparkles;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-blue-500/15 text-blue-200">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function MessageBlock({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-100">
      {children}
    </div>
  );
}
