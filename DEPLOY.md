# Deployment

## Current hosting: GitHub Pages

The site deploys automatically via GitHub Actions. Every push to `main` runs
`npm run build` and publishes the `out/` folder to GitHub Pages.

No manual steps needed for routine updates — just push to `main`.

### First-time setup (one-off)

1. In the GitHub repo → **Settings → Pages → Build and deployment**, set Source
   to **GitHub Actions**.
2. Push to `main`. The Actions tab will show the deployment progress.
3. The site will be live at the URL shown in Settings → Pages.

### Custom domain

`public/CNAME` sets the domain to `www.ivanhallcounselling.co.uk`. You also
need to configure DNS at your registrar:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| CNAME | www  | `mattpope-empyr.github.io`   |

Then in GitHub → Settings → Pages → Custom domain, enter
`www.ivanhallcounselling.co.uk` and enable **Enforce HTTPS**.

> GitHub automatically redirects the apex domain (`ivanhallcounselling.co.uk`)
> to `www` once the CNAME record resolves.

### Manual / emergency deploy

```bash
npm install
npm run build
# Upload the out/ folder manually via GitHub Pages → upload assets,
# or trigger the workflow from the Actions tab (workflow_dispatch).
```

---

## Forms & booking

Forms use `sendEnquiry` in `src/lib/sendEnquiry.ts` — no server required:

- **Default:** opens the visitor's email app, pre-filled and addressed to
  `hello@ivanhallcounselling.co.uk`.
- **Automatic submissions:** create a free [Formspree](https://formspree.io)
  form and set `NEXT_PUBLIC_FORM_ENDPOINT` in a GitHub Actions secret (or paste
  the endpoint into `FORM_ENDPOINT_FALLBACK` in `src/lib/site.ts`), then push.

---

## Before going live checklist

- [ ] Confirm `site.url` in `src/lib/site.ts` matches the live domain.
- [ ] Confirm phone number and BACP membership number are current.
- [ ] Set up custom domain DNS (see above) and enable Enforce HTTPS.
- [ ] Submit `sitemap.xml` in Google Search Console after first deploy.

---

## Future: migrating to Cloudflare Workers

The project already includes `open-next.config.ts`, `wrangler.jsonc`, and
`cf:*` npm scripts for a future move to Cloudflare Workers (which adds full
SSR, API routes, and edge caching).

When you're ready:

1. In `next.config.ts`, remove `output: "export"` and `images: { unoptimized: true }`.
2. Run `npm run cf:deploy` to build and deploy to Cloudflare Workers.
3. Update DNS to point the domain at Cloudflare (Workers will handle HTTPS).
4. Delete or archive `.github/workflows/deploy.yml` (GitHub Actions no longer needed).
