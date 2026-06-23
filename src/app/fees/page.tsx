import type { Metadata } from "next";
import { PageHero, Container, SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Counselling Fees in Winchester",
  description:
    "Counselling fees with Ivan Hall: £60 per 50-minute session, with concessions for students and those on a low income. Free 20-minute consultation. Clear, simple terms.",
  alternates: { canonical: "/fees" },
};

const fineprint = [
  {
    title: "Concessions",
    body: "I keep a small number of reduced-fee spaces for students and people on a low income. If cost is a barrier, please just ask — it stays between us.",
  },
  {
    title: "Payment",
    body: "Payment is made in advance or on the day of your session, by bank transfer. I'll share the details once your first session is confirmed.",
  },
  {
    title: "Cancellations",
    body: "Life happens. I ask for at least 24 hours' notice to rearrange. Sessions cancelled with less notice are charged at the full fee.",
  },
  {
    title: "No long contracts",
    body: "There's nothing to lock into. We review how things are going together, and you're free to pause or stop whenever feels right.",
  },
];

export default function FeesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Fees", path: "/fees" },
        ]}
      />
      <PageHero
        eyebrow="Fees"
        title="Clear, fair and nothing hidden"
        intro="Counselling is an investment in yourself, and it should feel transparent from the start. Here's exactly what to expect — no surprises."
      />

      <section className="py-6 sm:py-8">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col justify-between rounded-3xl bg-sage-deep p-8 text-white-warm shadow-lift card-hover">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white-warm/70">
                Free
              </p>
              <h2 className="mt-3 text-3xl text-white-warm">
                20-minute consultation
              </h2>
              <p className="mt-3 text-white-warm/85">
                A relaxed, no-obligation chat by phone or video to see
                if it feels like a good fit.
              </p>
            </div>
            <ButtonLink
              href="/free-consultation"
              variant="secondary"
              size="lg"
              className="mt-8 self-start bg-white-warm text-sage-deep ring-0 hover:bg-cream"
            >
              Book a free consultation
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-between rounded-3xl border border-sand-deep/60 bg-white-warm p-8 shadow-soft card-hover">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage-deep">
                Standard session
              </p>
              <h2 className="mt-3 text-4xl text-ink">
                £{site.fees.session}
                <span className="text-lg font-normal text-stone-soft">
                  {" "}
                  / {site.fees.duration}
                </span>
              </h2>
              <p className="mt-3 text-stone">
                A regular weekly counselling session, in person in Sparsholt, or by
                phone or secure video.
              </p>
            </div>
            <ButtonLink href="/booking" size="lg" className="mt-8 self-start">
              Book a session
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand/40 py-6 sm:py-8">
        <Container>
          <SectionHeading align="center" eyebrow="The details" title="The small print, made simple" />
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {fineprint.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft card-hover"
              >
                <h3 className="font-serif text-xl text-ink">{f.title}</h3>
                <p className="mt-2 text-stone">{f.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
