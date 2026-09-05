import { RotateCcw } from "lucide-react";
import { useNavigator } from "../../state/NavigatorContext";
import { SearchControl } from "../Search/SearchControl";

export function Header() {
  const {
    reset,
    view,
    setView,
    recommendation,
    guideOpen,
    focusedDestinationId,
  } = useNavigator();

  const seg =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";

  const showReset =
    view === "journey" &&
    Boolean(recommendation || guideOpen || focusedDestinationId);

  return (
    <header className="relative z-40 shrink-0 border-b border-line/70 bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <h1 className="min-w-0 justify-self-start">
          <button
            type="button"
            onClick={reset}
            className="group flex items-center gap-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
            aria-label="NEXTMOVE at WashU home"
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
            <span className="flex min-w-0 flex-col items-start leading-none">
              <span className="font-logo text-[13px] font-medium uppercase tracking-[0.05em] sm:text-[14px]">
                <span className="text-ink">Next</span>
                <span className="text-ink/45 transition duration-200 group-hover:text-washu">
                  Move
                </span>
              </span>
              <span className="mt-[3px] origin-left scale-x-[0.86] text-[8px] font-medium uppercase tracking-[0.14em] text-ink/32 sm:text-[8.5px]">
                At WashU
              </span>
            </span>
          </button>
        </h1>

        <div className="justify-self-center">
          {showReset && (
            <button
              type="button"
              onClick={reset}
              className={`${seg} text-ink/40 hover:bg-raise hover:text-ink/70`}
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 justify-self-end">
          <button
            type="button"
            onClick={() =>
              setView(view === "resources" ? "journey" : "resources")
            }
            aria-pressed={view === "resources"}
            className={`${seg} text-ink/55 hover:bg-raise hover:text-ink/80`}
          >
            {view === "resources" ? "Back to your path" : "View resources"}
          </button>

          <SearchControl />
        </div>
      </div>
    </header>
  );
}
