# Deployment

## Current hosting: GitHub Pages

The site deploys automatically via GitHub Actions. Every push to `main` runs
`npm run build` and publishes the `out/` folder to GitHub Pages.

No manual steps needed for routine updates — just push to `main`.

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

## Future: migrating to Cloudflare Workers

The project already includes `open-next.config.ts`, `wrangler.jsonc`, and
`cf:*` npm scripts for a future move to Cloudflare Workers (which adds full
SSR, API routes, and edge caching).

When you're ready:

1. In `next.config.ts`, remove `output: "export"` and `images: { unoptimized: true }`.
2. Run `npm run cf:deploy` to build and deploy to Cloudflare Workers.
3. Update DNS to point the domain at Cloudflare (Workers will handle HTTPS).
4. Delete or archive `.github/workflows/deploy.yml` (GitHub Actions no longer needed).
