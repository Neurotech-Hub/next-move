import { Sparkles } from "lucide-react";
import { destinationPlans, nodes } from "../../data";
import { useNavigator } from "../../state/NavigatorContext";
import { GuideForm } from "../Guide/GuideForm";

const destinations = nodes.filter((node) => node.type === "destination");

export function GoalsRail() {
  const {
    focusedDestinationId,
    focusDestination,
    guideOpen,
    openGuide,
    recommendation,
    setView,
  } = useNavigator();

  if (guideOpen) {
    return (
      <aside className="flex h-full min-h-0 w-full shrink-0 flex-col border-stone-200 bg-card lg:w-[320px] lg:border-r">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <GuideForm />
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex h-full min-h-0 w-full shrink-0 flex-col border-stone-200 bg-card lg:w-[320px] lg:border-r">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
          Your goals
        </p>
        <h2 className="font-display mt-1 text-[1.55rem] leading-tight text-ink">
          How can the innovation community serve you?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Pick a destination. We will isolate one path and the next useful moves.
        </p>

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
                  onClick={() =>
                    focusDestination(selected ? null : node.id)
                  }
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

        <button
          type="button"
          onClick={openGuide}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-washu px-4 py-2.5 text-sm font-medium text-white transition hover:bg-washu/90"
        >
          <Sparkles className="size-4" aria-hidden />
          {recommendation ? "Adjust answers" : "Guide me"}
        </button>
        {!recommendation && (
          <p className="mt-2 text-xs text-muted">
            Four questions if you want us to mark where you are.
          </p>
        )}
        <button
          type="button"
          onClick={() => setView("resources")}
          className="mt-8 text-xs text-muted underline-offset-4 hover:text-ink/70 hover:underline"
        >
          View all resources
        </button>
      </div>
    </aside>
  );
}
