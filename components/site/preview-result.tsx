"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  Clock,
  Mail,
  MessageSquareReply,
  Route,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref } from "@/lib/constants";
import type { PreviewSubmission } from "@/lib/preview-types";
import { cn } from "@/lib/utils";

type PreviewApiResponse = {
  submission?: PreviewSubmission;
  error?: string;
};

export function PreviewResult({
  previewId,
  initialSubmission
}: {
  previewId: string;
  initialSubmission: PreviewSubmission | null;
}) {
  const [submission, setSubmission] = useState<PreviewSubmission | null>(() => {
    if (initialSubmission || typeof window === "undefined") {
      return initialSubmission;
    }

    try {
      const stored = sessionStorage.getItem(`signalops-preview-${previewId}`);
      return stored ? (JSON.parse(stored) as PreviewSubmission) : null;
    } catch {
      return null;
    }
  });
  const [status, setStatus] = useState(submission ? "ready" : "loading");

  useEffect(() => {
    if (submission) return;
    fetch(`/api/preview?id=${encodeURIComponent(previewId)}`)
      .then((response) => response.json() as Promise<PreviewApiResponse>)
      .then((payload) => {
        if (payload.submission) {
          setSubmission(payload.submission);
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => setStatus("missing"));
  }, [previewId, submission]);

  if (status === "loading") {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Card className="border-[#ffb36d]/20 bg-[#ffb36d]/10">
          <CardContent className="flex items-center gap-3 p-6 text-[#ffe1bd]">
            <Sparkles className="size-5 animate-pulse" aria-hidden="true" />
            Loading your SignalOps preview...
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!submission) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Badge className="mb-5 bg-[#ff6f9c]/14 text-[#ffd7e6]">Preview unavailable</Badge>
        <h1 className="text-4xl font-semibold tracking-normal text-white">This preview could not be found.</h1>
        <p className="mt-4 text-[#ead0df]/76">
          If you just submitted the form, the preview may have expired from local mock storage. You can generate a new one in under a minute.
        </p>
        <TrackedLink
          href="/preview"
          eventName={ANALYTICS_EVENTS.previewCtaClicked}
          eventProperties={{ location: "preview_missing" }}
          className={`${buttonVariants({ size: "lg" })} mt-8`}
        >
          Generate a New Preview
          <ArrowRight className="size-4" aria-hidden="true" />
        </TrackedLink>
      </section>
    );
  }

  return <PreviewReport submission={submission} />;
}

function PreviewReport({ submission }: { submission: PreviewSubmission }) {
  const preview = submission.previewData;
  const emailBody = useMemo(
    () =>
      `Hi SignalOps, I reviewed the AI Lead System Preview for ${submission.businessName}.\n\nI have questions about:\n\nBest phone/email:\nPreferred walkthrough time:`,
    [submission.businessName]
  );

  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="surface-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,111,156,0.2),transparent_34%),linear-gradient(180deg,rgba(6,12,24,0.52),#100818_92%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
          <div>
            <Badge className="mb-5 bg-[#ff6f9c]/14 text-[#ffd7e6]">
              Your SignalOps AI Lead System Preview
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              {preview.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#ead0df]/78 sm:text-lg">
              {preview.subheadline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={getEmailHref({
                  subject: `Book my SignalOps walkthrough for ${submission.businessName}`,
                  body: emailBody
                })}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "preview_result", type: "book_walkthrough", previewId: submission.id }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                Book My Walkthrough
                <CalendarCheck2 className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href={getEmailHref({
                  subject: `Questions about my SignalOps preview for ${submission.businessName}`,
                  body: emailBody
                })}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "preview_result", type: "questions", previewId: submission.id }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto`}
              >
                Reply With Questions
                <Mail className="size-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>

          <Card className="border-[#ffb36d]/20 bg-[#ffb36d]/10">
            <CardHeader>
              <CardTitle>Recommended setup</CardTitle>
              <CardDescription>Based on your lead sources, volume, problem, and fit score.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <Metric label="Fit score" value={`${preview.fitScore}/100`} />
                <Metric label="Package" value={preview.recommendedPackage.name} />
                <Metric label="Lead sources" value={String(submission.mainLeadSources.length)} />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#ead0df]/78">{preview.recommendedPackage.reason}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <Card className="border-[#ff9ec0]/20 bg-[#17122d]/78">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquareReply className="size-5 text-[#ffb36d]" aria-hidden="true" />
              <CardTitle>{preview.receptionistTitle}</CardTitle>
            </div>
            <CardDescription>Sample conversation your AI receptionist could start.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {preview.conversation.map((message, index) => (
              <div
                key={`${message.speaker}-${index}`}
                className={cn(
                  "rounded-2xl border p-4 text-sm leading-6",
                  message.speaker === "Customer"
                    ? "border-white/10 bg-white/[0.045] text-[#ead0df]/80"
                    : "border-[#ffb36d]/20 bg-[#ffb36d]/10 text-[#fff1f7]"
                )}
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffb36d]">{message.speaker}</p>
                {message.message}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#17122d]/74">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-[#ffb36d]" aria-hidden="true" />
              <CardTitle>Lead dashboard mockup</CardTitle>
            </div>
            <CardDescription>How new opportunities could be scored, followed up, and handed off.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {preview.dashboardLeads.map((lead) => (
                <div key={`${lead.name}-${lead.source}`} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{lead.name}</p>
                      <p className="mt-1 text-xs text-[#ead0df]/58">{lead.source} - {lead.assignedOwner}</p>
                    </div>
                    <Badge variant={lead.score >= 80 ? "success" : "outline"}>{lead.score}</Badge>
                  </div>
                  <div className="mt-4 grid gap-2 text-xs text-[#ead0df]/70 sm:grid-cols-4">
                    <span>Urgency: {lead.urgency}</span>
                    <span>Status: {lead.status}</span>
                    <span>Reply: {lead.lastResponseTime}</span>
                    <span>Next: {lead.nextFollowUp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Route className="size-5 text-[#ffb36d]" aria-hidden="true" />
              <CardTitle>Lead flow map</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-6">
              {preview.leadFlow.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-center">
                  <div className="mx-auto mb-3 flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff6f9c,#ffb36d)] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-xs leading-5 text-[#f2d9e8]">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-[#ffb36d]" aria-hidden="true" />
              <CardTitle>Follow-up timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {preview.followUpTimeline.map((item) => (
              <div key={item.time} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                <Badge className="h-fit bg-[#ff6f9c]/14 text-[#ffd7e6]">{item.time}</Badge>
                <p className="text-sm leading-6 text-[#ead0df]/78">{item.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <Card className="border-[#ffb36d]/20 bg-[#ffb36d]/10">
          <CardHeader>
            <CardTitle>Value snapshot</CardTitle>
            <CardDescription>{preview.valueSnapshot.text}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs leading-5 text-[#ffe1bd]">{preview.valueSnapshot.disclaimer}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-emerald-300" aria-hidden="true" />
              <CardTitle>Approval-first workflow</CardTitle>
            </div>
            <CardDescription>{preview.approvalNote}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={getEmailHref({
                  subject: `Start my SignalOps build plan for ${submission.businessName}`,
                  body: emailBody
                })}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "preview_result", type: "start_build", previewId: submission.id }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                Start My Build Plan
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "preview_result" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto`}
              >
                See Demo
              </TrackedLink>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
