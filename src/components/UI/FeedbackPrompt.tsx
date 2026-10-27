import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { AnalyticsEvent, getEngagementCount, subscribeEngagement, track } from "../../lib/analytics";
import { isBotpressOpen, subscribeBotpressOpen } from "../../lib/botpress";
import { useNavigator } from "../../state/NavigatorContext";

const STORAGE_KEY = "nm-feedback-prompt-at";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;
const ENGAGEMENT_THRESHOLD = 3;
const IDLE_MS = 100_000;
const SHOW_DELAY_MS = 700;

const EMAIL = "gaidica@wustl.edu";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "NextMove feedback",
)}&body=${encodeURIComponent(
  "Hi Matt — a quick note about NextMove:\n\n",
)}`;

const PHOTO = `${import.meta.env.BASE_URL}gaidica-square.jpg`;

function cooldownAllowsPrompt(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const then = Number(raw);
    if (!Number.isFinite(then)) return true;
    return Date.now() - then >= COOLDOWN_MS;
  } catch {
    return true;
  }
}

function markPromptHandled() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore quota / private mode.
  }
}

export function FeedbackPrompt() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const { guideOpen, selectedResourceId } = useNavigator();
  const [engagement, setEngagement] = useState(getEngagementCount);
  const [timedReady, setTimedReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissedThisVisit, setDismissedThisVisit] = useState(false);

  const blocked = guideOpen || Boolean(selectedResourceId) || chatOpen;
  const engagedEnough = engagement >= ENGAGEMENT_THRESHOLD || timedReady;
  const eligible =
    !dismissedThisVisit && !visible && cooldownAllowsPrompt() && engagedEnough;

  useEffect(() => subscribeEngagement(() => setEngagement(getEngagementCount())), []);

  useEffect(() => {
    setChatOpen(isBotpressOpen());
    return subscribeBotpressOpen(() => setChatOpen(isBotpressOpen()));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setTimedReady(true), IDLE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!eligible || blocked) return;
    const timer = window.setTimeout(() => {
      if (isBotpressOpen()) return;
      setVisible(true);
      track(AnalyticsEvent.FeedbackPrompted);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [eligible, blocked]);

  // Prefer Botpress / sheets over this card — tuck it away until clear.
  useEffect(() => {
    if (visible && blocked) setVisible(false);
  }, [visible, blocked]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    setDismissedThisVisit(true);
    markPromptHandled();
    track(AnalyticsEvent.FeedbackDismissed);
  };

  const email = () => {
    markPromptHandled();
    setDismissedThisVisit(true);
    setVisible(false);
    track(AnalyticsEvent.FeedbackEmailClicked);
  };

  return (
    <div className="feedback-prompt fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <div
        aria-hidden="true"
        className="feedback-prompt__scrim absolute inset-0 bg-paper/55 backdrop-blur-md"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="feedback-prompt__panel relative z-10 w-full max-w-[26rem] rounded-2xl border border-line/80 bg-card px-5 pb-5 pt-4 outline-none sm:px-6 sm:pb-6 sm:pt-5"
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted transition hover:bg-raise hover:text-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-4 pr-7">
          <img
            src={PHOTO}
            alt=""
            width={72}
            height={72}
            className="size-[4.25rem] shrink-0 rounded-full object-cover ring-1 ring-line sm:size-[4.5rem]"
          />
          <p
            id={titleId}
            className="min-w-0 flex-1 font-display text-[18px] leading-snug text-ink sm:text-[19px]"
          >
            Are you finding what you need?
          </p>
        </div>

        <p className="mt-4 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
          I built NextMove to help inventors start from their incentives and find
          a path forward. If something’s missing, I’d welcome your note.
        </p>

        <div className="mt-5 flex justify-center">
          <a
            href={MAILTO}
            onClick={email}
            className="inline-flex min-h-10 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-washu"
          >
            Email me
          </a>
        </div>

        <p className="mt-5 border-t border-line/70 pt-3.5 text-center text-[11.5px] leading-snug text-muted">
          <span className="font-medium text-ink/80">Matt Gaidica, PhD</span>
          <br />
          Director of Neuroscience Innovation &amp;{" "}
          <a
            href="https://neurotechhub.wustl.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/70 underline decoration-line underline-offset-2 transition hover:text-washu"
          >
            Neurotech Hub
          </a>
          <br />
          Washington University School of Medicine
        </p>
      </div>
    </div>
  );
}
