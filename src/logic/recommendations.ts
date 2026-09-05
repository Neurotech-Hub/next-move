import { nodeById, routes } from "../data";
import type {
  AssetAnswer,
  DestinationAnswer,
  GuideAnswers,
  InvolvementAnswer,
  Recommendation,
  Route,
} from "../types/navigator";
import { nextMovesForRoute, summarizeRoute } from "./nextMoves";

const ASSET_TO_STATE: Record<AssetAnswer, string> = {
  observation: "s0",
  idea: "s1",
  evidence: "s2",
  prototype: "s3",
  software: "s3",
  therapeutic: "s2",
  device: "s3",
  "research-tool": "s3",
  disclosed: "s5",
  unsure: "s1",
};

const ASSET_TO_MODALITY: Partial<Record<AssetAnswer, string>> = {
  software: "software",
  therapeutic: "therapeutic",
  device: "device",
  "research-tool": "research-tool",
};

export const DESTINATION_NODES: Record<
  Exclude<DestinationAnswer, "unsure">,
  string
> = {
  "clinical-use": "dest-clinical",
  licensing: "dest-licensing",
  startup: "dest-startup",
  "research-impact": "dest-research",
  funding: "dest-funding",
  distribution: "dest-distribution",
};

function modalityOf(answers: GuideAnswers): string | undefined {
  if (!answers.asset) return undefined;
  return ASSET_TO_MODALITY[answers.asset];
}

export function wantsStartup(
  destinations: DestinationAnswer[],
  involvement?: InvolvementAnswer,
): boolean {
  if (!destinations.includes("startup")) return false;
  if (involvement === "research-focus" || involvement === "advise") return false;
  return true;
}

function scoreRoute(routeId: string, answers: GuideAnswers): number {
  const route = routes.find((item) => item.id === routeId);
  if (!route) return -Infinity;

  const modality = modalityOf(answers);
  const dests = answers.destinations;
  const motives = answers.motivations;
  let score = 0;

  if (modality && route.modalities.includes(modality)) score += 4;
  for (const dest of dests) {
    if (dest === "unsure") continue;
    const nodeId = DESTINATION_NODES[dest];
    if (route.destinationIds.includes(nodeId)) score += 5;
  }
  for (const motive of motives) {
    if (route.motivations.includes(motive)) score += 2;
  }

  if (route.id === "startup") {
    if (!wantsStartup(dests, answers.involvement)) return -1;
    if (answers.involvement === "founder") score += 4;
    if (answers.involvement === "open") score += 2;
  }

  if (route.id === "device-license") {
    if (dests.includes("licensing") || dests.includes("clinical-use")) score += 2;
    if (
      answers.involvement === "research-focus" ||
      answers.involvement === "advise" ||
      motives.includes("low-time")
    ) {
      score += 3;
    }
    if (modality === "therapeutic") score -= 3;
  }

  if (route.id === "therapeutic") {
    if (modality === "therapeutic" || dests.includes("clinical-use")) score += 4;
    if (
      modality &&
      modality !== "therapeutic" &&
      !dests.includes("clinical-use")
    ) {
      score -= 4;
    }
  }

  if (route.id === "strengthen-research") {
    if (
      dests.includes("research-impact") ||
      dests.includes("funding") ||
      dests.includes("unsure")
    ) {
      score += 3;
    }
    if (
      motives.includes("papers") ||
      motives.includes("grants") ||
      motives.includes("collaborators")
    ) {
      score += 2;
    }
  }

  if (route.id === "research-tool-adoption") {
    if (
      modality === "research-tool" ||
      modality === "software" ||
      dests.includes("distribution")
    ) {
      score += 4;
    }
  }

  // Low-time / research-focus involvement should favor non-operator paths.
  if (
    (answers.involvement === "research-focus" ||
      answers.involvement === "advise" ||
      motives.includes("low-time")) &&
    !route.companyRequired
  ) {
    score += 2;
  }

  return score;
}

function explicitDestinationIds(answers: GuideAnswers): string[] {
  return answers.destinations
    .filter(
      (dest): dest is Exclude<DestinationAnswer, "unsure"> => dest !== "unsure",
    )
    .map((dest) => DESTINATION_NODES[dest]);
}

/** Prefer the user's stated destination when a route ends at more than one. */
export function primaryDestinationFor(
  route: Route,
  answers: GuideAnswers,
): string {
  const explicit = explicitDestinationIds(answers);
  const onRoute = explicit.find((id) => route.destinationIds.includes(id));
  if (onRoute) return onRoute;
  if (explicit[0]) return explicit[0];
  return route.destinationIds[0];
}

export function recommend(answers: GuideAnswers): Recommendation {
  const currentStateId = answers.asset
    ? ASSET_TO_STATE[answers.asset]
    : "s1";

  const ranked = [...routes]
    .map((route) => ({ route, score: scoreRoute(route.id, answers) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const primary = ranked[0]?.route ?? routes.find((r) => r.id === "strengthen-research")!;
  const routeIds = [primary.id];

  // Keep secondary suggestions only for hash/history; UI no longer switches paths.
  for (const item of ranked.slice(1, 3)) {
    if (!routeIds.includes(item.route.id)) routeIds.push(item.route.id);
  }

  const primaryDestinationId = primaryDestinationFor(primary, answers);
  const destinationIds = [primaryDestinationId];

  const here = nodeById[currentStateId];
  const suppressedStartup =
    answers.destinations.includes("startup") &&
    !wantsStartup(answers.destinations, answers.involvement);

  const summary = suppressedStartup
    ? "A company is optional from here. This path emphasizes getting the work used without you becoming the operator."
    : summarizeRoute(primary);

  const nextMoves = nextMovesForRoute(
    currentStateId,
    primary,
    answers,
    primaryDestinationId,
  );

  return {
    currentStateId,
    routeIds,
    destinationIds,
    summary,
    youAreHereLabel: here?.title ?? "Concept / discovery",
    nextMoves,
  };
}

export function emptyGuideAnswers(): GuideAnswers {
  return {
    destinations: [],
    motivations: [],
  };
}

export function isGuideComplete(answers: GuideAnswers): boolean {
  return Boolean(
    answers.asset &&
      answers.involvement &&
      answers.destinations.length > 0 &&
      answers.motivations.length > 0,
  );
}
