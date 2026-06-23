import type { Metadata } from "next";
import { Container, SectionHeading, Eyebrow } from "@/components/ui/Primitives";
import { FirstSessionPreview } from "@/components/sections/FirstSessionPreview";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Reveal } from "@/components/Reveal";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "What to expect from counselling with Ivan Hall — from your free 20-minute consultation to your first session and beyond. Gentle, unhurried and led by you.",
  alternates: { canonical: "/how-it-works" },
};

const expectations = [
  {
    title: "No pressure, ever",
    body: "The first conversation is free and there's no obligation to continue. You decide what feels right, in your own time.",
  },
  {
    title: "Led by you",
    body: "There's no script and no agenda. We follow what matters to you, and you set the pace from the very first session.",
  },
  {
    title: "A steady, regular space",
    body: "Most people meet weekly at the same time. That rhythm helps build the trust and safety that makes the work possible.",
  },
  {
    title: "Confidential & ethical",
    body: "Everything is held in confidence within the BACP framework. I'll always be clear about the rare limits to that.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/how-it-works" },
        ]}
      />
      {/* Slim title strip (no full hero) */}
      <section className="bg-calm-gradient">
        <Container className="py-7 sm:py-9">
          <Eyebrow>How it works</Eyebrow>
          <h1 className="mt-3 text-3xl sm:text-4xl">How counselling works</h1>
        </Container>
      </section>

      <FirstSessionPreview />

      <section className="bg-sand/40 py-6 sm:py-8">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="A few gentle promises"
            title="What you can count on"
          />
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {expectations.map((e) => (
              <div
                key={e.title}
                className="rounded-2xl border border-sand-deep/60 bg-white-warm p-6 shadow-soft card-hover"
              >
                <h3 className="font-serif text-xl text-ink">{e.title}</h3>
                <p className="mt-2 text-stone">{e.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
