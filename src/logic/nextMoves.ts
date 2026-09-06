import {
  destinationPlanById,
  findTransition,
  nodeById,
  resourceById,
  resources,
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

/** Resources that must not appear unless the invention modality matches. */
const MODALITY_LOCKED: Record<string, string[]> = {
  "needleman-npic": ["therapeutic"],
  veritascience: ["therapeutic"],
  "bms-neuro": ["therapeutic"],
  "ninds-devices": ["device"],
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

function modalityOf(answers?: GuideAnswers): string | undefined {
  if (!answers?.asset) return undefined;
  return ASSET_TO_MODALITY[answers.asset];
}

/** True when a resource is eligible for the user's known invention type. */
export function resourceFitsAsset(
  resource: Resource,
  asset?: AssetAnswer,
): boolean {
  if (!asset) return true;
  const modality = ASSET_TO_MODALITY[asset];
  if (!modality) return true;

  const locked = MODALITY_LOCKED[resource.id];
  if (locked) return locked.includes(modality);

  if (!resource.domains.length) return true;
  if (resource.domains.includes(modality)) return true;
  // Device work often shares diagnostic tooling.
  if (modality === "device" && resource.domains.includes("diagnostic")) {
    return true;
  }
  return false;
}

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
  fromId: string | undefined,
  toId: string | undefined,
  answers?: GuideAnswers,
): number {
  let score = 0;
  if (fromId && resource.states.includes(fromId)) score += 2;
  if (toId && resource.states.includes(toId)) score += 3;
  if (!answers) return score;

  if (!resourceFitsAsset(resource, answers.asset)) return -Infinity;

  const modality = modalityOf(answers);
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
  } else if (answers.involvement === "founder" && resource.companyRequired) {
    score += 5;
  }

  return score;
}

function reasonForResource(
  resource: Resource,
  answers?: GuideAnswers,
  overridden = false,
): string {
  if (!answers) {
    return resource.usefulWhen[0]
      ? `Suggested when ${resource.usefulWhen[0].charAt(0).toLowerCase()}${resource.usefulWhen[0].slice(1)}.`
      : "A suggested program for this step — confirm fit before relying on it.";
  }

  const reasons: string[] = [];
  const modality = modalityOf(answers);
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
    return `${overridden ? "Matched instead of the default suggestion" : "Matched to your answers"} because ${reasons.join(" and ")}.`;
  }

  return resource.usefulWhen[0]
    ? `Suggested for this step when ${resource.usefulWhen[0].charAt(0).toLowerCase()}${resource.usefulWhen[0].slice(1)}.`
    : "A suggested program for this step — confirm fit before relying on it.";
}

/**
 * Prefer a modality/state-matched resource over the checklist fallback when
 * the user's invention type is known. Never surface modality-locked programs
 * that do not fit.
 */
export function resolveChecklistResource(
  fallbackId: string | undefined,
  answers: GuideAnswers | undefined,
  usedResourceIds: Set<string>,
  currentStateId?: string | null,
): { resourceId?: string; overridden: boolean } {
  const fallback =
    fallbackId && resourceById[fallbackId]
      ? resourceById[fallbackId]
      : undefined;
  const fallbackOk =
    Boolean(fallback) &&
    resourceFitsAsset(fallback!, answers?.asset) &&
    !usedResourceIds.has(fallback!.id);

  if (!answers?.asset && !currentStateId) {
    return {
      resourceId: fallbackOk ? fallback!.id : undefined,
      overridden: false,
    };
  }

  const candidates = resources.filter(
    (resource) =>
      resourceFitsAsset(resource, answers?.asset) &&
      !usedResourceIds.has(resource.id),
  );

  if (candidates.length === 0) {
    return {
      resourceId: fallbackOk ? fallback!.id : undefined,
      overridden: false,
    };
  }

  const ranked = candidates
    .map((resource, index) => ({
      resource,
      index,
      score:
        scoreResource(
          resource,
          currentStateId ?? undefined,
          undefined,
          answers,
        ) + (fallback && resource.id === fallback.id ? 3 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const best = ranked[0];
  if (!best || best.score === -Infinity) {
    return {
      resourceId: fallbackOk ? fallback!.id : undefined,
      overridden: false,
    };
  }

  // Without an invention-type answer, keep the fallback when it still fits.
  if (!answers?.asset && fallbackOk) {
    return { resourceId: fallback!.id, overridden: false };
  }

  const overridden = Boolean(fallback && best.resource.id !== fallback.id);
  return { resourceId: best.resource.id, overridden };
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
  const modality = modalityOf(answers);
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
        Boolean(item.resource) &&
        resourceFitsAsset(item.resource, answers?.asset),
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
    return nextMovesForDestination(destinationId, answers, currentStateId);
  }

  const usedResourceIds = new Set<string>();
  return window.map((fromId, index) => {
    const toId = window[index + 1] ?? destinationId;
    return moveFromNodes(fromId, toId, route, answers, usedResourceIds);
  });
}

export function nextMovesForDestination(
  destinationId: string,
  answers?: GuideAnswers,
  currentStateId?: string | null,
): NextMove[] {
  const plan = destinationPlanById[destinationId];
  if (!plan) return [];
  const usedResourceIds = new Set<string>();

  return plan.checklist.slice(0, 3).map((item, index) => {
    const { resourceId, overridden } = resolveChecklistResource(
      item.resourceId,
      answers,
      usedResourceIds,
      currentStateId,
    );
    if (resourceId) usedResourceIds.add(resourceId);
    const resource = resourceId ? resourceById[resourceId] : undefined;

    return {
      id: `${destinationId}-step-${index}`,
      title: item.title,
      why: item.why,
      evidenceRequired: item.evidenceRequired,
      academicReturn: item.academicReturn,
      resourceId,
      resourceReason: resource
        ? reasonForResource(resource, answers, overridden)
        : undefined,
      notNeeded: item.notNeeded,
      // Plan trap is an eligibility caveat — do not promote resource caveats
      // into the main next-step narrative.
      trap: item.trap,
      contact: resource?.contact,
    };
  });
}

export function routeForDestination(
  destinationId: string,
  answers?: GuideAnswers | null,
): Route | undefined {
  const plan = destinationPlanById[destinationId];
  const candidates = routes.filter((route) =>
    route.destinationIds.includes(destinationId),
  );

  if (answers?.asset && candidates.length > 0) {
    const modality = modalityOf(answers);

    // Prefer invention-type routes over destination defaults that are
    // modality-specific (clinical→therapeutic, licensing→device-license).
    if (destinationId === "dest-clinical") {
      if (modality === "therapeutic") {
        return routes.find((route) => route.id === "therapeutic") ?? candidates[0];
      }
      if (modality === "device" || modality === "software") {
        return (
          routes.find((route) => route.id === "device-license") ??
          candidates[0]
        );
      }
      if (modality === "research-tool") {
        return (
          routes.find((route) => route.id === "research-tool-adoption") ??
          candidates[0]
        );
      }
    }
    if (destinationId === "dest-licensing") {
      if (modality === "therapeutic") {
        return (
          routes.find((route) => route.id === "therapeutic") ?? candidates[0]
        );
      }
      if (modality && modality !== "therapeutic") {
        return (
          routes.find((route) => route.id === "device-license") ??
          candidates[0]
        );
      }
    }

    const ranked = [...candidates]
      .map((route) => {
        let score = 0;
        if (modality && route.modalities.includes(modality)) score += 6;
        if (plan && route.id === plan.defaultRouteId) score += 1;
        if (
          answers.involvement === "research-focus" ||
          answers.involvement === "advise"
        ) {
          score += route.companyRequired ? -4 : 2;
        }
        if (answers.involvement === "founder" && route.companyRequired) {
          score += 3;
        }
        return { route, score };
      })
      .sort((a, b) => b.score - a.score);
    if (ranked[0] && ranked[0].score > 0) return ranked[0].route;
  }

  if (plan) {
    const fromPlan = routes.find((route) => route.id === plan.defaultRouteId);
    if (fromPlan) return fromPlan;
  }
  return candidates[0];
}

export function summarizeRoute(route: Route): string {
  const returns = route.academicReturns.slice(0, 3).join(", ");
  const company = route.companyRequired
    ? "A company is the vehicle on this path."
    : "A company is not required.";
  return `${route.summary} Likely returns: ${returns}. ${company}`;
}

/** Format checklist notNeeded copy for the card. */
export function formatNotNeeded(notNeeded: string): string {
  const trimmed = notNeeded.trim();
  if (/^need\b/i.test(trimmed)) {
    return `You don’t ${trimmed}`;
  }
  return `You don’t need to ${trimmed}`;
}
