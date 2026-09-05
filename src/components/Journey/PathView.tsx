import { useEffect, useRef } from "react";
import { nodes, regions } from "../../data";
import { useNavigator } from "../../state/NavigatorContext";
import type { MapNode } from "../../types/navigator";

const stateNodes = nodes.filter((node) => node.type === "state");
const milestoneNodes = nodes.filter((node) => node.type === "milestone");

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
  if (node.type === "milestone") {
    return "You’re looking at an optional step — useful work at this stage, not a numbered requirement.";
  }
  if (isCurrent) {
    return "You’re likely here. The next moves on the right start from this stage.";
  }
  return "Step on this path. Open it to see the next evidence to collect.";
}

function PathStep({
  node,
  index,
  isCurrent,
  isGoal,
}: {
  node: MapNode;
  index: number | null;
  isCurrent: boolean;
  isGoal: boolean;
}) {
  const { selectNode, selectedNodeId } = useNavigator();
  const selected = selectedNodeId === node.id;
  const milestone = node.type === "milestone";

  return (
    <li className="relative flex items-start gap-4">
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
        {milestone && (
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

/** Keep path stages plus only the focused destination (not sibling goals). */
export function nodesForIsolatedPath(
  pathIds: string[],
  focusedDestinationId: string | null,
): MapNode[] {
  return pathIds
    .filter((id) => {
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
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
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
          <div className="aurora mt-10">
            <div className="aurora-panel min-h-[340px] px-6 py-14 text-center sm:min-h-[400px] sm:py-16">
              <span className="aurora-layer aurora-glow" aria-hidden />
              <span className="aurora-layer aurora-band aurora-band-3" aria-hidden />
              <span className="aurora-layer aurora-band aurora-band-1" aria-hidden />
              <span className="aurora-layer aurora-band aurora-band-2" aria-hidden />
              <span className="aurora-layer aurora-horizon" aria-hidden />
              <span className="aurora-layer aurora-edge" aria-hidden />
              <div className="aurora-content">
                <p className="aurora-title font-display text-2xl text-ink sm:text-3xl">
                  Choose a goal to visualize the path.
                </p>
                <button
                  type="button"
                  onClick={() => setShowFullJourney(true)}
                  className="mt-6 text-sm font-medium text-ink/70 underline-offset-4 hover:text-ink hover:underline"
                >
                  See the full journey
                </button>
              </div>
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
              return (
                <PathStep
                  key={node.id}
                  node={node}
                  index={numbered ? numberedStep : null}
                  isCurrent={node.id === currentId}
                  isGoal={node.id === focusedDestinationId}
                />
              );
            })}
          </ol>
        )}

        {showFullJourney && (
          <ol className="mt-8 space-y-10">
            {regions.map((region) => {
              const steps = stateNodes.filter(
                (node) => node.region === region.id,
              );
              const milestones = milestoneNodes.filter(
                (node) => node.region === region.id,
              );
              if (!steps.length) return null;
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
                    {steps.map((node, index) => (
                      <PathStep
                        key={node.id}
                        node={node}
                        index={index + 1}
                        isCurrent={node.id === currentId}
                        isGoal={node.id === focusedDestinationId}
                      />
                    ))}
                  </ol>
                  {milestones.length > 0 && (
                    <ul className="ml-12 mt-3 space-y-3">
                      {milestones.map((node) => (
                        <PathStep
                          key={node.id}
                          node={node}
                          index={null}
                          isCurrent={false}
                          isGoal={false}
                        />
                      ))}
                    </ul>
                  )}
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
            {showFullJourney ? "Show only this path" : "See the full journey"}
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
