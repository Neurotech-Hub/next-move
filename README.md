# Innovation Navigator

A static, client-side landscape for WashU investigators: **where am I, where could this go, and what should I do next?**

The primary view is a **Journey**: the research report’s readiness states (S0–S9) grouped by stage, with six destinations in a side rail and one fixed panel for Guide Me, results, and details. An **Overview map** (React Flow) is available as a secondary, simplified view. Resources live in the panel, not as an org chart on a canvas.

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

GitHub Pages builds set `GITHUB_PAGES=true` so Vite uses the `/InnovationNavigator/` base path. Enable GitHub Pages with **GitHub Actions** as the source.

## Add content without redesigning the UI

1. Add or edit a node in `src/data/nodes.ts` (region, title, copy, `resourceIds`, position).
2. Connect it in `src/data/edges.ts`.
3. Optionally add it to a named route in `src/data/routes.ts`.
4. Add a resource in `src/data/resources.ts` using the same schema.
5. Rebuild.

Do not create one-off components for individual programs.

## Guide Me

Deterministic rules live in `src/logic/recommendations.ts`. They map answers to a current state and 1–3 routes. Known traps (for example, Skandalaris Venture Competition excluding WashU IP) are documented on cards rather than recommended as a default path.
