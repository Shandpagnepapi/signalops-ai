"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  previewIndustryOptions,
  previewLeadSourceOptions,
  previewLeadVolumeOptions,
  previewProblemOptions,
  type PreviewSubmission,
  type PreviewSubmissionInput
} from "@/lib/preview-types";

type PreviewApiResponse = {
  submission?: PreviewSubmission;
  previewUrl?: string;
  error?: string;
  errors?: string[];
};

type PreviewFormState = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: PreviewSubmissionInput["industry"];
  mainLeadSources: PreviewSubmissionInput["mainLeadSources"];
  currentProblem: PreviewSubmissionInput["currentProblem"];
  averageJobValue: string;
  monthlyLeadVolume: PreviewSubmissionInput["monthlyLeadVolume"];
  notes: string;
};

const initialState: PreviewFormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  industry: "Auto repair",
  mainLeadSources: ["Website form", "Phone calls"],
  currentProblem: "Slow replies",
  averageJobValue: "",
  monthlyLeadVolume: "21-75",
  notes: ""
};

const selectClass =
  "h-11 w-full rounded-xl border border-white/12 bg-[#17122d]/74 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function toggleSource(
  current: PreviewSubmissionInput["mainLeadSources"],
  source: PreviewSubmissionInput["mainLeadSources"][number]
) {
  return current.includes(source)
    ? current.filter((item) => item !== source)
    : [...current, source];
}

export function PreviewRequestForm() {
  const router = useRouter();
  const [form, setForm] = useState<PreviewFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
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
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          averageJobValue: Number(form.averageJobValue) || 0
        })
      });

      const payload = (await response.json()) as PreviewApiResponse;

      if (!response.ok || !payload.submission || !payload.previewUrl) {
        throw new Error(payload.errors?.join(" ") || payload.error || "Preview could not be generated.");
      }

      try {
        sessionStorage.setItem(
          `signalops-preview-${payload.submission.id}`,
          JSON.stringify(payload.submission)
        );
      } catch {
        // Session storage is a convenience fallback for mock mode. The server result is still returned.
      }

      trackEvent(ANALYTICS_EVENTS.previewSubmitted, {
        previewId: payload.submission.id,
        industry: payload.submission.industry,
        package: payload.submission.previewData.recommendedPackage.name
      });

      router.push(payload.previewUrl);
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  return (
    <Card className="border-[#ffb36d]/22 bg-white/[0.065] shadow-2xl shadow-black/24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">
              Free Instant AI Lead System Preview
            </Badge>
            <CardTitle className="text-2xl">Tell us how leads come in.</CardTitle>
            <CardDescription>
              We will generate a personalized mockup of the AI receptionist, dashboard, follow-up flow, and handoff system.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 px-3 py-2 text-xs font-medium text-[#ffd7e6]">
            No generic audit
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onFocus={handleStart} onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Business</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name">
                <Input
                  required
                  value={form.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  placeholder="Apex Wheel Repair"
                />
              </Field>
              <Field label="Contact name">
                <Input
                  required
                  value={form.contactName}
                  onChange={(event) => updateField("contactName", event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
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
              <Field label="Phone optional">
                <Input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="(555) 555-0123"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Website optional">
                <Input
                  value={form.website}
                  onChange={(event) => updateField("website", event.target.value)}
                  placeholder="https://example.com"
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Lead flow</p>
            <div className="grid gap-4 sm:grid-cols-3">
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
              <Field label="Current problem">
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
              <Field label="Monthly lead volume">
                <select
                  value={form.monthlyLeadVolume}
                  onChange={(event) => updateField("monthlyLeadVolume", event.target.value as PreviewSubmissionInput["monthlyLeadVolume"])}
                  className={selectClass}
                >
                  {previewLeadVolumeOptions.map((volume) => (
                    <option key={volume} value={volume}>
                      {volume}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <p className="mb-3 text-sm font-medium text-[#f2d9e8]">Where do leads come from?</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {previewLeadSourceOptions.map((source) => (
                  <label
                    key={source}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-sm text-[#ead0df]/82 transition hover:border-[#ffb36d]/28 hover:bg-white/[0.055]"
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
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <div className="grid gap-4 sm:grid-cols-[0.55fr_1fr]">
              <Field label="Average job value optional">
                <Input
                  type="number"
                  min="0"
                  value={form.averageJobValue}
                  onChange={(event) => updateField("averageJobValue", event.target.value)}
                  placeholder="500"
                />
              </Field>
              <Field label="Notes">
                <Textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Anything important: services, routing rules, team size, approval requirements, CRM, booking process..."
                />
              </Field>
            </div>
          </div>

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
              <Sparkles className="size-4" aria-hidden="true" />
            )}
            Get My Free Preview
          </Button>

          <p className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-[#ead0df]/62">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            SignalOps drafts the preview and build plan first. Customer-facing messages still require owner approval before sending.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#f2d9e8]">
      {label}
      {children}
    </label>
  );
}
