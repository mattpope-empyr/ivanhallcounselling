/**
 * Central site configuration.
 * Edit these values to update contact details, fees and copy across the whole site.
 */

export const site = {
  name: "Ivan Hall Counselling",
  counsellor: "Ivan Hall",
  shortName: "Ivan Hall",
  // Used for metadataBase and absolute URLs (sitemap, schema, OG). Update on deploy.
  url: "https://ivanhallcounselling.co.uk",
  tagline: "You don't have to figure it all out alone.",
  description:
    "Warm, BACP-registered counselling in Sparsholt, Winchester. In-person, phone and video sessions for anxiety, relationships, anger and life's harder seasons. Book a free 20-minute consultation.",
  accreditation: "BACP Registered Member",
  experience: "20+ years in mental health and education settings",
  phone: "07354 564293",
  phoneHref: "+447354564293",
  email: "hello@ivanhallcounselling.co.uk",
  location: {
    area: "Sparsholt, Winchester",
    region: "Hampshire",
    full: "Sparsholt, Winchester, Hampshire",
    note: "Quiet home office with free parking",
    // Approximate coordinates for Sparsholt village (no exact address published).
    // Update to the precise location when ready — keep consistent with Google Business Profile.
    lat: 51.0726,
    lng: -1.3795,
    postcode: "SO21", // outward code only until full address is confirmed
  },
  // Towns within easy reach — used for local SEO copy and schema `areaServed`.
  areasServed: [
    "Winchester",
    "Sparsholt",
    "Littleton",
    "Kings Worthy",
    "Twyford",
    "Chandler's Ford",
    "Eastleigh",
    "Romsey",
  ],
  fees: {
    session: 60,
    duration: "50 minutes",
    consultation: "Free 20-minute consultation",
  },
  // Google Business Profile + directory listings strengthen local trust (schema `sameAs`).
  // Paste real URLs when available; empty entries are ignored.
  profiles: {
    googleBusiness: "", // e.g. https://g.page/ivan-hall-counselling
    bacpDirectory: "", // your BACP register profile URL
  },
  social: {
    // Add real handles when available.
  },
} as const;

/** Google Maps embed/link for the practice area. */
export const mapQuery = "Sparsholt, Winchester, Hampshire";
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapQuery
)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  mapQuery
)}&z=12&output=embed`;

/**
 * Calendly integration for the Availability / diary page.
 *
 * To go live: create a Calendly event type, copy its scheduling link
 * (e.g. https://calendly.com/ivan-hall/free-consultation) and either:
 *   - set NEXT_PUBLIC_CALENDLY_URL in .env.local, or
 *   - paste it into `fallbackUrl` below.
 *
 * While no link is set, the page shows a tasteful placeholder plus the
 * typical-availability overview, and flips to the live calendar instantly
 * once a URL is provided.
 */
const CALENDLY_FALLBACK_URL = "https://calendly.com/hello-ivanhallcounselling";

/**
 * Optional form-handling endpoint for the booking & contact forms on the static site.
 * Paste a Formspree (https://formspree.io/f/xxxx) or Web3Forms endpoint here, or set
 * NEXT_PUBLIC_FORM_ENDPOINT. If left blank, forms open the visitor's email app with the
 * details pre-filled (zero backend needed).
 */
const FORM_ENDPOINT_FALLBACK = ""; // e.g. "https://formspree.io/f/xxxxxxxx"
export const formEndpoint = (
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? FORM_ENDPOINT_FALLBACK
).trim();

export const calendly = {
  url: (process.env.NEXT_PUBLIC_CALENDLY_URL ?? CALENDLY_FALLBACK_URL).trim(),
  get isConfigured() {
    return /^https?:\/\/(.*\.)?calendly\.com\//i.test(this.url);
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/fees", label: "Fees" },
  { href: "/availability", label: "Availability" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export type ConsultationMode = "in-person" | "phone" | "video";

export const consultationModes: {
  id: ConsultationMode;
  label: string;
  description: string;
}[] = [
  {
    id: "in-person",
    label: "In person",
    description: "At the quiet home office in Sparsholt, with free parking.",
  },
  {
    id: "phone",
    label: "By phone",
    description: "A relaxed phone call from wherever feels comfortable.",
  },
  {
    id: "video",
    label: "By video",
    description: "A secure video session over a private link.",
  },
];
