import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.vistar.tech";

  return {
    rules: [
      // ── Default: all crawlers ────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/tokens",
          "/scratch/",
          "/scripts/",
        ],
      },
      // ── Google: no restrictions beyond API ──────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ── Bing ────────────────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ── AI / LLM crawlers: allow full indexing ───────────────────────────
      // These feed LLM knowledge bases and AI search products.
      // Blocking them hinders brand discovery in ChatGPT, Perplexity, etc.
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
