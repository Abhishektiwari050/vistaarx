"use client";

import React, { useState } from "react";
import { Card } from "@/components/vistar-card";
import { Button } from "@/components/vistar-button";

interface LayerDetail {
  id: "build" | "discover" | "grow";
  number: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  href: string;
}

const LAYERS: LayerDetail[] = [
  {
    id: "build",
    number: "01",
    name: "BUILD",
    tagline: "Software & AI Engineering",
    description:
      "Full-stack web applications and autonomous AI systems built from raw primitives. We engineer clean, type-safe architectures with zero disposable template debt.",
    capabilities: [
      "Next.js & TypeScript Systems",
      "FastAPI & Microservices Architecture",
      "Autonomous AI Agent Workflows",
      "PostgreSQL & Vector Store Modeling",
      "Custom REST & Streaming APIs",
    ],
    deliverables: [
      "Production-ready codebase in your GitHub repository",
      "Automated CI/CD deployment pipelines",
      "Comprehensive architectural and API documentation",
      "100% client source code and copyright handover",
    ],
    href: "/build",
  },
  {
    id: "discover",
    number: "02",
    name: "DISCOVER",
    tagline: "Distribution & Technical Reach",
    description:
      "Programmatic distribution infrastructure and algorithmic visibility. We engineer search indexing, sub-second edge delivery, and high-conversion conversion funnels.",
    capabilities: [
      "Technical & Programmatic SEO Engines",
      "Sub-Second Core Web Vitals Tuning",
      "Structured Schema & Knowledge Graphs",
      "Edge-Accelerated Asset Distribution",
      "Conversion Funnel Data Instrumentation",
    ],
    deliverables: [
      "Dynamic programmatic search landing engines",
      "JSON-LD Schema validation across all service routes",
      "Automated sitemap and indexation pipelines",
      "Lighthouse 95+ performance compliance report",
    ],
    href: "/discover",
  },
  {
    id: "grow",
    number: "03",
    name: "GROW",
    tagline: "Lifecycle & Retention Architecture",
    description:
      "Behavioral intelligence streams and automated conversion workflows. We construct self-optimizing feedback loops that systematically expand customer lifetime value.",
    capabilities: [
      "Real-Time Telemetry & Event Pipelines",
      "Automated Behavioral Activation Engines",
      "Lifecycle Messaging & Resonant Onboarding",
      "Churn Prediction & Proactive Alerting",
      "Data Warehouse & Bi-Directional Syncs",
    ],
    deliverables: [
      "Configured analytics and event collection harness",
      "Automated multi-stage customer lifecycle flows",
      "Retention cohort telemetry dashboards",
      "Operational alert runbooks and monitoring gates",
    ],
    href: "/grow",
  },
];

const LAYER_THEMES = {
  build: {
    color: "#0284C7",
    borderClass: "border-[#0284C7]",
    textClass: "text-[#0284C7]",
    bgTint: "bg-[#0284C7]/[0.10]",
  },
  discover: {
    color: "#00B4D8",
    borderClass: "border-[#00B4D8]",
    textClass: "text-[#00B4D8]",
    bgTint: "bg-[#00B4D8]/[0.10]",
  },
  grow: {
    color: "#0369A1",
    borderClass: "border-[#0369A1]",
    textClass: "text-[#0369A1]",
    bgTint: "bg-[#0369A1]/[0.10]",
  },
};

export function ThreeLayersSection() {
  const [activeLayer, setActiveLayer] = useState<"build" | "discover" | "grow">("build");

  const current = LAYERS.find((l) => l.id === activeLayer) || LAYERS[0];
  const activeTheme = LAYER_THEMES[activeLayer];

  return (
    <section className="relative w-full py-20 md:py-28 bg-gradient-to-b from-[#FFFFFF] via-[#F8FBFE] to-[#F1F6FB] border-t border-b border-[rgba(14,165,233,0.12)] text-[#0B1320]">
      {/* Cyan Ambient Background Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20 -z-10"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(2, 132, 199, 0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="vistar-container space-y-14">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white border border-[rgba(14,165,233,0.15)] text-xs font-mono tracking-wider uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span className="text-[#0B1320] font-bold">04 // Sovereign Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-[-0.03em] text-[#050A14] leading-tight">
            The Three Sovereign Layers
          </h2>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed font-serif">
            Modern digital operations fail when engineering, discovery, and retention are contracted to separate siloed agencies. Vistar operates as a single connected technological engine.
          </p>
        </div>

        {/* Interactive Layer Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2 bg-[#F0F6FA] border border-[rgba(14,165,233,0.12)] rounded-[10px]">
          {LAYERS.map((layer) => {
            const isActive = activeLayer === layer.id;
            const theme = LAYER_THEMES[layer.id];
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
                className={`text-left p-4 md:p-5 rounded-[8px] transition-all cursor-pointer border ${
                  isActive
                    ? `border-[rgba(2,132,199,0.30)] bg-white shadow-sm`
                    : "border-transparent text-[#64748B] hover:text-[#0B1320] hover:bg-white/60"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded-[4px] ${
                      isActive ? `${theme.bgTint} ${theme.textClass}` : "text-[#94A3B8]"
                    }`}
                  >
                    {layer.number}
                  </span>
                  <span
                    className={`font-display font-bold text-base md:text-lg tracking-wide ${
                      isActive ? "text-[#0B1320]" : ""
                    }`}
                  >
                    {layer.name}
                  </span>
                </div>
                <p className="text-xs font-serif text-[#64748B] line-clamp-1">
                  {layer.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Layer Deep-Dive Card */}
        <Card className="p-8 md:p-12 space-y-10 bg-white border border-[rgba(14,165,233,0.14)] rounded-[12px] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[rgba(14,165,233,0.12)]">
            <div className="space-y-2">
              <span className={`font-mono text-xs font-bold tracking-wider ${activeTheme.textClass}`}>
                LAYER {current.number} // {current.tagline.toUpperCase()}
              </span>
              <h3 className="text-3xl font-display font-bold text-[#050A14]">
                {current.name}
              </h3>
            </div>
            <Button variant="secondary" href={current.href}>
              VIEW {current.name} ARCHITECTURE ↗
            </Button>
          </div>

          <p className="text-[#475569] max-w-3xl text-lg leading-relaxed font-serif">
            {current.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Capabilities Column */}
            <div className="space-y-4">
              <p className={`font-mono text-xs font-bold tracking-wider ${activeTheme.textClass}`}>
                ENGINEERING CAPABILITIES
              </p>
              <ul className="space-y-3 font-serif text-[15px] text-[#0B1320]/85">
                {current.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <span className={`${activeTheme.textClass} font-mono text-xs mt-1`}>
                      +
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables Column */}
            <div className="space-y-4">
              <p className={`font-mono text-xs font-bold tracking-wider ${activeTheme.textClass}`}>
                VERIFIED DELIVERABLES
              </p>
              <ul className="space-y-3 font-serif text-[15px] text-[#0B1320]/85">
                {current.deliverables.map((del) => (
                  <li key={del} className="flex items-start gap-3">
                    <span className={`${activeTheme.textClass} font-mono text-xs mt-1`}>
                      →
                    </span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default ThreeLayersSection;
