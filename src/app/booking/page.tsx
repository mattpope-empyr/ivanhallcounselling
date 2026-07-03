import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui/Primitives";
import { CalendlyInline } from "@/components/booking/CalendlyInline";
import { BookingWidget } from "@/components/booking/BookingWidget";
import { BeforeYouBook } from "@/components/booking/BeforeYouBook";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { getBookingDays } from "@/lib/availability";
import { calendly, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Counselling Session in Winchester",
  description:
    "Request a counselling session with Ivan Hall in Winchester. Choose a date and time that suits you, in person, by phone or video. £60 per 50-minute session.",
  alternates: { canonical: "/booking" },
  openGraph: { url: "/booking" },
};

export default function BookingPage() {
  const days = getBookingDays({ days: 28, leadDays: 1 });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Booking", path: "/booking" },
        ]}
      />
      <PageHero
        eyebrow="Booking"
        title="Find a time that works for you"
        intro="Choose a date and time that suits you from the calendar below. You'll get an instant confirmation by email, with a reminder before we meet."
      />

      <section className="py-6 sm:py-8">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl">Good to know</h2>
            <ul className="mt-6 space-y-4 text-stone">
              <li className="rounded-2xl border border-sand-deep/60 bg-white-warm p-5 card-hover">
                <span className="font-semibold text-ink">£{site.fees.session} per session</span>
                <br />
                {site.fees.duration}, with concessions available for students and
                those on a low income.
              </li>
              <li className="rounded-2xl border border-sand-deep/60 bg-white-warm p-5 card-hover">
                <span className="font-semibold text-ink">No payment now</span>
                <br />
                Nothing is charged when you book — we&apos;ll arrange payment
                simply before your first session.
              </li>
              <li className="rounded-2xl border border-sand-deep/60 bg-white-warm p-5 card-hover">
                <span className="font-semibold text-ink">New to counselling?</span>
                <br />
                Start with a{" "}
                <a className="font-semibold text-sage-deep" href="/free-consultation">
                  free consultation
                </a>{" "}
                instead — there&apos;s no obligation.
              </li>
            </ul>
            <div className="mt-6">
              <BeforeYouBook />
            </div>
          </div>

          <div className="min-w-0">
            {calendly.isConfigured ? (
              <CalendlyInline url={calendly.url} />
            ) : (
              <BookingWidget days={days} kind="session" />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
