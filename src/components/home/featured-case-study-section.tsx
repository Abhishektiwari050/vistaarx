import React from "react";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";

export function FeaturedCaseStudySection() {
  return (
    <section className="vistar-section border-t border-b border-[rgba(14,165,233,0.12)] bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFE] to-[#F1F6FB] text-[#0B1320] relative overflow-hidden py-18 sm:py-24">
      {/* Ambient Cyan Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 -z-10"
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(2, 132, 199, 0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="vistar-container space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white border border-[rgba(14,165,233,0.15)] text-xs font-mono tracking-wider uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span className="text-[#0B1320] font-bold">02 // Featured Production Deep-Dive</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-[-0.03em] text-[#050A14] leading-tight">
              Project VAYU — Cockpit AI &amp; GIS Telemetry
            </h2>
            <p className="text-[#475569] text-base md:text-lg leading-relaxed font-serif">
              High-consequence airspace hazard telemetry for flight crews and dispatch operations. Engineered in a single 14-day production milestone.
            </p>
          </div>
          <Button variant="secondary" href="/work">
            Explore Case Studies ↗
          </Button>
        </div>

        {/* Featured Deep-Dive Card */}
        <Card className="p-8 md:p-12 space-y-10 bg-white border border-[rgba(14,165,233,0.14)] rounded-[12px] shadow-sm">
          {/* Metadata & Key Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-8 border-b border-[rgba(14,165,233,0.12)]">
            <div className="space-y-1.5 font-mono">
              <p className="type-label text-[#94A3B8] text-[11px]">SECTOR / CLIENT</p>
              <p className="font-serif text-sm font-semibold text-[#0B1320]">
                Aviation Safety &amp; Dispatch
              </p>
              <p className="text-xs text-[#64748B]">Commercial Airspace</p>
            </div>
            <div className="space-y-1.5 font-mono">
              <p className="type-label text-[#0284C7] text-[11px] font-bold">QUERY LATENCY</p>
              <p className="font-display text-3xl font-bold text-[#0284C7]">
                &lt;45ms
              </p>
              <p className="text-xs text-[#64748B]">Real-time hazard decoding</p>
            </div>
            <div className="space-y-1.5 font-mono">
              <p className="type-label text-[#00B4D8] text-[11px] font-bold">EXTRACTION ACCURACY</p>
              <p className="font-display text-3xl font-bold text-[#00B4D8]">
                99.8%
              </p>
              <p className="text-xs text-[#64748B]">NOTAM threat synthesis</p>
            </div>
            <div className="space-y-1.5 font-mono">
              <p className="type-label text-[#0B1320] text-[11px] font-bold">BRIEFING VELOCITY</p>
              <p className="font-display text-3xl font-bold text-[#0B1320]">
                -85%
              </p>
              <p className="text-xs text-[#64748B]">Pre-flight preparation time</p>
            </div>
          </div>

          {/* Customer-Centric Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 3 Clear Story Steps (Cols 1-8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2.5 p-5 bg-[#F8FBFE] rounded-[8px] border border-[rgba(14,165,233,0.12)]">
                <span className="font-mono text-xs font-bold text-[#0284C7]">01 // THE BOTTLENECK</span>
                <h3 className="font-serif text-base font-bold text-[#0B1320]">
                  100+ Unstructured Teletypes
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed font-serif">
                  Commercial dispatchers historically spent 45+ minutes manually parsing raw, all-caps FAA NOTAM teletype logs prior to departure, risking critical hazard oversights.
                </p>
              </div>

              <div className="space-y-2.5 p-5 bg-[#F8FBFE] rounded-[8px] border border-[rgba(14,165,233,0.12)]">
                <span className="font-mono text-xs font-bold text-[#00B4D8]">02 // THE ENGINE</span>
                <h3 className="font-serif text-base font-bold text-[#0B1320]">
                  Sub-45ms GIS Hazard Vectoring
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed font-serif">
                  Engineered an asynchronous Python &amp; Next.js pipeline parsing live airspace feeds into interactive 3D spatial polygons, altitude corridors, and runway integrity alerts.
                </p>
              </div>

              <div className="space-y-2.5 p-5 bg-[#F8FBFE] rounded-[8px] border border-[rgba(14,165,233,0.12)]">
                <span className="font-mono text-xs font-bold text-[#0284C7]">03 // THE OUTCOME</span>
                <h3 className="font-serif text-base font-bold text-[#0B1320]">
                  14-Day Production Delivery
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed font-serif">
                  Shipped from wireframe to verified production in exactly 14 days, cutting briefing delays by 85% with 100% sovereign Git code ownership.
                </p>
              </div>
            </div>

            {/* Right: Technical Stack & Verification Box (Cols 9-12) */}
            <div className="lg:col-span-4 space-y-5 bg-[#F0F6FA] border border-[rgba(14,165,233,0.15)] p-6 rounded-[10px]">
              <div className="space-y-2">
                <p className="font-mono text-xs text-[#0B1320] font-bold">PRODUCTION STACK</p>
                <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs text-[#0B1320]/80">
                  <span className="border border-[rgba(14,165,233,0.18)] bg-white px-2 py-0.5 rounded-[4px]">Next.js 16</span>
                  <span className="border border-[rgba(14,165,233,0.18)] bg-white px-2 py-0.5 rounded-[4px]">TypeScript</span>
                  <span className="border border-[rgba(14,165,233,0.18)] bg-white px-2 py-0.5 rounded-[4px]">GIS Spatial HUD</span>
                  <span className="border border-[rgba(14,165,233,0.18)] bg-white px-2 py-0.5 rounded-[4px]">FastAPI Async</span>
                  <span className="border border-[rgba(14,165,233,0.18)] bg-white px-2 py-0.5 rounded-[4px]">Tailwind CSS</span>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-[rgba(14,165,233,0.12)] pt-4">
                <p className="font-mono text-xs text-[#0B1320] font-bold">SOVEREIGNTY</p>
                <p className="text-xs text-[#475569] leading-relaxed font-serif">
                  Complete GitHub repository handover. Zero recurring licensing fees or vendor dependencies.
                </p>
              </div>

              <div className="space-y-2 border-t border-[rgba(14,165,233,0.12)] pt-4">
                <p className="font-mono text-xs text-[#0B1320] font-bold">LIVE PRODUCTION PROOF</p>
                <div className="space-y-1.5 pt-0.5">
                  <a
                    href="https://ai-vayu.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#0284C7] font-semibold hover:underline"
                  >
                    <span>Deployed HUD: ai-vayu.vercel.app</span>
                    <span>↗</span>
                  </a>
                  <a
                    href="https://github.com/Abhishektiwari050/AI-VAYU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-mono text-xs text-[#64748B] hover:text-[#0B1320] transition-colors"
                  >
                    Source Code: github.com/.../AI-VAYU ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default FeaturedCaseStudySection;
