# Innovation Navigator

A static, client-side navigator for WashU investigators: **how can the innovation community serve your goals?**

**Live site:** [https://neurotech-hub.github.io/InnovationNavigator/](https://neurotech-hub.github.io/InnovationNavigator/)  
**Repository:** [https://github.com/Neurotech-Hub/InnovationNavigator](https://github.com/Neurotech-Hub/InnovationNavigator)

The primary experience starts from **academic destinations** (research impact, funding, distribution, clinical use, licensing, startup). Choosing a goal isolates one path and shows the next 1–3 moves from the research snapshot — evidence required, academic return, recommended program, what you do not need to do, and eligibility traps.

**View all resources** is a separate catalog of every program collected in the research report, filterable by source and purpose.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

GitHub Pages builds set `GITHUB_PAGES=true` so Vite uses the `/InnovationNavigator/` base path. Deployments run from `.github/workflows/deploy.yml` when `main` updates — set the repo Pages source to **GitHub Actions** if it is not already.

## Add content without redesigning the UI

1. Add or edit a node in `src/data/nodes.ts`.
2. Optionally add a transition in `src/data/transitions.ts` or a destination plan in `src/data/destinationPlans.ts`.
3. Connect a named route in `src/data/routes.ts`.
4. Add a resource in `src/data/resources.ts` using the same schema (`priority: "core" | "second"` marks catalog wave).
5. Rebuild.

Do not create one-off components for individual programs.

## Guide Me

Deterministic rules live in `src/logic/recommendations.ts`. Questions start with success and academic return, then current asset and involvement. Known traps (for example, Skandalaris Venture Competition excluding WashU IP) are documented on cards rather than recommended as a default path.
