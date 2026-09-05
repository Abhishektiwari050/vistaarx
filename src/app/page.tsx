"use client";

import React from "react";
import { ActOneExperience } from "@/components/home/act-one-experience";
import { ArchitectureLayersSection } from "@/components/home/architecture-layers-section";
import { SelectedWorkSection } from "@/components/home/selected-work-section";
import { OwnershipSection } from "@/components/home/ownership-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-clip">
      
      {/* Global subtle film noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* SCENE 01 — THE PHYSICAL SYSTEM (ACT I: ARRIVAL, STRAIN & MECHANICAL CLOSURE) */}
      <ActOneExperience />

      {/* SCENE 02 — THE 7-LAYER SYSTEMS ARCHITECTURE (PHYSICAL ASSEMBLY EXPLANATION) */}
      <ArchitectureLayersSection />

      {/* SCENE 03 — SELECTED WORK EXHIBITION (LARGE-SCALE REAL CASE STUDIES) */}
      <SelectedWorkSection />

      {/* SCENE 04 — THE SOVEREIGN OWNERSHIP MANIFESTO (100% CODE HANDOVER) */}
      <OwnershipSection />

      {/* SCENE 05 — DIRECT COMMISSION (ARCHITECTURAL SCOPING & CONTACT) */}
      <FinalCTASection />

    </div>
  );
}
