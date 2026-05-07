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
  "h-11 w-full min-w-0 rounded-xl border border-white/12 bg-[#17122d]/74 px-3 text-sm text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function priorityVariant(priority: LeadSubmission["priority"]) {
  return priority === "hot" || priority === "junk" ? "warning" : "success";
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function LeadLeakAuditForm() {
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
      setError("Please include an email or phone number so SignalOps can follow up with your missed lead check.");
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: "signalops-missed-lead-check",
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName,
          website: form.website,
          industry: form.industry,
          serviceNeeded: "Free Missed Lead Check",
          message: form.biggestProblem,
          currentTools: form.currentTools,
          monthlyLeads: Number(form.monthlyLeads) || 0,
          preferredContact: form.preferredContact,
          urgency: form.biggestProblem
        })
      });

      const data = (await response.json()) as LeadApiResponse;

      if (!response.ok || !data.lead) {
        throw new Error(data.errors?.join(" ") || data.error || "The missed lead check request could not be submitted.");
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
    <Card id="audit-form" className="scroll-mt-24 border-[#ffb36d]/22 bg-white/[0.065] shadow-2xl shadow-black/24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">Missed lead check</Badge>
            <CardTitle className="text-2xl">Request your Free Missed Lead Check</CardTitle>
            <CardDescription>
              Share the basics. SignalOps will look for missed calls, slow replies, weak qualification, messy handoffs, and forgotten follow-ups.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 px-3 py-2 text-xs font-medium text-[#ffd7e6]">
            Instant preview
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onFocus={handleFormStart} onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Your business</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <Input required value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Your name" />
              </Field>
              <Field label="Business name">
                <Input value={form.businessName} onChange={(event) => updateField("businessName", event.target.value)} autoComplete="organization" placeholder="Business name" />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
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
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Lead flow</p>
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
              <Field label="Preferred contact">
                <select value={form.preferredContact} onChange={(event) => updateField("preferredContact", event.target.value)} className={selectClass}>
                  {contactMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Current CRM/tools">
                <Textarea
                  value={form.currentTools}
                  onChange={(event) => updateField("currentTools", event.target.value)}
                  placeholder="No CRM is fine. Calls, texts, DMs, inbox, spreadsheet, Jobber, GoHighLevel..."
                />
              </Field>

              <Field label="Biggest lead problem">
                <Textarea
                  required
                  value={form.biggestProblem}
                  onChange={(event) => updateField("biggestProblem", event.target.value)}
                  placeholder="Example: We miss after-hours quote requests and follow-up is inconsistent."
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
            Submit check request
          </Button>
        </form>

        {status === "success" && lead ? (
          <div className="mt-6 rounded-2xl border border-[#ffb36d]/22 bg-[radial-gradient(circle_at_20%_0%,rgba(255,111,156,0.18),transparent_32%),rgba(255,179,109,0.08)] p-5 shadow-2xl shadow-black/18">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[#ffe1bd]">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Missed Lead Check request received
              </div>
              <Badge variant={priorityVariant(lead.priority)}>
                {formatLabel(lead.priority)} priority
              </Badge>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">Lead score</p>
                <p className="mt-3 text-4xl font-semibold text-white">{lead.score}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">Urgency</p>
                <p className="mt-3 text-lg font-semibold text-white">{formatLabel(lead.aiQualification.urgency)}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">Confidence</p>
                <p className="mt-3 text-lg font-semibold text-white">{Math.round(lead.aiQualification.confidence * 100)}%</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">Review</p>
                <p className="mt-3 text-lg font-semibold text-white">{lead.aiQualification.needsHumanReview ? "Human" : "Auto route"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4 md:col-span-4">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  AI qualification summary
                </p>
                <p className="text-sm leading-6 text-[#fff8fb]">{lead.aiQualification.summary}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              <ResultBlock title="Recommended next action" body={lead.recommendedAction} />
              <ResultBlock title="Suggested customer reply" body={lead.customerReply} />
              <ResultBlock title="Internal note" body={lead.internalNote} />
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">Suggested tags</p>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/15 bg-white/5 text-[#f2d9e8]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 rounded-xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 p-4 text-sm font-medium leading-6 text-[#fff1f7]">
              We will review how your business handles calls, texts, forms, DMs, and follow-ups, then show where leads are getting missed, delayed, or forgotten.
            </p>
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

function ResultBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">
        <ClipboardCheck className="size-3.5 text-[#ffb36d]" aria-hidden="true" />
        {title}
      </p>
      <p className="text-sm leading-6 text-[#fff8fb]">{body}</p>
    </div>
  );
}
