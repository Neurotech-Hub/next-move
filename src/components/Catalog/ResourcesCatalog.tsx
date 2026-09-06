import { useMemo, useRef, useState } from "react";
import { resources, resourceById } from "../../data";
import { resourcePriority } from "../../logic/filters";
import { useNavigator } from "../../state/NavigatorContext";
import type {
  Internality,
  Resource,
  ResourceInventionType,
  ResourceLocation,
  ResourceNeed,
} from "../../types/navigator";
import { ResourceCard } from "../Drawer/ResourceCard";

type ViewBy = "needs" | "inventionTypes" | "locations";

const VIEW_BY_OPTIONS: { id: ViewBy; label: string }[] = [
  { id: "locations", label: "Location" },
  { id: "needs", label: "What I Need" },
  { id: "inventionTypes", label: "Invention Type" },
];

const NEED_SECTIONS: { id: ResourceNeed; label: string }[] = [
  { id: "funding", label: "Funding" },
  { id: "expertise-mentorship", label: "Advice & Expertise" },
  { id: "build-test", label: "Build & Test" },
  { id: "ip-licensing", label: "IP & Licensing" },
  { id: "industry-connections", label: "Industry Connections" },
  { id: "startup-support", label: "Startup Support" },
];

const INVENTION_SECTIONS: { id: ResourceInventionType; label: string }[] = [
  { id: "therapeutics", label: "Therapeutics" },
  { id: "devices-diagnostics", label: "Devices & Diagnostics" },
  { id: "software-digital", label: "Software & Digital" },
  { id: "research-tools", label: "Research Tools" },
  { id: "broad", label: "Broad / Any Type" },
];

const LOCATION_SECTIONS: { id: ResourceLocation; label: string }[] = [
  { id: "washu", label: "WashU" },
  { id: "st-louis", label: "St. Louis" },
  { id: "regional", label: "Regional" },
  { id: "national", label: "National" },
];

const SOURCE_BADGE: Record<Internality, string> = {
  washu: "border-washu/25 bg-washu/10 text-washu",
  federal: "border-federal/25 bg-federal/10 text-federal",
  regional: "border-sage/25 bg-sage/10 text-sage",
  investor: "border-gold/25 bg-gold/10 text-gold",
};

const SOURCE_LABEL: Record<Internality, string> = {
  washu: "WashU",
  federal: "Federal",
  regional: "Regional",
  investor: "Investor",
};

function sectionsFor(viewBy: ViewBy) {
  if (viewBy === "needs") return NEED_SECTIONS;
  if (viewBy === "inventionTypes") return INVENTION_SECTIONS;
  return LOCATION_SECTIONS;
}

function compareCatalogResources(a: Resource, b: Resource) {
  const priorityRank = { core: 0, second: 1 } as const;
  const byPriority =
    priorityRank[resourcePriority(a)] - priorityRank[resourcePriority(b)];
  if (byPriority !== 0) return byPriority;
  return a.title.localeCompare(b.title);
}

function groupResources(viewBy: ViewBy) {
  const sections = sectionsFor(viewBy);
  const groups = sections
    .map((section) => ({
      id: section.id,
      label: section.label,
      resources: resources
        .filter((resource) => {
          if (viewBy === "needs") {
            return resource.needs.includes(section.id as ResourceNeed);
          }
          if (viewBy === "inventionTypes") {
            // "broad" is its own section — never expand into every type.
            return resource.inventionTypes.includes(
              section.id as ResourceInventionType,
            );
          }
          // Location uses one primary bucket; ignore any extra tags.
          return resource.locations[0] === section.id;
        })
        .sort(compareCatalogResources),
    }))
    .filter((section) => section.resources.length > 0);

  // Location keeps geographic order; other lenses sort A–Z for jump + listings.
  if (viewBy === "locations") return groups;
  return [...groups].sort((a, b) =>
    a.label.localeCompare(b.label, undefined, { sensitivity: "base" }),
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

function CatalogFilters({
  viewBy,
  onViewBy,
  groups,
  onJump,
  compact = false,
}: {
  viewBy: ViewBy;
  onViewBy: (id: ViewBy) => void;
  groups: { id: string; label: string; resources: Resource[] }[];
  onJump: (sectionId: string) => void;
  compact?: boolean;
}) {
  return (
    <>
      <p
        id={compact ? "view-resources-by-label-mobile" : "view-resources-by-label"}
        className={`font-mono font-medium uppercase tracking-[0.16em] text-muted ${
          compact ? "text-[9px]" : "text-[10px]"
        }`}
      >
        View resources by
      </p>
      <div
        className={compact ? "mt-1.5 space-y-1" : "mt-2 space-y-1.5"}
        role="group"
        aria-labelledby={
          compact ? "view-resources-by-label-mobile" : "view-resources-by-label"
        }
      >
        {VIEW_BY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={viewBy === option.id}
            onClick={() => onViewBy(option.id)}
            className={`w-full rounded-xl border text-left font-medium transition duration-200 ${
              compact ? "px-3 py-1.5 text-[13px]" : "px-3 py-2.5 text-sm"
            } ${
              viewBy === option.id
                ? "border-ink bg-ink text-paper"
                : "border-line bg-raise/50 text-ink/80 hover:border-ink/25 hover:bg-raise"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {groups.length > 0 && (
        <nav className={compact ? "mt-2" : "mt-5"} aria-label="Jump to section">
          <p
            className={`font-mono font-medium uppercase tracking-[0.16em] text-muted ${
              compact ? "text-[9px]" : "text-[10px]"
            }`}
          >
            Jump to
          </p>
          <ul
            className={
              compact
                ? "mt-0.5 grid grid-cols-2 gap-x-1 gap-y-0"
                : "mt-2 space-y-0.5"
            }
          >
            {groups.map((group) => (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => onJump(group.id)}
                  className={`flex w-full items-baseline justify-between gap-2 rounded-lg text-left text-muted transition hover:bg-raise hover:text-ink ${
                    compact
                      ? "px-2 py-0.5 text-[12px] leading-tight"
                      : "px-2.5 py-1.5 text-[13px]"
                  }`}
                >
                  <span className="truncate">{group.label}</span>
                  <span
                    className={`font-mono shrink-0 text-muted/70 ${
                      compact ? "text-[10px]" : "text-[11px]"
                    }`}
                  >
                    {group.resources.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export function ResourcesCatalog() {
  const [viewBy, setViewBy] = useState<ViewBy>("locations");
  const listRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { selectedResourceId, selectResource } = useNavigator();

  const groups = useMemo(() => groupResources(viewBy), [viewBy]);
  const open = selectedResourceId
    ? resourceById[selectedResourceId]
    : undefined;

  const jumpToSection = (sectionId: string) => {
    const scroller = listRef.current;
    const target = scroller?.querySelector(
      `#resources-section-${sectionId}`,
    ) as HTMLElement | null;
    if (!scroller || !target) return;

    // Mobile sticky filters cover the top of the scroller — offset so the
    // section heading lands just below that bar.
    const stickyHeight = stickyRef.current?.getBoundingClientRect().height ?? 0;
    const stickyOffset = stickyHeight > 0 ? stickyHeight + 8 : 0;
    const next =
      scroller.scrollTop +
      (target.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top) -
      stickyOffset;
    scroller.scrollTo({ top: Math.max(0, next), behavior: "smooth" });
  };

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      {/* Desktop filter rail */}
      <aside
        className="hidden w-[320px] shrink-0 flex-col border-r border-line bg-card lg:flex lg:h-full lg:min-h-0"
        aria-label="Catalog filters"
      >
        <div className="px-5 py-5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
            Catalog
          </p>
          <h2 className="font-display mt-1 text-[1.55rem] leading-tight text-ink">
            All resources
          </h2>

          <div className="mt-5">
            <CatalogFilters
              viewBy={viewBy}
              onViewBy={setViewBy}
              groups={groups}
              onJump={jumpToSection}
            />
          </div>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1">
        <div
          ref={listRef}
          className="field-bg min-h-0 flex-1 overflow-y-auto"
        >
          {/* Mobile title — scrolls away */}
          <div className="border-b border-line bg-card px-5 pt-5 pb-3 lg:hidden">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-washu">
              Catalog
            </p>
            <h2 className="font-display mt-1 text-[1.55rem] leading-tight text-ink">
              All resources
            </h2>
          </div>

          {/* Mobile sticky: same sidebar controls, tighter spacing */}
          <div
            ref={stickyRef}
            className="sticky top-0 z-10 border-b border-line bg-card px-5 py-3 lg:hidden"
          >
            <CatalogFilters
              viewBy={viewBy}
              onViewBy={setViewBy}
              groups={groups}
              onJump={jumpToSection}
              compact
            />
          </div>

          <div className="px-4 py-5 sm:px-8">
            <div
              key={viewBy}
              className="resource-groups mx-auto max-w-5xl space-y-8"
            >
              {groups.map((group) => (
                <section
                  key={group.id}
                  id={`resources-section-${group.id}`}
                  aria-labelledby={`resources-${group.id}`}
                  className="scroll-mt-3"
                >
                  <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-line pb-2">
                    <h3
                      id={`resources-${group.id}`}
                      className="font-display text-xl text-ink"
                    >
                      {group.label}
                    </h3>
                    <span className="text-xs text-muted">
                      {group.resources.length}{" "}
                      {group.resources.length === 1 ? "program" : "programs"}
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-2.5 [grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
                    {group.resources.map((resource) => (
                      <li key={`${group.id}-${resource.id}`} className="min-w-0">
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
      </div>

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
