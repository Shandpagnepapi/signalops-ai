"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  Clock,
  ImageIcon,
  Mail,
  MessageSquareReply,
  Route,
  Sparkles
} from "lucide-react";
import { TrackedLink } from "@/components/site/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getEmailHref } from "@/lib/constants";
import type { PublicPreviewSubmission } from "@/lib/preview-types";
import { cn } from "@/lib/utils";

type PreviewApiResponse = {
  submission?: PublicPreviewSubmission;
  error?: string;
};

export function PreviewResult({
  previewId,
  initialSubmission
}: {
  previewId: string;
  initialSubmission: PublicPreviewSubmission | null;
}) {
  const [submission, setSubmission] = useState<PublicPreviewSubmission | null>(initialSubmission);
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
        <Card className="border-[#6F4DFF]/20 bg-[#6F4DFF]/10">
          <CardContent className="flex items-center gap-3 p-6 text-[#EAF1FF]">
            <Sparkles className="size-5 animate-pulse" aria-hidden="true" />
            Loading your Envo preview...
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!submission) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Badge className="mb-5 bg-[#328BFF]/14 text-[#D7E8FF]">Preview unavailable</Badge>
        <h1 className="text-4xl font-semibold tracking-normal text-white">This preview could not be found.</h1>
        <p className="mt-4 text-[#D7E2F7]/76">
          If you just submitted the form, the preview may still be saving or Supabase persistence may be unavailable. You can generate a new one in under a minute.
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

function PreviewReport({ submission }: { submission: PublicPreviewSubmission }) {
  const preview = submission.previewData;
  const emailBody = useMemo(
    () =>
      `Hi SignalOpsAI, I looked through the Envo Preview for ${submission.businessName}.\n\nI have questions about:\n\nBest phone/email:\nPreferred walkthrough time:`,
    [submission.businessName]
  );

  return (
    <div className="overflow-x-hidden">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="surface-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(50,139,255,0.2),transparent_34%),linear-gradient(180deg,rgba(6,12,24,0.52),#071126_92%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
          <div>
            <Badge className="mb-5 bg-[#328BFF]/14 text-[#D7E8FF]">
              Your Envo Preview
            </Badge>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-6xl">
              {preview.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#D7E2F7]/78 sm:text-lg">
              {preview.subheadline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={getEmailHref({
                  subject: `Book my Envo walkthrough for ${submission.businessName}`,
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
                  subject: `Questions about my Envo Preview for ${submission.businessName}`,
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

          <Card className="border-[#6F4DFF]/20 bg-[#6F4DFF]/10">
            <CardHeader>
              <CardTitle>Recommended setup</CardTitle>
              <CardDescription>Based on your lead sources, volume, bottleneck, and current process.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <Metric label="Preview fit" value={preview.fitScore >= 80 ? "Strong" : preview.fitScore >= 60 ? "Moderate" : "Early"} />
                <Metric label="Package" value={preview.recommendedPackage.name} />
                <Metric label="Lead sources" value={String(submission.mainLeadSources.length)} />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#D7E2F7]/78">{preview.recommendedPackage.reason}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <VisualDraftGallery submission={submission} />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <Card className="border-[#8EBBFF]/20 bg-[#0B1024]/78">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquareReply className="size-5 text-[#6F4DFF]" aria-hidden="true" />
              <CardTitle>{preview.receptionistTitle}</CardTitle>
            </div>
            <CardDescription>Sample conversation Envo could start.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {preview.conversation.map((message, index) => (
              <div
                key={`${message.speaker}-${index}`}
                className={cn(
                  "rounded-2xl border p-4 text-sm leading-6",
                  message.speaker === "Customer"
                    ? "border-white/10 bg-white/[0.045] text-[#D7E2F7]/80"
                    : "border-[#6F4DFF]/20 bg-[#6F4DFF]/10 text-[#F8FAFF]"
                )}
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6F4DFF]">{message.speaker}</p>
                {message.message}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#0B1024]/74">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-[#6F4DFF]" aria-hidden="true" />
              <CardTitle>Lead dashboard mockup</CardTitle>
            </div>
            <CardDescription>How new opportunities could be sorted, followed up, and handed off.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {preview.dashboardLeads.map((lead) => (
                <div key={`${lead.name}-${lead.source}`} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{lead.name}</p>
                      <p className="mt-1 text-xs text-[#D7E2F7]/58">{lead.source} - {lead.assignedOwner}</p>
                    </div>
                    <Badge variant={lead.score >= 80 ? "success" : "outline"}>
                      {lead.score >= 80 ? "Priority" : "Review"}
                    </Badge>
                  </div>
                  <div className="mt-4 grid gap-2 text-xs text-[#D7E2F7]/70 sm:grid-cols-4">
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
              <Route className="size-5 text-[#6F4DFF]" aria-hidden="true" />
              <CardTitle>Lead flow map</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-7">
              {preview.leadFlow.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-center">
                  <div className="mx-auto mb-3 flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#328BFF,#6F4DFF)] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-xs leading-5 text-[#EAF1FF]">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-[#6F4DFF]" aria-hidden="true" />
              <CardTitle>Follow-up timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {preview.followUpTimeline.map((item) => (
              <div key={item.time} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                <Badge className="h-fit bg-[#328BFF]/14 text-[#D7E8FF]">{item.time}</Badge>
                <p className="text-sm leading-6 text-[#D7E2F7]/78">{item.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <Card className="border-[#6F4DFF]/20 bg-[#6F4DFF]/10">
          <CardHeader>
            <CardTitle>Value snapshot</CardTitle>
            <CardDescription>{preview.valueSnapshot.text}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs leading-5 text-[#EAF1FF]">{preview.valueSnapshot.disclaimer}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Route className="size-5 text-emerald-300" aria-hidden="true" />
              <CardTitle>Done-for-you build path</CardTitle>
            </div>
            <CardDescription>{preview.approvalNote}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={getEmailHref({
                  subject: `Start my Envo build plan for ${submission.businessName}`,
                  body: emailBody
                })}
                eventName={ANALYTICS_EVENTS.contactClicked}
                eventProperties={{ location: "preview_result", type: "start_build", previewId: submission.id }}
                className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
              >
                Start My Envo Build
                <ArrowRight className="size-4" aria-hidden="true" />
              </TrackedLink>
              <TrackedLink
                href="/demo"
                eventName={ANALYTICS_EVENTS.demoViewed}
                eventProperties={{ location: "preview_result" }}
                className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full border-white/18 bg-white/[0.045] sm:w-auto`}
              >
                View Demo
              </TrackedLink>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function VisualDraftGallery({ submission }: { submission: PublicPreviewSubmission }) {
  const visuals = (submission.previewData.visualDrafts ?? []).filter((visual) => visual.imageUrl);

  if (visuals.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge className="mb-3 bg-[#328BFF]/14 text-[#D7E8FF]">AI visual preview</Badge>
          <h2 className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
            Three draft views of your likely Envo setup.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#D7E2F7]/72">
            Generated from your industry, services, lead sources, bottleneck, and current process. These are concept visuals, not final build screens.
          </p>
        </div>
        <Badge variant="outline">Draft assets</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {visuals.map((visual) => (
          <Card key={visual.id} className="overflow-hidden border-white/10 bg-[#0B1024]/78">
            <div className="aspect-square border-b border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(111,77,255,0.22),transparent_34%),linear-gradient(135deg,#0B1024,#070b15)]">
              {visual.imageUrl ? (
                <Image
                  src={visual.imageUrl}
                  alt={`${submission.businessName} ${visual.title}`}
                  width={1024}
                  height={1024}
                  unoptimized
                  className="size-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center p-6 text-center">
                  <ImageIcon className="mb-4 size-8 text-[#6F4DFF]" aria-hidden="true" />
                  <p className="text-sm font-semibold text-white">{visual.status === "Failed" ? "Visual draft needs regeneration" : "Visual draft pending"}</p>
                  <p className="mt-2 text-xs leading-5 text-[#D7E2F7]/62">
                    The draft record is saved. Image generation will run on new submissions once the image API is available.
                  </p>
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">{visual.title}</CardTitle>
                  <CardDescription>{visual.description}</CardDescription>
                </div>
                <Badge variant={visual.status === "Generated" ? "success" : "outline"}>{visual.status}</Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D7E2F7]/46">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
