import { RotateCcw } from "lucide-react";
import { useNavigator } from "../../state/NavigatorContext";

export function ResetIconButton({ className = "" }: { className?: string }) {
  const {
    reset,
    recommendation,
    guideOpen,
    focusedDestinationId,
    view,
  } = useNavigator();

  const show =
    view === "journey" &&
    Boolean(recommendation || guideOpen || focusedDestinationId);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={reset}
      aria-label="Reset"
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink/40 transition hover:bg-raise hover:text-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu ${className}`}
    >
      <RotateCcw className="size-4" aria-hidden />
    </button>
  );
}
