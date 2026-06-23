import { site, mapsLink } from "@/lib/site";
import { workingHours } from "@/lib/availability";
import { services } from "@/lib/content";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, generated server-side from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SCHEMA_DAY: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

/** Derive opening-hours ranges from the appointment pattern (first slot → last slot + 50 min). */
function openingHoursSpecification() {
  return Object.entries(workingHours)
    .filter(([, times]) => times.length > 0)
    .map(([dow, times]) => {
      const sorted = [...times].sort();
      const opens = sorted[0];
      const [lh, lm] = sorted[sorted.length - 1].split(":").map(Number);
      const end = lh * 60 + lm + 50;
      const closes = `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(
        end % 60
      ).padStart(2, "0")}`;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${SCHEMA_DAY[Number(dow)]}`,
        opens,
        closes,
      };
    });
}

/**
 * Rich local-SEO graph: WebSite + LocalBusiness (ProfessionalService) + Person.
 * Rendered site-wide from the root layout.
 */
export function OrganizationSchema() {
  const businessId = `${site.url}/#business`;
  const personId = `${site.url}/#ivan-hall`;

  const sameAs = [site.profiles.googleBusiness, site.profiles.bacpDirectory].filter(
    Boolean
  );

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.name,
            inLanguage: "en-GB",
            publisher: { "@id": businessId },
          },
          {
            "@type": ["ProfessionalService", "MedicalBusiness"],
            "@id": businessId,
            name: site.name,
            description: site.description,
            slogan: site.tagline,
            url: site.url,
            telephone: site.phoneHref,
            email: site.email,
            image: `${site.url}/images/ivan-portrait.jpg`,
            logo: `${site.url}/images/logo-trans.png`,
            priceRange: "££",
            currenciesAccepted: "GBP",
            paymentAccepted: "Cash, Bank transfer",
            ...(sameAs.length ? { sameAs } : {}),
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sparsholt",
              addressRegion: "Hampshire",
              postalCode: site.location.postcode,
              addressCountry: "GB",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: site.location.lat,
              longitude: site.location.lng,
            },
            hasMap: mapsLink,
            areaServed: site.areasServed.map((name) => ({
              "@type": "City",
              name,
            })),
            availableLanguage: "English",
            openingHoursSpecification: openingHoursSpecification(),
            founder: { "@id": personId },
            employee: { "@id": personId },
            knowsAbout: [
              "Anxiety",
              "Relationship difficulties",
              "Anger management",
              "Stress and burnout",
              "Low mood and depression",
              "Bereavement and loss",
              "Self-esteem",
              "Transactional Analysis",
              "Neurodiversity-affirming counselling",
              "Autism",
              "ADHD",
            ],
            makesOffer: [
              {
                "@type": "Offer",
                priceCurrency: "GBP",
                price: 0,
                itemOffered: {
                  "@type": "Service",
                  name: "Free 20-minute consultation",
                  serviceType: "Counselling consultation",
                },
              },
              {
                "@type": "Offer",
                priceCurrency: "GBP",
                price: site.fees.session,
                itemOffered: {
                  "@type": "Service",
                  name: "Individual counselling session (50 minutes)",
                  serviceType: "Counselling",
                },
              },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Counselling services",
              itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: `${s.title} counselling`,
                  serviceType: "Counselling",
                  areaServed: "Winchester, Hampshire",
                  provider: { "@id": businessId },
                },
              })),
            },
          },
          {
            "@type": "Person",
            "@id": personId,
            name: site.counsellor,
            jobTitle: "Counsellor",
            description: `BACP-registered counsellor in Winchester with ${site.experience}.`,
            image: `${site.url}/images/ivan-portrait.jpg`,
            worksFor: { "@id": businessId },
            knowsLanguage: "English",
            memberOf: {
              "@type": "Organization",
              name: "British Association for Counselling and Psychotherapy",
              alternateName: "BACP",
              url: "https://www.bacp.co.uk",
            },
            hasCredential: {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "Professional registration",
              name: "BACP Registered Member",
            },
          },
        ],
      }}
    />
  );
}

export function FaqSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((i) => ({
          "@type": "Question",
          name: i.question,
          acceptedAnswer: { "@type": "Answer", text: i.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${site.url}${item.path}`,
        })),
      }}
    />
  );
}
