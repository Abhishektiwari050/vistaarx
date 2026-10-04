"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  FileCheck,
  Hammer,
  ShieldAlert,
  GitBranch,
  RefreshCw,
  ArrowRight,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface Step {
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Understand",
    tagline: "Uncover the real operational bottleneck",
    description:
      "We begin with a focused 30-minute discovery conversation directly with Abhishek. We review your current workflow, who touches it, where data lives, what tools you already pay for, and what tangible business outcome you want to achieve.",
    deliverables: [
      "Process map of current vs. desired workflow",
      "Identification of tool integrations needed",
      "Honest assessment of whether software is even required",
    ],
    icon: Search,
  },
  {
    num: "02",
    title: "Scope",
    tagline: "Fixed boundaries, transparent milestones, zero surprises",
    description:
      "Before writing a line of code, we define a crystal-clear technical specification. You receive a document detailing exactly what is included, what is excluded, system architecture, milestones, dependencies, and fixed dual-currency pricing.",
    deliverables: [
      "Bilateral Mutual NDA signed",
      "Explicit statement of work with deliverable checklists",
      "Upfront fixed cost (no hourly meter or billable surprises)",
    ],
    icon: FileCheck,
  },
  {
    num: "03",
    title: "Build",
    tagline: "Visible, iterative development with direct founder access",
    description:
      "We engineer the solution in visible sprints. You get access to private staging URLs and regular milestone Loom videos or live reviews so you can test working software as it’s being built—not in an opaque reveal at the end.",
    deliverables: [
      "Private GitHub repository commits from day one",
      "Live interactive staging environment for testing",
      "Direct WhatsApp and email channel with Abhishek",
    ],
    icon: Hammer,
  },
  {
    num: "04",
    title: "Verify",
    tagline: "Edge-case testing, permissions, and security hygiene",
    description:
      "We thoroughly test the system against real-world chaos: malformed inputs, edge-case phone numbers, broken network connections, role-based access limits, rate-limiting, and data privacy safeguards.",
    deliverables: [
      "Automated unit and integration test suite",
      "Anti-spam honeypot and rate-limiting validation",
      "Cross-device mobile, tablet, and desktop verification",
    ],
    icon: ShieldAlert,
  },
  {
    num: "05",
    title: "Deploy & Hand Over",
    tagline: "100% source code ownership and team walkthrough",
    description:
      "On deployment day, we transfer complete administrative ownership of the private GitHub repository directly to your organization. We deploy to your infrastructure (Vercel, AWS, Cloudflare, or Docker) and train your key team members.",
    deliverables: [
      "100% private GitHub repository rights transferred",
      "Clear deployment documentation and environment runbook",
      "30-day post-launch warranty covering any bugs",
    ],
    icon: GitBranch,
  },
  {
    num: "06",
    title: "Improve",
    tagline: "Optional ongoing support and feature iterations",
    description:
      "Once your baseline workflow is humming, you have zero obligation to keep paying us. If you wish to build subsequent phases, integrate new tools, or retain dedicated engineering availability, we offer simple month-to-month partnership retainers.",
    deliverables: [
      "Zero retainer lock-in (you own everything freely)",
      "Optional monthly maintenance and SLA support",
      "Priority roadmap scheduling for subsequent features",
    ],
    icon: RefreshCw,
  },
];

export function HowEngagementWorksSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-white text-[#121316]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/8 text-neutral-700 text-xs font-mono font-semibold uppercase tracking-wider">
            Clear Engagement Model
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121316] leading-[1.12]">
            How we work together, step by step.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            No agency telephone games, no unvetted junior handoffs, and no runaway hourly bills. Every project follows a disciplined six-stage engineering lifecycle with full transparency.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#FAF9F6] border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-black/20 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold font-mono text-[#E1341E]">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-black/8 flex items-center justify-center text-neutral-800 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#121316]">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                      {step.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/8">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Key Outcomes:
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Cadence Disclaimer Note */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-50 border border-black/8 flex items-start gap-4">
          <Clock className="w-5 h-5 text-neutral-600 shrink-0 mt-1" />
          <div className="text-xs text-neutral-600 leading-relaxed space-y-1">
            <strong className="text-neutral-900 font-semibold block text-[13px]">
              Realistic timelines tailored to your scope:
            </strong>
            <p>
              Focused automations and enquiry intake pipelines often take 5–10 business days; custom multi-user operational portals or complex 3D platforms typically require 2 to 4 weeks. Delivery timelines depend on system scope, third-party API availability, data readiness, and how quickly your team can review staging milestones. We commit to a realistic, mutually agreed date before any invoice is issued.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowEngagementWorksSection;
