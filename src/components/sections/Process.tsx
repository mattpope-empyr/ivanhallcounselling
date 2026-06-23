import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { processSteps } from "@/lib/content";

export function Process({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="py-8 sm:py-10">
      <Container>
        <SectionHeading
          eyebrow="What to expect"
          title="Gentle steps, at your pace"
          intro="Starting counselling can feel daunting when you don't know how it works. Here's the whole journey, from first hello to feeling more like yourself."
        />

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft card-hover"
            >
              <span className="font-serif text-4xl text-sage/70">{step.step}</span>
              <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-stone">{step.body}</p>
            </div>
          ))}
        </Reveal>

        {showCta && (
          <div className="mt-10">
            <ButtonLink href="/how-it-works" variant="ghost" size="lg">
              Read more about how it works →
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
