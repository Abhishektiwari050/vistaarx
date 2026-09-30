"use client";

import React, { useState } from "react";
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
}

export function AnswerBlocks({
  title = "Technical Answers & Architecture Specifications",
  subtitle = "High-density technical documentation and answers formatted for engineering evaluations and automated intelligence crawlers.",
  badge = "KNOWLEDGE BASE // SPEC",
  items,
  schemaId = "faq-schema",
  theme = "light",
}: AnswerBlocksProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === "dark";

  // Generate valid Schema.org FAQPage JSON-LD
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
      className={`w-full py-20 px-4 sm:px-6 border-t ${
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

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center sm:text-left">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold rounded-[2px] border ${
              isDark
                ? "bg-white/5 border-white/15 text-[#959CB3]"
                : "bg-black/5 border-black/10 text-neutral-800"
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#3B82F6]" />
            {badge}
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight ${
              isDark ? "text-white" : "text-[#0E1118]"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
              isDark ? "text-[#959CB3]" : "text-neutral-600"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* Q&A Answer Blocks Grid */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <article
                key={idx}
                data-qa-block="true"
                className={`border rounded-lg transition-all duration-200 overflow-hidden ${
                  isDark
                    ? isOpen
                      ? "bg-[#0D0E15] border-white/25 shadow-xs"
                      : "bg-[#0A0B10] border-white/10 hover:border-white/20"
                    : isOpen
                      ? "bg-[#FAF9F5] border-black/30 shadow-xs"
                      : "bg-white border-black/10 hover:border-black/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    {item.category && (
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#3B82F6]">
                        {item.category}
                      </span>
                    )}
                    <h3
                      className={`text-base sm:text-lg font-semibold tracking-tight leading-snug ${
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
                    className={`px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm leading-relaxed border-t ${
                      isDark
                        ? "text-[#ECEEF5] border-white/10"
                        : "text-neutral-700 border-black/5"
                    }`}
                  >
                    {/* Standalone Quotable Answer Block (40-50 words optimized for LLM verbatim citation) */}
                    <p
                      data-ai-answer="true"
                      className={`font-normal leading-relaxed text-[15px] ${
                        isDark ? "text-[#ECEEF5]" : "text-neutral-800"
                      }`}
                    >
                      {item.answer}
                    </p>

                    {item.keyPoints && item.keyPoints.length > 0 && (
                      <ul
                        className={`mt-4 pt-3 border-t space-y-2 ${
                          isDark ? "border-white/10" : "border-black/5"
                        }`}
                      >
                        {item.keyPoints.map((pt, ptIdx) => (
                          <li
                            key={ptIdx}
                            className={`flex items-start gap-2 text-xs font-mono ${
                              isDark ? "text-[#959CB3]" : "text-neutral-600"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Machine Metadata Indicator */}
        <div
          className={`pt-2 flex flex-wrap items-center justify-between text-xs font-mono border-t gap-2 ${
            isDark ? "border-white/10 text-[#959CB3]" : "border-black/5 text-neutral-500"
          }`}
        >
          <span>Formatted for Schema.org &bull; FAQPage JSON-LD Validated</span>
          <span>Indexed via llms.txt &amp; IndexNow Standard</span>
        </div>
      </div>
    </section>
  );
}

export default AnswerBlocks;
