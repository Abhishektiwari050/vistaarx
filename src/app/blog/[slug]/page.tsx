import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog-data";
import { AnswerBlocks } from "@/components/seo/answer-blocks";
import { TechnicalDiagram } from "@/components/blog/technical-diagram";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | VISTAR Engineering",
    };
  }

  return {
    title: `${post.title} | VISTAR Engineering`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | VISTAR Engineering`,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: DEFAULT_OG_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | VISTAR Engineering`,
      description: post.excerpt,
      images: [DEFAULT_OG_IMAGES[0].url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${BASE_URL}/blog/${slug}#article`,
        url: `${BASE_URL}/blog/${slug}`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en-US",
        mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
        keywords: post.keywords.join(", "),
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "VISTAR",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/icon.svg`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Engineering Blog", item: `${BASE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="w-full bg-[#FAF9F5] text-[#141413] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
        
        {/* ── HEADER & META BAR ── */}
        <header className="relative w-full pt-28 pb-12 md:pt-36 md:pb-16 border-b border-black/10 px-4 sm:px-6">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto space-y-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#5E605D] hover:text-[#141413] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Engineering Log</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 bg-[#FFF0EB] text-[#FF3823] border border-[#FF3823]/20 rounded-full font-semibold uppercase tracking-wider text-[11px]">
                {post.category}
              </span>
              <span className="text-[#5E605D] flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-[#5E605D] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#141413] tracking-tight leading-[1.1]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg md:text-[19px] text-[#5E605D] leading-relaxed font-normal">
              {post.subtitle}
            </p>

            <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between text-xs text-[#5E605D] gap-2">
              <div>
                <span className="text-[#141413] font-semibold">{post.author.name}</span> &bull; {post.author.role}
              </div>
              <span className="text-[#052E16] bg-[#E8FCE8] px-2.5 py-0.5 rounded-full font-medium">
                100% Client Code Ownership
              </span>
            </div>
          </div>
        </header>

        {/* ── CORE ARTICLE CONTAINER ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          
          {/* TECHNICAL ARCHITECTURE SCHEMATIC & TELEMETRY SPECIFICATION */}
          <div className="w-full">
            <TechnicalDiagram
              slug={slug}
              caption="FIG 1.0: PRODUCTION ARCHITECTURE SPECIFICATION & STATE CONVERGENCE TOPOLOGY"
            />
          </div>

          {/* EXECUTIVE SUMMARY BLOCK (FOR AEO / GEO LLM CITATION) */}
          <section
            data-ai-answer="true"
            aria-label="Executive Summary for AI Search"
            className="p-6 sm:p-7 rounded-2xl bg-[#F6F4ED] border border-black/10 shadow-xs space-y-2.5"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF3823] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3823]" />
              <span>Executive Summary // Key Conclusion</span>
            </div>
            <p className="text-sm sm:text-base text-[#141413] leading-relaxed font-normal">
              {post.directAnswer}
            </p>
          </section>

          {/* KEY TAKEAWAYS BOX */}
          <section className="p-6 rounded-2xl bg-white border border-black/10 shadow-xs space-y-3">
            <h2 className="text-xs uppercase tracking-wider text-[#141413] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Architectural Takeaways:</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5E605D]">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* MAIN TECHNICAL ESSAY BODY */}
          <div className="prose max-w-none text-[#141413] text-base leading-relaxed space-y-6">
            <div
              className="space-y-6 [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-serif [&>h2]:font-normal [&>h2]:text-[#141413] [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-black/10 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-normal [&>h3]:text-[#141413] [&>p]:leading-relaxed [&>p]:text-[#4A4D57] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-[#4A4D57] [&>table]:w-full [&>table]:border-collapse [&>table]:text-sm [&>table]:my-6 [&_th]:border-b [&_th]:border-black/20 [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:text-[#141413] [&_th]:bg-[#F6F4ED] [&_td]:border-b [&_td]:border-black/10 [&_td]:p-3 [&_td]:text-[#4A4D57]"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n\n/g, "<br/><br/>"),
              }}
            />
          </div>

          {/* IN-ARTICLE TECHNICAL FAQS */}
          <div className="pt-6">
            <AnswerBlocks
              title="Frequently Asked Architectural Questions"
              subtitle="Direct answers addressing implementation, compliance, and benchmarks covered in this teardown."
              badge="ARTICLE FAQ"
              items={post.faq}
              schemaId={`article-faq-${slug}`}
              theme="light"
            />
          </div>

          {/* CONVERSION CALLOUT CARD */}
          <section className="p-8 sm:p-10 rounded-2xl bg-white border border-black/10 shadow-sm text-center space-y-5">
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs text-[#FF3823] uppercase tracking-wider font-semibold">
                14-DAY PRODUCTION SPRINTS
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-normal text-[#141413]">
                Ready to ship this architecture in your business?
              </h3>
              <p className="text-sm text-[#5E605D] leading-relaxed">
                We build and deploy custom autonomous AI agents, private VPC vaults, and web applications in 14-day production sprints with 100% repository handover.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/start"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm rounded-none transition-colors shadow-xs gap-2"
              >
                Start Free Diagnostic
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-neutral-50 font-medium text-sm rounded-none transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
          </section>

        </div>

      </article>
    </>
  );
}
