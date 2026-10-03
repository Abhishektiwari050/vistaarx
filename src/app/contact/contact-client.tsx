"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Terminal,
  Clock,
  Lock,
  Loader2,
  AlertCircle,
  Building2,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "WhatsApp & AI Automations",
    budget: "â‚¹49k â€“ â‚¹1.5L ($600 â€“ $1.8k)",
    message: "",
    _hp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categories = [
    "WhatsApp & AI Automations",
    "Custom Web App / Portal",
    "3D Spatial / Interactive Website",
    "Enterprise Systems & Integrations",
    "14-Day Production Sprint",
  ];

  const budgetTiers = [
    "â‚¹49k â€“ â‚¹1.5L ($600 â€“ $1.8k)",
    "â‚¹1.5L â€“ â‚¹3.5L ($1.8k â€“ $4.2k)",
    "â‚¹3.5L+ ($4.2k+)",
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          company: formState.company,
          brief: formState.message,
          notes: formState.message,
          budget: formState.budget,
          projectType: formState.projectType,
          goal: formState.projectType,
          _hp: formState._hp,
          date: new Date().toISOString(),
          timezone:
            typeof Intl !== "undefined"
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : "Not specified",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReferenceId(data.referenceId || "VST-CONFIRMED");
        setIsSubmitted(true);
      } else {
        setErrorMessage(
          (data.errors && data.errors[0]) ||
            "Unable to submit requirements right now. Please email us directly at services.vistaar@gmail.com."
        );
      }
    } catch (err) {
      console.error("Failed to submit contact brief:", err);
      setErrorMessage(
        "Network connection error. Please try again or reach out directly to services.vistaar@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setReferenceId(null);
    setErrorMessage(null);
    setFormState({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "WhatsApp & AI Automations",
      budget: "â‚¹49k â€“ â‚¹1.5L ($600 â€“ $1.8k)",
      message: "",
      _hp: "",
    });
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* â”€â”€ FRAME 1: EDITORIAL HEADER â”€â”€ */}
      <section className="relative w-full pt-28 pb-12 md:pt-36 md:pb-16 border-b border-black/10 overflow-hidden px-4 sm:px-6">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/10 rounded-full text-xs font-medium text-[#5E605D] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DIRECT FOUNDER CONSULTATION &bull; 24H SLA</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#0E1118] tracking-tight leading-[1.08]">
            Let&apos;s talk about your <br />
            <span className="text-[#5E605D] italic">software or AI project.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[19px] text-[#5E605D] max-w-2xl mx-auto leading-relaxed font-normal">
            Direct collaboration with Abhishek Tiwari (Founder &amp; Lead Engineer). We review your requirements, provide honest technical feasibility, and scope working production systems delivered in 14-day sprints.
          </p>
        </div>
      </section>

      {/* â”€â”€ FRAME 2: CONTACT FORM & DIRECT CHANNELS â”€â”€ */}
      <section className="w-full py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-black/10 rounded-2xl p-6 sm:p-10 shadow-xs">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6 text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                      REF ID: {referenceId}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0E1118]">
                      Requirements Received
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you. We have received your technical requirements. Abhishek Tiwari will personally review the brief and respond within 24 hours.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors cursor-pointer"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
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
                          disabled={isSubmitting}
                          onClick={() => {
                            setFormState({ ...formState, projectType: cat });
                          }}
                          className={`px-3.5 py-1.5 text-xs font-medium rounded-[4px] border transition-colors cursor-pointer ${
                            formState.projectType === cat
                              ? "bg-[#141413] text-white border-[#141413]"
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
                        Full Name <span className="text-[#FF3823]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Abhishek Tiwari"
                        className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                        Work / Personal Email <span className="text-[#FF3823]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="abhishek@example.com"
                        className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        Phone / WhatsApp (Recommended)
                      </label>
                      <input
                        type="tel"
                        disabled={isSubmitting}
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                        Company / Business Name (Optional)
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={formState.company}
                        onChange={(e) =>
                          setFormState({ ...formState, company: e.target.value })
                        }
                        placeholder="Business / Startup Name"
                        className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Budget Tier */}
                  <div className="space-y-2.5">
                    <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {budgetTiers.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => {
                            setFormState({ ...formState, budget: tier });
                          }}
                          className={`py-2 px-2 text-xs font-semibold rounded-[4px] border text-center transition-colors cursor-pointer ${
                            formState.budget === tier
                              ? "bg-[#141413] text-white border-[#141413]"
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
                      What are you looking to build? <span className="text-[#FF3823]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell us about the problem you need solved: e.g. a WhatsApp bot to qualify leads from IndiaMART, a custom internal CRM, a fast Next.js website, or an interactive 3D model viewer..."
                      className="w-full bg-[#FAF9F5] border border-black/15 rounded-[4px] p-4 text-sm text-neutral-900 focus:outline-none focus:border-[#FF3823] focus:bg-white transition-colors disabled:opacity-60"
                    />
                  </div>

                  {/* Hidden Anti-Spam Honeypot */}
                  <input
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState._hp}
                    onChange={(e) =>
                      setFormState({ ...formState, _hp: e.target.value })
                    }
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Error Notification */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-[4px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      <div>{errorMessage}</div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm py-4 rounded-[4px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending to Abhishek...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Specification</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Guaranteed reply within 24h
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-neutral-400" />
                      Bilateral NDA Protected
                    </span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Channels & WhatsApp CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout Card */}
            <div className="bg-[#E8FCE8] border border-emerald-300 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-normal text-emerald-950">
                    Prefer instant chat?
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Chat directly with Abhishek on WhatsApp.
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-900 leading-relaxed">
                Skip forms. Send us your requirements, voice notes, or website links on WhatsApp for a fast reply and initial estimate.
              </p>

              <a
                href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I'm%20interested%20in%20building%20custom%20software%20or%20AI%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 88601 10144)</span>
              </a>
            </div>

            {/* Direct Channels Card */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
              <h4 className="font-serif text-lg font-normal text-[#0E1118]">
                Direct Founder Contact
              </h4>
              <div className="space-y-4 text-xs text-neutral-600">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF3823] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#0E1118]">Direct Email</span>
                    <a
                      href="mailto:services.vistaar@gmail.com"
                      className="hover:underline font-mono text-[#FF3823] font-semibold"
                    >
                      services.vistaar@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#0E1118]">Confidentiality First</span>
                    <span className="text-neutral-500">Mutual Non-Disclosure Agreement (NDA) signed before codebase inspection.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Terminal className="w-4 h-4 text-[#1E60E6] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#0E1118]">100% Code Handover</span>
                    <span className="text-neutral-500">Day-one private GitHub transfer with Dockerfiles and complete documentation.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Wireframe Globe */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xs text-center space-y-2">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">
                STUDIO LOCATION &bull; LUCKNOW &bull; INDIA
              </span>
              <div className="w-full h-52 flex items-center justify-center">
                <RotatingEarth />
              </div>
              <p className="text-xs text-neutral-500 font-mono">
                Founder-led engineering studio based in Lucknow, Uttar Pradesh, India
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
