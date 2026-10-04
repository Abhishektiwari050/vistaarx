import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Code2,
  Server,
  Zap,
  ShieldCheck,
  GitBranch,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Custom Web Application & API Engineering — VISTAR",
  description:
    "Bespoke full-stack web applications, B2B customer self-service order desks, and robust API integrations built with Next.js, Node.js, and PostgreSQL. 100% source code ownership.",
  alternates: {
    canonical: `${BASE_URL}/solutions/custom-software`,
  },
  openGraph: {
    title: "Custom Web Application & API Engineering — VISTAR",
    description:
      "Modern Next.js web applications and API integrations built directly with founding engineers. 100% repository handover.",
    url: `${BASE_URL}/solutions/custom-software`,
    images: DEFAULT_OG_IMAGES,
  },
};

export default function CustomSoftwarePage() {
  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Hero */}
        <div className="space-y-5 border-b border-black/8 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-black">Solutions</Link>
            <span>/</span>
            <span className="text-[#E1341E] font-semibold">Custom Software</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>BUILD CUSTOM SOFTWARE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            Software engineered around your business model.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal max-w-3xl">
            When off-the-shelf software forces you to change how your business operates, bespoke engineering is the answer. We build fast, reliable web applications, client portals, and secure API backends that your team owns completely.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Discuss Your Software Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white border border-black/10 hover:bg-neutral-50 text-[#121316] text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Inspect Deployed Systems</span>
            </Link>
          </div>
        </div>

        {/* What We Engineer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">
              Next.js 16 Web Applications
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sub-second page speeds, zero layout shifts, dynamic server rendering, and responsive layouts that perform flawlessly across iPhones, tablets, and desktop workstations.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">
              Secure Backends &amp; APIs
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Clean REST and GraphQL APIs, strictly typed TypeScript contracts, robust PostgreSQL relational schemas, and integrations with payment processors (Razorpay, Stripe) and ERPs.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <GitBranch className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-[#121316]">
              Complete Code Sovereignty
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every commit goes to your organization’s private GitHub repository. You hold all deployment secrets, environment variables, and master credentials. Zero vendor lock-in.
            </p>
          </div>
        </div>

        {/* Engineering Standards */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h2 className="text-2xl font-bold text-[#121316]">
            Our Engineering Standards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-black/4">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-semibold">Production TypeScript:</strong>
                <span className="text-neutral-600">Strict compile-time typing with automated lint and test checks preventing production runtime crashes.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-black/4">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-semibold">PostgreSQL Relational Safety:</strong>
                <span className="text-neutral-600">Strict foreign key constraints, parameterized queries, and ACID compliance protecting your financial and customer data.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-black/4">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-semibold">Bilateral NDA &amp; Privacy:</strong>
                <span className="text-neutral-600">Your intellectual property, algorithms, and business records are legally protected from day one.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-black/4">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block font-semibold">CI/CD &amp; Automated Docker:</strong>
                <span className="text-neutral-600">Continuous deployment to Vercel, AWS, or Docker containers with complete setup runbooks.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono text-amber-400 font-semibold">
              CUSTOM SOFTWARE DISCOVERY
            </div>
            <h4 className="text-2xl font-bold text-white">
              Have a custom application in mind?
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Tell us about what you want to build. We’ll provide an architectural breakdown, deliverable milestone checklist, and fixed investment quote.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
