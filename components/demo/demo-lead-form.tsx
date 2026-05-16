"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Send,
  Sparkles
} from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { DemoBusinessConfig, DemoFormInitialState } from "@/lib/demo-businesses";
import type { LeadSubmission } from "@/lib/lead-scoring";
import { cn } from "@/lib/utils";

type LeadApiResponse = {
  lead?: LeadSubmission;
  error?: string;
  errors?: string[];
};

const inputClass =
  "min-h-12 w-full min-w-0 rounded-xl border border-zinc-800/80 bg-zinc-950/62 px-4 py-3 text-sm text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/55 focus:ring-2 focus:ring-emerald-500/20";

const selectClass =
  "min-h-12 w-full min-w-0 appearance-none rounded-xl border border-zinc-800/80 bg-zinc-950/62 px-4 py-3 text-sm text-white shadow-inner shadow-black/10 outline-none transition focus:border-emerald-500/55 focus:ring-2 focus:ring-emerald-500/20";

const textareaClass =
  "min-h-24 w-full min-w-0 resize-y rounded-xl border border-zinc-800/80 bg-zinc-950/62 px-4 py-3 text-sm leading-6 text-white shadow-inner shadow-black/10 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/55 focus:ring-2 focus:ring-emerald-500/20";

function getServiceLabel(business: DemoBusinessConfig, value: string) {
  return business.form.serviceOptions.find((option) => option.value === value)?.label ?? business.form.serviceOptions[0]?.label ?? "Service request";
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getUrgency(business: DemoBusinessConfig, form: DemoFormInitialState) {
  const serviceLabel = getServiceLabel(business, form.serviceValue);
  const joinedText = `${business.key} ${serviceLabel} ${form.description} ${form.photoNote}`.toLowerCase();

  if (business.key === "fleet-wash") {
    const fleetSize = Number(form.quantity) || 0;

    if (fleetSize >= 25 || joinedText.includes("recurring") || joinedText.includes("biweekly") || joinedText.includes("monthly")) {
      return "Recurring account opportunity";
    }

    if (form.mobile === "yes" || joinedText.includes("after-hours") || joinedText.includes("weeknight")) {
      return "After-hours route window";
    }

    if (joinedText.includes("dealer") || joinedText.includes("lot") || joinedText.includes("rental")) {
      return "Account review";
    }

    return "Fleet quote request";
  }

  if (business.key === "well-water") {
    if (form.status === "no" || joinedText.includes("no water") || joinedText.includes("emergency")) {
      return "Emergency: no water or major issue";
    }

    if (joinedText.includes("commercial") || joinedText.includes("industrial") || joinedText.includes("large project")) {
      return "Commercial or large project review";
    }

    if (form.status === "unsure" || joinedText.includes("pressure") || joinedText.includes("this week")) {
      return "Soon: needs service this week";
    }

    if (joinedText.includes("maintenance") || joinedText.includes("filter")) {
      return "Routine maintenance";
    }

    return "Just asking questions";
  }

  return "Standard quote request";
}

function buildMessage(business: DemoBusinessConfig, form: DemoFormInitialState) {
  return [
    form.description,
    form.address ? `${business.form.locationLabel}: ${form.address}` : "",
    form.asset ? `${business.form.assetLabel}: ${form.asset}` : "",
    form.assetSecondary ? `${business.form.assetSecondaryLabel}: ${form.assetSecondary}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

export function DemoLeadForm({ business }: { business: DemoBusinessConfig }) {
  const [form, setForm] = useState<DemoFormInitialState>(business.form.initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [lead, setLead] = useState<LeadSubmission | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof DemoFormInitialState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source: business.form.source,
          name: form.name,
          email: form.email,
          phone: form.phone,
          businessName: business.name,
          industry: business.industry,
          serviceNeeded: getServiceLabel(business, form.serviceValue),
          urgency: getUrgency(business, form),
          address: form.address,
          vehicleYearMakeModel: form.asset,
          wheelSize: form.assetSecondary,
          damageType: form.serviceValue,
          numberOfWheels: Number(form.quantity) || 0,
          vehicleDrivable: form.status,
          needsMobileService: form.mobile,
          photoNotes: form.photoNote,
          message: buildMessage(business, form),
          preferredTime: form.preferredTime
        })
      });

      const data = (await response.json()) as LeadApiResponse;

      if (!response.ok || !data.lead) {
        throw new Error(data.errors?.join(" ") || data.error || "The demo lead could not be submitted.");
      }

      setLead(data.lead);
      trackEvent(ANALYTICS_EVENTS.demoLeadSubmitted, {
        leadId: data.lead.id,
        source: data.lead.source,
        score: data.lead.score,
        priority: data.lead.priority,
        urgency: data.lead.aiQualification.urgency,
        demoBusiness: business.key,
        serviceNeeded: data.lead.serviceNeeded || getServiceLabel(business, form.serviceValue),
        damageType: data.lead.damageType || form.serviceValue,
        numberOfWheels: data.lead.numberOfWheels || Number(form.quantity) || 0,
        vehicleDrivable: data.lead.vehicleDrivable || form.status,
        needsMobileService: data.lead.needsMobileService || form.mobile,
        hasSiteNotes: Boolean(form.photoNote.trim())
      });
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/70 p-5 shadow-2xl shadow-black/24 backdrop-blur-2xl md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {business.form.badge}
          </div>
          <h2 className="font-heading text-2xl tracking-tight text-white">{business.form.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{business.form.description}</p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400">
          Envo demo
        </div>
      </div>

      {status === "error" ? (
        <div className="mt-5 flex gap-2 rounded-xl border border-red-300/20 bg-red-400/10 p-4 text-sm text-red-100">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      ) : null}

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <FormPanel label="Contact">
          <div className="grid gap-4 md:grid-cols-3">
            <Field id={`${business.key}-name`} label="Name">
              <input
                id={`${business.key}-name`}
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className={inputClass}
                autoComplete="name"
              />
            </Field>
            <Field id={`${business.key}-phone`} label="Phone">
              <input
                id={`${business.key}-phone`}
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className={inputClass}
                autoComplete="tel"
              />
            </Field>
            <Field id={`${business.key}-email`} label="Email">
              <input
                id={`${business.key}-email`}
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className={inputClass}
                autoComplete="email"
              />
            </Field>
          </div>
        </FormPanel>

        <FormPanel label="Request details">
          <div className="grid gap-4">
            <Field id={`${business.key}-address`} label={business.form.locationLabel}>
              <input
                id={`${business.key}-address`}
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
              <Field id={`${business.key}-asset`} label={business.form.assetLabel}>
                <input
                  id={`${business.key}-asset`}
                  value={form.asset}
                  onChange={(event) => updateField("asset", event.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field id={`${business.key}-asset-secondary`} label={business.form.assetSecondaryLabel}>
                <input
                  id={`${business.key}-asset-secondary`}
                  value={form.assetSecondary}
                  onChange={(event) => updateField("assetSecondary", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field id={`${business.key}-service`} label={business.form.serviceLabel}>
                <select
                  id={`${business.key}-service`}
                  value={form.serviceValue}
                  onChange={(event) => updateField("serviceValue", event.target.value)}
                  className={selectClass}
                >
                  {business.form.serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={`${business.key}-quantity`} label={business.form.quantityLabel}>
                <input
                  id={`${business.key}-quantity`}
                  min="1"
                  type="number"
                  value={form.quantity}
                  onChange={(event) => updateField("quantity", event.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        </FormPanel>

        <FormPanel label="Routing signals">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id={`${business.key}-status`} label={business.form.statusLabel}>
                <select
                  id={`${business.key}-status`}
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value)}
                  className={selectClass}
                >
                  {business.form.statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={`${business.key}-mobile`} label={business.form.mobileLabel}>
                <select
                  id={`${business.key}-mobile`}
                  value={form.mobile}
                  onChange={(event) => updateField("mobile", event.target.value)}
                  className={selectClass}
                >
                  {business.form.mobileOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field id={`${business.key}-photo-note`} label={business.form.photoLabel}>
              <textarea
                id={`${business.key}-photo-note`}
                value={form.photoNote}
                onChange={(event) => updateField("photoNote", event.target.value)}
                className={textareaClass}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <Field id={`${business.key}-description`} label={business.form.descriptionLabel}>
                <textarea
                  id={`${business.key}-description`}
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  className={textareaClass}
                />
              </Field>
              <Field id={`${business.key}-preferred-time`} label={business.form.preferredTimeLabel}>
                <textarea
                  id={`${business.key}-preferred-time`}
                  value={form.preferredTime}
                  onChange={(event) => updateField("preferredTime", event.target.value)}
                  className={textareaClass}
                />
              </Field>
            </div>
          </div>
        </FormPanel>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-zinc-950 shadow-[0_18px_52px_rgba(16,185,129,0.22)] outline-none transition hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          )}
          {business.form.submitLabel}
        </button>
      </form>

      {status === "success" && lead ? <LeadResult business={business} lead={lead} /> : null}
    </div>
  );
}

function LeadResult({
  business,
  lead
}: {
  business: DemoBusinessConfig;
  lead: LeadSubmission;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-[radial-gradient(circle_at_20%_0%,rgba(52,199,89,0.16),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(50,139,255,0.14),transparent_34%),rgba(24,24,27,0.7)] p-5 shadow-2xl shadow-black/24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-300">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Envo Lead Desk
          </p>
          <h3 className="mt-2 font-heading text-2xl tracking-tight text-white">Lead packaged for handoff</h3>
        </div>
        <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", priorityClassName(lead.priority))}>
          {formatLabel(lead.priority)} priority
        </span>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <ResultMetric label="Score" value={String(lead.score)} />
        <ResultMetric label="Priority" value={formatLabel(lead.priority)} />
        <ResultMetric label="Urgency" value={formatLabel(lead.aiQualification.urgency)} />
        <ResultMetric label="Readiness" value={`${Math.round(lead.aiQualification.confidence * 100)}%`} />
      </dl>

      <div className="mt-4 grid gap-4">
        <ResultBlock title="Lead summary" body={lead.aiQualification.summary} />
        <ResultBlock title="Recommended next action" body={lead.recommendedAction} />
        <ResultBlock title="Suggested customer reply" body={lead.customerReply} />
        <ResultBlock title={business.form.internalNoteLabel} body={lead.internalNote} icon="warning" />
        {lead.aiQualification.needsHumanReview ? (
          <ResultBlock
            title="Owner handoff flag"
            body="This lead should go to the owner with the account context before the final quote path is confirmed."
            icon="warning"
          />
        ) : null}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">Suggested tags</p>
          <div className="flex flex-wrap gap-2">
            {lead.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-700/80 bg-zinc-950/45 px-3 py-1.5 text-xs text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormPanel({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section className="rounded-2xl border border-zinc-800/60 bg-zinc-950/34 p-4">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-emerald-400">{label}</p>
      {children}
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

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/56 p-4">
      <dt className="text-xs uppercase tracking-widest text-zinc-500">{label}</dt>
      <dd className="mt-2 font-heading text-2xl text-white">{value}</dd>
    </div>
  );
}

function ResultBlock({
  body,
  icon,
  title
}: {
  body: string;
  icon?: "warning";
  title: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/56 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
        {icon === "warning" ? (
          <AlertTriangle className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        )}
        {title}
      </p>
      <p className="text-sm leading-6 text-zinc-200">{body}</p>
    </div>
  );
}

function priorityClassName(priority: LeadSubmission["priority"]) {
  if (priority === "hot") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }

  if (priority === "warm") {
    return "border-blue-500/20 bg-blue-500/10 text-blue-300";
  }

  if (priority === "cold") {
    return "border-zinc-700 bg-zinc-800/70 text-zinc-300";
  }

  return "border-amber-500/20 bg-amber-500/10 text-amber-300";
}
