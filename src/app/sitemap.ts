import type { MetadataRoute } from "next";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";
import { useCases } from "@/data/useCases";

export const dynamic = "force-static";

const baseUrl = "https://agentverden.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/agenter",
    "/emner",
    "/nytt",
    "/om",
    "/send-inn",
    "/personvern",
    "/ansvarsfraskrivelse",
    "/ebok",
  ].map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified: new Date(),
  }));

  const agentRoutes = agents.map((a) => ({
    url: `${baseUrl}/agenter/${a.slug}/`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${baseUrl}/emner/${c.slug}/`,
    lastModified: new Date(),
  }));

  const articleRoutes = useCases
    .filter((u) => articles[u.id])
    .map((u) => ({
      url: `${baseUrl}/bruk/${u.id}`,
      lastModified: new Date(),
    }));

  return [...staticRoutes, ...agentRoutes, ...categoryRoutes, ...articleRoutes];
}
