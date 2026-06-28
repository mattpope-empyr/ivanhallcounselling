import { site } from "@/lib/site";
import { services, faqs, trustPoints } from "@/lib/content";
import { workingHours } from "@/lib/availability";

export const dynamic = "force-static";

const DAY: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};

function formatAvailability(): string {
  return Object.entries(workingHours)
    .filter(([, times]) => times.length > 0)
    .map(([dow, times]) => {
      const sorted = [...times].sort();
      return `- ${DAY[Number(dow)]}: ${sorted[0]}–${sorted[sorted.length - 1]}`;
    })
    .join("\n");
}

export function GET() {
  const body = `\
# ${site.name}

> ${site.description}

${site.name} is run by ${site.counsellor}, a ${site.accreditation} with ${site.experience}. Sessions are warm, collaborative and led by the client, drawing mainly on Transactional Analysis alongside other evidence-based approaches.

## Services

${services.map((s) => `- **${s.title}**: ${s.points.join(", ")}`).join("\n")}

## Why clients choose ${site.shortName}

${trustPoints.map((t) => `- **${t.title}**: ${t.body}`).join("\n")}

## Practical information

- **Fee**: £${site.fees.session} per ${site.fees.duration}
- **Free consultation**: ${site.fees.consultation}
- **Session formats**: In person (${site.location.area}), telephone, or secure video
- **Location**: ${site.location.full} — ${site.location.note}
- **Areas served**: ${site.areasServed.join(", ")}
- **Cancellation policy**: 24 hours' notice required to rearrange without charge

## Availability

${formatAvailability()}

## Frequently asked questions

${faqs.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n")}

## Contact

- **Phone**: ${site.phone}
- **Email**: ${site.email}
- **Website**: ${site.url}

## Pages

- [Home](${site.url}/)
- [About ${site.counsellor}](${site.url}/about/)
- [Counselling Services](${site.url}/services/)
- [How It Works](${site.url}/how-it-works/)
- [Fees](${site.url}/fees/)
- [Availability & Booking](${site.url}/availability/)
- [FAQs](${site.url}/faqs/)
- [Contact](${site.url}/contact/)
- [Book a Free Consultation](${site.url}/free-consultation/)
- [Book a Session](${site.url}/booking/)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
