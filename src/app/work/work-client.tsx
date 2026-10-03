"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Activity,
  Code2,
  CheckCircle2,
  Sparkles,
  Lock,
  Play,
  Pause,
  Maximize2,
  Monitor,
  Terminal,
  MessageCircle,
} from "lucide-react";
import { AnswerBlocks, type QAPair } from "@/components/seo/answer-blocks";
import { CloudShaderDemo } from "@/components/ui/cloud-shader-demo";

interface ProductionSystem {
  id: string;
  category: "all" | "aviation" | "healthcare" | "spatial" | "enterprise";
  tag: string;
  statusBadge: string;
  title: string;
  sector: string;
  metrics: string[];
  desc: string;
  architecture: string;
  liveUrl: string;
  displayUrl: string;
  repoTransfer: string;
  accentBg: string;
  accentText: string;
  primaryImage: string;
  secondaryImages?: Array<{ title: string; src: string }>;
}

const PRODUCTION_SYSTEMS: ProductionSystem[] = [
  {
    id: "3axisarc",
    category: "spatial",
    tag: "ARCHITECTURE & 3D REAL ESTATE",
    statusBadge: "LIVE CLIENT SHOWROOM",
    title: "3axis Arc: Spatial 3D Web Showroom",
    sector: "Architecture & Interior Design (Lucknow, UP)",
    metrics: ["60 FPS In-Browser WebGL", "Sub-100ms TTFB", "Zero Layout Shift (CLS 0.000)"],
    desc: "Interactive 3D architectural visualization platform engineered for an architectural design firm in Lucknow to showcase spatial designs in-browser with zero app downloads.",
    architecture: "Next.js 16 + Three.js / WebGL Custom Shaders + Vercel Edge",
    liveUrl: "https://3axisarc.vercel.app",
    displayUrl: "3axisarc.vercel.app",
    repoTransfer: "Client-owned private GitHub repository with custom 3D shader assets",
    accentBg: "bg-[#FFF0EB]",
    accentText: "text-[#9A3412]",
    primaryImage: "/projects/3axisarc.png",
  },
  {
    id: "vayu",
    category: "aviation",
    tag: "OPEN SOURCE AVIATION GIS",
    statusBadge: "OPEN SOURCE TOOL",
    title: "Project VAYU: Pre-Flight NOTAM & Weather Briefing Tool",
    sector: "Aviation & Geospatial Mapping",
    metrics: ["MapLibre Vector GIS", "Automated NOTAM Parsing", "Open Source Codebase"],
    desc: "Free web-based pre-flight briefing tool built for pilots to visualize live NOTAM alerts and flight hazard corridors directly on vector maps. Free & open-source on GitHub.",
    architecture: "Next.js 16 + Python FastAPI + MapLibre GL Vector Tiles",
    liveUrl: "https://ai-vayu.vercel.app",
    displayUrl: "ai-vayu.vercel.app",
    repoTransfer: "Open Source on GitHub (Abhishektiwari050/AI-VAYU)",
    accentBg: "bg-[#EBF3FF]",
    accentText: "text-[#1E3A8A]",
    primaryImage: "/projects/vayuways.png",
    secondaryImages: [
      { title: "Cockpit HUD", src: "/projects/vayuways.png" },
      { title: "GIS Hazard Map", src: "/projects/vayu-map.png" },
      { title: "Mission Briefing", src: "/projects/vayu-briefing.png" },
    ],
  },
  {
    id: "autolead",
    category: "enterprise",
    tag: "INTERNAL CRM AUTOMATION",
    statusBadge: "INTERNAL PIPELINE",
    title: "VISTAR AutoLead: Internal Lead Triage & WhatsApp Pipeline",
    sector: "Vistar Internal Operations & Lead Capture",
    metrics: ["Instant WhatsApp Alert", "Zero Manual Entry", "24/7 Intake Engine"],
    desc: "Our internal inquiry intake pipeline that captures web form leads, structures project requirements, dispatches instant WhatsApp notifications directly to Abhishek, and logs follow-ups.",
    architecture: "Next.js Route Handlers + WhatsApp Cloud API + Google Sheets / PostgreSQL",
    liveUrl: "https://vistar.tech/contact",
    displayUrl: "vistar.tech/contact",
    repoTransfer: "Available as custom automation module in Production System package",
    accentBg: "bg-[#E8FCE8]",
    accentText: "text-[#052E16]",
    primaryImage: "/projects/competence-crm.png",
  },
  {
    id: "aura",
    category: "healthcare",
    tag: "RESEARCH ML PROTOTYPE",
    statusBadge: "RESEARCH PROTOTYPE",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    sector: "Machine Learning & Research Prototype (Synthetic Data)",
    metrics: ["Isolation Forest ML", "Structured Schema Gates", "Zero External Egress"],
    desc: "Experimental anomaly detection prototype testing unsupervised machine learning algorithms over synthetic sensor telemetry with strict Pydantic validation gates.",
    architecture: "Python PyTorch / Scikit-Learn + FastAPI + Pydantic Schema Validation",
    liveUrl: "https://multi-agent-anomaly-system.onrender.com",
    displayUrl: "aura-anomaly.onrender.com",
    repoTransfer: "Open Source Research Code (Abhishektiwari050/multi-agent-anomaly-system)",
    accentBg: "bg-[#F3E8FF]",
    accentText: "text-[#581C87]",
    primaryImage: "/projects/aura-results.png",
  },
];

const ROLES = [
  {
    role: "SME Owners & Business Founders",
    summary: "Automate manual lead intake and customer follow-up without hiring extra operations staff.",
    detail: "Receive automated WhatsApp and CRM pipelines that capture leads from IndiaMART, JustDial, and web forms in seconds.",
  },
  {
    role: "Startups & Growth Companies",
    summary: "Launch high-performance web applications and customer portals in a guaranteed 14-day sprint.",
    detail: "Direct collaboration with founding engineers with 100% private GitHub repository transfer and zero lock-in retainers.",
  },
  {
    role: "Architects & Real Estate Developers",
    summary: "Showcase properties and designs in 60fps interactive 3D directly in mobile and desktop browsers.",
    detail: "High-performance Three.js and WebGL engines with zero plugin downloads required, as proven with 3axis Arc.",
  },
  {
    role: "Technical Leaders & CTOs",
    summary: "Clean, production-ready Next.js 16 and TypeScript codebases that your internal team can maintain.",
    detail: "Typed schemas, Docker containerization, bilateral NDA protection, and 30-day post-delivery bug warranty.",
  },
];

const INDUSTRIES = [
  {
    name: "Real Estate & Architecture",
    summary: "60fps WebGL spatial models, interactive walkthroughs, and architectural portfolios.",
    detail: "Next.js 16 and Three.js pipelines delivering smooth spatial exploration across mobile and desktop (e.g. 3axis Arc in Lucknow).",
  },
  {
    name: "Manufacturing & SME Trade",
    summary: "Automated lead intake from IndiaMART, JustDial, and web forms to WhatsApp and CRM.",
    detail: "Instant WhatsApp alerts, automated lead logging, and customer intake engines with zero manual spreadsheet copying.",
  },
  {
    name: "Aviation & Geospatial GIS",
    summary: "Open-source situational awareness tools, vector map layers, and flight briefing parsing.",
    detail: "Vector GIS map overlays and automated FAA NOTAM threat extraction (e.g. Project VAYU).",
  },
  {
    name: "Custom Web Applications",
    summary: "High-speed portals, client dashboards, and modern software replacing slow legacy sites.",
    detail: "Production Next.js 16 web applications deployed with sub-100ms response times and 100% source code ownership.",
  },
];

const WORK_FAQ_ITEMS: QAPair[] = [
  {
    category: "PRODUCTION SYSTEMS",
    question: "What production systems has VISTAR engineered?",
    answer:
      "VISTAR has engineered real-world production systems including 3axis Arc (a 60fps WebGL spatial architectural platform for a Lucknow architecture firm), VISTAR AutoLead (automated lead intake and WhatsApp notification pipeline for Indian SMEs), Project VAYU (an open-source aviation GIS tool for flight planning and NOTAM parsing), and AURA (an open-source machine learning anomaly detection research prototype).",
    keyPoints: [
      "Live verified deployments with public links and performance benchmarks",
      "Sub-100ms response times and 100/100 Lighthouse performance",
      "Interactive WebGL 3D architectural engines with zero app install required",
    ],
  },
  {
    category: "CODE OWNERSHIP & IP",
    question: "How does VISTAR guarantee 100% source code ownership?",
    answer:
      "VISTAR transfers the private GitHub repository directly to your organization on day one. You receive all application code, Dockerfiles, infrastructure configurations, and schemas. VISTAR never retains proprietary royalties, license fees, or platform retainers.",
    keyPoints: [
      "Full private GitHub repository transfer with complete commit history",
      "Zero recurring software licensing fees, subscription markup, or vendor lock-in",
      "Comprehensive architectural documentation and team handover walkthroughs",
    ],
  },
  {
    category: "SPRINT DELIVERY TIMELINE",
    question: "What is the delivery timeline for custom software projects?",
    answer:
      "VISTAR operates on fixed 14-day production sprints (and 5–7 day starter MVP sprints). Following an initial 48-hour scoping diagnostic, founding engineers build and ship functional production software in focused cycles, eliminating the multi-month delays common with traditional agencies.",
    keyPoints: [
      "48-hour architecture diagnostic and system scoping",
      "14-day iterative production sprints with deployable staging releases",
      "Direct pairing with founding engineers rather than outsourced junior teams",
    ],
  },
  {
    category: "DATA PRIVACY & CONFIDENTIALITY",
    question: "How do you protect client data and intellectual property?",
    answer:
      "Every project is executed under a bilateral Non-Disclosure Agreement (NDA). All code is written directly for your private repository, API keys and credentials remain in your environment, and we never train public models on your proprietary business data.",
    keyPoints: [
      "Bilateral NDA signed before scoping deep project details",
      "Client-managed private repositories and credentials",
      "Zero training or leakage of proprietary business data to third parties",
    ],
  },
];

export default function WorkClientPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeRole, setActiveRole] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [vayuSubImage, setVayuSubImage] = useState<string>("/projects/vayuways.png");
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  const filteredSystems =
    activeCategory === "all"
      ? PRODUCTION_SYSTEMS
      : PRODUCTION_SYSTEMS.filter((s) => s.category === activeCategory);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141413] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* ── FRAME 1: WARM EDITORIAL HERO ── */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20 border-b border-black/10 overflow-hidden px-4 sm:px-6">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/10 rounded-full text-xs font-medium text-[#5E605D] shadow-xs">
            <Code2 className="w-3.5 h-3.5 text-[#FF3823]" />
            <span>PRODUCTION PORTFOLIO &bull; 100% CODE HANDOVER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#141413] tracking-tight leading-[1.08]">
            Real Systems. Real Code. <br />
            <span className="text-[#5E605D] italic">Proven in Production.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[19px] text-[#5E605D] max-w-2xl mx-auto leading-relaxed font-normal">
            Inspect live software engineered by VISTAR—from real-time cockpit GIS and multi-agent anomaly detection to spatial 3D platforms delivered with complete source code ownership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm rounded-none transition-colors shadow-xs gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#141413] text-[#141413] bg-transparent hover:bg-white font-medium text-sm rounded-none transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── FRAME 2: VERIFIED PRODUCTION SYSTEMS (BROWSER-FRAMED CASE STUDIES) ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
                VERIFIED CASE STUDIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
                Software Deployed to Production
              </h2>
              <p className="text-base text-[#5E605D] max-w-xl">
                Every project below is an active, production-grade system engineered by VISTAR. Transferred with 100% private GitHub repositories and zero recurring platform fees.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-black/10 rounded-xl self-start md:self-end">
              {[
                { label: "All Projects (4)", value: "all" },
                { label: "3D Spatial & Architecture", value: "spatial" },
                { label: "Aviation GIS", value: "aviation" },
                { label: "Lead & WhatsApp CRM", value: "enterprise" },
                { label: "ML Research", value: "healthcare" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setActiveCategory(btn.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeCategory === btn.value
                      ? "bg-[#141413] text-white shadow-xs"
                      : "text-[#5E605D] hover:text-[#141413] hover:bg-neutral-100"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Production Systems */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredSystems.map((sys) => {
              const currentImg = sys.id === "vayu" ? vayuSubImage : sys.primaryImage;

              return (
                <div
                  key={sys.id}
                  className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs hover:border-black/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* ── SLEEK MACOS BROWSER FRAME SHOWING REAL SCREENSHOT ── */}
                  <div className="w-full bg-[#0F172A] border-b border-black/10 overflow-hidden flex flex-col">
                    {/* Browser Address Bar */}
                    <div className="h-8 px-3.5 flex items-center justify-between bg-black/60 border-b border-white/10 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/10 font-mono text-[10.5px] text-white/90">
                        <Lock className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{sys.displayUrl}</span>
                      </div>

                      <a
                        href={sys.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-2"
                      >
                        Visit <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>

                    {/* Screenshot Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                      <Image
                        src={currentImg}
                        alt={sys.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sys.id === "aura" ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                          }`}
                        />
                        <span>{sys.statusBadge}</span>
                      </div>
                    </div>

                    {/* Interactive Sub-Image Selector (for Project VAYU) */}
                    {sys.secondaryImages && (
                      <div className="px-3 py-2 bg-neutral-900 border-t border-white/10 flex items-center gap-2 overflow-x-auto">
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider shrink-0">
                          VIEWS:
                        </span>
                        {sys.secondaryImages.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => setVayuSubImage(sub.src)}
                            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors cursor-pointer shrink-0 ${
                              vayuSubImage === sub.src
                                ? "bg-white text-black font-semibold"
                                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                            }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── CARD CONTENT & DETAILS ── */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${sys.accentText} ${sys.accentBg} px-2 py-0.5 rounded`}>
                          {sys.tag}
                        </span>
                        <span className="text-xs text-[#5E605D]">
                          {sys.sector}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-normal text-[#141413] group-hover:text-[#FF3823] transition-colors leading-snug">
                        {sys.title}
                      </h3>

                      <p className="text-sm text-[#5E605D] leading-relaxed">
                        {sys.desc}
                      </p>
                    </div>

                    {/* Verified Metrics Chips */}
                    <div className="space-y-2 pt-4 border-t border-black/10">
                      <span className="text-[10px] uppercase tracking-wider text-[#5E605D] font-semibold">
                        Verified Production Benchmarks:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sys.metrics.map((m, mIdx) => (
                          <span
                            key={mIdx}
                            className="px-2 py-0.5 text-xs bg-[#FAF9F5] border border-black/10 rounded text-[#141413] font-mono font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Architecture & Handover */}
                    <div className="pt-3 border-t border-black/10 space-y-1.5 text-xs">
                      <p className="text-[#5E605D]">
                        <span className="text-[#141413] font-medium">Stack:</span> {sys.architecture}
                      </p>
                      <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{sys.repoTransfer}</span>
                      </p>
                    </div>

                    {/* Inspect CTA Row */}
                    <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                      <a
                        href={sys.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#141413] group-hover:text-[#FF3823] transition-colors"
                      >
                        Inspect Live Deployment
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        href="/start"
                        className="text-xs text-[#5E605D] hover:text-[#141413] underline underline-offset-2"
                      >
                        Build similar system &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FRAME 3: INTERACTIVE ATMOSPHERIC WEBGL SIMULATION (PROJECT VAYU) ── */}
      <section className="w-full py-16 px-4 sm:px-6 bg-white border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              LIVE WEBGL PRIMITIVE &bull; AVIATION GIS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#141413] tracking-tight">
              Atmospheric Cloud Drift &amp; Weather Shader
            </h2>
            <p className="text-sm text-[#5E605D] max-w-2xl">
              Interactive WebGL volumetric billow noise shader engineered for Project VAYU to model real-time atmospheric conditions, self-shadowing cloud layers, and flight corridor visibility.
            </p>
          </div>

          <CloudShaderDemo />
        </div>
      </section>

      {/* ── FRAME 4: SOLUTIONS BY LEADERSHIP ROLE ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              STAKEHOLDER ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              Solutions Engineered by Role
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Role Navigation */}
            <div className="lg:col-span-7 space-y-2.5">
              {ROLES.map((r, i) => {
                const isActive = activeRole === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveRole(i)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-white border-[#141413] shadow-xs"
                        : "bg-white/60 border-black/10 hover:border-black/30 hover:bg-white"
                    }`}
                  >
                    <h3 className="font-serif text-lg font-normal text-[#141413]">
                      {r.role}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-[#5E605D] mt-2 leading-relaxed">
                        {r.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Role Card */}
            <div className="lg:col-span-5 bg-white border border-black/10 rounded-2xl p-7 space-y-5 sticky top-24 shadow-xs">
              <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-semibold text-[#141413] uppercase tracking-wider">
                  Profile: {ROLES[activeRole].role}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#141413]">
                {ROLES[activeRole].role}
              </h3>
              <p className="text-sm text-[#5E605D] leading-relaxed">
                {ROLES[activeRole].detail}
              </p>
              <div className="pt-4 border-t border-black/10 space-y-1.5 text-xs text-[#5E605D]">
                <p>&bull; 100% Day-One GitHub Transfer</p>
                <p>&bull; Zero Vendor Lock-in or Retainers</p>
                <p>&bull; 14-Day Production Sprints</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 5: SOLUTIONS BY INDUSTRY ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#F6F4ED] border-b border-black/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              DOMAIN SPECIALIZATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#141413] tracking-tight">
              Solutions Engineered by Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Selected Industry Card */}
            <div className="lg:col-span-5 bg-white border border-black/10 rounded-2xl p-7 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                <Cpu className="w-5 h-5 text-[#FF3823]" />
                <span className="text-xs font-semibold text-[#141413] uppercase tracking-wider">
                  Benchmark: {INDUSTRIES[activeIndustry].name}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#141413]">
                {INDUSTRIES[activeIndustry].name}
              </h3>
              <p className="text-sm text-[#5E605D] leading-relaxed">
                {INDUSTRIES[activeIndustry].detail}
              </p>
              <div className="pt-4 border-t border-black/10 space-y-1.5 text-xs text-[#5E605D]">
                <p>&bull; Sub-100ms P99 Edge Latency</p>
                <p>&bull; 100% Client-Owned Git Repository</p>
                <p>&bull; Full Source Code Handover</p>
              </div>
            </div>

            {/* Right: Industry Navigation List */}
            <div className="lg:col-span-7 space-y-2.5">
              {INDUSTRIES.map((ind, i) => {
                const isActive = activeIndustry === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveIndustry(i)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-white border-[#141413] shadow-xs"
                        : "bg-white/60 border-black/10 hover:border-black/30 hover:bg-white"
                    }`}
                  >
                    <h3 className="font-serif text-lg font-normal text-[#141413]">
                      {ind.name}
                    </h3>
                    {isActive && (
                      <p className="text-sm text-[#5E605D] mt-2 leading-relaxed">
                        {ind.summary}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAME 6: TECHNICAL ANSWER BLOCKS (LIGHT THEME) ── */}
      <AnswerBlocks
        title="Software Engineering & Portfolio Specifications"
        subtitle="Answers regarding our production deliverables, intellectual property transfer, and engineering standards."
        badge="ENGINEERING SPECIFICATION"
        items={WORK_FAQ_ITEMS}
        schemaId="work-faq-schema"
        theme="light"
      />

      {/* ── FRAME 7: BOTTOM CONVERSION CTA ── */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5] border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#141413] tracking-tight">
            Build your sovereign software with VISTAR
          </h2>
          <p className="text-base text-[#5E605D] max-w-xl mx-auto leading-relaxed">
            Direct collaboration with Abhishek Tiwari (Founder &amp; Lead Engineer). Ship in 14-day guaranteed sprints with 100% repository handover.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FF3823] hover:bg-[#E02F1C] text-white font-medium text-sm rounded-none transition-colors shadow-xs gap-2"
            >
              Start Free Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917985790432?text=Hi%20Abhishek%2C%20I'd%20like%20to%20discuss%20a%20project%20with%20VISTAR."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm rounded-none transition-colors shadow-xs gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
