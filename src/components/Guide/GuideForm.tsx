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
  "What do you have?",
  "What would success look like?",
  "What would make this worth your time?",
  "How involved do you want to be?",
];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

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
      className={`rounded-xl border px-3 py-2 text-left text-sm leading-snug transition ${
        selected
          ? "border-washu/40 bg-washu/8 text-ink"
          : "border-stone-200 bg-white text-ink/80 hover:border-ink/20"
      }`}
    >
      {children}
    </button>
  );
}

export function GuideForm() {
  const { applyGuide, guideAnswers, setGuideAnswers, closeGuide } =
    useNavigator();
  const [step, setStep] = useState(0);
  const answers = guideAnswers;
  const update = (next: GuideAnswers) => setGuideAnswers(next);

  const canAdvance =
    (step === 0 && Boolean(answers.asset)) ||
    (step === 1 && answers.destinations.length > 0) ||
    (step === 2 && answers.motivations.length > 0) ||
    step === 3;

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    applyGuide({ ...answers, involvement: answers.involvement ?? "unsure" });
    setStep(0);
  };

  return (
    <div>
      <div className="flex items-center gap-2" aria-hidden>
        {TITLES.map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index <= step ? "bg-washu" : "bg-stone-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Guide me · {step + 1} of 4
      </p>
      <h2 className="font-display mt-1 text-2xl leading-tight text-ink">
        {TITLES[step]}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {step === 1 || step === 2
          ? "Choose all that apply."
          : "One answer is enough. You can change it later."}
      </p>

      <div className="mt-4 grid gap-2">
        {step === 0 &&
          ASSETS.map((item) => (
            <Choice
              key={item.id}
              selected={answers.asset === item.id}
              onClick={() => update({ ...answers, asset: item.id })}
            >
              {item.label}
            </Choice>
          ))}
        {step === 1 &&
          DESTINATIONS.map((item) => (
            <Choice
              key={item.id}
              selected={answers.destinations.includes(item.id)}
              onClick={() =>
                update({
                  ...answers,
                  destinations: toggle(answers.destinations, item.id),
                })
              }
            >
              {item.label}
            </Choice>
          ))}
        {step === 2 &&
          MOTIVATIONS.map((item) => (
            <Choice
              key={item.id}
              selected={answers.motivations.includes(item.id)}
              onClick={() =>
                update({
                  ...answers,
                  motivations: toggle(answers.motivations, item.id),
                })
              }
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

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={step === 0 ? closeGuide : () => setStep(step - 1)}
          className="text-sm font-medium text-muted hover:text-ink"
        >
          {step === 0 ? "Not now" : "Back"}
        </button>
        <button
          type="button"
          disabled={!canAdvance}
          onClick={next}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-40"
        >
          {step === 3 ? "Show my place" : "Continue"}
        </button>
      </div>
    </div>
  );
}
