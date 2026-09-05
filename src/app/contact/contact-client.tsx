"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeOverlay } from "@/components/theme-overlay";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Bespoke Flagship Website",
    budget: "$15k – $25k",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Bespoke Flagship Website",
    "Full-Stack SaaS Platform",
    "Speed & Conversion Overhaul",
    "AI Workflow & Automation",
  ];

  const budgetTiers = ["$15k – $25k", "$25k – $50k", "$50k+"];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          brief: formState.message,
          budget: formState.budget,
          projectType: formState.projectType,
          date: new Date().toISOString(),
          timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Not specified",
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormState({
            name: "",
            email: "",
            projectType: "Bespoke Flagship Website",
            budget: "$15k – $25k",
            message: "",
          });
        }, 5000);
      }
    } catch (err) {
      console.error("Failed to submit contact page brief:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex flex-col justify-center px-6 md:px-12 pt-8 pb-20 z-20 max-w-6xl mx-auto space-y-12">
      <ThemeOverlay />

      {/* Noise overlay matching homepage */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Background System Grid */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none system-grid" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full my-auto relative z-10">
        
        {/* Left Column: Form & Header (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header section */}
          <div className="text-left select-none space-y-3">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#ff1e90] uppercase border-2 border-black px-3 py-1 bg-[#ff1e90]/10 rounded inline-block shadow-[2px_2px_0px_#000]">
              DIRECT CONSULTATION // 24-HOUR EVALUATION
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              Let&apos;s build your <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">growth engine.</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-600 max-w-md leading-relaxed">
              Transmit your project parameters below. Our lead systems architect will review your current metrics, identify bottlenecks, and reply in under 24 hours with an initial technical blueprint.
            </p>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleFormSubmit}
                  className="bg-white border-[2.5px] border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#ff1e90] text-left space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Your Name</label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        placeholder="Alexander Vance"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#faf9f5]/85 border-[2px] border-black rounded-lg px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-[#ff1e90] focus:ring-1 focus:ring-[#ff1e90] transition-all placeholder:text-zinc-400"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Work Email</label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        placeholder="alex@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#faf9f5]/85 border-[2px] border-black rounded-lg px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-[#ff1e90] focus:ring-1 focus:ring-[#ff1e90] transition-all placeholder:text-zinc-400"
                      />
                    </div>
                  </div>

                  {/* Project Category Interactive Badges */}
                  <div className="space-y-3">
                    <span className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Project Scope</span>
                    <div className="flex flex-wrap gap-2.5">
                      {categories.map((cat) => {
                        const isActive = formState.projectType === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormState({ ...formState, projectType: cat })}
                            className={`px-4 py-2 text-[10px] font-display font-black uppercase rounded-lg border-2 transition-all duration-200 cursor-pointer interactive ${
                              isActive
                                ? "bg-[#ff1e90] text-black border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white text-zinc-700 border-black/20 hover:border-black hover:bg-[#faf9f5]"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Tier Selector */}
                  <div className="space-y-3">
                    <span className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Target Investment Tier</span>
                    <div className="flex flex-wrap gap-2.5">
                      {budgetTiers.map((tier) => {
                        const isActive = formState.budget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setFormState({ ...formState, budget: tier })}
                            className={`px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase rounded-lg border-2 transition-all duration-200 cursor-pointer interactive ${
                              isActive
                                ? "bg-[#d8ff42] text-black border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white text-zinc-600 border-black/20 hover:border-black"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Textarea brief */}
                  <div className="space-y-2">
                    <label htmlFor="form-msg" className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Project Brief &amp; Performance Objectives</label>
                    <textarea
                      id="form-msg"
                      required
                      rows={4}
                      placeholder="Describe your current platform, conversion or speed bottlenecks, target launch date, and key expectations..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#faf9f5]/85 border-[2px] border-black rounded-lg px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-[#ff1e90] focus:ring-1 focus:ring-[#ff1e90] transition-all resize-none placeholder:text-zinc-400"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 border-[2.5px] border-black bg-[#0a0a0a] text-white font-display text-xs font-bold tracking-widest uppercase transition-all rounded-xl hover:bg-[#ff1e90] hover:text-black cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] interactive"
                  >
                    Submit Project Specifications ⚡
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="bg-white border-[2.5px] border-black rounded-2xl p-12 shadow-[6px_6px_0px_#d8ff42] text-center space-y-5"
                >
                  <span className="text-4xl block animate-bounce">⚡</span>
                  <h3 className="font-display text-base font-black tracking-wider text-black uppercase">Specifications Received</h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm mx-auto">
                    Your brief has been routed to our lead systems architect. We will evaluate your parameters and reach out within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct Email Backup */}
            <div className="text-center mt-6 font-sans text-xs text-zinc-500 select-none">
              Prefer direct email? Reach our founders directly:{" "}
              <a href="mailto:hello@vistar.tech" className="font-mono font-bold underline text-[#ff1e90] hover:text-black transition-colors interactive">
                hello@vistar.tech
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Strategic Partnership Blueprint (5 columns) */}
        <div className="lg:col-span-5 space-y-6 select-none">
          {/* Roadmap Card */}
          <div className="bg-white border-[2.5px] border-black p-6 md:p-8 rounded-2xl shadow-[6px_6px_0px_#000] space-y-6">
            <div className="space-y-1 border-b border-black/10 pb-4">
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#ff1e90]">
                HOW WE ENGAGE // TRANSPARENT ROADMAP
              </span>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-black">
                The Partnership Blueprint
              </h3>
            </div>

            <div className="space-y-5 font-sans text-xs">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#d8ff42] text-black border border-black shadow-[1px_1px_0px_#000] shrink-0">
                  01
                </span>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-sm uppercase text-black">
                    Architectural Audit (&lt; 24h)
                  </h4>
                  <p className="text-zinc-600 leading-relaxed">
                    Our lead architect reviews your current speed metrics, conversion leaks, and competitor landscape with zero fluff.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-[#ff1e90] text-black border border-black shadow-[1px_1px_0px_#000] shrink-0">
                  02
                </span>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-sm uppercase text-black">
                    Live 20-Min Alignment Call
                  </h4>
                  <p className="text-zinc-600 leading-relaxed">
                    A direct technical conversation with senior engineering (no junior account managers) to lock in requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-black text-white border border-black shadow-[1px_1px_0px_#000] shrink-0">
                  03
                </span>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-sm uppercase text-black">
                    Guaranteed 7–21d Sprint
                  </h4>
                  <p className="text-zinc-600 leading-relaxed">
                    Fixed-scope delivery, written Core Web Vitals guarantees (&gt;95 Lighthouse), and 100% full source code transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[9px] font-mono font-bold uppercase">
              <span className="text-zinc-500">Q2 2026 Availability:</span>
              <span className="text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-2 py-0.5 rounded">
                ● 2 Slots Remaining
              </span>
            </div>
          </div>

          {/* Global Edge Footprint Visual Card */}
          <div className="bg-[#111111] border-[2.5px] border-black p-6 rounded-2xl shadow-[6px_6px_0px_#d8ff42] text-white space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3 font-mono text-[9px] tracking-widest uppercase">
              <span className="text-[#d8ff42] font-bold">GLOBAL EDGE FOOTPRINT</span>
              <span className="text-zinc-400">24 EDGE POPS</span>
            </div>

            <div className="w-full flex items-center justify-center h-[200px] overflow-hidden">
              <RotatingEarth width={280} height={200} className="w-full h-full flex items-center justify-center bg-transparent" />
            </div>

            <div className="border-t border-white/10 pt-3 flex flex-wrap justify-between items-center text-[8px] font-mono uppercase text-zinc-400 gap-2">
              <span>SF · NYC · LONDON · TOKYO · NEW DELHI</span>
              <span className="text-[#d8ff42] font-bold">&lt; 150MS TTFB WORLDWIDE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Transparent Engagement Models ──────────────────────── */}
      <div className="space-y-8 pt-12 border-t-2 border-black/10 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 select-none">
          <span className="font-mono text-[9px] font-black tracking-widest uppercase text-[#d8ff42] bg-black px-3 py-1 rounded inline-block">
            ENGAGEMENT MODELS // FIXED SCOPE &amp; RETAINERS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
            Transparent Collaboration Tiers
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-600">
            No endless hourly billing surprises. Fixed timelines, clear milestones, and 100% full IP transfer on completion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#d8ff42] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-zinc-500">TIER 01 // SPRINT</span>
                <span className="font-mono text-[9px] font-bold bg-[#d8ff42] px-2 py-0.5 rounded border border-black text-black">2–4 WEEKS</span>
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                Rapid MVP Launch
              </h3>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                For funded startups needing to ship a production-grade web product, AI agent workflow, or high-conversion flagship site fast.
              </p>
              <ul className="font-sans text-xs space-y-2 text-zinc-700 pt-2 border-t border-black/5">
                <li className="flex items-center gap-2">✓ Production Next.js 15/16 or Python backend</li>
                <li className="flex items-center gap-2">✓ Sub-100ms TTFB edge hosting setup</li>
                <li className="flex items-center gap-2">✓ Core Web Vitals 95+ SLA guarantee</li>
                <li className="flex items-center gap-2">✓ 100% full GitHub repository handover</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setFormState(prev => ({ ...prev, projectType: "Speed & Conversion Overhaul", budget: "$15k – $25k" }));
                window.scrollTo({ top: 120, behavior: "smooth" });
              }}
              className="w-full py-3 bg-black text-[#d8ff42] font-display font-black text-[10px] tracking-widest uppercase rounded-lg border border-black hover:bg-[#d8ff42] hover:text-black transition-colors"
            >
              Select Sprint Tier &uarr;
            </button>
          </div>

          {/* Tier 2 */}
          <div className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#ff1e90] hover:shadow-[8px_8px_0px_#000] transition-all flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3 right-4 font-mono text-[8px] font-black uppercase px-2 py-0.5 rounded bg-[#ff1e90] text-white border border-black shadow-[1px_1px_0px_#000]">
              MOST POPULAR
            </span>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-zinc-500">TIER 02 // PLATFORM</span>
                <span className="font-mono text-[9px] font-bold bg-[#ff1e90] text-white px-2 py-0.5 rounded border border-black">4–8 WEEKS</span>
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                Custom Enterprise Build
              </h3>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                Complete custom platform architecture with interactive WebGL 3D, autonomous AI microservices, and design tokens.
              </p>
              <ul className="font-sans text-xs space-y-2 text-zinc-700 pt-2 border-t border-black/5">
                <li className="flex items-center gap-2">✓ Full-stack custom application architecture</li>
                <li className="flex items-center gap-2">✓ Bespoke 3D WebGL / Three.js interfaces</li>
                <li className="flex items-center gap-2">✓ AI multi-agent integration &amp; tool pipelines</li>
                <li className="flex items-center gap-2">✓ Comprehensive testing suite &amp; documentation</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setFormState(prev => ({ ...prev, projectType: "Bespoke Flagship Website", budget: "$25k – $50k" }));
                window.scrollTo({ top: 120, behavior: "smooth" });
              }}
              className="w-full py-3 bg-[#ff1e90] text-white font-display font-black text-[10px] tracking-widest uppercase rounded-lg border border-black hover:bg-black transition-colors"
            >
              Select Custom Build &uarr;
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white border-[2.5px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#d8ff42] transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-black/10 pb-3">
                <span className="font-mono text-[9px] font-black uppercase text-zinc-500">TIER 03 // PARTNERSHIP</span>
                <span className="font-mono text-[9px] font-bold bg-zinc-100 text-black px-2 py-0.5 rounded border border-black">MONTHLY</span>
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                Dedicated Engineering Pod
              </h3>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                Ongoing fractional tech leadership, continuous feature releases, infrastructure scaling, and performance monitoring.
              </p>
              <ul className="font-sans text-xs space-y-2 text-zinc-700 pt-2 border-t border-black/5">
                <li className="flex items-center gap-2">✓ Dedicated senior engineering bandwidth</li>
                <li className="flex items-center gap-2">✓ Priority SLA response within 4 hours</li>
                <li className="flex items-center gap-2">✓ Weekly sprint planning &amp; deploy reviews</li>
                <li className="flex items-center gap-2">✓ Direct Slack / Discord channel with founders</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setFormState(prev => ({ ...prev, projectType: "AI Workflow & Automation", budget: "$50k+" }));
                window.scrollTo({ top: 120, behavior: "smooth" });
              }}
              className="w-full py-3 bg-black text-white font-display font-black text-[10px] tracking-widest uppercase rounded-lg border border-black hover:bg-[#d8ff42] hover:text-black transition-colors"
            >
              Inquire For Pod &uarr;
            </button>
          </div>
        </div>
      </div>

      {/* ── Section 3: Client FAQ ─────────────────────────────────────────── */}
      <div className="space-y-6 pt-8 border-t-2 border-black/10 relative z-10 select-none">
        <div className="space-y-1">
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#ff1e90]">
            CLIENT ASSURANCE // COMMON INQUIRIES
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[3px_3px_0px_#000] space-y-2">
            <h3 className="font-display font-black text-sm uppercase text-black">
              Who owns the code and intellectual property?
            </h3>
            <p className="font-sans text-xs text-zinc-600 leading-relaxed">
              You own 100% of all source code, assets, and intellectual property. Everything is committed to your private GitHub repository and handed over unencumbered upon final milestone acceptance.
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[3px_3px_0px_#000] space-y-2">
            <h3 className="font-display font-black text-sm uppercase text-black">
              Do you sign non-disclosure agreements (NDAs)?
            </h3>
            <p className="font-sans text-xs text-zinc-600 leading-relaxed">
              Yes. We execute mutual standard NDAs before any sensitive data, proprietary codebases, or confidential business parameters are exchanged.
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[3px_3px_0px_#000] space-y-2">
            <h3 className="font-display font-black text-sm uppercase text-black">
              How do project milestones and payments work?
            </h3>
            <p className="font-sans text-xs text-zinc-600 leading-relaxed">
              Sprints typically operate on a 50% kick-off deposit and 50% balance due upon successful staging review, automated testing sign-off, and repository transfer.
            </p>
          </div>

          <div className="bg-white border-2 border-black rounded-xl p-5 shadow-[3px_3px_0px_#000] space-y-2">
            <h3 className="font-display font-black text-sm uppercase text-black">
              What if we need post-launch support and hosting?
            </h3>
            <p className="font-sans text-xs text-zinc-600 leading-relaxed">
              All deployments include 30 days of complimentary bug fixes and performance monitoring. We also provide ongoing fractional engineering retainers for continuous feature evolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
