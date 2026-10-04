import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  LayoutDashboard,
  Layers,
  Compass,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solutions & Engineering Capabilities — VISTAR",
  description:
    "Explore Vistar's practical software engineering solutions: WhatsApp enquiry automation, internal operations portals, custom Next.js web applications, and specialist 3D/GIS platforms.",
  alternates: {
    canonical: `${BASE_URL}/solutions`,
  },
  openGraph: {
    title: "Solutions & Engineering Capabilities — VISTAR",
    description:
      "Practical software engineering solutions for B2B distributors, manufacturers, and growing businesses. 100% repository handover.",
    url: `${BASE_URL}/solutions`,
    images: DEFAULT_OG_IMAGES,
  },
};

const SOLUTIONS = [
  {
    slug: "lead-automation",
    num: "01",
    tag: "INTAKE & SALES CONVERSION",
    title: "Capture & Convert",
    subtitle: "WhatsApp enquiry automation, lead triage, and CRM pipelines",
    problemSolved: "Eliminates lost enquiries, slow quotation turnaround, and sales leads forgotten on personal phones.",
    idealFor: "B2B distributors, wholesalers, and service businesses managing high inquiry volume.",
    keyCapabilities: [
      "Official WhatsApp Business Cloud API integration",
      "Instant 15-second lead qualification and sales rep dispatch",
      "Automated customer quote confirmations with reference tracking",
      "Direct bi-directional sync to Google Sheets, PostgreSQL, or CRM",
    ],
    verifiedProof: "VISTAR AutoLead Pipeline (Production Internal)",
    proofHref: "/work",
  },
  {
    slug: "operations-systems",
    num: "02",
    tag: "OPERATIONAL INFRASTRUCTURE",
    title: "Run Operations",
    subtitle: "Internal portals, executive dashboards, and job tracking systems",
    problemSolved: "Replaces fragile, disconnected spreadsheets with a single secure operational portal.",
    idealFor: "Mid-sized manufacturers, logistics teams, and businesses with multiple department handoffs.",
    keyCapabilities: [
      "Custom role-based access control (Admin, Sales, Dispatch, Accounts)",
      "Automated PDF quotation, invoice, and bill of materials generation",
      "Real-time operational dashboards & margin calculation",
      "Inventory batch tracking and order status monitoring",
    ],
    verifiedProof: "Acme Industrial Operations Architecture",
    proofHref: "/solutions/operations-systems",
  },
  {
    slug: "custom-software",
    num: "03",
    tag: "BESPOKE ENGINEERING",
    title: "Build Custom Software",
    subtitle: "Modern Next.js web applications, client order desks, and APIs",
    problemSolved: "Provides tailor-made software when off-the-shelf SaaS doesn't fit your business model.",
    idealFor: "Startups, scale-ups, and established brands needing bespoke customer portals.",
    keyCapabilities: [
      "Sub-second page loads engineered with Next.js 16 & TypeScript",
      "B2B self-service client ordering desks and customer portals",
      "Robust REST/GraphQL API design and database architecture",
      "Complete CI/CD deployment pipeline with 100% repository handover",
    ],
    verifiedProof: "KL Herbal E-Commerce Portal",
    proofHref: "/work",
  },
  {
    slug: "3d-and-gis",
    num: "04",
    tag: "SPECIALIST CRAFT",
    title: "Specialist 3D & GIS Platforms",
    subtitle: "Interactive 3D WebGL showrooms, aviation GIS, and data models",
    problemSolved: "Translates complex spatial or geospatial data into intuitive in-browser interactive tools.",
    idealFor: "Architecture firms, real estate developers, aviation operators, and geospatial projects.",
    keyCapabilities: [
      "60 FPS in-browser 3D WebGL spatial showrooms with zero app downloads",
      "Geospatial vector mapping with dynamic hazard corridors",
      "Touch-responsive controls optimized for iPad and mobile",
      "Hardware-accelerated shaders and dynamic perspective rendering",
    ],
    verifiedProof: "3axis Arc Showroom & Project VAYU GIS",
    proofHref: "https://3axisarc.vercel.app",
    isExternal: true,
  },
];

export default function SolutionsOverviewPage() {
  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 pb-12 border-b border-black/8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Solutions Hub
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            Practical software built around your workflows.
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed font-normal">
            We don’t build disposable demos or unmaintainable templates. Every solution is scoped to resolve operational friction, integrate with your existing tools, and transfer 100% to your private GitHub.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.slug}
              className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-black/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#E1341E]">
                    {sol.num} &bull; {sol.tag}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    100% Code Handover
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#121316] tracking-tight">
                    {sol.title}
                  </h2>
                  <p className="text-sm font-medium text-neutral-600 mt-1">
                    {sol.subtitle}
                  </p>
                </div>

                <div className="space-y-2 text-xs bg-neutral-50 p-4 rounded-xl border border-black/4">
                  <div>
                    <strong className="text-neutral-900 font-semibold block uppercase font-mono text-[10.5px]">
                      The Problem Solved:
                    </strong>
                    <p className="text-neutral-600 mt-0.5">{sol.problemSolved}</p>
                  </div>
                  <div className="pt-2">
                    <strong className="text-neutral-900 font-semibold block uppercase font-mono text-[10.5px]">
                      Ideal For:
                    </strong>
                    <p className="text-neutral-600 mt-0.5">{sol.idealFor}</p>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-2">
                    {sol.keyCapabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-neutral-400 block font-mono text-[10px] uppercase">
                    Verified Deployment:
                  </span>
                  {sol.isExternal ? (
                    <a
                      href={sol.proofHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-neutral-800 hover:text-[#E1341E] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{sol.verifiedProof}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={sol.proofHref}
                      className="font-semibold text-neutral-800 hover:text-[#E1341E] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{sol.verifiedProof}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <Link
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all gap-1.5 shadow-2xs self-start sm:self-center"
                >
                  <span>Explore Solution Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Action Card */}
        <div className="mt-12 bg-white border border-black/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-xl font-bold text-[#121316]">
              Not sure which solution matches your bottleneck?
            </h3>
            <p className="text-sm text-neutral-600">
              Schedule a 30-minute discovery conversation with Abhishek. We&rsquo;ll review your current workflow, inspect your spreadsheets, and outline the simplest effective system.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#E1341E] hover:bg-[#C92915] text-white text-xs font-semibold transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Book Discovery Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
