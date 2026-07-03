import type { Metadata } from "next";
import { HorizonHero } from "@/components/ui/HorizonHeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Neurodiversity } from "@/components/sections/Neurodiversity";
import { Process } from "@/components/sections/Process";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <>
      <HorizonHero />
      <TrustBar />
      <ServiceCards />
      <Neurodiversity />
      <Process />
      <ConsultationCTA />
      <FaqSection limit={5} />
    </>
  );
}
