import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Accordion } from "@/components/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export function FaqSection({
  limit,
  showCta = true,
}: {
  limit?: number;
  showCta?: boolean;
}) {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="py-8 sm:py-10">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Questions & reassurance"
            title="It's normal to have questions"
            intro="A few of the things people often wonder before getting in touch. If yours isn't here, please just ask — no question is too small."
          />
          {showCta && (
            <ButtonLink
              href={`tel:${site.phoneHref}`}
              variant="secondary"
              size="lg"
              className="mt-7"
            >
              Call {site.phone}
            </ButtonLink>
          )}
        </div>
        <Accordion items={items} />
      </Container>
    </section>
  );
}
