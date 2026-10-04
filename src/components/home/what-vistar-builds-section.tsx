"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  LayoutDashboard,
  Layers,
  Compass,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Code2,
  type LucideIcon,
} from "lucide-react";

interface SolutionCategory {
  id: string;
  tag: string;
  title: string;
  summary: string;
  description: string;
  capabilities: string[];
  sampleProject: {
    name: string;
    label: string;
    href: string;
    isExternal?: boolean;
  };
  pageHref: string;
  accentBg: string;
  accentBorder: string;
  icon: LucideIcon;
}

const CATEGORIES: SolutionCategory[] = [
  {
    id: "lead-automation",
    tag: "01 / INTAKE & CONVERSION",
    title: "Capture & Convert",
    summary: "WhatsApp automations, enquiry tracking, and smart sales workflows.",
    description:
      "Never lose an enquiry again. We build automated WhatsApp pipelines, web intake forms, and CRM integrations that triage incoming requests, alert your sales reps in seconds, and ensure automated customer follow-ups.",
    capabilities: [
      "Official WhatsApp Business Cloud API integration",
      "Automated enquiry qualification & quote intake",
      "Instant team alert routing with 1-click replies",
      "Automated customer reminders & reference tracking",
      "Direct sync to Google Sheets, CRM, or PostgreSQL",
    ],
    sampleProject: {
      name: "VISTAR AutoLead Pipeline",
      label: "Internal Production System",
      href: "/work",
    },
    pageHref: "/solutions/lead-automation",
    accentBg: "bg-emerald-50/60",
    accentBorder: "border-emerald-200",
    icon: MessageSquare,
  },
  {
    id: "operations-systems",
    tag: "02 / OPERATIONAL PORTALS",
    title: "Run Operations",
    summary: "Internal portals, executive dashboards, and inventory/job trackers.",
    description:
      "Replace tangled spreadsheets with a secure, tailored business operating portal. Give your team role-based access to log orders, track supplier batches, manage approvals, and view live company metrics without manual reports.",
    capabilities: [
      "Custom role-based internal portals (Admin, Sales, Ops)",
      "Automated PDF quotation & invoice generation",
      "Real-time operational dashboards & margin tracking",
      "Inventory, dispatch, and order status tracking",
      "Granular team permissions & complete audit trails",
    ],
    sampleProject: {
      name: "Acme Industrial Operations Portal",
      label: "Client Architecture Case Study",
      href: "/solutions/operations-systems",
    },
    pageHref: "/solutions/operations-systems",
    accentBg: "bg-blue-50/60",
    accentBorder: "border-blue-200",
    icon: LayoutDashboard,
  },
  {
    id: "custom-software",
    tag: "03 / TAILORED ENGINEERING",
    title: "Build Custom Software",
    summary: "Modern web applications, client portals, APIs, and data integrations.",
    description:
      "When off-the-shelf software doesn’t fit your business model, we engineer bespoke web applications. Fast, responsive, and maintainable software built on modern Next.js and robust databases, transferred 100% to your private GitHub.",
    capabilities: [
      "Full-stack Next.js web apps with sub-second page loads",
      "B2B client self-service portals and order desks",
      "REST & GraphQL API design and database architecture",
      "Third-party tool integrations (Tally, Zoho, Stripe, Razorpay)",
      "Automated unit testing, CI/CD, and Docker deployment",
    ],
    sampleProject: {
      name: "KL Herbal E-Commerce Portal",
      label: "Verified Production System",
      href: "/work",
    },
    pageHref: "/solutions/custom-software",
    accentBg: "bg-amber-50/60",
    accentBorder: "border-amber-200",
    icon: Layers,
  },
  {
    id: "3d-and-gis",
    tag: "04 / SPECIALIST ENGINEERING",
    title: "Specialist 3D & GIS Platforms",
    summary: "Interactive WebGL spatial showrooms, aviation GIS, and data models.",
    description:
      "For businesses requiring high-end digital craft. We engineer interactive 3D product visualizers for architecture and real estate, geospatial map layers, and specialist machine learning prototypes.",
    capabilities: [
      "60 FPS interactive 3D WebGL showrooms with zero app downloads",
      "Aviation GIS vector mapping & geospatial data layers",
      "Realistic architectural interior and product configurators",
      "Python data pipelines & machine learning prototypes",
      "Hardware-accelerated graphics optimized for mobile",
    ],
    sampleProject: {
      name: "3axis Arc Spatial Showroom & Project VAYU GIS",
      label: "Live Production & Open Source",
      href: "https://3axisarc.vercel.app",
      isExternal: true,
    },
    pageHref: "/solutions/3d-and-gis",
    accentBg: "bg-purple-50/60",
    accentBorder: "border-purple-200",
    icon: Compass,
  },
];

export function WhatVistarBuildsSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12]">
              What Vistar builds for your business.
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Practical software engineering tailored to solve real commercial problems. Every system is engineered directly with leadership and delivered with 100% source code ownership.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#121316] hover:text-[#E1341E] transition-colors"
            >
              <span>Explore full solutions directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Solution Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-[#FAF9F6] border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-black/20 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold tracking-wider text-neutral-500 uppercase">
                      {cat.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-neutral-800 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#121316] tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-sm font-medium text-[#E1341E] mt-1">
                      {cat.summary}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {cat.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      Key Capabilities Included:
                    </div>
                    <ul className="space-y-2">
                      {cat.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Proof anchor */}
                  <div className="text-xs">
                    <span className="text-neutral-400 block font-mono text-[10px] uppercase">
                      Demonstrable Reference:
                    </span>
                    {cat.sampleProject.isExternal ? (
                      <a
                        href={cat.sampleProject.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-neutral-800 hover:text-[#E1341E] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{cat.sampleProject.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={cat.sampleProject.href}
                        className="font-semibold text-neutral-800 hover:text-[#E1341E] inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{cat.sampleProject.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {/* Deep dive link */}
                  <Link
                    href={cat.pageHref}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white border border-black/10 hover:bg-neutral-50 text-xs font-semibold text-neutral-900 transition-colors shadow-2xs gap-1.5 self-start sm:self-center"
                  >
                    <span>Detailed Solution Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhatVistarBuildsSection;
