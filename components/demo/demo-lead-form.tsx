"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Loader2, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { DemoBusinessConfig, DemoFormInitialState } from "@/lib/demo-businesses";
import type { LeadSubmission } from "@/lib/lead-scoring";

type LeadApiResponse = {
  lead?: LeadSubmission;
  error?: string;
  errors?: string[];
};

const selectClass =
  "h-11 w-full min-w-0 rounded-xl border border-white/12 bg-[#17122d]/74 px-3 text-sm text-white shadow-inner shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function getServiceLabel(business: DemoBusinessConfig, value: string) {
  return business.form.serviceOptions.find((option) => option.value === value)?.label ?? business.form.serviceOptions[0]?.label ?? "Service request";
}

function priorityVariant(priority: LeadSubmission["priority"]) {
  return priority === "hot" || priority === "junk" ? "warning" : "success";
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
    <Card id="quote" className="scroll-mt-28 border-[#ffb36d]/22 bg-white/[0.065] shadow-2xl shadow-black/24">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge className="mb-3 border border-[#ffb36d]/25 bg-[#ffb36d]/12 text-[#ffe1bd]">Envo intake demo</Badge>
            <CardTitle className="text-2xl">Submit a sample lead</CardTitle>
            <CardDescription>
              The form updates for {business.name}, then shows how Envo packages a lead for handoff.
            </CardDescription>
          </div>
          <div className="rounded-xl border border-[#ff9ec0]/20 bg-[#ff6f9c]/10 px-3 py-2 text-xs font-medium text-[#ffd7e6]">
                  Envo demo
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Contact</p>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Name">
                <Input required value={form.name} onChange={(event) => updateField("name", event.target.value)} />
              </Field>
              <Field label="Phone">
                <Input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
              </Field>
              <Field label="Email">
                <Input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Request details</p>
            <div className="grid gap-4">
              <Field label={business.form.locationLabel}>
                <Input value={form.address} onChange={(event) => updateField("address", event.target.value)} />
              </Field>

              <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
                <Field label={business.form.assetLabel}>
                  <Input value={form.asset} onChange={(event) => updateField("asset", event.target.value)} />
                </Field>
                <Field label={business.form.assetSecondaryLabel}>
                  <Input value={form.assetSecondary} onChange={(event) => updateField("assetSecondary", event.target.value)} />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label={business.form.serviceLabel}>
                  <select value={form.serviceValue} onChange={(event) => updateField("serviceValue", event.target.value)} className={selectClass}>
                    {business.form.serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={business.form.quantityLabel}>
                  <Input min="1" type="number" value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)} />
                </Field>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#17122d]/42 p-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffb36d]">Routing signals</p>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label={business.form.statusLabel}>
                  <select value={form.status} onChange={(event) => updateField("status", event.target.value)} className={selectClass}>
                    {business.form.statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={business.form.mobileLabel}>
                  <select value={form.mobile} onChange={(event) => updateField("mobile", event.target.value)} className={selectClass}>
                    {business.form.mobileOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={business.form.photoLabel}>
                <Textarea value={form.photoNote} onChange={(event) => updateField("photoNote", event.target.value)} />
              </Field>

              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <Field label={business.form.descriptionLabel}>
                  <Textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} />
                </Field>
                <Field label={business.form.preferredTimeLabel}>
                  <Textarea value={form.preferredTime} onChange={(event) => updateField("preferredTime", event.target.value)} />
                </Field>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            {business.form.submitLabel}
          </Button>
        </form>

        {status === "success" && lead ? (
          <div className="mt-6 rounded-2xl border border-[#ffb36d]/22 bg-[radial-gradient(circle_at_20%_0%,rgba(255,111,156,0.18),transparent_32%),rgba(255,179,109,0.08)] p-5 shadow-2xl shadow-black/18">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-[#ffe1bd]">
                  <Sparkles className="size-4" aria-hidden="true" />
                  Envo Lead Desk
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Lead packaged for handoff</h3>
              </div>
              <Badge variant={priorityVariant(lead.priority)}>{formatLabel(lead.priority)} priority</Badge>
            </div>

            <dl className="mt-5 grid gap-3 md:grid-cols-4">
              <Metric label="Priority value" value={String(lead.score)} />
              <Metric label="Priority" value={formatLabel(lead.priority)} />
              <Metric label="Urgency" value={formatLabel(lead.aiQualification.urgency)} />
              <Metric label="Readiness" value={`${Math.round(lead.aiQualification.confidence * 100)}%`} />
            </dl>

            <div className="mt-4 grid gap-4">
              <ResultBlock title="Lead summary" body={lead.aiQualification.summary} />
              <ResultBlock title="Recommended next action" body={lead.recommendedAction} />
              <ResultBlock title="Suggested customer reply" body={lead.customerReply} />
              <ResultBlock title={business.form.internalNoteLabel} body={lead.internalNote} icon="warning" />
              {lead.aiQualification.needsHumanReview ? (
                <ResultBlock title="Owner handoff flag" body="This lead should go to the owner with the account context before the final quote path is confirmed." icon="warning" />
              ) : null}
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
      <dt className="text-xs uppercase tracking-[0.16em] text-[#ead0df]/58">{label}</dt>
      <dd className="mt-2 text-3xl font-semibold text-white md:text-lg">{value}</dd>
    </div>
  );
}

function ResultBlock({
  title,
  body,
  icon
}: {
  title: string;
  body: string;
  icon?: "warning";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#17122d]/74 p-4">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#ead0df]/58">
        {icon === "warning" ? (
          <AlertTriangle className="size-3.5 text-amber-300" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="size-3.5 text-[#ffb36d]" aria-hidden="true" />
        )}
        {title}
      </p>
      <p className="text-sm leading-6 text-[#fff8fb]">{body}</p>
    </div>
  );
}
