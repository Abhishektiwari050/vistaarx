"use client";

import React from "react";
import { SphereRoom, type Project } from "@/components/ui/sphere-room";

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
    metric: "2.4x Speedup // +62% Search CTR",
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
];

export default function WorkPage() {
  return (
    <div className="w-full min-h-screen">
      <SphereRoom projects={projects} />
    </div>
  );
}
