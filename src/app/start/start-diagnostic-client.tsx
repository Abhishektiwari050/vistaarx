"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/vistar-button";
import { trackEvent } from "@/lib/telemetry";
import { playClick, playBlip } from "@/lib/sound";

interface DiagnosticState {
  goal: string;
  bottleneck: string;
  industry: string;
  stack: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  notes: string;
}

const STEP_DEFINITIONS = [
  {
    step: 1,
    title: "PRIMARY GOAL",
    subtitle: "What objective are you looking to engineer?",
    key: "goal" as const,
    options: [
      {
        value: "AI Software & Web Application",
        label: "AI Software & Web Application",
        desc: "Build a modern, high-concurrency web app with integrated LLMs or autonomous agents.",
      },
      {
        value: "Re-architect Legacy Platform",
        label: "Re-architect Legacy Platform",
        desc: "Modernize slow legacy stack into sub-100ms Next.js/React architecture.",
      },
      {
        value: "Programmatic SEO & LLM Reach",
        label: "Programmatic SEO & LLM Reach",
        desc: "Deploy automated search topologies, semantic Schema graphs, and llms.txt discovery.",
      },
      {
        value: "Full Build → Discover → Grow Loop",
        label: "Full Build → Discover → Grow Loop",
        desc: "End-to-end sovereign software engine with closed-loop telemetry and conversion attribution.",
      },
      {
        value: "Custom AI Workflow / Data Pipeline",
        label: "Custom AI Workflow / Data Pipeline",
        desc: "High-throughput document ingestion, vector retrieval, or asynchronous task workers.",
      },
    ],
  },
  {
    step: 2,
    title: "PRIMARY BOTTLENECK",
    subtitle: "What is the core friction in your current system?",
    key: "bottleneck" as const,
    options: [
      {
        value: "Legacy Technical Debt & Sluggish Load Times",
        label: "Legacy Technical Debt & Sluggish Speed",
        desc: "Slow page loads (>3s LCP), monolithic codebases, or brittle dependencies.",
      },
      {
        value: "Poor Conversion & Zero Telemetry Visibility",
        label: "Poor Conversion & Zero Telemetry",
        desc: "Traffic is arriving but users bounce; lack of deterministic event tracking.",
      },
      {
        value: "Agency Lock-In & Zero Code Ownership",
        label: "Agency Lock-In & Zero Code Ownership",
        desc: "Trapped in proprietary CMS tools, retainer markups, or unmaintainable handoffs.",
      },
      {
        value: "Scale & Concurrent Throughput Limits",
        label: "Scale & Concurrency Limits",
        desc: "System struggles with high concurrency, complex data structures, or edge latency.",
      },
      {
        value: "Greenfield Project / Clean Repo",
        label: "Greenfield / Clean Architecture",
        desc: "Starting fresh with no legacy encumbrances; need right foundation on day one.",
      },
    ],
  },
  {
    step: 3,
    title: "INDUSTRY & DOMAIN",
    subtitle: "What commercial domain does your system inhabit?",
    key: "industry" as const,
    options: [
      {
        value: "B2B SaaS & Developer Tooling",
        label: "B2B SaaS & Developer Tooling",
        desc: "High-density dashboards, API platforms, developer productivity software.",
      },
      {
        value: "Fintech & High-Compliance",
        label: "Fintech & High-Compliance",
        desc: "Security-sensitive data handling, strict authorization, and sub-second execution.",
      },
      {
        value: "Aviation, Logistics & Industrial",
        label: "Aviation, Logistics & Industrial",
        desc: "Complex data parsing, geo-spatial visualization, mission-critical operations.",
      },
      {
        value: "E-Commerce & Digital Products",
        label: "E-Commerce & Digital Products",
        desc: "High-speed storefronts, transactional flows, and high organic search dependency.",
      },
      {
        value: "Healthcare, BioTech & Science",
        label: "Healthcare, BioTech & Science",
        desc: "Complex data structures, strict privacy boundaries, and research tooling.",
      },
      {
        value: "Other Domain",
        label: "Other Domain / Emerging Sector",
        desc: "Custom venture or multi-disciplinary industrial platform.",
      },
    ],
  },
  {
    step: 4,
    title: "CURRENT STACK",
    subtitle: "What is your underlying technical foundation?",
    key: "stack" as const,
    options: [
      {
        value: "Next.js / React / TypeScript",
        label: "Next.js / React / TypeScript",
        desc: "Modern TypeScript frontend requiring architectural hardening or scaling.",
      },
      {
        value: "Python / FastAPI / Django",
        label: "Python / FastAPI / Django",
        desc: "Backend/data layer requiring frontend compilation or AI agent orchestration.",
      },
      {
        value: "Legacy CMS (WordPress / Webflow / Shopify)",
        label: "Legacy CMS (WordPress / Webflow)",
        desc: "Looking to migrate off slow visual builders into custom sovereign code.",
      },
      {
        value: "Monolith (PHP / Ruby / Java / .NET)",
        label: "Monolith (PHP / Ruby / Java / .NET)",
        desc: "Decoupling frontend client from legacy database and backend services.",
      },
      {
        value: "Greenfield / Starting From Scratch",
        label: "Greenfield (Zero Existing Code)",
        desc: "New repository. We configure Git, CI/CD, Next.js, and cloud deployment from zero.",
      },
    ],
  },
  {
    step: 5,
    title: "BUDGET RANGE",
    subtitle: "What is your targeted capital investment?",
    key: "budget" as const,
    options: [
      {
        value: "$10,000 – $25,000",
        label: "$10,000 – $25,000",
        desc: "Targeted 14-day production sprint. Core MVP or focused architectural re-engineering.",
      },
      {
        value: "$25,000 – $50,000",
        label: "$25,000 – $50,000",
        desc: "Complete production software system. Full Build + Discover + Grow deployment.",
      },
      {
        value: "$50,000 – $100,000+",
        label: "$50,000 – $100,000+",
        desc: "Enterprise architecture, multi-agent AI ecosystems, or retained engineering partnership.",
      },
    ],
  },
];

export function StartDiagnosticClient() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<DiagnosticState>({
    goal: "",
    bottleneck: "",
    industry: "",
    stack: "",
    budget: "",
    timeline: "Within 30 Days",
    name: "",
    email: "",
    company: "",
    notes: "",
  });

  const [mode, setMode] = useState<"diagnostic" | "fast_track">("diagnostic");
  const [fastTrackData, setFastTrackData] = useState({
    name: "",
    email: "",
    company: "",
    scope: "",
    repoLink: "",
    budget: "$25,000 – $50,000",
    timeline: "Immediate (< 30 Days)",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [serverRefId, setServerRefId] = useState<string>("");

  const handleFastTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!fastTrackData.name.trim() || fastTrackData.name.trim().length < 2) {
      setSubmitError("Please enter your name (minimum 2 characters).");
      return;
    }
    if (!fastTrackData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fastTrackData.email)) {
      setSubmitError("Please enter a valid work email address.");
      return;
    }
    if (!fastTrackData.scope.trim() || fastTrackData.scope.trim().length < 10) {
      setSubmitError("Please describe your project scope or RFC requirements (minimum 10 characters).");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: fastTrackData.name,
        email: fastTrackData.email,
        company: fastTrackData.company || "Not Specified",
        notes: `${fastTrackData.scope}\n\n[Repo / Specs]: ${fastTrackData.repoLink || "None provided"}`,
        goal: "Fast-Track Architectural RFC",
        bottleneck: "Direct Specification Submission",
        industry: "Direct Brief",
        stack: "Direct Submission",
        budget: fastTrackData.budget,
        timeline: fastTrackData.timeline,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const ref = json.referenceId || `VST-${Date.now().toString().slice(-6)}`;
        setServerRefId(ref);
        setSubmitted(true);
        trackEvent("fast_track_submit", {
          referenceId: ref,
          budget: fastTrackData.budget,
          timeline: fastTrackData.timeline,
        });
      } else {
        setSubmitError(
          json.errors ? json.errors.join(" ") : "Submission failed. Please try again or email engineering@vistar.tech."
        );
      }
    } catch {
      setSubmitError("Network connection error. Please try again or email engineering@vistar.tech.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectOption = (key: keyof DiagnosticState, value: string) => {
    playClick(1100 + currentStep * 70, 0.02, "sine");
    setFormData((prev) => ({ ...prev, [key]: value }));
    trackEvent("diagnostic_option_select", {
      step: currentStep,
      category: key,
      value,
    });

    // Automatically advance to next step on single choice if not on step 6
    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      trackEvent("diagnostic_step_view", {
        step: nextStep,
        stepTitle: STEP_DEFINITIONS[nextStep - 1]?.title,
      });
    }
  };

  const handleStepJump = (stepNum: number) => {
    playClick(1000, 0.025, "triangle");
    setCurrentStep(stepNum);
    trackEvent("diagnostic_step_view", {
      step: stepNum,
      stepTitle: STEP_DEFINITIONS[stepNum - 1]?.title || "FINALIZE",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Simple validation for step 6
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setSubmitError("Please enter your name (minimum 2 characters).");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please enter a valid work email address.");
      return;
    }

    setSubmitting(true);

    try {
      // Dispatch payload to lead ingestion API
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        notes: formData.notes,
        goal: formData.goal,
        bottleneck: formData.bottleneck,
        industry: formData.industry,
        stack: formData.stack,
        budget: formData.budget,
        timeline: formData.timeline,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        const ref = json.referenceId || `VST-${Date.now().toString().slice(-6)}`;
        setServerRefId(ref);
        setSubmitted(true);
        trackEvent("diagnostic_submit", {
          referenceId: ref,
          goal: formData.goal,
          budget: formData.budget,
          timeline: formData.timeline,
        });
      } else {
        setSubmitError(
          json.errors ? json.errors.join(" ") : "Submission failed. Please try again or use direct channels."
        );
      }
    } catch {
      setSubmitError("Network connection error. Please try again or email engineering@vistar.tech.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
      {/* ── LEFT / MAIN: 6-Step Diagnostic Form (Cols 1-7) ─────────── */}
      <div className="lg:col-span-7">
        <div className="p-6 md:p-10 relative bg-white shadow-2xl border border-black/10 rounded-[6px]">
          {!submitted && (
            /* Mode Selector Toggle */
            <div className="flex items-center gap-2 p-1 bg-[#FAF9F5] border border-black/10 mb-8 font-mono text-xs rounded-lg">
              <button
                type="button"
                onClick={() => {
                  playClick(1050, 0.025, "triangle");
                  setMode("diagnostic");
                  setSubmitError(null);
                }}
                className={`flex-1 py-2.5 text-center transition-all cursor-pointer rounded-md ${
                  mode === "diagnostic"
                    ? "bg-[#FF3823] text-white font-semibold shadow-sm"
                    : "text-neutral-600 hover:text-[#0E1118]"
                }`}
              >
                01 // 6-STEP DIAGNOSTIC
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick(1050, 0.025, "triangle");
                  setMode("fast_track");
                  setSubmitError(null);
                }}
                className={`flex-1 py-2.5 text-center transition-all cursor-pointer rounded-md ${
                  mode === "fast_track"
                    ? "bg-[#FF3823] text-white font-semibold shadow-sm"
                    : "text-neutral-600 hover:text-[#0E1118]"
                }`}
              >
                02 // FAST-TRACK BRIEF / RFC
              </button>
            </div>
          )}

          {/* Form Content */}
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="py-12 text-center space-y-6">
              <div className="w-12 h-12 mx-auto border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-mono text-xl rounded-full">
                ✓
              </div>
              <div className="space-y-2">
                <h2 className="font-sans font-medium text-2xl font-semibold text-[#0E1118]">
                  Diagnostic Received
                </h2>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Your project specifications have been dispatched directly to our principal systems engineers. Under our guaranteed SLA, you will receive an actionable technical scope within 24 hours.
                </p>
              </div>

              {/* Summary recap */}
              <div className="p-4 border border-black/10 bg-[#FAF9F5] max-w-md mx-auto text-left font-mono text-xs space-y-2 text-neutral-600 rounded-[4px]">
                <div className="flex justify-between border-b border-black/10 pb-1">
                  <span className="text-neutral-600">DISPATCH REF:</span>
                  <span className="text-[#FF3823] font-semibold">{serverRefId || "VST-PENDING"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">TARGET GOAL:</span>
                  <span className="text-right truncate max-w-[200px] text-[#0E1118]">{formData.goal || "Custom Scope"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">BUDGET BAND:</span>
                  <span className="text-[#0E1118]">{formData.budget || "Pending Scoping"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">RESPONSE SLA:</span>
                  <span className="text-[#FF3823] font-semibold">&lt; 24 HOURS GUARANTEED</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <Button variant="secondary" href="/work">
                  INSPECT CASE STUDIES
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="font-mono text-xs text-neutral-600 hover:text-[#FF3823] underline uppercase transition-colors"
                >
                  START ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : mode === "fast_track" ? (
            /* ── FAST-TRACK BRIEF FORM ── */
            <form onSubmit={handleFastTrackSubmit} className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-black/10">
                <p className="font-mono text-xs text-[#FF3823]">
                  FAST-TRACK DISPATCH // DIRECT TECHNICAL SPECIFICATION
                </p>
                <h2 className="type-h3 uppercase text-[#0E1118]">
                  SUBMIT YOUR RFC OR TECHNICAL BRIEF
                </h2>
                <p className="text-xs text-neutral-600">
                  Have an existing PRD, RFC, or technical spec? Paste your requirements below to receive a principal engineer architectural scope within 24 hours.
                </p>
              </div>

              {submitError && (
                <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-700 text-xs font-mono rounded-[4px]">
                  {submitError}
                </div>
              )}

              <div className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-neutral-600 uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={fastTrackData.name}
                      onChange={(e) => setFastTrackData({ ...fastTrackData, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-neutral-600 uppercase">
                      WORK EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={fastTrackData.email}
                      onChange={(e) => setFastTrackData({ ...fastTrackData, email: e.target.value })}
                      placeholder="ada@company.com"
                      className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                    />
                  </div>
                </div>

                {/* Company / Domain */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-neutral-600 uppercase">
                    COMPANY / PROJECT DOMAIN (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={fastTrackData.company}
                    onChange={(e) => setFastTrackData({ ...fastTrackData, company: e.target.value })}
                    placeholder="acme.ai"
                    className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                  />
                </div>

                {/* Scope / RFC / Requirements */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-neutral-600 uppercase">
                    PROJECT SCOPE, RFC OR ARCHITECTURAL REQUIREMENTS *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={fastTrackData.scope}
                    onChange={(e) => setFastTrackData({ ...fastTrackData, scope: e.target.value })}
                    placeholder="Paste your RFC, technical problem, desired features, performance bottlenecks, or APIs to integrate..."
                    className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] p-3 rounded-[4px] font-mono text-xs leading-relaxed focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                  />
                </div>

                {/* Existing Repo or Figma Link */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-neutral-600 uppercase">
                    GITHUB REPO / FIGMA / DOCS LINK (OPTIONAL)
                  </label>
                  <input
                    type="url"
                    value={fastTrackData.repoLink}
                    onChange={(e) => setFastTrackData({ ...fastTrackData, repoLink: e.target.value })}
                    placeholder="https://github.com/... or https://figma.com/..."
                    className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2 rounded-[4px] font-mono text-xs focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                  />
                </div>

                {/* Budget Bracket + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-neutral-600 uppercase">
                      TARGET BUDGET BRACKET
                    </label>
                    <select
                      value={fastTrackData.budget}
                      onChange={(e) => setFastTrackData({ ...fastTrackData, budget: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30"
                    >
                      <option value="$10,000 – $25,000">$10,000 – $25,000 (Targeted Sprint)</option>
                      <option value="$25,000 – $50,000">$25,000 – $50,000 (Full Production System)</option>
                      <option value="$50,000 – $100,000+">$50,000 – $100,000+ (Enterprise Architecture)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-neutral-600 uppercase">
                      DEPLOYMENT WINDOW
                    </label>
                    <select
                      value={fastTrackData.timeline}
                      onChange={(e) => setFastTrackData({ ...fastTrackData, timeline: e.target.value })}
                      className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30"
                    >
                      <option value="Immediate (< 30 Days)">Immediate (&lt; 30 Days)</option>
                      <option value="Q1 / Q2 Target (30–60 Days)">Q1 / Q2 Target (30–60 Days)</option>
                      <option value="Flexible / Architectural Consultation">Flexible / Consultation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Legal Notice */}
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                By submitting your RFC, you agree to our{" "}
                <Link href="/privacy" className="text-[#FF3823] font-semibold hover:underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-[#FF3823] font-semibold hover:underline">
                  Terms of Service
                </Link>
                . Bilateral non-disclosure is enforced by default.
              </p>

              {/* Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full font-mono text-xs uppercase tracking-wider bg-[#FF3823] text-white text-[#FFFFFF] font-semibold py-3.5 hover:bg-[#E0301C] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer rounded-[4px]"
                >
                  {submitting ? "DISPATCHING BRIEF..." : "DISPATCH TECHNICAL BRIEF (<24H SLA) ↗"}
                </button>
              </div>
            </form>
          ) : (
            <div>
              {/* Progress Bar Header */}
              <div className="border-b border-black/10 pb-6 mb-8 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FF3823] rounded-full" />
                    <span className="text-[#0E1118] font-bold tracking-wider">
                      PROJECT DIAGNOSTIC // STEP {currentStep} OF 6
                    </span>
                  </div>
                  <span className="text-neutral-600">{Math.round((currentStep / 6) * 100)}% COMPLETE</span>
                </div>

                {/* Segmented Progress Track */}
                <div className="grid grid-cols-6 gap-1.5 h-1.5 bg-black/5 rounded-full overflow-hidden">
                  {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className={`h-full transition-colors duration-200 ${
                        stepNumber <= currentStep
                          ? "bg-[#FF3823] text-white"
                          : "bg-black/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Step Jump Breadcrumb */}
                <div className="hidden sm:flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-1">
                  {["GOAL", "FRICTION", "DOMAIN", "STACK", "BUDGET", "FINALIZE"].map(
                    (label, idx) => {
                      const stepNum = idx + 1;
                      const isCompleted = stepNum < currentStep;
                      const isCurrent = stepNum === currentStep;
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => handleStepJump(stepNum)}
                          className={`hover:text-[#0E1118] transition-colors cursor-pointer ${
                            isCurrent
                              ? "text-[#0E1118] font-bold"
                              : isCompleted
                              ? "text-neutral-600 underline underline-offset-2"
                              : "text-black/30"
                          }`}
                        >
                          {stepNum}. {label}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Mobile-only compact step indicator */}
                <div className="sm:hidden flex items-center justify-between text-[10px] font-mono text-neutral-600 pt-0.5">
                  <span className="text-[#0E1118] font-bold">
                    PHASE: {STEP_DEFINITIONS[currentStep - 1]?.title || "FINALIZE"}
                  </span>
                  <span>TAP TO SELECT &amp; ADVANCE</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
              {/* ── STEPS 1 TO 5: SELECTION SCREENS ── */}
              {currentStep <= 5 && (
                <div className="space-y-6">
                  {(() => {
                    const stepDef = STEP_DEFINITIONS[currentStep - 1];
                    const selectedVal = formData[stepDef.key];

                    return (
                      <>
                        <div className="space-y-1">
                          <p className="font-mono text-xs text-[#FF3823] font-bold">
                            STEP 0{stepDef.step} // {stepDef.title}
                          </p>
                          <h2 className="font-sans font-medium text-2xl sm:text-3xl font-semibold text-[#0E1118]">
                            {stepDef.subtitle}
                          </h2>
                        </div>

                        <div className="space-y-3">
                          {stepDef.options.map((opt) => {
                            const isSelected = selectedVal === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleSelectOption(stepDef.key, opt.value)}
                                className={`w-full text-left p-4 rounded-[4px] border transition-all duration-150 flex items-start justify-between gap-4 cursor-pointer ${
                                  isSelected
                                    ? "border-[#FF3823] bg-[#FFF0EB] shadow-sm"
                                    : "border-black/10 bg-[#FAF9F5] hover:border-[#FF3823]/25 shadow-xs"
                                }`}
                              >
                                <div className="space-y-1">
                                  <p
                                    className={`font-sans font-medium text-[15px] ${
                                      isSelected ? "text-[#0E1118] font-bold" : "text-[#0E1118]"
                                    }`}
                                  >
                                    {opt.label}
                                  </p>
                                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                                    {opt.desc}
                                  </p>
                                </div>
                                <div
                                  className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? "border-emerald-400 bg-[#FF3823]"
                                      : "border-black/20 bg-transparent"
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    );
                  })()}

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/10">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="font-mono text-xs uppercase tracking-wider text-neutral-600 hover:text-[#0E1118] px-3 py-2 border border-black/10 bg-white cursor-pointer rounded-[4px]"
                      >
                        ← PREVIOUS
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="font-mono text-xs uppercase tracking-wider bg-[#FF3823] text-white text-[#FFFFFF] font-semibold px-5 py-2 hover:bg-[#E0301C] transition-colors cursor-pointer rounded-[4px]"
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 6: TIMELINE & CONTACT DETAILS ── */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="font-mono text-xs text-[#FF3823]">
                      STEP 06 // TIMELINE &amp; DISPATCH
                    </p>
                    <h2 className="type-h3 uppercase text-[#0E1118]">
                      WHERE SHOULD WE SEND THE TECHNICAL BLUEPRINT?
                    </h2>
                  </div>

                  {submitError && (
                    <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-700 text-xs font-mono rounded-[4px]">
                      {submitError}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Target Timeline */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-600 uppercase">
                        DESIRED DEPLOYMENT WINDOW
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30"
                      >
                        <option value="Immediate (< 30 Days)">Immediate (&lt; 30 Days)</option>
                        <option value="Q1 / Q2 Target (30–60 Days)">Q1 / Q2 Target (30–60 Days)</option>
                        <option value="Flexible / Architectural Consultation">Flexible / Architectural Consultation</option>
                      </select>
                    </div>

                    {/* Name + Email grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs text-neutral-600 uppercase">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ada Lovelace"
                          className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs text-neutral-600 uppercase">
                          WORK EMAIL *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="ada@company.com"
                          className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-neutral-600 uppercase">
                        COMPANY / DOMAIN (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="acme.corp"
                        className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2.5 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                      />
                    </div>

                    {/* Brief / Notes */}
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-neutral-600 uppercase">
                        ADDITIONAL TECHNICAL NOTES (OPTIONAL)
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Brief overview of APIs, data schemas, or custom requirements..."
                        className="w-full bg-[#FAF9F5] border border-black/10 text-[#0E1118] px-3 py-2 rounded-[4px] font-sans text-sm focus:outline-none focus:border-black/30 placeholder-[#959CB3]/40"
                      />
                    </div>
                  </div>

                  {/* Summary of selections */}
                  <div className="p-3 border border-black/10 bg-[#FAF9F5] text-[11px] font-mono space-y-1 text-neutral-600 rounded-[4px]">
                    <p className="text-neutral-600 uppercase tracking-widest pb-1 border-b border-black/10 font-semibold">
                      DIAGNOSTIC SUMMARY RECAP
                    </p>
                    <p>• GOAL: <span className="text-[#0E1118]">{formData.goal || "Standard Web System"}</span></p>
                    <p>• BOTTLENECK: <span className="text-[#0E1118]">{formData.bottleneck || "Performance Optimization"}</span></p>
                    <p>• DOMAIN: <span className="text-[#0E1118]">{formData.industry || "Software & Technology"}</span></p>
                    <p>• STACK: <span className="text-[#0E1118]">{formData.stack || "Next.js / TypeScript"}</span></p>
                    <p>• BUDGET: <span className="text-[#0E1118]">{formData.budget || "$25k – $50k"}</span></p>
                  </div>

                  {/* Legal notice */}
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                    By submitting this diagnostic, you agree to our{" "}
                    <Link href="/privacy" className="text-[#FF3823] font-semibold hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-[#FF3823] font-semibold hover:underline">
                      Terms of Service
                    </Link>
                    . All information is protected under mutual non-disclosure.
                  </p>

                  {/* Submit actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/10">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="font-mono text-xs uppercase tracking-wider text-neutral-600 hover:text-[#0E1118] px-3 py-2 border border-black/10 bg-white cursor-pointer rounded-[4px]"
                    >
                      ← EDIT BUDGET
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="font-mono text-xs uppercase tracking-wider bg-[#FF3823] text-white text-[#FFFFFF] font-semibold px-6 py-3 hover:bg-[#E0301C] transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer rounded-[4px]"
                    >
                      {submitting ? "DISPATCHING..." : "DISPATCH DIAGNOSTIC ↗"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
      </div>

      {/* ── RIGHT / SIDEBAR: Visible Escape Hatch (Cols 8-12) ────────── */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
        {/* SLA Commitment Card */}
        <div className="p-6 md:p-8 space-y-4 border border-black/10 bg-white rounded-[6px] shadow-xl">
          <div className="flex items-center justify-between border-b border-black/10 pb-3">
            <span className="font-mono text-xs text-[#FF3823] font-semibold tracking-wider">
              ENGINEERING SLA
            </span>
            <span className="w-2 h-2 bg-[#FF3823] text-white rounded-full animate-ping" />
          </div>

          <div className="space-y-1">
            <p className="font-mono text-2xl md:text-3xl font-bold text-[#0E1118]">
              &lt; 24 HOURS
            </p>
            <p className="type-label text-[#FF3823]">GUARANTEED TECHNICAL RESPONSE</p>
          </div>

          <p className="type-body text-neutral-600 text-xs leading-relaxed">
            Every submission is reviewed directly by a principal software engineer. You will receive an architectural breakdown, estimated sprint milestones, and feasibility feedback—never a sales deck.
          </p>
        </div>

        {/* Low-Friction Escape Hatches */}
        <div className="p-6 md:p-8 space-y-5 bg-white rounded-[6px] shadow-xl border border-black/10">
          <div className="space-y-1">
            <p className="type-label text-[#FF3823]">DIRECT ACCESS ESCAPE HATCH</p>
            <h3 className="type-h3 uppercase text-lg text-[#0E1118]">PREFER DIRECT CHANNELS?</h3>
            <p className="text-xs text-neutral-600">
              Skip the diagnostic form and connect immediately with our engineering team:
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Direct WhatsApp Channel */}
            <a
              href="https://wa.me/919999999999?text=Hello%20Vistar%20Engineering%2C%20I%20would%20like%20to%20discuss%20a%20new%20system%20architecture."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("escape_hatch_click", {
                  channel: "whatsapp",
                  label: "DIRECT WHATSAPP CHANNEL",
                })
              }
              className="flex items-center justify-between p-3.5 border border-black/10 hover:border-emerald-400 bg-transparent hover:bg-white group transition-all rounded-[4px]"
            >
              <div className="space-y-0.5">
                <p className="font-mono text-xs text-[#0E1118] font-semibold group-hover:text-[#FF3823] transition-colors">
                  DIRECT WHATSAPP CHANNEL
                </p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  Fastest for quick technical triage &amp; initial scoping
                </p>
              </div>
              <span className="font-mono text-xs text-[#FF3823]">↗</span>
            </a>

            {/* Calendly 20-min Technical Consult */}
            <a
              href="https://calendly.com/vistar-tech/architecture-briefing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("escape_hatch_click", {
                  channel: "calendly",
                  label: "SCHEDULE 20-MIN BRIEFING",
                })
              }
              className="flex items-center justify-between p-3.5 border border-black/10 hover:border-emerald-400 bg-transparent hover:bg-white group transition-all rounded-[4px]"
            >
              <div className="space-y-0.5">
                <p className="font-mono text-xs text-[#0E1118] font-semibold group-hover:text-[#FF3823] transition-colors">
                  SCHEDULE 20-MIN BRIEFING
                </p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  Direct Google Meet with a systems architect
                </p>
              </div>
              <span className="font-mono text-xs text-[#FF3823]">↗</span>
            </a>

            {/* Direct Engineering Email */}
            <div className="p-3.5 border border-black/10 bg-transparent space-y-1 rounded-[4px]">
              <p className="font-mono text-xs text-neutral-600 uppercase">
                DIRECT PRINCIPAL INBOX
              </p>
              <a
                href="mailto:engineering@vistar.tech"
                onClick={() =>
                  trackEvent("escape_hatch_click", {
                    channel: "email",
                    label: "DIRECT PRINCIPAL INBOX",
                  })
                }
                className="font-mono text-sm text-[#FF3823] hover:underline block font-semibold"
              >
                engineering@vistar.tech
              </a>
            </div>
          </div>
        </div>

        {/* NDA & Sovereign Ownership Badge */}
        <div className="p-4 border border-black/10 bg-white rounded-[6px] space-y-2 font-mono text-xs text-neutral-600 shadow-sm">
          <div className="flex items-center gap-2 text-[#0E1118]">
            <span className="text-[#FF3823]">🔒</span>
            <span className="font-semibold uppercase tracking-wider text-[#0E1118]">CONFIDENTIALITY &amp; NDA SHIELD</span>
          </div>
          <p className="text-[11px] font-sans text-neutral-600 leading-relaxed">
            All codebases, API schemas, and commercial strategies shared are automatically protected under strict mutual non-disclosure. We execute bilateral NDAs upon request before technical scoping.
          </p>
        </div>
      </div>
    </div>
  );
}
