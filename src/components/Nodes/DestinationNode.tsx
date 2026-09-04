import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { MapNode, VisualState } from "../../types/navigator";
import { nodeChrome, nodeLabel } from "./nodeChrome";

interface DestinationData extends MapNode {
  visualState: VisualState;
}

export function DestinationNode({ data, selected }: NodeProps) {
  const node = data as unknown as DestinationData;
  const visual = selected && node.visualState !== "current"
    ? "selected"
    : node.visualState;
  const badge = nodeLabel(visual, "destination");

  return (
    <div className="w-[210px]">
      <Handle type="target" position={Position.Left} />
      <button
        type="button"
        className={`${nodeChrome(visual)} w-full bg-linear-to-br from-card to-[#f8f0e6] px-4 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu`}
        aria-label={`Destination: ${node.title}. ${node.shortDescription}`}
      >
        <span className="mb-1.5 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-washu/80">
          {badge ?? "What this could become"}
        </span>
        <p className="font-display text-[16.5px] leading-snug text-ink">
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
