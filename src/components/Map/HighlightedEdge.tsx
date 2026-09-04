import {
  BaseEdge,
  getBezierPath,
  type EdgeProps,
} from "@xyflow/react";

type Emphasis = "strong" | "medium" | "dim" | "default";

const STYLES: Record<
  Emphasis,
  { stroke: string; strokeWidth: number; opacity: number }
> = {
  strong: { stroke: "#a51417", strokeWidth: 2.6, opacity: 1 },
  medium: { stroke: "#b8893d", strokeWidth: 2.1, opacity: 0.92 },
  dim: { stroke: "#cfc4b4", strokeWidth: 1.2, opacity: 0.28 },
  default: { stroke: "#c4b8a5", strokeWidth: 1.5, opacity: 0.85 },
};

export function HighlightedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps) {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const emphasis = ((data as { emphasis?: Emphasis } | undefined)?.emphasis ??
    "default") as Emphasis;
  const style = STYLES[emphasis];

  return (
    <BaseEdge
      id={id}
      path={path}
      markerEnd={markerEnd}
      style={{
        stroke: style.stroke,
        strokeWidth: style.strokeWidth,
        opacity: style.opacity,
        transition: "opacity 220ms ease, stroke 220ms ease",
      }}
    />
  );
}
