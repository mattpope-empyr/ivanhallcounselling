import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext configuration for deploying this Next.js app to Cloudflare Workers.
 *
 * CURRENTLY UNUSED — the site is hosted on GitHub Pages (static export).
 *
 * To activate Cloudflare Workers deployment:
 *   1. Remove `output: "export"` and `images: { unoptimized: true }` from next.config.ts
 *   2. Run `npm run cf:deploy`
 *   3. Update DNS to point the domain at Cloudflare Workers
 *
 * When you want ISR / cached dynamic pages, enable an incremental cache:
 *   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
 *   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
 */
export default defineCloudflareConfig({});
