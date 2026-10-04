"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
} from "lucide-react";

interface CaseStudy {
  id: string;
  badge: string;
  badgeStyle: string;
  title: string;
  client: string;
  problem: string;
  whatBuilt: string;
  vistarContribution: string;
  technologies: string[];
  inspectLabel: string;
  inspectUrl: string;
  isExternal: boolean;
  imageSrc: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "3axisarc",
    badge: "PRODUCTION CLIENT SHOWROOM",
    badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
    title: "3axis Arc: Interactive 3D Spatial Showroom",
    client: "Architecture & Interior Design Firm (Lucknow, UP)",
    problem:
      "High-end architecture clients struggled to understand spatial floorplans from static 2D PDFs, leading to prolonged approval cycles and hesitation on commercial interior projects.",
    whatBuilt:
      "A high-performance in-browser 3D WebGL spatial showroom. Clients can interactively explore elevations, inspect material textures, and evaluate lighting conditions without downloading separate apps.",
    vistarContribution:
      "Architectural 3D asset optimization, custom Three.js WebGL shader engineering, responsive touch controls for tablets, and full deployment on Vercel Edge with zero layout shift.",
    technologies: ["Next.js", "Three.js / WebGL", "Tailwind CSS", "Vercel Edge"],
    inspectLabel: "Launch Live Showroom (3axisarc.vercel.app)",
    inspectUrl: "https://3axisarc.vercel.app",
    isExternal: true,
    imageSrc: "/projects/3axisarc.png",
  },
  {
    id: "autolead",
    badge: "INTERNAL PRODUCTION PIPELINE",
    badgeStyle: "bg-blue-100 text-blue-800 border-blue-300",
    title: "VISTAR AutoLead: Automated Lead Triage & WhatsApp Routing",
    client: "Vistar Web Systems (Production Operations)",
    problem:
      "Inbound web form inquiries and client messages often sit in email inboxes for hours, allowing hot leads to cool down and delaying quotation delivery.",
    whatBuilt:
      "An automated intake engine that validates incoming client briefs, verifies against honeypots, extracts structured parameters, dispatches instant WhatsApp alerts directly to Abhishek, and maintains a local JSONL audit trail.",
    vistarContribution:
      "End-to-end architecture, API route security, rate-limiting algorithms, email SMTP dispatchers, and automated WhatsApp alert triggers.",
    technologies: ["Next.js Route Handlers", "WhatsApp Cloud API", "JSONL Audit Stream", "TypeScript"],
    inspectLabel: "Test Working Intake Form",
    inspectUrl: "/contact",
    isExternal: false,
    imageSrc: "/projects/competence-crm.png",
  },
  {
    id: "vayu",
    badge: "OPEN SOURCE AVIATION GIS",
    badgeStyle: "bg-amber-100 text-amber-800 border-amber-300",
    title: "Project VAYU: Aviation NOTAM & Weather Briefing GIS",
    client: "Open Source Community (Aviation Safety)",
    problem:
      "Pilots and flight dispatchers must parse complex, all-caps NOTAM text cables to identify hazard zones, restricted airspace, and runway closures before flight departures.",
    whatBuilt:
      "An interactive web-based pre-flight briefing dashboard that parses live NOTAM bulletins, extracts geospatial coordinates, and renders warning corridors on dynamic vector maps.",
    vistarContribution:
      "Python FastAPI parsing algorithms, MapLibre vector GIS layers, cockpit UI aesthetics, and open-source public repository maintenance on GitHub.",
    technologies: ["Python / FastAPI", "MapLibre GL Vector GIS", "Next.js", "GeoJSON"],
    inspectLabel: "Inspect Live Tool (ai-vayu.vercel.app)",
    inspectUrl: "https://ai-vayu.vercel.app",
    isExternal: true,
    imageSrc: "/projects/vayuways.png",
  },
  {
    id: "aura",
    badge: "RESEARCH ML PROTOTYPE",
    badgeStyle: "bg-purple-100 text-purple-800 border-purple-300",
    title: "AURA: Multi-Agent Biometric Anomaly Detection",
    client: "R&D Prototype (Synthetic Data Research)",
    problem:
      "Validating how unsupervised machine learning algorithms detect subtle statistical outliers in continuous sensor streams without human labeling.",
    whatBuilt:
      "An experimental multi-agent diagnostic prototype testing Isolation Forest algorithms across synthetic physiological data streams with strict schema-validation gates.",
    vistarContribution:
      "Statistical modeling, FastAPI inference microservice, Pydantic schema validation layers, and containerized deployment.",
    technologies: ["Python Scikit-Learn", "FastAPI", "Pydantic", "Docker"],
    inspectLabel: "Inspect Prototype Live",
    inspectUrl: "https://multi-agent-anomaly-system.onrender.com",
    isExternal: true,
    imageSrc: "/projects/aura-results.png",
  },
];

export function DemonstrableWorkSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-y border-black/8 text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
              Demonstrable Proof
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12]">
              Systems you can inspect and verify.
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              We don&rsquo;t rely on fabricated client logos or unverified revenue claims. Every system below has real code, clear boundaries, and a live deployment you can click and test right now.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#121316] hover:text-[#E1341E] transition-colors"
            >
              <span>View all engineering case studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Detailed Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-black/20 transition-all group"
            >
              {/* Screenshot Preview */}
              <div className="relative w-full h-56 sm:h-64 bg-neutral-100 overflow-hidden border-b border-black/8">
                <Image
                  src={study.imageSrc}
                  alt={study.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 680px"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-md border ${study.badgeStyle} uppercase shadow-2xs`}
                  >
                    {study.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono text-neutral-500 mb-1">
                      {study.client}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
                      {study.title}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-neutral-900 font-semibold uppercase font-mono text-[11px] block">
                        The Problem:
                      </strong>
                      <p className="text-neutral-600 leading-relaxed mt-0.5">
                        {study.problem}
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-semibold uppercase font-mono text-[11px] block">
                        What Was Built:
                      </strong>
                      <p className="text-neutral-600 leading-relaxed mt-0.5">
                        {study.whatBuilt}
                      </p>
                    </div>

                    <div>
                      <strong className="text-neutral-900 font-semibold uppercase font-mono text-[11px] block">
                        Vistar&rsquo;s Contribution:
                      </strong>
                      <p className="text-neutral-600 leading-relaxed mt-0.5">
                        {study.vistarContribution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Pills & Inspection Action */}
                <div className="pt-4 border-t border-black/8 space-y-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {study.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 text-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div>
                    {study.isExternal ? (
                      <a
                        href={study.inspectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-2xs group"
                      >
                        <span>{study.inspectLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        href={study.inspectUrl}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-2xs group"
                      >
                        <span>{study.inspectLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DemonstrableWorkSection;
