import { useEffect, useState, type ReactNode } from "react";
import { ChevronUp, Sparkles, X } from "lucide-react";
import { nodeById, resourceById } from "../../data";
import { resourcesForNode } from "../../logic/filters";
import { useNavigator } from "../../state/NavigatorContext";
import { ResourceCard } from "../Drawer/ResourceCard";
import { GuideForm } from "../Guide/GuideForm";

export function SidePanel() {
  const {
    selectedNodeId,
    selectedResourceId,
    selectNode,
    selectResource,
    guideOpen,
    closeGuide,
    recommendation,
  } = useNavigator();

  const node = selectedNodeId ? nodeById[selectedNodeId] : undefined;
  const resource = selectedResourceId
    ? resourceById[selectedResourceId]
    : undefined;
  // Mobile only: results are otherwise hidden below the lg breakpoint.
  const [mobileResultsOpen, setMobileResultsOpen] = useState(false);
  const hasFocus = Boolean(
    node || resource || guideOpen || (recommendation && mobileResultsOpen),
  );

  useEffect(() => {
    if (!recommendation) setMobileResultsOpen(false);
  }, [recommendation]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (guideOpen) closeGuide();
      else {
        selectResource(null);
        selectNode(null);
        setMobileResultsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeGuide, guideOpen, selectNode, selectResource]);

  const close = () => {
    if (guideOpen) closeGuide();
    selectResource(null);
    selectNode(null);
    setMobileResultsOpen(false);
  };

  const body = guideOpen ? (
    <GuideForm />
  ) : resource ? (
    <div>
      {node && (
        <button
          type="button"
          onClick={() => selectResource(null)}
          className="mb-4 text-sm font-medium text-muted hover:text-ink"
        >
          ← Back to {node.title}
        </button>
      )}
      <ResourceCard resource={resource} />
    </div>
  ) : node ? (
    <NodeDetails nodeId={node.id} />
  ) : recommendation ? (
    <Results />
  ) : (
    <Intro />
  );

  return (
    <>
    {recommendation && !hasFocus && (
      <button
        type="button"
        onClick={() => setMobileResultsOpen(true)}
        className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl border border-washu/20 bg-card px-4 py-3 text-left shadow-[0_12px_32px_rgba(28,25,23,0.16)] lg:hidden"
      >
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-washu">
            You&apos;re likely here
          </span>
          <span className="font-display block truncate text-base text-ink">
            {recommendation.youAreHereLabel}
          </span>
          <span className="block text-xs text-muted">Routes, next steps, and resources</span>
        </span>
        <ChevronUp className="size-4 shrink-0 text-muted" aria-hidden />
      </button>
    )}
    <aside
      className={`z-30 flex flex-col border-stone-200 bg-card lg:static lg:h-full lg:w-[380px] lg:shrink-0 lg:border-r ${
        hasFocus
          ? "fixed inset-x-0 bottom-0 max-h-[80vh] rounded-t-3xl border shadow-[0_-12px_40px_rgba(28,25,23,0.14)] lg:max-h-none lg:rounded-none lg:shadow-none"
          : "hidden lg:flex"
      }`}
      aria-label="Details"
    >
      {hasFocus && (
        <div className="flex items-center px-5 pt-3 lg:pt-4">
          <span className="mx-auto h-1.5 w-10 rounded-full bg-stone-300 lg:hidden" />
          <button
            type="button"
            onClick={close}
            className="ml-auto rounded-full p-1.5 text-muted hover:bg-stone-100"
            aria-label="Close panel"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-2 lg:pt-6">
        {body}
      </div>
    </aside>
    </>
  );
}

function Intro() {
  const { openGuide } = useNavigator();
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
        Start anywhere
      </p>
      <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
        Where am I, where could this go, and what should I do next?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The journey runs from noticing a problem to real-world impact. Patents,
        licenses, and companies are vehicles along the way — not the destination.
      </p>
      <button
        type="button"
        onClick={openGuide}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-washu px-4 py-2.5 text-sm font-medium text-white transition hover:bg-washu/90"
      >
        <Sparkles className="size-4" aria-hidden />
        Help me find where I am
      </button>
      <p className="mt-2 text-xs text-muted">Four quick questions. No account.</p>

      <div className="mt-8 space-y-3 text-sm text-ink/85">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          How to read the journey
        </p>
        <Legend swatch="bg-stone-300" label="A stage you can select for detail and resources" />
        <Legend swatch="bg-washu" label="You are here (after Guide me)" />
        <Legend swatch="bg-gold" label="A step on your suggested route" />
        <Legend swatch="border border-dashed border-sage bg-transparent" label="A useful move you can make at that stage" />
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-0.5 size-4 shrink-0 rounded-full ${swatch}`} aria-hidden />
      <span className="leading-relaxed">{label}</span>
    </div>
  );
}

function Results() {
  const {
    recommendation,
    suggestedRoutes,
    activeRoute,
    setActiveRouteId,
    openGuide,
    reset,
    selectNode,
  } = useNavigator();
  if (!recommendation) return null;
  const here = nodeById[recommendation.currentStateId];

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
        You&apos;re likely here
      </p>
      <button
        type="button"
        onClick={() => selectNode(recommendation.currentStateId)}
        className="font-display mt-1 text-left text-2xl leading-tight text-ink hover:underline"
      >
        {recommendation.youAreHereLabel}
      </button>
      {here && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {here.shortDescription}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-ink/85">
        {recommendation.summary}
      </p>

      <Section title="Suggested routes">
        <ol className="space-y-3">
          {suggestedRoutes.map((route) => {
            const active = activeRoute?.id === route.id;
            return (
              <li key={route.id}>
                <button
                  type="button"
                  onClick={() => setActiveRouteId(route.id)}
                  aria-pressed={active}
                  className={`w-full rounded-2xl border px-3.5 py-3 text-left transition ${
                    active
                      ? "border-gold/70 bg-gold/8"
                      : "border-stone-200 bg-white hover:border-ink/25"
                  }`}
                >
                  <span className="block text-sm font-semibold text-ink">
                    {route.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {route.nodeIds
                      .map((id) => nodeById[id]?.title)
                      .filter(Boolean)
                      .join(" → ")}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </Section>

      {here && here.details.nextSteps.length > 0 && (
        <Section title="Your next useful steps">
          <ul className="list-disc space-y-1 pl-4">
            {here.details.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </Section>
      )}

      {here && resourcesForNode(here).length > 0 && (
        <Section title="Resources that can help right now">
          <div className="space-y-2">
            {resourcesForNode(here).map((item) => (
              <ResourceCard key={item.id} resource={item} compact />
            ))}
          </div>
        </Section>
      )}

      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={openGuide}
          className="font-medium text-ink underline-offset-4 hover:underline"
        >
          Adjust my answers
        </button>
        <button
          type="button"
          onClick={reset}
          className="font-medium text-muted underline-offset-4 hover:underline"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function NodeDetails({ nodeId }: { nodeId: string }) {
  const { selectNode } = useNavigator();
  const node = nodeById[nodeId];
  if (!node) return null;
  const linked = node.details.leadsTo.map((id) => nodeById[id]).filter(Boolean);
  const related = resourcesForNode(node);

  return (
    <article>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {node.type === "destination"
          ? "Destination"
          : node.type === "milestone"
            ? "A useful move"
            : "A stage on the journey"}
      </p>
      <h2 className="font-display mt-1 text-[1.65rem] leading-tight text-ink">
        {node.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        {node.shortDescription}
      </p>

      <Section title="Why this matters">{node.details.whyItMatters}</Section>

      {node.details.youMayBeHereIf.length > 0 && (
        <Section title="You may be here if…">
          <ul className="list-disc space-y-1 pl-4">
            {node.details.youMayBeHereIf.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {node.details.nextSteps.length > 0 && (
        <Section title="Useful next steps">
          <ul className="list-disc space-y-1 pl-4">
            {node.details.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {linked.length > 0 && (
        <Section title="Where this can lead">
          <div className="flex flex-wrap gap-2">
            {linked.map((target) => (
              <button
                key={target.id}
                type="button"
                onClick={() => selectNode(target.id)}
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-ink hover:border-ink/25"
              >
                {target.title}
              </button>
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section title="Resources that can help">
          <div className="space-y-2">
            {related.map((item) => (
              <ResourceCard key={item.id} resource={item} compact />
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {title}
      </h3>
      <div className="mt-2 text-sm leading-relaxed text-ink/85">{children}</div>
    </section>
  );
}
