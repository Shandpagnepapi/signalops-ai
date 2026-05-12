export type VisualThemeName = "envoWarm" | "studioWarm" | "studioCool" | "currentSignalOps";

export type VisualTheme = {
  name: VisualThemeName;
  label: string;
  description: string;
  tone: "cool" | "current" | "warm";
  colors: {
    base: string;
    baseAlt: string;
    surface: string;
    surfaceStrong: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
    accent2: string;
    accent3: string;
    glow: string;
    glow2: string;
    success: string;
    warning: string;
  };
  gradients: {
    page: string;
    panel: string;
    button: string;
    border: string;
    orb: string;
    spotlight: string;
  };
  swatches: string[];
};

export const visualThemes = {
  envoWarm: {
    name: "envoWarm",
    label: "Envo Warm",
    description:
      "Black, plum, and deep purple with pink, orange, amber, and magenta heat for the Envo product experience.",
    tone: "warm",
    colors: {
      base: "#05030a",
      baseAlt: "#17091f",
      surface: "rgba(255,255,255,0.07)",
      surfaceStrong: "rgba(255,255,255,0.12)",
      border: "rgba(255,179,109,0.28)",
      text: "#fff8fb",
      muted: "#ead0df",
      accent: "#ff6f9c",
      accent2: "#ff9f75",
      accent3: "#ffb36d",
      glow: "rgba(255,111,156,0.32)",
      glow2: "rgba(255,179,109,0.24)",
      success: "#86efac",
      warning: "#fde68a"
    },
    gradients: {
      page:
        "radial-gradient(circle at 14% 0%, rgba(255,111,156,0.24), transparent 34%), radial-gradient(circle at 86% 6%, rgba(255,179,109,0.2), transparent 30%), linear-gradient(135deg, #05030a, #17091f 52%, #260e25)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.105), rgba(255,255,255,0.045))",
      button: "linear-gradient(135deg, #ff6f9c, #ff9f75 52%, #ffb36d)",
      border: "linear-gradient(135deg, rgba(255,111,156,0.75), rgba(255,179,109,0.56), rgba(255,255,255,0.08))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.24), transparent 25%), linear-gradient(135deg, rgba(255,111,156,0.48), rgba(255,179,109,0.3), rgba(124,58,237,0.3))",
      spotlight:
        "radial-gradient(circle at 48% 42%, rgba(255,111,156,0.34), transparent 18rem), radial-gradient(circle at 72% 34%, rgba(255,179,109,0.28), transparent 15rem)"
    },
    swatches: ["#05030a", "#17091f", "#ff6f9c", "#ff9f75", "#ffb36d", "#7c3aed"]
  },
  studioWarm: {
    name: "studioWarm",
    label: "SignalOps Warm",
    description:
      "A warmer parent-studio palette with premium polish, founder-led energy, and enough restraint for a broader product studio.",
    tone: "warm",
    colors: {
      base: "#07040f",
      baseAlt: "#1b0b22",
      surface: "rgba(255,255,255,0.065)",
      surfaceStrong: "rgba(255,255,255,0.11)",
      border: "rgba(255,111,156,0.25)",
      text: "#fff8fb",
      muted: "#ead0df",
      accent: "#f43f8a",
      accent2: "#f97316",
      accent3: "#fde68a",
      glow: "rgba(244,63,138,0.28)",
      glow2: "rgba(249,115,22,0.2)",
      success: "#86efac",
      warning: "#fde68a"
    },
    gradients: {
      page:
        "radial-gradient(circle at 18% 0%, rgba(244,63,138,0.22), transparent 34%), radial-gradient(circle at 82% 8%, rgba(249,115,22,0.18), transparent 30%), linear-gradient(135deg, #07040f, #1b0b22 52%, #291124)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.095), rgba(255,255,255,0.04))",
      button: "linear-gradient(135deg, #f43f8a, #f97316)",
      border: "linear-gradient(135deg, rgba(244,63,138,0.7), rgba(249,115,22,0.5), rgba(255,255,255,0.08))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.2), transparent 25%), linear-gradient(135deg, rgba(244,63,138,0.42), rgba(249,115,22,0.28), rgba(255,214,130,0.18))",
      spotlight:
        "radial-gradient(circle at 44% 42%, rgba(244,63,138,0.3), transparent 18rem), radial-gradient(circle at 72% 34%, rgba(249,115,22,0.22), transparent 15rem)"
    },
    swatches: ["#07040f", "#1b0b22", "#f43f8a", "#f97316", "#fde68a", "#ff6f9c"]
  },
  studioCool: {
    name: "studioCool",
    label: "SignalOps Cool",
    description:
      "Navy and charcoal with electric blue, cyan, and teal for a more technical, venture-backed SignalOps studio direction.",
    tone: "cool",
    colors: {
      base: "#030712",
      baseAlt: "#071521",
      surface: "rgba(255,255,255,0.06)",
      surfaceStrong: "rgba(255,255,255,0.105)",
      border: "rgba(34,211,238,0.27)",
      text: "#f8fbff",
      muted: "#c8d6e5",
      accent: "#2563eb",
      accent2: "#22d3ee",
      accent3: "#2dd4bf",
      glow: "rgba(34,211,238,0.28)",
      glow2: "rgba(45,212,191,0.2)",
      success: "#7dd3fc",
      warning: "#bae6fd"
    },
    gradients: {
      page:
        "radial-gradient(circle at 16% 0%, rgba(37,99,235,0.22), transparent 34%), radial-gradient(circle at 84% 8%, rgba(34,211,238,0.2), transparent 30%), linear-gradient(135deg, #030712, #071521 52%, #101827)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))",
      button: "linear-gradient(135deg, #2563eb, #22d3ee 54%, #2dd4bf)",
      border: "linear-gradient(135deg, rgba(37,99,235,0.72), rgba(34,211,238,0.56), rgba(45,212,191,0.4))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.2), transparent 25%), linear-gradient(135deg, rgba(37,99,235,0.42), rgba(34,211,238,0.28), rgba(45,212,191,0.22))",
      spotlight:
        "radial-gradient(circle at 48% 42%, rgba(37,99,235,0.3), transparent 18rem), radial-gradient(circle at 72% 34%, rgba(34,211,238,0.24), transparent 15rem)"
    },
    swatches: ["#030712", "#071521", "#2563eb", "#22d3ee", "#2dd4bf", "#c8d6e5"]
  },
  currentSignalOps: {
    name: "currentSignalOps",
    label: "Current SignalOps",
    description:
      "Reference tokens from the current public direction: dark purple base, pink/orange gradient, and friendly SaaS contrast.",
    tone: "current",
    colors: {
      base: "#160d22",
      baseAlt: "#231434",
      surface: "rgba(255,255,255,0.065)",
      surfaceStrong: "rgba(255,255,255,0.1)",
      border: "rgba(255,255,255,0.14)",
      text: "#fff8fb",
      muted: "#d4b6c8",
      accent: "#ff6f9c",
      accent2: "#ffb36d",
      accent3: "#d4b6c8",
      glow: "rgba(255,111,156,0.22)",
      glow2: "rgba(255,179,109,0.16)",
      success: "#86efac",
      warning: "#facc15"
    },
    gradients: {
      page:
        "radial-gradient(circle at 50% -20%, rgba(255,111,156,0.22), transparent 42%), linear-gradient(180deg, rgba(33,17,47,0.86), #160d22 620px)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035))",
      button: "linear-gradient(135deg, #ff6f9c, #ffb36d)",
      border: "linear-gradient(135deg, rgba(255,111,156,0.62), rgba(255,179,109,0.42), rgba(255,255,255,0.08))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.18), transparent 25%), linear-gradient(135deg, rgba(255,111,156,0.34), rgba(255,179,109,0.22), rgba(93,56,170,0.2))",
      spotlight:
        "radial-gradient(circle at 50% 42%, rgba(255,111,156,0.22), transparent 18rem), radial-gradient(circle at 70% 34%, rgba(255,179,109,0.16), transparent 15rem)"
    },
    swatches: ["#160d22", "#231434", "#ff6f9c", "#ffb36d", "#d4b6c8", "#fff8fb"]
  }
} satisfies Record<VisualThemeName, VisualTheme>;

export const visualThemeList = [
  visualThemes.envoWarm,
  visualThemes.studioWarm,
  visualThemes.studioCool,
  visualThemes.currentSignalOps
] satisfies VisualTheme[];
