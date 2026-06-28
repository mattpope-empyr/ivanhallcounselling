import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces `out/` for GitHub Pages (and any static host).
  // To migrate to Cloudflare Workers via OpenNext: remove `output` and
  // `images.unoptimized`, then use `npm run cf:deploy`.
  output: "export",

  // GitHub Pages (and static hosts) serve `path/index.html` most reliably.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
