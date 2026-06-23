"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Primitives";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-fade", {
          y: 28,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
        })
          .from(
            ".hero-art",
            { opacity: 0, scale: 0.96, duration: 1.1 },
            "-=0.8"
          )
          .from(
            ".hero-blob",
            { opacity: 0, scale: 0.8, duration: 1.4, stagger: 0.15 },
            "-=1.1"
          );
        // Slow, calm drift on the decorative shapes.
        gsap.to(".hero-blob", {
          y: "+=14",
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.6,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-calm-gradient">
      <Container className="grid items-center gap-12 py-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div>
          <span className="hero-fade inline-flex items-center gap-2 rounded-full bg-white-warm px-4 py-1.5 text-sm font-semibold text-sage-deep shadow-soft ring-1 ring-sage/20">
            <span className="h-2 w-2 rounded-full bg-sage" aria-hidden />
            {site.accreditation} · {site.location.area}
          </span>

          <h1 className="hero-fade mt-6 text-[2.6rem] leading-[1.08] sm:text-6xl">
            You don&apos;t have to figure
            <br className="hidden sm:block" /> it all out alone.
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-stone sm:text-xl">
            Warm, confidential counselling in Winchester for when life feels
            heavy, anxious or hard to make sense of. A calm, unhurried space to
            feel genuinely heard — at your pace, without judgement.
          </p>

          <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/free-consultation" size="lg">
              Book a free consultation
            </ButtonLink>
            <ButtonLink href="/availability" variant="secondary" size="lg">
              View availability
            </ButtonLink>
          </div>

          <p className="hero-fade mt-5 text-sm text-stone-soft">
            Free 20-minute chat · In person, phone or video · No obligation
          </p>
        </div>

        <HeroArt />
      </Container>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="hero-art relative mx-auto w-full max-w-sm lg:max-w-md lg:justify-self-end">
      {/* soft decorative halo behind the portrait */}
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-sage/25 via-cream to-clay-soft/40 blur-xl"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-white/70">
        <Image
          src="/images/ivan-portrait.jpg"
          alt="Ivan Hall, BACP-registered counsellor in Winchester"
          width={760}
          height={856}
          priority
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Floating reassurance card */}
      <div className="hero-fade absolute -bottom-5 left-1/2 w-[88%] max-w-xs -translate-x-1/2 rounded-2xl bg-white-warm/95 p-4 shadow-lift ring-1 ring-sand-deep/60 backdrop-blur sm:-left-6 sm:translate-x-0">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-serif text-base text-sage-deep">
            “Whatever you&apos;re carrying,
          </span>{" "}
          you&apos;re welcome here — exactly as you are.”
        </p>
      </div>
    </div>
  );
}
