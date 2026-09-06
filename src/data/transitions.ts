import type { Transition } from "../types/navigator";

export const transitions: Transition[] = [
  {
    id: "t-s0-s1",
    from: "s0",
    to: "s1",
    question: "Can you state the problem and proposed solution separately?",
    evidence: "A defined need or problem, and a candidate approach.",
    resourceIds: ["neurotech-hub", "icts", "hope-center"],
  },
  {
    id: "t-s1-s2",
    from: "s1",
    to: "s2",
    question: "What is the cheapest convincing test of the core principle?",
    evidence: "A first decisive feasibility experiment or prototype.",
    resourceIds: ["neurotech-hub", "icts", "center-drug-discovery", "mhealth-research-core"],
  },
  {
    id: "t-s2-s3",
    from: "s2",
    to: "s3",
    question:
      "Does it work reliably enough that somebody other than the inventor can evaluate it?",
    evidence: "Repeatability, controls, and a defined protocol or performance.",
    resourceIds: [
      "neurotech-hub",
      "hope-center",
      "icts",
      "center-drug-discovery",
      "mhealth-research-core",
    ],
  },
  {
    id: "t-s3-s4",
    from: "s3",
    to: "s4",
    question: "Who outside your lab cares, and what do they actually need?",
    evidence: "External user, clinical, or industry feedback in their words.",
    resourceIds: ["dep", "xir", "skandalaris-vd", "icts", "jroc", "healthcare-innovation-lab"],
  },
  {
    id: "t-s3-s5",
    from: "s3",
    to: "s5",
    question:
      "Should we protect, license, distribute, partner, open-release — or combine these?",
    evidence: "An OTM evaluation and a transfer strategy.",
    resourceIds: ["otm-core", "otm-inventor-companion"],
  },
  {
    id: "t-s4-s5",
    from: "s4",
    to: "s5",
    question:
      "Should we protect, license, distribute, partner, open-release — or combine these?",
    evidence: "An OTM evaluation and a transfer strategy.",
    resourceIds: ["otm-core", "otm-inventor-companion"],
  },
  {
    id: "t-s4-s6",
    from: "s4",
    to: "s6",
    question: "What three uncertainties prevent an external party from saying yes?",
    evidence: "A prioritized risk list and a milestone plan.",
    resourceIds: [
      "dep",
      "icts",
      "needleman-npic",
      "veritascience",
      "ninds-devices",
      "center-drug-discovery",
      "center-clinical-studies",
      "jroc",
    ],
  },
  {
    id: "t-s5-s6",
    from: "s5",
    to: "s6",
    question: "What three uncertainties prevent an external party from saying yes?",
    evidence: "A prioritized risk list and a milestone plan.",
    resourceIds: [
      "dep",
      "icts",
      "needleman-npic",
      "veritascience",
      "center-drug-discovery",
      "center-clinical-studies",
    ],
  },
  {
    id: "t-s6-s7",
    from: "s6",
    to: "s7",
    question: "What experiment or prototype removes the largest transfer risk?",
    evidence: "Milestone-linked data an outsider can evaluate.",
    resourceIds: [
      "gap-fund",
      "icts",
      "hope-center",
      "nih-ninds-sbir",
      "center-clinical-studies",
      "icts-regulatory-support",
    ],
  },
  {
    id: "t-s6-s7-therapeutic",
    from: "s6",
    to: "s7",
    question: "What is required to move toward a development candidate or IND?",
    evidence:
      "A target or product profile, plus efficacy, safety, and developability appropriate to the modality.",
    resourceIds: [
      "needleman-npic",
      "center-drug-discovery",
      "veritascience",
      "bms-neuro",
      "nih-ninds-sbir",
    ],
    modalities: ["therapeutic"],
  },
  {
    id: "t-s6-s7-software",
    from: "s6",
    to: "s7",
    question: "What digital-health or remote-study evidence removes the largest clinical risk?",
    evidence:
      "A fundable mHealth or software-as-intervention plan, including workflow, vendor, and Part 11 questions.",
    resourceIds: [
      "mhealth-research-core",
      "center-clinical-studies",
      "icts-regulatory-support",
      "healthcare-innovation-lab",
    ],
    modalities: ["software"],
  },
  {
    id: "t-s7-s8-license",
    from: "s7",
    to: "s8",
    question: "Is there an organization that can take this forward?",
    evidence: "A transfer package, diligence materials, and an interested counterparty.",
    resourceIds: ["otm-core", "dep", "jroc"],
  },
  {
    id: "t-s7-s8-startup",
    from: "s7",
    to: "s8",
    question: "Does this require a new company, and who will run it?",
    evidence: "A team, IP/license path, customer evidence, and a financing plan.",
    resourceIds: ["otm-eir", "skandalaris-vd", "biogenerator", "cortex-ignite"],
  },
  {
    id: "t-s8-s9",
    from: "s8",
    to: "s9",
    question: "What capital or partner matches the next deployment milestone?",
    evidence: "A vehicle, a budget, and fundable or transferable next steps.",
    resourceIds: ["nih-ninds-sbir", "biogenerator", "arch-grants", "mtc-idea"],
  },
  {
    id: "t-s3-dist",
    from: "s3",
    to: "dest-distribution",
    question: "Is the objective broad scientific use rather than venture formation?",
    evidence: "A stable tool, documentation or support, and transfer terms.",
    resourceIds: ["otm-core", "neurotech-hub"],
  },
  {
    id: "t-s1-funding",
    from: "s1",
    to: "dest-funding",
    question: "What evidence will the money buy?",
    evidence: "A named milestone, cost, duration, and downstream decision.",
    resourceIds: ["icts", "hope-center"],
  },
  {
    id: "t-s6-funding",
    from: "s6",
    to: "dest-funding",
    question: "What evidence will the money buy?",
    evidence: "A named milestone that removes a specific uncertainty.",
    resourceIds: ["gap-fund", "icts", "needleman-npic", "center-drug-discovery"],
  },
];

export function findTransition(
  from: string,
  to: string,
  modality?: string,
): Transition | undefined {
  const matches = transitions.filter(
    (item) => item.from === from && item.to === to,
  );
  if (modality) {
    const specific = matches.find((item) =>
      item.modalities?.includes(modality),
    );
    if (specific) return specific;
  }
  return matches.find((item) => !item.modalities?.length) ?? matches[0];
}
