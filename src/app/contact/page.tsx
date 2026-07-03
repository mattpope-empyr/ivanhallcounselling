import type { Metadata } from "next";
import { PageHero, Container, SectionHeading } from "@/components/ui/Primitives";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { site, mapsEmbed, mapsLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ivan Hall Counselling in Sparsholt, Winchester. Call, email or send a message — and book your free 20-minute consultation.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Reaching out is the hardest part — and you're already here"
        intro="However you'd prefer to make contact, it's welcome. There's no wrong way to start, and no pressure once you do."
      />

      <section className="py-6 sm:py-8">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="space-y-6">
            <ContactDetail
              label="Call or text"
              value={site.phone}
              href={`tel:${site.phoneHref}`}
              note="If I can't pick up, leave a message and I'll call you back."
            />
            <ContactDetail
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
              note="A few words is plenty — I usually reply within one working day."
            />
            <ContactDetail
              label="Where I work"
              value={site.location.full}
              note={site.location.note}
            />

            <div className="rounded-2xl bg-sand/50 p-5">
              <p className="text-stone">
                Prefer to skip the form? Book your free 20-minute consultation
                directly.
              </p>
              <ButtonLink href="/free-consultation" size="lg" className="mt-4">
                Book a free consultation
              </ButtonLink>
            </div>

            <p className="rounded-2xl border border-clay-soft/70 bg-clay-soft/20 p-5 text-sm leading-relaxed text-ink">
              <strong>If you need urgent help: </strong> counselling isn&apos;t a
              crisis service. If you&apos;re in immediate danger call 999, or
              contact the Samaritans free on{" "}
              <a className="font-semibold text-sage-deep" href="tel:116123">
                116 123
              </a>{" "}
              any time, day or night.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Send a message</h2>
            <p className="mt-2 text-stone">
              Tell me a little about what&apos;s bringing you here and how best to
              reach you. Everything you share is confidential.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Local area + map */}
      <section className="bg-sand/40 py-6 sm:py-8">
        <Container>
          <SectionHeading
            eyebrow="Where I work"
            title="Counselling in Winchester &amp; across Hampshire"
            intro={`Sessions are held in a quiet home office in ${site.location.area}, with free parking — and online or by phone for anyone further afield.`}
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-sand-deep/60 shadow-soft">
              <iframe
                title={`Map of ${site.location.full}`}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full sm:h-[380px]"
              />
            </div>

            <div>
              <h3 className="font-serif text-xl text-ink">
                In-person sessions are easy to reach from:
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.areasServed.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-white-warm px-4 py-2 text-sm font-semibold text-sage-deep ring-1 ring-sand-deep/60"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-stone">
                Many clients travel in from across Winchester and the surrounding
                villages. Online and telephone counselling is available right
                across Hampshire and the UK.
              </p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex font-semibold text-sage-deep underline-offset-4 hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactDetail({
  label,
  value,
  href,
  note,
}: {
  label: string;
  value: string;
  href?: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-sand-deep/60 bg-white-warm p-5 shadow-soft card-hover">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-deep">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-1 block break-words font-serif text-xl text-ink transition-colors hover:text-sage-deep"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 font-serif text-xl text-ink">{value}</p>
      )}
      {note && <p className="mt-1 text-sm text-stone">{note}</p>}
    </div>
  );
}
