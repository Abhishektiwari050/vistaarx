import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  FileCheck,
  Hammer,
  ShieldAlert,
  GitBranch,
  RefreshCw,
  ArrowRight,
  Shield,
  Lock,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How We Work — Engineering Process, Contracts & Code Handover | VISTAR",
  description:
    "Understand Vistar's 6-stage engineering process, scope boundaries, payment milestones, bilateral NDAs, and 100% source code handover on GitHub.",
  alternates: {
    canonical: `${BASE_URL}/how-we-work`,
  },
  openGraph: {
    title: "How We Work — Engineering Process, Contracts & Code Handover | VISTAR",
    description:
      "Direct founder access, fixed milestones, bilateral NDAs, and 100% repository handover. How Vistar delivers software with zero agency bloat.",
    url: `${BASE_URL}/how-we-work`,
    images: DEFAULT_OG_IMAGES,
  },
};

const STAGES = [
  {
    num: "STAGE 01",
    title: "Discovery & Workflow Mapping",
    tagline: "Uncover the real bottleneck before proposing code",
    desc: "We start with a 30-minute structured discovery conversation directly with Abhishek. We map how data flows through your business today: where messages enter, who processes them, which spreadsheets or tools are used, and where delays occur. If software is not the right answer, we will tell you plainly.",
    deliverables: [
      "Process map of current vs. proposed automated workflow",
      "List of third-party APIs needed (e.g. WhatsApp, Google Sheets, Tally)",
      "Feasibility and return-on-investment assessment",
    ],
  },
  {
    num: "STAGE 02",
    title: "Scope Definition & Fixed Quotation",
    tagline: "Clear boundaries and transparent milestone pricing",
    desc: "Before any commitment, we provide a written Statement of Work. It specifies exact feature inclusions, explicit exclusions, staging milestones, delivery date commitments, and a fixed fee in INR or USD. You never face hidden billable hours or surprise invoice inflations.",
    deliverables: [
      "Mutual Bilateral Non-Disclosure Agreement (NDA) executed",
      "Itemized Statement of Work with acceptance criteria",
      "Fixed milestone fee and clear payment schedule (e.g. 50% start / 50% delivery)",
    ],
  },
  {
    num: "STAGE 03",
    title: "Milestone-Driven Engineering",
    tagline: "Visible, iterative progress with private staging access",
    desc: "Engineering happens in visible sprints. You receive private staging links to test real working screens as they are completed. You have direct WhatsApp and email access to Abhishek for prompt clarifications without agency account manager delays.",
    deliverables: [
      "Private GitHub repository initialized for your organization",
      "Staging URLs with real database interactions for testing",
      "Regular milestone video walkthroughs and progress updates",
    ],
  },
  {
    num: "STAGE 04",
    title: "Rigorous Verification & Testing",
    tagline: "Testing edge cases, rate limits, and security hygiene",
    desc: "Before production deployment, we test systems against bad inputs, invalid phone numbers, dropped network connections, and rate limits. For web portals, we verify responsive rendering on mobile, tablet, and desktop viewports.",
    deliverables: [
      "Automated unit and API integration test checks",
      "Spam honeypot and rate-limiting validation",
      "Cross-browser and mobile responsive audit",
    ],
  },
  {
    num: "STAGE 05",
    title: "Production Deployment & Complete Handover",
    tagline: "100% repository transfer and team enablement",
    desc: "On deployment day, we transfer complete administrative ownership of the private GitHub repository to your organization. We deploy the system to your preferred cloud (Vercel, AWS, Cloudflare, or Docker), set up environment secrets, and conduct a live training session for your staff.",
    deliverables: [
      "100% private GitHub repository rights transferred directly to you",
      "Environment configuration documentation and operational runbook",
      "Live 45-minute administrative training session for your team",
      "30-day post-launch bug warranty included at zero extra cost",
    ],
  },
  {
    num: "STAGE 06",
    title: "Autonomous Operation or Ongoing Partnership",
    tagline: "Zero retainer lock-in; optional ongoing support",
    desc: "Because you own all clean source code, runbooks, and credentials, you can run the system independently forever without paying Vistar another rupee. If you desire ongoing engineering availability for monthly feature additions or maintenance, we offer month-to-month retainers.",
    deliverables: [
      "Total freedom to maintain the codebase in-house or with contractors",
      "Optional month-to-month maintenance retainer with SLA support",
      "Priority scheduling for future automation phases",
    ],
  },
];

const CONTRACT_POLICIES = [
  {
    title: "Bilateral Mutual NDA & Data Confidentiality",
    desc: "We sign a mutual Non-Disclosure Agreement before receiving proprietary business data. All credentials, customer records, and API keys remain within your private cloud environment. We never train public AI models on your proprietary records.",
  },
  {
    title: "Payment Milestones & Transparent Pricing",
    desc: "Standard projects operate on fixed milestone billing (typically 50% upon scope approval and 50% upon deployment). Invoices can be paid in INR (₹) via NEFT/UPI or USD ($) via international bank transfer/Stripe.",
  },
  {
    title: "Scope Boundaries & Change Requests",
    desc: "Features defined in the Statement of Work are delivered for the agreed fixed fee. If you wish to add new modules or workflows midway, we scope and quote them separately so your baseline budget and delivery date remain predictable.",
  },
  {
    title: "Third-Party Service & API Charges",
    desc: "Usage fees for third-party services (such as Meta WhatsApp Business message conversations, Vercel/AWS cloud hosting, or domain names) are paid directly by you to the provider. Vistar never marks up your hosting or API bills.",
  },
  {
    title: "30-Day Post-Delivery Warranty",
    desc: "Every fixed-scope project includes 30 days of warranty support post-deployment. If any defect or error appears within the agreed scope, we fix it promptly at zero additional charge.",
  },
  {
    title: "100% Intellectual Property Sovereignty",
    desc: "Upon final payment, all custom code, schemas, and assets developed for your system belong exclusively to you. You hold the master repository, the database, and the right to commercialize or modify the system freely.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-5 border-b border-black/8 pb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Operational Transparency
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            How we engineer software: disciplined, visible, and honest.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal max-w-3xl">
            Software projects fail when scopes are vague, timelines are unrealistic, and communication gets lost in agency bureaucracy. Here is exactly how an engagement with Vistar unfolds from first conversation to full repository handover.
          </p>
        </div>

        {/* 6 Stages Timeline */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
            THE 6-STAGE DELIVERY LIFECYCLE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STAGES.map((stage) => (
              <div
                key={stage.num}
                className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-black/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E1341E]">
                      {stage.num}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      VISTAR STANDARD
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#121316]">
                    {stage.title}
                  </h3>

                  <p className="text-xs font-semibold text-neutral-500">
                    {stage.tagline}
                  </p>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/6">
                  <span className="text-[10px] font-mono uppercase font-semibold text-neutral-400 block mb-1.5">
                    Stage Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {stage.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contract, Terms & IP Handover Grid */}
        <div id="ownership" className="space-y-6 pt-6 border-t border-black/8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              TRUST, CONTRACTS &amp; TRANSPARENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#121316]">
              Clear terms that protect your business.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We operate with total legal and commercial clarity. No fine-print retainer traps or ambiguous intellectual property clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTRACT_POLICIES.map((policy) => (
              <div
                key={policy.title}
                className="bg-white border border-black/10 rounded-2xl p-6 space-y-2 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#16A34A]" />
                  <h4 className="text-sm font-bold text-[#121316]">
                    {policy.title}
                  </h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {policy.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h4 className="text-2xl font-bold text-white">
              Have a process you&rsquo;d like to walk through?
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Schedule a 30-minute discovery conversation with Abhishek to review your workflow and receive an honest engineering assessment.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Book Discovery Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
