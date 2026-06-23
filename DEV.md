# Local development

## Run the site locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Edits hot-reload as you save.

## Test the real Cloudflare Worker locally (optional)

This runs the production build inside Cloudflare's `workerd` runtime — the closest
thing to live, useful before deploying:

```bash
npm run cf:preview
```

## Environment variables (dev)

Create `.env.local` in the project root (copy from `.env.example`). It is git-ignored.

```bash
# Live Calendly calendar on the Availability page (optional in dev).
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-handle/free-consultation
```

> `NEXT_PUBLIC_*` values are read at **build time**. After changing `.env.local`,
> restart `npm run dev`. For the deployed Worker, the value must be present when you
> run `npm run cf:deploy` (or paste it into `CALENDLY_FALLBACK_URL` in `src/lib/site.ts`).

For Cloudflare-runtime secrets used by `cf:preview` (none needed today, but e.g. an
email API key later), put them in a git-ignored `.dev.vars` file:

```
# .dev.vars  (local Worker bindings only)
RESEND_API_KEY=...
```

## Where the pages live

App Router — each route is a folder under `src/app/`:

| Page | File |
| --- | --- |
| Home | `src/app/page.tsx` |
| About | `src/app/about/page.tsx` |
| Services | `src/app/services/page.tsx` |
| How It Works | `src/app/how-it-works/page.tsx` |
| Fees | `src/app/fees/page.tsx` |
| Availability | `src/app/availability/page.tsx` |
| Booking | `src/app/booking/page.tsx` |
| Free Consultation | `src/app/free-consultation/page.tsx` |
| FAQs | `src/app/faqs/page.tsx` |
| Contact | `src/app/contact/page.tsx` |
| API (booking/contact) | `src/app/api/*/route.ts` |

Shared building blocks: `src/components/` (sections, booking, ui).

## Editing content (no React needed)

| What | File |
| --- | --- |
| Name, phone, email, location, fees, areas served | `src/lib/site.ts` |
| Services, process steps, trust points, FAQs | `src/lib/content.ts` |
| Availability / diary slots | `src/lib/availability.ts` |

## Handy commands

```bash
npm run dev          # local dev server (hot reload)
npm run build        # production build (catches type/SSR errors)
npx tsc --noEmit     # type-check only
npm run cf:preview   # run the Worker build locally in workerd
npm run cf:deploy    # build + deploy to Cloudflare Workers
```
