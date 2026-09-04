import { useNavigator } from "../../state/NavigatorContext";

export function RouteTabs() {
  const { suggestedRoutes, activeRoute, setActiveRouteId, recommendation } =
    useNavigator();
  if (!recommendation || suggestedRoutes.length === 0) return null;

  return (
    <div className="mx-auto mb-8 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Suggested routes · pick one to trace it
      </p>
      <div className="mt-2 flex flex-wrap gap-2" role="tablist">
        {suggestedRoutes.map((route) => {
          const active = activeRoute?.id === route.id;
          return (
            <button
              key={route.id}
              type="button"
              role="tab"
              aria-selected={active}
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
        <p className="mt-2 text-sm leading-relaxed text-muted">{activeRoute.summary}</p>
      )}
    </div>
  );
}
