"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles, Terminal, ShieldCheck } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";

const BLOG_FAQ_ITEMS: QAPair[] = [
  {
    category: "EDITORIAL RIGOR",
    question: "Why does VISTAR publish open technical blueprints and architecture essays?",
    answer:
      "VISTAR publishes detailed engineering teardowns to demonstrate mathematical rigor and expose the structural flaws of bloated consultancies. We believe enterprises deserve radical technical transparency, reproducible benchmarks, and concrete state-machine specifications rather than marketing fluff.",
    keyPoints: [
      "Written directly by principal systems architects who ship code",
      "Reproducible technical specifications and mathematical state graphs",
      "Full transparency on private VPC deployment and multi-agent consensus",
    ],
  },
  {
    category: "BENCHMARKS & CITATIONS",
    question: "Are the benchmarks and architectures in these essays tested in production?",
    answer:
      "Yes. Every technical architecture published by VISTAR is drawn directly from active production systems—including Project VAYU (cockpit GIS), AURA (healthcare biometrics), and 3axis Arc (60fps spatial 3D)—with verified sub-40ms latency and 99.8% precision metrics.",
    keyPoints: [
      "Production-tested across aviation, healthcare, and high-frequency PropTech",
      "Verified sub-40ms P95 latency across 16 global Points of Presence",
      "Backed by 100% private GitHub repository transfers and Docker containers",
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
    <div className="w-full bg-[#060709] text-[#ECEEF5] font-sans antialiased selection:bg-[#3B82F6] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: CINEMATIC OBSIDIAN HERO ── */}
      <section className="relative w-full pt-28 pb-20 md:pt-36 md:pb-24 border-b border-white/10 overflow-hidden px-4 sm:px-6">
        {/* Subtle Edge Grid Background */}
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />
        
        {/* Radial Ambient Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-600/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#959CB3]">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>VISTAR ENGINEERING LOG // AEO &amp; GEO DISCOVERY HUB</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.08]">
            Technical Blueprints. <br />
            <span className="text-[#959CB3] italic">Zero Agency Fluff.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#959CB3] max-w-2xl mx-auto leading-relaxed">
            Deep architectural essays, mathematical state-machine benchmarks, and sovereign cloud teardowns written directly by principal systems engineers.
          </p>

          {/* Category Filter Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {["All", "Underdog Manifesto", "Autonomous Systems", "Sovereign Cloud"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-white text-black font-semibold border-white"
                    : "bg-white/5 text-[#959CB3] border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 2: FEATURED ARTICLE HERO CARD ── */}
      {selectedCategory === "All" && (
        <section className="w-full py-12 px-4 sm:px-6 bg-[#0A0B10] border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-[#0D0E15] border border-white/10 hover:border-blue-500/50 rounded-xl p-6 sm:p-10 transition-all duration-200 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-3xl pointer-events-none" />
              
              <div className="space-y-4 max-w-4xl relative z-10">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-semibold uppercase">
                    FEATURED SPEC // {featuredPost.category}
                  </span>
                  <span className="text-[#959CB3] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.date}
                  </span>
                  <span className="text-[#959CB3] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm sm:text-base text-[#959CB3] leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Direct Answer Preview Block (AEO / GEO Engine) */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300">
                  <span className="text-blue-400 font-bold uppercase tracking-wider block mb-1">
                    // AEO DIRECT ANSWER SUMMARY:
                  </span>
                  <p className="text-xs leading-relaxed text-neutral-300">
                    {featuredPost.directAnswer}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-white group-hover:text-blue-400 transition-colors">
                  <span>Read Full Technical Teardown</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── FRAME 3: ARTICLES GRID ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#060709] border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#959CB3]">
              // ALL ARCHITECTURAL RELEASES ({filteredPosts.length})
            </h3>
            <span className="font-mono text-xs text-[#959CB3]">
              100% REPOSITORY HANDOVER ETHOS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#0D0E15] border border-white/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-neutral-300 rounded text-[10px] uppercase font-semibold">
                      {post.category}
                    </span>
                    <span className="text-[#959CB3] text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="font-serif text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </h4>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#959CB3] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500 text-[11px]">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-white group-hover:text-blue-400 flex items-center gap-1 font-semibold transition-colors"
                  >
                    Read Spec <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 4: TECHNICAL ANSWER BLOCKS (DARK THEME) ── */}
      <AnswerBlocks
        title="Engineering Publication & Editorial Answers"
        subtitle="Canonical answers addressing VISTAR's open-source architecture teardowns, benchmarking standards, and production verification."
        badge="PUBLIC SPECIFICATION"
        items={BLOG_FAQ_ITEMS}
        schemaId="blog-faq-schema"
        theme="dark"
      />

      {/* ── FRAME 5: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-24 px-4 sm:px-6 bg-[#0A0B10] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
            Deploy these architectures in your cloud
          </h2>
          <p className="text-sm sm:text-base text-[#959CB3] max-w-xl mx-auto">
            VISTAR engineers deliver production AI software, private VPC vaults, and edge platforms in 14-day guaranteed sprints with 100% repository handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/start"
              className="bg-white hover:bg-neutral-200 text-black px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150 inline-flex items-center gap-2"
            >
              Start Architecture Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm transition-all duration-150"
            >
              Contact Principal Engineers
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
