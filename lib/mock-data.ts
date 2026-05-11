import { CalendarCheck2, Gauge, MessagesSquare, RefreshCw } from "lucide-react";
import type { LeadPriority, LeadUrgency } from "@/lib/lead-scoring";

export const homepageStats = [
  {
    value: "< 60 sec",
    label: "Target response time"
  },
  {
    value: "24/7",
    label: "Lead capture coverage"
  },
  {
    value: "4 paths",
    label: "Intake, sort, follow up, book"
  }
];

export const operatingSystem = [
  {
    title: "Instant response",
    description: "Reply to new inquiries while buyer intent is still fresh.",
    icon: MessagesSquare
  },
  {
    title: "Intake logic",
    description: "Sort leads by fit, urgency, value, and readiness to book.",
    icon: Gauge
  },
  {
    title: "Automated follow-up",
    description: "Keep conversations alive across email, SMS, and CRM stages.",
    icon: RefreshCw
  },
  {
    title: "Booking handoff",
    description: "Route ready prospects to the right appointment path.",
    icon: CalendarCheck2
  }
];

export const servicePillars = [
  {
    title: "Lead response system",
    description: "Capture inquiries from forms, ads, chats, and missed-call flows.",
    items: [
      "Inbound source mapping",
      "Speed-to-lead reply templates",
      "Basic AI triage and routing"
    ]
  },
  {
    title: "Intake engine",
    description: "Turn messy inbound context into clear sales priority.",
    items: [
      "Fit and intent signals",
      "Buyer readiness prompts",
      "CRM-ready lead payloads"
    ]
  },
  {
    title: "Follow-up operations",
    description: "Make the next message obvious, timely, and consistent.",
    items: [
      "Email and SMS sequence stubs",
      "Calendar booking handoff",
      "Pipeline health reporting"
    ]
  }
];

export const demoClient = {
  name: "Apex Wheel Repair",
  industry: "Automotive wheel repair and refinishing",
  headline: "Dallas wheel repair that gets drivers back on the road.",
  description:
    "Apex Wheel Repair is a fictional Dallas shop that repairs curb rash, refinishes wheels, inspects bends and cracks, and routes ready repair requests fast.",
  goal: "Turn photo-based quote requests into prioritized repair opportunities with fast follow-up, mobile routing, and clear safety triage.",
  services: ["Curb rash repair", "Bent wheel inspection", "Wheel refinishing", "Mobile cosmetic repair"],
  painPoints: [
    "Photo quote requests arrive from calls, forms, ads, and DMs with inconsistent details.",
    "Bent or cracked wheel requests need fast triage before a customer keeps driving.",
    "Mobile repair opportunities are easy to miss without smart routing."
  ]
};

export const apexWheelRepair = {
  name: "Apex Wheel Repair",
  location: "Dallas, Texas",
  phone: "(214) 555-0198",
  headline: "Premium wheel repair and refinishing in Dallas.",
  subheadline:
    "Send photos, get a clear estimate path, and schedule mobile cosmetic repair or in-shop inspection for more serious wheel damage.",
  trustBadges: [
    "Same-day quotes",
    "Mobile service available",
    "OEM-style finishes",
    "Inspected before repair",
    "Locally owned"
  ],
  stats: [
    {
      value: "24 hr",
      label: "quote response target"
    },
    {
      value: "4.9/5",
      label: "local trust signal"
    },
    {
      value: "Dallas",
      label: "mobile repair coverage"
    }
  ],
  services: [
    {
      title: "Curb Rash Repair",
      description: "Clean up scuffs, gouges, and road rash with careful surface prep and finish blending."
    },
    {
      title: "Bent Wheel Repair",
      description: "Inspect vibration, air-loss, and impact damage, then straighten eligible wheels safely."
    },
    {
      title: "Cracked Wheel Inspection",
      description: "Evaluate cracks and recommend repair only when the wheel is safe to service."
    },
    {
      title: "Wheel Refinishing",
      description: "Refresh worn finishes with sanding, priming, refinishing, and protective clear coat."
    },
    {
      title: "Powder Coating",
      description: "Durable custom finishes for drivers who want a sharper, longer-lasting wheel look."
    },
    {
      title: "Paint Matching",
      description: "Match OEM-style silver, gloss black, satin, machined, and specialty finishes."
    },
    {
      title: "Mobile Wheel Repair",
      description: "Handle many cosmetic repairs at home or work when the damage is a good mobile fit."
    },
    {
      title: "Cosmetic Restoration",
      description: "Bring tired wheels back with detail-focused cosmetic restoration and finish correction."
    }
  ],
  damageTypes: [
    "Curb rash",
    "Bent wheels",
    "Cracked wheels",
    "Peeling clear coat",
    "Corrosion",
    "Scratches",
    "Color mismatch"
  ],
  process: [
    {
      title: "Send Photos",
      description: "Upload or describe the wheel damage, vehicle, wheel size, and drivability."
    },
    {
      title: "Get Estimate",
      description: "Apex reviews the damage and sends a realistic next step, price range, and safety note."
    },
    {
      title: "Schedule Repair",
      description: "Cosmetic repairs may be routed mobile; bends and cracks may need in-shop inspection."
    },
    {
      title: "Repair or Refinish",
      description: "Eligible wheels are repaired, refinished, paint matched, or powder coated."
    },
    {
      title: "Back on the Road",
      description: "The customer gets clear care notes and follow-up if any additional work is needed."
    }
  ],
  testimonials: [
    {
      quote:
        "I scraped two wheels in a parking garage and thought they would never match again. Apex got the finish looking factory and handled the quote from photos.",
      name: "Marcus R.",
      vehicle: "BMW 540i"
    },
    {
      quote:
        "The mobile repair option saved me half a day. They were honest that one wheel needed shop inspection and fixed the cosmetic wheel at my office.",
      name: "Elena P.",
      vehicle: "Tesla Model Y"
    },
    {
      quote:
        "Fast estimate, no pressure, and they explained when repair made sense versus replacement. That safety-first approach earned my trust.",
      name: "Jordan K.",
      vehicle: "Chevrolet Tahoe"
    }
  ],
  faqs: [
    {
      question: "Can you fix curb rash?",
      answer:
        "Yes. Most curb rash, scuffs, and cosmetic gouges can be repaired and blended to match the wheel finish."
    },
    {
      question: "Can you fix bent wheels?",
      answer:
        "Many bent wheels can be straightened after inspection. Severe bends, repeated impact damage, or unsafe structural issues may require replacement."
    },
    {
      question: "Can you repair cracked wheels?",
      answer:
        "Some cracks can be repaired when they are safe and in an eligible area. If a wheel is structurally unsafe, Apex recommends replacement instead of repair."
    },
    {
      question: "Do you offer mobile service?",
      answer:
        "Yes. Many cosmetic repairs can be completed mobile in the Dallas area. Bent, cracked, or severe damage may require in-shop inspection."
    },
    {
      question: "How long does repair take?",
      answer:
        "Many cosmetic repairs are completed the same day. Refinishing, powder coating, bends, and inspections may require more time."
    },
    {
      question: "Can you match my wheel color?",
      answer:
        "Apex can match many OEM-style finishes, including silver, satin, gloss black, machined looks, and custom colors."
    },
    {
      question: "Do I need to send photos?",
      answer:
        "Photos help the shop quote faster, identify safety concerns, and route the request to mobile repair or shop inspection."
    }
  ]
};

export type DashboardLeadStatus =
  | "new"
  | "contacted"
  | "needs-photos"
  | "qualified"
  | "booked"
  | "won"
  | "lost";

export type ApexDashboardLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  vehicle: string;
  wheelSize: string;
  damageType: string;
  numberOfWheels: number;
  vehicleDrivable: "yes" | "no" | "unsure";
  needsMobileService: boolean;
  address: string;
  score: number;
  priority: LeadPriority;
  urgency: LeadUrgency;
  status: DashboardLeadStatus;
  createdAt: string;
  preferredTime: string;
  message: string;
  summary: string;
  recommendedAction: string;
  customerReply: string;
  internalNote: string;
  tags: string[];
  timeline: {
    time: string;
    event: string;
  }[];
};

export const apexDashboardLeads: ApexDashboardLead[] = [
  {
    id: "apex-lead-001",
    name: "Avery Stone",
    email: "avery@example.com",
    phone: "(214) 555-0149",
    source: "Website quote form",
    vehicle: "2022 Tesla Model Y",
    wheelSize: "20 inch",
    damageType: "Curb rash",
    numberOfWheels: 2,
    vehicleDrivable: "yes",
    needsMobileService: true,
    address: "Uptown Dallas",
    score: 88,
    priority: "warm",
    urgency: "soon",
    status: "qualified",
    createdAt: "2026-05-06T08:18:00.000Z",
    preferredTime: "Tomorrow afternoon",
    message:
      "I scraped two wheels in a parking garage. Looking for a quote and mobile repair appointment this week if possible.",
    summary:
      "Ready cosmetic repair lead for two curb-rash wheels. Mobile service is requested and the vehicle is drivable.",
    recommendedAction:
      "Send mobile cosmetic estimate, confirm service address, and offer the first available afternoon window.",
    customerReply:
      "Thanks Avery, Apex received your quote request. The details look like a good mobile cosmetic repair candidate. Please send close-up photos if you have them and we will confirm pricing and timing.",
    internalNote:
      "Good daily revenue lead. Photos are present, two wheels noted, and mobile route is likely a fit. Confirm paint finish before scheduling.",
    tags: ["mobile-request", "cosmetic-repair", "curb-rash", "multi-wheel", "ready"],
    timeline: [
      { time: "8:18 AM", event: "Website quote form received" },
      { time: "8:18 AM", event: "AI prioritized lead and sent photo confirmation text" },
      { time: "8:20 AM", event: "Tagged as mobile cosmetic fit" }
    ]
  },
  {
    id: "apex-lead-002",
    name: "Caleb Rivera",
    email: "caleb.rivera@example.com",
    phone: "(972) 555-0172",
    source: "Google Business Profile",
    vehicle: "2018 Ford F-150",
    wheelSize: "22 inch",
    damageType: "Bent wheel",
    numberOfWheels: 1,
    vehicleDrivable: "unsure",
    needsMobileService: false,
    address: "Plano",
    score: 97,
    priority: "hot",
    urgency: "emergency",
    status: "new",
    createdAt: "2026-05-06T09:04:00.000Z",
    preferredTime: "Today",
    message:
      "Hit a pothole and now the truck shakes at highway speed. I need to know if the wheel can be fixed today.",
    summary:
      "Hot safety-sensitive lead for a likely bent wheel with highway-speed vibration. Human inspection is required before repair is promised.",
    recommendedAction:
      "Call within 5 minutes, advise the customer not to keep driving at highway speed, request photos, and route to shop inspection.",
    customerReply:
      "Thanks Caleb, Apex received your request. Because you mentioned highway-speed shaking, we need to inspect the wheel before confirming repair. Please send photos of the wheel and damaged area and we will call you shortly.",
    internalNote:
      "Escalate to technician. Do not promise straightening until inspected. Ask about tire pressure loss and impact location.",
    tags: ["hot", "bent-wheel", "inspection-required", "safety-risk", "response-needed"],
    timeline: [
      { time: "9:04 AM", event: "Google inquiry received" },
      { time: "9:04 AM", event: "AI flagged emergency vibration language" },
      { time: "9:05 AM", event: "Owner alert queued" }
    ]
  },
  {
    id: "apex-lead-003",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "(469) 555-0136",
    source: "Missed-call text back",
    vehicle: "2020 Mercedes-Benz GLE",
    wheelSize: "21 inch",
    damageType: "Cracked wheel",
    numberOfWheels: 1,
    vehicleDrivable: "unsure",
    needsMobileService: false,
    address: "Frisco",
    score: 91,
    priority: "hot",
    urgency: "soon",
    status: "contacted",
    createdAt: "2026-05-06T09:31:00.000Z",
    preferredTime: "This afternoon",
    message:
      "There is a crack on the inside lip and I want to know if it can be welded instead of replaced.",
    summary:
      "High-value cracked wheel lead asking about welding. Requires technician review and safety-first language.",
    recommendedAction:
      "Request barrel and crack photos, explain that repair depends on crack location and safety, then schedule in-shop inspection.",
    customerReply:
      "Thanks Priya, Apex can inspect the crack and let you know the safest option. Please send clear photos of the inside lip and crack. If the wheel is structurally unsafe, we will recommend replacement instead of repair.",
    internalNote:
      "Use conservative language. Crack location matters. Route to in-shop inspection before quoting weld repair.",
    tags: ["cracked-wheel", "inspection-required", "staff-handoff", "safety-first"],
    timeline: [
      { time: "9:31 AM", event: "Missed call captured" },
      { time: "9:32 AM", event: "Text-back workflow asked for photos" },
      { time: "9:36 AM", event: "Customer replied with crack location" }
    ]
  },
  {
    id: "apex-lead-004",
    name: "Marcus Reed",
    email: "marcus.reed@example.com",
    phone: "(214) 555-0187",
    source: "Instagram ad",
    vehicle: "2021 Dodge Charger Scat Pack",
    wheelSize: "20 inch",
    damageType: "Wheel refinishing",
    numberOfWheels: 4,
    vehicleDrivable: "yes",
    needsMobileService: false,
    address: "Oak Cliff",
    score: 86,
    priority: "warm",
    urgency: "researching",
    status: "booked",
    createdAt: "2026-05-05T16:42:00.000Z",
    preferredTime: "Friday morning",
    message:
      "I want all four wheels refinished gloss black. Can I get appointment availability and a price range?",
    summary:
      "Four-wheel refinishing opportunity with clear intent and appointment availability request.",
    recommendedAction:
      "Confirm finish, timeline, and drop-off expectations, then send appointment options for Friday morning.",
    customerReply:
      "Thanks Marcus, Apex can help with a gloss black refinish quote. We will confirm finish details, timing, and available appointment windows for Friday morning.",
    internalNote:
      "Higher-ticket refinish job. Confirm whether powder coating or paint refinish is preferred before final price.",
    tags: ["four-wheels", "refinish", "appointment-request", "high-ticket", "booked"],
    timeline: [
      { time: "4:42 PM", event: "Instagram form submitted" },
      { time: "4:43 PM", event: "AI sent finish questions" },
      { time: "5:08 PM", event: "Appointment booked for Friday" }
    ]
  },
  {
    id: "apex-lead-005",
    name: "Elena Porter",
    email: "elena.porter@example.com",
    phone: "(214) 555-0164",
    source: "Organic website",
    vehicle: "2019 Lexus RX 350",
    wheelSize: "18 inch",
    damageType: "Peeling clear coat",
    numberOfWheels: 4,
    vehicleDrivable: "yes",
    needsMobileService: false,
    address: "Lake Highlands",
    score: 78,
    priority: "warm",
    urgency: "researching",
    status: "qualified",
    createdAt: "2026-05-05T14:12:00.000Z",
    preferredTime: "Next week",
    message:
      "The clear coat is peeling on my OEM wheels. I want them to look factory again, not custom.",
    summary:
      "Ready OEM-style refinishing lead for peeling clear coat on four wheels.",
    recommendedAction:
      "Send OEM-style refinishing range, explain timeline, and ask for photos of each wheel.",
    customerReply:
      "Thanks Elena, Apex can review the OEM finish and peeling clear coat. Please send photos of each wheel so we can confirm the best refinishing path and timeline.",
    internalNote:
      "Good OEM refinish candidate. Emphasize factory-style finish and manage timeline expectations.",
    tags: ["oem-finish", "peeling-clear", "refinish", "multi-wheel"],
    timeline: [
      { time: "2:12 PM", event: "Website inquiry received" },
      { time: "2:12 PM", event: "AI classified OEM-style refinish" },
      { time: "2:15 PM", event: "Photo request sent" }
    ]
  },
  {
    id: "apex-lead-006",
    name: "Dustin Hale",
    email: "dustin.hale@example.com",
    phone: "(469) 555-0108",
    source: "Paid search landing page",
    vehicle: "2023 Toyota Camry",
    wheelSize: "19 inch",
    damageType: "Scratches",
    numberOfWheels: 1,
    vehicleDrivable: "yes",
    needsMobileService: true,
    address: "Richardson",
    score: 62,
    priority: "warm",
    urgency: "soon",
    status: "needs-photos",
    createdAt: "2026-05-06T10:22:00.000Z",
    preferredTime: "Same day if possible",
    message:
      "Can I get a same-day quote? I do not have photos right now but it is a scraped wheel.",
    summary:
      "Same-day cosmetic quote request with missing photos. Good lead, but quote quality is limited until photos arrive.",
    recommendedAction:
      "Send photo request immediately and hold mobile scheduling until damage photos confirm cosmetic fit.",
    customerReply:
      "Thanks Dustin, Apex can usually quote faster with photos. Please send 2-3 close-ups of the scratched wheel and we will confirm if same-day mobile repair is available.",
    internalNote:
      "Photo request pending. Do not quote final price yet. Follow up in 2 hours if no photos are received.",
    tags: ["photo-request", "same-day-quote", "mobile-request", "needs-photos"],
    timeline: [
      { time: "10:22 AM", event: "Paid search form submitted" },
      { time: "10:22 AM", event: "AI requested photos" },
      { time: "10:22 AM", event: "Follow-up timer started" }
    ]
  },
  {
    id: "apex-lead-007",
    name: "Sofia Martin",
    email: "sofia.martin@example.com",
    phone: "(972) 555-0119",
    source: "Facebook lead ad",
    vehicle: "2020 Jeep Wrangler",
    wheelSize: "17 inch",
    damageType: "Powder coating",
    numberOfWheels: 5,
    vehicleDrivable: "yes",
    needsMobileService: false,
    address: "Dallas",
    score: 84,
    priority: "warm",
    urgency: "soon",
    status: "contacted",
    createdAt: "2026-05-05T11:48:00.000Z",
    preferredTime: "Next available appointment",
    message:
      "Looking for powder coating on my Wrangler wheels and spare. What appointments are open?",
    summary:
      "High-value powder coating lead for five wheels with appointment availability request.",
    recommendedAction:
      "Confirm color, finish, vehicle logistics, and next available appointment window.",
    customerReply:
      "Thanks Sofia, Apex received your powder coating request. We will confirm color and finish details, then send the next available appointment options.",
    internalNote:
      "Five-wheel job including spare. Ask about tire dismount/remount expectations and finish choice.",
    tags: ["powder-coating", "appointment-request", "high-ticket", "five-wheels"],
    timeline: [
      { time: "11:48 AM", event: "Facebook lead ad captured" },
      { time: "11:49 AM", event: "AI asked color and appointment questions" },
      { time: "12:04 PM", event: "Customer confirmed matte black preference" }
    ]
  },
  {
    id: "apex-lead-008",
    name: "Jordan Kim",
    email: "jordan.kim@example.com",
    phone: "(214) 555-0127",
    source: "Referral",
    vehicle: "2021 Audi Q5",
    wheelSize: "19 inch",
    damageType: "Curb rash",
    numberOfWheels: 1,
    vehicleDrivable: "yes",
    needsMobileService: true,
    address: "Design District",
    score: 81,
    priority: "warm",
    urgency: "soon",
    status: "won",
    createdAt: "2026-05-04T15:26:00.000Z",
    preferredTime: "Completed yesterday",
    message:
      "One wheel has curb rash from valet parking. I can do mobile if you have a window near my office.",
    summary:
      "Mobile curb-rash repair lead converted after fast photo intake and appointment confirmation.",
    recommendedAction:
      "Send care instructions and review request. Add customer to reactivation list for future cosmetic work.",
    customerReply:
      "Thanks Jordan, your repair is complete. Apex appreciates the quick photo follow-up and we will send care notes shortly.",
    internalNote:
      "Won mobile repair. Good testimonial candidate because turnaround was fast and office service mattered.",
    tags: ["won", "mobile-repair", "curb-rash", "referral"],
    timeline: [
      { time: "3:26 PM", event: "Referral form submitted" },
      { time: "3:27 PM", event: "Photos received and prioritized" },
      { time: "Yesterday", event: "Mobile repair completed" }
    ]
  },
  {
    id: "apex-lead-009",
    name: "Nina Brooks",
    email: "nina.brooks@example.com",
    phone: "",
    source: "Chat widget",
    vehicle: "Unknown BMW sedan",
    wheelSize: "",
    damageType: "Color mismatch",
    numberOfWheels: 1,
    vehicleDrivable: "yes",
    needsMobileService: false,
    address: "",
    score: 38,
    priority: "cold",
    urgency: "unknown",
    status: "lost",
    createdAt: "2026-05-03T17:55:00.000Z",
    preferredTime: "",
    message:
      "How much to fix a wheel that does not match? I do not want to give my number yet.",
    summary:
      "Low-confidence chat lead with vague color-mismatch details and no phone number.",
    recommendedAction:
      "Ask for photos, wheel finish details, and a callback number before routing to the shop.",
    customerReply:
      "Thanks Nina, Apex can review color match issues from photos. Please send a close-up photo of the wheel and the finish you want matched so we can point you in the right direction.",
    internalNote:
      "Lost opportunity after no photo response. Missing phone limited follow-up options.",
    tags: ["lost", "phone-missing", "low-confidence", "needs-photos"],
    timeline: [
      { time: "5:55 PM", event: "Chat inquiry received" },
      { time: "5:55 PM", event: "AI requested photos and phone number" },
      { time: "Next day", event: "Lead marked lost after no response" }
    ]
  }
];
