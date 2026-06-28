# Ivan Hall Counselling

A calm, modern, accessible marketing + booking website for a BACP-registered
counsellor in Winchester. Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**
and **GSAP** for gentle, reduced-motion-aware animations.

The homepage hero is an animated **Three.js** scene (`src/components/ui/horizon-hero-section.tsx`)
— a warm, re-themed "horizon" of soft motes and layered hills in the brand palette,
with pointer parallax and a split-text title reveal. It honours
`prefers-reduced-motion` (renders a single static frame) and is a self-contained,
single-screen hero.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

Home · About · Services · How It Works · Fees · Availability · FAQs · Contact,
plus the booking flows: **/free-consultation** and **/booking**.

## Editing content (no code knowledge needed)

| What | File |
| --- | --- |
| Name, phone, email, location, fees, nav | `src/lib/site.ts` |
| Services, process steps, trust points, FAQs | `src/lib/content.ts` |
| **Availability / diary** | `src/lib/availability.ts` |

### Updating availability

`src/lib/availability.ts` is the single source of truth for the diary:

- **`workingHours`** — your recurring weekly pattern (which times you offer on each
  weekday). Add or remove times here.
- **`blockedSlots`** — specific `"YYYY-MM-DD HH:mm"` slots to hide (holidays, already
  booked). Anything listed here disappears from the diary and the booking widget.

The Availability page and both booking widgets automatically show only slots that
are genuinely free.

## How booking works today

1. A visitor picks a format (in person / phone / video), a date and a time, and
   fills in their details (validated client- and server-side).
2. The form posts to **`/api/booking`**, which re-validates, **rejects
   double-bookings** (409), records the slot, and returns a booking reference.
3. The visitor sees a confirmation message; nothing is charged.

Enquiries are currently logged server-side via `console.log` so they're never lost
in development. **No personal data is sent anywhere external yet.**

## Connecting a real backend later

The UI is intentionally decoupled so you can plug in a provider without touching
components:

- **Email the counsellor** — replace `notifyCounsellor()` in
  `src/app/api/booking/route.ts` (and the log in `src/app/api/contact/route.ts`)
  with Resend / Nodemailer / SendGrid.
- **Supabase** — swap the in-memory `bookedSlots` Set for a `bookings` table with a
  unique constraint on `(date, time)`; replace `getAvailableSlots`/`getBookingDays`
  with a query.
- **Google Calendar** — create an event in `notifyCounsellor()` and derive
  availability from free/busy.
- **Calendly** — already wired on the **Availability** page. Set
  `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` (see `.env.example`) or paste a link into
  `CALENDLY_FALLBACK_URL` in `src/lib/site.ts`. The live, brand-themed calendar then
  renders automatically; until then a tasteful placeholder is shown. The embed lives
  in `src/components/booking/CalendlyInline.tsx`. To also use Calendly on `/booking`
  and `/free-consultation`, drop `<CalendlyInline url={calendly.url} />` into those
  pages in place of `<BookingWidget />`.

## Accessibility & SEO

- Semantic landmarks, skip link, focus-visible rings, `prefers-reduced-motion`
  handling, labelled form fields and accordion (`aria-expanded`/`aria-controls`).
- Per-page titles + descriptions, Open Graph/Twitter tags, `sitemap.xml`,
  `robots.txt`, and JSON-LD schema (`ProfessionalService`/`MedicalBusiness`,
  `FAQPage`, `BreadcrumbList`) for local search.
- A branded **OG/Twitter share image** is generated automatically at
  `src/app/opengraph-image.tsx` (no static file needed).
- Rich **local-business JSON-LD** (geo, opening hours, `areaServed`, offer catalogue,
  `Person` with BACP credential) is in `src/components/JsonLd.tsx`, driven by
  `src/lib/site.ts`.

### Local SEO — go-live checklist (drives footfall + leads)

On-site is done; these off-site/owner steps are what actually move local rankings:

1. In `src/lib/site.ts`, confirm/replace: `location.postcode` + `lat`/`lng` (use the
   real practice location), and add `profiles.googleBusiness` / `profiles.bacpDirectory`
   URLs (these feed schema `sameAs`).
2. **Create / claim a Google Business Profile** (category: *Counselor*), with the exact
   same Name-Address-Phone (NAP) as the site. This is the single biggest driver of map-pack
   visibility and calls.
3. **Gather reviews** on the Google Business Profile — volume + recency strongly affect
   the local pack. (Only add `aggregateRating` schema once real reviews exist.)
4. List the practice in **BACP's "Find a therapist" directory** and a few reputable
   directories (Counselling Directory, Psychology Today) with consistent NAP.
5. After deploy: submit `sitemap.xml` in **Google Search Console**, and validate the
   pages with the **Rich Results Test** and **PageSpeed Insights**.
