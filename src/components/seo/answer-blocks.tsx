"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react";

export interface QAPair {
  question: string;
  answer: string;
  category?: string;
  keyPoints?: string[];
}

interface AnswerBlocksProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  items: QAPair[];
  schemaId?: string;
  theme?: "light" | "dark";
  initialLimit?: number;
}

export function AnswerBlocks({
  title = "Frequently Asked Questions",
  subtitle = "Direct, practical answers about our engineering process, pricing, data privacy, and source code ownership.",
  badge = "COMMON QUESTIONS",
  items,
  schemaId = "faq-schema",
  theme = "light",
  initialLimit = 6,
}: AnswerBlocksProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isDark = theme === "dark";

  // Visible items (capped when initialLimit is passed and not yet expanded)
  const visibleItems = useMemo(() => {
    if (isExpanded || !initialLimit) {
      return items;
    }
    return items.slice(0, initialLimit);
  }, [items, isExpanded, initialLimit]);

  // Generate valid Schema.org FAQPage JSON-LD (Includes all items for complete SEO crawling)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      className={`relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t font-sans select-none overflow-hidden ${
        isDark
          ? "bg-[#0A0B0E] border-white/10 text-[#ECEEF5]"
          : "bg-white border-black/[0.08] text-[#141518]"
      }`}
    >
      <script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: STICKY EDITORIAL ANCHOR ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF3823] font-bold block">
                {badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#141518] leading-[1.08] text-balance">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal text-pretty max-w-md pt-1">
                {subtitle}
              </p>
            </div>

            {/* Direct Contact Card */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-black/8 space-y-3.5 shadow-xs">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                NEED A CUSTOM WORKFLOW AUDIT?
              </span>
              <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal">
                Have a technical question or operational bottleneck not covered here? Speak directly with our founding engineer.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141518] hover:text-[#FF3823] transition-colors group"
                >
                  <span>Start with a brief message</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-neutral-300">&bull;</span>
                <a
                  href="https://wa.me/918860110144?text=Hi%20VISTAR%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  WhatsApp (+91 88601 10144)
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: HIGH-TYPOGRAPHY ASYMMETRIC Q&A ROWS ── */}
          <div className="lg:col-span-7 divide-y divide-black/[0.08]">
            {visibleItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              const formattedNum = (idx + 1).toString().padStart(2, "0");

              return (
                <article
                  key={`${item.question}-${idx}`}
                  data-qa-block="true"
                  className="py-6 sm:py-7 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-start justify-between gap-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3823] rounded-lg group"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-neutral-400 group-hover:text-[#FF3823] transition-colors">
                          {formattedNum}
                        </span>
                        {item.category && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                            // {item.category}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-lg sm:text-xl font-bold tracking-tight leading-snug transition-colors ${
                          isOpen ? "text-[#FF3823]" : "text-[#141518] group-hover:text-black"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* Minimalist Tactile Plus/Minus Indicator */}
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 mt-1 ${
                        isOpen
                          ? "bg-[#141518] text-white border-[#141518]"
                          : "bg-white text-neutral-700 border-black/10 group-hover:border-black/30"
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Expandable Authoritative Answer */}
                  {isOpen && (
                    <div className="pt-4 pb-2 pl-6 sm:pl-7 space-y-4 animate-in fade-in-50 duration-200">
                      <p
                        data-ai-answer="true"
                        className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal text-pretty"
                      >
                        {item.answer}
                      </p>

                      {/* High-Density Key Takeaways Spec Strip */}
                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {item.keyPoints.map((pt, ptIdx) => (
                            <div
                              key={ptIdx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-[#FAF8F5] border border-black/8 text-neutral-700"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}

            {/* Expand / Reveal Remaining Questions Button */}
            {initialLimit && !isExpanded && items.length > initialLimit && (
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="w-full py-4 rounded-2xl border border-black/10 bg-[#FAF8F5] hover:bg-neutral-100 text-[#141518] text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <span>View all {items.length} architectural answers</span>
                  <Plus className="w-4 h-4 text-[#FF3823]" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default AnswerBlocks;
