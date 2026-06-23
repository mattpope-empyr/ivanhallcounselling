import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const points = [
  {
    title: "No masking here",
    body: "You don't need to mask, perform, or sit still. Stim, fidget, look away or take pauses — whatever helps you feel at ease is genuinely welcome.",
  },
  {
    title: "We work the way you do",
    body: "Sessions flex to how you think and communicate — clear structure or open space, phone or video, and a short written summary afterwards if that helps.",
  },
  {
    title: "Calm and low-stimulation",
    body: "A quiet room with soft lighting, plus phone and video options, so the environment isn't one more thing to manage.",
  },
  {
    title: "Strengths, not deficits",
    body: "Neurodivergence isn't something to be fixed. We make sense of things together, working with how your mind works — not against it.",
  },
];

export function Neurodiversity() {
  return (
    <section className="bg-sand/40 py-6 sm:py-8">
      <Container>
        <SectionHeading
          eyebrow="Neurodiversity-affirming"
          title="A space that works with how your mind works"
          intro="Warm, affirming counselling for neurodivergent adults — including autistic and ADHD clients, and anyone questioning or self-identifying. You're welcome exactly as you are."
        />

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft card-hover"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand text-sage-deep">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 21s-7-4.35-9.3-8.5C1.2 9.7 2.6 6.5 5.8 6.5c1.9 0 3.2 1.1 4.2 2.4 1-1.3 2.3-2.4 4.2-2.4 3.2 0 4.6 3.2 3.1 6C19 16.65 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3 className="mt-4 font-serif text-xl text-ink">{p.title}</h3>
              <p className="mt-2 text-stone">{p.body}</p>
            </div>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/free-consultation" size="lg">
            Book a free consultation
          </ButtonLink>
          <p className="text-sm text-stone-soft">
            Affirming counselling support — not a diagnostic or assessment service.
          </p>
        </div>
      </Container>
    </section>
  );
}
