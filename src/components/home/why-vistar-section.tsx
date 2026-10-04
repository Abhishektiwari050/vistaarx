"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Zap,
  Code,
  FolderGit2,
  BookOpen,
  Headphones,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

const ADVANTAGES = [
  {
    icon: User,
    title: "Direct Access to the Lead Engineer",
    description:
      "You speak directly with Abhishek Tiwari, the founder and senior engineer building your system. No account executives translating your words into inaccurate tickets, and no junior contractors learning on your budget.",
  },
  {
    icon: ShieldCheck,
    title: "Tightly Bounded Project Scope",
    description:
      "We define exact specifications before starting. You know what you’re getting, what it costs, and when it deploys. No endless billing creep or unexpected surprise invoices at the end.",
  },
  {
    icon: Zap,
    title: "Practical AI for Engineering Velocity",
    description:
      "We use modern AI tools to accelerate code generation, test authoring, and schema drafting—passing the speed and cost efficiency directly to you while ensuring every line of logic is reviewed by a human senior engineer.",
  },
  {
    icon: Code,
    title: "Production Systems, Not Throwaway Demos",
    description:
      "We build on battle-tested frameworks like Next.js, Node.js, Python, PostgreSQL, and standard cloud APIs. The resulting architecture is maintainable, scalable, and easy for any competent engineer to understand.",
  },
  {
    icon: FolderGit2,
    title: "100% Client Code Ownership",
    description:
      "Your private GitHub repository is transferred completely to your company. You hold the master administrative keys, the database access, and the intellectual property. Zero vendor lock-in.",
  },
  {
    icon: BookOpen,
    title: "Complete Documentation & Runbooks",
    description:
      "Every delivery includes clean documentation, environment configuration examples, and an operational runbook so your internal staff can manage everyday operations with complete confidence.",
  },
];

export function WhyVistarSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-y border-black/8 text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Why a Founder-Led Studio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12]">
            Engineering depth without the corporate agency overhead.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Traditional software consultancies charge premium markups to fund layers of sales reps and office overhead. As a founder-led studio, our value proposition is simple: high technical craft, direct communication, and practical systems that work.
          </p>
        </div>

        {/* 6 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-black/20 transition-all"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-black/8 flex items-center justify-center text-[#E1341E]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg sm:text-[19px] font-bold text-[#121316] leading-snug">
                    {adv.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder Bio Card */}
        <div className="mt-12 bg-white border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xs">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/10 shrink-0 bg-neutral-100">
            <Image
              src="/images/headshot_primary.png"
              alt="Abhishek Tiwari — Founder & Lead Engineer at VISTAR"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>

          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h4 className="text-xl font-bold text-[#121316]">
                Abhishek Tiwari
              </h4>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 text-neutral-700">
                Founder &amp; Principal Systems Engineer
              </span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
              &ldquo;I lead discovery, architecture, and core engineering on every engagement. My goal is to build software that quietly does its job every single day, so you can stop wrestling with spreadsheets and focus on growing your business.&rdquo;
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-neutral-500">
              <span>📍 Lucknow, UP, India</span>
              <span>&bull;</span>
              <span>📞 +91 88601 10144</span>
              <span>&bull;</span>
              <span>✉️ services.vistaar@gmail.com</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
            <a
              href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20software%20project%20with%20Vistar."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold gap-1.5 transition-colors shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Abhishek</span>
            </a>
            <Link
              href="/about"
              className="inline-flex items-center justify-center h-10 px-5 rounded-xl border border-black/10 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold gap-1.5 transition-colors"
            >
              <span>Read Studio Story &rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyVistarSection;
