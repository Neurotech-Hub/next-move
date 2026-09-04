import type { Region } from "../../types/navigator";

const TONES: Record<string, string> = {
  discover: "from-[#f3ebe0]/90 to-[#efe6d6]/40",
  develop: "from-[#e9efe8]/90 to-[#e3ebe4]/35",
  "de-risk": "from-[#efe8e0]/90 to-[#f2ebe3]/35",
  translate: "from-[#e8e7ef]/80 to-[#eceaf2]/30",
  impact: "from-[#f3e8e4]/85 to-[#f6eee8]/35",
};

export function RegionNode({ data }: { data: Region }) {
  return (
    <div
      className={`flex h-full w-full flex-col rounded-[36px] border border-stone-300/40 bg-linear-to-b ${TONES[data.id]} px-7 pt-8`}
      style={{ width: data.bounds.width, height: data.bounds.height }}
    >
      <p className="font-display text-3xl tracking-tight text-ink/45">
        {data.title}
      </p>
      <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted/80">
        {data.subtitle}
      </p>
    </div>
  );
}
