/**
 * Vehicle-choice milestone: a decision that may need resolving, not a progress
 * state. Full journey / unresolved goals show it; goals that already answer
 * “how it reaches users” omit it from goal-scoped PathView.
 */
export const VEHICLE_BRIDGE_ID = "ms-license-vs-startup";

const destinationsThatResolveVehicle = new Set([
  "dest-startup",
  "dest-licensing",
]);

/** False when the focused goal already answers how the work reaches users. */
export function shouldShowVehicleBridge(
  focusedDestinationId?: string | null,
): boolean {
  return (
    !focusedDestinationId ||
    !destinationsThatResolveVehicle.has(focusedDestinationId)
  );
}
