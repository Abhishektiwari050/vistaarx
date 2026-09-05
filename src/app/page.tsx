"use client";

import React from "react";
import { VistarHero } from "@/components/vistar-hero";
import { ProblemSection } from "@/components/home/problem-section";
import { BeforeAfterSection } from "@/components/home/before-after-section";
import { ArchitectureLayersSection } from "@/components/home/architecture-layers-section";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { SelectedWorkSection } from "@/components/home/selected-work-section";
import { ProcessSection } from "@/components/home/process-section";
import { OwnershipSection } from "@/components/home/ownership-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-x-hidden">
      
      {/* Global subtle film noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 01 — HERO: "WE BUILD THE SYSTEMS YOUR BUSINESS RUNS ON" */}
      <VistarHero />

      {/* 02 — THE PROBLEM: "YOUR BUSINESS SHOULDN'T RUN ON DISCONNECTED TOOLS" */}
      <ProblemSection />

      {/* 03 — THE SYSTEM: BEFORE → AFTER INTERACTIVE TRANSFORMATION */}
      <BeforeAfterSection />

      {/* 04 — WHAT WE ACTUALLY ENGINEER: 7-LAYER SYSTEMS ARCHITECTURE */}
      <ArchitectureLayersSection />

      {/* 05 — CAPABILITIES: PROBLEM → APPROACH → TECH → OUTCOME */}
      <CapabilitiesSection />

      {/* 06 — SELECTED WORK: REAL VERIFIED CASE STUDIES & GITHUB REPOSITORIES */}
      <SelectedWorkSection />

      {/* 07 — PROCESS: THE 21-DAY SPRINT RHYTHM */}
      <ProcessSection />

      {/* 08 & 09 — OWNERSHIP PHILOSOPHY & VERIFIED ENGINEERING STANDARDS */}
      <OwnershipSection />

      {/* 10 — FINAL CLIMACTIC CTA: "HAVE A SYSTEM WORTH BUILDING?" */}
      <FinalCTASection />

    </div>
  );
}
