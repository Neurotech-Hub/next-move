import { X } from "lucide-react";
import { destinationPlanById, nodeById, resourceById } from "../../data";
import { resourcesForNode } from "../../logic/filters";
import { useNavigator } from "../../state/NavigatorContext";
import { ResourceCard } from "../Drawer/ResourceCard";
import type { NextMove } from "../../types/navigator";

function MoveCard({
  move,
  onOpenResource,
}: {
  move: NextMove;
  onOpenResource: (id: string) => void;
}) {
  const resource = move.resourceId ? resourceById[move.resourceId] : undefined;

  return (
    <article className="rounded-2xl border border-stone-200 bg-white px-3.5 py-3">
      <h3 className="font-display text-[16px] leading-snug text-ink">
        {move.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-ink/85">{move.why}</p>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Evidence required
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.evidenceRequired}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Academic return
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.academicReturn}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            You do not need to
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.notNeeded}</dd>
        </div>
        {move.trap && (
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
              Watch for
            </dt>
            <dd className="mt-0.5 text-ink/85">{move.trap}</dd>
          </div>
        )}
      </dl>
      {resource && (
        <button
          type="button"
          onClick={() => onOpenResource(resource.id)}
          className="mt-3 w-full rounded-xl border border-stone-200 px-3 py-2 text-left text-sm hover:border-ink/25"
        >
          <span className="block font-medium text-ink">{resource.title}</span>
          {move.contact && (
            <span className="mt-0.5 block text-xs text-muted">{move.contact}</span>
          )}
        </button>
      )}
    </article>
  );
}

function DefaultMoves() {
  const {
    nextMoves,
    recommendation,
    focusedDestinationId,
    activeRoute,
    selectResource,
    selectNode,
  } = useNavigator();
  const plan = focusedDestinationId
    ? destinationPlanById[focusedDestinationId]
    : undefined;

  if (!focusedDestinationId && !recommendation) {
    return (
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
          What to do now
        </p>
        <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
          Next moves appear after you pick a goal
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Each move will include the evidence to collect, the academic return,
          and a named program — including what you do not need to do.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
        What to do now
      </p>
      {recommendation ? (
        <button
          type="button"
          onClick={() => selectNode(recommendation.currentStateId)}
          className="font-display mt-1 text-left text-2xl leading-tight text-ink hover:underline"
        >
          You’re likely at {recommendation.youAreHereLabel}
        </button>
      ) : (
        <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
          Plan backward from this goal
        </h2>
      )}
      <p className="mt-2 text-sm leading-relaxed text-ink/85">
        {recommendation?.summary ??
          (activeRoute
            ? `${activeRoute.summary} Company required: ${activeRoute.companyRequired ? "yes" : "no"}.`
            : "")}
      </p>
      {plan && (
        <p className="mt-2 text-sm text-muted">
          Likely returns: {plan.academicReturns.slice(0, 3).join(", ")}.
        </p>
      )}

      <ol className="mt-5 space-y-3">
        {nextMoves.map((move) => (
          <li key={move.id}>
            <MoveCard
              move={move}
              onOpenResource={(id) => selectResource(id)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function NodeInspector({ nodeId }: { nodeId: string }) {
  const node = nodeById[nodeId];
  if (!node) return null;
  const related = resourcesForNode(node);

  return (
    <article>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {node.type === "destination"
          ? "Your goal"
          : node.type === "milestone"
            ? "A useful move"
            : "A stage on this path"}
      </p>
      <h2 className="font-display mt-1 text-[1.65rem] leading-tight text-ink">
        {node.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
        {node.details.nextSteps[0] ?? node.shortDescription}
      </p>
      {related.length > 0 && (
        <section className="mt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Programs that can help
          </h3>
          <div className="mt-2 space-y-2">
            {related.map((item) => (
              <ResourceCard
                key={item.id}
                resource={item}
                compact
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export function NextMoves() {
  const {
    selectedNodeId,
    selectedResourceId,
    selectNode,
    selectResource,
    recommendation,
    focusedDestinationId,
  } = useNavigator();
  const resource = selectedResourceId
    ? resourceById[selectedResourceId]
    : undefined;
  const hasFocus = Boolean(resource || selectedNodeId);
  const hasContext = Boolean(recommendation || focusedDestinationId);

  const close = () => {
    selectResource(null);
    if (selectedNodeId && !selectedNodeId.startsWith("dest-")) {
      selectNode(null);
    }
  };

  const body = resource ? (
    <div>
      <button
        type="button"
        onClick={() => selectResource(null)}
        className="mb-4 text-sm font-medium text-muted hover:text-ink"
      >
        ← Back to next moves
      </button>
      <ResourceCard resource={resource} />
    </div>
  ) : selectedNodeId && !selectedNodeId.startsWith("dest-") ? (
    <NodeInspector nodeId={selectedNodeId} />
  ) : (
    <DefaultMoves />
  );

  return (
    <>
      {hasContext && !hasFocus && (
        <p className="sr-only">Next moves are listed in the side panel.</p>
      )}
      <aside
        className="z-20 flex h-full min-h-0 w-full shrink-0 flex-col border-stone-200 bg-card lg:w-[340px] lg:border-l"
        aria-label="What to do now"
      >
        {hasFocus && (
          <div className="flex justify-end px-4 pt-3 lg:hidden">
            <button
              type="button"
              onClick={close}
              className="rounded-full p-1.5 text-muted hover:bg-stone-100"
              aria-label="Close details"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{body}</div>
      </aside>
    </>
  );
}
