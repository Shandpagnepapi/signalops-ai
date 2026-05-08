import type { PromptWorkerPackageName } from "@/lib/prompt-worker/prompt-types";

export type PackageBaseline = {
  name: PromptWorkerPackageName;
  monthly: string;
  setup: string;
  bestFor: string;
  includes: string[];
  doNotRecommendWhen: string[];
  upgradeTriggers: string[];
  commonAddOns: string[];
};

export const packageBaselines: Record<PromptWorkerPackageName, PackageBaseline> = {
  Starter: {
    name: "Starter",
    monthly: "$297/mo",
    setup: "Setup from $750",
    bestFor: "One core lead source and a simple owner handoff.",
    includes: [
      "One lead source",
      "Instant reply workflow",
      "Basic qualification",
      "Simple follow-up reminders",
      "Owner alerts",
      "Basic monthly check-in"
    ],
    doNotRecommendWhen: [
      "The business has several active lead sources.",
      "Quote requests require photo/detail collection across multiple steps.",
      "The owner needs dashboard visibility across a team.",
      "There are multiple locations, complex routing rules, or deep CRM needs."
    ],
    upgradeTriggers: [
      "Adds missed-call text-back plus forms or DMs",
      "Needs multi-step follow-up",
      "Needs lead scoring or dashboard visibility",
      "Needs booking/callback handoff"
    ],
    commonAddOns: [
      "Missed-call text-back",
      "Simple booking link handoff",
      "Basic spreadsheet logging"
    ]
  },
  Growth: {
    name: "Growth",
    monthly: "$597/mo",
    setup: "Setup from $1,500",
    bestFor: "Multiple lead sources, stronger qualification, and follow-up visibility.",
    includes: [
      "Multiple lead sources",
      "Smarter qualification",
      "Lead scoring",
      "Follow-up sequences",
      "Booking handoff",
      "CRM/spreadsheet logging",
      "Dashboard visibility",
      "Monthly optimization"
    ],
    doNotRecommendWhen: [
      "The workflow only has one simple source and no meaningful follow-up gap.",
      "The business needs multi-location routing, custom approval rules, or deep integrations.",
      "The business needs internal agent workflows beyond lead response."
    ],
    upgradeTriggers: [
      "Multiple locations",
      "Custom CRM or job-management integration",
      "Complex owner/team routing",
      "Custom reporting or dashboards",
      "Advanced agent workflows"
    ],
    commonAddOns: [
      "Photo/detail request flows",
      "Owner alert summaries",
      "Quote follow-up sequences",
      "Dashboard pipeline views",
      "CRM/spreadsheet sync"
    ]
  },
  Custom: {
    name: "Custom",
    monthly: "Custom monthly support",
    setup: "Buildout from $5,000+",
    bestFor: "Complex workflows, multiple locations, custom routing, integrations, dashboards, or agent workflows.",
    includes: [
      "Custom workflow mapping",
      "Multiple lead sources and routing paths",
      "Deep CRM/job-management integrations",
      "Custom dashboards",
      "Approval rules and human-review paths",
      "Internal AI agent workflows",
      "Advanced reporting and optimization"
    ],
    doNotRecommendWhen: [
      "The business has one simple lead source.",
      "The owner only needs basic missed-call or form response.",
      "There is no budget or operational need for custom integration."
    ],
    upgradeTriggers: [
      "Multi-location routing",
      "Multiple teams or owners",
      "Sensitive compliance/risk review",
      "Custom quote logic",
      "Deep CRM/calendar/job tool integration",
      "Internal admin automation beyond lead response"
    ],
    commonAddOns: [
      "Custom owner dashboards",
      "CRM/job tool integration",
      "Advanced routing rules",
      "Custom reporting",
      "Agent workflow design",
      "Multi-location rollouts"
    ]
  }
};

export const packageDecisionRules = [
  "Starter fits one primary source and a simple response/handoff path.",
  "Growth fits multiple lead sources, quote follow-up, photos/details, scoring, dashboard visibility, or booking handoff.",
  "Custom fits complex routing, multiple locations, deep integrations, custom dashboards, or internal AI agent workflows.",
  "When uncertain between Starter and Growth, choose Growth only if the intake shows multiple sources, follow-up leakage, quote complexity, or visibility needs.",
  "When uncertain between Growth and Custom, choose Growth unless there is explicit complexity, integration depth, or multi-location/team routing."
] as const;
