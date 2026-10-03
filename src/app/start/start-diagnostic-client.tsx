"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, MessageSquare, Send, ShieldCheck, Clock, User, Phone, FileText } from "lucide-react";

export function StartDiagnosticClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("Production System (â‚¹1,85,000 / $2,200)");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !details.trim()) {
      setError("Please fill in your name, WhatsApp number, and project notes.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          notes: `[Package: ${selectedPackage}] ${details.trim()}`,
          type: "diagnostic",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setSubmitted(true);
    } catch {
      // Even if API fails or is offline, let the buyer continue to WhatsApp directly
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const whatsappPrefilledUrl = `https://wa.me/918860110144?text=${encodeURIComponent(
    `Hi Abhishek, my name is ${name || "[Name]"}. I'm interested in the ${selectedPackage}.\n\nWhat I need built:\n${
      details || "I'd like to discuss a project."
    }`
  )}`;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* â”€â”€ FAST-TRACK WHATSAPP BANNER â”€â”€ */}
      <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-emerald-950">
              Want an immediate answer?
            </h4>
            <p className="text-xs text-emerald-800">
              Skip the form and chat directly with Abhishek Tiwari on WhatsApp.
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/918860110144?text=Hi%20Abhishek,%20I'd%20like%20to%20discuss%20a%20project%20with%20VISTAR."
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Chat on WhatsApp (+91 88601 10144)
        </a>
      </div>

      {/* â”€â”€ 3-FIELD DIAGNOSTIC CARD â”€â”€ */}
      <div className="bg-white border border-black/15 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-black/10 bg-[#FAF9F5] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF3823]" />
            <span className="font-mono text-xs font-bold text-[#FF3823] uppercase tracking-wider">
              PROJECT INITIATION // 24-HOUR EVALUATION
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0E1118]">
            Tell us about your project
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Three simple fields. Evaluated directly by Abhishek Tiwari (Founder &amp; Lead Engineer).
          </p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0E1118]">
                Inquiry received
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Abhishek will personally review your notes and reach out within 24 hours on WhatsApp ({phone}).
              </p>
            </div>

            <div className="pt-2">
              <a
                href={whatsappPrefilledUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-md shadow-sm transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp Now with Your Notes</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-800">
                {error}
              </div>
            )}

            {/* Field 1: Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                1. Your Full Name <span className="text-[#FF3823]">*</span>
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-black/15 rounded-lg text-sm text-[#0E1118] placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3823] focus:ring-1 focus:ring-[#FF3823] transition-colors"
                />
              </div>
            </div>

            {/* Field 2: WhatsApp Number */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                2. WhatsApp / Phone Number <span className="text-[#FF3823]">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210 (with country code)"
                  className="w-full px-4 py-3 bg-[#FAF9F5] border border-black/15 rounded-lg text-sm text-[#0E1118] placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3823] focus:ring-1 focus:ring-[#FF3823] transition-colors font-mono"
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                We respect your privacy. No marketing spam. Direct communication only.
              </p>
            </div>

            {/* Package Preference */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                Which Package Fits Your Needs?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                {[
                  "Starter MVP (â‚¹49,000 / $590)",
                  "Production System (â‚¹1,85,000 / $2,200)",
                  "Custom Architecture (â‚¹3,90,000+ / $4,700+)",
                ].map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedPackage === pkg
                        ? "bg-[#0E1118] text-white border-[#0E1118] shadow-xs"
                        : "bg-[#FAF9F5] text-neutral-700 border-black/10 hover:border-black/30"
                    }`}
                  >
                    <span className="font-semibold block">{pkg.split(" (")[0]}</span>
                    <span className="text-[11px] opacity-80">{pkg.split(" (")[1]?.replace(")", "")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Field 3: What is slow / What do you need built? */}
            <div className="space-y-2">
              <label htmlFor="details" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
                3. What is slow, broken, or what do you need built? <span className="text-[#FF3823]">*</span>
              </label>
              <textarea
                id="details"
                rows={4}
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g. We need a 60 FPS 3D spatial portfolio like 3axis Arc to showcase our architectural models in browser, or our current WordPress site takes 4s to load and we want to rebuild it in Next.js..."
                className="w-full px-4 py-3 bg-[#FAF9F5] border border-black/15 rounded-lg text-sm text-[#0E1118] placeholder:text-neutral-400 focus:outline-none focus:border-[#FF3823] focus:ring-1 focus:ring-[#FF3823] transition-colors leading-relaxed"
              />
            </div>

            {/* Trust and Submission */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct review by Abhishek Tiwari &bull; 100% Private</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-semibold text-sm rounded-md shadow-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Technical Diagnostic"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* â”€â”€ GUARANTEES STRIP â”€â”€ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono text-neutral-600">
        <div className="p-3 bg-white border border-black/10 rounded-lg flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-[#FF3823] shrink-0" />
          <span>&lt; 24-Hour Guaranteed Response</span>
        </div>
        <div className="p-3 bg-white border border-black/10 rounded-lg flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Private GitHub Transfer</span>
        </div>
        <div className="p-3 bg-white border border-black/10 rounded-lg flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#3B82F6] shrink-0" />
          <span>Zero Retainers or Hostage Fees</span>
        </div>
      </div>
    </div>
  );
}

export default StartDiagnosticClient;
