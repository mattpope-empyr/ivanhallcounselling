import type { Metadata } from "next";
import { PageHero, Container, SectionHeading } from "@/components/ui/Primitives";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Neurodiversity } from "@/components/sections/Neurodiversity";
import { Process } from "@/components/sections/Process";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Reveal } from "@/components/Reveal";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { consultationModes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Counselling Services in Winchester",
  description:
    "Confidential, neurodiversity-affirming counselling in Winchester for anxiety, relationships, anger, low mood, life changes and self-esteem — including autistic and ADHD adults. Sessions in person, by phone or video.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Counselling services"
        title="A space to make sense of whatever you're carrying"
        intro="Counselling with me is open-ended and led by you. We're not here to slot you into a category — we're here to understand your particular story, gently and without judgement."
      />

      <ServiceCards showCta={false} />

      <Neurodiversity />

      <section className="py-6 sm:py-8">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Ways to meet"
            title="Sessions that fit around your life"
            intro="Every session is 50 minutes. Choose whatever feels most comfortable — many people mix and match over time."
          />
          <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {consultationModes.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft card-hover"
              >
                <h3 className="font-serif text-2xl text-ink">{m.label}</h3>
                <p className="mt-2 text-stone">{m.description}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-8 text-center text-stone">
            Sessions are £{site.fees.session} each, with concessions available.{" "}
            <a className="font-semibold text-sage-deep" href="/fees">
              See full fees →
            </a>
          </p>
        </Container>
      </section>

      <Process showCta />
      <ConsultationCTA />
    </>
  );
}
