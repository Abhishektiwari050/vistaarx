"use client";

import React, { useState } from "react";

interface CaseStudyInspectorProps {
  studyId: string;
  blueprint: {
    stages: { name: string; desc: string; latency: string }[];
    asciiDiagram: string;
  };
  benchmarks: {
    metric: string;
    vistar: string;
    legacy: string;
    delta: string;
  }[];
}

export function CaseStudyInspector({
  studyId,
  blueprint,
  benchmarks,
}: CaseStudyInspectorProps) {
  const [activeTab, setActiveTab] = useState<"blueprint" | "benchmarks">("blueprint");

  return (
    <div className="w-full bg-white border border-[rgba(56, 189, 248, 0.15)] rounded-[2px] overflow-hidden my-6 shadow-sm">
      {/* Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-[#F0F7FD]/60 border-b border-[rgba(56, 189, 248, 0.15)] gap-2">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
          <span className="text-[#0B1320] font-semibold uppercase tracking-wider">
            TECHNICAL ARCHITECTURE &amp; BENCHMARKS
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab("blueprint")}
            className={`px-3 py-1.5 transition-colors cursor-pointer border rounded-[2px] ${
              activeTab === "blueprint"
                ? "bg-[#0284C7] text-[#FFFFFF] font-semibold border-[#0284C7]"
                : "bg-transparent text-[#475569] border-[rgba(56, 189, 248, 0.22)] hover:text-[#0B1320]"
            }`}
          >
            ARCHITECTURE BLUEPRINT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("benchmarks")}
            className={`px-3 py-1.5 transition-colors cursor-pointer border rounded-[2px] ${
              activeTab === "benchmarks"
                ? "bg-[#0284C7] text-[#FFFFFF] font-semibold border-[#0284C7]"
                : "bg-transparent text-[#475569] border-[rgba(56, 189, 248, 0.22)] hover:text-[#0B1320]"
            }`}
          >
            VERIFIED BENCHMARKS
          </button>
        </div>
      </div>

      {/* Body Viewport */}
      <div className="p-5 font-mono text-xs">
        {activeTab === "blueprint" && (
          <div className="space-y-6">
            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {blueprint.stages.map((stg, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-transparent border border-[rgba(56, 189, 248, 0.15)] space-y-1.5 rounded-[2px]"
                >
                  <div className="flex items-center justify-between text-[#0284C7] font-bold text-[10px]">
                    <span>STAGE 0{idx + 1}</span>
                    <span>{stg.latency}</span>
                  </div>
                  <p className="text-[#0B1320] font-medium text-xs font-sans">
                    {stg.name}
                  </p>
                  <p className="text-[11px] text-[#475569] leading-relaxed font-sans">
                    {stg.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* ASCII Topology Diagram */}
            <div className="p-4 bg-[#F0F7FD]/60 border border-[rgba(56, 189, 248, 0.15)] rounded-[2px] overflow-x-auto">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest block pb-2">
                SYSTEM TOPOLOGY DIAGRAM // COMPILED PRIMITIVES
              </span>
              <pre className="text-[11px] leading-relaxed text-[#0B1320]">
                {blueprint.asciiDiagram}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "benchmarks" && (
          <div className="space-y-4">
            <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest block pb-1">
              HEAD-TO-HEAD ENGINEERING METRICS // VISTAR VS INDUSTRY BASELINE
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(56, 189, 248, 0.15)] text-[11px] text-[#475569] font-mono">
                    <th className="py-2.5 px-3">PERFORMANCE VECTOR</th>
                    <th className="py-2.5 px-3 text-[#0284C7] font-bold">VISTAR ARCHITECTURE</th>
                    <th className="py-2.5 px-3 text-[#94A3B8]">LEGACY INDUSTRY BASELINE</th>
                    <th className="py-2.5 px-3 text-right">MEASURED DELTA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(56, 189, 248, 0.15)] text-xs">
                  {benchmarks.map((bm, i) => (
                    <tr key={i} className="hover:bg-[#F0F7FD]/60 transition-colors">
                      <td className="py-3 px-3 font-medium text-[#0B1320] font-sans">
                        {bm.metric}
                      </td>
                      <td className="py-3 px-3 text-[#0284C7] font-bold">
                        {bm.vistar}
                      </td>
                      <td className="py-3 px-3 text-[#475569]">
                        {bm.legacy}
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-[#0B1320]">
                        {bm.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
