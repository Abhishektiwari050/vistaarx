"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lock,
  GitBranch,
  Server,
  Zap,
  Activity,
  Terminal,
  Maximize2,
} from "lucide-react";

export type DiagramType =
  | "agency-cost-breakdown"
  | "deterministic-dag"
  | "sovereign-vpc"
  | "telemetry-gis"
  | "mcp-enclave"
  | "speculative-decoding"
  | "pd-disaggregation"
  | "radix-cache"
  | "multi-lora"
  | "chunked-prefill"
  | "mla-kv-compression"
  | "mtp-speculative-pipeline"
  | "dualpipe-zero-bubble";

interface TechnicalDiagramProps {
  type?: DiagramType;
  slug?: string;
  caption?: string;
  className?: string;
  compact?: boolean;
}

export function getDiagramTypeForSlug(slug: string): DiagramType {
  switch (slug) {
    case "dualpipe-zero-bubble-expert-parallelism-deepseek-v3":
      return "dualpipe-zero-bubble";
    case "multi-token-prediction-mtp-deepseek-v3":
      return "mtp-speculative-pipeline";
    case "multi-head-latent-attention-mla-deepseek-vllm":
      return "mla-kv-compression";
    case "chunked-prefill-piggybacking-production-vllm":
      return "chunked-prefill";
    case "dynamic-multi-lora-serving-production-vllm-s-lora":
      return "multi-lora";
    case "hierarchical-context-caching-radix-attention-production-vllm":
      return "radix-cache";
    case "disaggregated-prefill-decode-production-vllm-architecture":
      return "pd-disaggregation";
    case "speculative-decoding-production-vllm-enterprise-inference":
      return "speculative-decoding";
    case "enterprise-model-context-protocol-mcp-security-architecture":
      return "mcp-enclave";
    case "vllm-production-architecture-enterprise-inference-tco":
    case "test-time-compute-deepseek-r1-private-vpc-architecture":
      return "sovereign-vpc";
    case "why-agencies-charge-200k-for-chatgpt-wrappers":
      return "agency-cost-breakdown";
    case "deterministic-multi-agent-graphs-vs-probabilistic-drift":
      return "deterministic-dag";
    case "sovereign-private-vpc-ai-deployment-guide":
      return "sovereign-vpc";
    case "sub-45ms-real-time-telemetry-gis-architecture":
    case "sub-50ms-webgl-spatial-interfaces-nextjs-16":
      return "telemetry-gis";
    default:
      return "deterministic-dag";
  }
}

export function TechnicalDiagram({
  type,
  slug,
  caption,
  className = "",
  compact = false,
}: TechnicalDiagramProps) {
  const activeType: DiagramType =
    type || (slug ? getDiagramTypeForSlug(slug) : "deterministic-dag");

  const [activeTab, setActiveTab] = useState<"diagram" | "metrics">("diagram");

  return (
    <div
      className={`w-full bg-[#0D0F12] text-[#ECEEF5] border border-white/10 rounded-xl overflow-hidden shadow-lg font-sans ${className}`}
    >
      {/* ── TOP TERMINAL / DIAGRAM HUD BAR ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#14171D] border-b border-white/10 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
          </div>
          <span className="font-mono text-[11px] text-neutral-400 pl-2 border-l border-white/10">
            {activeType === "agency-cost-breakdown" && "ARCH // ECONOMICS-BREAKDOWN.SPEC"}
            {activeType === "deterministic-dag" && "DAG // MULTI-AGENT-STATE-MACHINE.SPEC"}
            {activeType === "sovereign-vpc" && "TOPOLOGY // PRIVATE-VPC-AIRGAP.SPEC"}
            {activeType === "telemetry-gis" && "PIPELINE // SUB-45MS-TELEMETRY-STREAM.SPEC"}
            {activeType === "mcp-enclave" && "GATEWAY // SECURE-MCP-TOOL-ENCLAVE.SPEC"}
            {activeType === "speculative-decoding" && "PIPELINE // SPECULATIVE-DRAFT-VERIFY.SPEC"}
            {activeType === "pd-disaggregation" && "TOPOLOGY // DISAGGREGATED-PREFILL-DECODE.SPEC"}
            {activeType === "radix-cache" && "TOPOLOGY // RADIX-TREE-PREFIX-CACHE.SPEC"}
            {activeType === "multi-lora" && "TOPOLOGY // DYNAMIC-MULTI-LORA-SGMV.SPEC"}
            {activeType === "chunked-prefill" && "PIPELINE // CHUNKED-PREFILL-PIGGYBACKING.SPEC"}
            {activeType === "mla-kv-compression" && "TOPOLOGY // MULTI-HEAD-LATENT-ATTENTION-MLA.SPEC"}
            {activeType === "mtp-speculative-pipeline" && "PIPELINE // MULTI-TOKEN-PREDICTION-MTP.SPEC"}
            {activeType === "dualpipe-zero-bubble" && "PIPELINE // DUALPIPE-BIDIRECTIONAL-OVERLAP.SPEC"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            VERIFIED SPEC
          </span>
        </div>
      </div>

      {/* ── DIAGRAM RENDERER ── */}
      <div className={`p-5 sm:p-6 ${compact ? "max-h-[340px]" : "min-h-[380px]"}`}>
        
        {/* ── 1. AGENCY COST & ARCHITECTURE COMPARISON ── */}
        {activeType === "agency-cost-breakdown" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Legacy Agency Column */}
              <div className="bg-[#161922] border border-red-500/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-[11px] text-red-400 font-semibold uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Traditional 50-Person Agency
                  </span>
                  <span className="font-mono text-xs text-red-300 font-bold">$200,000+</span>
                </div>
                
                <div className="space-y-2 text-xs font-mono text-neutral-400">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Account Management &amp; PMs:</span>
                    <span className="text-white">$75,000 (37%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>90-Page Strategy PDF Deck:</span>
                    <span className="text-white">$65,000 (32%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Junior Contractor Devs:</span>
                    <span className="text-white">$60,000 (30%)</span>
                  </div>
                  <div className="flex justify-between py-1 text-red-400 font-semibold">
                    <span>Mandatory Monthly Retainer:</span>
                    <span>$15,000/mo</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-400 space-y-1">
                  <p className="flex items-center gap-1.5 text-neutral-300">
                    <span className="text-red-400 font-bold">&times;</span> Delivery: 16–24 Weeks
                  </p>
                  <p className="flex items-center gap-1.5 text-neutral-300">
                    <span className="text-red-400 font-bold">&times;</span> Code Ownership: Proprietary Retainer Lock-in
                  </p>
                  <p className="flex items-center gap-1.5 text-neutral-300">
                    <span className="text-red-400 font-bold">&times;</span> Architecture: Unvalidated Prompt API Wrapper
                  </p>
                </div>
              </div>

              {/* VISTAR Sovereign Cell Column */}
              <div className="bg-[#161922] border border-emerald-500/30 rounded-lg p-4 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-mono text-[11px] text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    VISTAR Engineering Cell
                  </span>
                  <span className="font-mono text-xs text-emerald-300 font-bold">₹1,85,000 ($2,400)</span>
                </div>

                <div className="space-y-2 text-xs font-mono text-neutral-400">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Principal Systems Architect:</span>
                    <span className="text-emerald-300 font-semibold">100% Direct Pairing</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Typed Next.js 16 &amp; Python Core:</span>
                    <span className="text-white">Production Shipped</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Docker &amp; Terraform Runbooks:</span>
                    <span className="text-white">Day-One Included</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 font-semibold">
                    <span>Ongoing Monthly Retainer:</span>
                    <span>₹0 (Zero Lock-in)</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-neutral-400 space-y-1">
                  <p className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Delivery: Fixed 14-Day Committed Sprint
                  </p>
                  <p className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Code Ownership: 100% Private GitHub Transfer
                  </p>
                  <p className="flex items-center gap-1.5 text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Architecture: Mathematical Deterministic DAG
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Comparative Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-[#14171D] border border-white/5 p-3 rounded text-center">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Cost Efficiency</span>
                <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">12x Lower</span>
              </div>
              <div className="bg-[#14171D] border border-white/5 p-3 rounded text-center">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Delivery Time</span>
                <span className="text-base sm:text-lg font-mono font-bold text-white">14 Days</span>
              </div>
              <div className="bg-[#14171D] border border-white/5 p-3 rounded text-center">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Code Sovereignty</span>
                <span className="text-base sm:text-lg font-mono font-bold text-white">100% Git</span>
              </div>
              <div className="bg-[#14171D] border border-white/5 p-3 rounded text-center">
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">Warranty SLA</span>
                <span className="text-base sm:text-lg font-mono font-bold text-white">30 Days</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. DETERMINISTIC STATE MACHINE & MULTI-AGENT DAG ── */}
        {activeType === "deterministic-dag" && (
          <div className="space-y-6">
            {/* Visual DAG Flowchart */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              
              {/* Step 1 */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">NODE 01</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Stream Ingest</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">WebSocket binary buffer &bull; 18ms</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-neutral-500">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Step 2: Verification Gate */}
              <div className="bg-[#161922] border-2 border-emerald-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">GATE 02</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Schema Validator</h5>
                <p className="text-[10px] text-emerald-400/90 leading-tight">Strict Zod / Pydantic Contracts</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-neutral-500">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Step 3: Decoupled Pods */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">NODE 03</span>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Consensus Pods</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">Reasoning &bull; 3-Agent Voting</p>
              </div>

            </div>

            {/* Verification Proof Terminal Box */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>EXECUTION_STATE_MATRIX.log</span>
                <span className="text-emerald-400">STATE_MUTATION: PERMITTED</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[0.00ms]</span> INGEST: FAA NOTAM raw payload (size: 4.8 KB)
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[12.4ms]</span> VALIDATION_GATE: Passed schema contract (#ZOD_0921)
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[28.1ms]</span> REASONING_KERNEL: Geospatial polygon calculated [lat: 26.8467, lon: 80.9462]
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[34.2ms]</span> AUDIT_LEDGER: Committed to ClickHouse (SHA256: 7f89d...0e2)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Out-of-Bounds Drift</span>
                <span className="text-sm font-mono font-bold text-emerald-400">0.00%</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">P95 Step Latency</span>
                <span className="text-sm font-mono font-bold text-white">&lt;35ms</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Verification Rate</span>
                <span className="text-sm font-mono font-bold text-emerald-400">99.8%</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. SOVEREIGN PRIVATE VPC AIR-GAPPED TOPOLOGY ── */}
        {activeType === "sovereign-vpc" && (
          <div className="space-y-6">
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-5 relative overflow-hidden">
              {/* VPC Boundary Tag */}
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <span className="font-mono text-xs text-[#FF3823] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Customer Private VPC (AWS / GCP / Azure)
                </span>
                <span className="font-mono text-[10px] text-neutral-400 bg-white/5 px-2 py-0.5 rounded">
                  Egress Rule: 0.0.0.0/0 DENIED
                </span>
              </div>

              {/* Subnet Topology Schematics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Subnet 1: Public Gateway */}
                <div className="bg-[#14171D] border border-white/10 rounded p-3 space-y-2">
                  <span className="font-mono text-[10px] text-blue-400 font-semibold uppercase">Subnet 01: Ingress</span>
                  <h6 className="font-mono text-xs text-white font-bold">TLS 1.3 Anycast Edge</h6>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    WAF, rate limiting, and mTLS token termination. Zero direct access to GPU weights.
                  </p>
                </div>

                {/* Subnet 2: Compute Enclave */}
                <div className="bg-[#14171D] border-2 border-emerald-500/40 rounded p-3 space-y-2">
                  <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase">Subnet 02: Private Enclave</span>
                  <h6 className="font-mono text-xs text-white font-bold">vLLM &amp; TensorRT Enclave</h6>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    Dedicated NVIDIA A10G / H100 instances with PagedAttention v2. Non-routable internal IP.
                  </p>
                </div>

                {/* Subnet 3: Model Storage */}
                <div className="bg-[#14171D] border border-white/10 rounded p-3 space-y-2">
                  <span className="font-mono text-[10px] text-purple-400 font-semibold uppercase">Subnet 03: Model Vault</span>
                  <h6 className="font-mono text-xs text-white font-bold">Encrypted S3 / GCS</h6>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    Fine-tuned LoRA weights, pgvector embeddings, and ClickHouse audit tables (AES-256).
                  </p>
                </div>
              </div>
            </div>

            {/* Latency & Compliance Comparison Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">External Data Leakage</span>
                <span className="text-sm font-mono font-bold text-emerald-400">0.00%</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Inference TTFT</span>
                <span className="text-sm font-mono font-bold text-white">45ms – 85ms</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Compliance Standard</span>
                <span className="text-sm font-mono font-bold text-white">DPDP &bull; GDPR</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Infrastructure Rights</span>
                <span className="text-sm font-mono font-bold text-emerald-400">100% Client Owned</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 4. SUB-45MS REAL-TIME TELEMETRY & GIS ── */}
        {activeType === "telemetry-gis" && (
          <div className="space-y-6">
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Live Telemetry Pipeline (Project VAYU &amp; AURA)
                </span>
                <span className="font-mono text-xs text-neutral-400">100Hz Frame Rate</span>
              </div>

              {/* Pipeline Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#14171D] p-3 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 block">PROTOCOL</span>
                  <div className="text-xs font-mono font-bold text-white">Binary Protobuf Stream</div>
                  <p className="text-[10px] text-neutral-400 leading-tight">3.1 KB payload (-68% wire reduction)</p>
                </div>
                <div className="bg-[#14171D] p-3 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 block">ANOMALY ML</span>
                  <div className="text-xs font-mono font-bold text-white">Isolation Forest (12ms)</div>
                  <p className="text-[10px] text-neutral-400 leading-tight">99.4% precision on biometric drift</p>
                </div>
                <div className="bg-[#14171D] p-3 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 block">RENDER LOOP</span>
                  <div className="text-xs font-mono font-bold text-white">Mapbox WebGL 60 FPS</div>
                  <p className="text-[10px] text-neutral-400 leading-tight">Zero hydration lag across edge CDNs</p>
                </div>
              </div>

              {/* Latency Distribution Benchmark */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>Network Transmission + Serialization:</span>
                  <span className="text-emerald-400 font-semibold">14.2ms</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "32%" }} />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-neutral-400 pt-1">
                  <span>Unsupervised ML Anomaly Inference:</span>
                  <span className="text-emerald-400 font-semibold">11.8ms</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "26%" }} />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-neutral-400 pt-1">
                  <span>Client WebGL Spatial Buffer Commit:</span>
                  <span className="text-emerald-400 font-semibold">8.4ms</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "19%" }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">P95 End-to-End Latency</span>
                <span className="text-sm font-mono font-bold text-emerald-400">&lt;34.4ms</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Framerate Target</span>
                <span className="text-sm font-mono font-bold text-white">60 FPS Locked</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Anomaly Detection SLA</span>
                <span className="text-sm font-mono font-bold text-emerald-400">99.8% Precision</span>
              </div>
            </div>
          </div>
        )}
        {/* ── 5. ZERO-TRUST MCP TOOL ENCLAVE & SCHEMA FIREWALL ── */}
        {activeType === "mcp-enclave" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {/* Node 1 */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">NODE 01</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Agent Kernel</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">JSON-RPC 2.0 &bull; mTLS Pipe</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-neutral-500">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Node 2: Firewall Gate */}
              <div className="bg-[#161922] border-2 border-emerald-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">GATEWAY 02</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Schema Firewall</h5>
                <p className="text-[10px] text-emerald-400/90 leading-tight">Zod AST &bull; Scoped RBAC</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-neutral-500">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Node 3: Isolated MCP Pod */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">ENCLAVE 03</span>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                  <Server className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">MCP Sandbox</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">Air-Gapped &bull; Ephemeral Pod</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>MCP_ZERO_TRUST_ROUTER.log</span>
                <span className="text-emerald-400">TOOL_DISPATCH: AUTHORIZED</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[0.00ms]</span> INGEST: jsonrpc_call [tools/call: query_inventory_ledger]
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[2.1ms]</span> FIREWALL_INSPECT: Argument AST validated against strict JSON Schema (#ZOD_MCP_41)
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[5.4ms]</span> RBAC_CHECK: Ephemeral capability token verified (Scope: READ_ONLY_INTERNAL)
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[11.8ms]</span> DISPATCH_SUCCESS: Result returned to agent &bull; SHA-256 written to ClickHouse audit ledger
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Prompt-Injection Deflect</span>
                <span className="text-sm font-mono font-bold text-emerald-400">100.0%</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">P95 Dispatch Latency</span>
                <span className="text-sm font-mono font-bold text-white">&lt;12ms</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Security Boundary</span>
                <span className="text-sm font-mono font-bold text-emerald-400">Air-Gapped VPC</span>
              </div>
            </div>
          </div>
        )}
        {/* ── 7. DISAGGREGATED PREFILL-DECODE & KV-CACHE RDMA STREAMING PIPELINE ── */}
        {activeType === "pd-disaggregation" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {/* Node 1: Dedicated Prefill Pool */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">POOL 01 // PREFILL</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Prefill Cluster (H100)</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">Compute-Bound GEMM &bull; 398 TFLOPS</p>
              </div>

              {/* Arrow: 400Gbps RoCEv2 RDMA Fabric */}
              <div className="hidden sm:flex flex-col items-center justify-center text-emerald-400 space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">400Gbps RDMA</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-neutral-400">&lt;1.4ms Transfer</span>
              </div>

              {/* Node 2: Dedicated Decode Pool */}
              <div className="bg-[#161922] border-2 border-emerald-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">POOL 02 // DECODE</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Decode Cluster (H200)</h5>
                <p className="text-[10px] text-emerald-400/90 leading-tight">Bandwidth-Bound GEMV &bull; PagedAttention</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-neutral-500">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Node 3: Zero-Jitter Real-time Stream */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STREAM 03</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Zero-Jitter Stream</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">P99 ITL &lt;14ms &bull; 0 Prefill Stalls</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>DISAGGREGATED_PD_ORCHESTRATOR.log</span>
                <span className="text-emerald-400">STATUS: ZERO_STALL_CONVERGENCE</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[0.00ms]</span> INGEST: 16,384-token prompt dispatched to Prefill Worker Pool #04 (Compute-Bound GEMM)
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[41.2ms]</span> PREFILL_COMPLETE: Context digested at 398 TFLOPS &bull; 2.68GB KV-cache allocated
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[42.6ms]</span> RDMA_STREAM: Zero-copy GPUDirect RDMA transferred over 400Gbps RoCEv2 fabric (&Delta;t = 1.4ms)
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[43.8ms]</span> DECODE_LOCKED: First token emitted by Decode Pool #02 &bull; Active streams maintained at 12.4ms/token (P99 jitter: &lt;2.1ms)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">P99 ITL Jitter Reduction</span>
                <span className="text-sm font-mono font-bold text-emerald-400">-96.2%</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Locked Inter-Token Latency</span>
                <span className="text-sm font-mono font-bold text-white">12.4ms</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Cluster TCO Savings</span>
                <span className="text-sm font-mono font-bold text-emerald-400">54.2% Saved</span>
              </div>
            </div>
          </div>
        )}
        {/* ── 8. HIERARCHICAL CONTEXT CACHING & RADIX TREE ATTENTION PIPELINE ── */}
        {activeType === "radix-cache" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {/* Node 1: Ingress Context Payload */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 01 // INGRESS</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Multi-Turn Ingress</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">52,400 Tokens &bull; System + Tools</p>
              </div>

              {/* Arrow: Radix Tree Match */}
              <div className="hidden sm:flex flex-col items-center justify-center text-emerald-400 space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Radix Match</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-neutral-400">49,850 Tks (95.1% Hit)</span>
              </div>

              {/* Node 2: Radix Tree KV-Cache Engine */}
              <div className="bg-[#161922] border-2 border-emerald-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">STAGE 02 // RADIX</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Layers className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Radix KV Engine</h5>
                <p className="text-[10px] text-emerald-400/90 leading-tight">Zero Recompute &bull; 3,115 Blocks</p>
              </div>

              {/* Arrow: Delta Prefill */}
              <div className="hidden sm:flex flex-col items-center justify-center text-amber-400 space-y-1">
                <span className="text-[9px] font-mono text-amber-400 uppercase font-semibold">Delta Prefill</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
                <span className="text-[8px] font-mono text-neutral-400">2,550 New Tokens</span>
              </div>

              {/* Node 3: Instant Stream Emitter */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 03 // STREAM</span>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Sub-150ms TTFT</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">142ms TTFT &bull; 82% FLOPs Saved</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>RADIX_PREFIX_CACHE_ORCHESTRATOR.log</span>
                <span className="text-emerald-400">PREFIX_MATCH: 95.1% CONVERGENCE</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[0.00ms]</span> INGEST: 52,400-token multi-agent context received (Session #RADIX_881)
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[1.2ms]</span> RADIX_TRAVERSAL: Prefix match found at Depth 4 &bull; 49,850 tokens identified in L1 GPU HBM
                </p>
                <p className="text-neutral-400">
                  <span className="text-emerald-400">[3.4ms]</span> KV_BLOCK_MAP: Reused 3,115 physical KV memory blocks (0 FLOPs recalculated)
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[142.1ms]</span> FIRST_TOKEN_EMITTED: Delta prefill (2,550 tokens) completed &bull; TTFT: 142.1ms (vs 3,240ms un-cached)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Prefix Cache Hit Rate</span>
                <span className="text-sm font-mono font-bold text-emerald-400">95.1% Hit</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">TTFT Reduction</span>
                <span className="text-sm font-mono font-bold text-white">142ms (-88.4%)</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Prefill Compute Saved</span>
                <span className="text-sm font-mono font-bold text-emerald-400">82.6% Less TCO</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 9. DYNAMIC MULTI-LORA SERVING & SGMV CUDA KERNEL PIPELINE ── */}
        {activeType === "multi-lora" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {/* Node 1: Heterogeneous Tenant Queue */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 01 // QUEUE</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Multi-Tenant Ingress</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">Legal (r=16) &bull; Fin (r=32) &bull; Code (r=16)</p>
              </div>

              {/* Arrow: Batched SGMV Dispatch */}
              <div className="hidden sm:flex flex-col items-center justify-center text-cyan-400 space-y-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">SGMV Dispatch</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[8px] font-mono text-neutral-400">Single Batch GEMM</span>
              </div>

              {/* Node 2: S-LoRA SGMV Kernel + Frozen Base Model */}
              <div className="bg-[#161922] border-2 border-cyan-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">STAGE 02 // SGMV</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">SGMV CUDA Kernel</h5>
                <p className="text-[10px] text-cyan-400/90 leading-tight">Frozen 70B W₀ + Paged ΔW Matrices</p>
              </div>

              {/* Arrow: Zero-Bubble Continuous Batch */}
              <div className="hidden sm:flex flex-col items-center justify-center text-emerald-400 space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Unified Paging</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-[8px] font-mono text-neutral-400">HBM &lt;&gt; DDR5 DMA</span>
              </div>

              {/* Node 3: Low-Latency Multi-Tenant Token Stream */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 03 // OUTPUT</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Concurrent Stream</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">512 Hot Adapters &bull; +1.8% Latency Delta</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>MULTI_LORA_SGMV_ORCHESTRATOR.log</span>
                <span className="text-cyan-400">BATCH_SIZE: 64 HETEROGENEOUS SLICES</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.00ms]</span> BATCH_INGEST: 64 concurrent requests targeting 38 distinct domain LoRA adapters (Tokens: 1,840)
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.42ms]</span> UNIFIED_PAGE_LOOKUP: 37 adapters resident in L1 HBM Pool &bull; 1 adapter paged from Host DDR5 via PCIe Gen5 (4.1ms)
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[1.18ms]</span> SGMV_KERNEL_LAUNCH: Batched Segmented Gather Matrix-Vector kernel executed across all 64 query projections
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[14.82ms]</span> TPOT_STREAM_CONVERGED: Next-token batch evaluated &bull; Overhead vs un-adapted base model: +0.27ms (+1.8%)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Concurrent Domain Adapters</span>
                <span className="text-sm font-mono font-bold text-cyan-400">512 Active</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Kernel Latency Overhead</span>
                <span className="text-sm font-mono font-bold text-emerald-400">+1.8% (Negligible)</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">GPU Cluster TCO Reduction</span>
                <span className="text-sm font-mono font-bold text-emerald-400">-84.2% Lower Cost</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 10. CHUNKED PREFILL & DYNAMIC PIGGYBACKING PIPELINE ── */}
        {activeType === "chunked-prefill" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {/* Node 1: Heterogeneous Request Ingress */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 01 // INGRESS</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Terminal className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Mixed Traffic Stream</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">16k Doc Prompt &bull; 32 Active Decodes</p>
              </div>

              {/* Arrow: Token Budget Slicer */}
              <div className="hidden sm:flex flex-col items-center justify-center text-cyan-400 space-y-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">Budget Slicer</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[8px] font-mono text-neutral-400">Budget = 544 tok</span>
              </div>

              {/* Node 2: Fused Execution & Piggyback Attention */}
              <div className="bg-[#161922] border-2 border-cyan-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">STAGE 02 // FUSED</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Dynamic Piggybacking</h5>
                <p className="text-[10px] text-cyan-400/90 leading-tight">512 Chunk GEMM + 32 Decodes (0ms stall)</p>
              </div>

              {/* Arrow: Smooth Token Emission */}
              <div className="hidden sm:flex flex-col items-center justify-center text-emerald-400 space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Zero Jitter</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-[8px] font-mono text-neutral-400">P99 ITL &lt; 20ms</span>
              </div>

              {/* Node 3: Streaming SLA Output */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 03 // STREAM</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Guaranteed SLA Flow</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">18.4ms Steady TPOT &bull; 94.6% Saturation</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>VLLM_CHUNKED_PREFILL_SCHEDULER.log</span>
                <span className="text-cyan-400">TOKEN_BUDGET: 1024 BATCHED TOKENS</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.00ms]</span> SCHEDULER_CYCLE: Ingress has 1 long prompt (16,384 tokens) + 32 streaming decode requests
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.12ms]</span> TOKEN_BUDGET_ALLOCATION: Slice 512 prefill tokens + 32 decode tokens &bull; Batch token load: 544
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[1.45ms]</span> FLASHATTN_CHUNKED_EXECUTION: 512-token chunk saturates Tensor Cores &bull; 32 decode tokens ride memory bus for 0ms penalty
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[18.38ms]</span> STEP_DISPATCH_COMPLETE: 32 streaming tokens emitted &bull; Head-of-line blocking eliminated (P99 ITL: 18.4ms vs 840ms unchunked)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">P99 Inter-Token Latency</span>
                <span className="text-sm font-mono font-bold text-emerald-400">18.4ms (97.8% Jitter Reduction)</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">GPU Compute Saturation</span>
                <span className="text-sm font-mono font-bold text-cyan-400">94.6% Tensor Core Occupancy</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Cluster Throughput Multiplier</span>
                <span className="text-sm font-mono font-bold text-emerald-400">2.8x Higher Aggregate QPS</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 11. MULTI-HEAD LATENT ATTENTION (MLA) & LOW-RANK KV COMPRESSION ── */}
        {activeType === "mla-kv-compression" && (
          <div className="space-y-6">
            {/* Top Memory Wall Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#161922]/70 border border-red-500/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    STANDARD GQA (LLaMA-3.3 70B)
                  </span>
                  <span className="text-red-400/80 bg-red-950/40 px-2 py-0.5 rounded text-[10px]">OOM CEILING</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Per-Token KV Footprint:</span>
                    <span className="text-red-300 font-semibold">8,192 bytes (2x L x H_kv x d_h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">128k Context Footprint:</span>
                    <span className="text-red-400 font-bold">41.9 GB / Sequence</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1 text-[10px]">
                    <span className="text-neutral-400">Max Concurrent 128k Streams:</span>
                    <span className="text-red-400 font-bold">2 Streams &bull; 98% OOM Crash Risk</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161922]/90 border border-emerald-500/40 rounded-lg p-3 space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    DEEPSEEK MLA (vLLM / SGLang)
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[10px] font-bold">93.3% COMPRESSED</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Per-Token Latent Footprint:</span>
                    <span className="text-emerald-400 font-semibold">576 bytes (512d latent + 64d RoPE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">128k Context Footprint:</span>
                    <span className="text-emerald-400 font-bold">2.95 GB / Sequence</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1 text-[10px]">
                    <span className="text-neutral-400">Max Concurrent 128k Streams:</span>
                    <span className="text-emerald-400 font-bold">32+ Streams &bull; Sub-22ms P99 ITL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-Stage Pipeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {/* Stage 1 */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 01 // DOWN-PROJ</span>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Latent Compression</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">h_t (7168d) &rarr; c_t^KV (512d) + k_t^R (64d)</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex flex-col items-center justify-center text-cyan-400 space-y-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">14x Compression</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[8px] font-mono text-neutral-400">576 Elements</span>
              </div>

              {/* Stage 2 */}
              <div className="bg-[#161922] border-2 border-cyan-500/50 rounded-lg p-3 text-center space-y-1.5 relative shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">STAGE 02 // STORAGE</span>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <Layers className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">Paged Latent HBM</h5>
                <p className="text-[10px] text-cyan-400/90 leading-tight">576 Bytes/tok &bull; Zero Head Redundancy</p>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex flex-col items-center justify-center text-emerald-400 space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Absorb W_U</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-[8px] font-mono text-neutral-400">0ms Decompress</span>
              </div>

              {/* Stage 3 */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 03 // DECODE</span>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-mono text-xs font-semibold text-white">FlashInfer MLA</h5>
                <p className="text-[10px] text-neutral-400 leading-tight">(q^T W_UK) &bull; c^KV Latent Dot-Product</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>VLLM_MLA_FLASHINFER_CONTROLLER.log</span>
                <span className="text-cyan-400">TOPOLOGY: DEEPSEEK-V3/R1 671B MOE &bull; TP=8</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.00ms]</span> INGRESS_CONTEXT: Active sequence reaches 131,072 tokens (deep reasoning chain-of-thought)
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.18ms]</span> LATENT_CACHE_ALLOC: Allocated 2.95 GB VRAM for 128k latent tokens (vs 41.9 GB in standard GQA)
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[1.12ms]</span> MATRIX_ABSORPTION: Up-projection matrices W_UK &amp; W_UV folded into Query projection &bull; 0.00ms memory decompression
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[19.18ms]</span> STEP_DISPATCH_COMPLETE: 32 concurrent 128k reasoning streams decoded &bull; 0 OOM evictions &bull; P99 ITL: 20.8ms
                </p>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">KV Cache Footprint</span>
                <span className="text-sm font-mono font-bold text-emerald-400">93.3% Saved (576B/tok)</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">128k Concurrent Density</span>
                <span className="text-sm font-mono font-bold text-cyan-400">16x Larger Batches</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">HBM Memory Bandwidth</span>
                <span className="text-sm font-mono font-bold text-emerald-400">14.2x Latent Scan Speed</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 12. MULTI-TOKEN PREDICTION (MTP) SPECULATIVE PIPELINE ── */}
        {activeType === "mtp-speculative-pipeline" && (
          <div className="space-y-6">
            {/* Top Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#161922] border border-amber-500/20 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    STANDALONE DRAFT MODEL (EAGLE-2 / 7B)
                  </span>
                  <span className="text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded text-[10px]">DRIFT RISK</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Auxiliary VRAM Overhead:</span>
                    <span className="text-amber-300 font-semibold">8–14 GB (Weights + KV Cache)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Reasoning Acceptance Rate:</span>
                    <span className="text-amber-400 font-bold">58%–64% (Frequent Rollbacks)</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1 text-[10px]">
                    <span className="text-neutral-400">Inter-Process Overhead:</span>
                    <span className="text-amber-400 font-bold">IPC / PCIe Latency Bottleneck</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161922]/90 border border-emerald-500/40 rounded-lg p-3 space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    INTEGRATED MTP SPECULATIVE ENGINE
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[10px] font-bold">ZERO DRIFT &bull; 2.4x</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Auxiliary VRAM Overhead:</span>
                    <span className="text-emerald-400 font-semibold">&lt; 1.4% (Shared Unembedding Head)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Reasoning Acceptance Rate:</span>
                    <span className="text-emerald-400 font-bold">86.4% on Code &amp; CoT Traces</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1 text-[10px]">
                    <span className="text-neutral-400">Single-Pass Verification:</span>
                    <span className="text-emerald-400 font-bold">10.2ms Effective ITL &bull; 82+ Tok/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Stage Architecture Pipeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-stretch">
              {/* Stage 1 */}
              <div className="bg-[#161922] border border-white/10 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">STAGE 01 // TRUNK</span>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto my-1.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">Main Model Forward</h5>
                </div>
                <p className="text-[10px] text-neutral-400 leading-tight">Computes h_t &bull; Emits Target Token t_n</p>
              </div>

              {/* Stage 2 */}
              <div className="bg-[#161922] border border-cyan-500/30 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block">STAGE 02 // MTP-1</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto my-1.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">Draft Module 1</h5>
                </div>
                <p className="text-[10px] text-cyan-400/90 leading-tight">Concat [h_t; Emb(t_n)] &rarr; Drafts t_{'{n+1}'}</p>
              </div>

              {/* Stage 3 */}
              <div className="bg-[#161922] border border-cyan-500/30 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block">STAGE 03 // MTP-2</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto my-1.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">Draft Module 2</h5>
                </div>
                <p className="text-[10px] text-cyan-400/90 leading-tight">Concat [h_t^(1); Emb(t_{'{n+1}'})] &rarr; Drafts t_{'{n+2}'}</p>
              </div>

              {/* Stage 4 */}
              <div className="bg-[#161922] border-2 border-emerald-500/50 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">STAGE 04 // VERIFY</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto my-1.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">FlashInfer Tree Kernel</h5>
                </div>
                <p className="text-[10px] text-emerald-400/90 leading-tight">1 Single GEMM &bull; Emits 3 Tokens in 1 Step</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>VLLM_MTP_SPECULATIVE_CONTROLLER.log</span>
                <span className="text-cyan-400">TOPOLOGY: DEEPSEEK-V3 671B &bull; D=2 MTP HEADS &bull; TP=8</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.00ms]</span> INGRESS_REASONING_STEP: Active token index n=18,432 (Chain-of-Thought mathematical proof)
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[1.12ms]</span> MTP_DRAFT_EXPANSION: Sequential modules 1 &amp; 2 generate speculative tokens [t_{'{n+1}'}=&quot;\\\\sum_&quot;, t_{'{n+2}'}=&quot;{'{k=1}'}&quot;]
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[9.84ms]</span> FLASHINFER_TREE_ATTENTION: Executed 1 fused parallel target verification forward pass
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[10.22ms]</span> SPECULATIVE_STEP_COMMIT: Accepted 3 tokens (100% path match) &bull; Effective ITL: 3.41ms/token &bull; Velocity: 82.4 tok/s
                </p>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Decoding Acceleration</span>
                <span className="text-sm font-mono font-bold text-emerald-400">2.41x Effective Velocity</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Reasoning Acceptance Rate</span>
                <span className="text-sm font-mono font-bold text-cyan-400">86.4% on Code &amp; CoT</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Auxiliary VRAM Overhead</span>
                <span className="text-sm font-mono font-bold text-emerald-400">&lt; 1.4% (Zero Ext. Draft)</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 13. DUALPIPE & OVERLAPPED ALL-TO-ALL PIPELINE ── */}
        {activeType === "dualpipe-zero-bubble" && (
          <div className="space-y-6">
            {/* Top Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#161922] border border-amber-500/20 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    STANDARD 1F1B PIPELINE (EP=32 / PP=8)
                  </span>
                  <span className="text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded text-[10px]">31.4% BUBBLE</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pipeline Idle Ratio:</span>
                    <span className="text-amber-300 font-semibold">(PP - 1) / N &approx; 31.4% Stalled SMs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">All-to-All Dispatch:</span>
                    <span className="text-amber-400 font-bold">Synchronous Wait (4.7ms Blocked)</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1 text-[10px]">
                    <span className="text-neutral-400">Cluster MFU Utilization:</span>
                    <span className="text-amber-400 font-bold">38.2% (Severe FLOP Underutilization)</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#161922]/90 border border-emerald-500/40 rounded-lg p-3 space-y-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    DUALPIPE BIDIRECTIONAL OVERLAP
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[10px] font-bold">ZERO BUBBLE &bull; 66.4% MFU</span>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pipeline Idle Ratio:</span>
                    <span className="text-emerald-400 font-semibold">&lt; 0.8% Bubble (~Zero Bubble)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">All-to-All Dispatch:</span>
                    <span className="text-emerald-400 font-bold">100% Concealed in Attention GEMMs</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-1 text-[10px]">
                    <span className="text-neutral-400">Effective Throughput:</span>
                    <span className="text-emerald-400 font-bold">+73.8% Tok/s across 16x H100 Nodes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizer Flow: 4 Interleaved Execution Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Stage 1 */}
              <div className="bg-[#161922] border border-cyan-500/30 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block">STREAM 01 // DENSE COMPUTE</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto my-1.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">MLA Attention GEMM</h5>
                </div>
                <p className="text-[10px] text-cyan-400/90 leading-tight">SM0–SM111 active &bull; Forward micro-batch F_0</p>
              </div>

              {/* Stage 2 */}
              <div className="bg-[#161922] border border-emerald-500/30 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">STREAM 02 // ASYNC COMM</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto my-1.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">Warp IBGDA Dispatch</h5>
                </div>
                <p className="text-[10px] text-emerald-400/90 leading-tight">SM112–SM131 &bull; MoE All2All overlap for F_1</p>
              </div>

              {/* Stage 3 */}
              <div className="bg-[#161922] border border-cyan-500/30 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase block">STREAM 03 // MOE EXPERTS</span>
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto my-1.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">SwiGLU MLP GEMMs</h5>
                </div>
                <p className="text-[10px] text-cyan-400/90 leading-tight">8 routed experts &bull; FP8 block-scaled execution</p>
              </div>

              {/* Stage 4 */}
              <div className="bg-[#161922] border-2 border-emerald-500/50 rounded-lg p-3 text-center space-y-1.5 flex flex-col justify-between shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">STAGE 04 // ZERO BUBBLE</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto my-1.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h5 className="font-mono text-xs font-semibold text-white">IBGDA MoE Combine</h5>
                </div>
                <p className="text-[10px] text-emerald-400/90 leading-tight">Reverse All2All stream &bull; 0.03ms swap latency</p>
              </div>
            </div>

            {/* Proof Log */}
            <div className="bg-[#0B0D10] border border-white/10 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] border-b border-white/5 pb-2">
                <span>DUALPIPE_COMM_COMP_SCHEDULER.log</span>
                <span className="text-cyan-400">CLUSTER: 16x H100 SXM5 &bull; EP=64 &bull; PP=8 &bull; DUAL-DIRECTION</span>
              </div>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.00ms]</span> DUALPIPE_MICROBATCH_INGRESS: Dispatched micro-batch F_0 (MLA Attention GEMM) to SM0–SM111
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[0.08ms]</span> IBGDA_ASYNC_ALLTOALL_INIT: Launched MoE dispatch collective for F_1 on reserved SM112–SM131 (InfiniBand RDMA)
                </p>
                <p className="text-neutral-400">
                  <span className="text-cyan-400">[4.82ms]</span> DUALPIPE_FUSED_OVERLAP: MoE dispatch (F_1, 4.70ms) perfectly concealed within Attention GEMM (F_0, 4.82ms)
                </p>
                <p className="text-emerald-400 font-semibold">
                  <span className="text-emerald-400">[4.85ms]</span> ZERO_BUBBLE_TRANSITION: Swapped micro-batch execution without pipeline stall &bull; Effective bubble: 0.03ms (&lt;0.6%) &bull; MFU: 66.4%
                </p>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Pipeline Bubble</span>
                <span className="text-sm font-mono font-bold text-emerald-400">&lt; 0.8% (~Zero Bubble)</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">All-to-All Hidden Overhead</span>
                <span className="text-sm font-mono font-bold text-cyan-400">100% Concurrently Hidden</span>
              </div>
              <div className="bg-[#14171D] p-2.5 rounded border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Cluster MFU Gain</span>
                <span className="text-sm font-mono font-bold text-emerald-400">66.4% (+73% Tok/s)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CAPTION FOOTER ── */}
      {caption && (
        <div className="px-5 py-3 bg-[#14171D] border-t border-white/10 text-xs font-mono text-neutral-400 flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-neutral-500 text-[10px] uppercase">VISTAR ARCHITECTURE SPEC</span>
        </div>
      )}
    </div>
  );
}
