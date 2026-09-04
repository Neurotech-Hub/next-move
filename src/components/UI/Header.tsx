import { List, Map as MapIcon, RotateCcw, Sparkles } from "lucide-react";
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
          <h1 className="font-display mt-0.5 text-[1.45rem] leading-none tracking-tight text-ink sm:text-[1.7rem]">
            Where could your idea go?
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex rounded-full border border-stone-200 bg-card p-0.5"
            role="group"
            aria-label="View"
          >
            <button
              type="button"
              onClick={() => setView("journey")}
              aria-pressed={view === "journey"}
              className={`${seg} ${view === "journey" ? "bg-ink text-paper" : "text-ink/75 hover:bg-stone-100"}`}
            >
              <List className="size-3.5" aria-hidden />
              Journey
            </button>
            <button
              type="button"
              onClick={() => setView("overview")}
              aria-pressed={view === "overview"}
              className={`${seg} ${view === "overview" ? "bg-ink text-paper" : "text-ink/75 hover:bg-stone-100"}`}
            >
              <MapIcon className="size-3.5" aria-hidden />
              Overview map
            </button>
          </div>

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

          {(recommendation || guideOpen) && (
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
