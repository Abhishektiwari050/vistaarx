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
  | "pd-disaggregation";

interface TechnicalDiagramProps {
  type?: DiagramType;
  slug?: string;
  caption?: string;
  className?: string;
  compact?: boolean;
}

export function getDiagramTypeForSlug(slug: string): DiagramType {
  switch (slug) {
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
