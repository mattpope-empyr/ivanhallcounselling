"use client";

import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * A gentle, NON-diagnostic "where might I start?" guide. It never implies a
 * condition or outcome — it simply reflects the visitor's preferences back and
 * suggests a calm next step. Fully keyboard operable; panel fade respects
 * prefers-reduced-motion (see globals.css .hh-fade).
 */

type Format = "in-person" | "phone" | "video" | "unsure";
type FirstStep = "chat" | "book" | "learn";

const Q1 = [
  { id: "specific", label: "Something specific is weighing on me" },
  { id: "notmyself", label: "I don't quite feel like myself lately" },
  { id: "unsure", label: "I'm not sure — I just sense something needs to change" },
] as const;

const Q2: { id: Format; label: string }[] = [
  { id: "in-person", label: "In person, in Winchester" },
  { id: "phone", label: "By phone" },
  { id: "video", label: "By video" },
  { id: "unsure", label: "I'm not sure yet" },
];

const Q3: { id: FirstStep; label: string }[] = [
  { id: "chat", label: "A free, no-pressure chat first" },
  { id: "book", label: "I'd like to book a session" },
  { id: "learn", label: "Just to learn a little more for now" },
];

const formatLine: Record<Format, string> = {
  "in-person": "We can meet in person at the quiet room in Sparsholt, Winchester.",
  phone: "We can talk by phone, from wherever feels comfortable for you.",
  video: "We can meet by secure video, so you can be somewhere that feels safe.",
  unsure: "We can find the way of meeting that feels most comfortable — there's no rush to decide.",
};

export function StartHerePathway() {
  const [step, setStep] = useState(0); // 0,1,2 questions; 3 = result
  const [format, setFormat] = useState<Format>("unsure");
  const [firstStep, setFirstStep] = useState<FirstStep>("chat");

  const reset = () => {
    setStep(0);
    setFormat("unsure");
    setFirstStep("chat");
  };

  return (
    <section className="bg-sand/40 py-6 sm:py-8">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Not sure where to start?"
          title="Three gentle questions"
          intro="No right answers, nothing saved or shared — just a calm way to find a comfortable first step."
        />

        <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft sm:p-9">
          {/* progress */}
          <div className="mb-6 flex items-center justify-center gap-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  step >= i ? "w-8 bg-sage-deep" : "w-4 bg-sand-deep"
                )}
              />
            ))}
          </div>

          {step === 0 && (
            <Question
              legend="What feels most true right now?"
              options={Q1.map((o) => ({ id: o.id, label: o.label }))}
              onChoose={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <Question
              legend="How would you most like to meet?"
              options={Q2}
              onChoose={(id) => {
                setFormat(id as Format);
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <Question
              legend="What would help most as a first step?"
              options={Q3}
              onChoose={(id) => {
                setFirstStep(id as FirstStep);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Result format={format} firstStep={firstStep} onReset={reset} />
          )}
        </div>
      </Container>
    </section>
  );
}

function Question({
  legend,
  options,
  onChoose,
  onBack,
}: {
  legend: string;
  options: { id: string; label: string }[];
  onChoose: (id: string) => void;
  onBack?: () => void;
}) {
  return (
    <div className="hh-fade">
      <fieldset>
        <legend className="text-center font-serif text-2xl text-ink">{legend}</legend>
        <div className="mt-6 flex flex-col gap-3">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => onChoose(o.id)}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-sand-deep/70 bg-cream px-5 py-4 text-left text-ink transition-all duration-200 hover:border-sage-deep hover:bg-sand/50"
            >
              <span className="font-semibold">{o.label}</span>
              <span
                aria-hidden
                className="text-sage-deep transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          ))}
        </div>
      </fieldset>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-5 text-sm font-semibold text-stone-soft underline-offset-4 hover:text-sage-deep hover:underline"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

function Result({
  format,
  firstStep,
  onReset,
}: {
  format: Format;
  firstStep: FirstStep;
  onReset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Move focus to the result so screen-reader users hear it; harmless visually.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const cta =
    firstStep === "book"
      ? { href: "/booking", label: "Book a session" }
      : firstStep === "learn"
        ? { href: "/how-it-works", label: "See how it works" }
        : { href: "/free-consultation", label: "Book a free consultation" };

  return (
    <div className="hh-fade text-center" role="status" aria-live="polite">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-deep text-white-warm">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s-7-4.35-9.3-8.5C1.2 9.7 2.6 6.5 5.8 6.5c1.9 0 3.2 1.1 4.2 2.4 1-1.3 2.3-2.4 4.2-2.4 3.2 0 4.6 3.2 3.1 6C19 16.65 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-serif text-2xl text-ink outline-none"
      >
        A gentle next step
      </h3>
      <p className="mx-auto mt-3 max-w-md text-lg text-stone">
        Whatever&apos;s on your mind, you&apos;re welcome here. {formatLine[format]}{" "}
        {firstStep === "chat" &&
          "Starting with a free 20-minute chat is a gentle way to see how it feels."}
        {firstStep === "book" &&
          "Whenever you feel ready, you can choose a time that suits you."}
        {firstStep === "learn" &&
          "Take all the time you need — there's no rush at all."}
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={cta.href} size="lg">
          {cta.label}
        </ButtonLink>
        {firstStep !== "chat" && (
          <ButtonLink href="/free-consultation" variant="secondary" size="lg">
            Or start with a free chat
          </ButtonLink>
        )}
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-stone-soft underline-offset-4 hover:text-sage-deep hover:underline"
      >
        Start over
      </button>
    </div>
  );
}
