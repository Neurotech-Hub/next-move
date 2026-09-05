import type {
  AssetAnswer,
  GuideAnswers,
  InvolvementAnswer,
  MotivationAnswer,
} from "../types/navigator";

const ASSET_LABELS: Record<AssetAnswer, string> = {
  observation: "An observation or problem",
  idea: "An idea or concept",
  evidence: "Experimental evidence",
  prototype: "A working prototype",
  software: "Software or an algorithm",
  therapeutic: "A therapeutic candidate",
  device: "A device or diagnostic",
  "research-tool": "A research tool or reagent",
  disclosed: "An invention already disclosed",
  unsure: "Not sure yet",
};

const MOTIVATION_LABELS: Record<MotivationAnswer, string> = {
  papers: "papers and new science",
  grants: "grants and lab capacity",
  trainees: "trainee opportunities",
  collaborators: "new collaborations",
  reach: "broader scientific reach",
  patients: "patient impact",
  financial: "licensing or equity upside",
  "low-time": "protecting research time",
};

const INVOLVEMENT_LABELS: Record<InvolvementAnswer, string> = {
  "research-focus": "Keep my focus on research",
  advise: "Advise or collaborate",
  open: "Open to more involvement",
  founder: "Interested in founding or leading",
  unsure: "Not sure yet",
};

export interface TailoringDetail {
  label: string;
  answer: string;
  effect: string;
}

export function tailoringDetails(
  answers: GuideAnswers,
  destinationLabel: string,
  currentStateLabel: string,
): TailoringDetail[] {
  const motivation = answers.motivations
    .map((item) => MOTIVATION_LABELS[item])
    .join(", ");

  const involvement = answers.involvement
    ? INVOLVEMENT_LABELS[answers.involvement]
    : "Not answered";

  const involvementEffect =
    answers.involvement === "founder"
      ? "Allows founder-led programs and company-building steps."
      : answers.involvement === "open"
        ? "Keeps both partner-led and founder-led options available."
        : "Prioritizes paths and programs that do not require you to operate a company.";

  return [
    {
      label: "Your goal",
      answer: destinationLabel,
      effect: "Sets where this path ends.",
    },
    {
      label: "What matters",
      answer: motivation || "No return selected",
      effect: "Prioritizes routes, returns, and programs that support these outcomes.",
    },
    {
      label: "Starting point",
      answer: answers.asset ? ASSET_LABELS[answers.asset] : currentStateLabel,
      effect: `Places you at “${currentStateLabel}” and skips earlier stages.`,
    },
    {
      label: "Your role",
      answer: involvement,
      effect: involvementEffect,
    },
  ];
}

export function assetLabel(asset: AssetAnswer): string {
  return ASSET_LABELS[asset].toLowerCase().replace(/^(an?|the)\s+/, "");
}
