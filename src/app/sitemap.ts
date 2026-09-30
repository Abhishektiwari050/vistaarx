import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vistar.tech";
  const lastModified = new Date().toISOString();

  const blogPostEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "weekly",
    priority: 0.88,
  }));

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
      url: `${baseUrl}/network`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.94,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.93,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.92,
    },
    // ── Tier 2: Service landing pages ─────────────────────────────────────────
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${baseUrl}/platform`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.90,
    },
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
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.89,
    },
    // ── Tier 3: Blog posts & Technical Articles ─────────────────────────────
    ...blogPostEntries,
    // ── Tier 4: Trust & authority pages ──────────────────────────────────────
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
    // ── Tier 5: Legal / utility ───────────────────────────────────────────────
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
