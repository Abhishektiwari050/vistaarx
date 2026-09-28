import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vistar.tech";
  const lastModified = new Date().toISOString();

  return [
    // ── Tier 1: Core money pages ─────────────────────────────────────────────
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.92,
    },
    // ── Tier 2: Service landing pages ─────────────────────────────────────────
    {
      url: `${baseUrl}/services/ai-solutions`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/services/nextjs-engineering`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/services/interactive-3d`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    // ── Tier 3: Trust & authority pages ──────────────────────────────────────
    {
      url: `${baseUrl}/vectors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${baseUrl}/philosophy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.80,
    },
    {
      url: `${baseUrl}/start`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    // ── Tier 4: Legal / utility ───────────────────────────────────────────────
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.30,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.30,
    },
  ];
}
