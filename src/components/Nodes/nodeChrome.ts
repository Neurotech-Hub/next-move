import type { VisualState } from "../../types/navigator";

export function nodeChrome(state: VisualState): string {
  const base =
    "rounded-2xl border bg-card text-left shadow-[0_8px_24px_rgba(28,25,23,0.06)] transition-all duration-200 ease-out-soft";

  switch (state) {
    case "current":
      return `${base} border-washu ring-2 ring-washu/30 shadow-[0_10px_28px_rgba(165,20,23,0.16)]`;
    case "recommended":
      return `${base} border-gold/70 ring-2 ring-gold/25 shadow-[0_10px_24px_rgba(184,137,61,0.14)]`;
    case "selected":
      return `${base} border-ink/25 ring-2 ring-ink/15`;
    case "dimmed":
      return `${base} border-stone-200/80 opacity-30`;
    default:
      return `${base} border-stone-200/90 hover:border-ink/20 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(28,25,23,0.1)]`;
  }
}

export function nodeLabel(state: VisualState, kind: string): string | null {
  if (state === "current") return "You are here";
  if (state === "recommended") return "On a suggested route";
  if (kind === "destination") return "Destination";
  if (kind === "milestone") return "Next step";
  return null;
}
