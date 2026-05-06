export const SITE_CONFIG = {
  brandName: "LeadOps",
  name: "LeadOps",
  tagline: "Every lead answered. Every follow-up handled.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@leadops.ai",
  description:
    "LeadOps helps service businesses respond faster, qualify better, follow up consistently, and turn more inquiries into booked appointments."
};

export const PRIMARY_CTA = {
  label: "Get a Free Missed Lead Checkup",
  href: "/audit"
};

export const SECONDARY_CTA = {
  label: "View Demo",
  href: "/demo"
};

export const NAV_LINKS = [
  {
    href: "/",
    label: "LeadOps"
  },
  {
    href: "/live-demo",
    label: "Live Demo"
  },
  {
    href: "/audit",
    label: "Free Checkup"
  },
  {
    href: "/roi-calculator",
    label: "ROI"
  },
  {
    href: "/how-it-works",
    label: "How It Works"
  },
  {
    href: "/demo",
    label: "Client Demo"
  },
  {
    href: "/dashboard",
    label: "Ops Dashboard"
  }
];

export const PACKAGE_NAMES = [
  {
    name: "Starter",
    price: "$750 setup + $300/mo",
    summary: "Install the core response and qualification layer for one lead source.",
    features: [
      "Missed lead checkup",
      "Instant reply workflow",
      "Practical lead qualification",
      "Owner or rep alerts"
    ]
  },
  {
    name: "Growth",
    price: "$1,500-$3,000 setup + $750/mo",
    summary: "Connect multiple lead sources, automate follow-up, and keep sales handoffs clean.",
    features: [
      "Multi-source lead routing",
      "Lead scoring and routing",
      "CRM logging",
      "Follow-up sequences",
      "Dashboard reporting"
    ]
  },
  {
    name: "Custom Agent System",
    price: "Starting at $5,000+",
    summary: "Build a custom lead operations layer for complex sales, quote, or service workflows.",
    features: [
      "Custom lead agents",
      "Advanced workflow automation",
      "Tool-specific integrations",
      "Optimization support"
    ]
  }
];

export const TARGET_CUSTOMERS = [
  "Auto shops",
  "Wheel repair shops",
  "Detailers",
  "Performance shops",
  "Tint/wrap shops",
  "Roofers",
  "HVAC companies",
  "Plumbing/electrical companies",
  "Med spas",
  "Dental offices",
  "Law firms",
  "Insurance agencies",
  "Real estate teams",
  "Local service businesses"
];

export const AI_LEAD_ENGINE_FEATURES = [
  "Instant response",
  "Lead qualification",
  "Lead scoring",
  "Appointment booking",
  "CRM logging",
  "Follow-up automation",
  "Owner/sales rep alerts",
  "Dashboard reporting"
];

export const LEADOPS_PROCESS = [
  {
    step: "Checkup",
    description: "Find where calls, texts, forms, DMs, and follow-ups are being missed."
  },
  {
    step: "Map",
    description: "Define sources, qualification rules, routing paths, and handoff logic."
  },
  {
    step: "Build",
    description: "Create the lead engine, messages, scoring, alerts, and dashboard."
  },
  {
    step: "Launch",
    description: "Connect the system to live lead sources and monitor early conversations."
  },
  {
    step: "Optimize",
    description: "Use performance data to improve response, booking, and follow-up."
  }
];

export const LEADOPS_USE_CASES = [
  "Missed-call text back",
  "Website lead qualification",
  "Appointment request handling",
  "Photo-based quote intake",
  "CRM cleanup",
  "Follow-up sequences",
  "Sales rep alerts",
  "Internal workflow automation",
  "Custom lead agents"
];

export const MARKETING_FAQS = [
  {
    question: "Is this a chatbot?",
    answer:
      "Not in the usual sense. LeadOps builds the response and follow-up process behind your forms, calls, ads, DMs, email, CRM rules, and alerts. The goal is faster follow-through, not a floating widget."
  },
  {
    question: "Does it replace my team?",
    answer:
      "No. It handles the repetitive first response, qualification, reminders, and routing so your team can spend more time on the leads that actually need a person."
  },
  {
    question: "What tools do you work with?",
    answer:
      "LeadOps can be designed around the tools you already use, including websites, forms, CRMs, calendars, email, SMS, spreadsheets, and internal notification channels."
  },
  {
    question: "How fast can this be installed?",
    answer:
      "A focused Starter build is usually scoped around one clear lead flow first. More advanced systems depend on how many tools, locations, calendars, and handoff rules are involved."
  },
  {
    question: "Do I need a CRM?",
    answer:
      "No, but having one helps. If you do not have a CRM, LeadOps can start with structured lead capture, alerts, follow-up, and reporting while preparing you for a CRM later."
  },
  {
    question: "Can it work with my existing website?",
    answer:
      "Yes. The system can usually plug into your current website forms, landing pages, missed-call flows, or quote requests without rebuilding everything."
  },
  {
    question: "Can it handle quote requests with photos?",
    answer:
      "Yes. Photo-based intake is one of the strongest use cases for repair, automotive, home services, med spas, and any business that needs visual context before quoting."
  },
  {
    question: "What happens when AI is unsure?",
    answer:
      "Unclear, risky, or high-value cases are routed to a human with context. The system should escalate uncertainty instead of pretending to know."
  }
];

export const CONTACT_PLACEHOLDER = {
  email: "hello@leadops.ai",
  calendly: "https://calendly.com/leadops/discovery",
  phone: "+1 (000) 000-0000"
};

export const FUTURE_INTEGRATIONS = [
  "CRM pipelines",
  "Calendar routing",
  "Email and SMS follow-up",
  "Call tracking",
  "Lead qualification",
  "Revenue reporting"
];
