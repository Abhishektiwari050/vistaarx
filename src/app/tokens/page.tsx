import Link from "next/link";
import { colors, typography, spacing, grid, buttons, cards } from "@/lib/design-tokens";
import { Button } from "@/components/vistar-button";
import { Card } from "@/components/vistar-card";

export default function DesignTokensPage() {
  return (
    <div className="bg-transparent text-[#0B1320] font-sans py-12 px-6 md:px-12">
      <div className="vistar-container space-y-16">
        
        {/* Header */}
        <div className="border-b border-[rgba(56, 189, 248, 0.15)] pb-8">
          <p className="type-label text-[#0284C7] mb-2">Step 1 &amp; Step 2 Verification // VISTAR P0</p>
          <h1 className="type-h2">Design Tokens &amp; Core Components</h1>
          <p className="type-body text-[#475569] mt-2 max-w-2xl">
            Strict programmatic representation of Ivory Editorial visual systems. Zero arbitrary values outside spec.
          </p>
        </div>

        {/* 1. Colors */}
        <section className="space-y-6">
          <h2 className="type-h3">1. Colors (Locked Palette)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="h-16 w-full bg-transparent border border-[rgba(56, 189, 248, 0.15)] mb-4" />
              <p className="type-label">Warm Ivory Paper</p>
              <p className="font-mono text-xs text-[#475569]">{colors.nearBlack}</p>
              <p className="text-xs text-[#94A3B8] mt-1">Canvas / Base ground</p>
            </Card>
            <Card className="p-6">
              <div className="h-16 w-full bg-[#F0F7FD]/60 border border-[rgba(56, 189, 248, 0.15)] mb-4" />
              <p className="type-label">Warm Parchment Surface</p>
              <p className="font-mono text-xs text-[#475569]">{colors.surfaceElevated}</p>
              <p className="text-xs text-[#94A3B8] mt-1">Elevated cards &amp; section contrast</p>
            </Card>
            <Card className="p-6">
              <div className="h-16 w-full bg-[#0284C7] mb-4" />
              <p className="type-label text-[#0284C7]">Primary Accent (Forest Green)</p>
              <p className="font-mono text-xs text-[#475569]">{colors.accent}</p>
              <p className="text-xs text-[#94A3B8] mt-1">CTAs &amp; active routes</p>
            </Card>
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-8 border-t border-[rgba(56, 189, 248, 0.15)] pt-12">
          <h2 className="type-h3">2. Typography Scale (Instrument Sans)</h2>
          
          <div className="space-y-6">
            <div className="border-b border-[rgba(56, 189, 248, 0.15)] pb-6">
              <p className="type-label text-[#94A3B8] mb-1">Display (96px desktop / 48px mobile, 600)</p>
              <p className="type-display">BUILD. DISCOVER. GROW.</p>
            </div>

            <div className="border-b border-[rgba(56, 189, 248, 0.15)] pb-6">
              <p className="type-label text-[#94A3B8] mb-1">H2 (48px desktop / 32px mobile, 600)</p>
              <p className="type-h2">Connected Growth Infrastructure</p>
            </div>

            <div className="border-b border-[rgba(56, 189, 248, 0.15)] pb-6">
              <p className="type-label text-[#94A3B8] mb-1">H3 (24px, 500)</p>
              <p className="type-h3">Autonomous System Architecture</p>
            </div>

            <div className="border-b border-[rgba(56, 189, 248, 0.15)] pb-6">
              <p className="type-label text-[#94A3B8] mb-1">Body (17px, 400, line-height 1.6)</p>
              <p className="type-body max-w-3xl text-[#475569]">
                Vistar builds AI-powered software and digital growth systems for modern businesses. Engineered from raw primitives as one connected technological engine with 100% client codebase ownership.
              </p>
            </div>

            <div>
              <p className="type-label text-[#94A3B8] mb-1">Small / Label (13px, 500, uppercase, letter-spacing 0.05em)</p>
              <p className="type-label text-[#0284C7]">VISTAR // CORE GRAMMAR // ACTIVE NODE</p>
            </div>
          </div>
        </section>

        {/* 3. Spacing Scale */}
        <section className="space-y-6 border-t border-[rgba(56, 189, 248, 0.15)] pt-12">
          <h2 className="type-h3">3. Spacing Scale (8, 16, 24, 32, 48, 64, 96, 128px)</h2>
          <div className="space-y-3 font-mono text-xs">
            {[8, 16, 24, 32, 48, 64, 96, 128].map((px) => (
              <div key={px} className="flex items-center gap-4">
                <span className="w-16 text-[#475569]">{px}px</span>
                <div 
                  className="h-4 bg-[#0284C7]" 
                  style={{ width: `${px}px` }} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Buttons & Cards */}
        <section className="space-y-6 border-t border-[rgba(56, 189, 248, 0.15)] pt-12">
          <h2 className="type-h3">4. Button &amp; Card Components (&lt;Button&gt; &amp; &lt;Card&gt;)</h2>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary" href="/start">
              START A PROJECT
            </Button>
            <Button variant="secondary" href="/build">
              EXPLORE SYSTEMS ↗
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <Card className="p-6 space-y-3" hoverHighlight>
              <span className="type-label text-[#0284C7]">PHASE 01</span>
              <h3 className="type-h3">BUILD</h3>
              <p className="type-body text-[#475569] text-[15px]">
                Full-stack web applications and autonomous AI systems built from raw primitives.
              </p>
            </Card>
            <Card className="p-6 space-y-3" hoverHighlight>
              <span className="type-label text-[#0284C7]">PHASE 02</span>
              <h3 className="type-h3">DISCOVER</h3>
              <p className="type-body text-[#475569] text-[15px]">
                Targeted distribution algorithms and high-conversion demand generation networks.
              </p>
            </Card>
            <Card className="p-6 space-y-3" hoverHighlight>
              <span className="type-label text-[#0284C7]">PHASE 03</span>
              <h3 className="type-h3">GROW</h3>
              <p className="type-body text-[#475569] text-[15px]">
                Automated lifecycle operations, recurring retention engines, and client scale.
              </p>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
