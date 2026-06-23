import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { trustPoints } from "@/lib/content";

export function TrustBar({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        {withHeading && (
          <SectionHeading
            align="center"
            eyebrow="Why people feel safe here"
            title="Care you can trust, from a real person"
            intro="Reaching out takes courage. Here's a little about what you can expect — so it feels a bit less like a leap into the unknown."
          />
        )}
        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-sand-deep/60 bg-white-warm px-6 py-4 shadow-soft">
            <Image
              src="/images/bacp.avif"
              alt="BACP Registered Member 411221 MBACP — Professional Standards Authority accredited register"
              width={560}
              height={244}
              className="h-14 w-auto sm:h-16"
            />
            <p className="max-w-[14rem] text-sm text-stone">
              Registered &amp; accountable to the{" "}
              <span className="font-semibold text-ink">
                British Association for Counselling and Psychotherapy
              </span>
              .
            </p>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft card-hover"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-sand text-sage-deep">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M20 6 9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl text-ink">{point.title}</h3>
              <p className="mt-2 text-stone">{point.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
