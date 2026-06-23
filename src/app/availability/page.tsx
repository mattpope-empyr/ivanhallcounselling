import type { Metadata } from "next";
import { PageHero, Container, SectionHeading } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { CalendlyInline } from "@/components/booking/CalendlyInline";
import { calendly } from "@/lib/site";

export const metadata: Metadata = {
  title: "Availability & Diary",
  description:
    "See current counselling availability in Winchester with Ivan Hall and book live online. Pick an open slot over the coming weeks — in person, by phone or video.",
  alternates: { canonical: "/availability" },
};

export default function AvailabilityPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Availability", path: "/availability" },
        ]}
      />
      <PageHero
        eyebrow="Availability"
        title="The diary, in one calm view"
        intro="Choose a time that genuinely works for you from the live calendar below — only open slots are shown, so there's no back-and-forth. Booked times simply disappear."
      />

      {/* Live booking calendar (Calendly) */}
      <section className="py-6 sm:py-8">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Live calendar"
            title="Pick a time that suits you"
            intro="Pick a slot and you'll get an instant confirmation by email, with a reminder before we meet."
          />
          <div className="mt-8">
            {calendly.isConfigured ? (
              <CalendlyInline url={calendly.url} />
            ) : (
              <CalendlyPlaceholder />
            )}
          </div>
        </Container>
      </section>

      {/* Enquiry alternative */}
      <section className="bg-sand/40 py-6 sm:py-8">
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white-warm p-8 text-center shadow-soft">
            <h2 className="text-2xl sm:text-3xl">Prefer to send an enquiry?</h2>
            <p className="max-w-xl text-stone">
              You can book a paid session or start with a free 20-minute
              consultation — whichever feels right.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/free-consultation" size="lg">
                Book a free consultation
              </ButtonLink>
              <ButtonLink href="/booking" variant="secondary" size="lg">
                Book a session
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Shown until a Calendly link is connected — looks intentional, not broken. */
function CalendlyPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-sage/50 bg-white-warm p-8 text-center shadow-soft sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-sage/10 blur-2xl"
      />
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sand text-sage-deep">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-5 text-2xl">Live online booking calendar</h3>
      <p className="mx-auto mt-3 max-w-md text-stone">
        The interactive Calendly calendar appears here, showing real-time
        availability so visitors can book and get instant confirmation. It&apos;s
        ready to switch on — just add the Calendly link.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/free-consultation" size="lg">
          Book a free consultation
        </ButtonLink>
        <ButtonLink href="/booking" variant="secondary" size="lg">
          Book a session
        </ButtonLink>
      </div>
      <p className="mx-auto mt-6 max-w-md text-xs text-stone-soft">
        Setup: add <code className="rounded bg-sand px-1.5 py-0.5">NEXT_PUBLIC_CALENDLY_URL</code> to{" "}
        <code className="rounded bg-sand px-1.5 py-0.5">.env.local</code> (or set it in{" "}
        <code className="rounded bg-sand px-1.5 py-0.5">src/lib/site.ts</code>).
      </p>
    </div>
  );
}
