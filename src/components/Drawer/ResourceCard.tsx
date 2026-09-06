import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnalyticsEvent, track } from "../../lib/analytics";
import type { Resource } from "../../types/navigator";
import { useNavigator } from "../../state/NavigatorContext";

const SOURCE_LABEL = {
  washu: "WashU",
  federal: "Federal",
  regional: "Regional",
  investor: "Investor",
} as const;

const SOURCE_STYLE = {
  washu: "border-washu/25 bg-washu/10 text-washu",
  federal: "border-federal/25 bg-federal/10 text-federal",
  regional: "border-sage/25 bg-sage/10 text-sage",
  investor: "border-gold/25 bg-gold/10 text-gold",
} as const;

function StatusNote({ resource }: { resource: Resource }) {
  if (resource.status === "closed_verify") {
    return "The current window is closed. Treat this as a likely future milestone and verify before planning around it.";
  }
  if (resource.nextDeadline) {
    return `Noted deadline: ${resource.nextDeadline}. Confirm on the official page.`;
  }
  if (resource.status === "evergreen_program_verify_current_call") {
    return "Ongoing program with cycle-specific calls. Verify current timing before applying.";
  }
  return null;
}

export function ResourceCard({
  resource,
  compact = false,
}: {
  resource: Resource;
  compact?: boolean;
}) {
  const { selectResource, selectedNodeId } = useNavigator();
  const status = StatusNote({ resource });
  const trap = resource.caveats[0];
  const ret = resource.investigatorReturns[0];

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => selectResource(resource.id, selectedNodeId ?? undefined)}
        className="w-full rounded-2xl border border-line/70 bg-raise/50 px-3.5 py-3 text-left transition duration-200 hover:border-ink/25 hover:bg-raise"
      >
        <p className="text-sm font-semibold text-ink">{resource.title}</p>
        {ret && (
          <p className="mt-1 text-xs leading-relaxed text-ink/80">{ret}</p>
        )}
        {trap && (
          <p className="mt-1 text-xs leading-relaxed text-federal/80">{trap}</p>
        )}
      </button>
    );
  }

  return (
    <article className="space-y-5">
      <div>
        <span
          className={`font-mono inline-flex rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] ${SOURCE_STYLE[resource.internality]}`}
        >
          {SOURCE_LABEL[resource.internality]} program
        </span>
        <h3 className="font-display mt-1 text-2xl leading-snug text-ink">
          {resource.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{resource.organization}</p>
      </div>

      {resource.investigatorReturns.length > 0 && (
        <Section title="Benefits of this program">
          <ul className="list-disc space-y-1 pl-4">
            {resource.investigatorReturns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Not suitable for">
        <ul className="list-disc space-y-1 pl-4">
          {resource.notFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="What you need first">{resource.eligibility}</Section>

      {resource.contact && (
        <Section title="Who to contact">{resource.contact}</Section>
      )}

      {resource.caveats.length > 0 && (
        <Section title="Keep in mind">
          {resource.caveats.map((caveat) => (
            <p key={caveat}>{caveat}</p>
          ))}
        </Section>
      )}

      {status && <p className="text-sm font-medium text-ink/80">{status}</p>}

      <details className="rounded-2xl bg-raise/70 px-3.5 py-3">
        <summary className="cursor-pointer text-sm font-medium text-ink">
          More detail
        </summary>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/85">
          <p>{resource.whatYouGet}</p>
          <p>{resource.whyYouMightCare}</p>
          {resource.funding && <p>Funding: {resource.funding}</p>}
          <p className="text-xs text-muted">
            Last verified {resource.lastVerified}. Confirm on the official page.
          </p>
        </div>
      </details>

      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          track(AnalyticsEvent.OutboundClick, {
            resource: resource.id,
            url: resource.url,
          })
        }
        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition duration-200 hover:bg-ink/90"
      >
        Official page
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
        {title}
      </h4>
      <div className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}
