"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Symmetrical Opposing Brutalist Marquees slanted at -2° and +2°
// ─────────────────────────────────────────────────────────────────────────────
function DoubleMarquees() {
  const theme = useScrollStore((s) => s.theme);
  
  let textColorA = "text-black font-black";
  let textColorB = "text-white";
  let bgColorA = "bg-[#ccff00] border-y-4 border-black";
  let bgColorB = "bg-[#ff0080] border-y-4 border-black";
  
  if (theme === "cyber-dark") {
    textColorA = "text-[#ccff00]";
    textColorB = "text-[#ff0080]";
    bgColorA = "bg-black border-y-4 border-[#ccff00]";
    bgColorB = "bg-black border-y-4 border-[#ff0080]";
  } else if (theme === "mono") {
    textColorA = "text-black";
    textColorB = "text-white";
    bgColorA = "bg-white border-y-4 border-black";
    bgColorB = "bg-black border-y-4 border-black";
  } else if (theme === "solar") {
    textColorA = "text-[#0b0502]";
    textColorB = "text-[#ffcc00]";
    bgColorA = "bg-[#ff5500] border-y-4 border-black";
    bgColorB = "bg-black border-y-4 border-[#ff5500]";
  }

  return (
    <div className="relative py-2 overflow-hidden select-none w-full scale-[0.9] md:scale-100">
      {/* Marquee 1 (Slanted Left) */}
      <div 
        className={`w-[110%] -ml-[5%] py-3.5 ${bgColorA} ${textColorA} transform -rotate-1 overflow-hidden shadow-[0_6px_0px_0px_rgba(0,0,0,1)] relative z-20 pointer-events-auto`}
      >
        <div className="flex w-[200%] gap-4 animate-[marquee_20s_linear_infinite] will-change-transform font-mono text-2xl md:text-3xl font-black uppercase tracking-tighter">
          <span className="flex items-center gap-8 whitespace-nowrap">
            [Vistar Studio] ★ [Digital Engineering] ★ [Premium 3D Shaders] ★ [High-Performance React] ★ [Zero Friction] ★
          </span>
          <span className="flex items-center gap-8 whitespace-nowrap">
            [Vistar Studio] ★ [Digital Engineering] ★ [Premium 3D Shaders] ★ [High-Performance React] ★ [Zero Friction] ★
          </span>
        </div>
      </div>

      {/* Marquee 2 (Slanted Right) */}
      <div 
        className={`w-[110%] -ml-[5%] py-3.5 ${bgColorB} ${textColorB} transform rotate-1 -mt-3 overflow-hidden shadow-[0_6px_0px_0px_rgba(0,0,0,1)] relative z-10 pointer-events-auto`}
      >
        <div className="flex w-[200%] gap-4 animate-[marquee-reverse_18s_linear_infinite] will-change-transform font-mono text-2xl md:text-3xl font-black uppercase tracking-tighter">
          <span className="flex items-center gap-8 whitespace-nowrap">
            {"// High-Performance Web Apps // Immersive Visual Design // Edge Compiling // Scalable Nodes //"}
          </span>
          <span className="flex items-center gap-8 whitespace-nowrap">
            {"// High-Performance Web Apps // Immersive Visual Design // Edge Compiling // Scalable Nodes //"}
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Home Page (Portal) - Sticky 3D Story-Driven Deck
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const theme = useScrollStore((s) => s.theme);
  
  let textPrimary = "text-black";
  let textSecondary = "text-black bg-[#ccff00] border-2 border-black font-mono font-bold uppercase px-2 py-0.5 text-[10px]";
  let btnClass = "bg-[#ff0080] text-white border-4 border-black hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none font-mono text-xs uppercase font-bold tracking-widest";
  let strokeText = "text-transparent mix-blend-difference opacity-80";
  let stickerColor = "bg-[#00ffff] text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
  const basePanelClass = "absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ease-out";
  
  if (theme === "cyber-dark") {
    textPrimary = "text-white";
    textSecondary = "text-[#ccff00] bg-black border border-[#ccff00] font-mono font-bold uppercase px-2 py-0.5 text-[10px]";
    btnClass = "bg-[#ccff00] text-black border-4 border-[#ccff00] hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[6px_6px_0px_0px_#ff0080] hover:shadow-none font-mono text-xs uppercase font-bold tracking-widest";
    strokeText = "text-transparent opacity-80 mix-blend-screen";
    stickerColor = "bg-[#ff0080] text-white border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]";
  } else if (theme === "mono") {
    textPrimary = "text-black";
    textSecondary = "text-white bg-black border border-black font-mono font-bold uppercase px-2 py-0.5 text-[10px]";
    btnClass = "bg-white text-black border-4 border-black hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none font-mono text-xs uppercase font-bold tracking-widest";
    strokeText = "text-transparent mix-blend-difference opacity-80";
    stickerColor = "bg-neutral-200 text-black border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
  } else if (theme === "solar") {
    textPrimary = "text-[#ff5500]";
    textSecondary = "text-[#ffcc00] bg-[#140b04] border border-[#ff5500] font-mono font-bold uppercase px-2 py-0.5 text-[10px]";
    btnClass = "bg-[#ffcc00] text-black border-4 border-[#ff5500] hover:-translate-y-1 hover:translate-x-1 transition-transform duration-150 shadow-[6px_6px_0px_0px_#ff5500] hover:shadow-none font-mono text-xs uppercase font-bold tracking-widest";
    strokeText = "text-transparent mix-blend-difference opacity-80";
    stickerColor = "bg-[#ff5500] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Symmetrical Homepage Storyboard scroll limits
  // ───────────────────────────────────────────────────────────────────────────

  // Panel 1: Hero Centered (0.00 – 0.20)
  const heroOpacity = scrollProgress <= 0.10 ? 1 : Math.max(0, 1 - (scrollProgress - 0.10) / 0.10);
  const heroTranslateY = scrollProgress <= 0.10 ? 0 : -(scrollProgress - 0.10) * 700; // slides up out
  const heroActive = scrollProgress <= 0.20;

  // Panel 2: Manifesto & Social Proof (0.20 – 0.40)
  let manifestoOpacity = 0;
  let manifestoTranslateY = 40;
  if (scrollProgress > 0.15 && scrollProgress <= 0.43) {
    if (scrollProgress <= 0.23) {
      const t = (scrollProgress - 0.15) / 0.08;
      manifestoOpacity = t;
      manifestoTranslateY = 40 - t * 40;
    } else if (scrollProgress > 0.23 && scrollProgress <= 0.35) {
      manifestoOpacity = 1;
      manifestoTranslateY = 0;
    } else {
      const t = (scrollProgress - 0.35) / 0.08;
      manifestoOpacity = Math.max(0, 1 - t);
      manifestoTranslateY = -t * 40;
    }
  }
  const manifestoActive = scrollProgress > 0.15 && scrollProgress <= 0.43;

  // Panel 3: Services Grid (0.40 – 0.65)
  let capOpacity = 0;
  let capTranslateY = 40;
  if (scrollProgress > 0.36 && scrollProgress <= 0.68) {
    if (scrollProgress <= 0.44) {
      const t = (scrollProgress - 0.36) / 0.08;
      capOpacity = t;
      capTranslateY = 40 - t * 40;
    } else if (scrollProgress > 0.44 && scrollProgress <= 0.60) {
      capOpacity = 1;
      capTranslateY = 0;
    } else {
      const t = (scrollProgress - 0.60) / 0.08;
      capOpacity = Math.max(0, 1 - t);
      capTranslateY = -t * 40;
    }
  }
  const capActive = scrollProgress > 0.36 && scrollProgress <= 0.68;
  const isCapPartA = scrollProgress <= 0.52; // toggles service sets automatically

  // Panel 4: Case Studies Highlight (0.65 – 0.85)
  let opOpacity = 0;
  let opTranslateY = 40;
  if (scrollProgress > 0.61 && scrollProgress <= 0.88) {
    if (scrollProgress <= 0.69) {
      const t = (scrollProgress - 0.61) / 0.08;
      opOpacity = t;
      opTranslateY = 40 - t * 40;
    } else if (scrollProgress > 0.69 && scrollProgress <= 0.80) {
      opOpacity = 1;
      opTranslateY = 0;
    } else {
      const t = (scrollProgress - 0.80) / 0.08;
      opOpacity = Math.max(0, 1 - t);
      opTranslateY = -t * 40;
    }
  }
  const opActive = scrollProgress > 0.61 && scrollProgress <= 0.88;

  // Panel 5: Contact Gateway (0.85 – 1.00)
  let contactOpacity = 0;
  let contactTranslateY = 40;
  if (scrollProgress > 0.81) {
    const t = Math.min(1, (scrollProgress - 0.81) / 0.10);
    contactOpacity = t;
    contactTranslateY = 40 - t * 40;
  }
  const contactActive = scrollProgress > 0.81;

  return (
    <div className="w-full h-[550vh] relative">
      {/* Native dynamic React 19 head SEO parameters */}
      <title>Vistar Studio // Premium Immersive WebGL & Software Engineering</title>
      <meta name="description" content="Vistar Studio is an elite digital engineering & design laboratory. We build high-performance WebGL websites and custom software systems for forward-thinking brands." />

      {/* Sticky Screen Locked container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none pointer-events-none z-20">
        
        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 1: HERO VIEWPORT (0.00 – 0.20)
            ───────────────────────────────────────────────────────────────────── */}
        <div 
          className={basePanelClass}
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTranslateY}px, 0)`,
            pointerEvents: heroActive ? "auto" : "none",
            display: heroActive || heroOpacity > 0.01 ? "flex" : "none"
          }}
        >
          {/* Trust stickers for premium professional vibe */}
          <div className={`absolute top-[22%] left-[8%] rotate-[-12deg] p-2 font-mono text-[9px] font-black z-30 ${stickerColor} hover:scale-110 hover:rotate-0 transition-transform cursor-pointer interactive`}>
            [HIGH PERFORMANCE]
          </div>
          <div className={`absolute bottom-[28%] right-[10%] rotate-[8deg] p-2 font-mono text-[9px] font-black z-30 ${stickerColor} hover:scale-110 hover:rotate-0 transition-transform cursor-pointer interactive`}>
            [PROVEN BUSINESS RESULTS]
          </div>
          <div className={`absolute top-[58%] left-[4%] rotate-[-25deg] p-2 font-mono text-[9px] font-black z-30 ${stickerColor} hover:scale-110 hover:rotate-0 transition-transform cursor-pointer interactive`}>
            [ENGINEERING ELITE]
          </div>

          <div className="w-full h-full flex flex-col justify-between px-6 md:px-12 py-16 pt-24 relative">
            <div className="w-full flex flex-col space-y-4">
              <div className="flex justify-between items-start select-none">
                <div className="space-y-0.5">
                  <span className={textSecondary}>Digital Engineering</span>
                </div>
                <div>
                  <span className={textSecondary}>Creative Excellence</span>
                </div>
              </div>

              {/* Huge brutalist H1 heading */}
              <TiltCard className="text-center w-full z-10 pt-4" intensity={15}>
                <h1 
                  id="hero-heading"
                  className={`text-[3.8rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9.5rem] font-black tracking-tighter leading-[0.8] ${textPrimary} uppercase`}
                  style={{ WebkitTextStroke: theme === 'cyber-dark' ? '2px #ccff00' : '4px black' }}
                >
                  Vistar <br /> <span className={strokeText} style={{ WebkitTextStroke: theme === 'cyber-dark' ? '2px #ff0080' : '4px black' }}>Studio</span>
                </h1>
              </TiltCard>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-0">
              <div className="font-mono text-[10px] font-black uppercase tracking-widest text-black bg-[#ccff00] border-4 border-black px-4 py-2 animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                SCROLL TO EXPLORE ↓
              </div>
            </div>

            {/* Premium, business-focused value deck with clear action buttons */}
            <TiltCard intensity={15} className="flex flex-col items-center text-center w-full max-w-xl mx-auto space-y-6 pb-6 z-10 relative">
              <div className={`p-5 font-sans text-xs md:text-sm font-medium text-left border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[8px_8px_0px_0px_#ccff00]' : ''} leading-relaxed`}>
                We build high-performance WebGL websites and custom software systems for forward-thinking brands who want to dominate the modern internet. No placeholders. Just elite speed, premium typography, and bulletproof engineering.
              </div>
              <div className="flex gap-4 w-full">
                <Link 
                  href="/contact"
                  id="hero-cta-primary"
                  className={`flex-grow py-4 text-center cursor-pointer interactive border-4 ${btnClass}`}
                >
                  Book Strategy Call →
                </Link>
                <button 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const target = window.innerHeight * 1.5;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }
                  }}
                  id="hero-cta-secondary"
                  className={`px-6 py-4 font-mono text-xs uppercase font-black cursor-pointer interactive border-4 bg-white text-black border-black hover:-translate-y-1 hover:translate-x-1 transition-transform shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none ${theme === 'cyber-dark' ? 'bg-neutral-900 border-[#ccff00] text-[#ccff00] shadow-[4px_4px_0px_#ccff00]' : ''}`}
                >
                  See Work
                </button>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 2: CORE MANIFESTO & TRUST (0.20 – 0.40)
            ───────────────────────────────────────────────────────────────────── */}
        <div 
          className={basePanelClass}
          style={{
            opacity: manifestoOpacity,
            transform: `translate3d(0, ${manifestoTranslateY}px, 0)`,
            pointerEvents: manifestoActive ? "auto" : "none",
            display: manifestoActive || manifestoOpacity > 0.01 ? "flex" : "none"
          }}
        >
          <div className="w-full flex flex-col justify-between h-full py-16 px-6 md:px-12 max-w-7xl mx-auto relative">
            <div className="w-full pt-10">
              <DoubleMarquees />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-stretch gap-8 my-auto">
              {/* Left Column: Clear Value Manifesto */}
              <TiltCard intensity={10} className={`md:w-[48%] space-y-5 p-8 border-4 bg-white text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[8px_8px_0px_0px_#ccff00]' : ''} flex flex-col justify-between`}>
                <div className="space-y-4">
                  <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white' : 'bg-[#ccff00] text-black border-black'} border-2 inline-block`}>
                    01 // THE SYSTEM RULES
                  </span>
                  <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                    Elite Visual <br/>Commercials
                  </h2>
                  <p className="font-sans text-xs leading-relaxed opacity-85">
                    A website is your strongest sales representative. We merge bespoke 3D geometry with ultra-fast web frameworks to create immersive experiences that attract high-ticket clients, validate pricing power, and command trust.
                  </p>
                </div>
                
                {/* Symmetrical Partner Logos Row to inject immediate social trust */}
                <div className="pt-6 border-t-2 border-dashed border-neutral-300 dark:border-zinc-800">
                  <span className="font-mono text-[8px] font-bold text-neutral-400 block mb-2 uppercase">TRUSTED PARTNER DEPLOYMENTS:</span>
                  <div className="grid grid-cols-4 gap-2 font-mono text-[10px] font-black text-center text-neutral-500">
                    <span className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 py-1.5 rounded">[QUANTUM]</span>
                    <span className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 py-1.5 rounded">[APEX]</span>
                    <span className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 py-1.5 rounded">[LINEAR]</span>
                    <span className="bg-neutral-100 dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 py-1.5 rounded">[VERTEX]</span>
                  </div>
                </div>
              </TiltCard>
              
              {/* Right Column: Premium High-Fidelity Testimonials */}
              <TiltCard intensity={10} className={`md:w-[48%] space-y-4 p-8 border-4 bg-white text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[8px_8px_0px_0px_#ccff00]' : ''} flex flex-col justify-between`}>
                <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 ${theme === 'cyber-dark' ? 'bg-[#ccff00] text-black border-black' : 'bg-[#ff0080] text-white border-black'} border-2 inline-block self-start`}>
                  CLIENT SUCCESS
                </span>
                
                <div className="font-sans text-xs italic leading-relaxed font-medium">
                  &quot;Vistar redesigned our enterprise platform with custom shaders and edge routes. The result? A 38% increase in organic sign-ups and zero lag complaints from our users. They are actual engineers who understand business metrics.&quot;
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-200 dark:border-zinc-800 font-mono text-[9px]">
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-neutral-200 flex items-center justify-center font-black">M</div>
                  <div>
                    <p className="font-black uppercase text-black dark:text-white">Marcus Vance</p>
                    <p className="text-neutral-400">Founder, Quantum Exchange</p>
                  </div>
                </div>
              </TiltCard>
            </div>
            
            <div className="w-full font-mono text-[9px] text-neutral-400 text-center tracking-widest">
              [ STAGE 02 // COMMERCIALS_AND_PROOF ]
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 3: CORE SERVICES BREAKDOWN (0.40 – 0.65)
            ───────────────────────────────────────────────────────────────────── */}
        <div 
          className={basePanelClass}
          style={{
            opacity: capOpacity,
            transform: `translate3d(0, ${capTranslateY}px, 0)`,
            pointerEvents: capActive ? "auto" : "none",
            display: capActive || capOpacity > 0.01 ? "flex" : "none"
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-16 relative">
            <div className="pt-10 flex justify-between items-end">
              <h2 className={`font-sans text-[2.2rem] md:text-[3.5rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                Professional // <br/> <span className="font-mono">[ Services ]</span>
              </h2>
              <span className="font-mono text-[9px] font-black text-neutral-400 hidden sm:inline-block">ENGAGEMENTS START FROM $15K</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 my-auto">
              {/* Space for logo on the left side */}
              <div className="md:w-[48%]" />

              {/* Dynamic Service Grid Card on the right side */}
              <div className="md:w-[48%] w-full relative h-[310px]">
                {/* SERVICES PART A */}
                <div 
                  className="absolute inset-0 space-y-5 transition-all duration-500 flex flex-col justify-center animate-fade-in"
                  style={{
                    opacity: isCapPartA ? 1 : 0,
                    transform: `translate3d(0, ${isCapPartA ? 0 : -30}px, 0)`,
                    pointerEvents: isCapPartA ? "auto" : "none"
                  }}
                >
                  <TiltCard intensity={8} className={`p-6 border-4 bg-white text-black border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[6px_6px_0px_0px_#ccff00]' : ''}`}>
                    <h3 className="text-lg md:text-xl font-bold uppercase mb-2">★ 3D WebGL Experiences</h3>
                    <p className="font-sans text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Custom shader architectures, fluid simulations, and responsive 3D bevel models deployed directly to the browser for cinematic interactive storytelling. High-end visual impact that commands user attention.
                    </p>
                  </TiltCard>
                  
                  <TiltCard intensity={8} className={`p-6 border-4 bg-[#ccff00] text-black border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]' : ''}`}>
                    <h3 className="text-lg md:text-xl font-bold uppercase mb-2">★ High-Performance Frontends</h3>
                    <p className="font-sans text-[11px] text-neutral-800 dark:text-neutral-100 leading-relaxed font-medium">
                      Pixel-perfect React and Next.js applications engineered with extreme performance. Locked at 144Hz, optimized for sub-second page loads, excellent SEO parameters, and pristine responsive visual hierarchies.
                    </p>
                  </TiltCard>
                </div>

                {/* SERVICES PART B */}
                <div 
                  className="absolute inset-0 space-y-5 transition-all duration-500 flex flex-col justify-center"
                  style={{
                    opacity: !isCapPartA ? 1 : 0,
                    transform: `translate3d(0, ${!isCapPartA ? 0 : 30}px, 0)`,
                    pointerEvents: !isCapPartA ? "auto" : "none"
                  }}
                >
                  <TiltCard intensity={8} className={`p-6 border-4 bg-[#ff0080] text-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-[#ccff00] text-black border-black shadow-[6px_6px_0px_0px_#ccff00]' : ''}`}>
                    <h3 className="text-lg md:text-xl font-bold uppercase mb-2">★ Custom Digital Architecture</h3>
                    <p className="font-sans text-[11px] text-white/90 dark:text-neutral-800 leading-relaxed">
                      Heavy-duty, secure backend compilers, scalable cloud databases, API routers, and parameter checks built for massive data scaling. Zero latency execution trees optimized for bulletproof enterprise stability.
                    </p>
                  </TiltCard>

                  <TiltCard intensity={8} className={`p-6 border-4 bg-black text-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-white border-[#ff0080] shadow-[6px_6px_0px_0px_#ff0080]' : ''}`}>
                    <h3 className="text-lg md:text-xl font-bold uppercase mb-2">★ Technical Strategy & Branding</h3>
                    <p className="font-sans text-[11px] text-neutral-300 leading-relaxed">
                      We advise businesses on engineering choices, audit legacy stacks for bottlenecks, and establish radical brutalist designs that break out of generic SaaS landing page patterns to maximize conversions.
                    </p>
                  </TiltCard>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between font-mono text-[9px] text-neutral-400">
              <span>[ STEP 03 // SERVICES_OVERVIEW ]</span>
              <span>SCROLL TO SHIFT FOCUS {isCapPartA ? "➔ PART B" : "➔ PORTAL"}</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 4: PREMIUM PORTFOLIO & CASE STUDIES (0.65 – 0.85)
            ───────────────────────────────────────────────────────────────────── */}
        <div 
          className={basePanelClass}
          style={{
            opacity: opOpacity,
            transform: `translate3d(0, ${opTranslateY}px, 0)`,
            pointerEvents: opActive ? "auto" : "none",
            display: opActive || opOpacity > 0.01 ? "flex" : "none"
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-16 relative">
            <div className="pt-10 flex flex-col items-center text-center">
              <span className={`font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white' : 'bg-[#ccff00] text-black border-black'} border-2 inline-block mb-3`}>
                CASE_STUDY_01 // QUANTUM_EXCHANGE
              </span>
              <h2 className={`text-4xl md:text-[4rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                38% CONVERSION BOOST
              </h2>
            </div>

            {/* Case study metrics card, surrounded by text and links */}
            <div className="my-auto w-full flex justify-between items-center md:flex-row flex-col gap-6 pointer-events-auto">
              <TiltCard intensity={10} className={`p-6 max-w-sm border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[6px_6px_0px_0px_#ccff00]' : ''} text-left`}>
                <p className="font-mono text-[9px] font-black uppercase tracking-wider mb-2 text-[#ff0080] dark:text-[#ccff00]">{"//"} QUANTUM METRIC DELIVERABLE</p>
                <h3 className="font-sans text-xl font-bold uppercase mb-2">High-Performance Shader Trading</h3>
                <p className="font-sans text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                  Custom WebGL platform displaying sub-millisecond real-time ledger metrics. Optimized rendering threads straight to the GPU, increasing user session times by 140% and completely eliminating transaction lag.
                </p>
              </TiltCard>

              <div className="md:w-[35%] h-[10px]" /> {/* Spacer for centered 3D logo */}

              <div className="flex flex-col items-center gap-4">
                <p className="font-mono text-[10px] font-bold text-neutral-400 text-center uppercase tracking-widest">WANT TO SEE THE COMPLETE ARCHIVE?</p>
                <Link 
                  href="/work"
                  id="homepage-view-archive-link"
                  className={`inline-block py-4 px-8 border-4 text-center cursor-pointer interactive ${btnClass}`}
                >
                  Explore Case Studies →
                </Link>
              </div>
            </div>

            <div className="w-full font-mono text-[9px] text-neutral-400 text-center tracking-widest">
              [ STAGE 04 // REAL_WORLD_RESULTS ]
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 5: CONTACT GATEWAY & FOOTER (0.85 – 1.00)
            ───────────────────────────────────────────────────────────────────── */}
        <div 
          className={basePanelClass}
          style={{
            opacity: contactOpacity,
            transform: `translate3d(0, ${contactTranslateY}px, 0)`,
            pointerEvents: contactActive ? "auto" : "none",
            display: contactActive || contactOpacity > 0.01 ? "flex" : "none"
          }}
        >
          {/* Logo is positioned near top center as a glowing beacon, contact card in center */}
          <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-10 h-full relative pt-[160px]">
            
            <div className="my-auto w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-6">
              <TiltCard intensity={15}>
                <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.8]" style={{ WebkitTextStroke: theme === 'solar' ? '2px #ff5500' : 'none' }}>
                  INITIATE <br/> YOUR SYSTEM
                </h2>
              </TiltCard>
              
              <div className="font-sans text-xs md:text-sm font-semibold max-w-lg opacity-85 leading-relaxed">
                Ready to deploy an elite digital experience? Inquire today. Typical project engagements start from $15,000. All direct compiles are covered by our 24-hour response SLA.
              </div>

              <Link 
                href="/contact"
                id="homepage-connect-button"
                className={`inline-block py-5 px-10 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:translate-x-2 transition-transform duration-150 hover:shadow-none font-mono text-sm uppercase font-bold tracking-widest cursor-pointer interactive ${
                  theme === 'cyber-dark' 
                    ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[8px_8px_0px_0px_#ff0080]' 
                    : theme === 'mono' 
                    ? 'bg-white text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-[#ff0080] text-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                Inquire Project Coordinates →
              </Link>
            </div>

            {/* Premium, business-credible footer layout */}
            <div className="border-t-4 border-black/10 pt-4 flex flex-col sm:flex-row justify-between items-center font-mono text-[9px] text-neutral-400 gap-2 select-none">
              <span>© VISTAR LABS. EST 2026 {"//"} DIGITAL EXCELLENCE DIVISION.</span>
              <div className="flex gap-4">
                <span>EMAIL: HELLO@VISTAR.TECH</span>
                <span>/</span>
                <span>SLA: 24HR COMPILE GUARANTEE</span>
              </div>
            </div>
          </div>
        </div>

        {/* SYS.DEPTH_TRACKER - Symmetrical Vertical Progress Indicator */}
        <div 
          className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-6 font-mono text-[9px] uppercase font-black tracking-widest text-zinc-400 select-none pointer-events-auto"
          aria-label="Story progress indicator"
        >
          <span className="rotate-90 origin-center whitespace-nowrap mb-4 translate-x-1.5 opacity-60">SYS.DEPTH_TRACKER</span>
          
          <div className="flex flex-col gap-4 relative">
            {/* The vertical timeline track */}
            <div className="absolute left-1.5 top-0 bottom-0 w-[4px] bg-black/10 border border-black/5" />
            <div 
              className="absolute left-1.5 top-0 w-[4px] bg-[#ccff00] transition-all duration-300"
              style={{
                height: `${scrollProgress * 100}%`,
                backgroundColor: theme === 'cyber-dark' ? '#ccff00' : theme === 'solar' ? '#ffcc00' : '#ff0080'
              }}
            />

            {/* Stages steps */}
            {[
              { num: "01", label: "SHOWCASE", min: 0.00, max: 0.20 },
              { num: "02", label: "PROOF_OF_TRUST", min: 0.20, max: 0.40 },
              { num: "03", label: "SERVICES", min: 0.40, max: 0.65 },
              { num: "04", label: "CASE_STUDIES", min: 0.65, max: 0.85 },
              { num: "05", label: "GATEWAY", min: 0.85, max: 1.00 }
            ].map((step, idx) => {
              const active = scrollProgress >= step.min - 0.02 && scrollProgress <= step.max + 0.02;
              let stepColor = "text-zinc-400";
              let stepHighlight = "translate-x-0";
              
              if (active) {
                stepColor = theme === 'cyber-dark' ? 'text-[#ccff00] font-black scale-105' : theme === 'solar' ? 'text-[#ffcc00] font-black scale-105' : 'text-[#ff0080] font-black scale-105';
                stepHighlight = "-translate-x-2";
              }

              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-3 transition-all duration-300 ${stepColor} ${stepHighlight}`}
                >
                  <div 
                    className={`w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center text-[7px] font-mono z-10 transition-colors ${
                      active 
                        ? (theme === 'cyber-dark' ? 'border-[#ccff00] bg-black' : theme === 'solar' ? 'border-[#ffcc00] bg-black' : 'border-[#ff0080] bg-black')
                        : 'border-zinc-300'
                    }`}
                  >
                    {step.num}
                  </div>
                  <span className="hidden md:inline-block font-black select-none">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
