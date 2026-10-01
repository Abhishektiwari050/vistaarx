"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

export type CartoonScene =
  | "master-daily"
  | "agency-bloat"
  | "stochastic-math"
  | "sovereign-cloud"
  | "bento-grid";

export function getCartoonSceneForSlug(slug: string): CartoonScene {
  switch (slug) {
    case "why-agencies-charge-200k-for-chatgpt-wrappers":
      return "agency-bloat";
    case "deterministic-multi-agent-graphs-vs-probabilistic-drift":
      return "stochastic-math";
    case "sovereign-private-vpc-ai-deployment-guide":
      return "sovereign-cloud";
    case "sub-50ms-webgl-spatial-interfaces-nextjs-16":
    case "sub-45ms-real-time-telemetry-gis-architecture":
      return "bento-grid";
    default:
      return "master-daily";
  }
}

export function getCartoonCaptionForSlug(slug: string): { caption: string; subcaption: string } {
  switch (slug) {
    case "why-agencies-charge-200k-for-chatgpt-wrappers":
      return {
        caption: "They spent six months and two hundred thousand dollars to build a chatbot that politely apologizes for not knowing the answer.",
        subcaption: "YOU SAID IT • The $200k Prompt Wrapper Phenomenon",
      };
    case "deterministic-multi-agent-graphs-vs-probabilistic-drift":
      return {
        caption: "The machine is in a creative mood today, sir. It says your balance is either forty rupees or four billion dollars, depending on the temperature setting.",
        subcaption: "YOU SAID IT • Stochastic Prompts vs. Mathematical Schema Gates",
      };
    case "sovereign-private-vpc-ai-deployment-guide":
      return {
        caption: "No need to worry about industrial espionage. The terms of service clearly state they only absorb our trade secrets to improve user experience!",
        subcaption: "YOU SAID IT • The Perils of Shared Multi-Tenant AI Proxies",
      };
    case "sub-50ms-webgl-spatial-interfaces-nextjs-16":
    case "sub-45ms-real-time-telemetry-gis-architecture":
      return {
        caption: "Every website in the world has five round corners and a purple blur. The designer said originality is not permitted under ISO guidelines.",
        subcaption: "YOU SAID IT • Escaping the Monotonous Corporate Bento Grid",
      };
    default:
      return {
        caption: "He assures us the AI architecture is 100% autonomous, Sharma-ji... it only requires twenty-four consultants and three daily status calls to click 'Regenerate'!",
        subcaption: "YOU SAID IT • Editorial Cartoon by Laxman Tribute / Vistar",
      };
  }
}

interface RKLaxmanCartoonProps {
  scene?: CartoonScene;
  slug?: string;
  caption?: string;
  subcaption?: string;
  className?: string;
  interactive?: boolean;
}

export function RKLaxmanCartoon({
  scene,
  slug,
  caption,
  subcaption,
  className = "",
  interactive = true,
}: RKLaxmanCartoonProps) {
  const activeScene: CartoonScene = scene || (slug ? getCartoonSceneForSlug(slug) : "master-daily");
  const defaultCaptions = slug ? getCartoonCaptionForSlug(slug) : null;
  const activeCaption = caption || defaultCaptions?.caption;
  const activeSubcaption = subcaption || defaultCaptions?.subcaption;

  const [isDrawing, setIsDrawing] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const replayAnimation = () => {
    setIsDrawing(false);
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
      setIsDrawing(true);
    }, 50);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDrawing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [animationKey]);

  return (
    <div
      className={`relative bg-[#FBF9F2] text-[#141413] border-4 border-double border-[#1A1A1A] p-4 sm:p-6 shadow-[4px_4px_0px_#1A1A1A] select-none font-serif ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(#d3cbbd 0.75px, transparent 0.75px), radial-gradient(#d3cbbd 0.75px, #FBF9F2 0.75px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      {/* ── Laxman Header Banner: YOU SAID IT ── */}
      <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-serif tracking-widest font-black text-xs sm:text-sm uppercase text-[#1A1A1A] border border-[#1A1A1A] px-2 py-0.5 bg-[#F3EFE0]">
            YOU SAID IT
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-[#555] uppercase tracking-wider hidden sm:inline">
            • VISTAR EDITORIAL CARTOON
          </span>
        </div>

        {interactive && (
          <button
            onClick={replayAnimation}
            className="flex items-center gap-1 text-[11px] font-mono text-[#444] hover:text-black border border-[#1A1A1A] px-2 py-0.5 bg-white hover:bg-[#F3EFE0] transition-colors cursor-pointer shadow-[1px_1px_0px_#1A1A1A]"
            title="Replay hand-drawn ink animation"
          >
            <RotateCcw className="w-3 h-3 text-[#FF3823]" />
            <span>Re-ink</span>
          </button>
        )}
      </div>

      {/* ── SVG Ink Drawing Canvas ── */}
      <div className="relative w-full overflow-hidden bg-white/70 border border-[#1A1A1A] p-2 rounded-xs">
        <svg
          key={animationKey}
          viewBox="0 0 700 400"
          className={`w-full h-auto max-h-[380px] object-contain transition-all duration-300 ${
            isDrawing ? "animate-pulse" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Laxman Checked Jacket Pattern */}
            <pattern
              id="laxman-check"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="8" fill="#F8F6F0" />
              <path
                d="M 0 0 L 8 0 M 0 0 L 0 8"
                stroke="#1A1A1A"
                strokeWidth="1.2"
              />
              <rect x="0" y="0" width="4" height="4" fill="#1A1A1A" />
              <rect x="4" y="4" width="4" height="4" fill="#1A1A1A" />
            </pattern>

            {/* Cross-hatching shading pattern */}
            <pattern
              id="cross-hatch"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2"
                stroke="#2B2B2B"
                strokeWidth="0.8"
              />
              <path
                d="M-1,5 l2,2 M0,0 l6,6 M5,-1 l2,2"
                stroke="#2B2B2B"
                strokeWidth="0.8"
              />
            </pattern>

            {/* Light diagonal hatch for floor shadows */}
            <pattern
              id="floor-hatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0,8 l8,-8" stroke="#777" strokeWidth="0.7" />
            </pattern>

            {/* Ink drawing stroke animation */}
            <style>
              {`
                .ink-line {
                  stroke: #141413;
                  fill: none;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                }
                .ink-draw {
                  stroke-dasharray: 1200;
                  stroke-dashoffset: 1200;
                  animation: drawInk 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
                @keyframes drawInk {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                .speech-bubble {
                  filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.8));
                }
              `}
            </style>
          </defs>

          {/* ── Floor line with shadow hatching ── */}
          <line
            x1="20"
            y1="340"
            x2="680"
            y2="340"
            stroke="#1A1A1A"
            strokeWidth="2.5"
            className="ink-draw"
          />
          <rect x="30" y="340" width="640" height="24" fill="url(#floor-hatch)" />

          {/* ══════════════════════════════════════════════════════════════════
              COMMON MAN CHARACTER (Present in all scenes, on the left)
              Iconic features: Checked coat, bald pate, white hair tufts,
              glasses on hooked nose, bristly mustache, dhoti, observing.
             ══════════════════════════════════════════════════════════════════ */}
          <g id="common-man" transform="translate(45, 60)">
            {/* Shadow under feet */}
            <ellipse cx="60" cy="280" rx="35" ry="6" fill="#1A1A1A" opacity="0.3" />

            {/* Shoes / Slippers */}
            <path
              d="M 40 274 Q 55 272 65 276 Q 70 282 45 282 Z"
              fill="#1A1A1A"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
            <path
              d="M 68 274 Q 82 272 92 276 Q 97 282 72 282 Z"
              fill="#1A1A1A"
              stroke="#1A1A1A"
              strokeWidth="2"
            />

            {/* Dhoti / Legs */}
            <path
              d="M 42 210 L 46 274 L 58 274 L 56 220 L 70 274 L 84 274 L 78 210 Z"
              fill="#FFFFFF"
              stroke="#1A1A1A"
              strokeWidth="2"
              className="ink-draw"
            />
            {/* Dhoti pleats */}
            <path d="M 50 215 L 53 268 M 62 218 L 65 270 M 74 216 L 76 266" stroke="#1A1A1A" strokeWidth="1.2" />

            {/* The Checked Coat */}
            <path
              d="M 32 105 Q 15 130 20 180 L 30 215 Q 60 225 90 215 L 100 180 Q 105 130 88 105 Q 60 98 32 105 Z"
              fill="url(#laxman-check)"
              stroke="#1A1A1A"
              strokeWidth="2.5"
              className="ink-draw"
            />

            {/* Coat collar & lapels */}
            <path
              d="M 42 104 L 56 145 L 60 215 M 78 104 L 64 145"
              stroke="#1A1A1A"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="62" cy="165" r="2.5" fill="#1A1A1A" />
            <circle cx="62" cy="185" r="2.5" fill="#1A1A1A" />

            {/* Left Arm folded behind back */}
            <path
              d="M 22 135 Q 12 170 28 200"
              stroke="#1A1A1A"
              strokeWidth="2.5"
              fill="none"
              className="ink-draw"
            />

            {/* Umbrella hooked under arm */}
            <path
              d="M 12 160 L 26 250"
              stroke="#1A1A1A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 12 160 Q 6 150 14 145 Q 22 148 20 156"
              stroke="#1A1A1A"
              strokeWidth="3"
              fill="none"
            />

            {/* Neck */}
            <path d="M 52 92 L 52 105 L 68 105 L 68 92" stroke="#1A1A1A" strokeWidth="2" fill="#FBF9F2" />

            {/* Head - Oval shaped */}
            <path
              d="M 44 65 Q 40 40 60 38 Q 80 40 76 65 Q 74 92 60 92 Q 46 92 44 65 Z"
              fill="#FBF9F2"
              stroke="#1A1A1A"
              strokeWidth="2.5"
              className="ink-draw"
            />

            {/* Distinctive Laxman Bald Head with white hair tufts above ears */}
            <path
              d="M 38 52 Q 32 45 42 42 Q 34 38 44 36"
              stroke="#1A1A1A"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 82 52 Q 88 45 78 42 Q 86 38 76 36"
              stroke="#1A1A1A"
              strokeWidth="2"
              fill="none"
            />

            {/* Big Prominent Hooked Nose */}
            <path
              d="M 58 52 Q 74 56 68 70 Q 62 74 58 72"
              stroke="#1A1A1A"
              strokeWidth="2.5"
              fill="#FBF9F2"
              className="ink-draw"
            />

            {/* Round Spectacles perched on nose */}
            <circle cx="53" cy="54" r="8" stroke="#1A1A1A" strokeWidth="2" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="68" cy="54" r="8" stroke="#1A1A1A" strokeWidth="2" fill="#FFFFFF" fillOpacity="0.8" />
            <line x1="61" y1="54" x2="60" y2="54" stroke="#1A1A1A" strokeWidth="2" />
            {/* Eyes behind lenses */}
            <circle cx="54" cy="54" r="1.8" fill="#1A1A1A" />
            <circle cx="69" cy="54" r="1.8" fill="#1A1A1A" />
            {/* Spectacle arms to ears */}
            <line x1="45" y1="53" x2="40" y2="55" stroke="#1A1A1A" strokeWidth="1.8" />

            {/* Bushy Bristle Mustache */}
            <path
              d="M 52 74 Q 60 70 68 74 Q 72 80 60 82 Q 48 80 52 74 Z"
              fill="#1A1A1A"
              stroke="#1A1A1A"
              strokeWidth="1.5"
            />
            {/* Tiny puzzled chin below */}
            <path d="M 56 86 Q 60 88 64 86" stroke="#1A1A1A" strokeWidth="1.8" fill="none" />
          </g>

          {/* ══════════════════════════════════════════════════════════════════
              SCENE VARIATIONS: SATIRICAL TECH DRAMAS
             ══════════════════════════════════════════════════════════════════ */}

          {/* ── SCENE 1: MASTER DAILY / AGENCY BLOAT ── */}
          {(activeScene === "master-daily" || activeScene === "agency-bloat") && (
            <g id="scene-agency-bloat">
              {/* Slick Corporate Consultant / Babu with Pointer */}
              <g transform="translate(240, 70)">
                {/* Consultant Body */}
                <ellipse cx="70" cy="270" rx="30" ry="5" fill="#1A1A1A" opacity="0.3" />
                {/* Trousers */}
                <path d="M 55 190 L 52 265 L 66 265 L 70 205 L 74 265 L 88 265 L 85 190 Z" fill="#2B303A" stroke="#1A1A1A" strokeWidth="2" />
                {/* Shiny Corporate Shoes */}
                <ellipse cx="58" cy="268" rx="10" ry="4" fill="#1A1A1A" />
                <ellipse cx="82" cy="268" rx="10" ry="4" fill="#1A1A1A" />

                {/* Overdressed 3-Piece Suit & Giant Tie */}
                <path d="M 45 95 L 35 190 L 105 190 L 95 95 Q 70 85 45 95 Z" fill="#EAEAEA" stroke="#1A1A1A" strokeWidth="2.2" />
                <path d="M 45 95 L 68 150 L 55 190 M 95 95 L 72 150 L 85 190" stroke="#1A1A1A" strokeWidth="2" />
                {/* 3 Neckties in absurd layers */}
                <path d="M 68 105 L 74 165 L 70 175 L 66 165 Z" fill="#FF3823" stroke="#1A1A1A" strokeWidth="1.5" />
                <path d="M 67 115 L 72 150 L 70 156 L 68 150 Z" fill="#1A1A1A" />

                {/* Consultant Head - Pompous chin up, slicked back hair, smirk */}
                <path d="M 58 55 Q 60 30 80 32 Q 95 35 92 60 Q 90 85 70 82 Z" fill="#FDFBF7" stroke="#1A1A1A" strokeWidth="2.2" />
                <path d="M 62 38 Q 78 20 95 32 Q 92 46 86 48 Z" fill="#1A1A1A" />
                {/* Smug face */}
                <line x1="82" y1="52" x2="88" y2="52" stroke="#1A1A1A" strokeWidth="2" />
                <path d="M 88 56 Q 96 60 90 66" stroke="#1A1A1A" strokeWidth="2" fill="none" />
                <path d="M 80 72 Q 88 74 92 68" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />

                {/* Arm holding a wooden presentation pointer */}
                <path d="M 95 110 Q 120 100 135 75" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                <line x1="135" y1="75" x2="230" y2="25" stroke="#7A3E1D" strokeWidth="3.5" strokeLinecap="round" />

                {/* Briefcase bursting with $ bills and "INVOICES" */}
                <g transform="translate(-40, 190)">
                  <rect x="0" y="0" width="46" height="34" rx="3" fill="#8B4513" stroke="#1A1A1A" strokeWidth="2" />
                  <path d="M 16 0 L 16 -8 Q 23 -12 30 -8 L 30 0" stroke="#1A1A1A" strokeWidth="2" fill="none" />
                  <line x1="0" y1="12" x2="46" y2="12" stroke="#FFD700" strokeWidth="2" />
                  {/* Paper slips bursting */}
                  <rect x="8" y="-12" width="14" height="12" fill="#FFF" stroke="#1A1A1A" strokeWidth="1" transform="rotate(-15)" />
                  <rect x="22" y="-14" width="16" height="12" fill="#FFF" stroke="#1A1A1A" strokeWidth="1" transform="rotate(10)" />
                  <text x="6" y="24" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#FFF">INVOICES</text>
                </g>
              </g>

              {/* The Absurd Agency Blackboard / Presentation Screen */}
              <g transform="translate(420, 45)">
                {/* Stand */}
                <line x1="30" y1="200" x2="10" y2="295" stroke="#1A1A1A" strokeWidth="3" />
                <line x1="210" y1="200" x2="230" y2="295" stroke="#1A1A1A" strokeWidth="3" />
                <line x1="120" y1="200" x2="120" y2="295" stroke="#1A1A1A" strokeWidth="3" />

                {/* Board Frame */}
                <rect x="0" y="0" width="240" height="200" fill="#202A25" stroke="#1A1A1A" strokeWidth="4" rx="4" />
                <rect x="6" y="6" width="228" height="188" fill="#1C3026" />

                {/* Chalk Text & Diagrams */}
                <text x="18" y="32" fill="#FFD066" fontSize="11" fontFamily="serif" fontWeight="bold" letterSpacing="1">
                  AGENCY ENTERPRISE AI SCOPE
                </text>
                <line x1="18" y1="38" x2="220" y2="38" stroke="#558B6E" strokeWidth="1.5" strokeDasharray="3 3" />

                <text x="18" y="62" fill="#FFFFFF" fontSize="10" fontFamily="monospace">
                  • 12 Discovery Workshops: $80,000
                </text>
                <text x="18" y="82" fill="#FFFFFF" fontSize="10" fontFamily="monospace">
                  • 94-Page AI PPT Deck:   $60,000
                </text>
                <text x="18" y="102" fill="#FFFFFF" fontSize="10" fontFamily="monospace">
                  • 1 ChatGPT Prompt API:  $60,000
                </text>
                <line x1="18" y1="112" x2="210" y2="112" stroke="#FFF" strokeWidth="1" />
                <text x="18" y="132" fill="#FF5555" fontSize="13" fontFamily="monospace" fontWeight="bold">
                  TOTAL: $200,000.00
                </text>
                <text x="18" y="152" fill="#AAA" fontSize="9" fontFamily="monospace">
                  + $15,000/mo Retainer to avoid crashes
                </text>
                <text x="18" y="172" fill="#88D49E" fontSize="9" fontFamily="monospace">
                  * Codebase ownership: 0% (Proprietary)
                </text>
              </g>

              {/* The Lucknow Engineer outside in chappals with Chai & Terminal */}
              <g transform="translate(160, 240)">
                {/* Chai Glass Tumbler */}
                <rect x="0" y="30" width="14" height="20" rx="2" fill="#D97706" stroke="#1A1A1A" strokeWidth="1.5" />
                <line x1="2" y1="36" x2="12" y2="36" stroke="#1A1A1A" strokeWidth="1" />
                <line x1="3" y1="42" x2="11" y2="42" stroke="#1A1A1A" strokeWidth="1" />
                {/* Chai Steam */}
                <path d="M 5 28 Q 7 22 5 16 Q 3 10 6 4" stroke="#888" strokeWidth="1" fill="none" />
                <path d="M 10 28 Q 12 22 10 16 Q 8 10 11 4" stroke="#888" strokeWidth="1" fill="none" />
                <text x="-4" y="62" fontSize="8" fontFamily="sans-serif" fontWeight="bold" fill="#1A1A1A">Chai: ₹10</text>
              </g>

              {/* Speech Bubble from Consultant */}
              <g transform="translate(190, 15)" className="speech-bubble">
                <path
                  d="M 10 0 L 220 0 Q 230 0 230 10 L 230 45 Q 230 55 220 55 L 70 55 L 50 72 L 55 55 L 10 55 Q 0 55 0 45 L 0 10 Q 0 0 10 0 Z"
                  fill="#FFFFFF"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <text x="12" y="22" fontSize="10.5" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">
                  &ldquo;For two hundred thousand dollars,&rdquo;
                </text>
                <text x="12" y="38" fontSize="10" fontFamily="serif" fill="#1A1A1A">
                  &ldquo;our prompt will say &lsquo;Please&rsquo; in 8 languages!&rdquo;
                </text>
              </g>
            </g>
          )}

          {/* ── SCENE 2: STOCHASTIC PROMPTS VS DETERMINISTIC MATH ── */}
          {activeScene === "stochastic-math" && (
            <g id="scene-stochastic-math">
              {/* Absurd Robot with a Chef Hat tossing dice and tarot cards */}
              <g transform="translate(260, 60)">
                <ellipse cx="60" cy="270" rx="30" ry="5" fill="#1A1A1A" opacity="0.3" />
                {/* Metal Robot Body */}
                <rect x="30" y="100" width="60" height="90" rx="8" fill="#D1D5DB" stroke="#1A1A1A" strokeWidth="2.5" />
                {/* Robot dial & blinking gauge */}
                <circle cx="60" cy="135" r="16" fill="#1E293B" stroke="#1A1A1A" strokeWidth="1.5" />
                <line x1="60" y1="135" x2="70" y2="128" stroke="#EF4444" strokeWidth="2" />
                <rect x="40" y="165" width="40" height="12" fill="#22C55E" stroke="#1A1A1A" strokeWidth="1" />
                <text x="44" y="174" fontSize="7" fontFamily="monospace" fill="#000">CONFIDENCE: ?</text>

                {/* Chef Hat on Robot */}
                <path d="M 40 70 L 40 55 Q 40 30 60 30 Q 80 30 80 55 L 80 70 Z" fill="#FFF" stroke="#1A1A1A" strokeWidth="2" />
                {/* Robot Head */}
                <rect x="42" y="65" width="36" height="35" rx="4" fill="#9CA3AF" stroke="#1A1A1A" strokeWidth="2" />
                <circle cx="50" cy="80" r="4" fill="#3B82F6" stroke="#1A1A1A" strokeWidth="1.5" />
                <circle cx="70" cy="80" r="4" fill="#EF4444" stroke="#1A1A1A" strokeWidth="1.5" />
                <line x1="50" y1="92" x2="70" y2="92" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="2 2" />

                {/* Robot Arms juggling dice and magic 8-ball */}
                <path d="M 30 120 Q 5 100 15 70" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                <rect x="8" y="55" width="16" height="16" fill="#FFF" stroke="#1A1A1A" strokeWidth="1.5" transform="rotate(25 16 63)" />
                <circle cx="16" cy="63" r="2" fill="#000" />

                <path d="M 90 120 Q 120 100 110 70" stroke="#1A1A1A" strokeWidth="3" fill="none" />
                <circle cx="115" cy="65" r="12" fill="#1A1A1A" />
                <text x="110" y="69" fontSize="10" fontWeight="bold" fill="#FFF">8</text>

                {/* Robot Legs */}
                <rect x="42" y="190" width="12" height="75" fill="#6B7280" stroke="#1A1A1A" strokeWidth="2" />
                <rect x="66" y="190" width="12" height="75" fill="#6B7280" stroke="#1A1A1A" strokeWidth="2" />
              </g>

              {/* Bank Counter or Cash Register */}
              <g transform="translate(420, 140)">
                <rect x="0" y="60" width="220" height="140" fill="#E5E7EB" stroke="#1A1A1A" strokeWidth="3" />
                <rect x="20" y="80" width="80" height="50" fill="#1F2937" stroke="#1A1A1A" strokeWidth="2" />
                <text x="28" y="110" fill="#22C55E" fontSize="14" fontFamily="monospace">₹40 OR ₹4B?</text>
                <text x="28" y="124" fill="#9CA3AF" fontSize="8" fontFamily="monospace">PROBABILITY: 0.52</text>
                <text x="120" y="100" fontSize="11" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">STOCHASTIC</text>
                <text x="120" y="115" fontSize="11" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">CALCULATOR</text>
                <text x="120" y="130" fontSize="9" fontFamily="mono" fill="#555">(Zero Schema Gates)</text>
              </g>

              {/* Speech Bubble */}
              <g transform="translate(230, 15)" className="speech-bubble">
                <path
                  d="M 10 0 L 250 0 Q 260 0 260 10 L 260 45 Q 260 55 250 55 L 80 55 L 60 72 L 65 55 L 10 55 Q 0 55 0 45 L 0 10 Q 0 0 10 0 Z"
                  fill="#FFFFFF"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <text x="12" y="20" fontSize="10.5" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">
                  &ldquo;The model hallucinated your balance,&rdquo;
                </text>
                <text x="12" y="36" fontSize="10" fontFamily="serif" fill="#1A1A1A">
                  &ldquo;because you didn&rsquo;t say &lsquo;Think step by step&rsquo;!&rdquo;
                </text>
              </g>
            </g>
          )}

          {/* ── SCENE 3: SOVEREIGN CLOUD VS LEAKY MULTI-TENANT PROXY ── */}
          {activeScene === "sovereign-cloud" && (
            <g id="scene-sovereign-cloud">
              {/* Giant Leaky Cloud Pipe dripping files to the street */}
              <g transform="translate(230, 40)">
                {/* Cloud shape */}
                <path
                  d="M 50 100 Q 20 100 20 70 Q 20 40 50 40 Q 60 10 90 20 Q 130 5 150 35 Q 180 30 185 60 Q 210 70 200 100 Z"
                  fill="#E0F2FE"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                />
                <text x="50" y="70" fontSize="12" fontFamily="serif" fontWeight="bold" fill="#0369A1">
                  SHARED MULTI-TENANT CLOUD
                </text>
                <text x="75" y="86" fontSize="9" fontFamily="monospace" fill="#0284C7">
                  (Public Proxy API)
                </text>

                {/* Leaking Drainage Pipe */}
                <path d="M 100 100 L 100 180 L 140 180 L 140 100" fill="#94A3B8" stroke="#1A1A1A" strokeWidth="2.5" />
                <path d="M 95 180 L 145 180 L 150 200 L 90 200 Z" fill="#64748B" stroke="#1A1A1A" strokeWidth="2" />

                {/* Flying client confidential data sheets pouring out */}
                <g transform="translate(85, 205)">
                  <rect x="0" y="0" width="25" height="32" fill="#FFF" stroke="#1A1A1A" strokeWidth="1.2" transform="rotate(-15)" />
                  <text x="2" y="14" fontSize="6" fontFamily="monospace" fill="#E11D48">CLIENT</text>
                  <text x="2" y="22" fontSize="6" fontFamily="monospace" fill="#E11D48">SECRETS</text>

                  <rect x="35" y="10" width="25" height="32" fill="#FFF" stroke="#1A1A1A" strokeWidth="1.2" transform="rotate(20)" />
                  <text x="37" y="24" fontSize="6" fontFamily="monospace" fill="#E11D48">FINANCE</text>
                  <text x="37" y="32" fontSize="6" fontFamily="monospace" fill="#E11D48">DATA</text>
                </g>
              </g>

              {/* Competitor with Binoculars eagerly catching data in a basket */}
              <g transform="translate(480, 120)">
                <ellipse cx="60" cy="220" rx="30" ry="5" fill="#1A1A1A" opacity="0.3" />
                {/* Competitor trenchcoat */}
                <path d="M 40 70 L 25 180 L 95 180 L 80 70 Z" fill="#D97706" stroke="#1A1A1A" strokeWidth="2.2" />
                {/* Big basket */}
                <path d="M -15 110 L 25 110 L 20 150 L -10 150 Z" fill="#B45309" stroke="#1A1A1A" strokeWidth="2" />
                <text x="-8" y="132" fontSize="7" fontFamily="mono" fill="#FFF" fontWeight="bold">TRAINING</text>
                <text x="-8" y="142" fontSize="7" fontFamily="mono" fill="#FFF" fontWeight="bold">DATASET</text>

                {/* Spy with binoculars */}
                <circle cx="60" cy="45" r="16" fill="#FDFBF7" stroke="#1A1A1A" strokeWidth="2" />
                <rect x="42" y="38" width="18" height="12" fill="#1A1A1A" rx="2" />
                <rect x="62" y="38" width="18" height="12" fill="#1A1A1A" rx="2" />
                <line x1="58" y1="44" x2="64" y2="44" stroke="#1A1A1A" strokeWidth="3" />
              </g>

              {/* Speech Bubble */}
              <g transform="translate(210, 10)" className="speech-bubble">
                <path
                  d="M 10 0 L 260 0 Q 270 0 270 10 L 270 45 Q 270 55 260 55 L 70 55 L 50 72 L 55 55 L 10 55 Q 0 55 0 45 L 0 10 Q 0 0 10 0 Z"
                  fill="#FFFFFF"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <text x="12" y="20" fontSize="10.5" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">
                  &ldquo;Don&rsquo;t worry, Sharma-ji!&rdquo;
                </text>
                <text x="12" y="36" fontSize="10" fontFamily="serif" fill="#1A1A1A">
                  &ldquo;Our terms say we only leak data to enhance user delight!&rdquo;
                </text>
              </g>
            </g>
          )}

          {/* ── SCENE 4: ESCAPING THE CORPORATE BENTO GRID ── */}
          {activeScene === "bento-grid" && (
            <g id="scene-bento-grid">
              {/* Giant rigid identical bento boxes with trapped modern people */}
              <g transform="translate(240, 60)">
                {/* 3 identical boxes */}
                <rect x="0" y="20" width="110" height="90" rx="12" fill="#F3F4F6" stroke="#1A1A1A" strokeWidth="2.5" />
                <circle cx="20" cy="38" r="6" fill="#A855F7" />
                <rect x="34" y="34" width="60" height="8" rx="2" fill="#E5E7EB" />
                <rect x="15" y="55" width="80" height="6" rx="2" fill="#D1D5DB" />
                <rect x="15" y="67" width="60" height="6" rx="2" fill="#D1D5DB" />
                <text x="15" y="95" fontSize="8" fontFamily="monospace" fill="#777">BORDER-RADIUS: 24PX</text>

                <rect x="130" y="20" width="110" height="90" rx="12" fill="#F3F4F6" stroke="#1A1A1A" strokeWidth="2.5" />
                <circle cx="150" cy="38" r="6" fill="#3B82F6" />
                <rect x="164" y="34" width="60" height="8" rx="2" fill="#E5E7EB" />
                <rect x="145" y="55" width="80" height="6" rx="2" fill="#D1D5DB" />
                <rect x="145" y="67" width="60" height="6" rx="2" fill="#D1D5DB" />
                <text x="145" y="95" fontSize="8" fontFamily="monospace" fill="#777">GRADIENT BLOB: 100%</text>

                <rect x="0" y="130" width="240" height="100" rx="12" fill="#F3F4F6" stroke="#1A1A1A" strokeWidth="2.5" />
                <text x="20" y="160" fontSize="11" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">
                  UNIVERSAL CORPORATE SAAS TEMPLATE #4,912
                </text>
                <text x="20" y="178" fontSize="9" fontFamily="sans-serif" fill="#666">
                  Warning: No creative identity, WebGL, or soul detected.
                </text>
              </g>

              {/* Sleek supersonic origami paper plane zooming out at 60 FPS */}
              <g transform="translate(480, 40)">
                <path
                  d="M 0 60 L 80 0 L 50 80 L 35 45 Z"
                  fill="#FF3823"
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                />
                <line x1="80" y1="0" x2="35" y2="45" stroke="#FFF" strokeWidth="2" />
                {/* Speed lines */}
                <line x1="-30" y1="90" x2="0" y2="70" stroke="#FF3823" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="-40" y1="50" x2="-10" y2="35" stroke="#FF3823" strokeWidth="2" strokeDasharray="4 4" />
                <text x="-35" y="30" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#FF3823">
                  60 FPS SPATIAL
                </text>
              </g>

              {/* Speech Bubble */}
              <g transform="translate(210, 10)" className="speech-bubble">
                <path
                  d="M 10 0 L 260 0 Q 270 0 270 10 L 270 45 Q 270 55 260 55 L 70 55 L 50 72 L 55 55 L 10 55 Q 0 55 0 45 L 0 10 Q 0 0 10 0 Z"
                  fill="#FFFFFF"
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <text x="12" y="20" fontSize="10.5" fontFamily="serif" fontWeight="bold" fill="#1A1A1A">
                  &ldquo;Every website in the world has five rounded boxes&rdquo;
                </text>
                <text x="12" y="36" fontSize="10" fontFamily="serif" fill="#1A1A1A">
                  &ldquo;and a purple blur. Originality is forbidden!&rdquo;
                </text>
              </g>
            </g>
          )}

          {/* ── Signature in Laxman Style ── */}
          <g transform="translate(560, 365)">
            <text
              x="0"
              y="0"
              fontFamily="cursive, serif"
              fontSize="14"
              fontWeight="bold"
              fontStyle="italic"
              fill="#1A1A1A"
            >
              — Laxman / Vistar
            </text>
          </g>
        </svg>
      </div>

      {/* ── Editorial Caption Beneath the Cartoon ── */}
      {(activeCaption || activeSubcaption) && (
        <div className="mt-4 pt-3 border-t-2 border-[#1A1A1A] text-center space-y-1">
          {activeCaption && (
            <p className="font-serif text-sm sm:text-base font-normal italic text-[#1A1A1A] leading-snug">
              &ldquo;{activeCaption}&rdquo;
            </p>
          )}
          {activeSubcaption && (
            <p className="font-mono text-[11px] text-[#666] uppercase tracking-wider">
              {activeSubcaption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
