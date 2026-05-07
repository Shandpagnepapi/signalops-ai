"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, ClipboardList, Mail, Pencil, Rocket, Send, ShieldAlert, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { previewSubmissionStatuses, type PreviewSubmission, type PreviewSubmissionStatus } from "@/lib/preview-types";
import { cn } from "@/lib/utils";

export function AiManagerShell({ submissions }: { submissions: PreviewSubmission[] }) {
  const [items, setItems] = useState(submissions);
  const [selectedId, setSelectedId] = useState(submissions[0]?.id ?? "");
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const metrics = useMemo(
    () => ({
      total: items.length,
      needsReview: items.filter((item) => item.status === "Needs Review" || item.status === "Preview Generated").length,
      avgScore: Math.round(items.reduce((sum, item) => sum + item.managerNotes.fitScore, 0) / Math.max(items.length, 1))
    }),
    [items]
  );

  function updateStatus(id: string, status: PreviewSubmissionStatus, ownerApproved = false) {
    // TODO: Replace this local UI update with an authenticated server mutation once admin auth is installed.
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              ownerApproved: ownerApproved || item.ownerApproved
            }
          : item
      )
    );
  }

  return (
    <div className="overflow-x-hidden">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,111,156,0.14),rgba(6,12,24,0))]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Badge className="mb-5 border border-[#ffb36d]/25 bg-[#ffb36d]/10 text-[#ffe1bd]">
            Internal demo only
          </Badge>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            SignalOps AI Manager
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#ead0df]/76">
            Drafts summaries, replies, kickoff plans, and build recommendations. Nothing prospect-facing sends automatically.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Metric label="Preview submissions" value={String(metrics.total)} />
            <Metric label="Needs review" value={String(metrics.needsReview)} />
            <Metric label="Average fit score" value={`${metrics.avgScore}/100`} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Preview queue</CardTitle>
            <CardDescription>Safe demo records until a real admin auth system is installed.</CardDescription>
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
                  <Metric label="Approval" value={selected.ownerApproved ? "Approved" : "Needs owner approval"} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button type="button" onClick={() => updateStatus(selected.id, "Approved to Send", true)}>
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    Approve Draft
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => updateStatus(selected.id, "Sent")}>
                    <Send className="size-4" aria-hidden="true" />
                    Mark Sent
                  </Button>
                  <Button type="button" variant="outline" onClick={() => updateStatus(selected.id, "Needs Review")}>
                    <Pencil className="size-4" aria-hidden="true" />
                    Edit Draft
                  </Button>
                  <Button type="button" variant="outline" onClick={() => updateStatus(selected.id, "Project Initiated")}>
                    <Rocket className="size-4" aria-hidden="true" />
                    Start Project
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => updateStatus(selected.id, "Lost")}>
                    <XCircle className="size-4" aria-hidden="true" />
                    Mark Lost
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <ManagerCard icon={ShieldAlert} title="Pain points detected">
                <div className="flex flex-wrap gap-2">
                  {selected.managerNotes.painPointsDetected.map((point) => (
                    <Badge key={point} variant="outline">{point}</Badge>
                  ))}
                </div>
              </ManagerCard>

              <ManagerCard icon={Mail} title="Draft reply email">
                <p className="text-sm font-semibold text-white">{selected.managerNotes.draftEmail.subject}</p>
                <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-[#17122d]/70 p-4 text-sm leading-6 text-[#ead0df]/78">
                  {selected.managerNotes.draftEmail.body}
                </pre>
                <Badge className="mt-3 bg-[#ff6f9c]/14 text-[#ffd7e6]">
                  {selected.managerNotes.draftEmail.approvalStatus}
                </Badge>
              </ManagerCard>

              <ManagerCard icon={ClipboardList} title="Kickoff checklist">
                <ul className="grid gap-2">
                  {selected.managerNotes.kickoffChecklist.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-[#ead0df]/78">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ManagerCard>

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
  children
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
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
