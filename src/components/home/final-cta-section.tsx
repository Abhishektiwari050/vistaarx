"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#121316] text-white relative overflow-hidden select-none">
      {/* Subtle background technical grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1341E] animate-pulse" />
          <span>Low-Friction Initial Conversation</span>
        </div>

        {/* Primary Invitation Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
          Tell us about one process you want to improve.
        </h2>

        {/* Explanatory Context */}
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
          The first conversation is strictly to understand fit, explore whether software will genuinely save your team time, and outline potential solutions. No sales pressure, no multi-thousand-dollar commitments, and no corporate runarounds.
        </p>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-[14.5px] font-semibold transition-all shadow-md active:scale-95 gap-2 group"
          >
            <span>Start with a brief message</span>
            <ArrowRight className="w-4 h-4 text-[#121316] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <a
            href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20improving%20a%20process%20at%20our%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14.5px] font-semibold transition-all shadow-md active:scale-95 gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (+91 88601 10144)</span>
          </a>

          <Link
            href="/work"
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-white/20 hover:bg-white/10 text-white text-[14.5px] font-medium transition-all active:scale-95"
          >
            <span>Inspect working systems</span>
          </Link>
        </div>

        {/* Reassurance points */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            Direct reply from Abhishek within 24h
          </span>
          <span className="hidden sm:inline text-white/20">&bull;</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            Bilateral NDA before detailed scoping
          </span>
          <span className="hidden sm:inline text-white/20">&bull;</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            100% private GitHub repository handover
          </span>
        </div>

      </div>
    </section>
  );
}

export default FinalCtaSection;
