import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Cpu,
  Monitor,
  Sparkles,
} from "lucide-react";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Interactive 3D WebGL Showrooms & Aviation GIS — VISTAR",
  description:
    "High-craft 3D WebGL platforms for architecture, interior showrooms, and aviation GIS vector mapping engineered by VISTAR. 60 FPS in-browser rendering with zero app downloads.",
  alternates: {
    canonical: `${BASE_URL}/solutions/3d-and-gis`,
  },
  openGraph: {
    title: "Interactive 3D WebGL Showrooms & Aviation GIS — VISTAR",
    description:
      "Interactive 3D spatial experiences and geospatial vector tools engineered with Three.js, WebGL, and MapLibre.",
    url: `${BASE_URL}/solutions/3d-and-gis`,
    images: DEFAULT_OG_IMAGES,
  },
};

export default function ThreeDAndGisPage() {
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
            <span className="text-[#E1341E] font-semibold">Specialist 3D &amp; GIS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            <span>SPECIALIST DIGITAL CRAFT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121316] leading-[1.08]">
            Interactive 3D spatial platforms and geospatial tools.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal max-w-3xl">
            For architecture firms, luxury real estate developers, and specialized geospatial operations, static images fall short. We engineer hardware-accelerated 3D WebGL showcases and aviation GIS platforms that run smoothly in the browser with zero downloads.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="https://3axisarc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#121316] hover:bg-[#282A2E] text-white text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Launch 3axis Arc 3D Showroom</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="https://ai-vayu.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white border border-black/10 hover:bg-neutral-50 text-[#121316] text-xs font-semibold transition-all shadow-xs gap-2"
            >
              <span>Inspect Project VAYU GIS</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Real Projects Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              Live Production Showroom
            </span>
            <h3 className="text-2xl font-bold text-[#121316]">
              3axis Arc: Architectural 3D Showroom
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Engineered for an architecture firm in Lucknow to present interior spatial layouts to commercial clients. Allows buyers to dynamically rotate perspectives, examine material finishes, and visualize scale in-browser.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2 border-t border-black/6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>60 FPS Three.js rendering optimized for iPad &amp; mobile</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Custom lighting shaders and high-density material maps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Sub-100ms global TTFB deployed via Vercel Edge</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://3axisarc.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#E1341E] hover:underline inline-flex items-center gap-1"
              >
                <span>Visit 3axisarc.vercel.app &rarr;</span>
              </a>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
            <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
              Open-Source Aviation GIS
            </span>
            <h3 className="text-2xl font-bold text-[#121316]">
              Project VAYU: NOTAM &amp; Weather Briefing
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              An aviation pre-flight tool that parses raw NOTAM telegraphic cables, calculates geospatial flight hazard corridors, and renders dynamic threat boundaries over high-definition vector map layers.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 pt-2 border-t border-black/6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>MapLibre GL vector tiles and dynamic GeoJSON overlays</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>FastAPI Python backend for automated NOTAM text parsing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Open-source repository available on GitHub</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://ai-vayu.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#E1341E] hover:underline inline-flex items-center gap-1"
              >
                <span>Visit ai-vayu.vercel.app &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Specialist Consultation CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono text-purple-400 font-semibold">
              SPECIALIST SCOPING
            </div>
            <h4 className="text-2xl font-bold text-white">
              Have a 3D or geospatial project?
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We evaluate 3D asset formats (GLTF, FBX), texture budgets, frame rate requirements, and browser compatibility to provide an honest technical assessment.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white hover:bg-neutral-100 text-[#121316] text-xs font-semibold transition-all shrink-0 gap-2 shadow-xs"
          >
            <span>Consult on 3D Scope</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
