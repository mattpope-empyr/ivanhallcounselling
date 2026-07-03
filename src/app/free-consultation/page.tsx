import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui/Primitives";
import { CalendlyInline } from "@/components/booking/CalendlyInline";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { BeforeYouBook } from "@/components/booking/BeforeYouBook";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { getBookingDays } from "@/lib/availability";
import { calendly } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description:
    "Book a free, no-obligation 20-minute consultation with Ivan Hall — by phone or video. A relaxed chance to see if it feels like a good fit.",
  alternates: { canonical: "/free-consultation" },
  openGraph: { url: "/free-consultation" },
};

export default function FreeConsultationPage() {
  const days = getBookingDays({ days: 21, leadDays: 1 });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Free Consultation", path: "/free-consultation" },
        ]}
      />
      <PageHero
        eyebrow="Free consultation"
        title="Let's start with a gentle hello"
        intro="A free, relaxed 20-minute conversation — by phone or video. No pressure, no commitment. Just a chance to see whether working together feels right for you."
      />

      <section className="py-6 sm:py-8">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="min-w-0">
            <BeforeYouBook />
          </div>

          <div className="min-w-0">
            {calendly.isConfigured ? (
              <CalendlyInline url={calendly.url} />
            ) : (
              <BookingWidget days={days} kind="consultation" />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
