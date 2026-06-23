import { site, formEndpoint } from "@/lib/site";

export type SendResult = "sent" | "mailto";

/**
 * Submit an enquiry without a backend (static site).
 *  - If a form endpoint (Formspree / Web3Forms) is configured, POST the fields to it.
 *  - Otherwise open the visitor's email client with the details pre-filled.
 * Throws on a failed POST so the caller can show an error.
 */
export async function sendEnquiry(opts: {
  subject: string;
  fields: Record<string, string>;
}): Promise<SendResult> {
  const { subject, fields } = opts;

  if (formEndpoint) {
    const res = await fetch(formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, ...fields }),
    });
    if (!res.ok) throw new Error("Form submission failed");
    return "sent";
  }

  // Fallback: prefilled email to the counsellor.
  const body = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return "mailto";
}
