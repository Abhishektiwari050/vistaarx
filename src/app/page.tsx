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
import { MagneticButton } from "@/components/magnetic-button";
import { SpotlightCard } from "@/components/spotlight-card";
import { ScrollVelocity } from "@/components/scroll-velocity";
import { RetroGrid } from "@/components/retro-grid";
import { BorderBeam } from "@/components/border-beam";
import { ShimmerButton } from "@/components/shimmer-button";

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
    <section ref={targetRef} className="relative h-[130vh] bg-[#0a0a0a] border-t border-b border-black/10 z-20">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="flex w-full items-center relative max-w-6xl mx-auto px-6 sm:px-12 md:px-16">
          
          {/* Static Title Panel */}
          <div className="w-[280px] sm:w-[320px] shrink-0 pr-8 z-10 flex flex-col gap-4 select-none">
            <span className="font-mono text-[9px] font-bold tracking-[3px] text-[#ff1e90] uppercase bg-[#ff1e90]/10 border border-[#ff1e90]/20 px-3 py-1 rounded-full self-start">
              Featured Work
            </span>
            <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl md:text-5xl text-[#faf9f5] leading-none">
              Elite<br />
              <span className="text-[#d8ff42]">Case Studies</span>
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
                className="w-[320px] sm:w-[380px] shrink-0 bg-[#111] border border-white/5 rounded-3xl p-6.5 flex flex-col justify-between aspect-[16/11] relative overflow-hidden group brutalist-glow-pink"
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
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", type: "Custom Website", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  // Service section refs/animations are no longer needed for the static grid layout

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          brief: form.msg,
          budget: "Not specified",
          date: "Not selected",
          timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Not specified",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setForm({ name: "", email: "", type: "Custom Website", msg: "" });
        }, 4000);
      }
    } catch (err) {
      console.error("Failed to submit contact brief:", err);
    }
  };

  return (
    <div className="relative min-h-screen text-[#0a0a0a] overflow-x-hidden">

      {/* ── Global noise texture ─────────────────────────────────────────── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ════════════════════════════════════════════════════════════════════
          HERO — Typography Staggered Layout (21st.dev HeroSection03)
          ════════════════════════════════════════════════════════════════════ */}
      <VistarHero />

      {/* Redundant Mission Statement removed to shorten the page flow */}

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
              <SplitText text="digital presence." className="font-serif text-zinc-400" delay={0.1} />
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

      {/* Low-ticket pricing add-ons removed to keep brand positioning focused on custom engineering */}

      {/* Hazard divider */}
      <div className="stripe-divider" aria-hidden="true" />

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT
          ════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 sm:px-12 md:px-16 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full
                     bg-[#ff1e90] opacity-[0.05] blur-[100px] pointer-events-none animate-float-left blend-multiply"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left: copy */}
            <Reveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#ff1e90]" />
                <span className="font-mono text-[10px] tracking-[3px] uppercase text-zinc-400">Start a Project</span>
              </div>
              <h2 className="font-display font-bold tracking-tight text-[#0a0a0a] leading-none mb-6 text-fluid-section">
                Ready to
                <br /><span className="font-serif text-[#ff1e90]">Outrank</span> &
                <br /><span className="font-serif text-zinc-400">Outgrow?</span>
              </h2>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-8 font-light">
                Tell us what you&apos;re building. Typical custom studio engagements start at $15,000. We reply within 24 hours.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "✉", label: "Email",    val: "services.vistaar@gmail.com", href: "mailto:services.vistaar@gmail.com" },
                  { icon: "🌐", label: "Web",      val: "vistar.tech · New Delhi, India", href: undefined },
                  { icon: "⏱", label: "Response", val: "Typically within 24 hours",      href: undefined },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0a0a0a] rounded-full flex items-center justify-center text-xs shrink-0">
                      <span className="text-[#d8ff42]">{row.icon}</span>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">{row.label}</div>
                      {row.href
                        ? <a href={row.href} className="text-xs font-medium text-[#0a0a0a] hover:text-[#ff1e90] transition-colors">{row.val}</a>
                        : <div className="text-xs font-medium text-[#0a0a0a]">{row.val}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal delay={0.15}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl border border-black/6 p-8 space-y-5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] brutalist-glow-pink relative group overflow-hidden"
                  >
                    <BorderBeam
                      duration={12}
                      size={160}
                      colorFrom="#ff1e90"
                      colorTo="transparent"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    {[
                      { id: "form-name",  label: "Your Name",     type: "text",  ph: "Alexander Vance",      key: "name" as const },
                      { id: "form-email", label: "Email Address",  type: "email", ph: "alex@company.com",     key: "email" as const },
                    ].map((f) => (
                      <div key={f.id} className="space-y-1.5">
                        <label htmlFor={f.id} className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">
                          {f.label}
                        </label>
                        <input
                          type={f.type} id={f.id} required placeholder={f.ph}
                          value={form[f.key]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          suppressHydrationWarning
                          className="w-full bg-[#faf9f5] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#0a0a0a]
                                     focus:outline-none focus:border-[#d8ff42] focus:ring-1 focus:ring-[#d8ff42]/30 transition-all"
                        />
                      </div>
                    ))}

                    <div className="space-y-1.5">
                      <label htmlFor="form-type" className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">Project Type</label>
                      <select
                        id="form-type"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-[#faf9f5] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#0a0a0a]
                                   focus:outline-none focus:border-[#d8ff42] transition-all"
                      >
                        <option>Custom Website</option>
                        <option>Web Application</option>
                        <option>AI Automation</option>
                        <option>Website + Automation Bundle</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-msg" className="text-[9px] font-bold tracking-widest uppercase text-zinc-400">Project Brief</label>
                      <textarea
                        id="form-msg" required rows={4}
                        placeholder="Describe your goal, timeline, and any technical requirements…"
                        value={form.msg}
                        onChange={(e) => setForm({ ...form, msg: e.target.value })}
                        suppressHydrationWarning
                        className="w-full bg-[#faf9f5] border border-black/8 rounded-xl px-4 py-3 text-sm text-[#0a0a0a]
                                   focus:outline-none focus:border-[#d8ff42] focus:ring-1 focus:ring-[#d8ff42]/30 transition-all resize-none"
                      />
                    </div>

                    <MagneticButton>
                      <ShimmerButton
                        type="submit"
                        borderRadius="12px"
                        className="w-full py-4 text-sm font-bold"
                      >
                        Submit Brief ⚡
                      </ShimmerButton>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl border border-[#d8ff42]/30 p-12 text-center space-y-4
                               shadow-[0_8px_40px_rgba(216,255,66,0.12)]"
                  >
                    <motion.span
                      animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl block"
                    >⚡</motion.span>
                    <h3 className="font-display text-sm font-bold tracking-wider text-[#0a0a0a] uppercase">Brief Sent</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                      Your brief has reached Vistar HQ. Our lead architect will reply within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
