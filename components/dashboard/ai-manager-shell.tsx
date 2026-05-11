"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  ClipboardList,
  Copy,
  FileText,
  ImageIcon,
  Mail,
  MessageSquareText,
  Pencil,
  Rocket,
  Send,
  ShieldAlert,
  UserRound
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";
import type { PromptWorkerStatus } from "@/lib/prompt-worker/prompt-types";
import { previewSubmissionStatuses, type PreviewSubmission, type PreviewSubmissionStatus } from "@/lib/preview-types";
import { cn } from "@/lib/utils";

type LegacyEmailDraft = {
  subject: string;
  body: string;
  approvalStatus: string;
};

type DetailItem = {
  label: string;
  value: string;
};

type AdminMutationAction =
  | "generate_prompt"
  | "generate_build_prompt"
  | "set_prompt_status"
  | "set_review_status"
  | "update_internal_notes";

type AdminMutationPayload = {
  action: AdminMutationAction;
  promptStatus?: PromptWorkerStatus;
  status?: PreviewSubmissionStatus;
  ownerApproved?: boolean;
  internalNotes?: string;
};

type AdminMutationResponse = {
  submission?: PreviewSubmission;
  error?: string;
};

export function AiManagerShell({
  submissions,
  persistenceEnabled,
  persistenceWarning
}: {
  submissions: PreviewSubmission[];
  persistenceEnabled: boolean;
  persistenceWarning?: string | null;
}) {
  const [items, setItems] = useState(submissions);
  const [selectedId, setSelectedId] = useState(submissions[0]?.id ?? "");
  const [copiedLabel, setCopiedLabel] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [internalNotesDrafts, setInternalNotesDrafts] = useState<Record<string, string>>({});
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const metrics = useMemo(
    () => ({
      total: items.length,
      needsReview: items.filter((item) => ["New", "Draft Generated", "Needs Review"].includes(item.status)).length,
      avgScore: Math.round(items.reduce((sum, item) => sum + item.managerNotes.fitScore, 0) / Math.max(items.length, 1))
    }),
    [items]
  );

  const report = selected ? getPreviewReport(selected) : null;
  const proposal = selected ? getProposalDraft(selected) : null;
  const emailDraft = selected ? getEmailDraft(selected) : null;
  const submissionDetails = selected ? getSubmissionDetails(selected) : [];
  const promptClassification = selected
    ? selected.managerNotes.promptClassification ?? selected.promptWorkerResult?.classification ?? classifyPreviewIntake(selected)
    : null;
  const promptStatus = selected?.promptStatus ?? selected?.managerNotes.promptStatus ?? "not_generated";
  const promptWorkerResult = selected?.promptWorkerResult ?? selected?.managerNotes.promptWorkerResult;
  const selectedPackage = selected?.selectedPackage ?? selected?.managerNotes.selectedPackage ?? promptClassification?.recommendedPackage;
  const selectedSystemTemplate =
    selected?.selectedSystemTemplate ?? selected?.managerNotes.selectedSystemTemplate ?? promptClassification?.recommendedSystemTemplate;
  const promptArchive = selected?.managerNotes.promptArchive ?? [];
  const buildPromptResult = selected?.managerNotes.buildPromptResult;
  const internalNotesDraft = selected
    ? internalNotesDrafts[selected.id] ?? selected.internalNotes ?? selected.managerNotes.internalNotes ?? ""
    : "";

  async function mutateSubmission(id: string, payload: AdminMutationPayload, successMessage: string) {
    setActionMessage("");
    setPendingAction(payload.action);

    try {
      const response = await fetch(`/api/admin/preview/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as AdminMutationResponse;

      if (!response.ok || !result.submission) {
        throw new Error(result.error ?? "Admin update failed.");
      }

      setItems((current) =>
        current.map((item) => (item.id === result.submission?.id ? result.submission : item))
      );
      setActionMessage(successMessage);
    } catch (error) {
      setActionMessage(error instanceof Error ? error.message : "Admin update failed.");
    } finally {
      setPendingAction(null);
    }
  }

  function updateStatus(id: string, status: PreviewSubmissionStatus, ownerApproved = false) {
    void mutateSubmission(id, { action: "set_review_status", status, ownerApproved }, "Review status saved.");
  }

  function generatePrompt(selectedSubmission: PreviewSubmission) {
    void mutateSubmission(selectedSubmission.id, { action: "generate_prompt" }, "Prompt generated and saved.");
  }

  function setPromptStatus(id: string, status: PromptWorkerStatus) {
    void mutateSubmission(id, { action: "set_prompt_status", promptStatus: status }, "Prompt status saved.");
  }

  function generateBuildPrompt(selectedSubmission: PreviewSubmission) {
    void mutateSubmission(selectedSubmission.id, { action: "generate_build_prompt" }, "Build prompt generated and saved.");
  }

  function saveInternalNotes(selectedSubmission: PreviewSubmission) {
    void mutateSubmission(
      selectedSubmission.id,
      { action: "update_internal_notes", internalNotes: internalNotesDraft },
      "Internal notes saved."
    );
  }

  function updateInternalNotesDraft(id: string, value: string) {
    setInternalNotesDrafts((current) => ({
      ...current,
      [id]: value
    }));
  }

  async function copyPrompt(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLabel(label);
    } catch {
      setCopiedLabel("Copy failed");
    } finally {
      window.setTimeout(() => setCopiedLabel(""), 1800);
    }
  }

  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,111,156,0.14),rgba(6,12,24,0))]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Badge className="mb-5 border border-[#ffb36d]/25 bg-[#ffb36d]/10 text-[#ffe1bd]">
            Internal review
          </Badge>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            SignalOps Free Preview Queue
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#ead0df]/76">
            Review draft preview reports, proposal drafts, and email drafts before anything prospect-facing is sent.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Metric label="Preview submissions" value={String(metrics.total)} />
            <Metric label="Needs review" value={String(metrics.needsReview)} />
            <Metric label="Average fit score" value={`${metrics.avgScore}/100`} />
          </div>
          {persistenceWarning ? (
            <div className="mt-6 rounded-2xl border border-[#ffb36d]/30 bg-[#ffb36d]/10 p-4 text-sm leading-6 text-[#ffe1bd]">
              {persistenceWarning}
            </div>
          ) : persistenceEnabled ? (
            <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
              Supabase persistence is active. Submissions, prompts, notes, and statuses sync across devices.
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Draft queue</CardTitle>
            <CardDescription>Submission records and generated drafts for internal review.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition",
                  selected?.id === item.id
                    ? "border-[#ffb36d]/35 bg-[#ffb36d]/10"
                    : "border-white/10 bg-white/[0.035] hover:border-white/18"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.businessName}</p>
                    <p className="mt-1 text-xs text-[#ead0df]/56">{item.industry} - {item.contactName}</p>
                  </div>
                  <Badge variant={item.managerNotes.fitScore >= 80 ? "success" : "outline"}>{item.managerNotes.fitScore}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#ead0df]/72">{item.managerNotes.prospectSummary}</p>
                <p className="mt-3 text-xs text-[#ffb36d]">{item.status}</p>
              </button>
            ))}
            {items.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-[#ead0df]/70">
                No Free Preview submissions found yet.
              </p>
            ) : null}
          </CardContent>
        </Card>

        {selected ? (
          <div className="grid gap-6">
            <Card className="border-[#ffb36d]/20 bg-[#ffb36d]/8">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle>{selected.businessName}</CardTitle>
                    <CardDescription>{selected.managerNotes.prospectSummary}</CardDescription>
                  </div>
                  <Badge className="bg-[#17122d] text-[#ffe1bd]">{selected.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Metric label="Recommended" value={selected.managerNotes.recommendedPackage} />
                  <Metric label="Fit score" value={`${selected.managerNotes.fitScore}/100`} />
                  <Metric label="Approval" value={selected.ownerApproved ? "Approved" : "Needs review"} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button type="button" disabled={pendingAction !== null} onClick={() => updateStatus(selected.id, "Approved", true)}>
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    Approve Draft
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="secondary" onClick={() => updateStatus(selected.id, "Sent", true)}>
                    <Send className="size-4" aria-hidden="true" />
                    Mark Sent
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="outline" onClick={() => updateStatus(selected.id, "Needs Review")}>
                    <Pencil className="size-4" aria-hidden="true" />
                    Needs Edits
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-300/18 bg-emerald-300/[0.055]">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <MessageSquareText className="size-5 text-emerald-200" aria-hidden="true" />
                      <CardTitle>Prompt Worker</CardTitle>
                    </div>
                    <CardDescription>
                      Generate a complete copy/paste ChatGPT prompt. The app does not call OpenAI or send customer emails.
                    </CardDescription>
                  </div>
                  <Badge className="bg-[#17122d] text-emerald-100">{promptStatus.replaceAll("_", " ")}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <Metric label="System template" value={selectedSystemTemplate ?? "Not classified"} />
                  <Metric label="Prompt package" value={selectedPackage ?? "Not classified"} />
                  <Metric label="Confidence" value={promptClassification ? `${Math.round(promptClassification.confidence * 100)}%` : "n/a"} />
                  <Metric label="Contact allowed" value={promptClassification?.contactAllowed === false ? "false" : "true"} />
                </div>

                <div className="grid gap-3 lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="rounded-2xl border border-white/10 bg-[#17122d]/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">Missing info</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {promptClassification?.missingInfo.length ? (
                        promptClassification.missingInfo.map((item) => (
                          <Badge key={item} variant="outline">{item}</Badge>
                        ))
                      ) : (
                        <Badge className="bg-emerald-300/12 text-emerald-100">No major gaps</Badge>
                      )}
                    </div>
                    {promptClassification?.isTestSubmission || promptClassification?.contactAllowed === false ? (
                      <div className="mt-4 rounded-xl border border-[#ffb36d]/25 bg-[#ffb36d]/10 p-3">
                        <Badge className="bg-[#ffb36d]/20 text-[#ffe1bd]">TEST / DO NOT CONTACT</Badge>
                        <p className="mt-3 text-sm leading-6 text-[#ffe1bd]">
                          contactAllowed = {String(promptClassification.contactAllowed)}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#ead0df]/74">
                          {promptClassification.testReason ?? "The classifier marked this as internal/test only."}
                        </p>
                      </div>
                    ) : null}
                    {promptClassification ? (
                      <p className="mt-4 text-sm leading-6 text-[#ead0df]/74">{promptClassification.reasoning}</p>
                    ) : null}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#17122d]/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">Next action</p>
                    <p className="mt-3 text-sm leading-6 text-[#f2d9e8]">
                      {promptWorkerResult?.nextAction ?? "Click Generate ChatGPT Prompt, paste it into ChatGPT, review the draft output, then update the status manually."}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-[#ead0df]/54">
                      Prompt worker data is saved with this Supabase submission when persistence is configured.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button type="button" disabled={pendingAction !== null} onClick={() => generatePrompt(selected)}>
                    <MessageSquareText className="size-4" aria-hidden="true" />
                    Generate ChatGPT Prompt
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={!promptWorkerResult || pendingAction !== null}
                    onClick={() => promptWorkerResult ? copyPrompt(promptWorkerResult.copyPastePrompt, "Prompt copied") : undefined}
                  >
                    <Copy className="size-4" aria-hidden="true" />
                    Copy Prompt
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="outline" onClick={() => setPromptStatus(selected.id, "pasted_to_chatgpt")}>
                    Mark Prompt Sent to ChatGPT
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="outline" onClick={() => setPromptStatus(selected.id, "preview_drafted")}>
                    Mark Preview Drafted
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="outline" onClick={() => setPromptStatus(selected.id, "sent_to_customer")}>
                    Mark Sent to Customer
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="outline" onClick={() => generateBuildPrompt(selected)}>
                    Mark Paid
                  </Button>
                  <Button type="button" disabled={pendingAction !== null} variant="outline" onClick={() => setPromptStatus(selected.id, "lost")}>
                    Mark Lost
                  </Button>
                </div>

                <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#17122d]/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">Internal notes</p>
                    <Button
                      type="button"
                      variant="secondary"
                      disabled={pendingAction !== null}
                      onClick={() => saveInternalNotes(selected)}
                    >
                      Save Internal Notes
                    </Button>
                  </div>
                  <textarea
                    value={internalNotesDraft}
                    onChange={(event) => updateInternalNotesDraft(selected.id, event.target.value)}
                    placeholder="Add private notes for Dillon. Saved to Supabase when configured."
                    className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-[#080b16] p-4 text-sm leading-6 text-[#ead0df]/82 outline-none placeholder:text-[#ead0df]/36"
                  />
                </div>

                {copiedLabel ? (
                  <p className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">
                    {copiedLabel}
                  </p>
                ) : null}

                {actionMessage ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-[#ead0df]/78">
                    {actionMessage}
                  </p>
                ) : null}

                {promptWorkerResult ? (
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-white">{promptWorkerResult.title}</p>
                      <Badge variant="outline">{promptWorkerResult.recommendedSystemTemplate}</Badge>
                    </div>
                    <textarea
                      readOnly
                      value={promptWorkerResult.copyPastePrompt}
                      className="min-h-[360px] w-full rounded-2xl border border-white/10 bg-[#080b16] p-4 font-mono text-xs leading-5 text-[#ead0df]/82 outline-none"
                    />
                  </div>
                ) : null}

                {buildPromptResult ? (
                  <div className="grid gap-3 rounded-2xl border border-[#ffb36d]/20 bg-[#ffb36d]/10 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">Build Mode Prompt</p>
                        <p className="mt-1 text-sm leading-6 text-[#ead0df]/72">
                          Use this after payment to plan the client system build.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => copyPrompt(buildPromptResult.copyPastePrompt, "Build prompt copied")}
                      >
                        <Copy className="size-4" aria-hidden="true" />
                        Copy Build Prompt
                      </Button>
                    </div>
                    <textarea
                      readOnly
                      value={buildPromptResult.copyPastePrompt}
                      className="min-h-[260px] w-full rounded-2xl border border-white/10 bg-[#080b16] p-4 font-mono text-xs leading-5 text-[#ead0df]/82 outline-none"
                    />
                  </div>
                ) : null}

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-sm font-semibold text-white">Prompt archive</p>
                  {promptArchive.length > 0 ? (
                    <div className="mt-3 grid gap-2">
                      {promptArchive.map((item) => (
                        <button
                          key={`${item.type}-${item.createdAt}`}
                          type="button"
                          onClick={() => copyPrompt(item.prompt, "Archived prompt copied")}
                          className="rounded-xl border border-white/10 bg-[#17122d]/70 p-3 text-left transition hover:border-white/20"
                        >
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="mt-1 text-xs text-[#ead0df]/56">
                            {item.type} - {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm leading-6 text-[#ead0df]/66">
                      No prompts generated for this submission yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <ManagerCard icon={UserRound} title="Submission details">
                <dl className="grid gap-3">
                  {submissionDetails.map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">{item.label}</dt>
                      <dd className="mt-1 text-sm leading-6 text-[#f2d9e8]">{item.value || "Not provided"}</dd>
                    </div>
                  ))}
                </dl>
              </ManagerCard>

              <ManagerCard icon={ShieldAlert} title="Pain points detected">
                <div className="flex flex-wrap gap-2">
                  {selected.managerNotes.painPointsDetected.map((point) => (
                    <Badge key={point} variant="outline">{point}</Badge>
                  ))}
                </div>
              </ManagerCard>

              {selected.previewData.visualDrafts?.length ? (
                <ManagerCard className="lg:col-span-2" icon={ImageIcon} title="AI visual drafts">
                  <div className="grid gap-4 md:grid-cols-3">
                    {selected.previewData.visualDrafts.map((visual) => (
                      <div key={visual.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                        <div className="aspect-square bg-[radial-gradient(circle_at_30%_20%,rgba(255,179,109,0.22),transparent_34%),linear-gradient(135deg,#120d24,#070b15)]">
                          {visual.imageUrl ? (
                            <Image
                              src={visual.imageUrl}
                              alt={`${selected.businessName} ${visual.title}`}
                              width={1024}
                              height={1024}
                              unoptimized
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="flex size-full flex-col items-center justify-center p-5 text-center">
                              <ImageIcon className="mb-3 size-7 text-[#ffb36d]" aria-hidden="true" />
                              <p className="text-sm font-semibold text-white">Visual draft {visual.status.toLowerCase()}</p>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-white">{visual.title}</p>
                            <Badge variant={visual.status === "Generated" ? "success" : "outline"}>{visual.status}</Badge>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-[#ead0df]/66">{visual.description}</p>
                          {visual.error ? (
                            <p className="mt-2 text-xs leading-5 text-red-100/80">{visual.error}</p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </ManagerCard>
              ) : null}

              {report ? (
                <ManagerCard icon={FileText} title="Preview Report draft">
                  <p className="text-sm font-semibold text-white">{report.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[#ead0df]/78">{report.executiveSummary}</p>
                  <ul className="mt-4 grid gap-2">
                    {report.leadFlowFindings.map((finding) => (
                      <li key={finding} className="flex gap-2 text-sm leading-6 text-[#ead0df]/78">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-xl border border-white/10 bg-[#17122d]/70 p-4 text-sm leading-6 text-[#ead0df]/78">
                    {report.responseSystemRecommendation}
                  </p>
                </ManagerCard>
              ) : null}

              {proposal ? (
                <ManagerCard icon={ClipboardList} title="Proposal Draft">
                  <p className="text-sm font-semibold text-white">{proposal.title}</p>
                  <Badge className="mt-3 bg-[#ffb36d]/14 text-[#ffe1bd]">{proposal.recommendedPackage}</Badge>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">Scope</h3>
                  <ul className="mt-3 grid gap-2">
                    {proposal.scope.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-[#ead0df]/78">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">Next steps</h3>
                  <ul className="mt-3 grid gap-2">
                    {proposal.nextSteps.map((item) => (
                      <li key={item} className="text-sm leading-6 text-[#ead0df]/78">{item}</li>
                    ))}
                  </ul>
                </ManagerCard>
              ) : null}

              {emailDraft ? (
                <ManagerCard icon={Mail} title="Email Draft">
                  <p className="text-sm font-semibold text-white">{emailDraft.subject}</p>
                  <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-[#17122d]/70 p-4 text-sm leading-6 text-[#ead0df]/78">
                    {emailDraft.body}
                  </pre>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge className="bg-[#ff6f9c]/14 text-[#ffd7e6]">
                      {emailDraft.approvalStatus}
                    </Badge>
                    {"deliveryStatus" in emailDraft ? (
                      <Badge variant="outline">{emailDraft.deliveryStatus}</Badge>
                    ) : null}
                  </div>
                </ManagerCard>
              ) : null}

              <ManagerCard icon={Rocket} title="Build plan">
                <div className="grid gap-3">
                  {selected.managerNotes.buildPlan.map((phase) => (
                    <div key={phase.phase} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ffb36d]">{phase.phase}</p>
                      <p className="mt-1 text-sm text-[#f2d9e8]">{phase.work}</p>
                    </div>
                  ))}
                </div>
              </ManagerCard>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Status pipeline</CardTitle>
                <CardDescription>Local UI state for now. Real status changes should require admin auth.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {previewSubmissionStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateStatus(selected.id, status)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition",
                      selected.status === status
                        ? "border-[#ffb36d]/45 bg-[#ffb36d]/14 text-[#ffe1bd]"
                        : "border-white/10 bg-white/[0.035] text-[#ead0df]/70 hover:border-white/20"
                    )}
                  >
                    {status}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function getPreviewReport(selected: PreviewSubmission) {
  return selected.managerNotes.previewReport ?? {
    title: `${selected.businessName} Free Preview Report`,
    executiveSummary: selected.managerNotes.prospectSummary,
    leadFlowFindings: selected.previewData.leadFlow,
    responseSystemRecommendation: selected.previewData.recommendedPackage.reason
  };
}

function getProposalDraft(selected: PreviewSubmission) {
  return selected.managerNotes.proposalDraft ?? {
    title: `${selected.previewData.recommendedPackage.name} proposal draft`,
    recommendedPackage: selected.previewData.recommendedPackage.name,
    scope: selected.managerNotes.buildPlan.map((phase) => `${phase.phase}: ${phase.work}`),
    nextSteps: selected.managerNotes.kickoffChecklist
  };
}

function getEmailDraft(selected: PreviewSubmission) {
  const legacy = (selected.managerNotes as typeof selected.managerNotes & { draftEmail?: LegacyEmailDraft }).draftEmail;

  return selected.managerNotes.emailDraft ?? legacy ?? null;
}

function getSubmissionDetails(selected: PreviewSubmission): DetailItem[] {
  return [
    { label: "Contact", value: `${selected.contactName} - ${selected.email}${selected.phone ? ` - ${selected.phone}` : ""}` },
    { label: "Website", value: selected.website },
    { label: "Industry", value: selected.otherIndustry ? `${selected.industry} - ${selected.otherIndustry}` : selected.industry },
    { label: "Main services", value: selected.mainServices || selected.managerNotes.submissionDetails?.mainServices },
    {
      label: "Lead sources",
      value: selected.otherLeadSource
        ? `${selected.mainLeadSources.join(", ")} - Other: ${selected.otherLeadSource}`
        : selected.mainLeadSources.join(", ")
    },
    { label: "Biggest bottleneck", value: selected.currentProblem },
    { label: "Current tools/CRM", value: selected.currentTools || selected.managerNotes.submissionDetails?.currentTools },
    { label: "After a lead comes in", value: selected.leadProcess || selected.managerNotes.submissionDetails?.leadProcess },
    { label: "Anything else", value: selected.notes || selected.managerNotes.submissionDetails?.anythingElse }
  ];
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ead0df]/46">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function ManagerCard({
  icon: Icon,
  title,
  children,
  className
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-[#ffb36d]" aria-hidden="true" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
