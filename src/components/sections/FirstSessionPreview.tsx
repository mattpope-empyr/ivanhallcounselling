"use client";

import { useId, useRef, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

const steps = [
  {
    key: "arrive",
    label: "Arriving",
    title: "Settling in",
    body: "If we meet in person, there's free parking and a quiet, private room — no busy waiting area. Online or by phone, I'll send a simple link or call you at the agreed time. However we meet, you can take a moment to settle before we begin.",
  },
  {
    key: "confidential",
    label: "Confidentiality",
    title: "What you share stays with us",
    body: "I'll explain confidentiality clearly at the start — what it means and the rare, specific limits to it. Nothing is shared without you knowing. This is your space, held with care and within the BACP ethical framework.",
  },
  {
    key: "talk",
    label: "The conversation",
    title: "We go at your pace",
    body: "There's no script and nothing you have to get right. We'll talk a little about what's brought you here and what you're hoping for — but only as much as feels comfortable. Quiet moments are completely okay.",
  },
  {
    key: "next",
    label: "Afterwards",
    title: "You decide what's next",
    body: "At the end, there's no pressure to commit. If it feels helpful, we can arrange a regular weekly time. If it doesn't feel like the right fit, that's genuinely fine — and I'm happy to suggest other options.",
  },
] as const;

/**
 * Accessible tabbed preview of a first session. No scroll-jacking; panel swap is a
 * gentle CSS fade that is disabled under prefers-reduced-motion (see globals.css).
 */
export function FirstSessionPreview() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (active + 1) % steps.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + steps.length) % steps.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = steps.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="py-6 sm:py-8">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="What to expect"
          title="A look inside your first session"
          intro="Not knowing what happens can be the hardest part. Here's a gentle walk through it, so it feels a little more familiar before you arrive."
        />

        <div className="mx-auto mt-10 max-w-3xl">
          <div
            role="tablist"
            aria-label="What happens in a first session"
            onKeyDown={onKeyDown}
            className="flex flex-wrap justify-center gap-2"
          >
            {steps.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                    selected
                      ? "bg-sage-deep text-white-warm shadow-soft"
                      : "bg-sand text-sage-deep hover:bg-sand-deep/60"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full text-xs",
                      selected ? "bg-white-warm/20" : "bg-white-warm/70"
                    )}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {steps.map((s, i) => (
              <div
                key={s.key}
                role="tabpanel"
                id={`${baseId}-panel-${i}`}
                aria-labelledby={`${baseId}-tab-${i}`}
                hidden={i !== active}
                className="hh-fade rounded-3xl border border-sand-deep/60 bg-white-warm p-7 shadow-soft sm:p-9"
              >
                <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-stone">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
