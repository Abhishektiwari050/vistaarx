import type { Metadata } from "next";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import BlogClientPage from "./blog-client";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights — Sovereign AI Systems | VISTAR",
  description:
    "Technical essays, architecture teardowns, and engineering benchmarks on autonomous AI agents, private VPC vaults, and high-performance edge software from VISTAR's principal engineers.",
  keywords: [
    "AI engineering blog",
    "autonomous multi-agent architecture",
    "private VPC AI deployment",
    "Next.js 16 enterprise engineering",
    "deterministic AI workflows",
    "sovereign AI systems",
    "underdog software engineering",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Engineering Blog & Technical Insights — Sovereign AI Systems | VISTAR",
    description:
      "Deep technical teardowns, architectural blueprints, and engineering benchmarks from VISTAR's principal systems architects.",
    url: `${BASE_URL}/blog`,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "Engineering Blog & Technical Insights — Sovereign AI Systems | VISTAR",
    description:
      "Deep technical teardowns, architectural blueprints, and engineering benchmarks from VISTAR's principal systems architects.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${BASE_URL}/blog#blog`,
      url: `${BASE_URL}/blog`,
      name: "VISTAR Engineering Blog & Architectural Insights",
      description:
        "Technical essays, architecture teardowns, and engineering benchmarks on autonomous AI agents, private VPC vaults, and high-performance edge software.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      blogPost: BLOG_POSTS.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        url: `${BASE_URL}/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Engineering Blog", item: `${BASE_URL}/blog` },
      ],
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClientPage />
    </>
  );
}
