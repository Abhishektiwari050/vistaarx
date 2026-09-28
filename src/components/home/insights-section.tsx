import React from "react";
import Link from "next/link";
import { Card } from "@/components/vistar-card";
import { getRecentInsights } from "@/lib/insights";

export function InsightsSection() {
  const posts = getRecentInsights(3);

  return (
    <section className="vistar-section border-t border-b border-[#141413]/[0.08] bg-[#F0EEE6] text-[#141413] relative overflow-hidden">
      {/* Ambient Gradient Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 -z-10"
        style={{
          background: "radial-gradient(circle at 30% 70%, rgba(2, 132, 199, 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="vistar-container space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white border border-[#141413]/10 text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_6px_rgba(2, 132, 199,0.5)]" />
            <span className="text-[#141413] font-bold">07 // TECHNICAL ESSAYS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#141413] tracking-[-0.03em] leading-tight">
            Engineering Dispatches
          </h2>
          <p className="text-[#5A5852] text-base md:text-lg leading-relaxed font-sans">
            Architectural writing on software primitives, autonomous agent fabrics, and high-frequency digital distribution economics.
          </p>
        </div>

        {/* Max 3 Recent Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/insights/${post.slug}`} className="group block focus:outline-none">
              <Card className="p-8 space-y-5 flex flex-col justify-between h-full bg-white border border-[#141413]/10 rounded-[8px]" hoverHighlight>
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-[#141413]/50 border-b border-[#141413]/[0.08] pb-3">
                    <span className="text-[#0284C7] font-bold tracking-wider uppercase">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="type-h3 text-lg leading-snug text-[#141413] group-hover:text-[#0284C7] transition-colors font-bold">
                    {post.title}
                  </h3>

                  <p className="type-body text-sm text-[#141413]/75 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#141413]/[0.08] flex justify-between items-center text-xs font-mono">
                  <span className="text-[#141413]/50">{post.date}</span>
                  <span className="text-[#0284C7] group-hover:underline transition-colors flex items-center gap-1 font-bold tracking-wider">
                    READ LOG <span>↗</span>
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InsightsSection;
