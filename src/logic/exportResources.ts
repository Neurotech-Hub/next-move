import type { Resource } from "../types/navigator";
import {
  CONTEXT_EXPAND,
  CONTEXT_GATED,
  MODALITY_LOCKED,
} from "../data/resourceGating";
import { resources } from "../data/resources";

export const RESOURCE_CATALOG_PATH = "resources.json";
export const RESOURCE_CSV_PATH = "resources.csv";
export const RESOURCE_KB_DIR = "kb";

export interface ResourceCatalog {
  source: "next-move";
  version: string;
  resourceCount: number;
  usage: {
    json: string;
    csv: string;
    knowledgeBase: string;
  };
  gating: {
    modalityLocked: Record<string, string[]>;
    contextGated: Record<string, string[]>;
    contextExpand: Record<string, string[]>;
  };
  resources: Resource[];
}

export function buildResourceCatalog(version = "0.2.0"): ResourceCatalog {
  return {
    source: "next-move",
    version,
    resourceCount: resources.length,
    usage: {
      json: "Fetch this file from the deployed site. Botpress Execute Code can filter rows; do not RAG-search this blob as one document.",
      csv: "Import into a Botpress Table (one row per program). Use | -separated array columns for filters.",
      knowledgeBase:
        "Upload public/kb/*.md (one file per program) as a Knowledge Base source for conversational search.",
    },
    gating: {
      modalityLocked: MODALITY_LOCKED,
      contextGated: CONTEXT_GATED,
      contextExpand: CONTEXT_EXPAND,
    },
    resources,
  };
}

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

function joinList(values: string[] | undefined): string {
  return (values ?? []).join("|");
}

export function catalogToCsv(catalog: ResourceCatalog): string {
  const headers = [
    "id",
    "title",
    "organization",
    "url",
    "contact",
    "internality",
    "needs",
    "inventionTypes",
    "locations",
    "domains",
    "states",
    "problemsSolved",
    "whatYouGet",
    "whyYouMightCare",
    "usefulWhen",
    "notFor",
    "eligibility",
    "caveats",
    "investigatorReturns",
    "funding",
    "status",
    "nextDeadline",
    "companyRequired",
    "requiresDisclosure",
    "contextGate",
    "modalityLock",
  ];

  const rows = catalog.resources.map((resource) =>
    [
      resource.id,
      resource.title,
      resource.organization,
      resource.url,
      resource.contact ?? "",
      resource.internality,
      joinList(resource.needs),
      joinList(resource.inventionTypes),
      joinList(resource.locations),
      joinList(resource.domains),
      joinList(resource.states),
      joinList(resource.problemsSolved),
      resource.whatYouGet,
      resource.whyYouMightCare,
      joinList(resource.usefulWhen),
      joinList(resource.notFor),
      resource.eligibility,
      joinList(resource.caveats),
      joinList(resource.investigatorReturns),
      resource.funding ?? "",
      resource.status,
      resource.nextDeadline ?? "",
      String(resource.companyRequired),
      String(resource.requiresDisclosure),
      joinList(catalog.gating.contextGated[resource.id]),
      joinList(catalog.gating.modalityLocked[resource.id]),
    ]
      .map((cell) => csvCell(cell))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n") + "\n";
}

function listSection(title: string, items: string[]): string {
  if (!items.length) return "";
  return `\n## ${title}\n${items.map((item) => `- ${item}`).join("\n")}\n`;
}

export function resourceToMarkdown(resource: Resource, catalog: ResourceCatalog): string {
  const gate = catalog.gating.contextGated[resource.id];
  const lock = catalog.gating.modalityLocked[resource.id];
  return [
    `# ${resource.title}`,
    "",
    `id: ${resource.id}`,
    `Organization: ${resource.organization}`,
    `URL: ${resource.url}`,
    resource.contact ? `Contact: ${resource.contact}` : null,
    `Location: ${resource.locations.join(", ")}`,
    `Invention types: ${resource.inventionTypes.join(", ")}`,
    `Domains: ${resource.domains.join(", ")}`,
    `Stages: ${resource.states.join(", ")}`,
    `Needs: ${resource.needs.join(", ")}`,
    lock ? `Modality lock: ${lock.join(", ")}` : null,
    gate ? `Only show when context includes: ${gate.join(", ")}` : null,
    resource.companyRequired ? "Requires a company: yes" : "Requires a company: no",
    "",
    "## What you get",
    resource.whatYouGet,
    "",
    "## Why you might care",
    resource.whyYouMightCare,
    listSection("Useful when", resource.usefulWhen),
    listSection("Not for", resource.notFor),
    "",
    "## Eligibility",
    resource.eligibility,
    listSection("Caveats", resource.caveats),
    listSection("Problems solved", resource.problemsSolved),
    resource.funding ? `\n## Funding\n${resource.funding}\n` : "",
  ]
    .filter((line) => line !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}
