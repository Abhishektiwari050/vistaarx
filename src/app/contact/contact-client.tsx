"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Terminal, Clock, Lock } from "lucide-react";
import { playClick } from "@/lib/sound";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Autonomous AI Agents",
    budget: "$15k – $35k",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    "Autonomous AI Agents",
    "Sovereign VPC Platform",
    "Legacy Stack Migration",
    "High-Throughput Telemetry",
    "14-Day Production Sprint",
  ];

  const budgetTiers = ["$5k – $15k", "$15k – $35k", "$35k+"];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    playClick(1000, 0.03);

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
          timezone:
            typeof Intl !== "undefined"
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : "Not specified",
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormState({
            name: "",
            email: "",
            projectType: "Autonomous AI Agents",
            budget: "$15k – $35k",
            message: "",
          });
        }, 5000);
      }
    } catch (err) {
      console.error("Failed to submit contact brief:", err);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen pb-32">
      
      {/* ── 1. HEADER (JASPER BLUEPRINT GRID) ── */}
      <section className="w-full pt-16 pb-16 jasper-grid-hero border-b border-black/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div>
            <span className="jasper-tape-salmon font-mono text-xs uppercase tracking-wider font-semibold px-3 py-1">
              Direct Consultation // 24h SLA
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            Let&apos;s architect your{" "}
            <span className="jasper-tape-lime text-3xl sm:text-5xl md:text-6xl px-4 py-1">
              sovereign
            </span>{" "}
            platform.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Submit your technical requirements below. A principal systems architect will analyze your stack and respond within 24 hours with an actionable production roadmap and security architecture.
          </p>
        </div>
      </section>

      {/* ── 2. FORM & INFO SPLIT SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Clean White Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-black/10 rounded-[6px] shadow-sm p-8 sm:p-10 space-y-8">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Category Selection */}
                  <div className="space-y-2.5">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                      Requirement Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setFormState({ ...formState, projectType: cat });
                            playClick(900, 0.02);
                          }}
                          className={`px-3.5 py-1.5 text-xs font-medium rounded-[3px] border transition-colors cursor-pointer ${
                            formState.projectType === cat
                              ? "bg-[#FF3823] text-white border-[#FF3823]"
                              : "bg-[#FAF9F5] text-neutral-700 border-black/10 hover:border-black/25"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Chen"
                        className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                        Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget Tier */}
                  <div className="space-y-2.5">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                      Target Investment Range
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {budgetTiers.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setFormState({ ...formState, budget: tier });
                            playClick(950, 0.02);
                          }}
                          className={`py-2 text-xs font-semibold rounded-[3px] border text-center transition-colors cursor-pointer ${
                            formState.budget === tier
                              ? "bg-[#0E1118] text-white border-[#0E1118]"
                              : "bg-[#FAF9F5] text-neutral-700 border-black/10 hover:border-black/25"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Brief */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                      Technical Scope &amp; Target Constraints
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline your existing stack, target agent workflows, latency SLAs, and deployment perimeter..."
                      className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] p-4 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#FF3823] hover:bg-[#E0301C] text-white py-4 font-semibold text-sm rounded-[4px] shadow-sm transition-colors duration-150 inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Transmit Requirements to Systems Principal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-black/5 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      Falcon-1024 Encrypted Payload
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Guaranteed 24h SLA
                    </span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-4"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0E1118]">
                    Requirements Transmitted Successfully
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                    Our principal systems architect is reviewing your specifications. An actionable blueprint will arrive in your inbox within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Info & Dotted Globe (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Globe Card */}
            <div className="bg-white border border-black/10 rounded-[6px] shadow-sm p-6 text-center overflow-hidden">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-4">
                Global Edge Topology // 24 Anycast PoPs
              </span>
              <div className="w-full h-64 flex items-center justify-center">
                <RotatingEarth />
              </div>
            </div>

            {/* Direct Channel Card */}
            <div className="bg-white border border-black/10 rounded-[6px] shadow-sm p-6 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0E1118]">
                Direct Engineering Channels
              </h4>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FF3823]" />
                  <a href="mailto:engineering@vistar.tech" className="hover:underline font-mono text-xs">
                    engineering@vistar.tech
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>SOC2 Type II &amp; ISO 27001 Aligned</span>
                </div>
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-[#1E60E6]" />
                  <span>100% Day-One Private GitHub Handover</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
