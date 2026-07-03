import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Container, Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { TrustBar } from "@/components/sections/TrustBar";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Ivan Hall, BACP Counsellor",
  description:
    "Meet Ivan Hall — a BACP-registered counsellor in Winchester with 20+ years in mental health and education, working in a warm, collaborative, person-led way.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <PageHero
        eyebrow="About"
        title="Hello, I'm Ivan"
        intro="A counsellor in Winchester who believes that being genuinely listened to — without judgement and without rushing — is where real change quietly begins."
      />

      <section className="py-6 sm:py-8">
        <Container>
          {/* Mobile only: Ivan's photo sits between the intro quote and the bio */}
          <div className="mb-10 lg:hidden">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/70">
              <Image
                src="/images/ivan-portrait.jpg"
                alt="Ivan Hall, BACP-registered counsellor"
                fill
                sizes="(min-width: 640px) 24rem, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <Reveal className="space-y-5 text-lg text-stone">
              <p>
                For over twenty years I&apos;ve worked alongside people in mental
                health and education settings — supporting adults through anxiety,
                difficult relationships, anger, loss and the kind of low mood that
                can make everything feel like too much. That experience taught me
                one thing above all: people don&apos;t need fixing. They need to
                feel safe enough to be honest, and to be met with warmth while they
                do.
              </p>
              <p>
                My approach draws mainly on{" "}
                <strong className="font-semibold text-ink">
                  Transactional Analysis
                </strong>{" "}
                alongside other evidence-based ways of working. In practice that
                isn&apos;t as clinical as it sounds — it simply means we work
                together, led by you, to understand the patterns and feelings that
                keep showing up, and what might help them shift.
              </p>
              <p>
                There&apos;s no script in my room and no sense of being analysed.
                You&apos;re welcome exactly as you are, on the days it feels easy
                and the days it really doesn&apos;t. We go at your pace, and you
                stay in the driving seat throughout.
              </p>
              <p>
                I see clients from a quiet home office in {site.location.area},
                with free parking, as well as by phone and secure video for anyone
                who prefers to talk from home.
              </p>
            </Reveal>

            {/* Desktop portrait — whole image, no crop */}
            <Reveal delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/70">
                <Image
                  src="/images/ivan-portrait.jpg"
                  alt="Ivan Hall, BACP-registered counsellor"
                  fill
                  sizes="(min-width: 1024px) 22rem, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* At a glance — horizontal row */}
          <div className="mt-14">
            <Eyebrow>At a glance</Eyebrow>
            <Reveal
              stagger
              className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                [site.accreditation, "Bound by a professional ethical framework"],
                [site.experience, "Across mental health & education"],
                ["Transactional Analysis", "Warm, collaborative, client-led"],
                ["In person · phone · video", "Whatever suits you best"],
              ].map(([title, sub]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-sand-deep/60 bg-white-warm p-5 shadow-soft card-hover"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sand text-sage-deep">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="mt-3 block font-semibold text-ink">{title}</span>
                  <span className="mt-1 block text-sm text-stone">{sub}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The space */}
      <section className="bg-sand/40 py-6 sm:py-8">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The space"
            title="A calm, private place to talk"
            intro={`Sessions take place in a quiet, comfortable room in ${site.location.area}, with free parking and no busy waiting area — somewhere you can settle and feel at ease.`}
          />
          <Reveal
            stagger
            className="mx-auto mt-12 grid max-w-4xl items-stretch gap-5 sm:grid-cols-2"
          >
            <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft ring-1 ring-white/60 card-hover">
              <Image
                src="/images/room.jpg"
                alt="The counselling room, with soft seating, a rug and natural light"
                fill
                sizes="(min-width: 640px) 28rem, 90vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft ring-1 ring-white/60 card-hover">
              <Image
                src="/images/chair.jpg"
                alt="A comfortable armchair in the counselling room beside a plant and warm lamp"
                fill
                sizes="(min-width: 640px) 28rem, 90vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </Container>
      </section>

      <TrustBar withHeading={false} />
      <ConsultationCTA />
    </>
  );
}
