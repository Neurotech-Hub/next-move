import type { Route } from "../types/navigator";

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
  },
  {
    id: "device-license",
    title: "Device → license without founding",
    summary:
      "Validate need, preserve options, de-risk the asset, and look for an organization that can take it forward.",
    nodeIds: [
      "s3",
      "ms-validate-need",
      "s4",
      "ms-preserve-ip",
      "s5",
      "s6",
      "s7",
      "ms-license-vs-startup",
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
      "e-s7-vehicle",
      "e-vehicle-s8",
      "e-s8-license",
    ],
    destinationIds: ["dest-licensing"],
    motivations: ["patients", "reach", "low-time"],
    modalities: ["device", "diagnostic", "software"],
  },
  {
    id: "therapeutic",
    title: "Therapeutic → partner path",
    summary:
      "Move from discovery toward a development candidate with modality-specific help — a startup is optional.",
    nodeIds: ["s1", "s2", "s6", "s7", "dest-clinical", "dest-funding"],
    edgeIds: ["e-s1-s2", "e-s6-s7", "e-s6-funding", "e-s7-clinical"],
    destinationIds: ["dest-clinical", "dest-funding"],
    motivations: ["patients", "grants"],
    modalities: ["therapeutic"],
  },
  {
    id: "startup",
    title: "Build a company around it",
    summary:
      "Use a company only when no existing organization will develop, manufacture, or distribute the work.",
    nodeIds: [
      "s7",
      "ms-license-vs-startup",
      "s8",
      "s9",
      "dest-startup",
    ],
    edgeIds: [
      "e-s7-vehicle",
      "e-vehicle-s8",
      "e-s8-s9",
      "e-s8-startup",
    ],
    destinationIds: ["dest-startup"],
    motivations: ["financial", "reach", "patients"],
    modalities: ["device", "therapeutic", "software", "research-tool"],
  },
];
