import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/pop-up", priority: 0.9, freq: "weekly" },
    { path: "/employers", priority: 0.8, freq: "monthly" },
    { path: "/fleet", priority: 0.8, freq: "monthly" },
    { path: "/reviews", priority: 0.6, freq: "weekly" },
    { path: "/about", priority: 0.5, freq: "monthly" },
  ];
  return pages.map((p) => ({ url: `${site.url}${p.path === "/" ? "/" : p.path + "/"}`, lastModified: now, changeFrequency: p.freq, priority: p.priority }));
}
