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
            className="font-display text-left text-[1.45rem] leading-none tracking-tight text-ink transition hover:text-washu focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu sm:text-[1.7rem]"
            aria-label="Innovation Navigator home"
          >
            Innovation Navigator
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
