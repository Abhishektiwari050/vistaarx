"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar, Shield, Cpu, Terminal } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";
import {
  TechnicalDiagram,
  getDiagramTypeForSlug,
} from "@/components/blog/technical-diagram";

const BLOG_FAQ_ITEMS: QAPair[] = [
  {
    category: "ENGINEERING SPECIFICATIONS",
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
  {
    category: "CODE SOVEREIGNTY",
    question: "What does 100% private repository handover include?",
    answer:
      "Repository handover includes complete private GitHub repository ownership, typed TypeScript/Python codebases, Docker container manifests, automated Terraform infrastructure runbooks, and zero recurring software retainers.",
    keyPoints: [
      "Day-one private GitHub repository transfer directly to client organizations",
      "No proprietary platform lock-in or recurring software licensing retainers",
      "Production-ready CI/CD pipelines, automated testing, and comprehensive docs",
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
    <div className="w-full bg-[#FAF9F5] text-[#141413] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: WARM EDITORIAL HERO ── */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 border-b border-black/10 overflow-hidden px-4 sm:px-6">
        {/* Subtle Fine Grid Texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/10 rounded-full text-xs font-mono font-medium text-[#5E605D] shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-[#FF3823]" />
            <span>VISTAR ENGINEERING LOG &bull; ARCHITECTURE TEARDOWNS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#141413] tracking-tight leading-[1.08]">
            Practical Blueprints. <br />
            <span className="text-[#5E605D] italic">Zero Agency Fluff.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[19px] text-[#5E605D] max-w-2xl mx-auto leading-relaxed font-normal">
            In-depth guides on autonomous AI agents, private cloud infrastructure, and high-performance software engineering—written directly by the engineers who ship it.
          </p>

          {/* Category Filter Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {["All", "Underdog Manifesto", "Autonomous Systems", "Sovereign Cloud", "Edge Performance"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#141413] text-white shadow-xs"
                    : "bg-white text-[#5E605D] border border-black/10 hover:border-black/30 hover:text-[#141413]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 2: FEATURED ARTICLE HERO WITH LIVE TECHNICAL SCHEMATIC ── */}
      {selectedCategory === "All" && (
        <section className="w-full py-12 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Narrative & Executive Finding */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 bg-[#FFF0EB] text-[#FF3823] border border-[#FF3823]/20 rounded-full font-semibold uppercase tracking-wider text-[11px] font-mono">
                      FEATURED SPEC &bull; {featuredPost.category}
                    </span>
                    <span className="text-[#5E605D] flex items-center gap-1 font-medium font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="text-[#5E605D] flex items-center gap-1 font-medium font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#141413] group-hover:text-[#FF3823] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm sm:text-base text-[#5E605D] leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  {/* Executive Summary Block */}
                  <div className="bg-[#FAF9F5] border border-black/10 rounded-xl p-5 text-sm text-[#141413] space-y-1.5">
                    <span className="text-[#FF3823] font-mono font-semibold uppercase tracking-wider text-xs block">
                      Executive Summary:
                    </span>
                    <p className="leading-relaxed text-[#5E605D] text-xs sm:text-sm">
                      {featuredPost.directAnswer}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#141413] hover:bg-[#FF3823] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                    >
                      <span>Read Full Architecture Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Live Technical Visual Diagram */}
                <div className="lg:col-span-6">
                  <TechnicalDiagram
                    type={getDiagramTypeForSlug(featuredPost.slug)}
                    caption="FIG 1.0: AGENCY OVERHEAD VS. LEAN CELL COST & TIMELINE WATERFALL"
                    compact={true}
                  />
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FRAME 3: ARTICLES GRID WITH EMBEDDED TECHNICAL VISUALS ── */}
      <section className="w-full py-16 px-4 sm:px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <h3 className="text-xs uppercase tracking-widest text-[#5E605D] font-mono font-semibold">
              All Publications ({filteredPosts.length})
            </h3>
            <span className="text-xs font-mono text-[#5E605D] hidden sm:inline">
              100% Client Code Ownership &bull; Zero Retainers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => {
              const diagramType = getDiagramTypeForSlug(post.slug);

              return (
                <article
                  key={post.slug}
                  className="bg-white border border-black/10 hover:border-black/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-all duration-200 group space-y-5"
                >
                  <div className="space-y-4">
                    {/* Embedded Technical Visual Diagram */}
                    <div className="w-full rounded-xl overflow-hidden border border-black/10">
                      <TechnicalDiagram
                        type={diagramType}
                        compact={true}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 bg-[#FAF9F5] border border-black/10 text-[#5E605D] rounded font-medium text-[11px]">
                        {post.category}
                      </span>
                      <span className="text-[#888888] text-[11px] flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#141413] group-hover:text-[#FF3823] transition-colors leading-snug">
                        {post.title}
                      </h4>
                    </Link>

                    <p className="text-xs sm:text-sm text-[#5E605D] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#888888]">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#141413] group-hover:text-[#FF3823] flex items-center gap-1 font-semibold transition-colors"
                    >
                      Read Blueprint <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FRAME 4: TECHNICAL ANSWER BLOCKS (LIGHT EDITORIAL THEME) ── */}
      <AnswerBlocks
        title="Engineering Publication & Editorial Standards"
        subtitle="Answers regarding our open-source blueprints, production benchmarks, and software delivery model."
        badge="EDITORIAL SPECIFICATION"
        items={BLOG_FAQ_ITEMS}
        schemaId="blog-faq-schema"
        theme="light"
      />

      {/* ── FRAME 5: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141413] tracking-tight">
            Deploy these architectures in your business
          </h2>
          <p className="text-base text-[#5E605D] max-w-xl mx-auto leading-relaxed">
            We build and deliver custom autonomous AI agents, private VPC vaults, and web applications in 14-day production sprints with 100% repository handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm rounded-lg transition-colors shadow-xs gap-2"
            >
              View Packages (from ₹49k / $600)
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-white font-medium text-sm rounded-lg transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
