import { nodes, resources } from "../data";
import type { MapNode, Resource } from "../types/navigator";

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
