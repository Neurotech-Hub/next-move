import { useReactFlow } from "@xyflow/react";
import { Maximize2, Minus, Plus } from "lucide-react";

export function MapControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const button =
    "rounded-full p-2 text-ink/70 transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu";

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-stone-200/80 bg-card/95 p-1 shadow-[0_10px_30px_rgba(28,25,23,0.08)] backdrop-blur">
      <button type="button" onClick={() => void zoomOut({ duration: 180 })} className={button} aria-label="Zoom out">
        <Minus className="size-4" />
      </button>
      <button type="button" onClick={() => void zoomIn({ duration: 180 })} className={button} aria-label="Zoom in">
        <Plus className="size-4" />
      </button>
      <button type="button" onClick={() => void fitView({ padding: 0.12, duration: 280 })} className={button} aria-label="Fit map">
        <Maximize2 className="size-4" />
      </button>
    </div>
  );
}
