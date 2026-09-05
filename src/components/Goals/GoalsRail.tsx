import { Sparkles } from "lucide-react";
import { destinationPlans, nodeById, nodes } from "../../data";
import { tailoringDetails } from "../../logic/guideSummary";
import { useNavigator } from "../../state/NavigatorContext";
import { GuideForm } from "../Guide/GuideForm";

const destinations = nodes.filter((node) => node.type === "destination");

function DestinationList() {
  const { focusedDestinationId, focusDestination } = useNavigator();

  return (
    <ul className="mt-4 space-y-2">
      {destinations.map((node) => {
        const plan = destinationPlans.find(
          (item) => item.destinationId === node.id,
        );
        const selected = focusedDestinationId === node.id;
        return (
          <li key={node.id}>
            <button
              type="button"
              onClick={() => focusDestination(selected ? null : node.id)}
              aria-pressed={selected}
              className={`w-full rounded-2xl border px-3.5 py-3 text-left transition ${
                selected
                  ? "border-washu/50 bg-washu/6 shadow-[0_8px_22px_rgba(165,20,23,0.08)]"
                  : "border-stone-200 bg-white hover:border-ink/25"
              }`}
            >
              <span className="font-display block text-[15px] leading-snug text-ink">
                {node.title}
              </span>
              <span className="mt-0.5 block text-[12px] leading-relaxed text-muted">
                {plan?.oneLiner ?? node.shortDescription}
              </span>
              {plan && (
                <span className="mt-2 block text-[11px] text-ink/70">
                  {plan.companyRequired
                    ? "Company is the vehicle"
                    : "Company not required"}
                  {" · "}
                  {plan.facultyCommitment}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function GoalsRail() {
  const {
    focusedDestinationId,
    guideOpen,
    openGuide,
    recommendation,
    guideAnswers,
  } = useNavigator();

  if (guideOpen) {
    return (
      <aside className="flex w-full shrink-0 flex-col border-stone-200 bg-card lg:h-full lg:min-h-0 lg:w-[320px] lg:border-r">
        <div className="px-5 py-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <GuideForm />
        </div>
      </aside>
    );
  }

  if (recommendation && focusedDestinationId) {
    const destination = nodeById[focusedDestinationId];
    const current = nodeById[recommendation.currentStateId];
    const details = tailoringDetails(
      guideAnswers,
      destination?.title ?? "Your selected goal",
      current?.title ?? recommendation.youAreHereLabel,
    );

    return (
      <aside className="flex w-full shrink-0 flex-col border-stone-200 bg-card lg:h-full lg:min-h-0 lg:w-[320px] lg:border-r">
        <div className="px-5 py-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
            Tailored to your answers
          </p>
          <h2 className="font-display mt-1 text-[1.55rem] leading-tight text-ink">
            Your path to {destination?.title ?? "your goal"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Each answer changes a different part of the path:
          </p>

          <dl className="mt-4 space-y-3">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2.5"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-washu">
                  {detail.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium leading-snug text-ink">
                  {detail.answer}
                </dd>
                <dd className="mt-1 text-xs leading-relaxed text-muted">
                  {detail.effect}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={openGuide}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-washu px-4 py-2.5 text-sm font-medium text-white transition hover:bg-washu/90"
          >
            <Sparkles className="size-4" aria-hidden />
            Update my answers
          </button>

          <details className="mt-5 border-t border-stone-200 pt-4">
            <summary className="cursor-pointer text-sm font-medium text-muted hover:text-ink">
              Choose a goal directly instead
            </summary>
            <DestinationList />
          </details>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex w-full shrink-0 flex-col border-stone-200 bg-card lg:h-full lg:min-h-0 lg:w-[320px] lg:border-r">
      <div className="px-5 py-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
          Your goals
        </p>
        <h2 className="font-display mt-1 text-[1.55rem] leading-tight text-ink">
          How can the innovation community serve you?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pick a destination. We will isolate one path and the next useful moves.
        </p>

        <DestinationList />

        <div className="mt-5 border-t border-stone-200 pt-5">
          <p className="text-sm font-medium text-ink">
            Not sure which destination fits?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Answer four questions to tailor your starting point, route, next
            moves, and recommended programs.
          </p>
        </div>
        <button
          type="button"
          onClick={openGuide}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-washu px-4 py-2.5 text-sm font-medium text-white transition hover:bg-washu/90"
        >
          <Sparkles className="size-4" aria-hidden />
          Guide me
        </button>
      </div>
    </aside>
  );
}
