import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function IntroSection() {
  return (
    <section className="py-8 sm:py-10">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-4 text-3xl sm:text-4xl">
            For anyone who&apos;s quietly struggling — you don&apos;t need the right
            words to begin
          </h2>
          <div className="mt-5 space-y-4 text-lg text-stone">
            <p>
              You don&apos;t need a diagnosis, a label, or a tidy explanation to
              come to counselling. Maybe something specific has happened, or maybe
              you just have a sense that things could feel lighter. Both are
              completely valid reasons to reach out.
            </p>
            <p>
              I work with adults from all walks of life, in a warm and
              collaborative way. Together we make sense of what&apos;s happening,
              gently and without judgement, so you can feel more grounded and more
              like yourself.
            </p>
          </div>
          <ButtonLink href="/about" variant="ghost" size="lg" className="mt-6">
            More about Ivan →
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative">
            <blockquote className="rounded-3xl border border-sand-deep/60 bg-white-warm p-8 shadow-soft sm:p-10">
              <p className="font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
                “Being truly listened to — without judgement, without rushing — can
                be the start of real change.”
              </p>
              <figcaption className="mt-6 flex items-center gap-3">
                <Image
                  src="/images/ivan-portrait.jpg"
                  alt="Ivan Hall, BACP-registered counsellor in Winchester"
                  width={96}
                  height={96}
                  className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-sand-deep/60"
                />
                <span>
                  <span className="block font-semibold text-ink">
                    {site.counsellor}
                  </span>
                  <span className="block text-sm text-stone-soft">
                    {site.accreditation}
                  </span>
                </span>
              </figcaption>
            </blockquote>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
