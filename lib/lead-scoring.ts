export type LeadStatus = "new" | "reviewing" | "contacted" | "booked" | "closed" | "archived";

export type LeadPriority = "hot" | "warm" | "cold" | "junk";

export type LeadUrgency = "emergency" | "soon" | "researching" | "unknown";

export type QualifiedLeadResult = {
  score: number;
  priority: LeadPriority;
  urgency: LeadUrgency;
  summary: string;
  recommendedAction: string;
  customerReply: string;
  internalNote: string;
  tags: string[];
  confidence: number;
  needsHumanReview: boolean;
};

export type LeadSubmission = {
  id: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  industry: string;
  message: string;
  serviceNeeded: string;
  urgency: string;
  address: string;
  vehicleYearMakeModel: string;
  wheelSize: string;
  damageType: string;
  numberOfWheels: number;
  vehicleDrivable: "yes" | "no" | "unsure" | "";
  needsMobileService: "yes" | "no" | "unsure" | "";
  photoNotes: string;
  preferredTime: string;
  createdAt: string;
  status: LeadStatus;
  tags: string[];
  score: number;
  priority: LeadPriority;
  aiSummary: string;
  recommendedAction: string;
  customerReply: string;
  internalNote: string;
  aiQualification: QualifiedLeadResult;
};

export type LeadSubmissionDraft = Omit<
  LeadSubmission,
  | "id"
  | "createdAt"
  | "status"
  | "tags"
  | "score"
  | "priority"
  | "aiSummary"
  | "recommendedAction"
  | "customerReply"
  | "internalNote"
  | "aiQualification"
> & {
  status?: LeadStatus;
};

export type LeadScoringResult = QualifiedLeadResult;

const intentKeywords = [
  "account",
  "appointment",
  "available",
  "biweekly",
  "book",
  "call",
  "estimate",
  "fleet",
  "follow up",
  "monthly",
  "price",
  "quote",
  "recurring",
  "schedule",
  "this week",
  "today",
  "tomorrow"
];

const urgentKeywords = [
  "asap",
  "emergency",
  "missed",
  "right away",
  "same day",
  "slow",
  "today",
  "urgent"
];

const targetIndustries = [
  "auto",
  "dealership",
  "detail",
  "fleet",
  "fleet wash",
  "home service",
  "hvac",
  "insurance",
  "local service",
  "logistics",
  "med spa",
  "mobile wash",
  "plumb",
  "rental",
  "service business",
  "well",
  "water"
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

function toTag(value: string) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pushTag(tags: string[], value: string) {
  const tag = toTag(value);
  if (tag && !tags.includes(tag)) {
    tags.push(tag);
  }
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function isAuditLead(lead: LeadSubmissionDraft) {
  const text = normalize(`${lead.source} ${lead.serviceNeeded} ${lead.message}`);
  return text.includes("project inquiry") || text.includes("envo preview") || text.includes("checkup") || text.includes("missed lead") || text.includes("audit");
}

function isFleetWashLead(lead: LeadSubmissionDraft) {
  const text = normalize(
    `${lead.source} ${lead.businessName} ${lead.industry} ${lead.serviceNeeded} ${lead.damageType} ${lead.message} ${lead.vehicleYearMakeModel}`
  );
  return (
    text.includes("routewash") ||
    text.includes("fleet") ||
    text.includes("mobile wash") ||
    text.includes("fleet wash") ||
    text.includes("service van") ||
    text.includes("box truck") ||
    text.includes("dealership") ||
    text.includes("rental") ||
    text.includes("logistics")
  );
}

function isWaterLead(lead: LeadSubmissionDraft) {
  const text = normalize(
    `${lead.source} ${lead.businessName} ${lead.industry} ${lead.serviceNeeded} ${lead.damageType} ${lead.message}`
  );
  return (
    text.includes("clearflow") ||
    text.includes("well") ||
    text.includes("water") ||
    text.includes("filter") ||
    text.includes("pump") ||
    text.includes("pressure") ||
    text.includes("filtration")
  );
}

function createSummary(lead: LeadSubmissionDraft, accountReviewNeeded: boolean) {
  const service = lead.serviceNeeded || "a lead response request";
  const business = lead.businessName ? ` for ${lead.businessName}` : "";
  const industry = lead.industry ? ` in ${lead.industry}` : "";
  const contact = lead.phone && lead.email ? "phone and email" : lead.phone ? "phone" : "email";

  if (isFleetWashLead(lead)) {
    const fleetSize = lead.numberOfWheels > 0 ? `${lead.numberOfWheels} vehicle fleet` : "fleet account";
    const vehicleTypes = lead.vehicleYearMakeModel ? ` Vehicle types: ${lead.vehicleYearMakeModel}.` : "";
    const locations = lead.wheelSize ? ` Locations: ${lead.wheelSize}.` : "";
    const review = accountReviewNeeded ? " Owner should review route, timing, and account fit before quoting." : "";
    return `${lead.name} submitted a RouteWash request for ${service} on a ${fleetSize}. Contact is available by ${contact}.${vehicleTypes}${locations}${review}`;
  }

  if (isWaterLead(lead)) {
    const waterService = lead.serviceNeeded || "well or water service";
    const location = lead.address ? ` Service area: ${lead.address}.` : "";
    return `${lead.name} submitted a ClearFlow request for ${waterService}. Contact is available by ${contact}.${location}`;
  }

  if (isAuditLead(lead)) {
    return `${lead.name} submitted an Envo Preview request${business}${industry}. The main issue appears to be ${lead.message || "lead response, intake, routing, or follow-up visibility"}.`;
  }

  return `${lead.name} submitted ${service}${business}${industry}. Contact is available by ${contact}.`;
}

export function scoreLead(lead: LeadSubmissionDraft): LeadScoringResult {
  const tags: string[] = [];
  let score = 28;

  const text = normalize(
    [
      lead.message,
      lead.serviceNeeded,
      lead.urgency,
      lead.industry,
      lead.damageType,
      lead.photoNotes,
      lead.preferredTime,
      lead.vehicleYearMakeModel,
      lead.wheelSize
    ].join(" ")
  );
  const requestText = normalize(`${lead.damageType} ${lead.serviceNeeded} ${lead.message} ${lead.photoNotes} ${lead.preferredTime}`);
  const fleetLead = isFleetWashLead(lead);
  const waterLead = isWaterLead(lead);
  const auditLead = isAuditLead(lead);
  const hasPhone = lead.phone.length > 0;
  const hasEmail = lead.email.length > 0;
  const hasAddress = lead.address.length > 0;
  const hasDetailedMessage = `${lead.message} ${lead.photoNotes}`.trim().length >= 48;
  const isRecurring =
    requestText.includes("recurring") ||
    requestText.includes("biweekly") ||
    requestText.includes("monthly") ||
    requestText.includes("weekly");
  const isLargeFleet = fleetLead && lead.numberOfWheels >= 25;
  const multiLocation = fleetLead && (lead.wheelSize.includes("2") || lead.wheelSize.includes("3") || requestText.includes("multiple"));
  const afterHours = fleetLead && (lead.needsMobileService === "yes" || requestText.includes("after-hours") || requestText.includes("weeknight"));
  const dealershipOrRental =
    fleetLead && (requestText.includes("dealership") || requestText.includes("rental") || requestText.includes("lot"));
  const accountReviewNeeded = fleetLead && (isLargeFleet || multiLocation || afterHours || dealershipOrRental);

  const noWaterIssue =
    waterLead &&
    (requestText.includes("no water") ||
      text.includes("no water") ||
      lead.damageType.includes("emergency-no-water") ||
      normalize(lead.urgency).includes("no water"));
  const majorPressureIssue = waterLead && (requestText.includes("pressure") || text.includes("pressure")) && lead.vehicleDrivable !== "yes";
  const commercialWaterLead =
    waterLead &&
    (requestText.includes("commercial") ||
      requestText.includes("industrial") ||
      requestText.includes("large project") ||
      text.includes("commercial") ||
      text.includes("industrial"));
  const routineWaterMaintenance =
    waterLead &&
    (requestText.includes("filter") ||
      requestText.includes("maintenance") ||
      requestText.includes("testing") ||
      requestText.includes("quality") ||
      text.includes("routine"));

  pushTag(tags, lead.source || "website");

  if (auditLead) {
    pushTag(tags, "project-inquiry");
    score += 14;
  }

  if (fleetLead) {
    pushTag(tags, "fleet-wash");
    score += 12;
  }

  if (waterLead) {
    pushTag(tags, "well-water-service");
    score += 10;
  }

  if (hasEmail) {
    score += 7;
  }

  if (hasPhone) {
    score += 13;
  } else {
    pushTag(tags, "phone-missing");
    score -= 8;
  }

  if (lead.businessName) {
    score += 7;
  }

  if (lead.website) {
    score += 4;
  }

  if (hasAddress) {
    score += 6;
    pushTag(tags, "location-provided");
  }

  if (targetIndustries.some((industry) => normalize(lead.industry).includes(industry))) {
    score += 8;
    pushTag(tags, "target-industry");
  }

  if (lead.serviceNeeded) {
    score += 7;
  }

  if (hasDetailedMessage) {
    score += 9;
    pushTag(tags, "detailed-intake");
  } else {
    score -= 5;
    pushTag(tags, "details-needed");
  }

  const matchedIntent = intentKeywords.filter((keyword) => text.includes(keyword));
  if (matchedIntent.length > 0) {
    score += Math.min(20, matchedIntent.length * 5);
    pushTag(tags, "high-intent");
  }

  if (hasAny(text, urgentKeywords) || normalize(lead.urgency).includes("urgent")) {
    score += 12;
    pushTag(tags, "fast-response");
  }

  if (fleetLead) {
    if (lead.vehicleYearMakeModel) {
      score += 7;
      pushTag(tags, "vehicle-types-provided");
    }

    if (lead.wheelSize) {
      score += 5;
      pushTag(tags, "locations-provided");
    }

    if (lead.photoNotes) {
      score += 6;
      pushTag(tags, "site-notes-provided");
    }

    if (lead.numberOfWheels >= 10) {
      score += 8;
      pushTag(tags, "fleet-account");
    }

    if (lead.numberOfWheels >= 25) {
      score += 12;
      pushTag(tags, "recurring-account-opportunity");
    }

    if (lead.numberOfWheels >= 50) {
      score += 8;
      pushTag(tags, "large-account-review");
    }

    if (isRecurring) {
      score += 14;
      pushTag(tags, "recurring-plan");
    }

    if (multiLocation) {
      score += 8;
      pushTag(tags, "multi-location");
    }

    if (afterHours) {
      score += 6;
      pushTag(tags, "after-hours-window");
    }

    if (dealershipOrRental) {
      score += 10;
      pushTag(tags, "commercial-account");
    }

    if (accountReviewNeeded) {
      pushTag(tags, "owner-handoff");
    }
  }

  if (waterLead) {
    if (lead.vehicleYearMakeModel) {
      score += 5;
      pushTag(tags, "system-details");
    }

    if (lead.wheelSize) {
      score += 4;
      pushTag(tags, "system-type-provided");
    }

    if (lead.photoNotes) {
      score += 6;
      pushTag(tags, "notes-provided");
    }

    if (noWaterIssue) {
      score += 24;
      pushTag(tags, "no-water");
      pushTag(tags, "urgent-callback");
    }

    if (majorPressureIssue) {
      score += 16;
      pushTag(tags, "pressure-issue");
      pushTag(tags, "urgent-callback");
    }

    if (commercialWaterLead) {
      score += 20;
      pushTag(tags, "commercial-review");
      pushTag(tags, "owner-route");
      pushTag(tags, "high-value-opportunity");
    }

    if (routineWaterMaintenance) {
      score += 9;
      pushTag(tags, "maintenance-lead");
    }

    if (lead.needsMobileService === "yes") {
      score += 5;
      pushTag(tags, "on-site-service");
    }
  }

  if (!hasPhone && !hasDetailedMessage) {
    score -= 12;
    pushTag(tags, "low-confidence");
    pushTag(tags, "staff-handoff");
  }

  const normalizedScore = Math.max(5, Math.min(score, 100));
  const needsHumanReview =
    (!hasPhone && !hasDetailedMessage) ||
    (fleetLead && accountReviewNeeded) ||
    (waterLead && (noWaterIssue || majorPressureIssue || commercialWaterLead)) ||
    (!hasEmail && !hasPhone);
  const priority: LeadPriority =
    !hasPhone && !hasDetailedMessage
      ? "junk"
      : fleetLead && (isLargeFleet || isRecurring || dealershipOrRental)
        ? "hot"
        : waterLead && (noWaterIssue || commercialWaterLead || majorPressureIssue)
          ? "hot"
          : normalizedScore >= 82
            ? "hot"
            : normalizedScore >= 55
              ? "warm"
              : normalizedScore >= 30
                ? "cold"
                : "junk";
  const urgency =
    waterLead && (noWaterIssue || majorPressureIssue)
      ? "emergency"
      : hasAny(text, urgentKeywords) || normalize(lead.urgency).includes("urgent")
        ? "emergency"
        : matchedIntent.length > 0 || normalize(lead.preferredTime).includes("today") || normalize(lead.preferredTime).includes("tomorrow")
          ? "soon"
          : hasDetailedMessage
            ? "researching"
            : "unknown";
  const confidence = Math.max(
    0.25,
    Math.min(
      0.94,
      0.38 +
        (hasPhone ? 0.12 : 0) +
        (hasEmail ? 0.1 : 0) +
        (hasDetailedMessage ? 0.16 : 0) +
        (lead.serviceNeeded ? 0.08 : 0) +
        (fleetLead && lead.numberOfWheels > 0 ? 0.08 : 0) +
        (fleetLead && hasAddress ? 0.05 : 0) +
        (waterLead && hasAddress ? 0.06 : 0) +
        (lead.businessName ? 0.05 : 0)
    )
  );

  const name = firstName(lead.name);
  const aiSummary = createSummary(lead, accountReviewNeeded);

  const recommendedAction = (() => {
    if (needsHumanReview && priority === "junk") {
      return "Request the missing contact details and ask one specific intake question before routing to sales.";
    }

    if (fleetLead && accountReviewNeeded) {
      return "Confirm service area, vehicle mix, locations, service frequency, preferred wash window, water access, and site requirements before sending the fleet quote path.";
    }

    if (fleetLead) {
      return "Send a helpful reply, collect missing fleet details, and place the opportunity into quote follow-up with an owner-ready summary.";
    }

    if (waterLead && noWaterIssue) {
      return "Prioritize callback, confirm address, ask whether the property has any water currently, and gather pump, pressure tank, and filtration details.";
    }

    if (waterLead && commercialWaterLead) {
      return "Route to the owner for review and collect site location, project scope, current system details, timeline, and decision-maker contact information.";
    }

    if (waterLead && routineWaterMaintenance) {
      return "Offer an available service window, ask about system type and last service date, and place the customer into maintenance follow-up.";
    }

    if (auditLead) {
      return "Review package interest, lead sources, current tools, response process, routing needs, and follow-up gaps before recommending the next project step.";
    }

    if (priority === "hot") {
      return "Route to immediate follow-up, send a confirmation message, and offer the next clear booking step.";
    }

    return "Send a helpful reply, ask for missing context, and place the lead into a short follow-up sequence.";
  })();

  const customerReply = (() => {
    if (fleetLead) {
      return `Thanks ${name}, RouteWash received your fleet wash request. Can you confirm fleet size, vehicle types, service locations, desired frequency, preferred wash window, and any site requirements we should know before preparing the quote path?`;
    }

    if (waterLead && noWaterIssue) {
      return `Thanks ${name} for reaching out. No-water issues can be urgent. Can you confirm your address and whether this is a well pump issue, pressure issue, or filtration system issue? We'll review this and get you pointed in the right direction.`;
    }

    if (waterLead && commercialWaterLead) {
      return `Thanks ${name} for reaching out. For commercial or larger water system projects, we'll need a few details about the site, current system, issue, and timeline. Someone from the team will review this and follow up.`;
    }

    if (waterLead && routineWaterMaintenance) {
      return `Thanks ${name}. We can help with routine filter replacement and water system maintenance. What type of system do you have, and when was it last serviced?`;
    }

    if (waterLead) {
      return `Thanks ${name}, ClearFlow received your water service request. We'll review the details and follow up with the best next step.`;
    }

    if (auditLead) {
      return `Thanks ${name}, SignalOpsAI received your Envo Preview details. We'll review your lead flow, tools, package interest, and timeline, then reply with the best next step.`;
    }

    return `Thanks ${name}, we received your request. We'll review the details and follow up with the best next step.`;
  })();

  const internalNote = (() => {
    const contactNote = hasPhone ? "Phone is available for fast follow-up." : "Phone is missing; ask for a callback number.";

    if (fleetLead) {
      return `${contactNote} RouteWash account lead. Confirm fleet size, vehicle types, locations, frequency, preferred wash window, water access, and site requirements. Tags: ${tags.join(", ")}.`;
    }

    if (waterLead && noWaterIssue) {
      return `${contactNote} Possible urgent no-water issue. Prioritize callback. Get address, pump/system details, and whether property has any water currently. Tags: ${tags.join(", ")}.`;
    }

    if (waterLead && commercialWaterLead) {
      return `${contactNote} Potential commercial project. Route to owner for review. Gather scope, location, timeline, and decision-maker info. Tags: ${tags.join(", ")}.`;
    }

    if (waterLead && routineWaterMaintenance) {
      return `${contactNote} Routine filter replacement or maintenance lead. Offer available service window and ask about system type. Tags: ${tags.join(", ")}.`;
    }

    if (waterLead) {
      return `${contactNote} Water service lead. Confirm issue, address, service timing, and whether owner review is needed. Tags: ${tags.join(", ")}.`;
    }

    if (auditLead) {
      return `${contactNote} Project review should focus on package fit, lead sources, tools, routing, follow-up, timeline, and the simplest build path. Tags: ${tags.join(", ")}.`;
    }

    return `${contactNote} Review message quality and route according to score. Tags: ${tags.join(", ")}.`;
  })();

  return {
    tags,
    score: normalizedScore,
    priority,
    urgency,
    summary: aiSummary,
    recommendedAction,
    customerReply,
    internalNote,
    confidence: Number(confidence.toFixed(2)),
    needsHumanReview
  };
}
