import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, ArrowRight, ShieldCheck, Zap, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { KEYWORDS, BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import { AnswerBlocks } from "@/components/seo/answer-blocks";
import { MultiAgentConsensusMotion } from "@/components/ui/multi-agent-consensus-motion";

const AI_FAQ_ITEMS = [
  {
    category: "ARCHITECTURE & DEFINITION",
    question: "What is a custom autonomous AI agent system?",
    answer:
      "A custom autonomous AI agent is a software architecture where large language models independently execute multi-step workflows. Unlike simple chatbots, agents utilize deterministic state machines, invoke authenticated external APIs, query private vector databases, and execute programmatic actions with typed schema validation.",
    keyPoints: [
      "State-machine driven execution graphs (LangGraph / custom kernels)",
      "Structured JSON Schema validation on all tool invocations",
      "Sub-second latency across asynchronous message brokers",
    ],
  },
  {
    category: "ACCURACY & RELIABILITY",
    question: "How does VISTAR prevent hallucinations in production AI?",
    answer:
      "VISTAR prevents hallucinations by enforcing strict JSON Schema validation, deterministic tool-calling constraints, and multi-agent consensus checks. Every model output is gated by deterministic business logic before updating production databases or dispatching user-facing actions.",
    keyPoints: [
      "Zero-hallucination validation gates before persistence",
      "Multi-agent consensus voting on mission-critical inferences",
      "Automated fallback routines for edge-case anomalies",
    ],
  },
  {
    category: "DATA SECURITY & ISOLATION",
    question: "Can custom AI software run inside an enterprise's private VPC?",
    answer:
      "Yes. VISTAR deploys all AI models, vector stores, and agent pipelines directly inside the client's virtual private cloud (AWS, GCP, Azure, or on-premise). Proprietary data never leaves your security perimeter, ensuring zero third-party model training leakage.",
    keyPoints: [
      "Customer-managed AWS / GCP / Azure private VPC isolation",
      "Zero third-party training leakage or public logging",
      "TLS 1.3 in-transit and AES-256 data-at-rest encryption",
    ],
  },
  {
    category: "IP & SOURCE CODE OWNERSHIP",
    question: "Who owns the intellectual property and source code?",
    answer:
      "The client owns 100% of all intellectual property, source code, model fine-tuning recipes, and infrastructure runbooks. Everything is transferred to your private GitHub repository on day one with zero ongoing license or hostage fees.",
    keyPoints: [
      "Complete private GitHub repository handover from day one",
      "Zero recurring software licensing or SaaS hostage fees",
      "Comprehensive Terraform and Docker deployment runbooks",
    ],
  },
  {
    category: "DELIVERY & TIMELINE",
    question: "How quickly can VISTAR deliver a production AI system?",
    answer:
      "VISTAR operates in 14-day production sprints. Days 1–3 focus on architecture and data auditing, Days 4–11 cover core engineering and regression testing, and Days 12–14 complete private VPC deployment and complete code handover.",
    keyPoints: [
      "Fixed 14-day milestone delivery with daily staging updates",
      "Automated CI/CD testing and sub-100ms performance benchmarks",
      "Direct Slack access to principal engineering leads",
    ],
  },
];

export const metadata: Metadata = {
  title: "Custom AI Agent Development — Autonomous Workflow Systems | VISTAR",
  description:
    "VISTAR builds custom AI agents and autonomous multi-agent workflow systems. Hire senior AI engineers for LLM application development, private RAG pipelines, GPT integration, and enterprise AI automation. Production-ready in 14 days.",
  keywords: KEYWORDS.aiSolutions,
  alternates: {
    canonical: `${BASE_URL}/services/ai-solutions`,
  },
  openGraph: {
    title: "Custom AI Agent Development — Autonomous Workflow Systems | VISTAR",
    description:
      "Hire senior AI engineers for custom AI agents, LLM applications, private RAG pipelines, and autonomous workflow automation. 100% code ownership.",
    url: `${BASE_URL}/services/ai-solutions`,
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom AI Agent Development — Autonomous Workflow Systems | VISTAR",
    description:
      "Custom AI agents, LLM applications, private RAG pipelines, and enterprise AI automation. 100% code ownership. Production-ready in 14 days.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Autonomous AI Agent & Workflow Engineering",
  provider: {
    "@type": "Organization",
    name: "Vistar Web Systems",
    url: "https://www.vistar.tech",
  },
  description:
    "Decoupled multi-agent architectures, real-time telemetry anomaly detection, custom LLM tool-calling engines, and enterprise RAG pipelines.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Rapid 2–4 week AI agent integration sprints with full code and model pipeline handover.",
  },
};

const AI_CAPABILITIES = [
  {
    step: "01",
    title: "Decoupled Multi-Agent Architectures",
    desc: "Autonomous agent pods communicating over distributed message brokers. Specialized agents for research, data extraction, validation, and action execution with zero latency bottlenecks.",
    tags: ["Multi-Agent Systems", "Message Brokers", "Async Python"],
  },
  {
    step: "02",
    title: "Private & Local RAG Retrieval Engines",
    desc: "Zero-cost local document parsing with PyMuPDF, vector embeddings, and multimodal grounding. Keep sensitive enterprise IP secure with on-premise or VPC inference.",
    tags: ["Local RAG", "Vector Search", "Gemini & Claude"],
  },
  {
    step: "03",
    title: "Real-Time Telemetry & Anomaly Detection",
    desc: "Unsupervised machine learning pipelines (Isolation Forest, statistical stream filters) processing biometric, financial, and industrial sensor data in sub-20ms windows.",
    tags: ["Isolation Forest", "Telemetry Streaming", "FastAPI"],
  },
  {
    step: "04",
    title: "Production Tool Calling & Self-Healing Workflows",
    desc: "Rigid JSON Schema-validated tool execution, automatic retry logic, and fallback routines ensuring agents never hallucinate invalid actions or corrupt production databases.",
    tags: ["Structured Outputs", "Self-Healing", "CI/CD Gateways"],
  },
];

export default function AISolutionsPage() {
  return (
    <main className="w-full bg-[#FAF9F5] text-[#0E1118] font-sans antialiased selection:bg-[#FF3823] selection:text-white min-h-screen pt-20 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── 1. JASPER HERO: ARCHITECTURAL BLUEPRINT GRID ── */}
      <section className="relative jasper-grid-hero border-b border-black/10 pt-20 pb-28 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 border border-black/10 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px]">
              Services // AI Agent Engineering
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold text-[#0E1118] tracking-tight leading-[1.08]">
            Autonomous AI Agents &amp;{" "}
            <span className="font-serif italic font-normal text-[#FF3823]">
              Multi-Agent
            </span>{" "}
            Pods.
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Move beyond simple prompt wrappers. We architect deterministic, multi-agent execution graphs that execute complex reasoning, data pipelines, and tool interactions with 99.8% precision.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Start Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-900 px-7 py-3.5 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. LIVE MULTI-AGENT CONSENSUS BUS DEPICTION ── */}
      <section className="max-w-6xl mx-auto px-6 pt-12 -mb-8">
        <MultiAgentConsensusMotion />
      </section>

      {/* ── 3. CAPABILITIES GRID ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest border border-black/15 px-2.5 py-1 rounded bg-white">
            Architecture Core
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0E1118] tracking-tight mt-3">
            Production-Ready AI Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AI_CAPABILITIES.map((cap) => (
            <div
              key={cap.step}
              className="bg-white border border-black/10 rounded-[6px] p-8 shadow-sm space-y-4 hover:border-black/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#FF3823] uppercase tracking-wider">
                    MODULE // {cap.step}
                  </span>
                  <span className="font-serif text-2xl font-bold text-neutral-300">
                    {cap.step}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0E1118]">
                  {cap.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5">
                {cap.tags.map((t, idx) => (
                  <span key={idx} className="font-mono text-[11px] px-2.5 py-1 bg-[#FAF9F5] border border-black/10 rounded text-neutral-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. HIGH-DENSITY ANSWER BLOCKS (SEMANTIC GEO / FAQ FOR LLM SCRAPERS) ── */}
      <AnswerBlocks
        badge="GEO KNOWLEDGE BASE // AI AGENTS"
        title="Technical Answers & Architecture Specifications"
        subtitle="Quotable architecture documentation and engineering answers optimized for technical evaluations and automated intelligence scrapers."
        items={AI_FAQ_ITEMS}
        schemaId="ai-solutions-faq-schema"
      />

      {/* ── 4. FINAL CTA ── */}
      <section className="w-full py-20 px-6 jasper-grid-hero border-t border-black/10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0E1118]">
            Deploy sovereign AI agents into production.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            Get 100% repository handover, private VPC isolation, and zero hostage retainer fees.
          </p>
          <div className="pt-2">
            <Link
              href="/start"
              className="bg-[#FF3823] hover:bg-[#E0301C] text-white px-8 py-4 font-semibold text-sm rounded-[4px] shadow-sm inline-flex items-center gap-2"
            >
              Start Technical Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
