"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ClipboardList, FileText, Loader2, Route, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  previewIndustryOptions,
  previewLeadSourceOptions,
  previewProblemOptions,
  type PreviewSubmissionInput,
  type PreviewSubmissionStatus
} from "@/lib/preview-types";

type PreviewSubmissionReceipt = {
  id: string;
  businessName: string;
  industry: PreviewSubmissionInput["industry"];
  status: PreviewSubmissionStatus;
  recommendedPackage: string;
};

type PreviewApiResponse = {
  submission?: PreviewSubmissionReceipt;
  previewUrl?: string;
  message?: string;
  error?: string;
  errors?: string[];
};

type PreviewFormState = {
  contactName: string;
  businessName: string;
  website: string;
  email: string;
  phone: string;
  industry: PreviewSubmissionInput["industry"] | "";
  otherIndustry: string;
  mainServices: string;
  mainLeadSources: PreviewSubmissionInput["mainLeadSources"];
  otherLeadSource: string;
  currentProblem: PreviewSubmissionInput["currentProblem"] | "";
  currentTools: string;
  leadProcess: string;
  serviceArea: string;
  pricingRules: string;
  neverPromise: string;
  approvalTriggers: string;
  guardrails: string;
  notes: string;
};

const initialState: PreviewFormState = {
  contactName: "",
  businessName: "",
  website: "",
  email: "",
  phone: "",
  industry: "",
  otherIndustry: "",
  mainServices: "",
  mainLeadSources: [],
  otherLeadSource: "",
  currentProblem: "",
  currentTools: "",
  leadProcess: "",
  serviceArea: "",
  pricingRules: "",
  neverPromise: "",
  approvalTriggers: "",
  guardrails: "",
  notes: ""
};

const selectClass =
  "h-12 w-full min-w-0 rounded-2xl border border-white/12 bg-[#0B1024]/74 px-3 text-sm text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6F4DFF]/55";

const previewOutputs = [
  {
    title: "Lead Map",
    copy: "Where leads come from, where they slow down, and what Envo should handle.",
    icon: FileText
  },
  {
    title: "Envo Build Plan",
    copy: "What Envo should answer, ask, log, follow up on, and escalate.",
    icon: ClipboardList
  },
  {
    title: "Next Steps",
    copy: "What to connect first and what rules Envo needs before going live.",
    icon: Route
  }
];

function toggleSource(
  current: PreviewSubmissionInput["mainLeadSources"],
  source: PreviewSubmissionInput["mainLeadSources"][number]
) {
  return current.includes(source)
    ? current.filter((item) => item !== source)
    : [...current, source];
}

export function PreviewRequestForm() {
  const [form, setForm] = useState<PreviewFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [submission, setSubmission] = useState<PreviewSubmissionReceipt | null>(null);
  const hasTrackedStart = useRef(false);

  function updateField<Key extends keyof PreviewFormState>(field: Key, value: PreviewFormState[Key]) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateIndustry(value: PreviewSubmissionInput["industry"] | "") {
    setForm((current) => ({
      ...current,
      industry: value,
      otherIndustry: value === "Other local service" ? current.otherIndustry : ""
    }));
  }

  function updateLeadSource(source: PreviewSubmissionInput["mainLeadSources"][number]) {
    setForm((current) => {
      const nextSources = toggleSource(current.mainLeadSources, source);

      return {
        ...current,
        mainLeadSources: nextSources,
        otherLeadSource: nextSources.includes("Other") ? current.otherLeadSource : ""
      };
    });
  }

  function handleStart() {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent(ANALYTICS_EVENTS.previewFormStarted, {
      location: "preview_form"
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const companyWebsite = String(formData.get("companyWebsite") ?? "");
    setStatus("submitting");
    setError("");
    setSubmission(null);
    const notesWithGuardrails = [
      form.notes,
      form.serviceArea ? `Service area: ${form.serviceArea}` : "",
      form.pricingRules ? `Pricing or quote rules: ${form.pricingRules}` : "",
      form.neverPromise ? `Things Envo should never promise: ${form.neverPromise}` : "",
      form.approvalTriggers ? `When Envo should ask for approval: ${form.approvalTriggers}` : "",
      form.guardrails
        ? `Additional Envo guardrails: ${form.guardrails}`
        : ""
    ]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 1400);

    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          industry: form.industry as PreviewSubmissionInput["industry"],
          currentProblem: form.currentProblem as PreviewSubmissionInput["currentProblem"],
          notes: notesWithGuardrails,
          otherIndustry: form.industry === "Other local service" ? form.otherIndustry : "",
          otherLeadSource: form.mainLeadSources.includes("Other") ? form.otherLeadSource : "",
          companyWebsite,
          averageJobValue: 0,
          monthlyLeadVolume: "Not sure"
        })
      });

      const payload = (await response.json()) as PreviewApiResponse;

      if (!response.ok || !payload.submission) {
        throw new Error(payload.errors?.join(" ") || payload.error || "Envo preview request could not be created.");
      }

      trackEvent(ANALYTICS_EVENTS.previewSubmitted, {
        previewId: payload.submission.id,
        industry: payload.submission.industry,
        package: payload.submission.recommendedPackage
      });

      setSubmission(payload.submission);
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  if (status === "success" && submission) {
    return (
      <Card className="glass-panel border-emerald-300/20 bg-emerald-300/[0.07] shadow-2xl shadow-black/24">
        <CardHeader>
          <Badge className="mb-3 w-fit border border-emerald-300/25 bg-emerald-300/12 text-emerald-100">
            Request received
          </Badge>
          <CardTitle className="text-2xl">Your Envo preview request is in.</CardTitle>
          <CardDescription>
            SignalOpsAI will use your answers to map how Envo should handle your lead flow, rules, handoffs, and follow-ups.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {previewOutputs.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#0B1024]/52 p-4">
                  <Icon className="mb-3 size-5 text-emerald-200" aria-hidden="true" />
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#D7E2F7]/68">{item.copy}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="flex gap-2 text-sm font-semibold text-white">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
              What happens next
            </p>
            <p className="mt-2 text-sm leading-6 text-[#D7E2F7]/76">
              SignalOpsAI will use your answers to map how Envo should handle your lead flow, rules, handoffs, and follow-ups.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">Status: {submission.status}</Badge>
              <Badge variant="outline">Request ID: {submission.id.slice(0, 8)}</Badge>
              <Badge className="bg-[#328BFF]/14 text-[#D7E8FF]">Done-for-you path</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-panel border-[#6F4DFF]/22 bg-white/[0.065] shadow-2xl shadow-black/24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 border border-[#6F4DFF]/25 bg-[#6F4DFF]/12 text-[#EAF1FF]">
              Envo Preview
            </Badge>
            <CardTitle className="text-2xl">Tell us how Envo should handle your leads.</CardTitle>
            <CardDescription>
              SignalOpsAI uses your answers to map how Envo would work inside your business.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-[#6F4DFF]/20 bg-[#6F4DFF]/10 px-3 py-2 text-xs font-medium text-[#EAF1FF]">
            Done for you
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onFocus={handleStart} onSubmit={handleSubmit}>
          <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="companyWebsite">Company website</label>
            <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
          </div>

          <FormPanel label="Contact">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="Name">
                <Input
                  required
                  value={form.contactName}
                  onChange={(event) => updateField("contactName", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </Field>
              <Field label="Business name">
                <Input
                  required
                  value={form.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  placeholder="Your business name"
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
              <Field label="Website">
                <Input
                  value={form.website}
                  onChange={(event) => updateField("website", event.target.value)}
                  placeholder="https://yourbusiness.com"
                />
              </Field>
              <Field label="Email">
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@business.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone">
                <Input
                  required
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Best phone number"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </FormPanel>

          <FormPanel label="Lead flow">
            <div className="grid gap-3 sm:grid-cols-[0.42fr_0.58fr] sm:gap-4">
              <Field label="Industry">
                <select
                  required
                  value={form.industry}
                  onChange={(event) => updateIndustry(event.target.value as PreviewSubmissionInput["industry"] | "")}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select your industry
                  </option>
                  {previewIndustryOptions.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </Field>
              {form.industry === "Other local service" ? (
                <Field label="Other industry">
                  <Input
                    value={form.otherIndustry}
                    onChange={(event) => updateField("otherIndustry", event.target.value)}
                    placeholder="Tell us your industry"
                  />
                </Field>
              ) : null}
              <Field label="Main services">
                <Input
                  required
                  value={form.mainServices}
                  onChange={(event) => updateField("mainServices", event.target.value)}
                  placeholder="Repairs, estimates, installs, consultations..."
                />
              </Field>
            </div>

            <div className="mt-4">
              <p className="mb-3 text-sm font-medium text-[#EAF1FF]">Main lead sources</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {previewLeadSourceOptions.map((source) => (
                  <label
                    key={source}
                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-sm text-[#D7E2F7]/82 transition hover:border-[#6F4DFF]/28 hover:bg-white/[0.055]"
                  >
                    <input
                      type="checkbox"
                      checked={form.mainLeadSources.includes(source)}
                      onChange={() => updateLeadSource(source)}
                      className="size-4 accent-[#328BFF]"
                    />
                    {source}
                  </label>
                ))}
              </div>
              {form.mainLeadSources.includes("Other") ? (
                <div className="mt-4">
                  <Field label="Other lead source">
                    <Input
                      value={form.otherLeadSource}
                      onChange={(event) => updateField("otherLeadSource", event.target.value)}
                      placeholder="Example: referrals, vendor portal, radio ads, trade show leads..."
                    />
                  </Field>
                </div>
              ) : null}
            </div>
          </FormPanel>

          <FormPanel label="Bottleneck">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="Biggest lead bottleneck">
                <select
                  required
                  value={form.currentProblem}
                  onChange={(event) => updateField("currentProblem", event.target.value as PreviewSubmissionInput["currentProblem"] | "")}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select the biggest bottleneck
                  </option>
                  {previewProblemOptions.map((problem) => (
                    <option key={problem} value={problem}>
                      {problem}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Current tools/CRM optional">
                <Input
                  value={form.currentTools}
                  onChange={(event) => updateField("currentTools", event.target.value)}
                  placeholder="Jobber, Housecall Pro, HubSpot, spreadsheet..."
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="What happens after a lead comes in?">
                <Textarea
                  required
                  value={form.leadProcess}
                  onChange={(event) => updateField("leadProcess", event.target.value)}
                  placeholder="Who responds, what gets asked, where it gets tracked, and what usually slows down?"
                />
              </Field>
              <Field label="Anything else we should know?">
                <Textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Routing rules, fleet details, service area, calendar needs, team handoff, special cases..."
                />
              </Field>
            </div>
          </FormPanel>

          <FormPanel label="Envo guardrails">
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="Service area">
                <Input
                  value={form.serviceArea}
                  onChange={(event) => updateField("serviceArea", event.target.value)}
                  placeholder="Cities, radius, routes, or locations you serve"
                />
              </Field>
              <Field label="Pricing or quote rules">
                <Input
                  value={form.pricingRules}
                  onChange={(event) => updateField("pricingRules", event.target.value)}
                  placeholder="Example: starting prices, price ranges, quote rules..."
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="Things Envo should never promise">
                <Textarea
                  value={form.neverPromise}
                  onChange={(event) => updateField("neverPromise", event.target.value)}
                  placeholder="Example: exact pricing, same-day service, compliance claims, discounts..."
                />
              </Field>
              <Field label="When Envo should ask for approval">
                <Textarea
                  value={form.approvalTriggers}
                  onChange={(event) => updateField("approvalTriggers", event.target.value)}
                  placeholder="Example: urgent issues, unclear requests, high-value accounts, special pricing..."
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Other guardrails or handoff rules">
                <Textarea
                  value={form.guardrails}
                  onChange={(event) => updateField("guardrails", event.target.value)}
                  placeholder="Anything else Envo should know before answering or handing off leads."
                />
              </Field>
            </div>
          </FormPanel>

          {status === "error" ? (
            <div className="flex gap-3 rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          ) : null}

          <Button className="shadow-[0_18px_55px_rgba(50,139,255,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(50,139,255,0.3)]" type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4" aria-hidden="true" />
            )}
            Preview Envo
          </Button>

          <p className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-[#D7E2F7]/62">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            Share the messy reality. SignalOpsAI will shape Envo around how your business actually runs.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function FormPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="glass-card rounded-2xl border border-white/10 bg-[#0B1024]/42 p-3.5 sm:p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6F4DFF]">{label}</p>
      {children}
    </div>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-medium text-[#EAF1FF]">
      {label}
      {children}
    </label>
  );
}
