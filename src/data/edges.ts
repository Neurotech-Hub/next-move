import type { MapEdge } from "../types/navigator";

// kind:
//  spine        — the main S0 → S9 path, always drawn on the overview map
//  fork         — a branch between conceptual nodes (milestones, IP detour), drawn on the overview map
//  destination  — a link into a destination; only drawn when highlighted or selected
export const edges: MapEdge[] = [
  { id: "e-s0-s1", source: "s0", target: "s1", kind: "spine" },
  { id: "e-s1-s2", source: "s1", target: "s2", kind: "spine" },
  { id: "e-s2-s3", source: "s2", target: "s3", kind: "spine" },
  { id: "e-s3-s4", source: "s3", target: "s4", kind: "spine" },
  { id: "e-s4-s6", source: "s4", target: "s6", kind: "spine" },
  { id: "e-s6-s7", source: "s6", target: "s7", kind: "spine" },
  { id: "e-s7-s8", source: "s7", target: "s8", kind: "spine" },
  { id: "e-s8-s9", source: "s8", target: "s9", kind: "spine" },

  { id: "e-s3-s5", source: "s3", target: "s5", kind: "fork" },
  { id: "e-s4-s5", source: "s4", target: "s5", kind: "fork" },
  { id: "e-s5-s6", source: "s5", target: "s6", kind: "fork" },
  { id: "e-s3-validate", source: "s3", target: "ms-validate-need", kind: "fork" },
  { id: "e-validate-s4", source: "ms-validate-need", target: "s4", kind: "fork" },
  { id: "e-s3-preserve", source: "s3", target: "ms-preserve-ip", kind: "fork" },
  { id: "e-preserve-s5", source: "ms-preserve-ip", target: "s5", kind: "fork" },
  { id: "e-s7-vehicle", source: "s7", target: "ms-license-vs-startup", kind: "fork" },
  { id: "e-vehicle-s8", source: "ms-license-vs-startup", target: "s8", kind: "fork" },

  { id: "e-s3-research", source: "s3", target: "dest-research", kind: "destination" },
  { id: "e-s1-funding", source: "s1", target: "dest-funding", kind: "destination" },
  { id: "e-s6-funding", source: "s6", target: "dest-funding", kind: "destination" },
  { id: "e-s3-dist", source: "s3", target: "dest-distribution", kind: "destination" },
  { id: "e-s5-dist", source: "s5", target: "dest-distribution", kind: "destination" },
  { id: "e-s7-clinical", source: "s7", target: "dest-clinical", kind: "destination" },
  { id: "e-s9-clinical", source: "s9", target: "dest-clinical", kind: "destination" },
  { id: "e-s8-license", source: "s8", target: "dest-licensing", kind: "destination" },
  { id: "e-s8-startup", source: "s8", target: "dest-startup", kind: "destination" },
  { id: "e-s9-dist", source: "s9", target: "dest-distribution", kind: "destination" },
];
