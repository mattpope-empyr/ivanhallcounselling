import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — produces `out/` for GitHub Pages (and any static host).
  // To migrate to Cloudflare Workers via OpenNext: remove `output` and
  // `images.unoptimized`, then use `npm run cf:deploy`.
  output: "export",

  // Subdirectory prefix for GitHub Pages (mattpope-empyr.github.io/ivanhallcounselling).
  // Set via NEXT_PUBLIC_BASE_PATH in the workflow so it can be dropped in one
  // place when the custom domain (www.ivanhallcounselling.co.uk) goes live.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // GitHub Pages (and static hosts) serve `path/index.html` most reliably.
  trailingSlash: true,

  // Custom loader applies NEXT_PUBLIC_BASE_PATH to every next/image src so
  // images resolve correctly under the subdirectory on GitHub Pages.
  // Switch to `unoptimized: true` (and remove loaderFile) when the custom
  // domain is live and NEXT_PUBLIC_BASE_PATH is no longer set.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
