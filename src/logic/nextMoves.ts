import {
  destinationPlanById,
  findTransition,
  nodeById,
  resourceById,
  routes,
} from "../data";
import type {
  AssetAnswer,
  GuideAnswers,
  MotivationAnswer,
  NextMove,
  Resource,
  Route,
} from "../types/navigator";
import { assetLabel } from "./guideSummary";

const ASSET_TO_MODALITY: Partial<Record<AssetAnswer, string>> = {
  software: "software",
  therapeutic: "therapeutic",
  device: "device",
  "research-tool": "research-tool",
};

const MOTIVATION_TERMS: Record<MotivationAnswer, string[]> = {
  papers: ["paper", "publication", "method", "dataset", "citation"],
  grants: ["grant", "funding", "pilot", "preliminary data", "personnel"],
  trainees: ["trainee", "student", "training"],
  collaborators: ["collaborator", "collaboration", "network"],
  reach: ["adoption", "distribution", "users", "reach", "license"],
  patients: ["patient", "clinical", "therapeutic", "health"],
  financial: ["equity", "investor", "licensing return", "capital"],
  "low-time": ["research focus", "without founding", "not required"],
};

function resourceText(resource: Resource): string {
  return [
    ...resource.domains,
    ...resource.problemsSolved,
    ...resource.investigatorReturns,
    ...resource.usefulWhen,
    resource.whatYouGet,
    resource.whyYouMightCare,
  ]
    .join(" ")
    .toLowerCase();
}

function scoreResource(
  resource: Resource,
  fromId: string,
  toId: string | undefined,
  answers?: GuideAnswers,
): number {
  let score = 0;
  if (resource.states.includes(fromId)) score += 2;
  if (toId && resource.states.includes(toId)) score += 3;
  if (!answers) return score;

  const modality = answers.asset
    ? ASSET_TO_MODALITY[answers.asset]
    : undefined;
  if (modality && resource.domains.includes(modality)) score += 8;

  const text = resourceText(resource);
  for (const motivation of answers.motivations) {
    const matches = MOTIVATION_TERMS[motivation].filter((term) =>
      text.includes(term),
    ).length;
    score += Math.min(matches, 3) * 2;
  }

  if (
    answers.involvement === "research-focus" ||
    answers.involvement === "advise"
  ) {
    score += resource.companyRequired ? -20 : 4;
  } else if (
    answers.involvement === "founder" &&
    resource.companyRequired
  ) {
    score += 5;
  }

  return score;
}

function reasonForResource(
  resource: Resource,
  answers?: GuideAnswers,
): string {
  if (!answers) {
    return resource.usefulWhen[0]
      ? `This program is useful when ${resource.usefulWhen[0].charAt(0).toLowerCase()}${resource.usefulWhen[0].slice(1)}.`
      : "This program supports the evidence needed for this step.";
  }

  const reasons: string[] = [];
  const modality = answers.asset
    ? ASSET_TO_MODALITY[answers.asset]
    : undefined;
  if (modality && resource.domains.includes(modality) && answers.asset) {
    reasons.push(`it supports ${assetLabel(answers.asset)} work`);
  }

  const text = resourceText(resource);
  const matchedReturn = answers.motivations.find((motivation) =>
    MOTIVATION_TERMS[motivation].some((term) => text.includes(term)),
  );
  if (matchedReturn) {
    const returned = resource.investigatorReturns.find((item) =>
      MOTIVATION_TERMS[matchedReturn].some((term) =>
        item.toLowerCase().includes(term),
      ),
    );
    if (returned) reasons.push(`it can return ${returned}`);
  }

  if (
    !resource.companyRequired &&
    (answers.involvement === "research-focus" ||
      answers.involvement === "advise")
  ) {
    reasons.push("it does not require you to operate a company");
  }

  if (reasons.length > 0) {
    return `Matched to your answers because ${reasons.join(" and ")}.`;
  }

  return resource.usefulWhen[0]
    ? `Matched to this step because ${resource.usefulWhen[0].charAt(0).toLowerCase()}${resource.usefulWhen[0].slice(1)}.`
    : "Matched to the evidence needed for this step.";
}

function moveFromNodes(
  fromId: string,
  toId: string | undefined,
  route: Route,
  answers?: GuideAnswers,
  usedResourceIds = new Set<string>(),
): NextMove {
  const from = nodeById[fromId];
  const to = toId ? nodeById[toId] : undefined;
  const modality = answers?.asset
    ? ASSET_TO_MODALITY[answers.asset]
    : undefined;
  const transition = toId ? findTransition(fromId, toId, modality) : undefined;
  const candidateIds = [
    ...(transition?.resourceIds ?? []),
    ...(from?.resourceIds ?? []),
    ...(to?.resourceIds ?? []),
  ].filter((id, index, list) => list.indexOf(id) === index);
  const resourceId = candidateIds
    .map((id, index) => ({
      id,
      index,
      resource: resourceById[id],
    }))
    .filter(
      (
        item,
      ): item is { id: string; index: number; resource: Resource } =>
        Boolean(item.resource),
    )
    .sort(
      (a, b) =>
        scoreResource(b.resource, fromId, toId, answers) +
          (transition?.resourceIds.includes(b.id) ? 12 : 0) -
          (usedResourceIds.has(b.id) ? 10 : 0) -
          (scoreResource(a.resource, fromId, toId, answers) +
            (transition?.resourceIds.includes(a.id) ? 12 : 0) -
            (usedResourceIds.has(a.id) ? 10 : 0)) ||
        a.index - b.index,
    )[0]?.id;
  const resource = resourceId ? resourceById[resourceId] : undefined;
  if (resourceId) usedResourceIds.add(resourceId);

  return {
    id: `${fromId}-${toId ?? "goal"}`,
    title: from?.details.nextSteps[0] ?? from?.title ?? fromId,
    why: from?.details.whyItMatters ?? transition?.question ?? "",
    evidenceRequired:
      transition?.evidence ??
      from?.details.nextSteps[0] ??
      "Clear evidence that this step is done.",
    academicReturn:
      resource?.investigatorReturns[0] ??
      route.academicReturns[0] ??
      "A clearer next academic step.",
    resourceId,
    resourceReason: resource
      ? reasonForResource(resource, answers)
      : undefined,
    notNeeded:
      route.companyRequired
        ? "treat incorporation as the proof that the work mattered."
        : "need a company or a patent, unless this path requires one.",
    trap: resource?.caveats[0],
    contact: resource?.contact,
    fromStateId: fromId,
    toStateId: toId,
  };
}

export function nextMovesForRoute(
  currentStateId: string,
  route: Route,
  answers?: GuideAnswers,
  focusedDestinationId?: string | null,
): NextMove[] {
  const steps = route.nodeIds.filter((id) => !id.startsWith("dest-"));
  const destinationId =
    focusedDestinationId &&
    route.destinationIds.includes(focusedDestinationId)
      ? focusedDestinationId
      : route.destinationIds[0];
  let start = steps.indexOf(currentStateId);
  if (start < 0) start = 0;

  const window = steps.slice(start, start + 3);
  if (window.length === 0 && destinationId) {
    return nextMovesForDestination(destinationId);
  }

  const usedResourceIds = new Set<string>();
  return window.map((fromId, index) => {
    const toId = window[index + 1] ?? destinationId;
    return moveFromNodes(fromId, toId, route, answers, usedResourceIds);
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
      resourceReason: resource
        ? reasonForResource(resource)
        : undefined,
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
