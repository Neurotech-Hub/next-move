import { nodes, regions } from "../../data";
import { useNavigator } from "../../state/NavigatorContext";
import type { MapNode, NodeEmphasis } from "../../types/navigator";
import { DestinationRail } from "./DestinationRail";
import { RouteTabs } from "./RouteTabs";

const stateNodes = nodes.filter((node) => node.type === "state");
const milestoneNodes = nodes.filter((node) => node.type === "milestone");

function markerClass(emphasis: NodeEmphasis, selected: boolean): string {
  const base =
    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition";
  if (emphasis === "current")
    return `${base} border-washu bg-washu text-white shadow-[0_0_0_6px_rgba(165,20,23,0.12)]`;
  if (emphasis === "primary") return `${base} border-gold bg-gold text-white`;
  if (emphasis === "secondary") return `${base} border-gold/70 bg-card text-gold`;
  if (emphasis === "muted") return `${base} border-stone-200 bg-card text-stone-400`;
  if (selected) return `${base} border-ink bg-ink text-paper`;
  return `${base} border-stone-300 bg-card text-muted`;
}

function cardClass(emphasis: NodeEmphasis, selected: boolean): string {
  const base =
    "flex-1 rounded-2xl border px-4 py-3 text-left transition duration-200 ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";
  if (emphasis === "current")
    return `${base} border-washu/60 bg-card shadow-[0_10px_28px_rgba(165,20,23,0.12)]`;
  if (emphasis === "primary")
    return `${base} border-gold/60 bg-card shadow-[0_8px_22px_rgba(184,137,61,0.14)]`;
  if (emphasis === "secondary") return `${base} border-gold/30 bg-card/80`;
  if (emphasis === "muted") return `${base} border-stone-200/70 bg-card/50 opacity-55`;
  if (selected) return `${base} border-ink/40 bg-card shadow-[0_8px_22px_rgba(28,25,23,0.08)]`;
  return `${base} border-stone-200 bg-card hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_10px_24px_rgba(28,25,23,0.08)]`;
}

function badgeFor(emphasis: NodeEmphasis): string | null {
  if (emphasis === "current") return "You are here";
  if (emphasis === "primary") return "On your route";
  if (emphasis === "secondary") return "Alternative route";
  return null;
}

function StepRow({ node, index }: { node: MapNode; index: number }) {
  const { selectNode, selectedNodeId, nodeEmphasis } = useNavigator();
  const emphasis = nodeEmphasis(node.id);
  const selected = selectedNodeId === node.id;
  const badge = badgeFor(emphasis);

  return (
    <li className="flex items-start gap-4">
      <span className={markerClass(emphasis, selected)} aria-hidden>
        {index}
      </span>
      <button
        type="button"
        onClick={() => selectNode(node.id)}
        className={cardClass(emphasis, selected)}
        aria-current={emphasis === "current" ? "step" : undefined}
        aria-pressed={selected}
      >
        {badge && (
          <span
            className={`mb-1 block text-[10px] font-semibold uppercase tracking-[0.16em] ${
              emphasis === "current" ? "text-washu" : "text-gold"
            }`}
          >
            {badge}
          </span>
        )}
        <span className="font-display block text-[17px] leading-snug text-ink">
          {node.title}
        </span>
        <span className="mt-1 block text-[13px] leading-relaxed text-muted">
          {node.shortDescription}
        </span>
        {node.resourceIds.length > 0 && (
          <span className="mt-2 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-muted">
            {node.resourceIds.length} resource
            {node.resourceIds.length === 1 ? "" : "s"}
          </span>
        )}
      </button>
    </li>
  );
}

function MilestoneChip({ node }: { node: MapNode }) {
  const { selectNode, selectedNodeId, nodeEmphasis, recommendation } =
    useNavigator();
  const emphasis = nodeEmphasis(node.id);
  const selected = selectedNodeId === node.id;
  const dim = recommendation && emphasis === "muted";

  return (
    <button
      type="button"
      onClick={() => selectNode(node.id)}
      aria-pressed={selected}
      className={`rounded-full border border-dashed px-3 py-1.5 text-[12.5px] font-medium transition ${
        selected
          ? "border-ink bg-ink text-paper"
          : emphasis === "primary" || emphasis === "secondary"
            ? "border-sage bg-sage/10 text-sage"
            : dim
              ? "border-stone-200 text-stone-400"
              : "border-sage/50 text-sage hover:bg-sage/10"
      }`}
    >
      {node.title}
    </button>
  );
}

export function JourneyView() {
  let counter = 0;

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-16 pt-4 sm:px-8 sm:pt-6">
        <RouteTabs />
        <ol className="mx-auto max-w-2xl space-y-10">
          {regions.map((region) => {
            const steps = stateNodes.filter((node) => node.region === region.id);
            const milestones = milestoneNodes.filter(
              (node) => node.region === region.id,
            );
            if (!steps.length) return null;
            return (
              <li key={region.id}>
                <div className="mb-4 flex items-baseline gap-3">
                  <h2 className="font-display text-2xl text-ink">{region.title}</h2>
                  <p className="text-sm text-muted">{region.subtitle}</p>
                </div>
                <div className="relative">
                  <span
                    className="absolute bottom-4 left-4 top-4 w-px bg-stone-300/70"
                    aria-hidden
                  />
                  <ol className="space-y-3">
                    {steps.map((node) => {
                      counter += 1;
                      return <StepRow key={node.id} node={node} index={counter} />;
                    })}
                  </ol>
                </div>
                {milestones.length > 0 && (
                  <div className="ml-12 mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      Useful moves here
                    </span>
                    {milestones.map((node) => (
                      <MilestoneChip key={node.id} node={node} />
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <DestinationRail />
    </div>
  );
}
