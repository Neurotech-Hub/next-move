import { RotateCcw, Sparkles } from "lucide-react";
import { useNavigator } from "../../state/NavigatorContext";
import { SearchControl } from "../Search/SearchControl";

export function Header() {
  const { openGuide, reset, view, setView, recommendation, guideOpen } =
    useNavigator();

  const seg =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";

  return (
    <header className="relative z-20 shrink-0 border-b border-stone-200/70 bg-paper/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-washu">
            Innovation Navigator
          </p>
          <h1 className="font-display mt-0.5 text-[1.35rem] leading-none tracking-tight text-ink sm:text-[1.55rem]">
            How can the innovation community serve your goals?
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setView(view === "resources" ? "journey" : "resources")
            }
            aria-pressed={view === "resources"}
            className={`${seg} text-ink/55 hover:bg-stone-100 hover:text-ink/80`}
          >
            {view === "resources" ? "Back to your path" : "View all resources"}
          </button>

          <SearchControl />

          <button
            type="button"
            onClick={openGuide}
            aria-pressed={guideOpen}
            className={`${seg} ${guideOpen ? "bg-washu text-white" : "border border-washu/40 bg-card text-washu hover:bg-washu/8"}`}
          >
            <Sparkles className="size-3.5" aria-hidden />
            {recommendation ? "Adjust answers" : "Guide me"}
          </button>

          {(recommendation || guideOpen || view === "resources") && (
            <button
              type="button"
              onClick={reset}
              className={`${seg} text-ink/70 hover:bg-stone-100`}
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
