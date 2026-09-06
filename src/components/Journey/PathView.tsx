import { useEffect, useRef } from "react";
import { edges, nodeById, nodes, regions } from "../../data";
import {
  shouldShowVehicleBridge,
  VEHICLE_BRIDGE_ID,
} from "../../logic/vehicleBridge";
import { useNavigator } from "../../state/NavigatorContext";
import type { MapNode } from "../../types/navigator";

export { VEHICLE_BRIDGE_ID } from "../../logic/vehicleBridge";

const stateNodes = nodes.filter((node) => node.type === "state");

export function isVehicleBridge(node: MapNode): boolean {
  return node.id === VEHICLE_BRIDGE_ID;
}

function isStackedLayout() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1023px)").matches
  );
}

function captionFor(node: MapNode | undefined, isCurrent: boolean): string {
  if (!node) {
    return "";
  }
  if (node.type === "destination") {
    return "";
  }
  if (node.id === VEHICLE_BRIDGE_ID) {
    return "You’re looking at the bridge into Translate — compare how the work can reach users before the path is locked in.";
  }
  if (node.type === "milestone") {
    return "You’re looking at an optional step — useful work at this stage, not a numbered requirement.";
  }
  if (isCurrent) {
    return "You’re likely here. The next moves on the right start from this stage.";
  }
  return "Step on this path. Open it to see the next evidence to collect.";
}

/** Optional milestones that leave a state (fork edges), excluding the vehicle bridge. */
export function milestonesLeaving(stateId: string): MapNode[] {
  return edges
    .filter((edge) => edge.kind === "fork" && edge.source === stateId)
    .map((edge) => nodeById[edge.target])
    .filter(
      (node): node is MapNode =>
        node?.type === "milestone" && !isVehicleBridge(node),
    );
}

/** Bridge milestones that feed into a state (shown in the target region). */
export function bridgeMilestonesInto(stateId: string): MapNode[] {
  return edges
    .filter((edge) => edge.kind === "fork" && edge.target === stateId)
    .map((edge) => nodeById[edge.source])
    .filter(
      (node): node is MapNode =>
        node?.type === "milestone" && isVehicleBridge(node),
    );
}

/**
 * Full-journey steps for a region.
 * Nested optional milestones sit indented under their source state.
 * The vehicle bridge sits in Translate before s8 — peer, not nested.
 */
export function stepsForRegion(regionId: string): {
  node: MapNode;
  indented: boolean;
  bridge: boolean;
}[] {
  const steps = stateNodes
    .filter((node) => node.region === regionId)
    .sort((a, b) => a.position.x - b.position.x);
  const items: { node: MapNode; indented: boolean; bridge: boolean }[] = [];
  const seen = new Set<string>();

  for (const state of steps) {
    for (const milestone of bridgeMilestonesInto(state.id)) {
      if (seen.has(milestone.id)) continue;
      seen.add(milestone.id);
      items.push({ node: milestone, indented: false, bridge: true });
    }
    items.push({ node: state, indented: false, bridge: false });
    seen.add(state.id);
    for (const milestone of milestonesLeaving(state.id)) {
      if (seen.has(milestone.id)) continue;
      seen.add(milestone.id);
      items.push({ node: milestone, indented: true, bridge: false });
    }
  }

  return items;
}

function PathStep({
  node,
  index,
  isCurrent,
  isGoal,
  indented = false,
  bridge = false,
}: {
  node: MapNode;
  index: number | null;
  isCurrent: boolean;
  isGoal: boolean;
  indented?: boolean;
  bridge?: boolean;
}) {
  const { selectNode, selectedNodeId } = useNavigator();
  const selected = selectedNodeId === node.id;
  const milestone = node.type === "milestone";

  return (
    <li
      className={`relative flex items-start gap-4 ${indented ? "ml-12" : ""} ${
        bridge ? "my-1" : ""
      }`}
    >
      <span
        className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition duration-200 ${
          isCurrent
            ? "border-washu bg-washu text-white shadow-[0_0_0_5px_rgba(225,75,82,0.16),0_0_20px_rgba(225,75,82,0.4)]"
            : isGoal
              ? "border-washu/50 bg-[color-mix(in_srgb,var(--color-washu)_22%,var(--color-card))] text-washu"
              : milestone
                ? "border-dashed border-sage/70 bg-card text-sage"
                : "border-gold/80 bg-gold text-paper shadow-[0_0_14px_rgba(217,160,84,0.22)]"
        }`}
        aria-hidden
      >
        {milestone ? "·" : index}
      </span>
      <button
        type="button"
        onClick={() => selectNode(node.id)}
        aria-pressed={selected}
        aria-current={isCurrent ? "step" : undefined}
        className={`flex-1 rounded-2xl border px-4 py-3 text-left transition duration-200 ${
          selected
            ? "border-ink/35 bg-raise shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
            : isCurrent
              ? "border-washu/50 bg-raise shadow-[0_0_28px_rgba(225,75,82,0.14),0_12px_28px_rgba(0,0,0,0.35)]"
              : bridge
                ? "border-sage/35 bg-card/90 hover:border-sage/50 hover:bg-raise/70"
                : "border-line/70 bg-card/80 hover:border-ink/25 hover:bg-raise/70 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        }`}
      >
        {isCurrent && (
          <span className="font-mono mb-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-washu">
            You are here
          </span>
        )}
        {isGoal && !isCurrent && (
          <span className="font-mono mb-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-washu">
            Your goal
          </span>
        )}
        {bridge && (
          <span className="font-mono mb-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-sage">
            How it reaches users
          </span>
        )}
        {milestone && !bridge && (
          <span className="font-mono mb-1 block text-[9px] font-medium uppercase tracking-[0.18em] text-sage">
            Optional step
          </span>
        )}
        <span className="font-display block text-[17px] leading-snug text-ink">
          {node.title}
        </span>
        <span className="mt-1 block text-[13px] leading-relaxed text-muted">
          {node.shortDescription}
        </span>
      </button>
    </li>
  );
}

/**
 * Keep path stages plus only the focused destination (not sibling goals).
 * Omits the vehicle bridge when the focused goal already answers that decision.
 */
export function nodesForIsolatedPath(
  pathIds: string[],
  focusedDestinationId: string | null,
): MapNode[] {
  const showBridge = shouldShowVehicleBridge(focusedDestinationId);
  return pathIds
    .filter((id) => {
      if (id === VEHICLE_BRIDGE_ID && !showBridge) return false;
      if (!id.startsWith("dest-")) return true;
      if (!focusedDestinationId) return false;
      return id === focusedDestinationId;
    })
    .map((id) => nodes.find((node) => node.id === id))
    .filter((node): node is MapNode => Boolean(node));
}

export function PathView() {
  const {
    activeRoute,
    recommendation,
    focusedDestinationId,
    selectedNodeId,
    showFullJourney,
    setShowFullJourney,
  } = useNavigator();
  const pathRef = useRef<HTMLDivElement>(null);
  const previousGoal = useRef(focusedDestinationId);

  // On mobile the journey is a single scrolling column. Selecting a goal should
  // bring "Your pathway" into view instead of leaving the user on the goals list.
  useEffect(() => {
    if (!focusedDestinationId || previousGoal.current === focusedDestinationId) {
      previousGoal.current = focusedDestinationId;
      return;
    }
    previousGoal.current = focusedDestinationId;
    if (!isStackedLayout()) return;
    pathRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [focusedDestinationId]);

  const pathIds = activeRoute?.nodeIds ?? [];
  const isolated = pathIds.length > 0 && !showFullJourney;
  const currentId = recommendation?.currentStateId;
  const selected = selectedNodeId
    ? nodes.find((node) => node.id === selectedNodeId)
    : undefined;

  const isolatedNodes = isolated
    ? nodesForIsolatedPath(pathIds, focusedDestinationId)
    : [];

  let numberedStep = 0;
  const caption = captionFor(selected, selected?.id === currentId);

  return (
    <div
      ref={pathRef}
      className="field-bg flex min-h-0 flex-col px-4 pb-10 pt-4 sm:px-8 sm:pt-6 lg:h-full lg:overflow-y-auto lg:pb-16"
      aria-label={
        recommendation ? "B. Your tailored pathway" : "B. Your pathway"
      }
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
          <span aria-hidden="true">B. </span>
          {recommendation ? "Your tailored pathway" : "Your pathway"}
        </p>
        <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
          {activeRoute?.title ?? "The inventor's roadmap."}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-muted">
          <Legend swatch="bg-washu" label="You are here" />
          <Legend swatch="bg-gold" label="On this path" />
          <Legend
            swatch="border border-dashed border-sage bg-transparent"
            label="Optional step"
          />
          <Legend swatch="bg-washu/20" label="Your goal" />
        </div>
        {caption && (
          <p className="mt-2 text-sm leading-relaxed text-ink/80">{caption}</p>
        )}

        {activeRoute && isolated && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {recommendation?.summary ?? activeRoute.summary}
          </p>
        )}

        {!isolated && !showFullJourney && (
          <div className="roadmap-empty mt-10">
            <div className="roadmap-panel flex flex-col items-center px-6 py-10 sm:py-12">
              <svg
                className="roadmap-sketch h-28 w-full max-w-[280px] sm:h-32"
                viewBox="0 0 280 120"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                {/* Horizontal spine — abstract inventor's roadmap */}
                <path
                  className="roadmap-spine"
                  d="M28 60 H252"
                  fill="none"
                  strokeWidth="1.25"
                />
                {/* Optional spur upward */}
                <path
                  className="roadmap-spur"
                  d="M140 60 c0 -18 8 -28 22 -34"
                  fill="none"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <circle
                  className="roadmap-node roadmap-node--muted"
                  cx="166"
                  cy="24"
                  r="4.5"
                />
                <circle className="roadmap-node roadmap-node--1" cx="28" cy="60" r="5.5" />
                <circle className="roadmap-node roadmap-node--2" cx="84" cy="60" r="5" />
                <circle className="roadmap-node roadmap-node--3" cx="140" cy="60" r="5" />
                <circle className="roadmap-node roadmap-node--4" cx="196" cy="60" r="5" />
                <circle className="roadmap-node roadmap-node--goal" cx="252" cy="60" r="8" />
              </svg>
              <p className="roadmap-awaiting mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Awaiting your goal
                <span className="roadmap-awaiting-dots" aria-hidden>
                  …
                </span>
              </p>
              <button
                type="button"
                onClick={() => setShowFullJourney(true)}
                className="mt-8 inline-flex items-center rounded-full border border-line bg-transparent px-5 py-2.5 text-sm font-medium text-ink/75 transition hover:border-ink/30 hover:bg-raise/50 hover:text-ink"
              >
                Explore every path
              </button>
            </div>
          </div>
        )}

        {isolated && (
          <ol className="relative mt-8 space-y-3">
            <span
              className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-washu/25 via-gold/20 to-ink/10"
              aria-hidden
            />
            {isolatedNodes.map((node) => {
              const numbered =
                node.type === "state" || node.type === "destination";
              if (numbered) numberedStep += 1;
              const bridge = isVehicleBridge(node);
              return (
                <PathStep
                  key={node.id}
                  node={node}
                  index={numbered ? numberedStep : null}
                  isCurrent={node.id === currentId}
                  isGoal={node.id === focusedDestinationId}
                  indented={node.type === "milestone" && !bridge}
                  bridge={bridge}
                />
              );
            })}
          </ol>
        )}

        {showFullJourney && (
          <ol className="mt-8 space-y-10">
            {regions.map((region) => {
              const items = stepsForRegion(region.id);
              if (!items.some((item) => item.node.type === "state")) return null;
              let regionStep = 0;
              return (
                <li key={region.id}>
                  <h2 className="font-display text-2xl text-ink">
                    {region.title}
                  </h2>
                  <p className="text-sm text-muted">{region.subtitle}</p>
                  <ol className="relative mt-3 space-y-3">
                    <span
                      className="absolute bottom-4 left-4 top-4 w-px bg-ink/10"
                      aria-hidden
                    />
                    {items.map(({ node, indented, bridge }) => {
                      const numbered = node.type === "state";
                      if (numbered) regionStep += 1;
                      return (
                        <PathStep
                          key={node.id}
                          node={node}
                          index={numbered ? regionStep : null}
                          isCurrent={node.id === currentId}
                          isGoal={node.id === focusedDestinationId}
                          indented={indented}
                          bridge={bridge}
                        />
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>
        )}

        {(isolated || showFullJourney) && (
          <button
            type="button"
            onClick={() => setShowFullJourney(!showFullJourney)}
            className="mt-8 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {showFullJourney ? "Back to roadmap" : "Explore every path"}
          </button>
        )}
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`size-2.5 rounded-full ${swatch}`} aria-hidden />
      {label}
    </span>
  );
}
