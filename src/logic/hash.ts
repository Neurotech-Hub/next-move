import type { ViewMode } from "../types/navigator";

export interface HashState {
  node: string | null;
  routes: string[];
  resource: string | null;
  route: string | null;
  view: ViewMode;
  goal: string | null;
}

export function parseHash(hash = window.location.hash): HashState {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const routes = (params.get("routes") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    node: params.get("node"),
    routes,
    resource: params.get("resource"),
    route: params.get("route"),
    view: params.get("view") === "resources" ? "resources" : "journey",
    goal: params.get("goal"),
  };
}

export function writeHash(state: HashState): void {
  const params = new URLSearchParams();
  if (state.node) params.set("node", state.node);
  if (state.routes.length) params.set("routes", state.routes.join(","));
  if (state.route) params.set("route", state.route);
  if (state.resource) params.set("resource", state.resource);
  if (state.view === "resources") params.set("view", "resources");
  if (state.goal) params.set("goal", state.goal);
  const next = params.toString();
  const hash = next ? `#${next}` : "";
  if (window.location.hash !== hash) {
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`,
    );
  }
}
