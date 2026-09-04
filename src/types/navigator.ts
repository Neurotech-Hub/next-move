export type RegionId =
  | "discover"
  | "develop"
  | "de-risk"
  | "translate"
  | "impact";

export type NodeKind = "state" | "milestone" | "destination";

export type VisualState =
  | "default"
  | "hover"
  | "selected"
  | "recommended"
  | "current"
  | "dimmed";

export type Internality = "washu" | "regional" | "federal";

export type AssetAnswer =
  | "observation"
  | "idea"
  | "evidence"
  | "prototype"
  | "software"
  | "therapeutic"
  | "device"
  | "research-tool"
  | "disclosed"
  | "unsure";

export type DestinationAnswer =
  | "clinical-use"
  | "licensing"
  | "startup"
  | "research-impact"
  | "funding"
  | "distribution"
  | "unsure";

export type MotivationAnswer =
  | "papers"
  | "grants"
  | "trainees"
  | "collaborators"
  | "reach"
  | "patients"
  | "financial"
  | "low-time";

export type InvolvementAnswer =
  | "research-focus"
  | "advise"
  | "open"
  | "founder"
  | "unsure";

export interface Position {
  x: number;
  y: number;
}

export interface Region {
  id: RegionId;
  title: string;
  subtitle: string;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface NodeDetails {
  whyItMatters: string;
  youMayBeHereIf: string[];
  nextSteps: string[];
  leadsTo: string[];
}

export interface MapNode {
  id: string;
  type: NodeKind;
  region: RegionId;
  title: string;
  shortDescription: string;
  position: Position;
  tags: string[];
  details: NodeDetails;
  resourceIds: string[];
}

export type EdgeKind = "spine" | "fork" | "destination";

export interface MapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  kind: EdgeKind;
}

export type ViewMode = "journey" | "overview";

export type NodeEmphasis = "current" | "primary" | "secondary" | "muted" | "none";

export interface Route {
  id: string;
  title: string;
  summary: string;
  nodeIds: string[];
  edgeIds: string[];
  destinationIds: string[];
  motivations: MotivationAnswer[];
  modalities: string[];
}

export interface Resource {
  id: string;
  type: "resource";
  title: string;
  organization: string;
  url: string;
  internality: Internality;
  domains: string[];
  states: string[];
  problemsSolved: string[];
  whatYouGet: string;
  whyYouMightCare: string;
  usefulWhen: string[];
  notFor: string[];
  eligibility: string;
  requiresDisclosure: boolean;
  companyRequired: boolean;
  funding: string | null;
  caveats: string[];
  investigatorReturns: string[];
  nextStates: string[];
  status: string;
  nextDeadline: string | null;
  lastVerified: string;
  sourceUrls: string[];
  contact?: string;
}

export interface GuideAnswers {
  asset?: AssetAnswer;
  destinations: DestinationAnswer[];
  motivations: MotivationAnswer[];
  involvement?: InvolvementAnswer;
}

export interface Recommendation {
  currentStateId: string;
  routeIds: string[];
  destinationIds: string[];
  summary: string;
  youAreHereLabel: string;
}
