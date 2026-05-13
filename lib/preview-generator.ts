import "server-only";

import type {
  PreviewData,
  PreviewIndustry,
  PreviewLeadVolume,
  PreviewManagerNotes,
  PreviewProblem,
  PreviewSubmission,
  PreviewSubmissionInput,
  PreviewVisualDraft
} from "@/lib/preview-types";
import { classifyPreviewIntake } from "@/lib/prompt-worker/intake-classifier";

const serviceExamples: Record<PreviewIndustry, string> = {
  "Mobile fleet wash": "fleet wash plan, dealership lot refresh, or recurring account request",
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
  "Mobile fleet wash": "Owner",
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
  const notes = `${input.notes} ${input.currentTools} ${input.leadProcess} ${input.otherIndustry ?? ""} ${input.otherLeadSource ?? ""}`.toLowerCase();
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
      name: "Custom" as const,
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
      "Start with one clean lead source, fast response, basic intake questions, and simple follow-up reminders.",
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
      speaker: "Envo" as const,
      message:
        `Absolutely - I can help get this started. What service do you need, what city or area are you in, and how soon are you looking to book?`
    },
    {
      speaker: "Customer" as const,
      message: "I am in your service area and hoping to get something scheduled this week."
    },
    {
      speaker: "Envo" as const,
      message:
        `Got it. I will collect a few details from this ${leadSource.toLowerCase()} inquiry and send it to the team with the next step ready.`
    }
  ];
}

function getPainPoints(input: PreviewSubmissionInput) {
  const points = new Set<string>();
  points.add(input.currentProblem);

  if (input.mainLeadSources.includes("Missed calls")) points.add("Missed-call recovery");
  if (input.mainLeadSources.includes("Facebook") || input.mainLeadSources.includes("Instagram")) points.add("DM follow-up");
  if (input.mainLeadSources.includes("Google Business Profile") || input.mainLeadSources.includes("Google LSA")) points.add("Google lead routing");
  if (input.mainLeadSources.includes("Other") && input.otherLeadSource) points.add(`${input.otherLeadSource} intake`);
  if (input.mainLeadSources.length >= 3) points.add("Scattered lead sources");
  if (`${input.notes} ${input.leadProcess}`.toLowerCase().includes("fleet")) points.add("Fleet detail collection");
  if (`${input.notes} ${input.leadProcess}`.toLowerCase().includes("photo")) points.add("Detail collection");

  return [...points].slice(0, 5);
}

function leadNameForIndustry(industry: PreviewIndustry) {
  if (industry === "Mobile fleet wash") return "Fleet wash quote";
  if (industry === "Well / water service") return "No-water service request";
  if (industry === "Med spa") return "Consultation request";
  if (industry === "Insurance agency") return "Policy quote request";
  if (industry === "Law firm") return "New intake request";
  if (industry === "Real estate team") return "Showing request";
  return "New service inquiry";
}

function visualPromptBase(input: PreviewSubmissionInput, previewData: PreviewData) {
  const leadSources = input.mainLeadSources.length > 0 ? input.mainLeadSources.join(", ") : "website forms and phone calls";
  const customLeadSource = input.otherLeadSource ? ` Other lead source: ${input.otherLeadSource}.` : "";
  const customIndustry = input.otherIndustry ? ` Specific industry: ${input.otherIndustry}.` : "";
  const services = input.mainServices || serviceExamples[input.industry];
  const packageName = previewData.recommendedPackage.name;

  return [
    "Create a premium product mockup image for Envo by SignalOpsAI.",
    "Style: polished AI Lead Manager, dark executive UI, crisp cards, subtle glow accents, app-like mobile/product screenshot.",
    "No robots, no people, no fake client logos, no stock photos, no clutter.",
    "Use clean realistic UI panels, charts, message cards, lead status chips, owner alerts, and timeline elements.",
    "Do not rely on tiny unreadable text; use a few short realistic labels only.",
    `Business: ${input.businessName}.`,
    `Industry: ${input.industry}.`,
    customIndustry,
    `Main services: ${services}.`,
    `Lead sources: ${leadSources}.${customLeadSource}`,
    `Primary bottleneck: ${input.currentProblem}.`,
    `Recommended Envo coverage level: ${packageName}.`
  ].join(" ");
}

export function buildPreviewVisualDrafts(
  input: PreviewSubmissionInput,
  previewData: PreviewData
): PreviewVisualDraft[] {
  const base = visualPromptBase(input, previewData);

  return [
    {
      id: "ai-receptionist",
      title: "Envo Lead Manager Interface",
      description: "A lead conversation screen showing Envo's first response, key questions, and priority state.",
      status: "Pending",
      prompt: `${base} Image 1 of 3: show a mobile Envo conversation interface for a new ${input.industry.toLowerCase()} lead. Include a customer inquiry, Envo reply, collected details, priority state, and owner-ready summary card.`
    },
    {
      id: "command-center",
      title: "Lead Command Center",
      description: "A dashboard-style view of new leads, hot opportunities, bookings, sources, and follow-up status.",
      status: "Pending",
      prompt: `${base} Image 2 of 3: show a premium command center dashboard for this business. Include new leads, priority leads, booked jobs, lead sources, response time, follow-up queue, and one top-priority owner alert.`
    },
    {
      id: "handoff-flow",
      title: "Booking Handoff Flow",
      description: "A visual handoff path from lead capture to intake, follow-up, owner alert, and booking next step.",
      status: "Pending",
      prompt: `${base} Image 3 of 3: show an Envo Workbench workflow timeline from lead captured to AI reply, detail intake, missing details follow-up, owner alert, and booking/callback handoff.`
    }
  ];
}

export function generatePreviewData(input: PreviewSubmissionInput): PreviewData {
  const fitScore = calculateFitScore(input);
  const recommendedPackage = recommendPackage(input, fitScore);
  const service = serviceExamples[input.industry];
  const owner = ownerLabels[input.industry];
  const primarySource = input.mainLeadSources[0] ?? "Website form";
  const secondarySource = input.mainLeadSources[1] ?? "Phone calls";
  const painPoints = getPainPoints(input);

  const previewData: PreviewData = {
    headline: `An Envo lead manager preview for ${input.businessName}`,
    subheadline:
      `A personalized mockup of how Envo would answer, collect details, follow up, and hand off leads around your ${input.industry.toLowerCase()} lead flow.`,
    receptionistTitle: `${input.industry} Envo preview`,
    conversation: generateSampleConversation(input),
    dashboardLeads: [
      {
        name: leadNameForIndustry(input.industry),
        source: primarySource,
        urgency: input.currentProblem === "Missed calls" ? "Soon" : "Needs response",
        status: "Ready for handoff",
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
      "Envo responds instantly",
      "Envo collects details",
      "Envo sorts priority",
      "Envo follows up",
      "Priority lead sent to owner/team",
      "Booking handoff/dashboard updated"
    ],
    followUpTimeline: [
      { time: "0 seconds", action: "Envo sends the first helpful reply." },
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
          ? `At $${input.averageJobValue.toLocaleString()} per job, recovering even 1-3 missed leads may cover a large part of Envo's monthly coverage.`
          : "Add an average job value to estimate how many recovered leads could offset Envo's monthly coverage.",
      disclaimer: "Estimates are planning examples only and do not guarantee revenue, bookings, or profit."
    },
    recommendedPackage,
    fitScore,
    painPoints,
    approvalNote:
      "SignalOpsAI turns the Envo map into a practical build path before setup begins."
  };

  return {
    ...previewData,
    visualDrafts: buildPreviewVisualDrafts(input, previewData)
  };
}

export function generateManagerDrafts(
  input: PreviewSubmissionInput,
  previewData: PreviewData,
  previewPath: string
): PreviewManagerNotes {
  const recommendedPackage = previewData.recommendedPackage.name;
  const promptClassification = classifyPreviewIntake(input);
  const sourceSummary = input.mainLeadSources.length > 0 ? input.mainLeadSources.join(", ") : "unknown lead sources";
  const sourceSummaryWithOther = input.otherLeadSource ? `${sourceSummary} (${input.otherLeadSource})` : sourceSummary;
  const industrySummary = input.otherIndustry ? `${input.industry} (${input.otherIndustry})` : input.industry;
  const services = input.mainServices || serviceExamples[input.industry];
  const previewPathNote = previewPath ? `Draft preview path: ${previewPath}` : "Draft preview path pending.";

  return {
    submissionDetails: {
      mainServices: input.mainServices,
      otherIndustry: input.otherIndustry,
      otherLeadSource: input.otherLeadSource,
      currentTools: input.currentTools,
      leadProcess: input.leadProcess,
      anythingElse: input.notes
    },
    prospectSummary:
      `${input.businessName} likely needs faster response across ${sourceSummaryWithOther}. Main bottleneck: ${input.currentProblem.toLowerCase()}. Services: ${services}. Recommended package: ${recommendedPackage}.`,
    fitScore: previewData.fitScore,
    painPointsDetected: previewData.painPoints,
    recommendedPackage,
    previewReport: {
      title: `${input.businessName} Envo Preview Report`,
      executiveSummary:
        `Envo should focus on protecting ${input.businessName}'s lead flow across ${sourceSummaryWithOther}, with special attention to ${input.currentProblem.toLowerCase()}.`,
      leadFlowFindings: [
        `Industry: ${industrySummary}.`,
        `Primary services: ${services}.`,
        `Current lead process: ${input.leadProcess || "Not provided yet."}`,
        `Current tools/CRM: ${input.currentTools || "Not provided."}`,
        `Detected pain points: ${previewData.painPoints.join(", ")}.`
      ],
      responseSystemRecommendation:
        `Build a draft-first Envo AI Lead Manager flow for response, intake, follow-up, booking handoff, and dashboard visibility around ${input.industry.toLowerCase()} inquiries.`
    },
    proposalDraft: {
      title: `${recommendedPackage} proposal draft`,
      recommendedPackage,
      scope: [
        "Envo lead response flow for new inquiries",
        "Lead intake questions based on services and lead sources",
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
      subject: "Your Envo Preview",
      body:
        `Hey ${input.contactName},\n\nI put together a draft Envo Preview for ${input.businessName}. It includes a lead map, Envo build plan, and suggested AI Lead Manager path for your lead flow.\n\n${previewPathNote}\n\nIf it looks useful, we can walk through what should actually be built.\n\n- SignalOps`,
      approvalStatus: "Needs Review",
      deliveryStatus: "Draft only - not sent"
    },
    visualDrafts: previewData.visualDrafts,
    promptStatus: "not_generated",
    selectedPackage: promptClassification.recommendedPackage,
    selectedSystemTemplate: promptClassification.recommendedSystemTemplate,
    internalNotes:
      "Prompt worker has not been generated yet. Use Generate ChatGPT Prompt in the internal manager.",
    kickoffChecklist: [
      "Confirm lead sources",
      "Confirm routing owner/team",
      "Confirm services offered",
      "Confirm intake questions",
      "Confirm booking/handoff process",
      "Confirm follow-up rules",
      "Confirm tone and approval rules",
      "Connect form/email/Supabase/CRM as needed"
    ],
    buildPlan: [
      { phase: "Phase 1", work: "Intake + lead storage" },
      { phase: "Phase 2", work: "Envo response scripts" },
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
      businessName: "RouteWash Mobile Fleet Care",
      contactName: "Jordan",
      email: "jordan@example.com",
      phone: "(555) 010-0142",
      website: "https://example.com",
      industry: "Mobile fleet wash",
      mainServices: "Mobile fleet washing, recurring wash plans, dealership lot refresh, service van washing, and box truck washing",
      mainLeadSources: ["Website form", "Missed calls", "Google Business Profile"],
      currentProblem: "No follow-up",
      currentTools: "Website form, phone calls, Google Business Profile messages, and a spreadsheet",
      leadProcess: "Fleet manager asks for pricing. Owner manually asks for fleet size, vehicle types, locations, frequency, and wash window.",
      averageJobValue: 750,
      monthlyLeadVolume: "21-75",
      notes: "Needs fleet detail collection, recurring account routing, and quote follow-up."
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
    const promptClassification = classifyPreviewIntake(input);

    return {
      ...input,
      id,
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      previewData,
      managerNotes: generateManagerDrafts(input, previewData, getPreviewSharePath(id)),
      status: index === 0 ? "Needs Review" : "Draft Generated",
      ownerApproved: false,
      promptStatus: "not_generated",
      internalNotes: "",
      selectedPackage: promptClassification.recommendedPackage,
      selectedSystemTemplate: promptClassification.recommendedSystemTemplate
    };
  });
}
