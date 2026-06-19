"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeOverlay } from "@/components/theme-overlay";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(() => import("@/components/3d/cobe-globe"), {
  ssr: false,
});

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", projectType: "Bespoke 3D / Web Design", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Bespoke 3D / Web Design",
    "Custom Software Webapp",
    "AI Workflow Automation",
    "Full Digital Core"
  ];

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
          setFormState({ name: "", email: "", projectType: "Bespoke 3D / Web Design", message: "" });
        }, 4000);
      }
    } catch (err) {
      console.error("Failed to submit contact page brief:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex flex-col justify-center px-6 md:px-12 pt-8 pb-16 z-20 max-w-6xl mx-auto space-y-8">
      <ThemeOverlay />

      {/* Noise overlay for premium grain */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Background System Grid */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none system-grid" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full my-auto relative z-10">
        
        {/* Left Column: Form & Header (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header section */}
          <div className="text-left select-none space-y-3">
            <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#ff1e90] uppercase border-2 border-black px-3 py-1 bg-[#ff1e90]/10 rounded inline-block shadow-[2px_2px_0px_#000]">
              Start Project Compile
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              Connect HQ
            </h1>
            <p className="font-sans text-xs sm:text-sm text-zinc-650 max-w-md leading-relaxed">
              Transmit your project coordinates below. Our lead systems architect will evaluate your specifications and reply in less than 24 hours.
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
                      <label htmlFor="form-email" className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Email Address</label>
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
                    <span className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Project Category</span>
                    <div className="flex flex-wrap gap-2.5">
                      {categories.map((cat) => {
                        const isActive = formState.projectType === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormState({ ...formState, projectType: cat })}
                            className={`px-4 py-2 text-[10px] font-display font-black uppercase rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                              isActive
                                ? "bg-[#ff1e90] text-black border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white text-zinc-600 border-zinc-200 hover:border-black/50 hover:bg-[#faf9f5]"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Textarea brief */}
                  <div className="space-y-2">
                    <label htmlFor="form-msg" className="font-display text-[9px] font-black tracking-widest uppercase text-zinc-400 block">Project Brief &amp; Specifications</label>
                    <textarea
                      id="form-msg"
                      required
                      rows={5}
                      placeholder="Describe the platform goal, target launch date, and budget details..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#faf9f5]/85 border-[2px] border-black rounded-lg px-4 py-3 font-sans text-xs text-black focus:outline-none focus:border-[#ff1e90] focus:ring-1 focus:ring-[#ff1e90] transition-all resize-none placeholder:text-zinc-400"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 border-[2.5px] border-black bg-[#0a0a0a] text-white font-display text-xs font-bold tracking-widest uppercase transition-all rounded-xl hover:bg-[#ff1e90] hover:text-black cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]"
                  >
                    Submit Brief to HQ ⚡
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
                  <h3 className="font-display text-base font-black tracking-wider text-black uppercase">Brief Compiled Successfully</h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
                    Your specifications have been routed to Vistar HQ. Our lead systems architect will evaluate the parameters and connect back shortly.
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

        {/* Right Column: Globe telemetry console (5 columns) */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border-[2.5px] border-black p-6 rounded-2xl shadow-[6px_6px_0px_#d8ff42] flex flex-col justify-between items-center text-white h-[450px] relative overflow-hidden select-none">
          {/* Header readout */}
          <div className="flex justify-between items-center w-full font-mono text-[9px] text-[#d8ff42] tracking-widest uppercase border-b border-white/10 pb-3">
            <span>ACTIVE CORE TELEMETRY</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d8ff42] animate-ping" />
              NODE: ND-IN-01
            </span>
          </div>

          {/* Globe space */}
          <div className="w-full flex items-center justify-center my-auto h-[280px]">
            <CobeGlobe />
          </div>

          {/* Footer readout */}
          <div className="flex justify-between items-center w-full font-mono text-[8px] text-white/50 border-t border-white/10 pt-3">
            <span>COORDS: 28.6139° N, 77.2090° E</span>
            <span>STATUS: READY // ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
