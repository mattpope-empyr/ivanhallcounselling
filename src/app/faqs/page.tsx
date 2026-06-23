import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui/Primitives";
import { Accordion } from "@/components/Accordion";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { BreadcrumbSchema, FaqSchema } from "@/components/JsonLd";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about counselling with Ivan Hall in Winchester — sessions, fees, confidentiality, online and phone counselling, and what to expect.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ]}
      />
      <FaqSchema items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />

      <PageHero
        eyebrow="FAQs"
        title="Your questions, answered honestly"
        intro="Wondering how it all works? Here are the things people ask most often. If yours isn't here, please get in touch — no question is too small or too silly."
      />

      <section className="py-6 sm:py-8">
        <Container className="max-w-3xl">
          <Accordion items={faqs} />
        </Container>
      </section>

      <ConsultationCTA />
    </>
  );
}
