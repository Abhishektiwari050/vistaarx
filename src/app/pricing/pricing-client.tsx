"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronDown, ShieldCheck, Terminal, Cpu, MessageCircle, Clock, Zap, ExternalLink } from "lucide-react";
import { playClick } from "@/lib/sound";

interface MatrixSection {
  title: string;
  headerBg: string;
  rows: { name: string; starter: string | boolean; sprint: string | boolean; enterprise: string | boolean }[];
}

const MATRIX_SECTIONS: MatrixSection[] = [
  {
    title: "Software & AI Capabilities",
    headerBg: "bg-[#E8FCE8] text-[#052E16]",
    rows: [
      { name: "WhatsApp & Lead Automation", starter: true, sprint: true, enterprise: true },
      { name: "Custom Web App / Portal", starter: "Landing & API", sprint: "Full Web Application", enterprise: "Distributed Platform" },
      { name: "Schema Validation & Verification Gates", starter: true, sprint: true, enterprise: true },
      { name: "Interactive 3D / WebGL Showcase", starter: false, sprint: "Basic 3D Viewer", enterprise: "Full 60fps Spatial Engine" },
      { name: "Database & Backend Architecture", starter: "PostgreSQL / SQLite", sprint: "PostgreSQL + Redis", enterprise: "Distributed Multi-Region" },
    ],
  },
  {
    title: "Code Ownership & Sovereignty",
    headerBg: "bg-[#FCE4EC] text-[#831843]",
    rows: [
      { name: "100% GitHub Repository Handover", starter: true, sprint: true, enterprise: true },
      { name: "Dockerfiles & Deployment Manifests", starter: "Standard Dockerfile", sprint: "Full CI/CD & Docker", enterprise: "Multi-Environment IaC" },
      { name: "Zero Hostage Retainers", starter: true, sprint: true, enterprise: true },
      { name: "Full Unencumbered IP Ownership", starter: true, sprint: true, enterprise: true },
    ],
  },
  {
    title: "Delivery & Engineering SLA",
    headerBg: "bg-[#E0F2FE] text-[#0369A1]",
    rows: [
      { name: "Delivery Timeline", starter: "5â€“7 Days", sprint: "14 Days Committed", enterprise: "21â€“30 Days Milestones" },
      { name: "Direct Collaboration with Abhishek (Lead Engineer)", starter: true, sprint: true, enterprise: true },
      { name: "Post-Launch Bug Warranty", starter: "14-Day Warranty", sprint: "30-Day Zero-Cost Warranty", enterprise: "60-Day Dedicated SLA" },
      { name: "Mutual Non-Disclosure Agreement (NDA)", starter: true, sprint: true, enterprise: true },
    ],
  },
];

const FAQS_BASICS = [
  {
    q: "How much does custom software from Vistar cost?",
    a: "We offer transparent, fixed-scope engineering packages in both Indian Rupees (â‚¹) and US Dollars ($). Our Starter MVP is â‚¹49,000 ($590), our full 14-day Production System is â‚¹1,85,000 ($2,200), and custom architecture platforms start from â‚¹3,90,000 ($4,700) scoped milestone-by-milestone. No hidden hourly fees or surprise invoices.",
  },
  {
    q: "What is 100% source code handover?",
    a: "On deployment, we transfer complete, unencumbered ownership of the private GitHub repository, Docker configurations, database schemas, and documentation directly to your organization. You own every line of code forever with zero hostage fees.",
  },
  {
    q: "How are you different from typical agencies?",
    a: "Agencies charge high monthly retainers, hire junior contractors behind account executives, and take months to deliver slide decks. Vistar is a lean engineering studio led by Abhishek Tiwari. You pair directly with the engineers writing the code, shipping working production software in 14 days.",
  },
];

const FAQS_SECURITY = [
  {
    q: "How do you protect client data and IP confidentiality?",
    a: "Every project begins with a bilateral Non-Disclosure Agreement (NDA). All credentials, API tokens, and database environments belong directly to your cloud accounts (AWS, GCP, Vercel, or on-premise). Your data is never used to train external models.",
  },
  {
    q: "What happens after the project is delivered?",
    a: "Every project includes a 30-day zero-cost bug fix warranty. We ensure your team is trained, all documentation is clear, and the application is running smoothly in production. We do not trap you in mandatory recurring retainers.",
  },
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");
  const [openFaq, setOpenFaq] = useState<string | null>("b-0");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
    playClick(950, 0.02);
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#00063D] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen">
      
      {/* â”€â”€ FRAME 1: HEADER & CURRENCY TOGGLE â”€â”€ */}
      <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-20 border-b border-black/10 text-center px-4 bg-[#F2EFE9] [background-image:linear-gradient(to_right,#ffffff_1.5px,transparent_1.5px),linear-gradient(to_bottom,#ffffff_1.5px,transparent_1.5px)] [background-size:46px_46px]">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-block">
            <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-white border border-black/15 text-neutral-800 rounded shadow-xs">
              TRANSPARENT FIXED PRICING &bull; ZERO RETAINERS
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#00063D] tracking-tight leading-[1.08]">
            Simple, honest pricing <br />
            <span className="text-[#5E605D] italic">for working production software.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Fixed scope. Guaranteed 14-day production delivery. 100% source code ownership from day one.
          </p>

          {/* Currency Switcher: INR vs USD */}
          <div className="pt-3 flex items-center justify-center">
            <div className="inline-flex items-center bg-white border border-black/15 p-1 rounded-lg shadow-xs">
              <button
                onClick={() => {
                  setCurrency("inr");
                  playClick(900, 0.02);
                }}
                className={`px-5 py-2 font-sans text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currency === "inr"
                    ? "bg-[#141413] text-white shadow-xs"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                â‚¹ INR (India)
              </button>
              <button
                onClick={() => {
                  setCurrency("usd");
                  playClick(1000, 0.02);
                }}
                className={`px-5 py-2 font-sans text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currency === "usd"
                    ? "bg-[#141413] text-white shadow-xs"
                    : "text-neutral-700 hover:text-black"
                }`}
              >
                $ USD (Global)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FRAME 2: 3-TIER PRICING CARDS â”€â”€ */}
      <section className="w-full py-16 px-4 sm:px-6 -mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tier 1: Starter Automation & MVP */}
          <div className="bg-white border border-black/10 rounded-2xl shadow-xs p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:border-black/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E605D] block">ENTRY OFFER</span>
                  <h3 className="font-serif text-2xl font-normal text-[#00063D]">Starter MVP</h3>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-normal text-[#141413]">
                    {currency === "inr" ? "â‚¹49,000" : "$590"}
                  </span>
                  <span className="text-xs text-neutral-500 block font-mono">one-time</span>
                </div>
              </div>

              {/* Visual Preview for Tier 1 */}
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-black/10 bg-neutral-100 group">
                <Image
                  src="/projects/competence-crm.png"
                  alt="Starter MVP: AutoLead & WhatsApp CRM Engine"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded">
                    Output: AutoLead &amp; WhatsApp Bot
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-black/10" />

              <p className="text-xs text-neutral-600 leading-relaxed min-h-[36px]">
                Rapid automation, WhatsApp lead qualification bot, or focused web tool delivered in 5â€“7 days.
              </p>

              <div className="space-y-2 pt-1 text-xs text-neutral-700">
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Includes:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>WhatsApp or AI Lead Bot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CRM / Sheets / Email Automation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Private GitHub Handover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>14-Day Bug Warranty</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-2">
              <Link
                href="/contact"
                className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-[#141413] rounded-lg text-xs font-semibold text-center block transition-colors"
              >
                Get Started
              </Link>
              <a
                href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I'm%20interested%20in%20the%20Starter%20MVP%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-700 hover:underline flex items-center justify-center gap-1 font-mono"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Tier 2: 14-Day Production System (Most Popular) */}
          <div className="bg-white border-2 border-[#FF3823] rounded-2xl shadow-md p-6 sm:p-7 space-y-5 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 bg-[#FF3823] text-white text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded font-semibold">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF3823] block font-semibold">COMPLETE SYSTEM</span>
                  <h3 className="font-serif text-2xl font-normal text-[#00063D]">Production System</h3>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-normal text-[#FF3823]">
                    {currency === "inr" ? "â‚¹1,85,000" : "$2,200"}
                  </span>
                  <span className="text-xs text-neutral-500 block font-mono">14-day delivery</span>
                </div>
              </div>

              {/* Visual Preview for Tier 2 */}
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-[#FF3823]/30 bg-neutral-100 group">
                <Image
                  src="/projects/3axisarc.png"
                  alt="Production System: 3D Spatial & Next.js 16 Web Application"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-mono text-white bg-[#FF3823] px-2 py-0.5 rounded font-semibold">
                    Output: 3D Web &amp; Next.js App
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-black/10" />

              <p className="text-xs text-neutral-600 leading-relaxed min-h-[36px]">
                Full custom web application, 3D architectural showroom, or operational portal shipped in 14 days.
              </p>

              <div className="space-y-2 pt-1 text-xs text-neutral-700">
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Includes:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                    <span>Full Next.js 16 Web Application</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                    <span>Interactive 3D WebGL / Three.js Showcase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                    <span>Database Architecture &amp; Migrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                    <span>100% Day-One Private GitHub Handover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF3823] shrink-0" />
                    <span>30-Day Zero-Cost Bug Warranty</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-2">
              <Link
                href="/start"
                className="w-full py-3 bg-[#FF3823] hover:bg-[#E02F1C] text-white rounded-lg text-xs font-semibold text-center block transition-colors shadow-xs"
              >
                Start 14-Day Sprint
              </Link>
              <a
                href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I'm%20interested%20in%20the%20Production%20System%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-700 hover:underline flex items-center justify-center gap-1 font-mono"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Tier 3: Custom Architecture */}
          <div className="bg-white border border-black/10 rounded-2xl shadow-xs p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:border-black/30 transition-all">
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E605D] block">BESPOKE SCALE</span>
                  <h3 className="font-serif text-2xl font-normal text-[#00063D]">Custom Architecture</h3>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-normal text-[#141413]">
                    {currency === "inr" ? "â‚¹3,90,000+" : "$4,700+"}
                  </span>
                  <span className="text-xs text-neutral-500 block font-mono">custom scope</span>
                </div>
              </div>

              {/* Visual Preview for Tier 3 */}
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-black/10 bg-neutral-100 group">
                <Image
                  src="/projects/vayuways.png"
                  alt="Custom Architecture: Complex GIS & Spatial Systems"
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded">
                    Output: Complex GIS &amp; Spatial Systems
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-black/10" />

              <p className="text-xs text-neutral-600 leading-relaxed min-h-[36px]">
                Complex spatial architectures (like Project VAYU), vector GIS engines, or custom distributed platforms in 21â€“30 day milestones.
              </p>

              <div className="space-y-2 pt-1 text-xs text-neutral-700">
                <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Includes:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complex GIS / Spatial Vector Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Client-Owned Private Git Repository</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct Founder &amp; Lead Engineer Collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>60-Day Priority Engineering SLA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-2">
              <Link
                href="/contact"
                className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-[#141413] rounded-lg text-xs font-semibold text-center block transition-colors"
              >
                Schedule Architecture Review
              </Link>
              <a
                href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I'd%20like%20to%20discuss%20a%20Custom%20Architecture%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-700 hover:underline flex items-center justify-center gap-1 font-mono"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* â”€â”€ VISUAL PROOF GALLERY: WHAT WE BUILD IN THESE TIERS â”€â”€ */}
        <div className="max-w-6xl mx-auto mt-20 pt-16 border-t border-black/10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#FF3823] font-semibold">
              VERIFIED PORTFOLIO DELIVERABLES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#00063D]">
              Real systems shipped in these tiers.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Every system below was engineered and delivered with 100% private GitHub repository transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1: 3axis Arc */}
            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
                <Image
                  src="/projects/3axisarc.png"
                  alt="3axis Arc â€” 60 FPS Spatial 3D Engine for Architecture in Lucknow"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  Enterprise Tier &bull; WebGL 60 FPS
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#141413]">3axis Arc â€” Spatial 3D Platform</h3>
                  <a
                    href="https://3axisarc.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FF3823] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Interactive real-time 3D architectural visualization engine built for premier Lucknow architecture studio. Zero lag, buttery smooth 60fps orbital camera controls.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-neutral-600">
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Three.js / WebGL</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Next.js 16</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">GLTF Compression</span>
                </div>
              </div>
            </div>

            {/* Project 2: Competence CRM & AutoLead */}
            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
                <Image
                  src="/projects/competence-crm.png"
                  alt="AutoLead CRM & WhatsApp Lead Routing System"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-emerald-700/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  Starter / Sprint Tier &bull; CRM &amp; AI
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#141413]">AutoLead &amp; Operations CRM</h3>
                  <span className="text-xs text-neutral-500 font-mono">14-Day Delivery</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Multi-agent lead qualification and WhatsApp conversational bot routing inquiries directly into Google Sheets and custom CRM tables with zero manual data entry.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-neutral-600">
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">WhatsApp Business API</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">PostgreSQL</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">FastAPI</span>
                </div>
              </div>
            </div>

            {/* Project 3: Project VAYU Aviation Telemetry */}
            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
                <Image
                  src="/projects/vayuways.png"
                  alt="Project VAYU â€” Airspace Telemetry & GIS Route Engine"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-[#FF3823]/90 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  Sprint Tier &bull; Aviation GIS
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#141413]">Project VAYU â€” Airspace Telemetry</h3>
                  <a
                    href="https://ai-vayu.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FF3823] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Deterministic NOTAM parsing and GIS route vector engine for general aviation pilots, delivering sub-50ms situational telemetry across Indian and global airspace.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-neutral-600">
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Mapbox GL</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Next.js 16</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Deterministic Gates</span>
                </div>
              </div>
            </div>

            {/* Project 4: KL Herbal E-Commerce */}
            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="relative w-full aspect-[16/10] bg-neutral-100 overflow-hidden">
                <Image
                  src="/projects/klherbal.png"
                  alt="KL Herbal â€” E-Commerce Storefront & Payment Gateway"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover object-top group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded">
                  Starter / Sprint Tier &bull; E-Commerce
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#141413]">KL Herbal â€” D2C E-Commerce</h3>
                  <a
                    href="https://klherbal.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FF3823] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Storefront</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  High-conversion Ayurvedic wellness e-commerce storefront with integrated Indian payment gateways (UPI, cards), WhatsApp order confirmations, and inventory sync.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-neutral-600">
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Next.js</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Razorpay / UPI</span>
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FRAME 3: COMPARISON MATRIX â”€â”€ */}
      <section className="w-full py-16 px-4 sm:px-6 bg-[#F6F4ED] border-y border-black/10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
              FEATURE SPECIFICATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#141413] tracking-tight">
              Package Comparison
            </h2>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-black/10 bg-[#FAF9F5] text-neutral-500 font-mono uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold w-2/5">Feature</th>
                    <th className="py-3 px-4 font-semibold text-center">Starter MVP</th>
                    <th className="py-3 px-4 font-semibold text-center text-[#FF3823] bg-[#FFF0EB]">Production Sprint</th>
                    <th className="py-3 px-4 font-semibold text-center">Enterprise</th>
                  </tr>
                </thead>
                {MATRIX_SECTIONS.map((section, sIdx) => (
                  <tbody key={sIdx} className="divide-y divide-black/5">
                    <tr className="bg-neutral-50/70">
                      <td colSpan={4} className="py-2.5 px-4 font-mono font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-neutral-50/50">
                        <td className="py-3 px-4 font-medium text-neutral-800">
                          {row.name}
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-600">
                          {typeof row.starter === "boolean" ? (
                            row.starter ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-neutral-300">&mdash;</span>
                          ) : (
                            row.starter
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-[#141413] bg-[#FFF0EB]/40">
                          {typeof row.sprint === "boolean" ? (
                            row.sprint ? <Check className="w-4 h-4 text-[#FF3823] mx-auto" /> : <span className="text-neutral-300">&mdash;</span>
                          ) : (
                            row.sprint
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-600">
                          {typeof row.enterprise === "boolean" ? (
                            row.enterprise ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-neutral-300">&mdash;</span>
                          ) : (
                            row.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FRAME 4: HONEST PRICING FAQS â”€â”€ */}
      <section className="w-full py-20 px-4 sm:px-6 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#141413] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-600">
              Straightforward answers about our pricing, deliverables, and guarantees.
            </p>
          </div>

          <div className="space-y-3">
            {[...FAQS_BASICS, ...FAQS_SECURITY].map((faq, idx) => {
              const id = `faq-${idx}`;
              const isOpen = openFaq === id;
              return (
                <div
                  key={id}
                  className="bg-white border border-black/10 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(id)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-medium text-sm text-[#141413] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-black/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ FRAME 5: BOTTOM CONVERSION CTA â”€â”€ */}
      <section className="w-full py-16 px-4 bg-[#141413] text-white text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Message us on WhatsApp with your requirements or schedule a free diagnostic scoping call with Abhishek Tiwari.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/918860110144?text=Hi%20Vistar,%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 88601 10144)</span>
            </a>
            <Link
              href="/start"
              className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Start Diagnostic
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
