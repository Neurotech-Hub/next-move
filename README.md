# NextMove

A static, client-side navigator for WashU investigators: **how can the innovation community serve your goals?**

**Live site:** [https://neurotech-hub.github.io/next-move/](https://neurotech-hub.github.io/next-move/)  
**Repository:** [https://github.com/Neurotech-Hub/next-move](https://github.com/Neurotech-Hub/next-move)  
**Version:** `0.2.0` · **channel:** beta

NextMove was developed by the Innovation Directorate in the Department of Neuroscience at the Washington University Medical School.

The primary experience starts from **academic destinations** (research impact, funding, distribution, clinical use, licensing, startup). Choosing a goal isolates one path and shows the next 1–3 moves from the research snapshot — evidence required, academic return, recommended program, what you do not need to do, and eligibility traps.

**Resources** is a separate catalog of every program collected in the research report, filterable by source (WashU, Federal, Regional, Investor).

## Versioning

The app is in **beta**. Semver lives in `package.json` and `src/version.ts` (keep them in sync). The about control in the header shows the current channel and version.

| Version | Notes |
| --- | --- |
| 0.2.0 | Beta channel; NextMove branding; mobile header and reset placement |
| 0.1.0 | Initial public GitHub Pages release |

## Develop

```bash
npm install
npm run dev
npm test
```

## Build

```bash
npm run build
npm run preview
```

GitHub Pages builds set `GITHUB_PAGES=true` so Vite uses the `/next-move/` base path. Deployments run from `.github/workflows/deploy.yml` when `main` updates — set the repo Pages source to **GitHub Actions** if it is not already.

## Add content without redesigning the UI

1. Add or edit a node in `src/data/nodes.ts`.
2. Optionally add a transition in `src/data/transitions.ts` or a destination plan in `src/data/destinationPlans.ts`.
3. Connect a named route in `src/data/routes.ts`.
4. Add a resource in `src/data/resources.ts` using the same schema (`priority: "core" | "second"` marks catalog wave).
5. Rebuild.

Do not create one-off components for individual programs.

## Guide Me

Deterministic rules live in `src/logic/recommendations.ts`. Questions start with success and academic return, then current asset and involvement. Known traps (for example, Skandalaris Venture Competition excluding WashU IP) are documented on cards rather than recommended as a default path.
