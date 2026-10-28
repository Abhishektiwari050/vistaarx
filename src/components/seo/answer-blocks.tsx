"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, Sparkles, CheckCircle2 } from "lucide-react";

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
  title = "Technical Answers & Architecture Specifications",
  subtitle = "High-density technical documentation and answers formatted for engineering evaluations and automated intelligence crawlers.",
  badge = "KNOWLEDGE BASE // SPEC",
  items,
  schemaId = "faq-schema",
  theme = "light",
  initialLimit,
}: AnswerBlocksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isDark = theme === "dark";

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [items]);

  // Filtered items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "ALL") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // Visible items (capped when initialLimit is passed and not yet expanded)
  const visibleItems = useMemo(() => {
    if (selectedCategory !== "ALL" || isExpanded || !initialLimit) {
      return filteredItems;
    }
    return filteredItems.slice(0, initialLimit);
  }, [filteredItems, selectedCategory, isExpanded, initialLimit]);

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
      className={`w-full py-14 sm:py-20 px-4 sm:px-6 border-t font-sans ${
        isDark
          ? "bg-[#060709] border-white/10 text-[#ECEEF5]"
          : "bg-white border-black/10 text-[#0E1118]"
      }`}
    >
      <script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-7 sm:space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2.5 text-center sm:text-left">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider font-semibold rounded-full border ${
              isDark
                ? "bg-white/5 border-white/15 text-[#959CB3]"
                : "bg-black/5 border-black/10 text-neutral-800"
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#FF3823]" />
            {badge}
          </span>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance ${
              isDark ? "text-white" : "text-[#0E1118]"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-xs sm:text-sm max-w-2xl leading-relaxed text-pretty ${
              isDark ? "text-[#959CB3]" : "text-neutral-600"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* ── FAST CATEGORY FILTER TABS ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? isDark
                      ? "bg-white text-black shadow-xs"
                      : "bg-[#181818] text-white shadow-xs"
                    : isDark
                      ? "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
                      : "bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-black/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Q&A Answer Blocks Grid */}
        <div className="space-y-3">
          {visibleItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <article
                key={`${item.question}-${idx}`}
                data-qa-block="true"
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  isDark
                    ? isOpen
                      ? "bg-[#0D0E15] border-white/25 shadow-xs"
                      : "bg-[#0A0B10] border-white/10 hover:border-white/20"
                    : isOpen
                      ? "bg-[#FAF9F6] border-black/25 shadow-xs"
                      : "bg-white border-black/8 hover:border-black/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3823]"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    {item.category && (
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#FF3823]">
                        {item.category}
                      </span>
                    )}
                    <h3
                      className={`text-sm sm:text-base font-semibold tracking-tight leading-snug ${
                        isDark ? "text-white" : "text-[#0E1118]"
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 mt-1 p-1 rounded-full transition-transform duration-200 ${
                      isDark ? "bg-white/10 text-white" : "bg-black/5 text-neutral-600"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div
                    className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-sm leading-relaxed border-t ${
                      isDark
                        ? "text-[#ECEEF5] border-white/10"
                        : "text-neutral-700 border-black/6"
                    }`}
                  >
                    <p
                      data-ai-answer="true"
                      className={`font-normal leading-relaxed text-xs sm:text-sm text-pretty ${
                        isDark ? "text-[#ECEEF5]" : "text-neutral-800"
                      }`}
                    >
                      {item.answer}
                    </p>

                    {/* High-Density Key Takeaways */}
                    {item.keyPoints && item.keyPoints.length > 0 && (
                      <div
                        className={`mt-3 pt-3 border-t flex flex-wrap gap-2 ${
                          isDark ? "border-white/10" : "border-black/6"
                        }`}
                      >
                        {item.keyPoints.map((pt, ptIdx) => (
                          <div
                            key={ptIdx}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono ${
                              isDark
                                ? "bg-white/5 text-neutral-300 border border-white/10"
                                : "bg-neutral-100 text-neutral-700 border border-black/5"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
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
        </div>

        {/* Expandable trigger to reveal remaining questions on demand */}
        {initialLimit && !isExpanded && selectedCategory === "ALL" && filteredItems.length > initialLimit && (
          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/15"
                  : "bg-neutral-50 hover:bg-neutral-100 text-[#181818] border-black/10"
              }`}
            >
              <span>Show all {filteredItems.length} architectural answers</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default AnswerBlocks;
