"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeOverlay } from "@/components/theme-overlay";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(() => import("@/components/3d/cobe-globe"), {
  ssr: false,
});

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", projectType: "Web Design", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
          budget: "Not specified",
          date: "Not selected",
          timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Not specified",
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormState({ name: "", email: "", projectType: "Web Design", message: "" });
        }, 4000);
      }
    } catch (err) {
      console.error("Failed to submit contact page brief:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex flex-col justify-center px-6 md:px-12 pt-12 pb-16 z-20 max-w-7xl mx-auto space-y-8">
      <ThemeOverlay />

      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] opacity-5 pointer-events-none system-grid" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full my-auto relative z-10">
        
        {/* Left Column: Form & Header (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header section */}
          <div className="text-left select-none space-y-3">
            <span className="font-display text-[9px] font-bold tracking-widest text-[#ff1e90] uppercase border border-[#ff1e90]/20 px-3 py-1 bg-[#ff1e90]/5 rounded inline-block">
              Start Project Compile
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold uppercase tracking-tight text-black leading-none">
              Connect HQ
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
              Transmit your project coordinates below. Our system operator will respond within less than 24 hours.
            </p>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleFormSubmit}
                  className="bg-white/70 backdrop-blur-md border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-[6px_6px_20px_rgba(0,0,0,0.015)] text-left space-y-6 brutalist-glow-pink"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400">Your Name</label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        placeholder="Alexander Vance"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#faf9f5]/80 border border-zinc-200 rounded px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-zinc-800 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400">Email Address</label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        placeholder="alex@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#faf9f5]/80 border border-zinc-200 rounded px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-zinc-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-type" className="font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400">Project Category</label>
                    <select
                      id="form-type"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-[#faf9f5]/80 border border-zinc-200 rounded px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-zinc-800 transition-colors"
                    >
                      <option value="Web Design">Bespoke 3D / Web Design</option>
                      <option value="Web Application">Custom Software Webapp</option>
                      <option value="AI Automation">AI Workflow Automation</option>
                      <option value="Full Stack Lab">Full Digital Core (Combined)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-msg" className="font-display text-[10px] font-bold tracking-widest uppercase text-zinc-400">Project Brief & Specifications</label>
                    <textarea
                      id="form-msg"
                      required
                      rows={5}
                      placeholder="Describe the platform goal, target launch date, and budget details..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#faf9f5]/80 border border-zinc-200 rounded px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-zinc-800 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 border border-zinc-800 bg-[#0c0c0e] text-[#faf9f5] font-display text-xs font-bold tracking-widest uppercase transition-colors rounded hover:bg-[#ff1e90] hover:text-black cursor-pointer shadow-sm"
                  >
                    Submit Brief to HQ ⚡
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-zinc-200 rounded p-12 shadow-sm text-center space-y-4"
                >
                  <span className="text-4xl block animate-bounce">⚡</span>
                  <h3 className="font-display text-base font-semibold tracking-wider text-black uppercase">Brief Compiled Successfully</h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
                    Your specifications have been routed to Vistar HQ. Our lead systems architect will reply within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct Email Backup */}
            <div className="text-center mt-6 font-sans text-xs text-zinc-500 select-none">
              Bypass this form and email us directly:{" "}
              <a href="mailto:hello@vistar.tech" className="font-mono font-bold underline text-[#ff1e90] hover:text-black transition-colors interactive">
                hello@vistar.tech
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Globe (5 Columns) */}
        <div className="lg:col-span-5 flex items-center justify-center h-[450px]">
          <CobeGlobe />
        </div>

      </div>
    </div>
  );
}
