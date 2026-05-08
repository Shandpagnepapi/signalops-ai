import "server-only";

import type {
  PreviewData,
  PreviewIndustry,
  PreviewLeadVolume,
  PreviewManagerNotes,
  PreviewProblem,
  PreviewSubmission,
  PreviewSubmissionInput
} from "@/lib/preview-types";

const serviceExamples: Record<PreviewIndustry, string> = {
  "Wheel repair": "curb rash repair or wheel refinishing",
  "Auto repair": "diagnostics, repair, or maintenance",
  "Auto detailing": "detail package or ceramic coating",
  "Tint / wrap shop": "tint, wrap, PPF, or quote request",
  HVAC: "repair, tune-up, or replacement estimate",
  Plumbing: "repair, inspection, or emergency service",
  Electrical: "repair, panel, outlet, or inspection request",
  Roofing: "inspection, repair, or estimate",
  "Well / water service": "well pump, filtration, or water pressure issue",
  "Med spa": "consultation or treatment inquiry",
  "Dental office": "appointment or treatment consultation",
  "Law firm": "new matter intake",
  "Insurance agency": "quote request",
  "Real estate team": "buyer, seller, or showing request",
  "Other local service": "service request"
};

const ownerLabels: Record<PreviewIndustry, string> = {
  "Wheel repair": "Shop owner",
  "Auto repair": "Service advisor",
  "Auto detailing": "Detailing manager",
  "Tint / wrap shop": "Shop manager",
  HVAC: "Dispatcher",
  Plumbing: "Dispatcher",
  Electrical: "Office manager",
  Roofing: "Estimator",
  "Well / water service": "Owner",
  "Med spa": "Front desk",
  "Dental office": "Treatment coordinator",
  "Law firm": "Intake lead",
  "Insurance agency": "Producer",
  "Real estate team": "Lead agent",
  "Other local service": "Owner"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function leadVolumeScore(volume: PreviewLeadVolume) {
  if (volume === "200+") return 18;
  if (volume === "76-200") return 14;
  if (volume === "21-75") return 9;
  if (volume === "0-20") return 3;
  return 5;
}

function isHighFrictionProblem(problem: PreviewProblem) {
  return ["Slow replies", "Missed calls", "Leads forgotten", "No follow-up", "No visibility into lead status", "Too much manual admin"].includes(problem);
}

function hasComplexNotes(input: PreviewSubmissionInput) {
  const notes = `${input.notes} ${input.currentTools} ${input.leadProcess}`.toLowerCase();
  return ["multi-location", "multiple locations", "custom", "routing", "crm", "calendar", "team", "franchise"].some((term) =>
    notes.includes(term)
  );
}

export function calculateFitScore(input: PreviewSubmissionInput) {
  const sourceCount = input.mainLeadSources.length;
  const sourceScore = sourceCount >= 5 ? 18 : sourceCount >= 3 ? 14 : sourceCount >= 2 ? 8 : 3;
  const problemScore = isHighFrictionProblem(input.currentProblem) ? 18 : input.currentProblem === "Bad lead quality" ? 12 : 7;
  const valueScore = input.averageJobValue >= 1500 ? 14 : input.averageJobValue >= 750 ? 10 : input.averageJobValue >= 250 ? 6 : 3;
  const serviceScore = input.industry === "Other local service" ? 4 : 8;
  const notesScore = hasComplexNotes(input) ? 10 : input.notes || input.currentTools || input.leadProcess ? 4 : 0;

  return clamp(34 + sourceScore + problemScore + valueScore + leadVolumeScore(input.monthlyLeadVolume) + serviceScore + notesScore, 0, 100);
}

export function recommendPackage(input: PreviewSubmissionInput, fitScore = calculateFitScore(input)) {
  const sourceCount = input.mainLeadSources.length;

  if (fitScore >= 88 || input.monthlyLeadVolume === "200+" || sourceCount >= 6 || hasComplexNotes(input)) {
    return {
      name: "Custom Agent System" as const,
      reason:
        "Your lead flow looks complex enough to justify custom routing, integrations, approval rules, and reporting.",
      fit: "Complex workflows, larger teams, custom tools, or multi-location operations."
    };
  }

  if (fitScore >= 68 || sourceCount >= 3 || input.monthlyLeadVolume === "76-200" || input.monthlyLeadVolume === "21-75") {
    return {
      name: "Growth" as const,
      reason:
        "You have enough lead activity or follow-up complexity to benefit from multiple sources, dashboard visibility, and repeatable handoffs.",
      fit: "Growing service businesses with calls, forms, DMs, quotes, and follow-up gaps."
    };
  }

  return {
    name: "Starter" as const,
    reason:
      "Start with one clean lead source, fast response, basic qualification, and simple follow-up reminders.",
    fit: "Solo operators or small teams that need a clean first workflow."
  };
}

export function generateSampleConversation(input: PreviewSubmissionInput) {
  const service = serviceExamples[input.industry];
  const leadSource = input.mainLeadSources[0] ?? "Website form";

  return [
    {
      speaker: "Customer" as const,
      message: `Hey, I need a quote for ${service}. Are you available this week?`
    },
    {
      speaker: "SignalOps AI Receptionist" as const,
      message:
        `Absolutely - I can help get this started. What service do you need, what city or area are you in, and how soon are you looking to book?`
    },
    {
      speaker: "Customer" as const,
      message: "I am in your service area and hoping to get something scheduled this week."
    },
    {
      speaker: "SignalOps AI Receptionist" as const,
      message:
        `Got it. I will collect a few details from this ${leadSource.toLowerCase()} inquiry and send it to the team as a qualified lead.`
    }
  ];
}

function getPainPoints(input: PreviewSubmissionInput) {
  const points = new Set<string>();
  points.add(input.currentProblem);

  if (input.mainLeadSources.includes("Missed calls")) points.add("Missed-call recovery");
  if (input.mainLeadSources.includes("Facebook") || input.mainLeadSources.includes("Instagram")) points.add("DM follow-up");
  if (input.mainLeadSources.includes("Google Business Profile") || input.mainLeadSources.includes("Google LSA")) points.add("Google lead routing");
  if (input.mainLeadSources.length >= 3) points.add("Scattered lead sources");
  if (`${input.notes} ${input.leadProcess}`.toLowerCase().includes("photo")) points.add("Photo/detail collection");

  return [...points].slice(0, 5);
}

function leadNameForIndustry(industry: PreviewIndustry) {
  if (industry === "Wheel repair") return "Curb rash quote";
  if (industry === "Well / water service") return "No-water service request";
  if (industry === "Med spa") return "Consultation request";
  if (industry === "Insurance agency") return "Policy quote request";
  if (industry === "Law firm") return "New intake request";
  if (industry === "Real estate team") return "Showing request";
  return "New service inquiry";
}

export function generatePreviewData(input: PreviewSubmissionInput): PreviewData {
  const fitScore = calculateFitScore(input);
  const recommendedPackage = recommendPackage(input, fitScore);
  const service = serviceExamples[input.industry];
  const owner = ownerLabels[input.industry];
  const primarySource = input.mainLeadSources[0] ?? "Website form";
  const secondarySource = input.mainLeadSources[1] ?? "Phone calls";
  const painPoints = getPainPoints(input);

  return {
    headline: `A SignalOps AI lead system for ${input.businessName}`,
    subheadline:
      `A personalized mockup of the AI receptionist, lead dashboard, follow-up flow, and handoff system we would build around your ${input.industry.toLowerCase()} lead flow.`,
    receptionistTitle: `${input.industry} AI receptionist preview`,
    conversation: generateSampleConversation(input),
    dashboardLeads: [
      {
        name: leadNameForIndustry(input.industry),
        source: primarySource,
        urgency: input.currentProblem === "Missed calls" ? "Soon" : "Needs response",
        status: "Qualified",
        score: clamp(fitScore + 4, 0, 100),
        lastResponseTime: "4 sec",
        nextFollowUp: "5 min",
        assignedOwner: owner
      },
      {
        name: `${service} follow-up`,
        source: secondarySource,
        urgency: "Warm",
        status: "Follow-up queued",
        score: clamp(fitScore - 8, 0, 100),
        lastResponseTime: "12 sec",
        nextFollowUp: "1 hour",
        assignedOwner: owner
      },
      {
        name: "Quote/details missing",
        source: input.mainLeadSources[2] ?? "Google Business Profile",
        urgency: "Researching",
        status: "Needs details",
        score: clamp(fitScore - 18, 0, 100),
        lastResponseTime: "28 sec",
        nextFollowUp: "24 hours",
        assignedOwner: owner
      }
    ],
    leadFlow: [
      "Lead comes in",
      "AI responds instantly",
      "AI qualifies",
      "AI follows up",
      "Hot lead sent to owner/team",
      "Booking handoff/dashboard updated"
    ],
    followUpTimeline: [
      { time: "0 seconds", action: "AI receptionist sends the first helpful reply." },
      { time: "5 minutes", action: "Missing detail nudge if the lead has not answered key questions." },
      { time: "1 hour", action: "Follow-up with the next best step, booking link, callback path, or quote reminder." },
      { time: "24 hours", action: "Second follow-up keeps the lead from getting buried." },
      { time: "3 days", action: "Final check-in before the lead is marked quiet or moved to nurture." }
    ],
    valueSnapshot: {
      averageJobValue: input.averageJobValue,
      monthlyLeadVolume: input.monthlyLeadVolume,
      text:
        input.averageJobValue > 0
          ? `At $${input.averageJobValue.toLocaleString()} per job, recovering even 1-3 missed leads may cover a large part of the monthly system.`
          : "Add an average job value to estimate how many recovered leads could offset the monthly system.",
      disclaimer: "Estimates are planning examples only and do not guarantee revenue, bookings, or profit."
    },
    recommendedPackage,
    fitScore,
    painPoints,
    approvalNote:
      "SignalOps drafts the preview report, proposal, and email first. Nothing customer-facing is sent until a human reviews and approves it."
  };
}

export function generateManagerDrafts(
  input: PreviewSubmissionInput,
  previewData: PreviewData,
  previewPath: string
): PreviewManagerNotes {
  const recommendedPackage = previewData.recommendedPackage.name;
  const sourceSummary = input.mainLeadSources.length > 0 ? input.mainLeadSources.join(", ") : "unknown lead sources";
  const services = input.mainServices || serviceExamples[input.industry];
  const previewPathNote = previewPath ? `Draft preview path: ${previewPath}` : "Draft preview path pending.";

  return {
    submissionDetails: {
      mainServices: input.mainServices,
      currentTools: input.currentTools,
      leadProcess: input.leadProcess,
      anythingElse: input.notes
    },
    prospectSummary:
      `${input.businessName} likely needs faster response across ${sourceSummary}. Main bottleneck: ${input.currentProblem.toLowerCase()}. Services: ${services}. Recommended package: ${recommendedPackage}.`,
    fitScore: previewData.fitScore,
    painPointsDetected: previewData.painPoints,
    recommendedPackage,
    previewReport: {
      title: `${input.businessName} Free Preview Report`,
      executiveSummary:
        `SignalOps should focus on protecting ${input.businessName}'s lead flow across ${sourceSummary}, with special attention to ${input.currentProblem.toLowerCase()}.`,
      leadFlowFindings: [
        `Primary services: ${services}.`,
        `Current lead process: ${input.leadProcess || "Not provided yet."}`,
        `Current tools/CRM: ${input.currentTools || "Not provided."}`,
        `Detected pain points: ${previewData.painPoints.join(", ")}.`
      ],
      responseSystemRecommendation:
        `Build a draft-first AI receptionist, qualification, follow-up, booking handoff, and dashboard flow around ${input.industry.toLowerCase()} inquiries.`
    },
    proposalDraft: {
      title: `${recommendedPackage} proposal draft`,
      recommendedPackage,
      scope: [
        "AI receptionist flow for new inquiries",
        "Lead qualification questions based on services and lead sources",
        "Follow-up sequence for no-replies, quote requests, and missing details",
        "Booking or callback handoff path",
        "Internal dashboard view for lead status and next action"
      ],
      nextSteps: [
        "Human review of preview report",
        "Edit proposal language if needed",
        "Approve or revise the email draft",
        "Send preview manually after approval"
      ]
    },
    emailDraft: {
      subject: "Your SignalOps Free Preview",
      body:
        `Hey ${input.contactName},\n\nI put together a draft Free Preview for ${input.businessName}. It includes a preview report, proposal draft, and suggested AI response system for your lead flow.\n\n${previewPathNote}\n\nI reviewed this before sending so we can keep it practical and accurate. If it looks useful, we can walk through what should actually be built.\n\n- SignalOps`,
      approvalStatus: "Needs Review",
      deliveryStatus: "Draft only - not sent"
    },
    kickoffChecklist: [
      "Confirm lead sources",
      "Confirm routing owner/team",
      "Confirm services offered",
      "Confirm qualification questions",
      "Confirm booking/handoff process",
      "Confirm follow-up rules",
      "Confirm tone and approval rules",
      "Connect form/email/Supabase/CRM as needed"
    ],
    buildPlan: [
      { phase: "Phase 1", work: "Intake + lead storage" },
      { phase: "Phase 2", work: "AI receptionist/response scripts" },
      { phase: "Phase 3", work: "Follow-up logic" },
      { phase: "Phase 4", work: "Owner notifications/dashboard" },
      { phase: "Phase 5", work: "Testing" },
      { phase: "Phase 6", work: "Launch" },
      { phase: "Phase 7", work: "Monthly optimization" }
    ]
  };
}

export function getPreviewSharePath(id: string) {
  return `/preview/${id}`;
}

export function createDemoPreviewSubmissions(): PreviewSubmission[] {
  const inputs: PreviewSubmissionInput[] = [
    {
      businessName: "Apex Wheel Repair",
      contactName: "Jordan",
      email: "jordan@example.com",
      phone: "(555) 010-0142",
      website: "https://example.com",
      industry: "Wheel repair",
      mainServices: "Curb rash repair, wheel refinishing, bent wheel triage, cracked wheel review, and mobile repair quotes",
      mainLeadSources: ["Website form", "Missed calls", "Instagram"],
      currentProblem: "No follow-up",
      currentTools: "Website form, phone calls, Instagram DMs, and a spreadsheet",
      leadProcess: "Customer sends a form or message, the shop asks for photos, then the owner reviews and quotes manually.",
      averageJobValue: 260,
      monthlyLeadVolume: "76-200",
      notes: "Needs photo collection, mobile repair routing, and quote follow-up."
    },
    {
      businessName: "ClearFlow Well & Water",
      contactName: "Casey",
      email: "casey@example.com",
      phone: "(555) 010-0199",
      website: "",
      industry: "Well / water service",
      mainServices: "Well pump repairs, filtration, water pressure checks, and emergency no-water calls",
      mainLeadSources: ["Phone calls", "Missed calls", "Text messages"],
      currentProblem: "Leads forgotten",
      currentTools: "Phone, email, and Google Business Profile",
      leadProcess: "Calls come in while the team is in the field, then someone calls back between jobs.",
      averageJobValue: 425,
      monthlyLeadVolume: "21-75",
      notes: "Small team, emergency no-water calls, routine filter changes, occasional commercial projects."
    }
  ];

  return inputs.map((input, index) => {
    const id = `demo-preview-${index + 1}`;
    const previewData = generatePreviewData(input);

    return {
      ...input,
      id,
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      previewData,
      managerNotes: generateManagerDrafts(input, previewData, getPreviewSharePath(id)),
      status: index === 0 ? "Needs Review" : "Draft Generated",
      ownerApproved: false
    };
  });
}
