"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type {
  PreviewLeadSource,
  PreviewProblem,
  PreviewSubmissionInput,
  PreviewSubmissionStatus
} from "@/lib/preview-types";
import { cn } from "@/lib/utils";

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

type SimpleIndustry = "Home Services" | "Auto Shops" | "Med Spas" | "Other";

type SimpleLeadSource =
  | "Website Form"
  | "Phone Calls"
  | "Text Messages"
  | "Google Profile"
  | "Facebook"
  | "Instagram";

type SimpleBottleneck =
  | "Responding fast enough"
  | "Tracking where they came from"
  | "Asking the right qualifying questions"
  | "Handling after-hours inquiries";

type PreviewFormState = {
  contactName: string;
  businessName: string;
  website: string;
  email: string;
  industry: SimpleIndustry | "";
  mainLeadSources: SimpleLeadSource[];
  currentProblem: SimpleBottleneck | "";
  serviceArea: string;
  pricingRules: string;
  neverPromise: string;
  currentTools: string;
};

const initialState: PreviewFormState = {
  contactName: "",
  businessName: "",
  website: "",
  email: "",
  industry: "",
  mainLeadSources: [],
  currentProblem: "",
  serviceArea: "",
  pricingRules: "",
  neverPromise: "",
  currentTools: ""
};

const industryOptions: SimpleIndustry[] = ["Home Services", "Auto Shops", "Med Spas", "Other"];

const leadSourceOptions: SimpleLeadSource[] = [
  "Website Form",
  "Phone Calls",
  "Text Messages",
  "Google Profile",
  "Facebook",
  "Instagram"
];

const bottleneckOptions: SimpleBottleneck[] = [
  "Responding fast enough",
  "Tracking where they came from",
  "Asking the right qualifying questions",
  "Handling after-hours inquiries"
];

const industryMap: Record<SimpleIndustry, PreviewSubmissionInput["industry"]> = {
  "Home Services": "Other local service",
  "Auto Shops": "Auto repair",
  "Med Spas": "Med spa",
  Other: "Other local service"
};

const leadSourceMap: Record<SimpleLeadSource, PreviewLeadSource> = {
  "Website Form": "Website form",
  "Phone Calls": "Phone calls",
  "Text Messages": "Text messages",
  "Google Profile": "Google Business Profile",
  Facebook: "Facebook",
  Instagram: "Instagram"
};

const bottleneckMap: Record<SimpleBottleneck, PreviewProblem> = {
  "Responding fast enough": "Slow replies",
  "Tracking where they came from": "No visibility into lead status",
  "Asking the right qualifying questions": "Bad lead quality",
  "Handling after-hours inquiries": "Missed calls"
};

const generatedServices: Record<SimpleIndustry, string> = {
  "Home Services": "Services to be confirmed from submitted business context.",
  "Auto Shops": "Auto service requests to be confirmed from submitted business context.",
  "Med Spas": "Med spa service requests to be confirmed from submitted business context.",
  Other: "Services to be confirmed from submitted business context."
};

const inputClass =
  "min-h-12 w-full min-w-0 rounded-2xl border border-white/12 bg-[#071126]/72 px-4 py-3 text-sm text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-zinc-500 focus:border-[#328BFF]/65 focus:ring-2 focus:ring-[#328BFF]/28";

const selectClass =
  "min-h-12 w-full min-w-0 appearance-none rounded-2xl border border-white/12 bg-[#071126]/72 px-4 py-3 text-sm text-white shadow-inner shadow-black/10 outline-none transition focus:border-[#328BFF]/65 focus:ring-2 focus:ring-[#328BFF]/28";

const textareaClass =
  "min-h-24 w-full min-w-0 resize-y rounded-2xl border border-white/12 bg-[#071126]/72 px-4 py-3 text-sm leading-6 text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-zinc-500 focus:border-[#328BFF]/65 focus:ring-2 focus:ring-[#328BFF]/28";

function toggleSource(current: SimpleLeadSource[], source: SimpleLeadSource) {
  return current.includes(source)
    ? current.filter((item) => item !== source)
    : [...current, source];
}

function createLeadProcess(form: PreviewFormState) {
  const sources = form.mainLeadSources.length > 0 ? form.mainLeadSources.join(", ") : "None selected";
  const bottleneck = form.currentProblem || "Not selected";

  return `Lead sources selected: ${sources}. Biggest bottleneck: ${bottleneck}.`;
}

function createNotes(form: PreviewFormState) {
  return [
    form.industry ? `Selected industry: ${form.industry}` : "",
    form.serviceArea ? `Service area: ${form.serviceArea}` : "",
    form.pricingRules ? `Pricing or quote rules: ${form.pricingRules}` : "",
    form.neverPromise ? `Things Envo should never promise: ${form.neverPromise}` : "",
    form.currentTools ? `Current tools / CRM: ${form.currentTools}` : ""
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 1400);
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

  function updateLeadSource(source: SimpleLeadSource) {
    setForm((current) => ({
      ...current,
      mainLeadSources: toggleSource(current.mainLeadSources, source)
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

    if (form.mainLeadSources.length === 0) {
      setStatus("error");
      setError("Choose at least one lead source.");
      return;
    }

    if (!form.industry || !form.currentProblem) {
      setStatus("error");
      setError("Choose an industry and your biggest lead bottleneck.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const companyWebsite = String(formData.get("companyWebsite") ?? "");
    const apiIndustry = industryMap[form.industry];
    const apiLeadSources = form.mainLeadSources.map((source) => leadSourceMap[source]);
    const apiProblem = bottleneckMap[form.currentProblem];

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
          businessName: form.businessName,
          contactName: form.contactName,
          email: form.email,
          phone: "",
          website: form.website,
          industry: apiIndustry,
          otherIndustry:
            apiIndustry === "Other local service" && form.industry !== "Other"
              ? form.industry
              : "",
          mainServices: generatedServices[form.industry],
          mainLeadSources: apiLeadSources,
          otherLeadSource: "",
          currentProblem: apiProblem,
          currentTools: form.currentTools,
          leadProcess: createLeadProcess(form),
          notes: createNotes(form),
          companyWebsite,
          averageJobValue: 0,
          monthlyLeadVolume: "Not sure"
        } satisfies PreviewSubmissionInput & { companyWebsite: string })
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
      <div className="relative overflow-hidden rounded-[2rem] border border-[#34C759]/25 bg-[#0B1024]/76 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(52,199,89,0.2),transparent_32%),radial-gradient(circle_at_90%_12%,rgba(50,139,255,0.16),transparent_32%)]" />
        <div className="relative">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl border border-[#34C759]/25 bg-[#34C759]/12 text-[#BDF5CA]">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Your business context is in.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
            SignalOpsAI will use your answers to map how Envo should answer, organize, follow up, and hand off leads for {submission.businessName}.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ReceiptItem label="Status" value={submission.status} />
            <ReceiptItem label="Request ID" value={submission.id.slice(0, 8)} />
            <ReceiptItem label="Path" value={submission.recommendedPackage} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-6" onFocus={handleStart} onSubmit={handleSubmit}>
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <input
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          aria-label="Company website"
        />
      </div>

      <FormSection
        accent="blue"
        number="1"
        title="Company Details"
        subtext="Let's start with the basics of who you are."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="contactName" label="Your Name">
            <input
              id="contactName"
              required
              value={form.contactName}
              onChange={(event) => updateField("contactName", event.target.value)}
              placeholder="John Doe"
              autoComplete="name"
              className={inputClass}
            />
          </Field>
          <Field id="businessName" label="Business Name">
            <input
              id="businessName"
              required
              value={form.businessName}
              onChange={(event) => updateField("businessName", event.target.value)}
              placeholder="Acme Corp"
              autoComplete="organization"
              className={inputClass}
            />
          </Field>
          <Field id="website" label="Website URL">
            <input
              id="website"
              type="url"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
              placeholder="https://yourbusiness.com"
              autoComplete="url"
              className={inputClass}
            />
          </Field>
          <Field id="email" label="Email">
            <input
              id="email"
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@business.com"
              autoComplete="email"
              className={inputClass}
            />
          </Field>
          <Field id="industry" label="Industry">
            <select
              id="industry"
              required
              value={form.industry}
              onChange={(event) => updateField("industry", event.target.value as PreviewFormState["industry"])}
              className={selectClass}
            >
              <option value="" disabled>
                Select your industry
              </option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </FormSection>

      <FormSection
        accent="purple"
        number="2"
        title="Current Lead Flow"
        subtext="Where do your customers currently reach out from?"
      >
        <fieldset>
          <legend className="mb-4 text-sm font-medium text-zinc-200">Select all main lead sources</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {leadSourceOptions.map((source) => {
              const checked = form.mainLeadSources.includes(source);

              return (
                <label key={source} className="relative block">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => updateLeadSource(source)}
                    className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                  />
                  <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border border-white/12 bg-[#071126]/68 px-4 py-3 text-center text-sm font-semibold text-zinc-300 transition hover:border-[#6F4DFF]/45 hover:bg-white/[0.06] peer-checked:border-[#6F4DFF]/70 peer-checked:bg-[#6F4DFF]/18 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#328BFF]/55">
                    {source}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <Field id="currentProblem" label="What is your biggest lead bottleneck right now?">
            <select
              id="currentProblem"
              required
              value={form.currentProblem}
              onChange={(event) => updateField("currentProblem", event.target.value as PreviewFormState["currentProblem"])}
              className={selectClass}
            >
              <option value="" disabled>
                Select the biggest bottleneck
              </option>
              {bottleneckOptions.map((bottleneck) => (
                <option key={bottleneck} value={bottleneck}>
                  {bottleneck}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </FormSection>

      <FormSection
        accent="green"
        number="3"
        title="Operations & Guardrails"
        subtext="How should Envo behave when interacting with your clients?"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field id="serviceArea" label="Service Area">
            <input
              id="serviceArea"
              value={form.serviceArea}
              onChange={(event) => updateField("serviceArea", event.target.value)}
              placeholder="Cities, radius, or locations"
              className={inputClass}
            />
          </Field>
          <Field id="pricingRules" label="Pricing or Quote Rules">
            <input
              id="pricingRules"
              value={form.pricingRules}
              onChange={(event) => updateField("pricingRules", event.target.value)}
              placeholder="Starting prices, ranges, constraints"
              className={inputClass}
            />
          </Field>
          <div className="md:col-span-2">
            <Field id="neverPromise" label="Things Envo should NEVER promise">
              <textarea
                id="neverPromise"
                rows={2}
                value={form.neverPromise}
                onChange={(event) => updateField("neverPromise", event.target.value)}
                placeholder="e.g., Exact pricing, same-day service without approval..."
                className={textareaClass}
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field id="currentTools" label="Current Tools / CRM (Optional)">
              <input
                id="currentTools"
                value={form.currentTools}
                onChange={(event) => updateField("currentTools", event.target.value)}
                placeholder="Jobber, Housecall Pro, HubSpot, Spreadsheets..."
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </FormSection>

      {status === "error" ? (
        <div className="flex gap-3 rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/30 bg-[linear-gradient(135deg,#328BFF,#2563EB_48%,#6F4DFF)] px-7 text-base font-bold text-white shadow-[0_18px_52px_rgba(37,99,235,0.3)] outline-none transition hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_24px_70px_rgba(37,99,235,0.4)] focus-visible:ring-2 focus-visible:ring-[#328BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071126] active:translate-y-0 sm:w-auto"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <Loader2 className="relative z-10 size-5 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          )}
          <span className="relative z-10">
            Submit My Business Context
          </span>
        </button>
      </div>
    </form>
  );
}

function FormSection({
  accent,
  children,
  number,
  subtext,
  title
}: {
  accent: "blue" | "purple" | "green";
  children: ReactNode;
  number: string;
  subtext: string;
  title: string;
}) {
  const accentClasses = {
    blue: {
      bar: "bg-[#328BFF]",
      pill: "border-[#328BFF]/25 bg-[#328BFF]/14 text-[#BFD3FF]"
    },
    purple: {
      bar: "bg-[#6F4DFF]",
      pill: "border-[#6F4DFF]/30 bg-[#6F4DFF]/16 text-[#D9D2FF]"
    },
    green: {
      bar: "bg-[#34C759]",
      pill: "border-[#34C759]/25 bg-[#34C759]/12 text-[#C9F7D1]"
    }
  }[accent];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-7 lg:p-8">
      <div className={cn("absolute left-0 top-0 h-full w-1", accentClasses.bar)} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.12),transparent_32%),radial-gradient(circle_at_88%_0%,rgba(111,77,255,0.1),transparent_30%)]" />
      <div className="relative">
        <div className="mb-7">
          <h2 className="flex items-center gap-3 font-heading text-xl font-bold tracking-tight text-white">
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold", accentClasses.pill)}>
              {number}
            </span>
            {title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{subtext}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function Field({
  children,
  id,
  label
}: {
  children: ReactNode;
  id: string;
  label: string;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <label className="text-sm font-medium text-zinc-200" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ReceiptItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <p className="text-xs font-bold text-zinc-400">{label}</p>
      <p className="mt-2 font-heading text-lg font-bold text-white">{value}</p>
    </div>
  );
}
