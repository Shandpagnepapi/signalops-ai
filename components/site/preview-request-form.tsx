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
  industry: PreviewSubmissionInput["industry"];
  mainServices: string;
  mainLeadSources: PreviewSubmissionInput["mainLeadSources"];
  currentProblem: PreviewSubmissionInput["currentProblem"];
  currentTools: string;
  leadProcess: string;
  notes: string;
};

const initialState: PreviewFormState = {
  contactName: "",
  businessName: "",
  website: "",
  email: "",
  phone: "",
  industry: "Auto repair",
  mainServices: "",
  mainLeadSources: ["Website form", "Phone calls"],
  currentProblem: "Slow replies",
  currentTools: "",
  leadProcess: "",
  notes: ""
};

const selectClass =
  "h-11 w-full rounded-xl border border-white/12 bg-[#17122d]/74 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const previewOutputs = [
  {
    title: "System Map",
    copy: "Lead sources, slow spots, handoff points, and follow-up gaps.",
    icon: FileText
  },
  {
    title: "Build Plan",
    copy: "The Lead OS, package fit, build scope, and setup path.",
    icon: ClipboardList
  },
  {
    title: "Next Steps",
    copy: "What to connect, what to automate, and what should happen first.",
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

    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          companyWebsite,
          averageJobValue: 0,
          monthlyLeadVolume: "Not sure"
        })
      });

      const payload = (await response.json()) as PreviewApiResponse;

      if (!response.ok || !payload.submission) {
        throw new Error(payload.errors?.join(" ") || payload.error || "Free Preview request could not be created.");
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
          <CardTitle className="text-2xl">Your system request is in.</CardTitle>
          <CardDescription>
            Dillon and SignalOps will use your answers to shape a practical lead operating system for {submission.businessName}.
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
              SignalOps maps your lead flow, recommends the right system level, and gives you a clear setup path.
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
              Lead OS
            </Badge>
            <CardTitle className="text-2xl">Tell us how your leads work today.</CardTitle>
            <CardDescription>
              SignalOps uses your answers to map the operating system that fits your calls, forms, DMs, quotes, and appointments.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-100">
            Done for you
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 hidden gap-3 md:grid md:grid-cols-3">
          {previewOutputs.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
                <Icon className="mb-3 size-5 text-[#ffb36d]" aria-hidden="true" />
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-[#ead0df]/62">{item.copy}</p>
              </div>
            );
          })}
        </div>

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
                  placeholder="Apex Wheel Repair"
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field label="Website">
                <Input
                  value={form.website}
                  onChange={(event) => updateField("website", event.target.value)}
                  placeholder="https://example.com"
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
                  placeholder="(555) 555-0123"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </FormPanel>

          <FormPanel label="Lead flow">
            <div className="grid gap-4 sm:grid-cols-[0.42fr_0.58fr]">
              <Field label="Industry">
                <select
                  value={form.industry}
                  onChange={(event) => updateField("industry", event.target.value as PreviewSubmissionInput["industry"])}
                  className={selectClass}
                >
                  {previewIndustryOptions.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </Field>
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
                      onChange={() => updateField("mainLeadSources", toggleSource(form.mainLeadSources, source))}
                      className="size-4 accent-[#ff6f9c]"
                    />
                    {source}
                  </label>
                ))}
              </div>
            </div>
          </FormPanel>

          <FormPanel label="Bottleneck">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Biggest lead bottleneck">
                <select
                  value={form.currentProblem}
                  onChange={(event) => updateField("currentProblem", event.target.value as PreviewSubmissionInput["currentProblem"])}
                  className={selectClass}
                >
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
                  placeholder="Routing rules, photo requests, service area, calendar needs, team handoff, special cases..."
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

          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4" aria-hidden="true" />
            )}
            Show Me My OS
          </Button>

          <p className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-[#ead0df]/62">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            Share the messy reality. SignalOps will shape the system around how your business actually runs.
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
