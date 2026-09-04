import {
  Background,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useEffect, useMemo } from "react";
import { edges as edgeData, nodes as nodeData, regions } from "../../data";
import { useNavigator } from "../../state/NavigatorContext";
import { nodeTypes } from "../Nodes/nodeTypes";
import { HighlightedEdge } from "./HighlightedEdge";
import { MapControls } from "./MapControls";
import type { NodeEmphasis, VisualState } from "../../types/navigator";

const edgeTypes = { highlighted: HighlightedEdge };

function toVisual(emphasis: NodeEmphasis, selected: boolean): VisualState {
  if (emphasis === "current") return "current";
  if (selected) return "selected";
  if (emphasis === "primary" || emphasis === "secondary") return "recommended";
  if (emphasis === "muted") return "dimmed";
  return "default";
}

export function InnovationMap() {
  const {
    selectNode,
    selectedNodeId,
    nodeEmphasis,
    edgeEmphasis,
    recommendation,
    highlightedNodeIds,
    highlightedEdgeIds,
  } = useNavigator();
  const { fitView } = useReactFlow();

  const flowNodes = useMemo<Node[]>(() => {
    const regionNodes = regions.map((region) => ({
      id: `region-${region.id}`,
      type: "region",
      position: { x: region.bounds.x, y: region.bounds.y },
      data: { ...region },
      selectable: false,
      draggable: false,
      connectable: false,
      focusable: false,
      style: {
        width: region.bounds.width,
        height: region.bounds.height,
        zIndex: -1,
      },
    }));

    // Milestones stay in the journey view; the overview shows only states and destinations.
    const mapNodes = nodeData
      .filter((node) => node.type !== "milestone")
      .map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          ...node,
          visualState: toVisual(nodeEmphasis(node.id), selectedNodeId === node.id),
        },
        draggable: false,
        connectable: false,
      }));

    return [...regionNodes, ...mapNodes] as Node[];
  }, [nodeEmphasis, selectedNodeId]);

  const flowEdges = useMemo<Edge[]>(
    () =>
      edgeData
        .filter((edge) => {
          // Never draw milestone edges on the overview.
          if (edge.source.startsWith("ms-") || edge.target.startsWith("ms-")) {
            return false;
          }
          if (edge.kind !== "destination") return true;
          // Destination links appear only when they matter.
          return (
            highlightedEdgeIds.has(edge.id) ||
            edge.source === selectedNodeId ||
            edge.target === selectedNodeId
          );
        })
        .map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: "highlighted",
          data: { emphasis: edgeEmphasis(edge.id) },
          interactionWidth: 12,
        })),
    [edgeEmphasis, highlightedEdgeIds, selectedNodeId],
  );

  useEffect(() => {
    if (!recommendation) return;
    const ids = [...highlightedNodeIds];
    if (!ids.length) return;
    const timeout = window.setTimeout(() => {
      void fitView({ nodes: ids.map((id) => ({ id })), padding: 0.25, duration: 400 });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [fitView, highlightedNodeIds, recommendation]);

  return (
    <div className="relative h-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesReconnectable={false}
        elementsSelectable
        selectNodesOnDrag={false}
        panOnDrag
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        deleteKeyCode={null}
        multiSelectionKeyCode={null}
        selectionKeyCode={null}
        minZoom={0.22}
        maxZoom={1.55}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        onNodeClick={(_, node) => {
          if (node.type === "region") return;
          selectNode(node.id);
        }}
        onPaneClick={() => selectNode(null)}
      >
        <Background color="#d9d0c3" gap={28} size={1} />
      </ReactFlow>
      <div className="absolute bottom-4 right-4 z-10">
        <MapControls />
      </div>
    </div>
  );
}
