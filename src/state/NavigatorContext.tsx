import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { destinationPlanById, nodeById, routes } from "../data";
import { parseHash, writeHash } from "../logic/hash";
import {
  nextMovesForDestination,
  nextMovesForRoute,
  routeForDestination,
  summarizeRoute,
} from "../logic/nextMoves";
import {
  emptyGuideAnswers,
  isGuideComplete,
  recommend,
} from "../logic/recommendations";
import type {
  GuideAnswers,
  NextMove,
  Recommendation,
  Route,
  ViewMode,
} from "../types/navigator";

interface NavigatorContextValue {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  selectedNodeId: string | null;
  selectedResourceId: string | null;
  focusedDestinationId: string | null;
  recommendation: Recommendation | null;
  activeRoute: Route | null;
  suggestedRoutes: Route[];
  nextMoves: NextMove[];
  showFullJourney: boolean;
  setShowFullJourney: (value: boolean) => void;
  guideOpen: boolean;
  guideAnswers: GuideAnswers;
  searchQuery: string;
  focusDestination: (id: string | null) => void;
  selectNode: (id: string | null) => void;
  selectResource: (id: string | null, nodeId?: string) => void;
  setActiveRouteId: (id: string | null) => void;
  openGuide: () => void;
  closeGuide: () => void;
  setGuideAnswers: (answers: GuideAnswers) => void;
  applyGuide: (answers: GuideAnswers) => void;
  reset: () => void;
  setSearchQuery: (query: string) => void;
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
  const primary = matched[0];
  return {
    currentStateId,
    routeIds: matched.map((route) => route.id),
    destinationIds,
    summary: primary
      ? summarizeRoute(primary)
      : "Here is a path matched to that goal.",
    youAreHereLabel: here?.title ?? "This point on the path",
    nextMoves: primary
      ? nextMovesForRoute(currentStateId, primary)
      : [],
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
  const [focusedDestinationId, setFocusedDestinationId] = useState<
    string | null
  >(initial.goal);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    () =>
      initial.routes.length
        ? recommendationFromRoutes(initial.routes, initial.node ?? "s1")
        : null,
  );
  const [activeRouteId, setActiveRouteId] = useState<string | null>(
    initial.route ??
      (initial.goal
        ? destinationPlanById[initial.goal]?.defaultRouteId ?? null
        : null),
  );
  const [showFullJourney, setShowFullJourney] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideAnswers, setGuideAnswers] = useState<GuideAnswers>(
    emptyGuideAnswers,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const suggestedRoutes = useMemo(() => {
    if (recommendation) {
      return recommendation.routeIds
        .map((id) => routes.find((route) => route.id === id))
        .filter((route): route is Route => Boolean(route));
    }
    if (focusedDestinationId) {
      const route = routeForDestination(focusedDestinationId, guideAnswers);
      return route ? [route] : [];
    }
    return [];
  }, [focusedDestinationId, guideAnswers, recommendation]);

  const activeRoute = useMemo(() => {
    const fromId = suggestedRoutes.find((route) => route.id === activeRouteId);
    if (fromId) return fromId;
    if (focusedDestinationId) {
      return (
        routeForDestination(focusedDestinationId, guideAnswers) ??
        suggestedRoutes[0] ??
        null
      );
    }
    return suggestedRoutes[0] ?? null;
  }, [activeRouteId, focusedDestinationId, guideAnswers, suggestedRoutes]);

  const nextMoves = useMemo(() => {
    if (recommendation && activeRoute) {
      return nextMovesForRoute(
        recommendation.currentStateId,
        activeRoute,
        guideAnswers,
        focusedDestinationId,
      );
    }
    if (focusedDestinationId) {
      return nextMovesForDestination(
        focusedDestinationId,
        guideAnswers,
        recommendation?.currentStateId,
      );
    }
    return [];
  }, [activeRoute, focusedDestinationId, guideAnswers, recommendation]);

  const focusDestination = useCallback(
    (id: string | null) => {
      setFocusedDestinationId(id);
      setSelectedResourceId(null);
      setGuideOpen(false);
      setRecommendation(null);
      if (id) {
        const route = routeForDestination(id, guideAnswers);
        setActiveRouteId(route?.id ?? null);
        setSelectedNodeId(id);
        setShowFullJourney(false);
      } else {
        setSelectedNodeId(null);
        setActiveRouteId(null);
      }
    },
    [guideAnswers],
  );

  const selectNode = useCallback(
    (id: string | null) => {
      setSelectedNodeId(id);
      setSelectedResourceId(null);
      setGuideOpen(false);
      if (id?.startsWith("dest-")) {
        setFocusedDestinationId(id);
        const route = routeForDestination(id, guideAnswers);
        setActiveRouteId(route?.id ?? null);
        setShowFullJourney(false);
      }
    },
    [guideAnswers],
  );

  const selectResource = useCallback((id: string | null, nodeId?: string) => {
    setSelectedResourceId(id);
    if (nodeId) setSelectedNodeId(nodeId);
    if (id) setGuideOpen(false);
  }, []);

  const openGuide = useCallback(() => {
    setGuideOpen(true);
    setView("journey");
  }, []);

  const closeGuide = useCallback(() => setGuideOpen(false), []);

  const applyGuide = useCallback((answers: GuideAnswers) => {
    if (!isGuideComplete(answers)) return;
    const next = recommend(answers);
    const primaryDestination = next.destinationIds[0] ?? null;
    setRecommendation(next);
    setActiveRouteId(next.routeIds[0] ?? null);
    setFocusedDestinationId(primaryDestination);
    setSelectedNodeId(primaryDestination);
    setSelectedResourceId(null);
    setGuideOpen(false);
    setGuideAnswers(answers);
    setShowFullJourney(false);
    setView("journey");
  }, []);

  const reset = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedResourceId(null);
    setFocusedDestinationId(null);
    setRecommendation(null);
    setActiveRouteId(null);
    setGuideOpen(false);
    setGuideAnswers(emptyGuideAnswers());
    setSearchQuery("");
    setShowFullJourney(false);
    setView("journey");
  }, []);

  useEffect(() => {
    writeHash({
      node: selectedNodeId,
      routes: recommendation?.routeIds ?? [],
      route: activeRoute?.id ?? null,
      resource: selectedResourceId,
      view,
      goal: focusedDestinationId,
    });
  }, [
    activeRoute,
    focusedDestinationId,
    recommendation,
    selectedNodeId,
    selectedResourceId,
    view,
  ]);

  const value = useMemo<NavigatorContextValue>(
    () => ({
      view,
      setView,
      selectedNodeId,
      selectedResourceId,
      focusedDestinationId,
      recommendation,
      activeRoute,
      suggestedRoutes,
      nextMoves,
      showFullJourney,
      setShowFullJourney,
      guideOpen,
      guideAnswers,
      searchQuery,
      focusDestination,
      selectNode,
      selectResource,
      setActiveRouteId,
      openGuide,
      closeGuide,
      setGuideAnswers,
      applyGuide,
      reset,
      setSearchQuery,
    }),
    [
      activeRoute,
      applyGuide,
      closeGuide,
      focusDestination,
      focusedDestinationId,
      guideAnswers,
      guideOpen,
      nextMoves,
      openGuide,
      recommendation,
      reset,
      searchQuery,
      selectNode,
      selectResource,
      selectedNodeId,
      selectedResourceId,
      showFullJourney,
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
