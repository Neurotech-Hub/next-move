import type { Route } from "../types/navigator";

/**
 * Pathway highlight sets for the journey overview / active route.
 *
 * `nodeIds` and `edgeIds` mark what to emphasize for a pathway — they are NOT
 * ordered step-by-step instructions. Branches may appear without a contiguous
 * spine walk between every pair. For chronological next-step guidance, use
 * destinationPlans checklists instead.
 */
export const routes: Route[] = [
  {
    id: "strengthen-research",
    title: "Strengthen the research",
    summary:
      "Treat the work as a scientific capability: preliminary data, collaborators, and the next grant — not a product.",
    nodeIds: ["s1", "s2", "s3", "dest-funding", "dest-research"],
    edgeIds: ["e-s1-s2", "e-s2-s3", "e-s1-funding", "e-s3-research"],
    destinationIds: ["dest-funding", "dest-research"],
    motivations: ["papers", "grants", "collaborators", "trainees"],
    modalities: ["general", "research-tool", "software"],
    academicReturns: [
      "preliminary data",
      "grant aims",
      "trainee projects",
      "collaborations",
    ],
    facultyCommitment: "Stays inside research time.",
    companyRequired: false,
  },
  {
    id: "research-tool-adoption",
    title: "Research tool → scientific adoption",
    summary:
      "Make a working method or tool reproducible, then get it into other labs — by distribution, not necessarily a company.",
    nodeIds: [
      "s3",
      "ms-validate-need",
      "s4",
      "dest-distribution",
      "dest-research",
    ],
    edgeIds: [
      "e-s3-validate",
      "e-validate-s4",
      "e-s3-dist",
      "e-s3-research",
    ],
    destinationIds: ["dest-distribution", "dest-research"],
    motivations: ["reach", "papers", "collaborators"],
    modalities: ["research-tool", "software", "reagent"],
    academicReturns: [
      "methods papers",
      "labs using the tool",
      "collaborations",
    ],
    facultyCommitment: "Moderate if your lab must support users.",
    companyRequired: false,
  },
  {
    id: "device-license",
    title: "Device → license without founding",
    summary:
      "Validate need, preserve options, de-risk the asset, and look for an organization that can take it forward.",
    // License path already answers the vehicle question — highlight s7 → s8 spine, not the fork.
    nodeIds: [
      "s3",
      "ms-validate-need",
      "s4",
      "ms-preserve-ip",
      "s5",
      "s6",
      "s7",
      "s8",
      "dest-licensing",
    ],
    edgeIds: [
      "e-s3-validate",
      "e-validate-s4",
      "e-s3-preserve",
      "e-preserve-s5",
      "e-s4-s6",
      "e-s5-s6",
      "e-s6-s7",
      "e-s7-s8",
      "e-s8-license",
    ],
    destinationIds: ["dest-licensing"],
    motivations: ["patients", "reach", "low-time"],
    modalities: ["device", "diagnostic", "software"],
    academicReturns: [
      "validation data",
      "trainee project",
      "possible methods paper",
      "industry collaborators",
      "possible inventor licensing return",
    ],
    facultyCommitment: "Moderate during validation; usually much lower than founding.",
    companyRequired: false,
  },
  {
    id: "therapeutic",
    title: "Therapeutic → partner path",
    summary:
      "Move from discovery toward a development candidate with modality-specific help — a startup is optional.",
    nodeIds: [
      "s1",
      "s2",
      "s3",
      "s4",
      "s6",
      "s7",
      "dest-clinical",
      "dest-funding",
    ],
    edgeIds: [
      "e-s1-s2",
      "e-s2-s3",
      "e-s3-s4",
      "e-s4-s6",
      "e-s6-s7",
      "e-s6-funding",
      "e-s7-clinical",
    ],
    destinationIds: ["dest-clinical", "dest-funding"],
    motivations: ["patients", "grants"],
    modalities: ["therapeutic"],
    academicReturns: [
      "drug-development expertise",
      "milestone-driven funding",
      "trainee industry exposure",
      "path toward IND without founding",
    ],
    facultyCommitment: "Moderate on a partner path; high if you operate a company.",
    companyRequired: false,
  },
  {
    id: "startup",
    title: "Build a company around it",
    summary:
      "Use a company only when no existing organization will develop, manufacture, or distribute the work.",
    // Startup already answers the vehicle question — highlight spine, not the unresolved fork.
    nodeIds: ["s7", "s8", "dest-startup"],
    edgeIds: ["e-s7-s8", "e-s8-startup"],
    destinationIds: ["dest-startup"],
    motivations: ["financial", "reach", "patients"],
    modalities: ["device", "therapeutic", "software", "research-tool"],
    academicReturns: [
      "a vehicle for deployment",
      "entrepreneurial learning",
      "possible equity — high uncertainty",
    ],
    facultyCommitment: "High if you operate it; moderate with an external CEO.",
    companyRequired: true,
  },
];
