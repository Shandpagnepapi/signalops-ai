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
  guardrails: "",
  notes: ""
};

const selectClass =
  "h-12 w-full rounded-2xl border border-white/12 bg-[#17122d]/74 px-3 text-sm text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb36d]/55";

const previewOutputs = [
  {
    title: "System Map",
    copy: "What it will handle, what the owner sees, and where leads slow down.",
    icon: FileText
  },
  {
    title: "Build Plan",
    copy: "The intake questions, guardrails, escalation rules, and setup path.",
    icon: ClipboardList
  },
  {
    title: "Next Steps",
    copy: "What to connect first and what should need approval.",
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
      form.guardrails
        ? `AI Lead Manager guardrails, service area, pricing rules, never-promise items, and owner-review triggers: ${form.guardrails}`
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
        throw new Error(payload.errors?.join(" ") || payload.error || "System request could not be created.");
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
      <Card className="border-emerald-300/20 bg-emerald-300/[0.07] shadow-2xl shadow-black/24">
        <CardHeader>
          <Badge className="mb-3 w-fit border border-emerald-300/25 bg-emerald-300/12 text-emerald-100">
            Request received
          </Badge>
          <CardTitle className="text-2xl">Your AI Lead Manager request is in.</CardTitle>
          <CardDescription>
            Dillon and SignalOps will use your answers to shape a practical AI Lead Manager for {submission.businessName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {previewOutputs.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17122d]/52 p-4">
                  <Icon className="mb-3 size-5 text-emerald-200" aria-hidden="true" />
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#ead0df]/68">{item.copy}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="flex gap-2 text-sm font-semibold text-white">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
              What happens next
            </p>
            <p className="mt-2 text-sm leading-6 text-[#ead0df]/76">
              SignalOps maps your lead flow, recommended responsibilities, guardrails, and setup path.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">Status: {submission.status}</Badge>
              <Badge variant="outline">Request ID: {submission.id.slice(0, 8)}</Badge>
              <Badge className="bg-[#ff6f9c]/14 text-[#ffd7e6]">Done-for-you path</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#ffb36d]/22 bg-white/[0.065] shadow-2xl shadow-black/24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">
              AI Lead Manager
            </Badge>
            <CardTitle className="text-2xl">Tell us how your leads work today.</CardTitle>
            <CardDescription>
              SignalOps uses your answers to map what your AI Lead Manager should answer, ask, follow up on, and escalate.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-[#ffb36d]/20 bg-[#ffb36d]/10 px-3 py-2 text-xs font-medium text-[#ffe1bd]">
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
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
            <div className="grid gap-4 sm:grid-cols-[0.42fr_0.58fr]">
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
              <p className="mb-3 text-sm font-medium text-[#f2d9e8]">Main lead sources</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {previewLeadSourceOptions.map((source) => (
                  <label
                    key={source}
                    className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-sm text-[#ead0df]/82 transition hover:border-[#ffb36d]/28 hover:bg-white/[0.055]"
                  >
                    <input
                      type="checkbox"
                      checked={form.mainLeadSources.includes(source)}
                      onChange={() => updateLeadSource(source)}
                      className="size-4 accent-[#ff6f9c]"
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
            <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

          <FormPanel label="Guardrails">
            <Field label="Service area, pricing rules, and owner-review triggers">
              <Textarea
                value={form.guardrails}
                onChange={(event) => updateField("guardrails", event.target.value)}
                placeholder="Example: service cities, price ranges, discounts it should not offer, things it should never promise, and when a person should review."
              />
            </Field>
          </FormPanel>

          {status === "error" ? (
            <div className="flex gap-3 rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {error}
            </div>
          ) : null}

          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4" aria-hidden="true" />
            )}
            Preview My AI Lead Manager
          </Button>

          <p className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-[#ead0df]/62">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            Share the messy reality. SignalOps will shape the AI Lead Manager around how your business actually runs.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function FormPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">{label}</p>
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
    <label className="grid gap-2 text-sm font-medium text-[#f2d9e8]">
      {label}
      {children}
    </label>
  );
}
