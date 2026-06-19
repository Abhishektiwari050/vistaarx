"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { VistarHero } from "@/components/vistar-hero";
import { SplitText } from "@/components/split-text";
import { UnderlineText } from "@/components/underline-text";
import { MagneticButton } from "@/components/magnetic-button";
import { SpotlightCard } from "@/components/spotlight-card";
import { ScrollVelocity } from "@/components/scroll-velocity";
import { RetroGrid } from "@/components/retro-grid";


// ─────────────────────────────────────────────────────────────────────────────
// Animated Counter
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200; // 1.2 seconds animation duration
    const startTime = performance.now();
    
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quadratic ease out
      const ease = progress * (2 - progress);
      setCount(Math.floor(ease * to));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, to]);

  return (
    <motion.span
      ref={ref}
      initial={{ filter: "blur(12px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="inline-block"
    >
      {count}{suffix}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll Reveal
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}





const CASE_STUDIES = [
  {
    id: "01",
    title: "Apex Algorithmic Ledger",
    client: "FinTech Trade Labs",
    metric: "+38% Signups",
    desc: "A high-performance algorithmic trading interface for digital asset dealers utilizing WebGL and Next.js. Increased user session times by 140% and signup conversions by 38%.",
    tags: ["WebGL", "Framer Motion", "Real-Time Telemetry"],
  },
  {
    id: "02",
    title: "Router Scaling Compiler",
    client: "Enterprise Media Cloud",
    metric: "2.4x Speedup",
    desc: "An architectural overhaul for a global media distribution network using Next.js SSR and Edge Functions. Achieved a 2.4x speedup in load times and a 62% increase in search CTR.",
    tags: ["Next.js SSR", "Edge Functions", "API Routing"],
  },
  {
    id: "03",
    title: "Spatial Bio-Modeling Engine",
    client: "Helix Research Corp",
    metric: "Zero Latency",
    desc: "An immersive browser-based bio-modeling environment using Three.js and GLSL. Handles 1.2M daily active user sessions with zero latency in render frame rates.",
    tags: ["Three.js", "GLSL Shaders", "Bio-Computing UI"],
  },
];

function HorizontalCaseStudies() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translate scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section ref={targetRef} className="relative h-[120vh] bg-[#0a0a0a] border-t border-b border-black/10 z-20">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="flex w-full items-center relative max-w-6xl mx-auto px-6 sm:px-12 md:px-16">
          
          {/* Static Title Panel */}
          <div className="w-[280px] sm:w-[320px] shrink-0 pr-8 z-10 flex flex-col gap-4 select-none">
            <span className="font-mono text-[9px] font-bold tracking-[3px] text-[#ff1e90] uppercase bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full self-start">
              Featured Work
            </span>
            <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl md:text-5xl text-[#faf9f5] leading-none">
              Elite<br />
              <UnderlineText color="#d8ff42">
                <span className="text-[#d8ff42]">Case Studies</span>
              </UnderlineText>
            </h2>
            <p className="text-[11px] text-[#faf9f5]/40 leading-relaxed font-sans max-w-[220px]">
              Deploying production-ready edge compilers and real-time WebGL graphics interfaces.
            </p>
          </div>

          {/* Scrolling Horizontal Track */}
          <motion.div style={{ x }} className="flex gap-6 pl-4 pr-12">
            {CASE_STUDIES.map((p) => (
              <div
                key={p.id}
                className="w-[340px] sm:w-[420px] h-[340px] sm:h-[390px] shrink-0 bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group brutalist-glow-pink"
              >
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-[#ff1e90] font-semibold">{p.id} {"//"} SHOWCASE</span>
                    <h3 className="font-display text-base font-bold tracking-wide text-white uppercase">{p.title}</h3>
                    <p className="font-sans text-[9px] text-white/30 font-medium">Client: {p.client}</p>
                  </div>
                  <span className="font-display text-[9px] font-bold tracking-widest uppercase text-[#ff1e90] bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-2 py-0.5 rounded shrink-0">
                    {p.metric}
                  </span>
                </div>

                <p className="font-sans text-[11px] text-white/50 leading-relaxed my-3">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {p.tags.map((t, i) => (
                    <span key={i} className="font-mono text-[8px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Perspectives Parallax Card Grid (integrated from Superdesign HTML)
// ─────────────────────────────────────────────────────────────────────────────
function PerspectivesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Card 1: Parallax down (positive translate)
  const cardDownY = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);
  // Card 2: Parallax up (negative translate)
  const cardUpY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
      {/* Card 1 - Emerging Talent - Vistar Lime Green */}
      <motion.div style={{ y: cardDownY }} className="group cursor-pointer">
        <Reveal>
          <SpotlightCard
            glowColor="rgba(0, 0, 0, 0.05)"
            borderColor="rgba(0, 0, 0, 0.15)"
            className="bg-[#d8ff42] border-[3px] border-black rounded-3xl p-6 md:p-8 h-[340px] md:h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all duration-500"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 text-black">
                {/* SVG Star Icon */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="2">
                  <path d="M12,2 L15.09,8.26 L22,9.27 L17,14.14 L18.18,21.02 L12,17.77 L5.82,21.02 L7,14.14 L2,9.27 L8.91,8.26 Z" />
                </svg>
              </div>
              <span className="text-black font-mono font-bold text-xs border-2 border-black px-3 py-1 rounded-full bg-white shadow-[2px_2px_0px_#000]">01</span>
            </div>

            <div>
              <h3 className="font-display font-bold uppercase text-3xl md:text-4xl text-black mb-4 leading-none tracking-tight">
                Emerging <br />Talent
              </h3>
              <p className="text-black/70 text-xs md:text-sm leading-relaxed font-sans">
                You have the spark. We provide the architecture, sub-second performance, and clean code for your vision to ignite into a blazing market reality.
              </p>
            </div>

            <div className="w-full h-[2px] bg-black/10 mt-8" />
          </SpotlightCard>
        </Reveal>
      </motion.div>

      {/* Card 2 - Evolving Legacy - Vistar Dark with Pink Glow */}
      <motion.div style={{ y: cardUpY }} className="md:mt-12 group cursor-pointer">
        <Reveal delay={0.15}>
          <SpotlightCard
            glowColor="rgba(255, 30, 144, 0.1)"
            borderColor="rgba(255, 255, 255, 0.1)"
            className="bg-[#111] border-[3px] border-black rounded-3xl p-6 md:p-8 h-[340px] md:h-[380px] flex flex-col justify-between shadow-[6px_6px_0px_#ff1e90] hover:shadow-[10px_10px_0px_#ff1e90] transition-all duration-500"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-115 transition-all duration-500 text-white">
                {/* SVG Arrow Diagonal Icon */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none -rotate-45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <span className="text-white/50 font-mono font-bold text-xs border border-white/10 px-3 py-1 rounded-full bg-white/5">02</span>
            </div>

            <div>
              <h3 className="font-display font-bold uppercase text-3xl md:text-4xl text-white mb-4 leading-none tracking-tight">
                Evolving <br />Legacy
              </h3>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed font-sans">
                You&apos;ve arrived. Now let&apos;s make sure you dominate search and AI engines. Premium performance and custom workflow engineering are our craft.
              </p>
            </div>

            <div className="w-full h-px bg-white/10 mt-8" />
          </SpotlightCard>
        </Reveal>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  // Service section refs/animations are no longer needed for the static grid layout

  return (
    <div className="relative min-h-screen text-[#0a0a0a] overflow-x-hidden">

      {/* ── Global noise texture ─────────────────────────────────────────── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ════════════════════════════════════════════════════════════════════
          HERO — Typography Staggered Layout (21st.dev HeroSection03)
          ════════════════════════════════════════════════════════════════════ */}
      <VistarHero />

      {/* ════════════════════════════════════════════════════════════════════
          MISSION STATEMENT & BRUTALIST BRAND STAMP COLLAGE (Superdesign Integration)
          ════════════════════════════════════════════════════════════════════ */}
      <section id="expertise" className="py-24 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-20">
          <Reveal>
            <h2 className="font-display font-bold tracking-tight text-[#0a0a0a] leading-tight mb-8 text-fluid-section uppercase">
              We design the <span className="font-serif italic font-normal text-zinc-400 lowercase">negative space</span> where your brand truly lives.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-base sm:text-lg text-zinc-500 leading-relaxed font-sans max-w-2xl mx-auto">
              Elegance is <span className="font-serif italic text-black">refusal</span>. We remove the noise, eliminate bloated templates, and streamline architecture so your message resonates with absolute clarity.
            </p>
          </Reveal>
        </div>

        {/* Brutalist Brand Stamp Grid */}
        <div className="max-w-5xl mx-auto relative z-10 px-4">
          <Reveal delay={0.25}>
            <div className="grid grid-cols-2 md:grid-cols-4 border-[3px] border-black divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black bg-white shadow-[6px_6px_0px_#ff1e90] rounded-xl overflow-hidden select-none">
              <div className="py-8 text-center font-display font-black tracking-[3px] text-black text-sm sm:text-base hover:bg-[#d8ff42] transition-colors duration-300">VOGUE</div>
              <div className="py-8 text-center font-display font-black tracking-[3px] text-black text-sm sm:text-base hover:bg-[#ff1e90] hover:text-white transition-colors duration-300">TESLA</div>
              <div className="py-8 text-center font-display font-black tracking-[3px] text-black text-sm sm:text-base hover:bg-[#d8ff42] transition-colors duration-300">MOOMA</div>
              <div className="py-8 text-center font-display font-black tracking-[3px] text-black text-sm sm:text-base hover:bg-[#ff1e90] hover:text-white transition-colors duration-300">AESOP</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dynamic Scroll Velocity Typography Marquee */}
      <div className="py-6 bg-[#faf9f5] border-t border-b border-black/5 relative z-20 overflow-hidden">
        <ScrollVelocity baseVelocity={1.5}>
          ELITE PERFORMANCE · CLEAN CODE · FULL OWNERSHIP · ZERO TEMPLATES · SEARCH OPTIMIZED ·
        </ScrollVelocity>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          STATS BAR — dark
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { n: 60,  s: "+", label: "Projects Delivered" },
            { n: 3,   s: "×", label: "Faster Than Average" },
            { n: 68,  s: "%", label: "Higher Conversion" },
            { n: 100, s: "%", label: "Custom — Zero Templates" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#d8ff42] leading-none mb-2 tabular-nums">
                <AnimatedCounter to={stat.n} suffix={stat.s} />
              </div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-white/30">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES — Superdesign card layout (staggered parallax)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="services"
        className="py-24 px-6 sm:px-12 md:px-16 relative overflow-hidden"
      >
        {/* Dot pattern bg */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.04] bg-dot-pattern"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="mb-16 text-center">
            <h2
              className="font-display font-bold tracking-tight text-[#0a0a0a] leading-none text-fluid-display"
            >
              <SplitText text="Define your " />
              <br className="hidden sm:block" />
              <UnderlineText color="#ff1e90">
                <SplitText text="digital presence." className="font-serif text-zinc-400" delay={0.1} />
              </UnderlineText>
            </h2>
          </Reveal>

          {/* Cards container — compact 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* Card 1 — Custom Websites — neon green */}
            <div className="group cursor-pointer">
              <Reveal>
                <SpotlightCard
                  glowColor="rgba(255, 255, 255, 0.2)"
                  borderColor="rgba(0, 0, 0, 0.15)"
                  className="bg-[#d8ff42] border border-black/10 rounded-3xl p-6 md:p-8 aspect-auto min-h-[380px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center
                                    group-hover:rotate-45 transition-transform duration-500 text-black text-lg">
                      ✦
                    </div>
                    <span className="text-black/50 text-xs font-bold border border-black/15 px-2.5 py-0.5 rounded-full font-mono">01</span>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display font-bold tracking-tight text-black leading-none mb-3 text-2xl">
                      Custom<br />Websites
                    </h3>
                    <p className="text-black/60 text-xs leading-relaxed">
                      High-conversion, fully custom-designed platforms. Shipped in 7–21 days with sub-second performance, SEO architecture, and complete ownership transfer.
                    </p>
                  </div>
                  <div className="w-full h-px bg-black/10 mt-6" />
                </SpotlightCard>
              </Reveal>
            </div>

            {/* Card 2 — Web Applications — dark */}
            <div className="group cursor-pointer">
              <Reveal delay={0.1}>
                <SpotlightCard
                  glowColor="rgba(255, 30, 144, 0.08)"
                  borderColor="rgba(255, 30, 144, 0.35)"
                  className="bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8 aspect-auto min-h-[380px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-500 text-white text-lg">
                      →
                    </div>
                    <span className="text-white/30 text-xs font-bold border border-white/10 px-2.5 py-0.5 rounded-full font-mono">02</span>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display font-bold tracking-tight text-white leading-none mb-3 text-2xl">
                      Web<br />Applications
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed">
                      Full-stack SaaS platforms, dashboards, and client portals. Next.js 15 + PostgreSQL with real-time data, secure auth, and CI/CD from day one.
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/5 mt-6" />
                </SpotlightCard>
              </Reveal>
            </div>

            {/* Card 3 — AI Automations — white/pink-blur */}
            <div className="group cursor-pointer">
              <Reveal delay={0.2}>
                <SpotlightCard
                  glowColor="rgba(255, 30, 144, 0.05)"
                  borderColor="rgba(255, 30, 144, 0.18)"
                  className="bg-white border border-black/5 rounded-3xl p-6 md:p-8 aspect-auto min-h-[380px] flex flex-col justify-between relative overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 w-48 h-48 rounded-full
                               bg-[#ff1e90] opacity-[0.06] blur-[50px] pointer-events-none"
                  />
                  <div className="flex justify-between items-start relative z-10">
                    <div className="w-10 h-10 rounded-full bg-[#ff1e90]/10 flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-500 text-[#ff1e90] text-lg">
                      ●
                    </div>
                    <span className="text-[#ff1e90] text-xs font-bold border border-[#ff1e90]/15 px-2.5 py-0.5 rounded-full font-mono">03</span>
                  </div>
                  <div className="mt-8 relative z-10">
                    <h3 className="font-display font-bold tracking-tight text-[#0a0a0a] leading-none mb-3 text-2xl">
                      AI<br />Automations
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      Intelligent workflow systems that replace manual, repetitive operations. Lead pipelines, content AI, and autonomous support agents.
                    </p>
                  </div>
                  <div className="w-full h-px bg-black/5 mt-6 relative z-10" />
                </SpotlightCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Horizontal Case Studies */}
      <HorizontalCaseStudies />

      {/* ════════════════════════════════════════════════════════════════════
          PERSPECTIVES — Parallax Card Grid (Superdesign integration)
          ════════════════════════════════════════════════════════════════════ */}
      <section id="perspectives" className="py-32 px-6 sm:px-12 md:px-16 relative overflow-hidden bg-white/40 border-t border-black/5">
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="mb-24 text-center">
            <h2 className="font-display font-bold tracking-tight text-[#0a0a0a] leading-none text-fluid-display uppercase">
              Selected <br />
              <span className="font-serif italic font-normal text-zinc-400 lowercase">Perspectives</span>
            </h2>
          </Reveal>

          {/* Cards container — 2-column grid with opposite scroll parallax */}
          <PerspectivesGrid />
        </div>
      </section>

      {/* Hazard divider */}
      <div className="stripe-divider" aria-hidden="true" />

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT
          ════════════════════════════════════════════════════════════════════ */}
    </div>
  );
}
