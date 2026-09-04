import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { MapNode, VisualState } from "../../types/navigator";
import { nodeChrome, nodeLabel } from "./nodeChrome";

interface StateData extends MapNode {
  visualState: VisualState;
}

export function StateNode({ data, selected }: NodeProps) {
  const node = data as unknown as StateData;
  const visual = selected && node.visualState !== "current"
    ? "selected"
    : node.visualState;
  const badge = nodeLabel(visual, "state");

  return (
    <div className="w-[220px]">
      <Handle type="target" position={Position.Left} />
      <button
        type="button"
        className={`${nodeChrome(visual)} w-full px-4 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu`}
        aria-label={`${node.title}. ${node.shortDescription}${visual === "current" ? " You are here." : ""}`}
        aria-current={visual === "current" ? "step" : undefined}
      >
        {badge ? (
          <span
            className={`mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] ${
              visual === "current" ? "text-washu" : "text-gold"
            }`}
          >
            {badge}
          </span>
        ) : (
          <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/70">
            State
          </span>
        )}
        <p className="font-display text-[17px] leading-snug text-ink">
          {node.title}
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
          {node.shortDescription}
        </p>
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
