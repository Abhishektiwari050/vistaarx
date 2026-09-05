import type { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "@/components/spotlight-card";

export const metadata: Metadata = {
  title: "AI Agent Engineering & Multi-Agent Workflow Systems",
  description:
    "Hire elite AI engineers. We build production autonomous multi-agent systems, private local RAG pipelines, and high-throughput real-time AI architectures.",
  keywords: [
    "Hire AI Agent Developers",
    "Multi-Agent System Architecture",
    "Enterprise AI Workflow Automation",
    "Private Local RAG Engineering",
    "FastAPI Python AI Microservices",
    "Custom LLM Integration Agency",
  ],
  alternates: {
    canonical: "/services/ai-solutions",
  },
  openGraph: {
    title: "AI Agent Engineering & Multi-Agent Workflows | Vistar Web Systems",
    description:
      "Production-grade AI architectures, autonomous agents, and enterprise telemetry processing systems engineered by Vistar Web Systems.",
    url: "https://www.vistar.tech/services/ai-solutions",
    type: "website",
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
    <div className="w-full relative min-h-screen bg-[#faf9f5] text-[#0a0a0a] overflow-x-clip pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 relative z-10 space-y-16">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-black font-bold">AI Agent Engineering</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3.5 py-1.5 rounded-md text-[9px] font-mono font-black tracking-[2px] uppercase text-black shadow-[2px_2px_0px_#d8ff42]">
            <span className="w-2 h-2 rounded-full bg-[#ff1e90] border border-black animate-pulse" />
            HIGH-INTENT COMMERCIAL SERVICE // AI SYSTEMS ARCHITECTURE
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-[#0a0a0a] leading-[0.95]">
            Autonomous AI Agents <br />
            <span className="font-serif italic font-normal text-zinc-400 lowercase">
              engineered for mission-critical execution.
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-zinc-700 max-w-3xl leading-relaxed">
            Move beyond brittle toy chatbots. We engineer production-grade multi-agent systems, real-time telemetry anomaly detectors, and private enterprise RAG pipelines that execute real work.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="bg-[#ff1e90] text-white font-display font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#d8ff42] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
            >
              Consult On Your AI Architecture ⚡
            </Link>
            <Link
              href="/work"
              className="bg-white text-black font-display font-black text-xs tracking-widest uppercase px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:bg-[#faf9f5] transition-all interactive"
            >
              Inspect Shipped AI Systems &rarr;
            </Link>
          </div>
        </div>

        {/* Technical Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-black divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black bg-white shadow-[6px_6px_0px_#000] rounded-2xl overflow-hidden select-none">
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">&lt;20ms</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Telemetry Pipeline Latency</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">98.4%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Anomaly Detection Precision</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#ff1e90] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black group-hover:text-white leading-none mb-1">100%</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white">Strict JSON Schemas</div>
          </div>
          <div className="p-6 text-center group hover:bg-[#d8ff42] transition-colors duration-200">
            <div className="font-display font-black text-3xl sm:text-4xl text-black leading-none mb-1">14–28d</div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black">Production Integration</div>
          </div>
        </div>

        {/* AI Capabilities Grid */}
        <div className="space-y-8">
          <div className="border-b-2 border-black/10 pb-4">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#d8ff42] bg-black px-2 py-0.5 rounded inline-block mb-1">
              SYSTEM CAPABILITIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
              Enterprise AI Systems We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AI_CAPABILITIES.map((c) => (
              <SpotlightCard
                key={c.step}
                className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#000] hover:shadow-[8px_8px_0px_#ff1e90] transition-all duration-300"
              >
                <div className="space-y-4">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded bg-[#ff1e90] text-white inline-block">
                    MODULE {c.step}
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-black">
                    {c.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                    {c.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#111111] text-white border-[3px] border-black rounded-3xl p-8 sm:p-12 shadow-[8px_8px_0px_#ff1e90] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-mono text-[9px] font-black tracking-widest uppercase text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full inline-block">
              Confidentiality &amp; IP Protection
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              Ready to automate your highest-cost operations?
            </h3>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              All client contracts include comprehensive NDAs, private VPC deployment, and zero training on your proprietary corporate data.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 bg-[#ff1e90] text-white font-display font-black text-xs tracking-widest uppercase px-8 py-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#d8ff42] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all interactive"
          >
            Deploy Your AI Agent Pod ⚡
          </Link>
        </div>
      </div>
    </div>
  );
}
