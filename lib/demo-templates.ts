export const preferredTones = ["professional", "friendly", "luxury", "urgent", "local"] as const;

export type PreferredTone = (typeof preferredTones)[number];

export const industryIds = [
  "roofing",
  "hvac",
  "plumbing",
  "electrical",
  "med-spa",
  "dental",
  "law-firm",
  "insurance-agency",
  "real-estate-team",
  "auto-shop",
  "general-local-service"
] as const;

export type IndustryId = (typeof industryIds)[number];

export type TemplatePackage = "Starter" | "Growth" | "Custom Agent System";

export type DemoTemplate = {
  id: IndustryId;
  label: string;
  serviceNoun: string;
  customerMoment: string;
  leadProblemAngle: string;
  defaultServices: string[];
  intakeQuestions: string[];
  scoringRules: {
    label: string;
    rule: string;
    impact: string;
  }[];
  followUpSequence: {
    timing: string;
    message: string;
    goal: string;
  }[];
  dashboardCards: {
    label: string;
    value: string;
    note: string;
  }[];
  recommendedAutomations: string[];
  beforeAfter: {
    before: string;
    after: string;
  }[];
  packageBias: TemplatePackage;
};

const sharedFollowUp = [
  {
    timing: "Immediately",
    message: "Confirm the request, set expectations, and ask for the missing detail needed to qualify the lead.",
    goal: "Protect speed-to-lead while intent is fresh."
  },
  {
    timing: "Day 1",
    message: "Follow up with a short reminder and one clear next step.",
    goal: "Recover prospects who got busy or were comparing options."
  },
  {
    timing: "Day 3",
    message: "Send a value-based follow-up tied to the customer's stated problem.",
    goal: "Keep qualified leads warm without sounding pushy."
  },
  {
    timing: "Day 7",
    message: "Offer a final booking or estimate path and ask whether timing changed.",
    goal: "Close the loop or move the lead into nurture."
  }
] satisfies DemoTemplate["followUpSequence"];

export const demoTemplates: Record<IndustryId, DemoTemplate> = {
  roofing: {
    id: "roofing",
    label: "Roofing",
    serviceNoun: "roofing project",
    customerMoment: "A homeowner notices a leak, storm damage, missing shingles, or an aging roof and wants a fast inspection path.",
    leadProblemAngle: "Roofing leads often arrive after storms, after hours, or through paid ads where speed and trust matter.",
    defaultServices: ["Roof inspections", "Storm damage repair", "Roof replacement", "Emergency leak response"],
    intakeQuestions: [
      "What roofing issue are you seeing?",
      "Is there active leaking or interior water damage?",
      "What is the property address and roof type?",
      "Was this related to a recent storm or insurance claim?",
      "When would you like an inspection?"
    ],
    scoringRules: [
      { label: "Active leak", rule: "Customer mentions active water intrusion or ceiling damage.", impact: "+25 urgency" },
      { label: "Insurance/storm", rule: "Lead mentions hail, wind, or an insurance claim.", impact: "+15 value" },
      { label: "Inspection timing", rule: "Customer asks for a specific inspection window.", impact: "+15 intent" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Storm leads", value: "18", note: "Need inspection routing" },
      { label: "Active leaks", value: "5", note: "Owner alert required" },
      { label: "Inspection pending", value: "11", note: "Calendar follow-up" }
    ],
    recommendedAutomations: [
      "Storm-damage lead triage",
      "Missed-call text back",
      "Inspection booking follow-up",
      "Insurance-claim intake notes"
    ],
    beforeAfter: [
      { before: "Storm leads sit in voicemail and generic forms.", after: "Urgent leaks are flagged and routed for fast inspection." },
      { before: "Reps ask the same claim and property questions manually.", after: "LeadOps captures claim context before handoff." }
    ],
    packageBias: "Growth"
  },
  hvac: {
    id: "hvac",
    label: "HVAC",
    serviceNoun: "HVAC service request",
    customerMoment: "A homeowner has no cooling, no heat, poor airflow, or wants a system replacement quote.",
    leadProblemAngle: "HVAC leads split between emergency service, maintenance, and high-value replacement estimates.",
    defaultServices: ["AC repair", "Heating repair", "Maintenance plans", "System replacement"],
    intakeQuestions: [
      "Is this heating, cooling, maintenance, or replacement?",
      "Is the system working at all right now?",
      "What brand, age, or size is the unit if known?",
      "What is the service address?",
      "Do you need same-day help or a scheduled estimate?"
    ],
    scoringRules: [
      { label: "No cooling/no heat", rule: "Customer says system is out during uncomfortable weather.", impact: "+25 urgency" },
      { label: "Replacement language", rule: "Customer asks about a new unit, estimate, or financing.", impact: "+20 value" },
      { label: "Maintenance only", rule: "Routine tune-up with flexible timing.", impact: "Standard priority" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Emergency service", value: "7", note: "Dispatch queue" },
      { label: "Replacement quotes", value: "4", note: "Sales rep follow-up" },
      { label: "Maintenance leads", value: "13", note: "Nurture sequence" }
    ],
    recommendedAutomations: [
      "No-cooling/no-heat triage",
      "After-hours response",
      "Estimate booking link",
      "Maintenance plan follow-up"
    ],
    beforeAfter: [
      { before: "Emergency requests and maintenance questions share one inbox.", after: "Service emergencies route faster than low-urgency requests." },
      { before: "Replacement leads wait for a callback.", after: "High-value estimate requests get rep alerts and booking prompts." }
    ],
    packageBias: "Growth"
  },
  plumbing: {
    id: "plumbing",
    label: "Plumbing",
    serviceNoun: "plumbing service request",
    customerMoment: "A customer has a leak, clog, water heater issue, sewer concern, or remodel question.",
    leadProblemAngle: "Plumbing inquiries need fast triage because emergencies and routine quotes look similar at first glance.",
    defaultServices: ["Leak repair", "Drain cleaning", "Water heaters", "Sewer line inspection"],
    intakeQuestions: [
      "What plumbing issue are you experiencing?",
      "Is water actively leaking or backing up?",
      "Is the main water shut off?",
      "What is the service address?",
      "Do you need emergency service or a scheduled visit?"
    ],
    scoringRules: [
      { label: "Active leak", rule: "Lead mentions water actively leaking or damage spreading.", impact: "+30 urgency" },
      { label: "Sewer backup", rule: "Customer mentions sewage, backup, or unusable fixtures.", impact: "+25 urgency" },
      { label: "Water heater quote", rule: "Lead asks for replacement, install, or availability.", impact: "+15 value" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Emergency queue", value: "6", note: "Call now" },
      { label: "Quote requests", value: "9", note: "Need estimate path" },
      { label: "No response", value: "3", note: "Follow-up active" }
    ],
    recommendedAutomations: [
      "Emergency plumbing triage",
      "Missed-call text back",
      "Service address capture",
      "Estimate reminder sequence"
    ],
    beforeAfter: [
      { before: "Every plumbing inquiry gets the same response.", after: "Leaks and backups are escalated quickly." },
      { before: "Dispatch lacks context before calling.", after: "The team sees issue, urgency, address, and next step." }
    ],
    packageBias: "Growth"
  },
  electrical: {
    id: "electrical",
    label: "Electrical",
    serviceNoun: "electrical service request",
    customerMoment: "A customer needs troubleshooting, panel work, EV charger installation, lighting, or an urgent safety check.",
    leadProblemAngle: "Electrical leads need careful routing because safety issues, installs, and estimates require different handling.",
    defaultServices: ["Panel upgrades", "EV charger installation", "Electrical troubleshooting", "Lighting installation"],
    intakeQuestions: [
      "What electrical issue or project do you need help with?",
      "Is there sparking, burning smell, or power loss?",
      "Is this residential or commercial?",
      "What is the service address?",
      "Do you need troubleshooting, installation, or an estimate?"
    ],
    scoringRules: [
      { label: "Safety language", rule: "Sparking, burning smell, outage, or exposed wiring.", impact: "+30 urgency" },
      { label: "Install project", rule: "EV charger, panel, generator, or lighting install.", impact: "+18 value" },
      { label: "Commercial context", rule: "Business location or operational downtime mentioned.", impact: "+15 value" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Safety alerts", value: "4", note: "Human review" },
      { label: "Install quotes", value: "8", note: "Estimator routing" },
      { label: "Commercial leads", value: "3", note: "Priority follow-up" }
    ],
    recommendedAutomations: [
      "Safety-risk escalation",
      "Install quote qualification",
      "Estimator appointment routing",
      "Commercial lead tagging"
    ],
    beforeAfter: [
      { before: "Safety issues are buried in general requests.", after: "Risky language triggers fast human review." },
      { before: "Install quotes lack scope before callback.", after: "LeadOps captures project type, property, and timing." }
    ],
    packageBias: "Growth"
  },
  "med-spa": {
    id: "med-spa",
    label: "Med spa",
    serviceNoun: "consultation request",
    customerMoment: "A prospect is asking about treatments, pricing, consultation availability, or whether they are a good fit.",
    leadProblemAngle: "Med spa leads need fast response, tasteful education, and human review for sensitive or clinical questions.",
    defaultServices: ["Injectables", "Laser treatments", "Skin consultations", "Body contouring"],
    intakeQuestions: [
      "Which treatment are you interested in?",
      "Have you had this treatment before?",
      "What outcome are you hoping for?",
      "When would you like to schedule a consultation?",
      "What is your preferred contact method?"
    ],
    scoringRules: [
      { label: "Consult intent", rule: "Customer asks for consultation or availability.", impact: "+20 intent" },
      { label: "Treatment specificity", rule: "Lead names a specific service or concern.", impact: "+15 quality" },
      { label: "Clinical uncertainty", rule: "Medical, adverse reaction, or suitability questions.", impact: "Human review" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Consult requests", value: "14", note: "Booking ready" },
      { label: "Treatment interest", value: "9", note: "Education follow-up" },
      { label: "Human review", value: "2", note: "Clinical context" }
    ],
    recommendedAutomations: [
      "Consultation intake",
      "Treatment interest routing",
      "No-book follow-up",
      "Human review for sensitive questions"
    ],
    beforeAfter: [
      { before: "Treatment inquiries get slow or generic replies.", after: "Prospects receive fast, tasteful consultation next steps." },
      { before: "Sensitive questions risk being mishandled.", after: "Uncertain cases route to trained staff." }
    ],
    packageBias: "Growth"
  },
  dental: {
    id: "dental",
    label: "Dental",
    serviceNoun: "dental appointment request",
    customerMoment: "A patient needs an appointment, emergency visit, cosmetic consult, implant consult, or insurance guidance.",
    leadProblemAngle: "Dental leads need fast booking paths while separating urgent pain from routine or cosmetic inquiries.",
    defaultServices: ["Emergency dental", "Cleaning appointments", "Cosmetic dentistry", "Implant consultations"],
    intakeQuestions: [
      "What type of dental visit do you need?",
      "Are you experiencing pain, swelling, or a broken tooth?",
      "Are you a new or existing patient?",
      "Do you have a preferred appointment window?",
      "Do you have insurance you would like the office to note?"
    ],
    scoringRules: [
      { label: "Pain or swelling", rule: "Urgent symptoms or broken tooth mentioned.", impact: "+25 urgency" },
      { label: "Cosmetic consult", rule: "Veneers, whitening, implants, or smile makeover language.", impact: "+20 value" },
      { label: "Booking language", rule: "Lead asks for availability or appointment time.", impact: "+15 intent" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Urgent patients", value: "3", note: "Call priority" },
      { label: "Consults", value: "7", note: "Coordinator follow-up" },
      { label: "Booking pending", value: "10", note: "Reminder sequence" }
    ],
    recommendedAutomations: [
      "Emergency dental triage",
      "Appointment request handling",
      "Cosmetic consult routing",
      "Insurance note capture"
    ],
    beforeAfter: [
      { before: "Urgent and routine requests share one queue.", after: "Pain, swelling, and broken teeth get priority handling." },
      { before: "Consult leads wait for office hours.", after: "High-value consults get fast booking prompts." }
    ],
    packageBias: "Growth"
  },
  "law-firm": {
    id: "law-firm",
    label: "Law firm",
    serviceNoun: "legal consultation request",
    customerMoment: "A potential client needs a consultation, case review, deadline guidance, or help understanding whether the firm is a fit.",
    leadProblemAngle: "Legal leads require careful intake, conflict-aware handoff, and clear disclaimers before an attorney reviews details.",
    defaultServices: ["Consultation requests", "Case intake", "Document review", "Urgent deadline triage"],
    intakeQuestions: [
      "What type of legal matter is this?",
      "Are there any upcoming deadlines, court dates, or notices?",
      "What city/state is the matter in?",
      "Have you already hired or spoken with another attorney?",
      "What is the best way for the firm to contact you?"
    ],
    scoringRules: [
      { label: "Deadline risk", rule: "Court date, demand letter, deadline, arrest, injury, or notice mentioned.", impact: "+25 urgency" },
      { label: "Practice fit", rule: "Lead matches target practice area.", impact: "+20 quality" },
      { label: "Insufficient details", rule: "Vague legal issue or missing contact info.", impact: "Human review" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Urgent matters", value: "5", note: "Attorney review" },
      { label: "Practice-fit leads", value: "12", note: "Intake team" },
      { label: "Conflict/check needed", value: "4", note: "Human review" }
    ],
    recommendedAutomations: [
      "Practice-area intake",
      "Deadline flagging",
      "Consultation booking handoff",
      "Human review for uncertain matters"
    ],
    beforeAfter: [
      { before: "Potential clients leave long messages with no structured intake.", after: "The firm receives matter type, urgency, location, and contact context." },
      { before: "Automation risks sounding like legal advice.", after: "LeadOps keeps replies practical and routes legal judgment to humans." }
    ],
    packageBias: "Custom Agent System"
  },
  "insurance-agency": {
    id: "insurance-agency",
    label: "Insurance agency",
    serviceNoun: "insurance quote request",
    customerMoment: "A shopper wants a quote for auto, home, business, life, or renewal comparison.",
    leadProblemAngle: "Insurance shoppers often contact multiple agencies, so speed, routing, and consistent follow-up matter.",
    defaultServices: ["Auto insurance", "Home insurance", "Business insurance", "Life insurance"],
    intakeQuestions: [
      "What type of insurance quote do you need?",
      "When do you need coverage to start?",
      "Are you currently insured?",
      "What is the best contact method?",
      "Do you want the agency to review bundled options?"
    ],
    scoringRules: [
      { label: "Start date", rule: "Coverage needed today, this week, or before renewal.", impact: "+20 urgency" },
      { label: "Bundle interest", rule: "Home + auto or business package mentioned.", impact: "+18 value" },
      { label: "Producer route", rule: "Line of business is clear.", impact: "+15 quality" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Quote shoppers", value: "21", note: "Fast follow-up" },
      { label: "Bundle leads", value: "8", note: "High value" },
      { label: "Renewal timing", value: "6", note: "Date-based reminders" }
    ],
    recommendedAutomations: [
      "Quote request text-back",
      "Line-of-business routing",
      "Producer alerts",
      "Renewal date follow-up"
    ],
    beforeAfter: [
      { before: "Quote shoppers wait while they compare agencies.", after: "The agency responds quickly and collects coverage context." },
      { before: "Producers get incomplete notes.", after: "Each lead arrives with line, timing, and follow-up status." }
    ],
    packageBias: "Growth"
  },
  "real-estate-team": {
    id: "real-estate-team",
    label: "Real estate team",
    serviceNoun: "real estate lead",
    customerMoment: "A buyer, seller, investor, or relocation lead asks about timing, property goals, budget, or availability.",
    leadProblemAngle: "Real estate leads need speed-to-lead, qualification, agent routing, and long-term nurture.",
    defaultServices: ["Buyer consultation", "Seller consultation", "Home valuation", "Relocation support"],
    intakeQuestions: [
      "Are you buying, selling, investing, or relocating?",
      "What city or neighborhood are you focused on?",
      "What is your target timeline?",
      "Do you already have financing or a listing plan?",
      "Would you like to schedule a call with an agent?"
    ],
    scoringRules: [
      { label: "Timeline", rule: "Lead wants to act within 0-90 days.", impact: "+25 intent" },
      { label: "Seller lead", rule: "Customer asks about valuation or listing.", impact: "+20 value" },
      { label: "Research stage", rule: "No timeline or generic browsing language.", impact: "Nurture" }
    ],
    followUpSequence: [
      ...sharedFollowUp,
      {
        timing: "Day 30",
        message: "Send a market check-in tied to their neighborhood or property goal.",
        goal: "Keep long-cycle buyers and sellers warm."
      }
    ],
    dashboardCards: [
      { label: "Hot buyers", value: "6", note: "Agent alert" },
      { label: "Seller consults", value: "4", note: "High value" },
      { label: "Nurture leads", value: "37", note: "Long-term follow-up" }
    ],
    recommendedAutomations: [
      "Buyer/seller qualification",
      "Agent routing",
      "Home valuation follow-up",
      "Long-term nurture sequence"
    ],
    beforeAfter: [
      { before: "Portal leads sit too long and go cold.", after: "Hot buyers and sellers are routed fast." },
      { before: "Long-term leads disappear.", after: "Research-stage prospects enter nurture with useful follow-up." }
    ],
    packageBias: "Growth"
  },
  "auto-shop": {
    id: "auto-shop",
    label: "Auto shop",
    serviceNoun: "auto service request",
    customerMoment: "A driver needs diagnostics, repair, maintenance, performance work, or a quote with vehicle details.",
    leadProblemAngle: "Auto service leads need symptom triage, vehicle info, appointment routing, and missed-call recovery.",
    defaultServices: ["Diagnostics", "Brake service", "Maintenance", "Performance upgrades"],
    intakeQuestions: [
      "What vehicle do you have?",
      "What symptoms or service do you need?",
      "Is the vehicle drivable?",
      "Are there warning lights, noises, leaks, or shaking?",
      "When would you like to schedule service?"
    ],
    scoringRules: [
      { label: "Drivability issue", rule: "Vehicle will not start, is unsafe, or has severe symptoms.", impact: "+25 urgency" },
      { label: "Clear appointment intent", rule: "Customer asks for availability or booking.", impact: "+20 intent" },
      { label: "Performance/project work", rule: "Multi-service or high-value upgrade request.", impact: "+15 value" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "Diagnostics", value: "12", note: "Need vehicle info" },
      { label: "Urgent symptoms", value: "5", note: "Service advisor alert" },
      { label: "Appointments", value: "9", note: "Booking flow" }
    ],
    recommendedAutomations: [
      "Vehicle symptom intake",
      "Missed-call text back",
      "Appointment request routing",
      "No-book follow-up"
    ],
    beforeAfter: [
      { before: "Service advisors chase incomplete requests.", after: "Leads arrive with vehicle, symptom, urgency, and timing." },
      { before: "Missed calls become missed repair orders.", after: "Text-back captures the customer before they call another shop." }
    ],
    packageBias: "Growth"
  },
  "general-local-service": {
    id: "general-local-service",
    label: "General local service business",
    serviceNoun: "service request",
    customerMoment: "A local prospect needs a quote, appointment, estimate, consultation, or fast callback.",
    leadProblemAngle: "Local service leads are won or lost in the first few minutes of response and follow-up.",
    defaultServices: ["Quote requests", "Service calls", "Consultations", "Appointment booking"],
    intakeQuestions: [
      "What service do you need?",
      "Where are you located?",
      "How urgent is the request?",
      "What details would help the team quote or schedule correctly?",
      "What is your preferred appointment window?"
    ],
    scoringRules: [
      { label: "Urgency", rule: "Customer mentions same-day need, emergency, or active issue.", impact: "+20 urgency" },
      { label: "Clear fit", rule: "Service requested matches the business offer.", impact: "+20 quality" },
      { label: "Booking intent", rule: "Lead asks for appointment availability.", impact: "+20 intent" }
    ],
    followUpSequence: sharedFollowUp,
    dashboardCards: [
      { label: "New leads", value: "16", note: "Needs response" },
      { label: "Qualified", value: "9", note: "Ready for booking" },
      { label: "Follow-up due", value: "7", note: "No reply yet" }
    ],
    recommendedAutomations: [
      "Instant lead response",
      "Qualification questions",
      "Owner or sales rep alerts",
      "Follow-up reminders"
    ],
    beforeAfter: [
      { before: "Leads are scattered across forms, calls, and inboxes.", after: "LeadOps captures and routes each inquiry with the right next step." },
      { before: "Follow-up depends on memory.", after: "Helpful reminders continue until the lead books or cools off." }
    ],
    packageBias: "Starter"
  }
};

export function getDemoTemplate(industry: string): DemoTemplate {
  if (industryIds.includes(industry as IndustryId)) {
    return demoTemplates[industry as IndustryId];
  }

  const normalized = industry.toLowerCase();
  const matchingTemplate = Object.values(demoTemplates).find((template) =>
    normalized.includes(template.label.toLowerCase())
  );

  return matchingTemplate ?? demoTemplates["general-local-service"];
}
