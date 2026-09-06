# NextMove

A static, client-side navigator for WashU investigators: **how can the innovation community serve your goals?**

**Live site:** [https://neurotech-hub.github.io/next-move/](https://neurotech-hub.github.io/next-move/)  
**Repository:** [https://github.com/Neurotech-Hub/next-move](https://github.com/Neurotech-Hub/next-move)  
**Version:** `0.2.0` · **channel:** beta

NextMove was developed by the Innovation Directorate in the Department of Neuroscience at the Washington University Medical School.

The primary experience starts from **academic destinations** (research impact, funding, distribution, clinical use, licensing, startup). Choosing a goal isolates one path and shows the next 1–3 moves — what to gather, what it can unlock, a program that can help, and what you do not need to do.

**All resources** is a separate catalog of every program, grouped by Location, What I Need, or Invention Type.

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

`npm run dev` and `npm run build` also export the static resource catalog into `public/`.

## Build

```bash
npm run build
npm run preview
```

GitHub Pages builds set `GITHUB_PAGES=true` so Vite uses the `/next-move/` base path. Deployments run from `.github/workflows/deploy.yml` when `main` updates — set the repo Pages source to **GitHub Actions** if it is not already.

## Resource catalog for Botpress (and other tools)

Do not copy `src/data/resources.ts` into a chatbot by hand. The same records are published as static files:

| File | Use |
| --- | --- |
| [`/resources.json`](https://neurotech-hub.github.io/next-move/resources.json) | Full catalog plus modality and context **gating** rules. Fetch from Execute Code; filter rows. |
| [`/resources.csv`](https://neurotech-hub.github.io/next-move/resources.csv) | One row per program for a Botpress Table. Array fields use `\|`. |
| `/kb/{id}.md` | One markdown page per program for a Knowledge Base. Example: [`/kb/gap-fund.md`](https://neurotech-hub.github.io/next-move/kb/gap-fund.md) |

Regenerate without a full app build:

```bash
npm run export:resources
```

Gating lives in `src/data/resourceGating.ts`. Specialized cores (for example ECRC, Siteman, Trial-CARE, mHealth) must not be recommended from stage match alone — the JSON `gating` object is the source of those rules for a bot.

## Add content without redesigning the UI

1. Add or edit a node in `src/data/nodes.ts`.
2. Optionally add a transition in `src/data/transitions.ts` or a destination plan in `src/data/destinationPlans.ts`.
3. Connect a named route in `src/data/routes.ts`.
4. Add a resource in `src/data/resources.ts` using the same schema (`priority: "core" | "second"` marks catalog wave).
5. Rebuild (`npm run build` or `npm run export:resources`).

Do not create one-off components for individual programs.

## Guide Me

Deterministic rules live in `src/logic/recommendations.ts` and `src/logic/nextMoves.ts`. Questions start with success and academic return, then current asset and involvement. Program eligibility belongs with the suggested program, not as a note above it.

## Analytics (Plausible)

The site loads Plausible from `index.html`. Custom events are fired from `src/lib/analytics.ts`. Use **[`PLAUSIBLE_EVENTS.md`](./PLAUSIBLE_EVENTS.md)** as the checklist when adding custom-event goals in the Plausible dashboard.
