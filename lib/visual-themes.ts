export type VisualThemeName = "envoBlue" | "envoWarm" | "studioWarm" | "studioCool" | "currentSignalOps";

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
  envoBlue: {
    name: "envoBlue",
    label: "Envo Blue",
    description:
      "Warm white and deep navy with bright blue, violet, lavender, subtle glass, and friendly automation polish for the Envo product experience.",
    tone: "cool",
    colors: {
      base: "#071126",
      baseAlt: "#0B1024",
      surface: "rgba(255,255,255,0.072)",
      surfaceStrong: "rgba(255,255,255,0.118)",
      border: "rgba(191,211,255,0.24)",
      text: "#F8FAFF",
      muted: "#D7E2F7",
      accent: "#328BFF",
      accent2: "#2563EB",
      accent3: "#A99BFF",
      glow: "rgba(50,139,255,0.24)",
      glow2: "rgba(111,77,255,0.18)",
      success: "#34C759",
      warning: "#BFDBFE"
    },
    gradients: {
      page:
        "radial-gradient(circle at 16% 0%, rgba(50,139,255,0.24), transparent 34%), radial-gradient(circle at 84% 8%, rgba(111,77,255,0.22), transparent 32%), linear-gradient(135deg, #071126, #0B1024 58%, #111A3A)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.096), rgba(255,255,255,0.036))",
      button: "linear-gradient(135deg, #328BFF, #2563EB 46%, #6F4DFF)",
      border: "linear-gradient(135deg, rgba(50,139,255,0.72), rgba(111,77,255,0.58), rgba(255,255,255,0.1))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.24), transparent 25%), linear-gradient(135deg, rgba(50,139,255,0.48), rgba(37,99,235,0.38), rgba(111,77,255,0.34))",
      spotlight:
        "radial-gradient(circle at 48% 42%, rgba(50,139,255,0.32), transparent 18rem), radial-gradient(circle at 72% 34%, rgba(111,77,255,0.26), transparent 15rem)"
    },
    swatches: ["#071126", "#0B1024", "#F8FAFF", "#EAF1FF", "#328BFF", "#6F4DFF"]
  },
  envoWarm: {
    name: "envoWarm",
    label: "Envo Blue",
    description:
      "Legacy export kept for compatibility. It now points to the blue, violet, white, and deep navy Envo product identity.",
    tone: "cool",
    colors: {
      base: "#071126",
      baseAlt: "#0B1024",
      surface: "rgba(255,255,255,0.072)",
      surfaceStrong: "rgba(255,255,255,0.118)",
      border: "rgba(191,211,255,0.24)",
      text: "#F8FAFF",
      muted: "#D7E2F7",
      accent: "#328BFF",
      accent2: "#2563EB",
      accent3: "#A99BFF",
      glow: "rgba(50,139,255,0.24)",
      glow2: "rgba(111,77,255,0.18)",
      success: "#34C759",
      warning: "#BFDBFE"
    },
    gradients: {
      page:
        "radial-gradient(circle at 16% 0%, rgba(50,139,255,0.24), transparent 34%), radial-gradient(circle at 84% 8%, rgba(111,77,255,0.22), transparent 32%), linear-gradient(135deg, #071126, #0B1024 58%, #111A3A)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.096), rgba(255,255,255,0.036))",
      button: "linear-gradient(135deg, #328BFF, #2563EB 46%, #6F4DFF)",
      border: "linear-gradient(135deg, rgba(50,139,255,0.72), rgba(111,77,255,0.58), rgba(255,255,255,0.1))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.24), transparent 25%), linear-gradient(135deg, rgba(50,139,255,0.48), rgba(37,99,235,0.38), rgba(111,77,255,0.34))",
      spotlight:
        "radial-gradient(circle at 48% 42%, rgba(50,139,255,0.32), transparent 18rem), radial-gradient(circle at 72% 34%, rgba(111,77,255,0.26), transparent 15rem)"
    },
    swatches: ["#071126", "#0B1024", "#F8FAFF", "#EAF1FF", "#328BFF", "#6F4DFF"]
  },
  studioWarm: {
    name: "studioWarm",
    label: "SignalOps Warm",
    description:
      "A softer parent-studio palette with premium polish, founder-led energy, and enough restraint for a broader product studio.",
    tone: "warm",
    colors: {
      base: "#071126",
      baseAlt: "#0B1024",
      surface: "rgba(255,255,255,0.048)",
      surfaceStrong: "rgba(255,255,255,0.09)",
      border: "rgba(50,139,255,0.22)",
      text: "#F8FAFF",
      muted: "#D7E2F7",
      accent: "#328BFF",
      accent2: "#6F4DFF",
      accent3: "#EAF1FF",
      glow: "rgba(50,139,255,0.22)",
      glow2: "rgba(111,77,255,0.16)",
      success: "#86efac",
      warning: "#BFD3FF"
    },
    gradients: {
      page:
        "radial-gradient(circle at 18% 0%, rgba(50,139,255,0.2), transparent 34%), radial-gradient(circle at 82% 8%, rgba(111,77,255,0.16), transparent 30%), linear-gradient(135deg, #071126, #0B1024 52%, #111A3A)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.078), rgba(255,255,255,0.032))",
      button: "linear-gradient(135deg, #328BFF, #2563EB 46%, #6F4DFF)",
      border: "linear-gradient(135deg, rgba(50,139,255,0.7), rgba(111,77,255,0.5), rgba(255,255,255,0.08))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.2), transparent 25%), linear-gradient(135deg, rgba(50,139,255,0.42), rgba(37,99,235,0.28), rgba(111,77,255,0.2))",
      spotlight:
        "radial-gradient(circle at 44% 42%, rgba(50,139,255,0.3), transparent 18rem), radial-gradient(circle at 72% 34%, rgba(111,77,255,0.22), transparent 15rem)"
    },
    swatches: ["#071126", "#0B1024", "#F8FAFF", "#EAF1FF", "#328BFF", "#6F4DFF"]
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
      "Reference tokens from the current public direction: dark navy base, blue/violet gradient, and friendly SaaS contrast.",
    tone: "current",
    colors: {
      base: "#071126",
      baseAlt: "#0B1024",
      surface: "rgba(255,255,255,0.065)",
      surfaceStrong: "rgba(255,255,255,0.1)",
      border: "rgba(255,255,255,0.14)",
      text: "#F8FAFF",
      muted: "#D7E2F7",
      accent: "#328BFF",
      accent2: "#6F4DFF",
      accent3: "#EAF1FF",
      glow: "rgba(50,139,255,0.22)",
      glow2: "rgba(111,77,255,0.16)",
      success: "#86efac",
      warning: "#facc15"
    },
    gradients: {
      page:
        "radial-gradient(circle at 50% -20%, rgba(50,139,255,0.22), transparent 42%), linear-gradient(180deg, rgba(7,17,38,0.88), #071126 620px)",
      panel:
        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035))",
      button: "linear-gradient(135deg, #328BFF, #2563EB 46%, #6F4DFF)",
      border: "linear-gradient(135deg, rgba(50,139,255,0.62), rgba(111,77,255,0.42), rgba(255,255,255,0.08))",
      orb:
        "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.18), transparent 25%), linear-gradient(135deg, rgba(50,139,255,0.34), rgba(37,99,235,0.22), rgba(111,77,255,0.2))",
      spotlight:
        "radial-gradient(circle at 50% 42%, rgba(50,139,255,0.22), transparent 18rem), radial-gradient(circle at 70% 34%, rgba(111,77,255,0.16), transparent 15rem)"
    },
    swatches: ["#071126", "#0B1024", "#F8FAFF", "#EAF1FF", "#328BFF", "#6F4DFF"]
  }
} satisfies Record<VisualThemeName, VisualTheme>;

export const visualThemeList = [
  visualThemes.envoBlue,
  visualThemes.envoWarm,
  visualThemes.studioWarm,
  visualThemes.studioCool,
  visualThemes.currentSignalOps
] satisfies VisualTheme[];
