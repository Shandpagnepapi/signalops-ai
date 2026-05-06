"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, ClipboardCheck, Loader2, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { LeadSubmission } from "@/lib/lead-scoring";

type AuditFormState = {
  name: string;
  businessName: string;
  website: string;
  email: string;
  phone: string;
  industry: string;
  monthlyLeads: string;
  currentTools: string;
  biggestProblem: string;
  preferredContact: string;
};

type LeadApiResponse = {
  lead?: LeadSubmission;
  error?: string;
  errors?: string[];
};

const initialState: AuditFormState = {
  name: "",
  businessName: "",
  website: "",
  email: "",
  phone: "",
  industry: "Auto / wheel repair",
  monthlyLeads: "",
  currentTools: "",
  biggestProblem: "",
  preferredContact: "Text + email"
};

const industries = [
  "Auto / wheel repair",
  "Auto shop",
  "Detailing",
  "Tint / wrap",
  "Roofing",
  "HVAC",
  "Plumbing / electrical",
  "Med spa",
  "Dental office",
  "Law firm",
  "Insurance",
  "Real estate",
  "Other local service"
];

const contactMethods = ["Text + email", "Phone call", "Email", "Text message"];

const selectClass =
  "h-11 w-full min-w-0 rounded-md border border-input bg-slate-950/60 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function priorityVariant(priority: LeadSubmission["priority"]) {
  return priority === "hot" || priority === "junk" ? "warning" : "success";
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function MissedLeadCheckupForm() {
  const [form, setForm] = useState<AuditFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [lead, setLead] = useState<LeadSubmission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasTrackedStart = useRef(false);

  function updateField(field: keyof AuditFormState, value: string) {
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
      location: "audit_form"
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    if (!form.email.trim() && !form.phone.trim()) {
      setStatus("error");
      setError("Please include an email or phone number so LeadOps can follow up with your checkup.");
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "leadops-missed-lead-checkup",
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName,
          website: form.website,
          industry: form.industry,
          serviceNeeded: "Free Missed Lead Checkup",
          message: form.biggestProblem,
          currentTools: form.currentTools,
          monthlyLeads: Number(form.monthlyLeads) || 0,
          preferredContact: form.preferredContact,
          urgency: form.biggestProblem
        })
      });

      const data = (await response.json()) as LeadApiResponse;

      if (!response.ok || !data.lead) {
        throw new Error(data.errors?.join(" ") || data.error || "The checkup request could not be submitted.");
      }

      setLead(data.lead);
      trackEvent(ANALYTICS_EVENTS.auditFormSubmitted, {
        leadId: data.lead.id,
        source: data.lead.source,
        score: data.lead.score,
        priority: data.lead.priority,
        industry: data.lead.industry || form.industry
      });
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  return (
    <Card id="audit-form" className="scroll-mt-24 border-blue-300/20 bg-slate-950/86 shadow-2xl shadow-black/25">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 bg-blue-500/14 text-blue-100">Missed lead checkup</Badge>
            <CardTitle className="text-2xl">Request your Free Missed Lead Checkup</CardTitle>
            <CardDescription>
              Share the basics. LeadOps will look for missed calls, slow replies, weak qualification, messy handoffs, and forgotten follow-ups.
            </CardDescription>
          </div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-100">
            Instant preview
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onFocus={handleFormStart} onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name">
              <Input required value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Your name" />
            </Field>
            <Field label="Business name">
              <Input value={form.businessName} onChange={(event) => updateField("businessName", event.target.value)} autoComplete="organization" placeholder="Business name" />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Website">
              <Input value={form.website} onChange={(event) => updateField("website", event.target.value)} placeholder="https://yourbusiness.com" />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" placeholder="you@business.com" />
            </Field>
            <Field label="Phone">
              <Input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" placeholder="(555) 555-0123" />
            </Field>
          </div>

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
            <Field label="Preferred contact method">
              <select value={form.preferredContact} onChange={(event) => updateField("preferredContact", event.target.value)} className={selectClass}>
                {contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Current CRM/tools">
            <Textarea
              value={form.currentTools}
              onChange={(event) => updateField("currentTools", event.target.value)}
              placeholder="No CRM is fine. Add calls, texts, DMs, inbox, spreadsheet, HubSpot, GoHighLevel, ServiceTitan, Jobber, etc."
            />
          </Field>

          <Field label="Biggest lead problem">
            <Textarea
              required
              value={form.biggestProblem}
              onChange={(event) => updateField("biggestProblem", event.target.value)}
              placeholder="Example: We get quote requests after hours, but follow-up is inconsistent and customers do not always book."
            />
          </Field>

          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            Submit checkup request
          </Button>
        </form>

        {status === "success" && lead ? (
          <div className="mt-6 rounded-lg border border-emerald-300/20 bg-emerald-400/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
                <CheckCircle2 className="size-4" aria-hidden="true" />
              Checkup request received
              </div>
              <Badge variant={priorityVariant(lead.priority)}>
                {formatLabel(lead.priority)} priority
              </Badge>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <div className="rounded-md border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">Lead score</p>
                <p className="mt-3 text-4xl font-semibold text-white">{lead.score}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">Urgency</p>
                <p className="mt-3 text-lg font-semibold text-white">{formatLabel(lead.aiQualification.urgency)}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">Confidence</p>
                <p className="mt-3 text-lg font-semibold text-white">{Math.round(lead.aiQualification.confidence * 100)}%</p>
              </div>
              <div className="rounded-md border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">Review</p>
                <p className="mt-3 text-lg font-semibold text-white">{lead.aiQualification.needsHumanReview ? "Human" : "Auto route"}</p>
              </div>
              <div className="rounded-md border border-white/10 bg-slate-950/70 p-4 md:col-span-4">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  AI qualification summary
                </p>
                <p className="text-sm leading-6 text-emerald-50">{lead.aiQualification.summary}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              <ResultBlock title="Recommended next action" body={lead.recommendedAction} />
              <ResultBlock title="Suggested customer reply" body={lead.customerReply} />
              <ResultBlock title="Internal note" body={lead.internalNote} />
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">Suggested tags</p>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/15 bg-white/5 text-slate-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 rounded-md border border-blue-300/20 bg-blue-500/10 p-4 text-sm font-medium leading-6 text-blue-50">
              We will review how your business handles calls, texts, forms, DMs, and follow-ups, then show where leads are getting missed, delayed, or forgotten.
            </p>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="mt-6 flex gap-2 rounded-lg border border-red-300/20 bg-red-400/10 p-4 text-sm text-red-100">
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
    <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-200">
      {label}
      {children}
    </label>
  );
}

function ResultBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-slate-950/70 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-100/70">
        <ClipboardCheck className="size-3.5 text-emerald-200" aria-hidden="true" />
        {title}
      </p>
      <p className="text-sm leading-6 text-slate-100">{body}</p>
    </div>
  );
}
