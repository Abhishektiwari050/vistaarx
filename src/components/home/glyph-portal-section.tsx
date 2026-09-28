"use client";

import React from "react";
import GlyphPortal from "@/components/ui/glyph-portal";

export function GlyphPortalSection() {
  return (
    <div className="relative w-full border-t border-b border-[#0B1320]/[0.08] bg-transparent select-none">
      <GlyphPortal
        word="SOVEREIGN"
        scrollLength={2.0}
        interactive={true}
        annotations={false}
        enterLabel="Inspect Core"
        className="w-full bg-[#FAF9F5] text-[#141413]"
        style={{
          "--gp-paper": "#FAF9F5",
          "--gp-ink": "#141413",
          "--gp-field": "#F0EEE6",
          "--gp-foreground": "#141413",
        } as React.CSSProperties}
        front={
          <>
            <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] shadow-[0_0_8px_rgba(2, 132, 199,0.4)] animate-pulse" />
              <span className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-[#141413]/80">
                PORTAL // PERSPECTIVE TRANSLATION
              </span>
            </div>
            <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center font-heading text-xs tracking-widest text-[#141413]/50 uppercase">
              Select any glyph &amp; scroll to step inside
            </p>
          </>
        }
        background={
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(2, 132, 199, 0.05), transparent 60%), linear-gradient(180deg, #FAF9F5 0%, #F0EEE6 50%, #FAF9F5 100%)",
            }}
          />
        }
      >
        <div className="max-w-4xl mx-auto space-y-6 text-center py-12 px-6">
          <span className="font-mono text-xs text-[#0284C7] font-semibold tracking-[0.2em] uppercase">
            LAYER 00 // FIRST PRINCIPLES
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0B1320] tracking-tight">
            Every System Deserves True Sovereignty.
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#0B1320]/75 max-w-2xl mx-auto leading-relaxed">
            We bypass disposable agency retainers and commodity template debt.
            Step through the architecture into our three connected engineering disciplines.
          </p>
        </div>
      </GlyphPortal>
    </div>
  );
}

export default GlyphPortalSection;
