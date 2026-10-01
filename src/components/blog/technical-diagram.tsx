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
  | "telemetry-gis";

interface TechnicalDiagramProps {
  type?: DiagramType;
  slug?: string;
  caption?: string;
  className?: string;
  compact?: boolean;
}

export function getDiagramTypeForSlug(slug: string): DiagramType {
  switch (slug) {
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
