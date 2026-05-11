"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send, Sparkles } from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { getEmailHref, SITE_CONFIG } from "@/lib/constants";
import type { LeadSubmission } from "@/lib/lead-scoring";

type ProjectFormState = {
  name: string;
  businessName: string;
  website: string;
  email: string;
  phone: string;
  industry: string;
  packageInterest: string;
  leadTypes: string[];
  biggestProblem: string;
  currentLeadHandling: string;
  tools: string;
  monthlyLeads: string;
  timeline: string;
  desiredCapabilities: string[];
  budgetComfort: string;
  bestTime: string;
  anythingElse: string;
  loginAvailability: string;
};

type LeadApiResponse = {
  lead?: LeadSubmission;
  error?: string;
  errors?: string[];
};

const initialState: ProjectFormState = {
  name: "",
  businessName: "",
  website: "",
  email: "",
  phone: "",
  industry: "Mobile fleet wash",
  packageInterest: "Not sure",
  leadTypes: ["Calls", "Website forms"],
  biggestProblem: "",
  currentLeadHandling: "",
  tools: "",
  monthlyLeads: "",
  timeline: "This month",
  desiredCapabilities: ["Email follow-up", "New lead alerts"],
  budgetComfort: "",
  bestTime: "",
  anythingElse: "",
  loginAvailability: ""
};

const industries = [
  "Mobile fleet wash",
  "Auto shop",
  "Detailing",
  "Tint / wrap",
  "Roofing",
  "HVAC",
  "Plumbing / electrical",
  "Well / water service",
  "Med spa",
  "Dental office",
  "Law firm",
  "Insurance",
  "Real estate",
  "Other local service"
];

const packageOptions = ["Starter", "Growth", "Custom", "Not sure"];
const leadTypeOptions = ["Calls", "Forms", "Texts", "DMs", "Ads", "Referrals", "Other"];
const capabilityOptions = ["Email follow-up", "SMS follow-up", "Booking handoff", "Dashboard", "CRM logging", "Owner alerts"];
const timelineOptions = ["ASAP", "This month", "Exploring"];
const budgetOptions = ["Starter range", "Growth range", "Custom buildout", "Not sure yet"];

const selectClass =
  "h-11 w-full min-w-0 rounded-xl border border-white/12 bg-[#17122d]/74 px-3 text-sm text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function LeadLeakAuditForm() {
  const [form, setForm] = useState<ProjectFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [lead, setLead] = useState<LeadSubmission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasTrackedStart = useRef(false);

  function updateField<Key extends keyof ProjectFormState>(field: Key, value: ProjectFormState[Key]) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleFormStart() {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent(ANALYTICS_EVENTS.auditFormStarted, {
      location: "project_questionnaire"
    });
  }

  function buildProjectMessage() {
    return [
      `Package interest: ${form.packageInterest}`,
      `Lead types: ${form.leadTypes.join(", ") || "Not provided"}`,
      `Biggest lead problem: ${form.biggestProblem}`,
      `Current lead handling: ${form.currentLeadHandling}`,
      `Tools used: ${form.tools || "Not provided"}`,
      `Desired capabilities: ${form.desiredCapabilities.join(", ") || "Not provided"}`,
      `Timeline: ${form.timeline}`,
      `Budget comfort: ${form.budgetComfort || "Not provided"}`,
      `Best time to contact: ${form.bestTime || "Not provided"}`,
      `Login/tool availability: ${form.loginAvailability || "Not provided"}`,
      `Anything else: ${form.anythingElse || "Not provided"}`
    ].join("\n");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    if (!form.email.trim() || !form.phone.trim()) {
      setStatus("error");
      setError("Please include both an email and phone number so SignalOps can follow up with next steps.");
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "signalops-project-inquiry",
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName,
          website: form.website,
          industry: form.industry,
          serviceNeeded: `${form.packageInterest} project inquiry`,
          message: buildProjectMessage(),
          currentTools: form.tools,
          monthlyLeads: Number(form.monthlyLeads) || 0,
          preferredContact: `Best time: ${form.bestTime || "Not provided"}`,
          urgency: form.timeline
        })
      });

      const data = (await response.json()) as LeadApiResponse;

      if (!response.ok || !data.lead) {
        throw new Error(data.errors?.join(" ") || data.error || "The project details could not be submitted.");
      }

      setLead(data.lead);
      trackEvent(ANALYTICS_EVENTS.auditFormSubmitted, {
        leadId: data.lead.id,
        source: data.lead.source,
        score: data.lead.score,
        priority: data.lead.priority,
        industry: data.lead.industry || form.industry,
        package: form.packageInterest
      });
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  return (
    <Card id="audit-form" className="scroll-mt-24 border-[#ffb36d]/22 bg-white/[0.065] shadow-2xl shadow-black/24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">
              Project questionnaire
            </Badge>
            <CardTitle className="text-2xl">Tell us what you want SignalOps to build.</CardTitle>
            <CardDescription>
              Share your lead sources, tools, package interest, and timeline so we can scope the right lead response system.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 px-3 py-2 text-xs font-medium text-[#ffd7e6]">
            Build-ready context
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onFocus={handleFormStart} onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Contact and business</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <Input required value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Your name" />
              </Field>
              <Field label="Business name">
                <Input required value={form.businessName} onChange={(event) => updateField("businessName", event.target.value)} autoComplete="organization" placeholder="Business name" />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Field label="Website URL">
                <Input required value={form.website} onChange={(event) => updateField("website", event.target.value)} placeholder="https://yourbusiness.com" />
              </Field>
              <Field label="Email">
                <Input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" placeholder="you@business.com" />
              </Field>
              <Field label="Phone">
                <Input required value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" placeholder="(555) 555-0123" />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Project fit</p>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Industry">
                <select value={form.industry} onChange={(event) => updateField("industry", event.target.value)} className={selectClass}>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Package interest">
                <select value={form.packageInterest} onChange={(event) => updateField("packageInterest", event.target.value)} className={selectClass}>
                  {packageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Approx monthly leads">
                <Input
                  required
                  type="number"
                  min="0"
                  value={form.monthlyLeads}
                  onChange={(event) => updateField("monthlyLeads", event.target.value)}
                  placeholder="80"
                />
              </Field>
            </div>

            <OptionGroup
              label="What type of leads do you get?"
              options={leadTypeOptions}
              selected={form.leadTypes}
              onToggle={(value) => updateField("leadTypes", toggleValue(form.leadTypes, value))}
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Current workflow</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Biggest lead problem right now">
                <Textarea
                  required
                  value={form.biggestProblem}
                  onChange={(event) => updateField("biggestProblem", event.target.value)}
                  placeholder="Example: We miss after-hours quote requests and follow-up is inconsistent."
                />
              </Field>
              <Field label="How are leads currently handled?">
                <Textarea
                  required
                  value={form.currentLeadHandling}
                  onChange={(event) => updateField("currentLeadHandling", event.target.value)}
                  placeholder="Example: Phone calls, website form emails, Facebook messages, manual callbacks..."
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="What tools do you use?">
                <Textarea
                  required
                  value={form.tools}
                  onChange={(event) => updateField("tools", event.target.value)}
                  placeholder="CRM, calendar, email, SMS, spreadsheets, website forms, Jobber, GoHighLevel, etc."
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Build details</p>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Timeline">
                <select value={form.timeline} onChange={(event) => updateField("timeline", event.target.value)} className={selectClass}>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Budget comfort optional">
                <select value={form.budgetComfort} onChange={(event) => updateField("budgetComfort", event.target.value)} className={selectClass}>
                  <option value="">Select one</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Best time to contact optional">
                <Input value={form.bestTime} onChange={(event) => updateField("bestTime", event.target.value)} placeholder="Weekday afternoons" />
              </Field>
            </div>

            <OptionGroup
              label="What should the system include?"
              options={capabilityOptions}
              selected={form.desiredCapabilities}
              onToggle={(value) => updateField("desiredCapabilities", toggleValue(form.desiredCapabilities, value))}
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Current CRM/tool login availability optional">
                <Textarea
                  value={form.loginAvailability}
                  onChange={(event) => updateField("loginAvailability", event.target.value)}
                  placeholder="Example: We can invite you to our CRM/calendar if needed."
                />
              </Field>
              <Field label="Anything else we should know?">
                <Textarea
                  value={form.anythingElse}
                  onChange={(event) => updateField("anythingElse", event.target.value)}
                  placeholder="Service area, team size, special routing rules, compliance concerns, etc."
                />
              </Field>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            Send Project Details
          </Button>
        </form>

        {status === "success" && lead ? (
          <div className="mt-6 rounded-2xl border border-[#ffb36d]/22 bg-[radial-gradient(circle_at_20%_0%,rgba(255,111,156,0.18),transparent_32%),rgba(255,179,109,0.08)] p-5 shadow-2xl shadow-black/18">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[#ffe1bd]">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Project details received
              </div>
              <Badge variant={lead.priority === "hot" ? "warning" : "success"}>SignalOps will review</Badge>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
              <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">
                <Sparkles className="size-3.5 text-[#ffb36d]" aria-hidden="true" />
                Next step
              </p>
              <p className="text-sm leading-6 text-[#fff8fb]">
                Got it - your project details were sent. SignalOps will review your lead flow and reply with the best next step.
              </p>
            </div>

            <TrackedLink
              href={getEmailHref()}
              eventName={ANALYTICS_EVENTS.contactClicked}
              eventProperties={{ location: "project_questionnaire_success", type: "email" }}
              className={`${buttonVariants({ variant: "outline" })} mt-4 w-full border-white/18 bg-white/[0.045]`}
            >
              <Mail className="size-4" aria-hidden="true" />
              Prefer email? Send details directly to {SITE_CONFIG.email}
            </TrackedLink>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="mt-6 flex gap-2 rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm text-red-100">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-medium text-[#f2d9e8]">
      {label}
      {children}
    </label>
  );
}

function OptionGroup({
  label,
  options,
  selected,
  onToggle
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="mt-4">
      <legend className="mb-2 text-sm font-medium text-[#f2d9e8]">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const isSelected = selected.includes(option);

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                isSelected
                  ? "border-[#ffb36d]/35 bg-[#ffb36d]/12 text-[#ffe1bd]"
                  : "border-white/10 bg-white/[0.035] text-[#ead0df]/76 hover:border-white/20"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(option)}
                className="size-4 accent-[#ff6f9c]"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
