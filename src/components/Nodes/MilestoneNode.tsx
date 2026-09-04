import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { MapNode, VisualState } from "../../types/navigator";
import { nodeChrome, nodeLabel } from "./nodeChrome";

interface MilestoneData extends MapNode {
  visualState: VisualState;
}

export function MilestoneNode({ data, selected }: NodeProps) {
  const node = data as unknown as MilestoneData;
  const visual = selected && node.visualState !== "current"
    ? "selected"
    : node.visualState;
  const badge = nodeLabel(visual, "milestone");

  return (
    <div className="w-[200px]">
      <Handle type="target" position={Position.Left} />
      <button
        type="button"
        className={`${nodeChrome(visual)} w-full border-dashed px-3.5 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu`}
        aria-label={`${node.title}. ${node.shortDescription}`}
      >
        <span className="mb-1.5 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-sage">
          {badge ?? "Next step"}
        </span>
        <p className="text-[14.5px] font-semibold leading-snug text-ink">
          {node.title}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">
          {node.shortDescription}
        </p>
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
