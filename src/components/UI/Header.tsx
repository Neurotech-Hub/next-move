import { RotateCcw } from "lucide-react";
import { useNavigator } from "../../state/NavigatorContext";
import { SearchControl } from "../Search/SearchControl";

export function Header() {
  const { reset, view, setView, recommendation, guideOpen } = useNavigator();

  const seg =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";

  return (
    <header className="relative z-20 shrink-0 border-b border-line/70 bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="min-w-0">
          <button
            type="button"
            onClick={reset}
            className="group flex items-center gap-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
            aria-label="Innovation Navigator home"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden
              className="size-7 shrink-0 transition duration-200 group-hover:drop-shadow-[0_0_8px_rgba(225,75,82,0.5)] sm:size-8"
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
            <span className="font-logo text-[12px] font-medium uppercase leading-tight tracking-[0.04em] sm:text-[13px]">
              <span className="text-ink">Innovation</span>{" "}
              <span className="text-ink/45 transition duration-200 group-hover:text-washu">
                Navigator
              </span>
            </span>
          </button>
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setView(view === "resources" ? "journey" : "resources")
            }
            aria-pressed={view === "resources"}
            className={`${seg} text-ink/55 hover:bg-raise hover:text-ink/80`}
          >
            {view === "resources" ? "Back to your path" : "View all resources"}
          </button>

          <SearchControl />

          {(recommendation || guideOpen || view === "resources") && (
            <button
              type="button"
              onClick={reset}
              className={`${seg} text-ink/70 hover:bg-raise`}
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
