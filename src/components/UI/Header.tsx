import { Info, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchNavigator } from "../../logic/filters";
import { APP_CHANNEL, APP_VERSION } from "../../version";
import { useNavigator } from "../../state/NavigatorContext";

const iconBtn =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink/60 transition hover:bg-raise hover:text-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";

function AboutPanel() {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-ink/85">
        NextMove was developed by the Innovation Directorate in the Department
        of Neuroscience at the Washington University Medical School.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-gold">
          {APP_CHANNEL}
        </span>
        <span className="font-mono text-[11px] text-muted">v{APP_VERSION}</span>
      </div>
    </div>
  );
}

function SearchPanel({
  onChoose,
}: {
  onChoose?: () => void;
}) {
  const { searchQuery, setSearchQuery, selectNode, selectResource, setView } =
    useNavigator();
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => searchNavigator(searchQuery), [searchQuery]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const choose = (hit: (typeof hits)[number]) => {
    if (hit.kind === "resource" && hit.resourceId) {
      selectResource(hit.resourceId, hit.nodeId);
    } else {
      setView("journey");
      selectNode(hit.nodeId);
    }
    setSearchQuery("");
    onChoose?.();
  };

  return (
    <div>
      <div className="flex items-center gap-2 rounded-xl bg-raise px-2.5">
        <Search className="size-3.5 shrink-0 text-muted" aria-hidden />
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
        <ul className="mt-2 max-h-64 overflow-y-auto" role="listbox">
          {hits.map((hit) => (
            <li key={`${hit.kind}-${hit.id}`}>
              <button
                type="button"
                className="w-full rounded-xl px-2.5 py-2 text-left transition hover:bg-raise"
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
  );
}

function DesktopSearch() {
  const [open, setOpen] = useState(false);
  const { setSearchQuery } = useNavigator();
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={iconBtn}
        aria-expanded={open}
        aria-label="Search stages and resources"
      >
        <Search className="size-3.5" aria-hidden />
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-[min(88vw,22rem)] rounded-2xl border border-line bg-card p-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
          <SearchPanel
            onChoose={() => {
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

function DesktopAbout() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
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
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={iconBtn}
        aria-expanded={open}
        aria-label="About NextMove"
      >
        <Info className="size-3.5" aria-hidden />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="About NextMove"
          className="absolute right-0 top-11 z-50 w-[min(88vw,18.5rem)] rounded-2xl border border-line bg-card p-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
        >
          <AboutPanel />
        </div>
      )}
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { view, setView, setSearchQuery } = useNavigator();
  const rootRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={rootRef} className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={iconBtn}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <X className="size-3.5" aria-hidden />
        ) : (
          <Menu className="size-3.5" aria-hidden />
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-[min(92vw,20rem)] rounded-2xl border border-line bg-card p-3 shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
          <button
            type="button"
            onClick={() => {
              setView(view === "resources" ? "journey" : "resources");
              setOpen(false);
            }}
            className="w-full rounded-xl border border-line bg-raise/50 px-3 py-2.5 text-left text-sm font-medium text-ink transition hover:bg-raise"
          >
            {view === "resources" ? "Your path" : "Resources"}
          </button>

          <div className="mt-3 border-t border-line pt-3">
            <p className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
              Search
            </p>
            <SearchPanel onChoose={() => setOpen(false)} />
          </div>

          <div className="mt-3 border-t border-line pt-3">
            <p className="mb-2 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
              About
            </p>
            <AboutPanel />
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { reset, view, setView } = useNavigator();

  return (
    <header className="relative z-40 shrink-0 border-b border-line/70 bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="relative z-10 min-w-0">
          <button
            type="button"
            onClick={reset}
            className="group relative z-10 flex max-w-full items-center gap-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
            aria-label="NextMove at WashU home"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden
              className="size-7 shrink-0 transition duration-200 group-hover:drop-shadow-[0_0_8px_rgba(225,75,82,0.5)] sm:size-8 md:size-9"
            >
              <circle
                cx="10"
                cy="16"
                r="5.5"
                fill="var(--color-washu)"
                opacity="0.18"
              />
              <circle cx="10" cy="16" r="3" fill="var(--color-washu)" />
              <circle cx="22" cy="10" r="2.5" fill="var(--color-gold)" />
              <circle cx="22" cy="22" r="2.5" fill="var(--color-sage)" />
              <path
                d="M13 16h6.5M19 12.5L22 10M19 19.5L22 22"
                stroke="var(--color-ink)"
                strokeOpacity="0.55"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="flex min-w-0 items-center gap-1.5 md:gap-2">
              <span className="font-logo truncate text-[13px] font-medium uppercase leading-none tracking-[0.06em] text-ink sm:text-[14px] md:text-[17px]">
                NextMove
              </span>
              <span className="hidden shrink-0 text-[9px] font-medium uppercase leading-none tracking-[0.12em] text-ink/30 min-[380px]:inline sm:text-[10px] md:text-[11px]">
                at WashU
              </span>
            </span>
          </button>
        </h1>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() =>
                setView(view === "resources" ? "journey" : "resources")
              }
              aria-pressed={view === "resources"}
              className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-ink/55 transition hover:bg-raise hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
            >
              {view === "resources" ? "Your path" : "Resources"}
            </button>
            <DesktopSearch />
            <DesktopAbout />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
