import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces `out/` for GitHub Pages (and any static host).
  // To migrate to Cloudflare Workers via OpenNext: remove `output` and
  // `images.unoptimized`, then use `npm run cf:deploy`.
  output: "export",

  // Required when serving from a GitHub Pages subdirectory URL
  // (https://mattpope-empyr.github.io/ivanhallcounselling/).
  // Remove this once the custom domain (www.ivanhallcounselling.co.uk) is live
  // and pointing at GitHub Pages — the custom domain serves from root.
  basePath: "/ivanhallcounselling",

  // GitHub Pages (and static hosts) serve `path/index.html` most reliably.
  trailingSlash: true,

  // Static export can't use the on-demand Image Optimization server.
  images: { unoptimized: true },
};

export default nextConfig;
