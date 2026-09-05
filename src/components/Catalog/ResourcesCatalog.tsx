import { useMemo, useState } from "react";
import { resources, resourceById } from "../../data";
import {
  filterResources,
  resourcePriority,
  resourcePurposes,
} from "../../logic/filters";
import { useNavigator } from "../../state/NavigatorContext";
import type {
  Internality,
  Resource,
  ResourcePriority,
  ResourcePurpose,
} from "../../types/navigator";
import { ResourceCard } from "../Drawer/ResourceCard";

const SOURCES: { id: Internality | "all"; label: string }[] = [
  { id: "all", label: "All sources" },
  { id: "washu", label: "WashU" },
  { id: "regional", label: "Regional" },
  { id: "federal", label: "Federal" },
  { id: "investor", label: "Investor" },
];

const PURPOSES: { id: ResourcePurpose | "all"; label: string }[] = [
  { id: "all", label: "All purposes" },
  { id: "research", label: "Research support" },
  { id: "funding", label: "Funding" },
  { id: "expertise", label: "Expertise" },
  { id: "ip", label: "IP & licensing" },
  { id: "company", label: "Company-building" },
];

const PRIORITIES: { id: ResourcePriority | "all"; label: string }[] = [
  { id: "all", label: "All cards" },
  { id: "core", label: "Core twelve" },
  { id: "second", label: "Conditional / second wave" },
];

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        selected
          ? "border-ink bg-ink text-paper"
          : "border-stone-300 bg-card text-ink/75 hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

function CatalogCard({
  resource,
  onOpen,
}: {
  resource: Resource;
  onOpen: () => void;
}) {
  const trap = resource.caveats[0];
  const ret = resource.investigatorReturns[0];
  const wave = resourcePriority(resource);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full flex-col rounded-2xl border border-stone-200 bg-card p-4 text-left transition hover:border-ink/25 hover:shadow-[0_10px_24px_rgba(28,25,23,0.08)]"
    >
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span>{resource.internality}</span>
        <span aria-hidden>·</span>
        <span>{wave === "core" ? "Core" : "Conditional"}</span>
      </div>
      <h3 className="font-display mt-2 text-lg leading-snug text-ink">
        {resource.title}
      </h3>
      <p className="mt-1 text-xs text-muted">{resource.organization}</p>
      {ret && (
        <p className="mt-3 text-sm leading-relaxed text-ink/85">{ret}</p>
      )}
      {trap && (
        <p className="mt-2 text-xs leading-relaxed text-washu/85">{trap}</p>
      )}
      <p className="mt-auto pt-3 text-[11px] text-muted">
        {resourcePurposes(resource).join(" · ")}
      </p>
    </button>
  );
}

export function ResourcesCatalog() {
  const [source, setSource] = useState<Internality | "all">("all");
  const [purpose, setPurpose] = useState<ResourcePurpose | "all">("all");
  const [priority, setPriority] = useState<ResourcePriority | "all">("all");
  const [query, setQuery] = useState("");
  const { selectedResourceId, selectResource } = useNavigator();

  const filtered = useMemo(
    () => filterResources({ source, purpose, priority, query }),
    [priority, purpose, query, source],
  );
  const open = selectedResourceId
    ? resourceById[selectedResourceId]
    : undefined;

  return (
    <div className="flex h-full min-h-0">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-washu">
          Catalog
        </p>
        <h2 className="font-display mt-1 text-3xl text-ink">All resources</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Every program collected in the research snapshot, including
          conditional second-wave cards. Filters do not change your path —
          they help you inspect the catalog.
        </p>
        <p className="mt-1 text-xs text-muted">
          {filtered.length} of {resources.length} cards
        </p>

        <label className="mt-5 block">
          <span className="sr-only">Filter resources</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search eligibility, returns, traps…"
            className="h-10 w-full max-w-md rounded-full border border-stone-200 bg-card px-4 text-sm outline-none focus:border-ink/30"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {SOURCES.map((item) => (
            <Chip
              key={item.id}
              selected={source === item.id}
              onClick={() => setSource(item.id)}
            >
              {item.label}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {PURPOSES.map((item) => (
            <Chip
              key={item.id}
              selected={purpose === item.id}
              onClick={() => setPurpose(item.id)}
            >
              {item.label}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRIORITIES.map((item) => (
            <Chip
              key={item.id}
              selected={priority === item.id}
              onClick={() => setPriority(item.id)}
            >
              {item.label}
            </Chip>
          ))}
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((resource) => (
            <li key={resource.id}>
              <CatalogCard
                resource={resource}
                onOpen={() => selectResource(resource.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <aside className="hidden h-full w-[380px] shrink-0 overflow-y-auto border-l border-stone-200 bg-card px-5 py-6 lg:block">
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
        <div className="fixed inset-x-0 bottom-0 z-30 max-h-[80vh] overflow-y-auto rounded-t-3xl border bg-card px-5 py-5 shadow-[0_-12px_40px_rgba(28,25,23,0.14)] lg:hidden">
          <button
            type="button"
            onClick={() => selectResource(null)}
            className="mb-4 text-sm font-medium text-muted hover:text-ink"
          >
            ← Back to cards
          </button>
          <ResourceCard resource={open} />
        </div>
      )}
    </div>
  );
}
