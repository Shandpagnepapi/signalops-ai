import type { PromptWorkerPackageName, PromptWorkerSystemTemplateName } from "@/lib/prompt-worker/prompt-types";

export type SystemTemplate = {
  name: PromptWorkerSystemTemplateName;
  whoItIsFor: string;
  commonLeadSources: string[];
  coreFlow: string[];
  intakeQuestions: string[];
  routingRules: string[];
  followUpStrategy: string[];
  dashboardFields: string[];
  recommendedPackageTendency: PromptWorkerPackageName;
  commonAddOns: string[];
};

export const systemTemplates: Record<PromptWorkerSystemTemplateName, SystemTemplate> = {
  "Quote Intake OS": {
    name: "Quote Intake OS",
    whoItIsFor:
      "Wheel repair, detailers, contractors, tint/wrap shops, remodelers, auto services, and other quote-based businesses.",
    commonLeadSources: ["Website forms", "Phone calls", "Missed calls", "Instagram/Facebook DMs", "Google Business Profile", "Quote request pages"],
    coreFlow: [
      "Lead comes in",
      "AI requests missing details/photos",
      "AI sorts the lead by urgency and next action",
      "Owner/team receives the summary",
      "Follow-up keeps the quote request moving",
      "Booking or quote handoff is ready"
    ],
    intakeQuestions: [
      "What service do you need?",
      "What city/service area are you in?",
      "When are you hoping to get this done?",
      "Can you send photos or key details?",
      "Is this mobile, in-shop, onsite, or callback preferred?",
      "What is the best phone/email for follow-up?"
    ],
    routingRules: [
      "Hot quote requests with photos/details go to owner or estimator.",
      "Missing-photo leads get a photo request sequence.",
      "Unclear or high-risk jobs route to human review.",
      "Out-of-area or poor-fit leads get polite clarification."
    ],
    followUpStrategy: [
      "Immediate response",
      "Missing details reminder after a short delay",
      "Quote follow-up if no reply",
      "Booking/callback nudge",
      "Final quiet-lead check-in"
    ],
    dashboardFields: ["Lead source", "Service requested", "Photos/details", "Urgency", "Priority / next action", "Owner alert", "Follow-up status"],
    recommendedPackageTendency: "Growth",
    commonAddOns: ["Photo request flow", "Quote follow-up", "Owner alert summaries", "Spreadsheet/CRM logging", "Booking link handoff"]
  },
  "Appointment Booking OS": {
    name: "Appointment Booking OS",
    whoItIsFor: "Med spas, dental offices, wellness clinics, consultation-based services, and appointment-driven businesses.",
    commonLeadSources: ["Website forms", "Phone calls", "Missed calls", "Instagram/Facebook DMs", "Google Business Profile"],
    coreFlow: [
      "Lead asks about service",
      "AI asks smart intake questions",
      "AI routes sensitive questions to human review",
      "Booking or callback handoff",
      "No-book follow-up"
    ],
    intakeQuestions: [
      "Which service are you interested in?",
      "Are you a new or returning client?",
      "What timing are you hoping for?",
      "What is your preferred location or provider if relevant?",
      "What is the best phone/email for booking follow-up?",
      "Are there any sensitive questions that should go to the team?"
    ],
    routingRules: [
      "Booking-ready leads go to front desk or booking path.",
      "Treatment, medical, pricing, or eligibility uncertainty routes to human review.",
      "No-book leads enter a short follow-up sequence.",
      "Existing clients can be tagged separately from new consultations."
    ],
    followUpStrategy: [
      "Immediate consult response",
      "Booking window reminder",
      "No-book follow-up",
      "Consultation prep/info handoff",
      "Human review for sensitive questions"
    ],
    dashboardFields: ["Service interest", "New/returning", "Timing", "Preferred contact", "Booking readiness", "Human review flag", "Follow-up status"],
    recommendedPackageTendency: "Growth",
    commonAddOns: ["Booking handoff", "Consultation reminder", "Front desk alert", "CRM/spreadsheet logging", "Human-review queue"]
  },
  "Emergency Response OS": {
    name: "Emergency Response OS",
    whoItIsFor: "HVAC, plumbing, roofing, restoration, well/water, and urgent home service businesses.",
    commonLeadSources: ["Phone calls", "Missed calls", "Website forms", "Google Business Profile", "Google LSA", "Text messages"],
    coreFlow: [
      "Urgent inquiry arrives",
      "AI collects issue/address/urgency",
      "Hot alert goes to owner/dispatcher",
      "Callback handoff",
      "Follow-up confirms status"
    ],
    intakeQuestions: [
      "What issue is happening right now?",
      "What is the service address or city?",
      "Is this urgent or after-hours?",
      "Is there damage, safety risk, no water/no heat/no cooling, or active leak?",
      "What is the best callback number?",
      "Are you the owner/authorized decision maker?"
    ],
    routingRules: [
      "Emergency language triggers hot owner/dispatcher alert.",
      "Safety, structural, or water/electrical risk routes to human review.",
      "Non-urgent leads are sorted and queued for normal follow-up.",
      "Missing address/phone gets immediate clarification."
    ],
    followUpStrategy: [
      "Immediate urgent response",
      "Callback confirmation",
      "No-answer follow-up",
      "Status check",
      "Next-day non-booked follow-up"
    ],
    dashboardFields: ["Issue", "Address/service area", "Urgency", "Safety flag", "Callback number", "Dispatcher alert", "Status", "Next action"],
    recommendedPackageTendency: "Growth",
    commonAddOns: ["Missed-call text-back", "Dispatcher alerts", "After-hours routing", "Emergency tags", "Job tool logging"]
  },
  "Lead Nurture OS": {
    name: "Lead Nurture OS",
    whoItIsFor: "Insurance agencies, real estate teams, B2B services, and high-consideration sales.",
    commonLeadSources: ["Website forms", "Facebook leads", "Google leads", "Referrals", "Email", "Landing pages"],
    coreFlow: [
      "Lead captured",
      "AI collects need/timeline details",
      "Lead is tagged hot/warm/cold",
      "Nurture sequence begins",
      "Sales next action is assigned"
    ],
    intakeQuestions: [
      "What are you looking for?",
      "What timeline are you considering?",
      "What is prompting the search now?",
      "What product/service/property/coverage type matters most?",
      "Who should follow up and how soon?",
      "What is the best contact method?"
    ],
    routingRules: [
      "High-intent leads route to producer/agent/sales owner.",
      "Researching leads enter nurture.",
      "Missing contact details get a clarification request.",
      "Compliance-sensitive questions route to human review."
    ],
    followUpStrategy: [
      "Immediate intake response",
      "Hot-lead owner alert",
      "Warm lead nurture sequence",
      "Reminder to book/call",
      "Quiet lead reactivation"
    ],
    dashboardFields: ["Need", "Timeline", "Intent", "Priority / next action", "Owner", "Nurture status", "Next action", "Last touch"],
    recommendedPackageTendency: "Growth",
    commonAddOns: ["Nurture sequences", "Sales owner routing", "Pipeline tags", "CRM/spreadsheet logging", "Priority views"]
  },
  "Custom Ops OS": {
    name: "Custom Ops OS",
    whoItIsFor: "Complex workflows, multi-location businesses, CRM-heavy teams, advanced routing, custom dashboards, or internal AI systems.",
    commonLeadSources: ["Multiple forms", "Calls", "Texts", "DMs", "CRM tasks", "Ads", "Partner/referral sources", "Internal requests"],
    coreFlow: [
      "Lead or internal request enters system",
      "AI classifies workflow path",
      "Routing, approvals, and data enrichment run",
      "Team receives role-specific next action",
      "Dashboard and follow-up rules stay updated"
    ],
    intakeQuestions: [
      "Which location/team/owner should handle this?",
      "Which workflow path applies?",
      "What tools need to be updated?",
      "What approval or human review is required?",
      "What information is missing before action?",
      "What should happen if the lead does not respond?"
    ],
    routingRules: [
      "Route by location, team, service, source, priority, and risk.",
      "Escalate unclear or risky cases.",
      "Sync important fields to the selected tool.",
      "Log notes and next actions for the responsible owner."
    ],
    followUpStrategy: [
      "Workflow-specific response",
      "Owner/team-specific alerts",
      "Approval-aware follow-up",
      "CRM/task updates",
      "Optimization loop based on dashboard findings"
    ],
    dashboardFields: ["Workflow", "Location", "Owner", "Priority", "Approval state", "Tool sync", "Next action", "Follow-up status"],
    recommendedPackageTendency: "Custom",
    commonAddOns: ["Custom dashboards", "CRM/job tool integrations", "Multi-location routing", "Approval workflows", "Internal AI agent prompts"]
  }
};
