import type { MetadataRoute } from "next";
import { nav, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>([
    ...nav.map((n) => n.href),
    "/booking",
    "/free-consultation",
  ]);

  return Array.from(paths).map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/availability" ? "daily" : "monthly",
    priority: path === "/" ? 1 : path === "/free-consultation" ? 0.9 : 0.7,
  }));
}
