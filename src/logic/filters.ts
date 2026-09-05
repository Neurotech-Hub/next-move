import { nodes, resources } from "../data";
import type {
  Internality,
  MapNode,
  Resource,
  ResourcePriority,
  ResourcePurpose,
} from "../types/navigator";

export interface SearchHit {
  kind: "node" | "resource";
  id: string;
  title: string;
  subtitle: string;
  nodeId: string;
  resourceId?: string;
}

function haystack(parts: Array<string | string[] | undefined>): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : part ? [part] : []))
    .join(" ")
    .toLowerCase();
}

export function searchNavigator(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const nodeHits: SearchHit[] = nodes
    .filter((node) =>
      haystack([
        node.title,
        node.shortDescription,
        node.tags,
        node.details.whyItMatters,
        node.type,
      ]).includes(q),
    )
    .map((node) => ({
      kind: "node",
      id: node.id,
      title: node.title,
      subtitle: node.shortDescription,
      nodeId: node.id,
    }));

  const resourceHits: SearchHit[] = resources
    .filter((resource) =>
      haystack([
        resource.title,
        resource.organization,
        resource.whatYouGet,
        resource.whyYouMightCare,
        resource.usefulWhen,
        resource.notFor,
        resource.problemsSolved,
        resource.domains,
        resource.investigatorReturns,
      ]).includes(q),
    )
    .map((resource) => ({
      kind: "resource" as const,
      id: resource.id,
      title: resource.title,
      subtitle: resource.organization,
      nodeId: resource.states[0] ?? nodes[0].id,
      resourceId: resource.id,
    }));

  return [...nodeHits, ...resourceHits].slice(0, 12);
}

export function resourcesForNode(node: MapNode): Resource[] {
  return node.resourceIds
    .map((id) => resources.find((resource) => resource.id === id))
    .filter((resource): resource is Resource => Boolean(resource));
}

const PURPOSE_FROM_PROBLEM: Record<string, ResourcePurpose> = {
  funding: "funding",
  "pilot-funding": "funding",
  grants: "funding",
  "de-risking": "funding",
  "therapeutic-development": "funding",
  ind: "funding",
  "small-business": "funding",
  "device-translation": "funding",
  ip: "ip",
  disclosure: "ip",
  license: "ip",
  transfer: "ip",
  expertise: "expertise",
  "external-feedback": "expertise",
  "need-validation": "expertise",
  "customer-discovery": "expertise",
  education: "expertise",
  startup: "company",
  "founder-coaching": "company",
  "business-model": "company",
  "venture-exploration": "company",
  investors: "company",
  competition: "company",
  prototype: "research",
  engineering: "research",
  "technical-development": "research",
  collaborators: "research",
  neuroscience: "research",
  "study-design": "research",
  "translational-evidence": "research",
  orientation: "research",
  discovery: "research",
  trainees: "research",
  collaboration: "research",
};

export function resourcePriority(resource: Resource): ResourcePriority {
  return resource.priority ?? "core";
}

export function resourcePurposes(resource: Resource): ResourcePurpose[] {
  if (resource.purposes?.length) return resource.purposes;
  const purposes = new Set<ResourcePurpose>();
  for (const problem of resource.problemsSolved) {
    const purpose = PURPOSE_FROM_PROBLEM[problem];
    if (purpose) purposes.add(purpose);
  }
  return purposes.size ? [...purposes] : ["research"];
}

export function filterResources(options: {
  source?: Internality | "all";
  purpose?: ResourcePurpose | "all";
  priority?: ResourcePriority | "all";
  query?: string;
}): Resource[] {
  const source = options.source ?? "all";
  const purpose = options.purpose ?? "all";
  const priority = options.priority ?? "all";
  const query = options.query?.trim().toLowerCase() ?? "";

  return resources.filter((resource) => {
    if (source !== "all" && resource.internality !== source) return false;
    if (priority !== "all" && resourcePriority(resource) !== priority) {
      return false;
    }
    if (purpose !== "all" && !resourcePurposes(resource).includes(purpose)) {
      return false;
    }
    if (!query) return true;
    return haystack([
      resource.title,
      resource.organization,
      resource.whatYouGet,
      resource.usefulWhen,
      resource.notFor,
      resource.investigatorReturns,
      resource.caveats,
    ]).includes(query);
  });
}
