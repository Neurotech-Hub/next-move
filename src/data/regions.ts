import type { Region } from "../types/navigator";

export const regions: Region[] = [
  {
    id: "discover",
    title: "Discover",
    subtitle: "Notice a problem and name a possible approach",
    bounds: { x: 20, y: 20, width: 500, height: 940 },
  },
  {
    id: "develop",
    title: "Develop",
    subtitle: "Make it work, then make it work again",
    bounds: { x: 530, y: 20, width: 480, height: 940 },
  },
  {
    id: "de-risk",
    title: "De-risk",
    subtitle: "Learn what outsiders need before they say yes",
    bounds: { x: 1020, y: 20, width: 820, height: 940 },
  },
  {
    id: "translate",
    title: "Translate",
    subtitle: "Choose a vehicle — not a goal",
    bounds: { x: 1850, y: 20, width: 380, height: 940 },
  },
  {
    id: "impact",
    title: "Impact",
    subtitle: "What success could look like",
    bounds: { x: 2240, y: 20, width: 540, height: 940 },
  },
];
