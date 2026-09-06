/**
 * Plausible custom events for NextMove.
 * Event names must match goals created in the Plausible dashboard.
 * Checklist for that setup: /PLAUSIBLE_EVENTS.md
 */

export const AnalyticsEvent = {
  GoalSelected: "Goal selected",
  GuideOpened: "Guide opened",
  GuideCompleted: "Guide completed",
  ResourceOpened: "Resource opened",
  ViewChanged: "View changed",
  NavigatorReset: "Navigator reset",
  FullJourneyToggled: "Full journey toggled",
  OutboundClick: "Outbound click",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

type Props = Record<string, string | number | boolean | undefined | null>;

type PlausibleFn = (
  event: string,
  options?: { props?: Record<string, string | number | boolean> },
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

function cleanProps(
  props?: Props,
): Record<string, string | number | boolean> | undefined {
  if (!props) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === "") continue;
    out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

export function track(event: AnalyticsEventName, props?: Props): void {
  const cleaned = cleanProps(props);
  try {
    window.plausible?.(event, cleaned ? { props: cleaned } : undefined);
  } catch {
    // Analytics must never break the navigator.
  }
}
