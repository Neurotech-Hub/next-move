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
    <article className="rounded-2xl border border-line/70 bg-raise/50 px-3.5 py-3">
      <h3 className="font-display text-[16px] leading-snug text-ink">
        {move.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-ink/85">{move.why}</p>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            Evidence required
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.evidenceRequired}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            Academic return
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.academicReturn}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            You do not
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.notNeeded}</dd>
        </div>
        {move.trap && (
          <div>
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-washu">
              Keep in mind
            </dt>
            <dd className="mt-0.5 text-ink/85">{move.trap}</dd>
          </div>
        )}
      </dl>
      {resource && (
        <div className="mt-3 rounded-xl border border-line/60 bg-paper/60 p-3">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-washu">
            Why this program
          </p>
          {move.resourceReason && (
            <p className="mt-1 text-xs leading-relaxed text-ink/75">
              {move.resourceReason}
            </p>
          )}
          <button
            type="button"
            onClick={() => onOpenResource(resource.id)}
            className="mt-2 w-full rounded-lg border border-line bg-raise px-3 py-2 text-left text-sm transition duration-200 hover:border-ink/25 hover:bg-raise/80"
          >
            <span className="block font-medium text-ink">{resource.title}</span>
            <span className="mt-0.5 block text-xs text-muted">
              View program details
              {move.contact ? ` · ${move.contact}` : ""}
            </span>
          </button>
        </div>
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
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
          Next steps & programs
        </p>
        <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
          Choose a goal to see your next steps.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Each move shows required evidence, its benefit, a relevant program,
          and what you can skip.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
        Next steps & programs
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
          Plan backwards from this goal
        </h2>
      )}
      <p className="mt-2 text-sm leading-relaxed text-ink/85">
        {recommendation?.summary ??
          (activeRoute
            ? `${activeRoute.summary} ${
                activeRoute.companyRequired
                  ? "A company is the vehicle."
                  : "A company is not required."
              }`
            : "")}
      </p>
      {plan && !recommendation && (
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
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        {node.type === "destination"
          ? "Your goal"
          : node.type === "milestone"
            ? "Optional step"
            : "Step on this path."}
      </p>
      <h2 className="font-display mt-1 text-[1.65rem] leading-tight text-ink">
        {node.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/85">
        {node.details.nextSteps[0] ?? node.shortDescription}
      </p>
      {related.length > 0 && (
        <section className="mt-6">
          <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            Related programs
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            These are general programs for this stage. Return to Next Steps for
            tailored recommendations.
          </p>
          <div className="mt-2 space-y-2">
            {related.map((item) => (
              <ResourceCard key={item.id} resource={item} compact />
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
        className="relative z-10 flex w-full shrink-0 flex-col border-line bg-card lg:h-full lg:min-h-0 lg:w-[340px] lg:border-l"
        aria-label="Next steps and programs"
      >
        {hasFocus && (
          <div className="flex justify-end px-4 pt-3 lg:hidden">
            <button
              type="button"
              onClick={close}
              className="rounded-full p-1.5 text-muted hover:bg-raise"
              aria-label="Close details"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        <div className="px-5 py-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          {body}
        </div>
      </aside>
    </>
  );
}
