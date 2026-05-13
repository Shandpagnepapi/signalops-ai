"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type LeadResponse = {
  leadId: string;
  qualification: {
    score: number;
    grade: string;
    priority: string;
    recommendedNextStep: string;
    reasons: string[];
  };
};

type FormState = {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  monthlyLeads: string;
  responseGoal: string;
  notes: string;
};

const initialState: FormState = {
  fullName: "Jordan Miles",
  email: "jordan@routewash.example",
  company: "RouteWash Mobile Fleet Care",
  phone: "(555) 018-2040",
  monthlyLeads: "85",
  responseGoal: "Route fleet quote requests and recurring account opportunities within 5 minutes",
  notes: "We are missing after-hours fleet quote requests and need faster follow-up for recurring wash plan leads."
};

export function LeadIntakeForm({ demoClientName = "SignalOps" }: { demoClientName?: string }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [result, setResult] = useState<LeadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
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
          ...form,
          monthlyLeads: Number(form.monthlyLeads),
          source: demoClientName
        })
      });

      if (!response.ok) {
        throw new Error("The lead could not be prioritized.");
      }

      const data = (await response.json()) as LeadResponse;
      setResult(data);
      setStatus("success");
    } catch (caughtError) {
      setStatus("error");
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    }
  }

  return (
    <Card className="bg-[#0B1024]/75">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Lead intake demo</CardTitle>
            <CardDescription>Submit a realistic inquiry and preview intake output.</CardDescription>
          </div>
          <Badge variant="outline">API ready</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
              Full name
              <Input
                required
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                autoComplete="name"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
              Email
              <Input
                required
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                autoComplete="email"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
              Company
              <Input
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                autoComplete="organization"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
              Phone
              <Input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                autoComplete="tel"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
              Monthly lead volume
              <Input
                type="number"
                min="0"
                value={form.monthlyLeads}
                onChange={(event) => updateField("monthlyLeads", event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
              Response goal
              <Input
                value={form.responseGoal}
                onChange={(event) => updateField("responseGoal", event.target.value)}
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-[#EAF1FF]">
            Context
            <Textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
            />
          </label>
          <Button type="submit" size="lg" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="size-4" aria-hidden="true" />
            )}
            Sort lead
          </Button>
        </form>

        {status === "success" && result ? (
          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Ready lead created: {result.leadId}
            </div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-emerald-100/70">Priority value</dt>
                <dd className="text-xl font-semibold text-white">{result.qualification.score}</dd>
              </div>
              <div>
                <dt className="text-xs text-emerald-100/70">Readiness</dt>
                <dd className="text-xl font-semibold text-white">{result.qualification.grade}</dd>
              </div>
              <div>
                <dt className="text-xs text-emerald-100/70">Next action priority</dt>
                <dd className="text-xl font-semibold text-white">{result.qualification.priority}</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm leading-6 text-emerald-50">
              {result.qualification.recommendedNextStep}
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
