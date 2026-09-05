import { useState } from "react";
import { useNavigator } from "../../state/NavigatorContext";
import type {
  AssetAnswer,
  DestinationAnswer,
  GuideAnswers,
  InvolvementAnswer,
  MotivationAnswer,
} from "../../types/navigator";

const ASSETS: { id: AssetAnswer; label: string }[] = [
  { id: "observation", label: "An observation or problem" },
  { id: "idea", label: "An idea or concept" },
  { id: "evidence", label: "Experimental evidence" },
  { id: "prototype", label: "A working prototype" },
  { id: "software", label: "Software or an algorithm" },
  { id: "therapeutic", label: "A therapeutic candidate" },
  { id: "device", label: "A device or diagnostic" },
  { id: "research-tool", label: "A research tool or reagent" },
  { id: "disclosed", label: "An invention already disclosed" },
  { id: "unsure", label: "I'm not sure" },
];

const DESTINATIONS: { id: DestinationAnswer; label: string }[] = [
  { id: "research-impact", label: "Strengthen my research" },
  { id: "funding", label: "Generate new funding" },
  { id: "distribution", label: "Get this used by other scientists" },
  { id: "licensing", label: "License it without running a company" },
  { id: "clinical-use", label: "Reach patients" },
  { id: "startup", label: "Build a company" },
  { id: "unsure", label: "I'm not sure yet" },
];

const MOTIVATIONS: { id: MotivationAnswer; label: string }[] = [
  { id: "papers", label: "Papers and new science" },
  { id: "grants", label: "Grants and people in the lab" },
  { id: "trainees", label: "Trainee opportunities" },
  { id: "collaborators", label: "New collaborations" },
  { id: "reach", label: "Broader scientific reach" },
  { id: "patients", label: "Patient impact" },
  { id: "financial", label: "Licensing or equity upside" },
  { id: "low-time", label: "Keep my time focused on research" },
];

const INVOLVEMENT: { id: InvolvementAnswer; label: string }[] = [
  { id: "research-focus", label: "Keep my focus primarily on research" },
  { id: "advise", label: "Advise or collaborate, but don't run it" },
  { id: "open", label: "Open to becoming more involved" },
  { id: "founder", label: "Interested in founding or leading something" },
  { id: "unsure", label: "Not sure" },
];

const TITLES = [
  "What would success look like?",
  "What would make this worth your time?",
  "What do you have?",
  "How involved do you want to be?",
];

const EFFECTS = [
  "Sets the goal at the end of your path.",
  "Prioritizes routes, academic returns, and programs.",
  "Places your “You are here” marker and skips earlier stages.",
  "Favors programs that fit the role you want to play.",
];

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border px-3 py-2 text-left text-sm leading-snug transition duration-200 ${
        selected
          ? "border-washu/45 bg-washu/12 text-ink"
          : "border-line bg-raise/50 text-ink/80 hover:border-ink/25 hover:bg-raise"
      }`}
    >
      {children}
    </button>
  );
}

export function GuideForm() {
  const { applyGuide, guideAnswers, setGuideAnswers } = useNavigator();
  const [step, setStep] = useState(0);
  const answers = guideAnswers;
  const update = (next: GuideAnswers) => setGuideAnswers(next);

  const canAdvance =
    (step === 0 && answers.destinations.length > 0) ||
    (step === 1 && answers.motivations.length > 0) ||
    (step === 2 && Boolean(answers.asset)) ||
    (step === 3 && Boolean(answers.involvement));

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    if (!answers.involvement) return;
    applyGuide(answers);
    setStep(0);
  };

  return (
    <div>
      <div className="flex items-center gap-2" aria-hidden>
        {TITLES.map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              index <= step ? "bg-washu" : "bg-line"
            }`}
          />
        ))}
      </div>
      <p className="font-mono mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        Guide me · {step + 1} of 4
      </p>
      <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
        {TITLES[step]}
      </h2>
      <p className="mt-2 text-sm text-muted">Select the most relevant.</p>
      <div className="mt-3 rounded-xl border border-washu/20 bg-washu/8 px-3 py-2">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-washu">
          How this tailors your results
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-ink/75">
          {EFFECTS[step]}
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        {step === 0 &&
          DESTINATIONS.map((item) => (
            <Choice
              key={item.id}
              selected={answers.destinations[0] === item.id}
              onClick={() =>
                update({
                  ...answers,
                  destinations: [item.id],
                })
              }
            >
              {item.label}
            </Choice>
          ))}
        {step === 1 &&
          MOTIVATIONS.map((item) => (
            <Choice
              key={item.id}
              selected={answers.motivations[0] === item.id}
              onClick={() =>
                update({
                  ...answers,
                  motivations: [item.id],
                })
              }
            >
              {item.label}
            </Choice>
          ))}
        {step === 2 &&
          ASSETS.map((item) => (
            <Choice
              key={item.id}
              selected={answers.asset === item.id}
              onClick={() => update({ ...answers, asset: item.id })}
            >
              {item.label}
            </Choice>
          ))}
        {step === 3 &&
          INVOLVEMENT.map((item) => (
            <Choice
              key={item.id}
              selected={answers.involvement === item.id}
              onClick={() => update({ ...answers, involvement: item.id })}
            >
              {item.label}
            </Choice>
          ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium text-muted hover:text-ink"
            >
              Back
            </button>
          )}
        </div>
        <button
          type="button"
          disabled={!canAdvance}
          onClick={next}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-40"
        >
          {step === 3 ? "Show my path" : "Continue"}
        </button>
      </div>
    </div>
  );
}
