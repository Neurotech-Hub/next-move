import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { APP_CHANNEL, APP_VERSION } from "../../version";

export function AboutControl() {
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
        className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-card text-ink/55 transition hover:bg-raise hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
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
          <p className="text-sm leading-relaxed text-ink/85">
            NextMove was developed by the Innovation Directorate in the
            Department of Neuroscience at the Washington University Medical
            School.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-gold">
              {APP_CHANNEL}
            </span>
            <span className="font-mono text-[11px] text-muted">
              v{APP_VERSION}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
