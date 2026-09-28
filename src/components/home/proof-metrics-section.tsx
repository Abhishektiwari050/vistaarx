import React from "react";
import { Card } from "@/components/vistar-card";

export function ProofMetricsSection() {
  const metrics = [
    {
      stat: "<45ms",
      label: "QUERY PARSING LATENCY",
      context: "Measured on Project VAYU live FAA NOTAM hazard tokenization and spatial indexing pipelines.",
      verification: "Validated via automated benchmark test suites",
    },
    {
      stat: "99.8%",
      label: "PROCESSING PRECISION",
      context: "Natural language extraction accuracy across complex, multi-paragraph airspace safety bulletins.",
      verification: "Tested against 10,000+ historical records",
    },
    {
      stat: "100%",
      label: "CODEBASE SOVEREIGNTY",
      context: "Every line of client source code, database migration, and CI/CD script is transferred to client repositories.",
      verification: "Zero proprietary lock-in or recurring runtime fees",
    },
    {
      stat: "95+",
      label: "CORE WEB VITALS BASELINE",
      context: "Lighthouse desktop and mobile performance standards enforced on all public web engineering deliverables.",
      verification: "Audited via continuous integration gates",
    },
  ];

  const colors = ["text-[#0284C7]", "text-[#141413]", "text-[#6A9BCC]", "text-[#788C5D]"];

  return (
    <section className="vistar-section border-t border-b border-[#141413]/[0.08] bg-[#FAF9F5] text-[#141413] relative overflow-hidden">
      {/* Ambient Specular Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-30 -z-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.04), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="vistar-container space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F0EEE6] border border-[#141413]/10 text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_6px_rgba(2, 132, 199,0.5)]" />
            <span className="text-[#141413] font-bold">06 // VERIFIABLE BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#141413] tracking-[-0.03em] leading-tight">
            Deterministic Benchmarks
          </h2>
          <p className="text-[#5A5852] text-base md:text-lg leading-relaxed font-sans">
            Measured telemetry over marketing abstractions. Every metric represents actual live production payloads verified under peak load.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <Card key={idx} className="p-8 space-y-6 flex flex-col justify-between bg-white border border-[#141413]/10 rounded-[8px]" hoverHighlight>
              <div className="space-y-3">
                <span className="font-mono text-[#6A6862] text-[11px] tracking-wider uppercase block font-semibold">
                  {m.label}
                </span>
                <p className={`font-heading text-4xl lg:text-5xl font-extrabold tracking-tight ${colors[idx % colors.length]}`}>
                  {m.stat}
                </p>
                <p className="text-[#5A5852] text-sm leading-relaxed font-sans">
                  {m.context}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(20,20,19,0.08)]">
                <p className="font-mono text-[11px] text-[#6A6862] uppercase tracking-wider">
                  {m.verification}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProofMetricsSection;
