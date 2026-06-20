"use client";

import React from "react";
import { SphereRoom, type Project } from "@/components/ui/sphere-room";

// ─────────────────────────────────────────────────────────────────────────────
// Case Studies — 6 high-impact projects across different verticals
// ─────────────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "01",
    title: "Apex Algorithmic Ledger",
    client: "FinTech Trade Labs",
    metric: "+38% Signups // 140% Session Lift",
    desc: "A high-performance algorithmic trading interface for digital asset dealers. We built a custom WebGL shader pipeline displaying sub-millisecond real-time ledger metrics. This high-fidelity interface eliminated transaction lag, increased average user session times by 140%, and generated a 38% boost in signup conversions.",
    tags: ["WebGL", "Framer Motion", "Real-Time Telemetry", "Next.js"],
    status: "NDA Protected // Active",
  },
  {
    id: "02",
    title: "Router Scaling Compiler",
    client: "Enterprise Media Cloud",
    metric: "2.4× Speedup // +62% Search CTR",
    desc: "Complete architectural overhaul and edge routing deployment for a global media distribution network. By implementing Next.js native server-side rendering pipelines and eliminating code bottlenecks, we boosted load speeds by 240% and improved search engine visibility click-throughs by 62% under heavy traffic load.",
    tags: ["Next.js SSR", "Edge Functions", "API Routing", "PostgreSQL"],
    status: "NDA Protected // Deployed",
  },
  {
    id: "03",
    title: "Spatial Bio-Modeling Engine",
    client: "Helix Research Corp",
    metric: "1.2M Sessions // Zero Latency",
    desc: "Immersive spatial computed bio-modeling environment built directly inside the web browser. We designed and coded custom GLSL fluid simulation matrices, handling over 1.2M daily active user sessions without a single drop in render frame rate, bringing absolute clarity to heavy genetic datasets.",
    tags: ["Three.js", "GLSL Shaders", "Bio-Computing UI", "React"],
    status: "NDA Protected // Active",
  },
  {
    id: "04",
    title: "Phantom Commerce Engine",
    client: "Luminary DTC Brands",
    metric: "+220% AOV // 4.2× Conversion Rate",
    desc: "A revolutionary direct-to-consumer e-commerce platform combining AR try-on, AI-powered product recommendation, and a WebGL-rendered virtual showroom. The immersive product exploration experience increased average order values by 220% and quadrupled conversion rates compared to the client's previous Shopify storefront.",
    tags: ["AR.js", "Three.js", "Shopify Headless", "OpenAI", "Next.js"],
    status: "NDA Protected // Active",
  },
  {
    id: "05",
    title: "Neural Brand OS",
    client: "Axiom Ventures (Series A)",
    metric: "9 Brands // 72Hr Delivery",
    desc: "An AI-powered brand generation operating system that produces complete brand identities — logos, color systems, typography, motion design, and pitch decks — in under 72 hours. Built for a Series A-backed venture studio, the system generated 9 launch-ready brand identities across three portfolio companies in the first week of deployment.",
    tags: ["Gemini API", "Stable Diffusion", "Next.js", "Supabase", "Framer"],
    status: "NDA Protected // Active",
  },
  {
    id: "06",
    title: "Quantum Cryptography Matrix",
    client: "Defense Tech Coalition",
    metric: "256-Bit // Zero Vulnerability",
    desc: "A browser-based real-time cryptographic visualizer that compiles Rust-based post-quantum algorithms into WebAssembly, achieving ultra-high performance simulations of security matrices under simulated brute force attacks.",
    tags: ["WebAssembly", "Rust", "React", "Next.js", "Edge Functions"],
    status: "NDA Protected // Active",
  },
];

export default function WorkPage() {
  return (
    <div className="w-full min-h-screen">
      <SphereRoom projects={projects} />
    </div>
  );
}
