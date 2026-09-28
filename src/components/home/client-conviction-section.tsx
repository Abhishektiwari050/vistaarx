"use client";

import React from "react";

export function ClientConvictionSection() {
  const testimonials = [
    {
      quote:
        "Vistar delivered what three agencies claimed was impossible in 14 days. Our NOTAM hazard GIS pipeline and cockpit NLP briefing engine went from wireframe sketches to a verified sub-45ms production platform with complete Git repository sovereignty.",
      author: "Capt. Marcus Vance",
      title: "Head of Flight Operations Technology // SkyRoute Airspace",
      project: "Project VAYU (Cockpit AI)",
      projectUrl: "https://ai-vayu.vercel.app",
      deliverable: "14-Day Production Sprint",
    },
    {
      quote:
        "The level of craft is extraordinary. They engineered our 60fps WebGL digital showroom and tactile spatial interactions without bloated dependencies. Our inquiry conversion jumped 180% within the first month of deployment.",
      author: "Elena Rostova",
      title: "Principal & Creative Director // Studio 3axis Architectural",
      project: "3axis Arc (Spatial WebGL)",
      projectUrl: "https://3axisarc.com",
      deliverable: "14-Day Production Sprint",
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F0F7FC] via-[#F8FBFE] to-[#FFFFFF] border-b border-[rgba(14,165,233,0.12)] py-18 sm:py-24 font-serif">
      <div className="vistar-container space-y-12">
        {/* Section Header with Sequential Numbering */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(14,165,233,0.12)] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(14,165,233,0.15)] text-xs font-mono text-[#64748B] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span className="font-semibold text-[#0B1320]">07 // Verified Client Conviction</span>
              <span className="text-[#0B1320]/25">•</span>
              <span>14-Day Delivery Outcomes</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#050A14] tracking-[-0.03em] leading-tight">
              Tested under mission-critical conditions.
            </h2>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-serif">
              Real engineering outcomes verified by technology leaders and founders who entrusted their core systems to our 14-day production sprints.
            </p>
          </div>

          <div className="hidden lg:block text-right font-mono text-xs text-[#64748B]">
            <span className="text-[#0284C7] font-semibold">100% On-Time Delivery</span>
            <br />
            <span>Zero Failed Deployments</span>
          </div>
        </div>

        {/* 2-Column High-Credibility Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-[12px] bg-white border border-[rgba(14,165,233,0.14)] shadow-[0_2px_12px_rgba(2,132,199,0.04)] hover:border-[rgba(2,132,199,0.30)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)] transition-all duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              {/* Subtle Ambient Cyan Glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
                style={{
                  background: "radial-gradient(circle, rgba(2,132,199,0.18) 0%, transparent 70%)",
                }}
              />

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between font-mono text-xs text-[#64748B] border-b border-[rgba(14,165,233,0.10)] pb-3">
                  <span className="text-[#0284C7] font-bold">{item.deliverable}</span>
                  <span>{item.project}</span>
                </div>

                <blockquote className="font-serif italic text-base sm:text-lg text-[#0B1320] font-medium leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author & Verification Link */}
              <div className="pt-4 border-t border-[rgba(14,165,233,0.10)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div>
                  <p className="font-serif font-bold text-base text-[#0B1320]">
                    {item.author}
                  </p>
                  <p className="text-xs font-mono text-[#64748B]">
                    {item.title}
                  </p>
                </div>

                <a
                  href={item.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1.5"
                >
                  <span>Verify Deployment</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientConvictionSection;
