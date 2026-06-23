import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/lib/content";

export function ServiceCards({
  showCta = true,
  limit,
}: {
  showCta?: boolean;
  limit?: number;
}) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="bg-sand/40 py-8 sm:py-10">
      <Container>
        <SectionHeading
          eyebrow="How I can help"
          title="Whatever's weighing on you, there's space for it"
          intro="People come to counselling for all sorts of reasons — and just as often for reasons they can't quite name yet. These are some of the things we might work on together."
        />

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => (
            <article
              key={service.slug}
              tabIndex={0}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft outline-none transition-all duration-300 ease-[var(--ease-gentle)] hover:-translate-y-1.5 hover:border-sage-deep/70 hover:shadow-lift focus-visible:-translate-y-1.5 focus-visible:border-sage-deep/70 focus-visible:shadow-lift"
            >
              {/* accent bar that grows on hover/focus */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-sage to-clay transition-transform duration-300 ease-[var(--ease-gentle)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <h3 className="font-serif text-2xl text-ink transition-colors duration-300 group-hover:text-sage-deep group-focus-visible:text-sage-deep">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-stone">{service.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-sage-deep transition-colors duration-300 group-hover:bg-sage-deep group-hover:text-white-warm group-focus-visible:bg-sage-deep group-focus-visible:text-white-warm"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>

        {showCta && (
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/services" variant="secondary" size="lg">
              Explore counselling services
            </ButtonLink>
            <p className="text-sm text-stone-soft">
              Not sure if it fits? The free consultation is a good place to start.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
