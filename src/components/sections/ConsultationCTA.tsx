import { Container } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { consultationModes, site } from "@/lib/site";

export function ConsultationCTA() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-sage-deep px-6 py-12 text-white-warm shadow-lift sm:px-12 sm:py-16">
          {/* soft decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-clay/20 blur-2xl"
          />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl text-white-warm sm:text-4xl">
              Start with a free, friendly conversation
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white-warm/85">
              A relaxed 20-minute chat with no obligation. We&apos;ll talk about
              what&apos;s on your mind, you can ask anything, and together we&apos;ll
              see whether it feels like a good fit. That&apos;s all — no pressure to
              book anything more.
            </p>

            <ul className="mt-7 flex flex-wrap gap-3">
              {consultationModes
                .filter((mode) => mode.id !== "in-person")
                .map((mode) => (
                <li
                  key={mode.id}
                  className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20"
                >
                  {mode.label}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/free-consultation"
                variant="secondary"
                size="lg"
                className="bg-white-warm text-sage-deep ring-0 hover:bg-cream"
              >
                Book a free consultation
              </ButtonLink>
              <a
                href={`tel:${site.phoneHref}`}
                className="font-semibold text-white-warm underline-offset-4 hover:underline"
              >
                or call {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
