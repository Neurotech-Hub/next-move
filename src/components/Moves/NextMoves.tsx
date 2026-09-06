import { X } from "lucide-react";
import { destinationPlanById, nodeById, resourceById } from "../../data";
import { resourcesForNode } from "../../logic/filters";
import { formatNotNeeded } from "../../logic/nextMoves";
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
      <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{move.why}</p>

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            Gather this
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.evidenceRequired}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            It can unlock
          </dt>
          <dd className="mt-0.5 text-ink/85">{move.academicReturn}</dd>
        </div>
      </dl>

      {resource && (
        <div className="mt-3 border-t border-line/60 pt-3">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            A program that can help
          </p>
          <button
            type="button"
            onClick={() => onOpenResource(resource.id)}
            className="mt-1.5 w-full rounded-lg border border-line bg-paper/70 px-3 py-2 text-left text-sm transition duration-200 hover:border-ink/25 hover:bg-raise"
          >
            <span className="block font-medium text-ink">{resource.title}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-muted">
              {resource.usefulWhen[0] ?? "View program details"}
            </span>
          </button>
          {resource.caveats[0] && (
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
              {resource.caveats[0]}
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-[13px] leading-relaxed text-muted">
        {formatNotNeeded(move.notNeeded)}
      </p>
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
          <span aria-hidden="true">C. </span>
          Next steps & programs
        </p>
        <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
          Get excited, get started.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pick a goal first — then we’ll show what to do next, and which
          programs can help.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
        <span aria-hidden="true">C. </span>
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
          Ready to dig in?
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
            : plan?.oneLiner ?? "")}
      </p>
      {plan && (
        <p className="mt-2 text-sm text-muted">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            Your likely involvement
          </span>
          <span className="mt-0.5 block leading-relaxed">
            {plan.facultyCommitment}
          </span>
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
        aria-label="C. Next steps and programs"
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
