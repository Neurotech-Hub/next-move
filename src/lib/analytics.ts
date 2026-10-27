/**
 * In-app engagement events for NextMove.
 * Pageviews are collected by the hubtracker snippet in index.html.
 * These events drive the feedback prompt and are not sent to a vendor.
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
  FeedbackPrompted: "Feedback prompted",
  FeedbackEmailClicked: "Feedback email clicked",
  FeedbackDismissed: "Feedback dismissed",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/** Actions that count toward the soft feedback prompt. */
const ENGAGEMENT_EVENTS: ReadonlySet<AnalyticsEventName> = new Set([
  AnalyticsEvent.GoalSelected,
  AnalyticsEvent.GuideOpened,
  AnalyticsEvent.GuideCompleted,
  AnalyticsEvent.ResourceOpened,
  AnalyticsEvent.ViewChanged,
  AnalyticsEvent.OutboundClick,
  AnalyticsEvent.FullJourneyToggled,
]);

type Props = Record<string, string | number | boolean | undefined | null>;

type Listener = () => void;

let engagementCount = 0;
const engagementListeners = new Set<Listener>();

function noteEngagement(event: AnalyticsEventName) {
  if (!ENGAGEMENT_EVENTS.has(event)) return;
  engagementCount += 1;
  for (const listener of engagementListeners) listener();
}

export function getEngagementCount(): number {
  return engagementCount;
}

export function subscribeEngagement(listener: Listener): () => void {
  engagementListeners.add(listener);
  return () => {
    engagementListeners.delete(listener);
  };
}

export function track(event: AnalyticsEventName, _props?: Props): void {
  try {
    noteEngagement(event);
  } catch {
    // Analytics must never break the navigator.
  }
}
