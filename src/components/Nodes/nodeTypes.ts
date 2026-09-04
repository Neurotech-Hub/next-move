import type { NodeTypes } from "@xyflow/react";
import { DestinationNode } from "./DestinationNode";
import { MilestoneNode } from "./MilestoneNode";
import { RegionNode } from "./RegionNode";
import { StateNode } from "./StateNode";

export const nodeTypes: NodeTypes = {
  region: RegionNode,
  state: StateNode,
  milestone: MilestoneNode,
  destination: DestinationNode,
};
