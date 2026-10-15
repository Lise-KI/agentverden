import type { MetadataRoute } from "next";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";

export const dynamic = "force-static";

const baseUrl = "https://agentverden.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/agenter",
    "/emner",
    "/nytt",
    "/om",
    "/personvern",
    "/ansvarsfraskrivelse",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const agentRoutes = agents.map((a) => ({
    url: `${baseUrl}/agenter/${a.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${baseUrl}/emner/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...agentRoutes, ...categoryRoutes];
}
