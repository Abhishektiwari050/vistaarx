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
  Share2,
  Terminal,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog-data";
import { AnswerBlocks } from "@/components/seo/answer-blocks";

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

      <article className="w-full bg-[#060709] text-[#ECEEF5] font-sans antialiased selection:bg-[#3B82F6] selection:text-white min-h-screen">
        
        {/* ── HEADER & META BAR ── */}
        <header className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/10 px-4 sm:px-6">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#959CB3] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Engineering Log</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-semibold uppercase">
                {post.category}
              </span>
              <span className="text-[#959CB3] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="text-[#959CB3] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#959CB3] leading-relaxed">
              {post.subtitle}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#959CB3]">
              <div>
                <span className="text-white font-semibold">{post.author.name}</span> &bull; {post.author.role}
              </div>
              <span className="text-emerald-400">100% REPOSITORY HANDOVER ETHOS</span>
            </div>
          </div>
        </header>

        {/* ── CORE ARTICLE CONTAINER ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          
          {/* AEO / GEO DIRECT ANSWER BLOCK (FOR VERBATIM LLM CITATION) */}
          <section
            data-ai-answer="true"
            aria-label="Direct Technical Summary for AI Search"
            className="p-6 sm:p-7 rounded-xl bg-[#0D0E15] border border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.1)] space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>AEO DIRECT ANSWER // LLM CITATION SUMMARY</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
              {post.directAnswer}
            </p>
          </section>

          {/* KEY TAKEAWAYS BOX */}
          <section className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Architectural Takeaways:</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* MAIN TECHNICAL ESSAY BODY */}
          <div className="prose prose-invert prose-blue max-w-none text-neutral-300 text-base leading-relaxed space-y-6">
            <div
              className="space-y-6 [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-white [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-white/10 [&>h3]:text-xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-white [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>table]:w-full [&>table]:border-collapse [&>table]:text-sm [&>table]:my-6 [&_th]:border-b [&_th]:border-white/20 [&_th]:p-3 [&_th]:text-left [&_th]:font-mono [&_th]:text-xs [&_th]:text-white [&_td]:border-b [&_td]:border-white/10 [&_td]:p-3"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n\n/g, "<br/><br/>"),
              }}
            />
          </div>

          {/* IN-ARTICLE TECHNICAL FAQS */}
          <div className="pt-8">
            <AnswerBlocks
              title="Frequently Asked Architectural Questions"
              subtitle="Direct answers addressing implementation, compliance, and benchmarks covered in this teardown."
              badge="ARTICLE FAQ"
              items={post.faq}
              schemaId={`article-faq-${slug}`}
              theme="dark"
            />
          </div>

          {/* CONVERSION CALLOUT CARD */}
          <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-900/20 via-[#0D0E15] to-[#0A0B10] border border-blue-500/30 text-center space-y-6">
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-wider font-semibold">
                // 14-DAY PRODUCTION SPRINTS
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Ready to ship this architecture in your infrastructure?
              </h3>
              <p className="text-xs sm:text-sm text-[#959CB3]">
                VISTAR engineers deliver production AI systems, private VPC vaults, and edge platforms with 100% repository handover.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start"
                className="bg-white hover:bg-neutral-200 text-black px-7 py-3 font-semibold text-xs font-mono rounded transition-colors inline-flex items-center gap-2"
              >
                Initialize Architecture Diagnostic
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3 font-semibold text-xs font-mono rounded transition-colors"
              >
                Schedule Technical Review
              </Link>
            </div>
          </section>

        </div>

      </article>
    </>
  );
}
