import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { nodeById, routes } from "../data";
import { parseHash, writeHash } from "../logic/hash";
import {
  emptyGuideAnswers,
  isGuideComplete,
  recommend,
} from "../logic/recommendations";
import type {
  GuideAnswers,
  NodeEmphasis,
  Recommendation,
  Route,
  ViewMode,
} from "../types/navigator";

type EdgeEmphasis = "strong" | "medium" | "dim" | "default";

interface NavigatorContextValue {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  selectedNodeId: string | null;
  selectedResourceId: string | null;
  recommendation: Recommendation | null;
  activeRoute: Route | null;
  suggestedRoutes: Route[];
  guideOpen: boolean;
  guideAnswers: GuideAnswers;
  searchQuery: string;
  highlightedNodeIds: Set<string>;
  highlightedEdgeIds: Set<string>;
  primaryNodeIds: Set<string>;
  primaryEdgeIds: Set<string>;
  selectNode: (id: string | null) => void;
  selectResource: (id: string | null, nodeId?: string) => void;
  setActiveRouteId: (id: string | null) => void;
  openGuide: () => void;
  closeGuide: () => void;
  setGuideAnswers: (answers: GuideAnswers) => void;
  applyGuide: (answers: GuideAnswers) => void;
  reset: () => void;
  setSearchQuery: (query: string) => void;
  nodeEmphasis: (nodeId: string) => NodeEmphasis;
  edgeEmphasis: (edgeId: string) => EdgeEmphasis;
}

const NavigatorContext = createContext<NavigatorContextValue | null>(null);

function recommendationFromRoutes(
  routeIds: string[],
  currentStateId: string,
): Recommendation {
  const matched = routes.filter((route) => routeIds.includes(route.id));
  const destinationIds = [
    ...new Set(matched.flatMap((route) => route.destinationIds)),
  ];
  const here = nodeById[currentStateId];
  return {
    currentStateId,
    routeIds: matched.map((route) => route.id),
    destinationIds,
    summary: "A shared pathway is highlighted.",
    youAreHereLabel: here?.title ?? "This point on the journey",
  };
}

export function NavigatorProvider({ children }: { children: ReactNode }) {
  const initial = parseHash();
  const [view, setView] = useState<ViewMode>(initial.view);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    initial.node,
  );
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    initial.resource,
  );
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    () =>
      initial.routes.length
        ? recommendationFromRoutes(initial.routes, initial.node ?? "s1")
        : null,
  );
  const [activeRouteId, setActiveRouteId] = useState<string | null>(
    initial.route,
  );
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideAnswers, setGuideAnswers] = useState<GuideAnswers>(
    emptyGuideAnswers,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedRoutes = useMemo(
    () =>
      recommendation
        ? recommendation.routeIds
            .map((id) => routes.find((route) => route.id === id))
            .filter((route): route is Route => Boolean(route))
        : [],
    [recommendation],
  );

  const activeRoute = useMemo(() => {
    if (!recommendation) return null;
    const fromId = suggestedRoutes.find((route) => route.id === activeRouteId);
    return fromId ?? suggestedRoutes[0] ?? null;
  }, [activeRouteId, recommendation, suggestedRoutes]);

  const highlightedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    if (!recommendation) return ids;
    ids.add(recommendation.currentStateId);
    recommendation.destinationIds.forEach((id) => ids.add(id));
    suggestedRoutes.forEach((route) => route.nodeIds.forEach((id) => ids.add(id)));
    return ids;
  }, [recommendation, suggestedRoutes]);

  const highlightedEdgeIds = useMemo(() => {
    const ids = new Set<string>();
    suggestedRoutes.forEach((route) => route.edgeIds.forEach((id) => ids.add(id)));
    return ids;
  }, [suggestedRoutes]);

  const primaryNodeIds = useMemo(
    () => new Set(activeRoute?.nodeIds ?? []),
    [activeRoute],
  );
  const primaryEdgeIds = useMemo(
    () => new Set(activeRoute?.edgeIds ?? []),
    [activeRoute],
  );

  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
    setSelectedResourceId(null);
    if (id) setGuideOpen(false);
  }, []);

  const selectResource = useCallback((id: string | null, nodeId?: string) => {
    setSelectedResourceId(id);
    if (nodeId) setSelectedNodeId(nodeId);
    if (id) setGuideOpen(false);
  }, []);

  const openGuide = useCallback(() => {
    setGuideOpen(true);
    setSelectedNodeId(null);
    setSelectedResourceId(null);
  }, []);

  const closeGuide = useCallback(() => setGuideOpen(false), []);

  const applyGuide = useCallback((answers: GuideAnswers) => {
    if (!isGuideComplete(answers)) return;
    const next = recommend(answers);
    setRecommendation(next);
    setActiveRouteId(next.routeIds[0] ?? null);
    setSelectedNodeId(null);
    setSelectedResourceId(null);
    setGuideOpen(false);
    setGuideAnswers(answers);
  }, []);

  const reset = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedResourceId(null);
    setRecommendation(null);
    setActiveRouteId(null);
    setGuideOpen(false);
    setGuideAnswers(emptyGuideAnswers());
    setSearchQuery("");
  }, []);

  const nodeEmphasis = useCallback(
    (nodeId: string): NodeEmphasis => {
      if (!recommendation) return "none";
      if (nodeId === recommendation.currentStateId) return "current";
      if (primaryNodeIds.has(nodeId)) return "primary";
      if (highlightedNodeIds.has(nodeId)) return "secondary";
      return "muted";
    },
    [highlightedNodeIds, primaryNodeIds, recommendation],
  );

  const edgeEmphasis = useCallback(
    (edgeId: string): EdgeEmphasis => {
      if (!recommendation) return "default";
      if (primaryEdgeIds.has(edgeId)) return "strong";
      if (highlightedEdgeIds.has(edgeId)) return "medium";
      return "dim";
    },
    [highlightedEdgeIds, primaryEdgeIds, recommendation],
  );

  useEffect(() => {
    writeHash({
      node: selectedNodeId,
      routes: recommendation?.routeIds ?? [],
      route: activeRoute?.id ?? null,
      resource: selectedResourceId,
      view,
    });
  }, [activeRoute, recommendation, selectedNodeId, selectedResourceId, view]);

  const value = useMemo<NavigatorContextValue>(
    () => ({
      view,
      setView,
      selectedNodeId,
      selectedResourceId,
      recommendation,
      activeRoute,
      suggestedRoutes,
      guideOpen,
      guideAnswers,
      searchQuery,
      highlightedNodeIds,
      highlightedEdgeIds,
      primaryNodeIds,
      primaryEdgeIds,
      selectNode,
      selectResource,
      setActiveRouteId,
      openGuide,
      closeGuide,
      setGuideAnswers,
      applyGuide,
      reset,
      setSearchQuery,
      nodeEmphasis,
      edgeEmphasis,
    }),
    [
      activeRoute,
      applyGuide,
      closeGuide,
      edgeEmphasis,
      guideAnswers,
      guideOpen,
      highlightedEdgeIds,
      highlightedNodeIds,
      nodeEmphasis,
      openGuide,
      primaryEdgeIds,
      primaryNodeIds,
      recommendation,
      reset,
      searchQuery,
      selectNode,
      selectResource,
      selectedNodeId,
      selectedResourceId,
      suggestedRoutes,
      view,
    ],
  );

  return (
    <NavigatorContext.Provider value={value}>
      {children}
    </NavigatorContext.Provider>
  );
}

export function useNavigator() {
  const value = useContext(NavigatorContext);
  if (!value) {
    throw new Error("useNavigator must be used within NavigatorProvider");
  }
  return value;
}
