/** Resources that must not appear unless the invention modality matches. */
export const MODALITY_LOCKED: Record<string, string[]> = {
  "needleman-npic": ["therapeutic"],
  veritascience: ["therapeutic"],
  "bms-neuro": ["therapeutic"],
  "center-drug-discovery": ["therapeutic"],
  "ninds-devices": ["device"],
};

/**
 * Specialized cores that share clinical states (s6–s8) but must not fire on
 * stage match alone. Required tags are researchContexts and/or problemsSolved.
 */
export const CONTEXT_GATED: Record<string, string[]> = {
  ecrc: ["emergency-care"],
  "siteman-sip-rda": ["cancer"],
  "trial-care": ["multicenter-trial"],
  "mhealth-research-core": ["digital-health", "mhealth"],
  "healthcare-innovation-lab": ["clinical-workflow", "digital-health"],
  jroc: ["industry-collaboration", "industry-sponsored-research"],
};

export const CONTEXT_EXPAND: Record<string, string[]> = {
  "digital-health": ["digital-health", "mhealth", "clinical-workflow"],
  "clinical-workflow": ["clinical-workflow", "digital-health"],
  "industry-collaboration": [
    "industry-collaboration",
    "industry-sponsored-research",
    "research-contracts",
    "collaboration-agreements",
  ],
  "multicenter-trial": ["multicenter-trial"],
  cancer: ["cancer"],
  "emergency-care": ["emergency-care"],
  mhealth: ["mhealth", "digital-health"],
};
