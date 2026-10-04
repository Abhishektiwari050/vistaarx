"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Clock,
  Building,
  User,
  Globe,
  FileText,
} from "lucide-react";

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    contactMethod: "whatsapp" as "whatsapp" | "email" | "phone",
    contactValue: "",
    problemDescription: "",
    websiteUrl: "",
    _hp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.contactValue.trim() || !formState.problemDescription.trim()) {
      setErrorMessage("Please complete all required fields so we can follow up with you.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Format email or contact payload for API compatibility
    const isEmail = formState.contactValue.includes("@");
    const emailVal = isEmail ? formState.contactValue.trim() : `${formState.name.toLowerCase().replace(/\s+/g, "")}@inquiry.vistar.tech`;
    const phoneVal = !isEmail ? formState.contactValue.trim() : "";

    const combinedNotes = `
PREFERRED CONTACT METHOD: ${formState.contactMethod.toUpperCase()} (${formState.contactValue})
COMPANY WEBSITE: ${formState.websiteUrl || "Not provided"}

PROCESS / PROBLEM TO IMPROVE:
${formState.problemDescription}
    `.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: emailVal,
          phone: phoneVal || (formState.contactMethod === "whatsapp" ? formState.contactValue : ""),
          company: formState.company.trim() || "Independent",
          notes: combinedNotes,
          brief: combinedNotes,
          goal: "Workflow Assessment & Automation",
          _hp: formState._hp,
          date: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReferenceId(data.referenceId || "VST-RECEIVED");
        setIsSubmitted(true);
      } else {
        setErrorMessage(
          (data.errors && data.errors[0]) ||
            "Unable to submit right now. Please reach out directly on WhatsApp (+91 88601 10144) or email services.vistaar@gmail.com."
        );
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please WhatsApp us at +91 88601 10144 or email services.vistaar@gmail.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-black/8 pb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Direct Founder Access
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            Let’s discuss your workflow bottleneck.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
            Whether you want to automate incoming WhatsApp enquiries, build a custom operational portal, or replace manual spreadsheets, tell us what process is slowing you down.
          </p>
        </div>

        {/* Dual Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Path 1: Short Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-black/10 rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.02)]">
            {isSubmitted ? (
              <div className="space-y-6 py-6 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-neutral-100 text-neutral-800">
                    REFERENCE: {referenceId}
                  </div>
                  <h3 className="text-2xl font-bold text-[#121316]">
                    Workflow inquiry received.
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-lg">
                    Abhishek Tiwari (Founder &amp; Principal Systems Engineer) will review your notes and reply with initial thoughts and questions within 1 business day.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-black/6 text-xs text-neutral-600 space-y-2">
                  <div className="font-semibold text-neutral-900">What happens next?</div>
                  <ul className="space-y-1.5 list-disc pl-4">
                    <li>We evaluate your process bottleneck against existing software options.</li>
                    <li>We schedule a brief 20-minute video or phone call to walk through the workflow.</li>
                    <li>If it’s a good fit, we provide a fixed-scope statement of work and quotation.</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({
                      name: "",
                      company: "",
                      contactMethod: "whatsapp",
                      contactValue: "",
                      problemDescription: "",
                      websiteUrl: "",
                      _hp: "",
                    });
                  }}
                  className="text-xs font-semibold text-[#121316] underline hover:text-[#E1341E]"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-[#121316]">
                    Short Project Brief
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    No 6-step questionnaires. Just the basics so we can prepare before speaking.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Honeypot hidden input */}
                <input
                  type="text"
                  name="_hp"
                  value={formState._hp}
                  onChange={(e) => setFormState({ ...formState, _hp: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
                      <span>Your Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-black/30 focus:ring-1 focus:ring-black/10 text-xs font-sans bg-neutral-50/50 outline-none"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
                      <span>Company / Business</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="e.g. Acme Industrial Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-black/30 focus:ring-1 focus:ring-black/10 text-xs font-sans bg-neutral-50/50 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                      { id: "email", label: "Email", icon: Mail },
                      { id: "phone", label: "Phone Call", icon: Phone },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSel = formState.contactMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setFormState({ ...formState, contactMethod: m.id as any })}
                          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                            isSel
                              ? "bg-[#121316] text-white border-[#121316]"
                              : "bg-neutral-50 border-black/8 text-neutral-600 hover:bg-neutral-100"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Value (Email or Phone / WhatsApp) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
                    <span>
                      {formState.contactMethod === "email"
                        ? "Email Address"
                        : formState.contactMethod === "whatsapp"
                        ? "WhatsApp Phone Number"
                        : "Phone Number"}
                    </span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={formState.contactMethod === "email" ? "email" : "text"}
                    required
                    value={formState.contactValue}
                    onChange={(e) => setFormState({ ...formState, contactValue: e.target.value })}
                    placeholder={
                      formState.contactMethod === "email"
                        ? "name@company.com"
                        : "+91 98765 43210"
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-black/30 focus:ring-1 focus:ring-black/10 text-xs font-sans bg-neutral-50/50 outline-none"
                  />
                </div>

                {/* Problem Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
                    <span>What process or bottleneck do you want to improve?</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.problemDescription}
                    onChange={(e) => setFormState({ ...formState, problemDescription: e.target.value })}
                    placeholder="e.g. We get about 30 quote requests daily across WhatsApp and web forms. Our sales reps take 24 hours to respond because they have to manually calculate pricing in Excel and copy details back and forth."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-black/30 focus:ring-1 focus:ring-black/10 text-xs font-sans bg-neutral-50/50 outline-none leading-relaxed"
                  />
                </div>

                {/* Optional Website URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                    <span>Company Website</span>
                    <span className="text-neutral-400 font-normal text-[11px]">Optional</span>
                  </label>
                  <input
                    type="url"
                    value={formState.websiteUrl}
                    onChange={(e) => setFormState({ ...formState, websiteUrl: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-black/30 focus:ring-1 focus:ring-black/10 text-xs font-sans bg-neutral-50/50 outline-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Workflow Brief &rarr;</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-neutral-400 text-center font-mono">
                  Protected under mutual bilateral confidentiality &bull; No marketing spam
                </p>
              </form>
            )}
          </div>

          {/* Path 2: Direct Contact & FAQ (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Card */}
            <div className="bg-[#121316] text-white rounded-2xl p-6 sm:p-7 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FASTEST ROUTE</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Prefer a quick chat on WhatsApp?
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Have a quick question or want to discuss feasibility right away? Message Abhishek directly.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20process%20automation%20project%20with%20Vistar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp: +91 88601 10144</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11.5px] text-neutral-400 flex items-center justify-between">
                <span>Direct to Founder</span>
                <span>Lucknow, UP, India</span>
              </div>
            </div>

            {/* Email Alternative Card */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
              <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-black/8 flex items-center justify-center text-neutral-700">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#121316]">
                  Direct Email Inquiries
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Send RFPs, architecture diagrams, or workflow specs to:
                </p>
              </div>
              <a
                href="mailto:services.vistaar@gmail.com"
                className="text-xs font-mono font-semibold text-[#E1341E] hover:underline block"
              >
                services.vistaar@gmail.com
              </a>
            </div>

            {/* Reassurance Checklist */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-400">
                What to expect from Vistar:
              </h4>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Direct reply from Abhishek, not a commissioned sales rep.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Bilateral NDA signed before scoping proprietary details.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Fixed-scope quotes with guaranteed 100% repository handover.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
