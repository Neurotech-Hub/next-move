import { nodes } from "../../data";
import { useNavigator } from "../../state/NavigatorContext";

const destinations = nodes.filter((node) => node.type === "destination");

export function DestinationRail() {
  const { selectNode, selectedNodeId, recommendation, nodeEmphasis } =
    useNavigator();

  return (
    <aside className="shrink-0 border-t border-stone-200/70 bg-paper/80 px-4 py-4 lg:w-[250px] lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-5 lg:py-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu/80">
        What could this become?
      </p>
      <p className="mt-1 hidden text-xs leading-relaxed text-muted lg:block">
        Destinations, not vehicles. A patent or a company is only a way to get
        here.
      </p>
      <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:mt-4 lg:flex-col lg:overflow-visible">
        {destinations.map((node) => {
          const emphasis = nodeEmphasis(node.id);
          const selected = selectedNodeId === node.id;
          const lit = emphasis === "primary" || emphasis === "secondary";
          const muted = recommendation && emphasis === "muted";
          return (
            <li key={node.id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => selectNode(node.id)}
                aria-pressed={selected}
                className={`w-[200px] rounded-2xl border px-3.5 py-3 text-left transition lg:w-full ${
                  selected
                    ? "border-ink/40 bg-card shadow-[0_8px_22px_rgba(28,25,23,0.08)]"
                    : lit
                      ? "border-washu/40 bg-card shadow-[0_8px_22px_rgba(165,20,23,0.1)]"
                      : muted
                        ? "border-stone-200/60 bg-card/40 opacity-55"
                        : "border-stone-200 bg-card hover:border-ink/25"
                }`}
              >
                {lit && (
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-washu">
                    Likely fit
                  </span>
                )}
                <span className="font-display block text-[15px] leading-snug text-ink">
                  {node.title}
                </span>
                <span className="mt-0.5 block text-[12px] leading-relaxed text-muted">
                  {node.shortDescription}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
