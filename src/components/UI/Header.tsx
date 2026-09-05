import { useNavigator } from "../../state/NavigatorContext";
import { AboutControl } from "./AboutControl";
import { SearchControl } from "../Search/SearchControl";

export function Header() {
  const { reset, view, setView } = useNavigator();

  const seg =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";

  return (
    <header className="relative z-40 shrink-0 border-b border-line/70 bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="min-w-0">
          <button
            type="button"
            onClick={reset}
            className="group flex min-w-0 items-baseline gap-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
            aria-label="NextMove at WashU home"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden
              className="size-7 shrink-0 self-center transition duration-200 group-hover:drop-shadow-[0_0_8px_rgba(225,75,82,0.5)] sm:size-8"
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
            <span className="font-logo text-[13px] font-medium uppercase tracking-[0.06em] text-ink sm:text-[14px]">
              NextMove
            </span>
            <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.12em] text-ink/30 sm:text-[10px]">
              at WashU
            </span>
          </button>
        </h1>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() =>
              setView(view === "resources" ? "journey" : "resources")
            }
            aria-pressed={view === "resources"}
            className={`${seg} text-ink/55 hover:bg-raise hover:text-ink/80`}
          >
            {view === "resources" ? "Your path" : "Resources"}
          </button>

          <SearchControl />
          <AboutControl />
        </div>
      </div>
    </header>
  );
}
