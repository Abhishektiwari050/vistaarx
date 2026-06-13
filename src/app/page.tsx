"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { VistarBentoFeatures } from "@/components/bento-grid";
import { VistarHero } from "@/components/vistar-hero";
import { SplitText } from "@/components/split-text";
import { MagneticButton } from "@/components/magnetic-button";
import { SpotlightCard } from "@/components/spotlight-card";
import { ScrollVelocity } from "@/components/scroll-velocity";

// ─────────────────────────────────────────────────────────────────────────────
// Animated Counter
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
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



// ─────────────────────────────────────────────────────────────────────────────
// AI Flowchart
// ─────────────────────────────────────────────────────────────────────────────
const WORKFLOWS = {
  leads: {
    title: "Lead Qualification & Ingestion Pipeline",
    nodes: [
      { id: "1", label: "Email / Webhook",       desc: "Triggered on new incoming inquiry" },
      { id: "2", label: "Gemini Parsing Agent",  desc: "Extracts intent, budget, tech stack" },
      { id: "3", label: "Clearbit Enrichment",   desc: "Retrieves company size and funding" },
      { id: "4", label: "CRM Routing & Alert",   desc: "Pushes score, schedules calendar link" },
    ],
  },
  content: {
    title: "Automated Content Translator & Distributor",
    nodes: [
      { id: "1", label: "Source Asset (CMS)",    desc: "Listens for code push or article publish" },
      { id: "2", label: "LLM Translation",       desc: "Localises text with cultural context" },
      { id: "3", label: "SEO Metatag Gen",       desc: "Generates optimal JSON-LD structure" },
      { id: "4", label: "Platform Dispatch",     desc: "Pushes to CMS and social APIs" },
    ],
  },
  support: {
    title: "Autonomous Customer Support Assistant",
    nodes: [
      { id: "1", label: "Inbound Ticket",        desc: "Receives user request from widget" },
      { id: "2", label: "Vector DB Search",      desc: "Searches docs and past responses" },
      { id: "3", label: "Response Draft",        desc: "Builds answer with sandbox tests" },
      { id: "4", label: "Auto-Reply / Escalate", desc: "Responds <15s or routes to human" },
    ],
  },
} as const;

type WFKey = keyof typeof WORKFLOWS;

function AiFlowchart() {
  const [active, setActive] = useState<WFKey>("leads");
  const [nodeIdx, setNodeIdx] = useState(-1);
  const [logs, setLogs] = useState(["[0.00s] Initializing pipeline…"]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    let step = 0;
    
    const initTimeout = setTimeout(() => {
      setNodeIdx(-1);
      setLogs(["[0.00s] Initializing pipeline…"]);
    }, 0);

    timerRef.current = setInterval(() => {
      const nodes = WORKFLOWS[active].nodes;
      if (step < nodes.length && nodes[step]) {
        setNodeIdx(step);
        const ts = ((step + 1) * 0.18 + Math.random() * 0.04).toFixed(2);
        const label = nodes[step].label;
        setLogs((p) => [...p, `[${ts}s] ${label}: ✓ OK`]);
        step++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setLogs((p) => [...p, `[SUCCESS] Finished in ${(step * 0.18).toFixed(2)}s`]);
      }
    }, 1200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(initTimeout);
    };
  }, [active]);

  const nodes = WORKFLOWS[active].nodes;

  return (
    <div className="bg-[#111] rounded-2xl p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-6 select-none border border-white/5">
      {/* Pipeline selector */}
      <div className="md:col-span-4 flex flex-col gap-2">
        <p className="font-mono text-[9px] tracking-widest uppercase text-white/30 mb-2">Select Pipeline</p>
        {(Object.keys(WORKFLOWS) as WFKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            suppressHydrationWarning
            className={`text-left px-4 py-2.5 rounded-lg text-[10px] font-display font-bold tracking-widest uppercase transition-all ${
              active === key
                ? "bg-[#d8ff42] text-black"
                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            {key === "leads" ? "Lead Pipeline" : key === "content" ? "Content AI" : "Support Bot"}
          </button>
        ))}
      </div>

      {/* Flow canvas */}
      <div className="md:col-span-8 flex flex-col gap-6">
        <p className="font-display text-[10px] font-bold tracking-widest uppercase text-white/50">
          {WORKFLOWS[active].title}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {nodes.map((node, i) => {
            const isActive = i === nodeIdx;
            const isPast = i < nodeIdx;
            return (
              <motion.div
                key={node.id}
                className="flex flex-col items-center text-center"
                animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-all duration-300 ${
                  isActive ? "bg-[#d8ff42] text-black border-[#d8ff42]"
                  : isPast ? "bg-white text-black border-white"
                  : "bg-transparent text-white/20 border-white/10"
                }`}>
                  {isPast ? "✓" : `0${i + 1}`}
                </div>
                <p className={`text-[9px] font-bold tracking-wider uppercase mt-2 transition-colors ${isActive ? "text-[#d8ff42]" : "text-white/30"}`}>
                  {node.label}
                </p>
                <p className="text-[8px] text-white/20 mt-0.5 leading-normal max-w-[100px]">{node.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Log terminal */}
        <div className="bg-black/60 rounded-lg p-4 font-mono text-[9px] leading-relaxed h-28 overflow-y-auto no-scrollbar flex flex-col justify-end border border-white/5">
          <div className="flex justify-between text-[8px] text-white/20 uppercase tracking-wider border-b border-white/5 pb-1 mb-1.5">
            <span>Console</span>
            <span className="text-[#d8ff42] animate-pulse">● LIVE</span>
          </div>
          {logs.map((log, i) => (
            <p key={i} className={log.startsWith("[SUCCESS]") ? "text-[#d8ff42]" : "text-white/40"}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROI Calculator
// ─────────────────────────────────────────────────────────────────────────────
function RoiCalculator() {
  const [hours, setHours] = useState(25);
  const [rate, setRate] = useState(45);
  const saved = Math.round(hours * 4 * 0.85);
  const monthly = saved * rate;
  const yearly = monthly * 12;

  return (
    <div className="bg-[#111] rounded-2xl p-6 md:p-8 border border-white/5">
      <p className="font-mono text-[9px] tracking-widest uppercase text-white/30 mb-6">
        Automation ROI Estimator
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between font-display text-[10px] font-bold uppercase tracking-wider text-white/50">
              <span>Manual Hours / Week</span><span className="text-white">{hours} hrs</span>
            </div>
            <input type="range" min="5" max="100" value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              aria-label="Manual hours per week"
              className="w-full accent-[#d8ff42] cursor-pointer h-1 rounded-full bg-white/10" />
            <p className="text-[9px] text-white/25">Data entry, support routing, status updates, follow-ups</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between font-display text-[10px] font-bold uppercase tracking-wider text-white/50">
              <span>Hourly Cost</span><span className="text-white">${rate}/hr</span>
            </div>
            <input type="range" min="15" max="150" value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="Hourly resource cost"
              className="w-full accent-[#d8ff42] cursor-pointer h-1 rounded-full bg-white/10" />
            <p className="text-[9px] text-white/25">Avg. blended contractor / employee rate</p>
          </div>
        </div>
        <div className="md:col-span-5 bg-white/5 rounded-xl p-5 space-y-4 text-center border border-white/5">
          <div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/30">Time Recovered</span>
            <p className="font-display text-2xl font-bold text-white mt-1">{saved} <span className="text-sm text-white/30 font-sans">hrs / mo</span></p>
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/30">Monthly Yield</span>
            <p className="font-display text-3xl font-bold text-[#d8ff42] mt-1">${monthly.toLocaleString()}</p>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between text-[10px] font-bold tracking-wide uppercase text-white/30">
            <span>Yearly</span><span className="text-white">${yearly.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", type: "Custom Website", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  // Parallax for service cards (opposite directions)
  const cardsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: cardsScroll } = useScroll({ target: cardsRef, offset: ["start end", "end start"] });
  const card1Y = useTransform(cardsScroll, [0, 1], ["-30px", "30px"]);
  const card2Y = useTransform(cardsScroll, [0, 1], ["30px", "-30px"]);

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

      {/* ════════════════════════════════════════════════════════════════════
          MISSION STATEMENT
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 sm:px-12 border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2
              className="font-display font-bold tracking-tight leading-tight text-[#0a0a0a] mb-8 text-fluid-section"
            >
              <SplitText text="We build the digital infrastructure " />
              <br className="sm:hidden" />
              <SplitText text="where your brand dominates." className="font-serif text-zinc-400" />
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
              No bloated templates. No lock-in. Just precision-engineered platforms with
              sub-second load times, structured for both Google and AI discovery engines —
              and 100% yours from day one.
            </p>
          </Reveal>

          {/* Client trust strip */}
          <Reveal delay={0.3}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4
                            opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale">
              {["E-Commerce", "SaaS", "Legal", "Healthcare", "Education", "Real Estate"].map((s) => (
                <span key={s} className="font-display text-xs font-bold tracking-[3px] uppercase text-black">
                  {s}
                </span>
              ))}
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
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
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
        ref={cardsRef}
        className="py-32 px-6 sm:px-12 md:px-16 relative overflow-hidden"
      >
        {/* Dot pattern bg */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.04] bg-dot-pattern"
        />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <Reveal className="mb-24 text-center">
            <h2
              className="font-display font-bold tracking-tight text-[#0a0a0a] leading-none text-fluid-display"
            >
              <SplitText text="Define your " />
              <br className="hidden sm:block" />
              <SplitText text="digital presence." className="font-serif text-zinc-400" delay={0.1} />
            </h2>
          </Reveal>

          {/* Card pair — staggered like Superdesign */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-6">

            {/* Card 1 — Custom Websites — neon green */}
            <motion.div style={{ y: card1Y }} className="group cursor-pointer">
              <Reveal>
                <SpotlightCard
                  glowColor="rgba(255, 255, 255, 0.2)"
                  borderColor="rgba(0, 0, 0, 0.15)"
                  className="bg-[#d8ff42] border border-black/10 rounded-3xl p-8 md:p-12 aspect-[4/5] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center
                                    group-hover:rotate-45 transition-transform duration-500 text-black text-xl">
                      ✦
                    </div>
                    <span className="text-black/50 text-sm font-bold border border-black/15 px-3 py-1 rounded-full font-mono">01</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold tracking-tight text-black leading-none mb-4 text-fluid-card">
                      Custom<br />Websites
                    </h3>
                    <p className="text-black/60 text-base leading-relaxed">
                      High-conversion, fully custom-designed platforms. Shipped in 7–21 days with sub-second performance, SEO architecture, and complete ownership transfer.
                    </p>
                  </div>
                  <div className="w-full h-px bg-black/10 mt-8" />
                </SpotlightCard>
              </Reveal>
            </motion.div>

            {/* Card 2 — Web Applications — dark, offset down */}
            <motion.div style={{ y: card2Y }} className="md:mt-24 group cursor-pointer">
              <Reveal delay={0.15}>
                <SpotlightCard
                  glowColor="rgba(255, 30, 144, 0.08)"
                  borderColor="rgba(255, 30, 144, 0.35)"
                  className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 aspect-[4/5] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-500 text-white text-xl">
                      →
                    </div>
                    <span className="text-white/30 text-sm font-bold border border-white/10 px-3 py-1 rounded-full font-mono">02</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold tracking-tight text-white leading-none mb-4 text-fluid-card">
                      Web<br />Applications
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed">
                      Full-stack SaaS platforms, dashboards, and client portals. Next.js 15 + PostgreSQL with real-time data, secure auth, and CI/CD from day one.
                    </p>
                  </div>
                  <div className="w-full h-px bg-white/5 mt-8" />
                </SpotlightCard>
              </Reveal>
            </motion.div>
          </div>

          {/* Card 3 — AI Automations — full width banner */}
          <Reveal delay={0.1}>
            <SpotlightCard
              glowColor="rgba(255, 30, 144, 0.05)"
              borderColor="rgba(255, 30, 144, 0.18)"
              className="relative rounded-3xl overflow-hidden border border-black/5 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 group cursor-pointer"
            >
              {/* Pink orb inside card */}
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full
                           bg-[#ff1e90] opacity-[0.06] blur-[80px] pointer-events-none"
              />
              <div className="flex-1 relative z-10">
                <span className="inline-flex items-center gap-2 bg-[#ff1e90]/8 text-[#ff1e90] text-[10px]
                                 font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4 border border-[#ff1e90]/15">
                  <span className="animate-pulse">●</span> 03
                </span>
                <h3 className="font-display font-bold tracking-tight text-[#0a0a0a] leading-none mb-4 text-fluid-sub">
                  AI Automations
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed max-w-lg">
                  Intelligent workflow systems that replace manual, repetitive operations. Lead pipelines, content distributors, autonomous support bots — engineered on n8n, Zapier, and custom agents.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0 relative z-10 w-full md:w-auto">
                {["Lead Pipelines", "Content AI", "Support Bots", "Custom Agents"].map((tag) => (
                  <span key={tag}
                    className="border border-black/10 rounded-full px-4 py-2 text-[10px] font-bold
                               tracking-widest uppercase text-zinc-500 text-center whitespace-nowrap
                               group-hover:border-[#ff1e90]/30 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          AI INTERACTIVE DEMOS — dark section
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-24 px-6 sm:px-12 md:px-16 relative overflow-hidden">
        {/* Subtle green grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.03] bg-green-grid"
        />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-px bg-[#ff1e90]" />
              <span className="font-mono text-[10px] tracking-[3px] uppercase text-white/30">Live Demos</span>
            </div>
            <h2
              className="font-display font-bold tracking-tight text-white leading-none mb-4 text-fluid-title"
            >
              Operational{" "}
              <span className="font-serif text-white/30">Engines</span>
            </h2>
            <p className="text-sm text-white/30 max-w-md leading-relaxed mb-12 font-light">
              Interactive simulations of real AI automation pipelines. Click a workflow to watch it execute in real-time.
            </p>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}><AiFlowchart /></Reveal>
            <Reveal delay={0.2}><RoiCalculator /></Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE VISTAR STANDARD — Bento Grid Features
          ════════════════════════════════════════════════════════════════════ */}
      <VistarBentoFeatures />

      {/* ════════════════════════════════════════════════════════════════════
          PRICING ADD-ONS
          ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-12 md:px-16">
        <div className="max-w-[1100px] mx-auto">
          <Reveal className="mb-14">
            <h2 className="font-display font-bold tracking-tight text-[#0a0a0a] text-center text-fluid-powerup">
              Power-Up <span className="font-serif text-zinc-400">Add-ons</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Dynamic Blog Panel",         desc: "CMS dashboard to publish articles and updates directly to your platform.",                               price: "₹4,999" },
              { name: "SEO Blog Architecture",      desc: "Auto-generated XML sitemaps, article schema, and AI search optimization modules.",                      price: "₹6,999" },
              { name: "Smart Chatbot Integration",  desc: "Lead-routing bot for WhatsApp Business or on-site chat — logs queries instantly.",                      price: "₹3,499" },
              { name: "Lighthouse Audit & Fix",     desc: "Systematic performance tuning guaranteeing 90+ mobile speed score.",                                    price: "₹2,999" },
            ].map((a, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="flex justify-between items-center gap-5 bg-white rounded-2xl border border-black/6
                             p-6 group brutalist-glow-pink cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="font-display text-sm font-bold text-[#0a0a0a] mb-1">{a.name}</div>
                    <p className="text-[11px] text-zinc-400 leading-normal">{a.desc}</p>
                  </div>
                  <div className="bg-[#0a0a0a] text-[#d8ff42] text-xs font-bold px-4 py-2 rounded-full shrink-0
                                  group-hover:bg-[#d8ff42] group-hover:text-black transition-colors font-mono">
                    {a.price}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
        <div className="max-w-[1100px] mx-auto relative z-10">
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
                Tell us what you&apos;re building. Typical custom studio engagements start at ₹15,000. We reply within 24 hours.
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
                    className="bg-white rounded-3xl border border-black/6 p-8 space-y-5 shadow-[0_8px_40px_rgba(0,0,0,0.06)] brutalist-glow-pink"
                  >
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
                      <button
                        type="submit"
                        suppressHydrationWarning
                        className="w-full py-4 rounded-xl bg-[#0a0a0a] text-[#d8ff42] text-sm font-bold tracking-widest uppercase
                                   shadow-[0_4px_24px_rgba(216,255,66,0.15)] hover:shadow-[0_6px_32px_rgba(216,255,66,0.25)] transition-shadow cursor-pointer"
                      >
                        Submit Brief ⚡
                      </button>
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

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER — large text à la Superdesign
          ════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-black/5 relative overflow-hidden pt-16 pb-10 px-6 sm:px-12">
        {/* Big watermark text */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 pointer-events-none select-none leading-none overflow-hidden"
        >
          <span
            className="font-display font-bold tracking-tighter text-[#0a0a0a]/5 text-fluid-footer leading-[0.85]"
          >
            VISTAR.
          </span>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12">
            <div>
              <div className="font-display text-3xl font-bold tracking-tighter text-[#0a0a0a] mb-1">VISTAR</div>
              <div className="text-[10px] font-bold tracking-[3px] uppercase text-zinc-400 font-mono">
                Web Systems · New Delhi, India
              </div>
            </div>
            <nav className="flex flex-col md:items-end gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "LinkedIn",  href: "#" },
                { label: "Twitter",   href: "#" },
              ].map((l) => (
                <a key={l.label} href={l.href}
                   className="text-sm text-zinc-400 hover:text-[#0a0a0a] transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[11px] text-zinc-400 font-mono">
              © 2026 Vistar Web Systems · services.vistaar@gmail.com
            </p>
            <p className="text-[11px] text-zinc-400 font-mono">
              Precision engineered · Zero templates · 100% yours
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
