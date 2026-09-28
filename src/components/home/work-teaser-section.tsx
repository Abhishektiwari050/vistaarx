import React from "react";
import Link from "next/link";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";

export function WorkTeaserSection() {
  const selectedSystems = [
    {
      badge: "MULTI-AGENT ENGINE",
      badgeColor: "text-[#0284C7] bg-[#E0F2FE]",
      name: "AURA: Real-Time Telemetry Broker",
      sector: "Asynchronous Agentic Architecture",
      architecture: "Python 3.11, Isolation Forest ML, Redis Stream Broker",
      outcome: "<15ms telemetry latency, 99.8% anomaly detection precision",
      tech: ["Multi-Agent", "Python", "ML Iso-Forest", "WebSockets"],
      status: "LIVE PRODUCTION",
      href: "/work",
    },
    {
      badge: "SPATIAL WEBGL",
      badgeColor: "text-[#00B4D8] bg-[#E0F7FA]",
      name: "3axis Arc: High-Density Digital Showroom",
      sector: "Architectural Studio Platform",
      architecture: "Next.js App Router, Mouse-Tracking 3D Perspective, PBR Shaders",
      outcome: "+180% engagement lift, 60fps hardware-accelerated gallery",
      tech: ["Next.js 16", "WebGL", "Three.js", "Tailwind CSS"],
      status: "VERIFIED 60FPS",
      href: "/work",
    },
    {
      badge: "ENTERPRISE CRM",
      badgeColor: "text-[#0369A1] bg-[#E0F2FE]",
      name: "Competence CRM: Operations Engine",
      sector: "Workforce & Operations Management",
      architecture: "Full-Stack TypeScript, PostgreSQL Schemas, Automated Task Engine",
      outcome: "Unified enterprise tracking across 500+ active workforce nodes",
      tech: ["PostgreSQL", "Supabase", "TypeScript", "FastAPI"],
      status: "PRODUCTION STACK",
      href: "/work",
    },
    {
      badge: "PROGRAMMATIC SEO",
      badgeColor: "text-[#0284C7] bg-[#E0F2FE]",
      name: "Programmatic Search & Conversion Platform",
      sector: "Zero-CMS Growth Architecture",
      architecture: "Next.js Edge SSR, Automated Schema.org, Dynamic Edge Pages",
      outcome: "3.2x organic pipeline growth with 100/100 Core Web Vitals",
      tech: ["Edge SSR", "Schema.org", "Tailwind v4", "Cloudflare"],
      status: "EDGE DEPLOYED",
      href: "/work",
    },
  ];

  return (
    <section className="vistar-section border-t border-b border-[rgba(14,165,233,0.12)] bg-gradient-to-b from-[#F1F6FB] via-[#F8FBFE] to-[#FFFFFF] text-[#0B1320] relative overflow-hidden py-18 sm:py-24">
      {/* Subtle Cyan Specular Sheen */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 -z-10"
        style={{
          background: "radial-gradient(circle at 80% 80%, rgba(2, 132, 199, 0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="vistar-container space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white border border-[rgba(14,165,233,0.15)] text-xs font-mono tracking-wider uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span className="text-[#0B1320] font-bold">03 // Selected Productions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#050A14] tracking-[-0.03em] leading-tight">
              Curated Production Deployments
            </h2>
            <p className="text-[#475569] text-base md:text-lg leading-relaxed font-serif">
              Production software shipped in 14-day sprints across distributed multi-agent brokers, spatial WebGL platforms, and enterprise growth architectures.
            </p>
          </div>
          <Button variant="secondary" href="/work">
            Explore Case Studies ↗
          </Button>
        </div>

        {/* 4 Distinct Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedSystems.map((item) => (
            <Card key={item.name} className="p-8 space-y-6 flex flex-col justify-between bg-white border border-[rgba(14,165,233,0.12)] rounded-[12px] shadow-sm hover:border-[rgba(2,132,199,0.30)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.08)] transition-all duration-200" hoverHighlight>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(14,165,233,0.10)] pb-4">
                  <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-[#64748B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#0B1320] tracking-tight">
                  {item.name}
                </h3>

                <p className="text-xs font-mono text-[#64748B] uppercase tracking-wide">
                  {item.sector}
                </p>

                <div className="space-y-2 text-sm text-[#475569]">
                  <p className="text-xs leading-relaxed font-serif">
                    <strong className="text-[#0B1320] font-semibold">Outcome: </strong>
                    {item.outcome}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-[4px] bg-[#F8FBFE] border border-[rgba(14,165,233,0.12)] text-[11px] font-mono text-[#0B1320]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(14,165,233,0.10)] flex justify-between items-center">
                <span className="font-mono text-xs text-[#64748B]">
                  100% GIT SOVEREIGNTY
                </span>
                <Link
                  href={item.href}
                  className="font-mono text-xs text-[#0284C7] font-bold hover:underline transition-colors tracking-wider"
                >
                  INSPECT ARCHITECTURE ↗
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkTeaserSection;
