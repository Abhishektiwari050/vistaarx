"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";
import {
  RKLaxmanCartoon,
  getCartoonSceneForSlug,
  getCartoonCaptionForSlug,
} from "@/components/blog/rk-laxman-cartoon";

const BLOG_FAQ_ITEMS: QAPair[] = [
  {
    category: "EDITORIAL PHILOSOPHY",
    question: "Why does VISTAR present its engineering log as an R.K. Laxman editorial broadsheet?",
    answer:
      "Because software engineering in the enterprise AI era has reached peak absurdity. Between $200k slide decks, fragile prompt wrappers, and buzzword bingo, the classic R.K. Laxman 'Common Man' perspective is the most honest way to contrast bloated agency pretension with lean, working production code.",
    keyPoints: [
      "Satirical editorial cartoons highlighting real architectural absurdities",
      "Written directly by principal engineers who write and ship working software",
      "Zero agency fluff, zero vendor lock-in, 100% private GitHub repository handover",
    ],
  },
  {
    category: "ENGINEERING ESSAYS",
    question: "Why does VISTAR publish open technical blueprints and architecture teardowns?",
    answer:
      "VISTAR publishes practical engineering teardowns to show how real production software is built. We believe founders and engineering leaders deserve clear explanations, reproducible architectures, and honest discussions about tradeoffs rather than marketing fluff.",
    keyPoints: [
      "Written directly by principal software engineers who build and ship code",
      "Real-world architecture breakdowns from production deployments",
      "Complete transparency on cloud setups, multi-agent systems, and security",
    ],
  },
  {
    category: "PRODUCTION VERIFICATION",
    question: "Are the architectures described in these essays tested in production?",
    answer:
      "Yes. Every technical guide is based on active systems we've shipped—including aviation telemetry in Project VAYU, healthcare biometric detection in AURA, and 60fps spatial 3D in 3axis Arc.",
    keyPoints: [
      "Tested under live production workloads across aerospace, healthcare, and PropTech",
      "Engineered for sub-50ms response times and high reliability",
      "Delivered with 100% private GitHub repository ownership and zero vendor lock-in",
    ],
  },
];

export default function BlogClientPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="w-full bg-[#FAF7F0] text-[#141413] font-serif antialiased selection:bg-[#1A1A1A] selection:text-[#FAF7F0] min-h-screen">
      
      {/* ── NEWSPAPER TOP TICKER & DATELINE ── */}
      <div className="w-full bg-[#F0ECE1] border-b-2 border-[#1A1A1A] pt-24 pb-2 px-4 sm:px-6 font-mono text-[11px] text-[#444] uppercase tracking-wider">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 border-b border-black/20 pb-2">
          <span>THE VISTAR CHRONICLE • VOL. XLII NO. 14</span>
          <span>EDITION: LUCKNOW / BENGALURU / GLOBAL</span>
          <span className="text-[#FF3823] font-bold">CIRCULATION: LEAN ENGINEERING HOMES</span>
        </div>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 pt-1.5 text-[10px] text-[#666]">
          <span>WEATHER: 100% PROBABILITY OF AGENCY OVERHEAD</span>
          <span>AIR QUALITY: HEAVY WITH AI BUZZWORDS</span>
          <span className="font-semibold text-[#141413]">PRICE: FREE PRIVATE REPO HANDOVER</span>
        </div>
      </div>

      {/* ── MASTHEAD HEADER ── */}
      <header className="relative w-full pt-6 pb-8 border-b-4 border-double border-[#1A1A1A] px-4 sm:px-6 text-center bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-[#1A1A1A] flex-1 max-w-[120px] hidden sm:block" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#555] font-semibold">
              JOURNAL OF DETERMINISTIC COMPUTING &amp; REAL SOFTWARE
            </span>
            <div className="h-px bg-[#1A1A1A] flex-1 max-w-[120px] hidden sm:block" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black text-[#1A1A1A] tracking-tight uppercase leading-[0.95]">
            The Vistar Chronicle
          </h1>

          <div className="border-t-2 border-b-2 border-[#1A1A1A] py-1.5 flex flex-wrap items-center justify-between text-xs sm:text-sm font-serif italic text-[#333] max-w-4xl mx-auto">
            <span>&ldquo;Published by the Engineers Who Ship the Code&rdquo;</span>
            <span className="font-mono not-italic text-[11px] uppercase tracking-wider text-[#666]">
              NO SLIDE DECKS • ZERO HOURLY BILLING • SHIPPED IN 14 DAYS
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#4A4B48] max-w-2xl mx-auto leading-relaxed pt-2">
            In-depth guides on autonomous AI agents, private cloud infrastructure, and the absurdity of 50-person agency retainers.
          </p>

          {/* Category Filter Chips */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 font-sans">
            {["All", "Underdog Manifesto", "Autonomous Systems", "Sovereign Cloud", "Edge Performance"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 border border-[#1A1A1A] text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#1A1A1A]"
                    : "bg-white text-[#333] hover:bg-[#F3EFE0] shadow-[1px_1px_0px_#1A1A1A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── FRAME 1: THE FRONT-PAGE R.K. LAXMAN "YOU SAID IT" EDITORIAL CARTOON ── */}
      {selectedCategory === "All" && (
        <section className="w-full py-10 px-4 sm:px-6 bg-[#F5F1E6] border-b-2 border-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF3823] font-bold">
                ★ TODAY&rsquo;S EDITORIAL CARTOON ★
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-1">
                The Anatomy of the $200,000 Agency Retainer
              </h2>
            </div>

            <RKLaxmanCartoon
              scene="master-daily"
              caption="He assures us the AI architecture is 100% autonomous, Sharma-ji... it only requires twenty-four consultants, three daily status calls, and an annual $500,000 retainer to click 'Regenerate'!"
              subcaption="YOU SAID IT • Hand-Drawn Editorial Satire on Enterprise AI Consultancies"
              className="max-w-4xl mx-auto"
            />
          </div>
        </section>
      )}

      {/* ── FRAME 2: FEATURED ESSAY (BROADSHEET LEAD STORY) ── */}
      {selectedCategory === "All" && (
        <section className="w-full py-12 px-4 sm:px-6 bg-[#FAF7F0] border-b-2 border-[#1A1A1A]">
          <div className="max-w-6xl mx-auto">
            <div className="border-b-2 border-[#1A1A1A] pb-2 mb-6 flex items-center justify-between font-mono text-xs text-[#555]">
              <span className="uppercase tracking-widest font-bold text-[#1A1A1A]">
                LEAD INVESTIGATION &bull; FRONT PAGE FEATURE
              </span>
              <span>READING TIME: {featuredPost.readTime}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Story headline, excerpt & deep dive */}
              <div className="lg:col-span-7 space-y-4 font-sans">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 bg-[#FF3823] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="text-[#666] font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] hover:text-[#FF3823] transition-colors leading-[1.08]">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="font-serif italic text-base sm:text-lg text-[#444] leading-relaxed">
                  {featuredPost.subtitle}
                </p>

                <p className="text-sm sm:text-base text-[#555] leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Newsprint Editorial Callout */}
                <div className="bg-[#F3EFE0] border-l-4 border-[#1A1A1A] p-4 text-xs sm:text-sm text-[#222] font-serif leading-relaxed">
                  <span className="font-mono text-[10px] text-[#FF3823] font-bold uppercase tracking-wider block mb-1">
                    EXECUTIVE FINDING:
                  </span>
                  {featuredPost.directAnswer}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-mono uppercase tracking-wider shadow-[3px_3px_0px_#FF3823] transition-all"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Hand-drawn Editorial Vignette for this post */}
              <div className="lg:col-span-5">
                <RKLaxmanCartoon
                  scene={getCartoonSceneForSlug(featuredPost.slug)}
                  caption={getCartoonCaptionForSlug(featuredPost.slug).caption}
                  subcaption={getCartoonCaptionForSlug(featuredPost.slug).subcaption}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FRAME 3: EDITORIAL ARTICLES GRID WITH LAXMAN CARTOONS ── */}
      <section className="w-full py-16 px-4 sm:px-6 bg-[#FAF7F0] border-b-2 border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-3">
            <h3 className="font-serif text-2xl font-bold uppercase tracking-tight text-[#1A1A1A]">
              Dispatches &amp; Technical Blueprints ({filteredPosts.length})
            </h3>
            <span className="font-mono text-xs uppercase tracking-wider text-[#666] hidden sm:inline">
              100% Sovereign Code • Zero Retainers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => {
              const cartoonMeta = getCartoonCaptionForSlug(post.slug);
              const scene = getCartoonSceneForSlug(post.slug);

              return (
                <article
                  key={post.slug}
                  className="bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[6px_6px_0px_#FF3823] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="space-y-4">
                    {/* Integrated Laxman Cartoon Drawing for each article */}
                    <div className="border border-[#1A1A1A] bg-[#FAF7F0]">
                      <RKLaxmanCartoon
                        scene={scene}
                        caption={cartoonMeta.caption}
                        subcaption={cartoonMeta.subcaption}
                        interactive={false}
                        className="border-none shadow-none p-3 sm:p-4"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="px-2 py-0.5 bg-[#FAF7F0] border border-[#1A1A1A] text-[#1A1A1A] font-bold text-[10px] uppercase">
                        {post.category}
                      </span>
                      <span className="text-[#666] text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] hover:text-[#FF3823] transition-colors leading-snug">
                        {post.title}
                      </h4>
                    </Link>

                    <p className="font-sans text-xs sm:text-sm text-[#555] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#777]">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#1A1A1A] hover:text-[#FF3823] flex items-center gap-1 font-bold uppercase tracking-wider transition-colors"
                    >
                      Read Teardown <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FRAME 4: TECHNICAL ANSWER BLOCKS ── */}
      <div className="border-b-2 border-[#1A1A1A] bg-[#FAF7F0]">
        <AnswerBlocks
          title="Editorial Standards & Engineering Blueprints"
          subtitle="Direct answers regarding our open-source blueprints, production benchmarks, and software delivery model."
          badge="EDITORIAL DISCLOSURE"
          items={BLOG_FAQ_ITEMS}
          schemaId="blog-faq-schema"
          theme="light"
        />
      </div>

      {/* ── FRAME 5: BOTTOM BROADSHEET CALL-TO-ACTION ── */}
      <section className="w-full py-16 px-4 sm:px-6 bg-[#F5F1E6] text-center border-t-2 border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF3823] font-bold">
            ★ ESCAPE THE AGENCY CYCLE ★
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#1A1A1A] tracking-tight">
            Stop Paying for Prompts. Build Sovereign Software.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#555] max-w-xl mx-auto leading-relaxed">
            We deliver production Next.js 16 portals, WhatsApp automation workflows, and spatial 3D platforms in fixed 14-day sprints with 100% private GitHub repository transfer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 font-mono">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#1A1A1A] transition-all gap-2"
            >
              Inspect Packages (from ₹49k / $600)
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] bg-white hover:bg-[#F3EFE0] font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#1A1A1A] transition-all"
            >
              Direct Founder Call
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
