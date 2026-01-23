import { MetadataRoute } from "next";
import { getAllPublishedPages } from "@/lib/db";

const BASE_URL = "https://miam.quest";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/miam/exemptions`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mediation/what-is-mediation`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mediation/cost`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic pages from database
  let dbPages: MetadataRoute.Sitemap = [];
  try {
    const pages = await getAllPublishedPages();
    dbPages = pages.map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // If DB is unavailable, return static pages only
  }

  return [...staticPages, ...dbPages];
}
