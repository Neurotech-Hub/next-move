import { nodes, regions } from "../../data";
import { useNavigator } from "../../state/NavigatorContext";
import type { MapNode } from "../../types/navigator";

const stateNodes = nodes.filter((node) => node.type === "state");
const milestoneNodes = nodes.filter((node) => node.type === "milestone");

function captionFor(node: MapNode | undefined, isCurrent: boolean): string {
  if (!node) {
    return "Choose a goal on the left to isolate one path.";
  }
  if (node.type === "destination") {
    return "This is your goal. The steps above are what would get you there.";
  }
  if (node.type === "milestone") {
    return "You’re looking at a useful move — optional work at this stage, not a numbered requirement.";
  }
  if (isCurrent) {
    return "You’re likely here. The next moves on the right start from this stage.";
  }
  return "A stage on this path. Open it to see the next evidence to collect.";
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
        className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
          isCurrent
            ? "border-washu bg-washu text-white shadow-[0_0_0_6px_rgba(165,20,23,0.12)]"
            : isGoal
              ? "border-washu/40 bg-washu/10 text-washu"
              : milestone
                ? "border-dashed border-sage bg-card text-sage"
                : "border-gold bg-gold text-white"
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
        className={`flex-1 rounded-2xl border px-4 py-3 text-left transition ${
          selected
            ? "border-ink/40 bg-card shadow-[0_8px_22px_rgba(28,25,23,0.08)]"
            : isCurrent
              ? "border-washu/60 bg-card shadow-[0_10px_28px_rgba(165,20,23,0.12)]"
              : "border-stone-200 bg-card hover:border-ink/25"
        }`}
      >
        {isCurrent && (
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-washu">
            You are here
          </span>
        )}
        {isGoal && !isCurrent && (
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-washu">
            Your goal
          </span>
        )}
        {milestone && (
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-sage">
            A useful move
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

export function PathView() {
  const {
    activeRoute,
    suggestedRoutes,
    setActiveRouteId,
    recommendation,
    focusedDestinationId,
    selectedNodeId,
    showFullJourney,
    setShowFullJourney,
  } = useNavigator();

  const pathIds = activeRoute?.nodeIds ?? [];
  const isolated = pathIds.length > 0 && !showFullJourney;
  const currentId = recommendation?.currentStateId;
  const selected = selectedNodeId ? nodes.find((node) => node.id === selectedNodeId) : undefined;

  const isolatedNodes = isolated
    ? pathIds
        .map((id) => nodes.find((node) => node.id === id))
        .filter((node): node is MapNode => Boolean(node))
    : [];

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-4 pb-16 pt-4 sm:px-8 sm:pt-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted">
          <Legend swatch="bg-washu" label="You are here" />
          <Legend swatch="bg-gold" label="On this path" />
          <Legend
            swatch="border border-dashed border-sage bg-transparent"
            label="A useful move"
          />
          <Legend swatch="bg-washu/20" label="Your goal" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">
          {captionFor(selected, selected?.id === currentId)}
        </p>

        {suggestedRoutes.length > 1 && (
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Show this path
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestedRoutes.map((route) => {
                const active = activeRoute?.id === route.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => setActiveRouteId(route.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                      active
                        ? "border-gold bg-gold text-white"
                        : "border-stone-300 bg-card text-ink/80 hover:border-ink/30"
                    }`}
                  >
                    {route.title}
                  </button>
                );
              })}
            </div>
            {activeRoute && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {activeRoute.summary}
              </p>
            )}
          </div>
        )}

        {!isolated && !showFullJourney && (
          <div className="mt-10 rounded-3xl border border-dashed border-stone-300 bg-card/60 px-6 py-10 text-center">
            <p className="font-display text-2xl text-ink">
              Choose a goal to see one path
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Destinations on the left are the starting point. We will not show
              every stage at once.
            </p>
            <button
              type="button"
              onClick={() => setShowFullJourney(true)}
              className="mt-5 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              See the full journey
            </button>
          </div>
        )}

        {isolated && (
          <ol className="relative mt-8 space-y-3">
            <span
              className="absolute bottom-4 left-4 top-4 w-px bg-gold/40"
              aria-hidden
            />
            {isolatedNodes.map((node, index) => (
              <PathStep
                key={node.id}
                node={node}
                index={node.type === "state" || node.type === "destination" ? index + 1 : null}
                isCurrent={node.id === currentId}
                isGoal={
                  node.id === focusedDestinationId ||
                  node.type === "destination"
                }
              />
            ))}
          </ol>
        )}

        {showFullJourney && (
          <ol className="mt-8 space-y-10">
            {regions.map((region) => {
              const steps = stateNodes.filter((node) => node.region === region.id);
              const milestones = milestoneNodes.filter(
                (node) => node.region === region.id,
              );
              if (!steps.length) return null;
              return (
                <li key={region.id}>
                  <h2 className="font-display text-2xl text-ink">{region.title}</h2>
                  <p className="text-sm text-muted">{region.subtitle}</p>
                  <ol className="relative mt-3 space-y-3">
                    <span
                      className="absolute bottom-4 left-4 top-4 w-px bg-stone-300/70"
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
