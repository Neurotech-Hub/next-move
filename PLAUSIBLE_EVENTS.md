# Plausible custom events — NextMove checklist

Use this file while configuring **Site settings → Goals** in Plausible.
Event names are **case-sensitive** and must match the app exactly
(`src/lib/analytics.ts`).

Script: already in `index.html` (`pa-hpeliIhWbsKubytN7f_NL.js`).

For each row: **Add goal → Custom event → paste Event name**.

| Done | Event name | When it fires | Props (if your plan supports them) |
| --- | --- | --- | --- |
| ☐ | `Goal selected` | User picks a destination from Goals (or selects a destination node) | `goal` — e.g. `dest-startup` |
| ☐ | `Guide opened` | User opens Guide me | — |
| ☐ | `Guide completed` | User finishes Guide me and gets a recommendation | `goal`, `route` |
| ☐ | `Resource opened` | User opens a program detail (next steps, catalog, or search) | `resource`, optional `node` |
| ☐ | `View changed` | User switches Journey ↔ All resources | `view` — `journey` or `resources` |
| ☐ | `Navigator reset` | User hits Reset / returns home | — |
| ☐ | `Full journey toggled` | User toggles full roadmap vs focused path | `on` — `true` / `false` |
| ☐ | `Outbound click` | User clicks **Official page** on a program | `resource`, `url` |

## Suggested order

1. Add all eight goals above (even before much traffic).
2. Click through the live site once: pick a goal → open a program → Official page → Guide me → complete → All resources → Reset.
3. Confirm each goal increments in Plausible (may take a minute).
4. If props appear on your plan, filter by `goal` / `resource` for which paths and programs get traction.

## Out of scope (for now)

- Guide answer-level detail (asset, motivation, etc.)
- Catalog “View by” lens (Location / What I Need / Invention Type)
- Search query text
- Botpress chat opens / messages (use Botpress analytics separately)
- Fake SPA pageviews per hash — custom events above cover the funnel

## Code touchpoints

| Event | Fired from |
| --- | --- |
| Goal selected | `NavigatorContext` (`focusDestination`, destination `selectNode`) |
| Guide opened / completed | `NavigatorContext` (`openGuide`, `applyGuide`) |
| Resource opened | `NavigatorContext` (`selectResource`) |
| View changed | `NavigatorContext` (`setView`) |
| Navigator reset | `NavigatorContext` (`reset`) |
| Full journey toggled | `NavigatorContext` (`setShowFullJourney`) |
| Outbound click | `ResourceCard` (Official page link) |
