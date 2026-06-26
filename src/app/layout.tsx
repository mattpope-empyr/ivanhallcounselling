import type { Metadata, Viewport } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { OrganizationSchema } from "@/components/JsonLd";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Counselling in Winchester, Hampshire`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.counsellor }],
  keywords: [
    "counselling Winchester",
    "counsellor Hampshire",
    "BACP counsellor",
    "anxiety counselling",
    "Sparsholt counselling",
    "relationship counselling Winchester",
    "anger management counselling",
    "talking therapy Hampshire",
    "neurodiversity-affirming counselling",
    "neurodivergent counselling Winchester",
    "autism counselling Winchester",
    "ADHD counselling Hampshire",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Counselling in Winchester, Hampshire`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — counselling in Winchester`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Counselling in Winchester`,
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/images/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/favicon.ico",
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/images/site.webmanifest",
  appleWebApp: {
    title: "IC",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${lora.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sage-deep focus:px-5 focus:py-2 focus:text-white-warm"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileBookingBar />
        <OrganizationSchema />
      </body>
    </html>
  );
}
