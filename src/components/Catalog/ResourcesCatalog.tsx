import { useMemo, useState } from "react";
import { resources, resourceById } from "../../data";
import { filterResources } from "../../logic/filters";
import { useNavigator } from "../../state/NavigatorContext";
import type { Internality, Resource } from "../../types/navigator";
import { ResourceCard } from "../Drawer/ResourceCard";

const SOURCES: {
  id: Internality | "all";
  label: string;
  chip: string;
  badge: string;
}[] = [
  {
    id: "all",
    label: "All cards",
    chip: "border-ink bg-ink text-paper",
    badge: "border-line bg-raise text-muted",
  },
  {
    id: "washu",
    label: "WashU",
    chip: "border-washu/40 bg-washu text-white",
    badge: "border-washu/25 bg-washu/10 text-washu",
  },
  {
    id: "federal",
    label: "Federal",
    chip: "border-federal/40 bg-federal text-paper",
    badge: "border-federal/25 bg-federal/10 text-federal",
  },
  {
    id: "regional",
    label: "Regional",
    chip: "border-sage/40 bg-sage text-paper",
    badge: "border-sage/25 bg-sage/10 text-sage",
  },
  {
    id: "investor",
    label: "Investor",
    chip: "border-gold/40 bg-gold text-paper",
    badge: "border-gold/25 bg-gold/10 text-gold",
  },
];

const SOURCE_BADGE = Object.fromEntries(
  SOURCES.filter((item) => item.id !== "all").map((item) => [
    item.id,
    item.badge,
  ]),
) as Record<Internality, string>;

const SOURCE_LABEL: Record<Internality, string> = {
  washu: "WashU",
  federal: "Federal",
  regional: "Regional",
  investor: "Investor",
};

function Chip({
  selected,
  onClick,
  selectedClass,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  selectedClass: string;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition duration-200 ${
        selected
          ? selectedClass
          : "border-line bg-card text-ink/75 hover:border-ink/30 hover:bg-raise"
      }`}
    >
      {children}
    </button>
  );
}

function CatalogCard({
  resource,
  onOpen,
  selected,
}: {
  resource: Resource;
  onOpen: () => void;
  selected: boolean;
}) {
  const ret = resource.investigatorReturns[0];
  const usefulWhen = resource.usefulWhen[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-pressed={selected}
      className={`flex h-full min-h-[190px] w-full min-w-0 flex-col rounded-2xl border bg-card p-3.5 text-left transition duration-200 hover:border-ink/25 hover:bg-raise/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] ${
        selected
          ? "border-ink/40 bg-raise/60 shadow-[0_10px_28px_rgba(0,0,0,0.4)]"
          : "border-line/70"
      }`}
    >
      <span
        className={`font-mono inline-flex w-fit shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] ${SOURCE_BADGE[resource.internality]}`}
      >
        {SOURCE_LABEL[resource.internality]}
      </span>
      <h3 className="font-display mt-2 line-clamp-2 text-base leading-snug text-ink">
        {resource.title}
      </h3>
      <p className="mt-0.5 line-clamp-1 text-xs text-muted">
        {resource.organization}
      </p>
      {ret && (
        <div className="mt-3">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
            What you get
          </p>
          <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-ink/85">
            {ret}
          </p>
        </div>
      )}
      {usefulWhen && (
        <div className="mt-auto pt-3">
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
            Useful when
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink/70">
            {usefulWhen}
          </p>
        </div>
      )}
      <span className="mt-3 text-xs font-medium text-washu">
        View details →
      </span>
    </button>
  );
}

export function ResourcesCatalog() {
  const [source, setSource] = useState<Internality | "all">("all");
  const { selectedResourceId, selectResource } = useNavigator();

  const filtered = useMemo(() => filterResources({ source }), [source]);
  const groups = useMemo(() => {
    const order: Internality[] = ["washu", "federal", "regional", "investor"];
    if (source !== "all") {
      return [
        {
          id: source,
          label: SOURCE_LABEL[source],
          resources: [...filtered].sort((a, b) =>
            a.title.localeCompare(b.title),
          ),
        },
      ];
    }
    return order.map((id) => ({
      id,
      label: SOURCE_LABEL[id],
      resources: filtered
        .filter((resource) => resource.internality === id)
        .sort((a, b) => a.title.localeCompare(b.title)),
    }));
  }, [filtered, source]);
  const open = selectedResourceId
    ? resourceById[selectedResourceId]
    : undefined;

  return (
    <div className="flex h-full min-h-0">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
          Catalog
        </p>
        <h2 className="font-display mt-1 text-3xl text-ink">All resources</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Browse every program in the navigator. Filtering here does not change
          your path.
        </p>
        <p className="mt-1 text-xs text-muted">
          {filtered.length} of {resources.length} programs
        </p>

        <div className="sticky top-0 z-10 -mx-2 mt-3 border-b border-line/70 bg-paper/95 px-2 py-3 backdrop-blur-sm">
          <div
            className="flex flex-nowrap gap-2 overflow-x-auto pb-1"
            aria-label="Filter resources by source"
          >
            {SOURCES.map((item) => {
              const count =
                item.id === "all"
                  ? resources.length
                  : resources.filter(
                      (resource) => resource.internality === item.id,
                    ).length;
              return (
                <Chip
                  key={item.id}
                  selected={source === item.id}
                  selectedClass={item.chip}
                  onClick={() => setSource(item.id)}
                >
                  {`${item.label} · ${count}`}
                </Chip>
              );
            })}
          </div>
        </div>

        <div className="mt-5 space-y-8">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`resources-${group.id}`}>
              <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-line pb-2">
                <h3
                  id={`resources-${group.id}`}
                  className="font-display text-xl text-ink"
                >
                  {group.label}
                </h3>
                <span className="text-xs text-muted">
                  {group.resources.length} programs
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
                {group.resources.map((resource) => (
                  <li key={resource.id} className="min-w-0">
                    <CatalogCard
                      resource={resource}
                      selected={selectedResourceId === resource.id}
                      onOpen={() => selectResource(resource.id)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {open && (
        <aside className="hidden h-full w-[380px] shrink-0 overflow-y-auto border-l border-line bg-card px-5 py-6 lg:block">
          <button
            type="button"
            onClick={() => selectResource(null)}
            className="mb-4 text-sm font-medium text-muted hover:text-ink"
          >
            ← Back to cards
          </button>
          <ResourceCard resource={open} />
        </aside>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-label="Close program details"
            onClick={() => selectResource(null)}
            className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${open.title} details`}
            className="fixed inset-x-0 bottom-0 z-30 max-h-[80vh] overflow-y-auto rounded-t-3xl border border-line bg-card px-5 py-5 shadow-[0_-12px_48px_rgba(0,0,0,0.6)] lg:hidden"
          >
            <div
              className="mx-auto mb-3 h-1 w-10 rounded-full bg-line"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => selectResource(null)}
              className="mb-4 text-sm font-medium text-muted hover:text-ink"
            >
              ← Back to cards
            </button>
            <ResourceCard resource={open} />
          </div>
        </>
      )}
    </div>
  );
}
