"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Send,
  Building,
  User,
  Phone,
  FileText,
} from "lucide-react";

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    problemDescription: "",
    _hp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("services.vistaar@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.problemDescription.trim()) {
      setErrorMessage("Please complete your name, email, and workflow brief.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const combinedNotes = `
NAME: ${formState.name.trim()}
WORK EMAIL: ${formState.email.trim()}
WHATSAPP / PHONE: ${formState.phone.trim() || "Not provided"}
COMPANY: ${formState.company.trim() || "Independent"}

PROCESS / BOTTLENECK TO IMPROVE:
${formState.problemDescription.trim()}
    `.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          phone: formState.phone.trim() || undefined,
          company: formState.company.trim() || "Direct",
          notes: combinedNotes,
          brief: combinedNotes,
          goal: "Process Automation & Workflow Architecture",
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

  const getWhatsAppPrefillUrl = () => {
    const text = encodeURIComponent(
      `Hi VISTAR, I just submitted an inquiry on your website [Ref: ${referenceId || "Direct"}].\n\nName: ${formState.name}\nCompany: ${formState.company || "Direct"}\n\nBrief: ${formState.problemDescription}`
    );
    return `https://wa.me/918860110144?text=${text}`;
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#141518] min-h-screen pt-24 sm:pt-32 pb-24 font-sans select-none">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ── HEADER ROW ── */}
        <div className="max-w-3xl space-y-3.5 border-b border-black/8 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/8 text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-800 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3823] animate-pulse" />
            <span>DIRECT FOUNDER COLLABORATION // NEW DELHI</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#141518] leading-[1.08] text-balance">
            Let&apos;s discuss your workflow bottleneck.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal text-pretty max-w-2xl">
            Whether you need an automated WhatsApp enquiry intake pipeline, an internal operations dashboard, or custom Next.js software, tell us what process is slowing you down.
          </p>
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT: INTERACTIVE FORM (7 COLS) ── */}
          <div className="lg:col-span-7 bg-white border border-black/10 rounded-[28px] p-6 sm:p-10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.04)]">
            
            {isSubmitted ? (
              /* Success Screen with Immediate WhatsApp Continuation Option */
              <div className="space-y-7 py-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>

                <div className="space-y-2.5">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-neutral-100 text-neutral-800 border border-black/6">
                    REFERENCE: {referenceId}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#141518] tracking-tight">
                    Workflow inquiry received.
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal max-w-lg">
                    Our lead engineering team will review your workflow and reply within 24 hours. A copy has been indexed under Reference <strong className="font-mono text-neutral-900">{referenceId}</strong>.
                  </p>
                </div>

                {/* Instant WhatsApp Escalation Button (Guarantees immediate zero-drop communication) */}
                <div className="p-5 rounded-2xl bg-[#EDFBF2] border border-[#C6F2D4] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PREFER IMMEDIATE CHAT?</span>
                  </div>
                  <p className="text-xs text-emerald-900/80 leading-relaxed font-normal">
                    You can forward this brief straight to our lead engineer on WhatsApp to begin discussing feasibility immediately:
                  </p>
                  <a
                    href={getWhatsAppPrefillUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Open in WhatsApp with this brief &rarr;</span>
                  </a>
                </div>

                {/* Next Steps Card */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-black/6 text-xs text-neutral-700 space-y-2.5">
                  <div className="font-bold font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    WHAT HAPPENS NEXT:
                  </div>
                  <ul className="space-y-2 list-disc pl-4 text-neutral-600">
                    <li>We evaluate your operational bottleneck against technical feasibility.</li>
                    <li>We sign a bilateral mutual NDA before scoping any proprietary data.</li>
                    <li>If it&apos;s a mutual fit, we provide a fixed-scope milestone quotation in INR or USD.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        problemDescription: "",
                        _hp: "",
                      });
                    }}
                    className="text-xs font-semibold text-[#141518] hover:text-[#FF3823] transition-colors underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#141518]">
                    Short Project Brief
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    No 6-step questionnaires. Just the essentials so our lead engineer can prepare before speaking.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Anti-spam honeypot */}
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
                    <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                      <span>Your Name</span>
                      <span className="text-[#FF3823]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#141518] focus:ring-1 focus:ring-black/10 text-xs sm:text-sm font-sans bg-[#FAF8F5]/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                      <span>Company / Organization</span>
                      <span className="text-neutral-400 font-normal text-[11px]">Optional</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="e.g. Acme Logistics Pvt Ltd"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#141518] focus:ring-1 focus:ring-black/10 text-xs sm:text-sm font-sans bg-[#FAF8F5]/50 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                      <span>Work Email</span>
                      <span className="text-[#FF3823]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#141518] focus:ring-1 focus:ring-black/10 text-xs sm:text-sm font-sans bg-[#FAF8F5]/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp / Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                      <span>WhatsApp Phone Number</span>
                      <span className="text-neutral-400 font-normal text-[11px]">For fast chat</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#141518] focus:ring-1 focus:ring-black/10 text-xs sm:text-sm font-sans bg-[#FAF8F5]/50 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Problem Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700 flex items-center justify-between">
                    <span>What process or bottleneck do you want to improve?</span>
                    <span className="text-[#FF3823]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.problemDescription}
                    onChange={(e) => setFormState({ ...formState, problemDescription: e.target.value })}
                    placeholder="e.g. We get about 25 inquiry messages every day across WhatsApp and web forms. Our staff spends 3 hours copying details into Excel and calculating quotes by hand. We want an automated pipeline that qualifies leads and generates PDF quotes in seconds."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#141518] focus:ring-1 focus:ring-black/10 text-xs sm:text-sm font-sans bg-[#FAF8F5]/50 outline-none leading-relaxed transition-all"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-[#141518] hover:bg-[#282A2E] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting brief to lead engineer...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Workflow Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-1 flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-500">
                  <span>Protected under mutual bilateral NDA</span>
                  <span>&bull;</span>
                  <span>Direct reply within 24h</span>
                </div>
              </form>
            )}

          </div>

          {/* ── RIGHT: DIRECT CHANNELS & PROMISES (5 COLS) ── */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Card (Instant Founder Access) */}
            <div className="bg-[#141518] text-white rounded-[28px] p-7 space-y-5 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FASTEST ROUTE // FOUNDER ON DUTY</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Prefer a direct chat on WhatsApp?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  Skip the form. Chat directly with our founding engineer to explore technical feasibility, timelines, and ballpark investment.
                </p>
              </div>

              <div className="pt-1">
                <a
                  href="https://wa.me/918860110144?text=Hi%20VISTAR%2C%20I%20would%20like%20to%20discuss%20a%20process%20automation%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 h-13 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp (+91 88601 10144)</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
                <span>New Delhi, India</span>
                <span>IST (UTC+5:30)</span>
              </div>
            </div>

            {/* Direct Email Card with 1-Click Copy */}
            <div className="bg-white border border-black/10 rounded-[28px] p-6 sm:p-7 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center text-neutral-700">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  OFFICIAL INBOX
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#141518]">
                  Direct Email Inquiries
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Send RFPs, architecture diagrams, or workflow spreadsheets to:
                </p>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <a
                  href="mailto:services.vistaar@gmail.com"
                  className="text-xs sm:text-[13px] font-mono font-semibold text-[#141518] hover:text-[#FF3823] transition-colors"
                >
                  services.vistaar@gmail.com
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg border border-black/10 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Studio Engineering Commitments */}
            <div className="bg-white border border-black/10 rounded-[28px] p-6 sm:p-7 space-y-4 shadow-xs">
              <h4 className="text-[11px] font-bold font-mono uppercase tracking-wider text-neutral-400">
                WHAT TO EXPECT FROM VISTAR:
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] text-neutral-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct reply from our senior engineering team, never a commissioned sales rep.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bilateral mutual NDA executed before reviewing sensitive spreadsheets.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fixed-scope milestone pricing with 100% private GitHub repository rights.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
