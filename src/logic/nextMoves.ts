import {
  destinationPlanById,
  findTransition,
  nodeById,
  resourceById,
  routes,
} from "../data";
import type { NextMove, Route } from "../types/navigator";

function moveFromNodes(
  fromId: string,
  toId: string | undefined,
  route: Route,
  modality?: string,
): NextMove {
  const from = nodeById[fromId];
  const transition = toId ? findTransition(fromId, toId, modality) : undefined;
  const resourceId =
    transition?.resourceIds.find((id) => resourceById[id]) ??
    from?.resourceIds.find((id) => resourceById[id]);
  const resource = resourceId ? resourceById[resourceId] : undefined;

  return {
    id: `${fromId}-${toId ?? "goal"}`,
    title: from?.title ?? fromId,
    why: from?.details.whyItMatters ?? transition?.question ?? "",
    evidenceRequired:
      transition?.evidence ??
      from?.details.nextSteps[0] ??
      "Clear evidence that this step is done.",
    academicReturn:
      route.academicReturns[0] ??
      resource?.investigatorReturns[0] ??
      "A clearer next academic step.",
    resourceId,
    notNeeded:
      resource?.notFor[0] ??
      (route.companyRequired
        ? "Treating incorporation as the proof that the work mattered."
        : "A company or a patent, unless this path requires one."),
    trap: resource?.caveats[0],
    contact: resource?.contact,
    fromStateId: fromId,
    toStateId: toId,
  };
}

export function nextMovesForRoute(
  currentStateId: string,
  route: Route,
  modality?: string,
): NextMove[] {
  const steps = route.nodeIds.filter((id) => !id.startsWith("dest-"));
  const destinationId = route.destinationIds[0];
  let start = steps.indexOf(currentStateId);
  if (start < 0) start = 0;

  const window = steps.slice(start, start + 3);
  if (window.length === 0 && destinationId) {
    return nextMovesForDestination(destinationId);
  }

  return window.map((fromId, index) => {
    const toId = window[index + 1] ?? destinationId;
    return moveFromNodes(fromId, toId, route, modality);
  });
}

export function nextMovesForDestination(destinationId: string): NextMove[] {
  const plan = destinationPlanById[destinationId];
  if (!plan) return [];
  return plan.checklist.slice(0, 3).map((item, index) => {
    const resource = item.resourceId ? resourceById[item.resourceId] : undefined;
    return {
      id: `${destinationId}-step-${index}`,
      title: item.title,
      why: item.why,
      evidenceRequired: item.evidenceRequired,
      academicReturn: item.academicReturn,
      resourceId: item.resourceId,
      notNeeded: item.notNeeded,
      trap: item.trap ?? resource?.caveats[0],
      contact: resource?.contact,
    };
  });
}

export function routeForDestination(destinationId: string): Route | undefined {
  const plan = destinationPlanById[destinationId];
  if (plan) {
    const fromPlan = routes.find((route) => route.id === plan.defaultRouteId);
    if (fromPlan) return fromPlan;
  }
  return routes.find((route) => route.destinationIds.includes(destinationId));
}

export function summarizeRoute(route: Route): string {
  const returns = route.academicReturns.slice(0, 3).join(", ");
  const company = route.companyRequired
    ? "A company is the vehicle on this path."
    : "A company is not required.";
  return `${route.summary} Likely returns: ${returns}. ${company}`;
}
