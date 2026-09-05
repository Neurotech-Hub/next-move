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

export type Internality = "washu" | "regional" | "federal" | "investor";

export type ResourcePurpose =
  | "funding"
  | "expertise"
  | "ip"
  | "company"
  | "research";

export type ResourcePriority = "core" | "second";

/** Catalog “What I Need” grouping. Display “expertise-mentorship” as Advice & Expertise. */
export type ResourceNeed =
  | "funding"
  | "expertise-mentorship"
  | "build-test"
  | "ip-licensing"
  | "industry-connections"
  | "startup-support";

/** Catalog “Invention Type” grouping. “broad” is its own section, not a wildcard. */
export type ResourceInventionType =
  | "therapeutics"
  | "devices-diagnostics"
  | "software-digital"
  | "research-tools"
  | "broad";

/** Catalog “Location” grouping — one primary location per resource. */
export type ResourceLocation =
  | "washu"
  | "st-louis"
  | "regional"
  | "national";

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

export type ViewMode = "journey" | "resources";

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
  academicReturns: string[];
  facultyCommitment: string;
  companyRequired: boolean;
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
  priority?: ResourcePriority;
  purposes?: ResourcePurpose[];
  /** Catalog lenses — a resource may belong to multiple groups per lens. */
  needs: ResourceNeed[];
  inventionTypes: ResourceInventionType[];
  locations: ResourceLocation[];
}

export interface GuideAnswers {
  asset?: AssetAnswer;
  destinations: DestinationAnswer[];
  motivations: MotivationAnswer[];
  involvement?: InvolvementAnswer;
}

export interface NextMove {
  id: string;
  title: string;
  why: string;
  evidenceRequired: string;
  academicReturn: string;
  resourceId?: string;
  resourceReason?: string;
  notNeeded: string;
  trap?: string;
  contact?: string;
  fromStateId?: string;
  toStateId?: string;
}

export interface Recommendation {
  currentStateId: string;
  routeIds: string[];
  destinationIds: string[];
  summary: string;
  youAreHereLabel: string;
  nextMoves: NextMove[];
}

export interface Transition {
  id: string;
  from: string;
  to: string;
  question: string;
  evidence: string;
  resourceIds: string[];
  modalities?: string[];
}

export interface DestinationPlanItem {
  title: string;
  why: string;
  evidenceRequired: string;
  academicReturn: string;
  resourceId?: string;
  notNeeded: string;
  trap?: string;
}

export interface DestinationPlan {
  destinationId: string;
  oneLiner: string;
  academicReturns: string[];
  facultyCommitment: string;
  companyRequired: boolean;
  defaultRouteId: string;
  checklist: DestinationPlanItem[];
}
