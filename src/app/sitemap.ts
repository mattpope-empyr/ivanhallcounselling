import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), "src/app");

function discoverRoutes(dir: string, urlSegment: string): string[] {
  const results: string[] = [];

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  if (entries.some((e) => e.isFile() && e.name.startsWith("page."))) {
    results.push(urlSegment || "/");
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name === "api" || name.startsWith("_") || name.startsWith(".")) continue;
    // Route groups like "(marketing)" don't add a URL segment
    const childSegment = name.startsWith("(")
      ? urlSegment
      : `${urlSegment}/${name}`;
    results.push(...discoverRoutes(path.join(dir, name), childSegment));
  }

  return results;
}

const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/free-consultation": 0.9,
  "/services": 0.8,
  "/about": 0.8,
};

const CHANGE_FREQ: Record<
  string,
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  "/availability": "daily",
};

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return discoverRoutes(APP_DIR, "").map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}/`,
    lastModified: new Date(),
    changeFrequency: CHANGE_FREQ[route] ?? "monthly",
    priority: PRIORITY[route] ?? 0.7,
  }));
}
