import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchNavigator } from "../../logic/filters";
import { useNavigator } from "../../state/NavigatorContext";

export function SearchControl() {
  const { searchQuery, setSearchQuery, selectNode, selectResource } =
    useNavigator();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const hits = useMemo(() => searchNavigator(searchQuery), [searchQuery]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchQuery("");
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as globalThis.Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, setSearchQuery]);

  const choose = (hit: (typeof hits)[number]) => {
    if (hit.kind === "resource" && hit.resourceId) {
      selectResource(hit.resourceId, hit.nodeId);
    } else {
      selectNode(hit.nodeId);
    }
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-card px-3 py-1.5 text-sm font-medium text-ink/75 transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
        aria-expanded={open}
        aria-label="Search stages and resources"
      >
        <Search className="size-3.5" aria-hidden />
        <span className="hidden sm:inline">Search</span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-40 w-[min(88vw,22rem)] rounded-2xl border border-stone-200 bg-card p-2 shadow-[0_16px_40px_rgba(28,25,23,0.14)]">
          <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-2.5">
            <Search className="size-3.5 text-muted" aria-hidden />
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="patent, funding, prototype, clinical…"
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
              aria-label="Search stages and resources"
            />
          </div>
          {hits.length > 0 && (
            <ul className="mt-2 max-h-72 overflow-y-auto" role="listbox">
              {hits.map((hit) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <button
                    type="button"
                    className="w-full rounded-xl px-2.5 py-2 text-left hover:bg-stone-100"
                    onClick={() => choose(hit)}
                  >
                    <p className="text-sm font-medium text-ink">{hit.title}</p>
                    <p className="text-xs text-muted">
                      {hit.kind === "resource" ? "Resource · " : ""}
                      {hit.subtitle}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {searchQuery.trim().length >= 2 && hits.length === 0 && (
            <p className="px-2.5 py-3 text-sm text-muted">No matches yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
