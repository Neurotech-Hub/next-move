import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Resource } from "../../types/navigator";
import { useNavigator } from "../../state/NavigatorContext";

function StatusNote({ resource }: { resource: Resource }) {
  if (resource.status === "closed_verify") {
    return "The current application window is closed. Treat this as a likely future milestone and verify before planning around it.";
  }
  if (resource.nextDeadline) {
    return `Current noted deadline: ${resource.nextDeadline}. Confirm on the official page.`;
  }
  if (resource.status === "evergreen_program_verify_current_call") {
    return "This is an ongoing program with cycle-specific calls. Verify current timing before applying.";
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

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => selectResource(resource.id, selectedNodeId ?? undefined)}
        className="w-full rounded-2xl border border-stone-200 bg-white px-3.5 py-3 text-left transition hover:border-ink/20"
      >
        <p className="text-sm font-semibold text-ink">{resource.title}</p>
        <p className="mt-0.5 text-xs text-muted">{resource.organization}</p>
      </button>
    );
  }

  return (
    <article className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Program / resource
        </p>
        <h3 className="font-display mt-1 text-2xl leading-snug text-ink">
          {resource.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{resource.organization}</p>
      </div>

      <Section title="Useful when">
        <ul className="list-disc space-y-1 pl-4">
          {resource.usefulWhen.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="What you get">{resource.whatYouGet}</Section>
      <Section title="Why you might care">{resource.whyYouMightCare}</Section>

      <Section title="You do NOT necessarily need to…">
        <ul className="list-disc space-y-1 pl-4">
          {resource.notFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="What you need first">{resource.eligibility}</Section>

      {resource.investigatorReturns.length > 0 && (
        <Section title="Possible academic returns">
          <ul className="list-disc space-y-1 pl-4">
            {resource.investigatorReturns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Details">
        {resource.funding && <p>Funding: {resource.funding}</p>}
        {resource.contact && <p>Contact: {resource.contact}</p>}
        <p>
          Company required: {resource.companyRequired ? "Yes" : "No"}. Disclosure
          typically needed: {resource.requiresDisclosure ? "Yes" : "No"}.
        </p>
        {resource.caveats.map((caveat) => (
          <p key={caveat}>{caveat}</p>
        ))}
        {status && <p className="font-medium text-ink/80">{status}</p>}
        <p className="text-xs text-muted">
          Last verified {resource.lastVerified}. Program details change — use the
          official link.
        </p>
      </Section>

      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
      >
        Learn more
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
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {title}
      </h4>
      <div className="mt-1.5 space-y-1.5 text-sm leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}
