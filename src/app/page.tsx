"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";

// ─────────────────────────────────────────────────────────────────────────────
// Sleek Horizontal Luxury Ticker
// ─────────────────────────────────────────────────────────────────────────────
function SingleMarquee() {
  const theme = useScrollStore((s) => s.theme);
  
  let marqueeBg = "bg-[#ccff00] text-black border-y-[3px] border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]";
  
  if (theme === "cyber-dark") {
    marqueeBg = "bg-[#ff0080] text-white border-y-[3px] border-black shadow-[4px_4px_0px_#ff0080] rotate-[1deg]";
  } else if (theme === "mono") {
    marqueeBg = "bg-black text-white border-y-[3px] border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]";
  } else if (theme === "solar") {
    marqueeBg = "bg-[#ffcc00] text-black border-y-[3px] border-[#100501] shadow-[4px_4px_0px_#ff5500] rotate-[1deg]";
  }

  return (
    <div className={`relative py-5 overflow-hidden select-none w-full transition-all duration-300 transform-gpu ${marqueeBg}`}>
      <div className="flex w-[200%] gap-4 animate-[marquee_25s_linear_infinite] will-change-transform font-mono text-xs font-black uppercase tracking-[0.2em]">
        <span className="flex items-center gap-12 whitespace-nowrap">
          Vistar Studio • Digital Engineering • Premium 3D Shaders • High-Performance React • Design Laboratory • Enterprise Speed • Sincere Solutions
        </span>
        <span className="flex items-center gap-12 whitespace-nowrap">
          Vistar Studio • Digital Engineering • Premium 3D Shaders • High-Performance React • Design Laboratory • Enterprise Speed • Sincere Solutions
        </span>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
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
  const scrollVelocity = useScrollStore((s) => s.scrollVelocity);
  
  const {
    theme,
    textPrimary,
    textSecondary,
    tagLabel,
    btnPrimary,
    panelCard,
    innerCore,
    outlineBtn,
    strokeColor,
  } = useThemeStyles();

  const fillColor = {
    "cyber-light": "text-[#ccff00]",
    "cyber-dark": "text-[#ff0080]",
    mono: "text-white",
    solar: "text-[#ffcc00]"
  }[theme];

  const basePanelClass = "absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ease-out";

  // ───────────────────────────────────────────────────────────────────────────
  // Non-Overlapping Symmetrical Storyboard Scroll Slices
  // ───────────────────────────────────────────────────────────────────────────

  // Panel 1: Hero Centered (0.00 – 0.15)
  // Visible: 0.00 - 0.15. Fades out from 0.08 to 0.15.
  const heroActive = scrollProgress <= 0.15;
  const heroOpacity = scrollProgress <= 0.08 ? 1 : Math.max(0, 1 - (scrollProgress - 0.08) / 0.07);
  const heroTranslateY = scrollProgress <= 0.08 ? 0 : -(scrollProgress - 0.08) * 800; // swift exit up

  // Panel 2: Manifesto & Proof (0.15 – 0.35)
  // Visible: 0.15 - 0.35. Fades in 0.15-0.20, static 0.20-0.30, fades out 0.30-0.35.
  const manifestoActive = scrollProgress > 0.15 && scrollProgress <= 0.35;
  let manifestoOpacity = 0;
  let manifestoTranslateY = 0;
  if (manifestoActive) {
    if (scrollProgress <= 0.20) {
      const t = (scrollProgress - 0.15) / 0.05;
      manifestoOpacity = t;
      manifestoTranslateY = 20 * (1 - t);
    } else if (scrollProgress > 0.20 && scrollProgress <= 0.30) {
      manifestoOpacity = 1;
      manifestoTranslateY = 0;
    } else {
      const t = (scrollProgress - 0.30) / 0.05;
      manifestoOpacity = Math.max(0, 1 - t);
      manifestoTranslateY = -20 * t;
    }
  }

  // Panel 3: Services Grid (0.35 – 0.60)
  // Visible: 0.35 - 0.60. Fades in 0.35-0.40, static 0.40-0.55, fades out 0.55-0.60.
  const capActive = scrollProgress > 0.35 && scrollProgress <= 0.60;
  let capOpacity = 0;
  let capTranslateY = 0;
  if (capActive) {
    if (scrollProgress <= 0.40) {
      const t = (scrollProgress - 0.35) / 0.05;
      capOpacity = t;
      capTranslateY = 20 * (1 - t);
    } else if (scrollProgress > 0.40 && scrollProgress <= 0.55) {
      capOpacity = 1;
      capTranslateY = 0;
    } else {
      const t = (scrollProgress - 0.55) / 0.05;
      capOpacity = Math.max(0, 1 - t);
      capTranslateY = -20 * t;
    }
  }
  const isCapPartA = scrollProgress <= 0.48; // shifts focus cleanly mid-slide

  // Panel 4: Case Studies Highlight (0.60 – 0.80)
  // Visible: 0.60 - 0.80. Fades in 0.60-0.65, static 0.65-0.75, fades out 0.75-0.80.
  const opActive = scrollProgress > 0.60 && scrollProgress <= 0.80;
  let opOpacity = 0;
  let opTranslateY = 0;
  if (opActive) {
    if (scrollProgress <= 0.65) {
      const t = (scrollProgress - 0.60) / 0.05;
      opOpacity = t;
      opTranslateY = 20 * (1 - t);
    } else if (scrollProgress > 0.65 && scrollProgress <= 0.75) {
      opOpacity = 1;
      opTranslateY = 0;
    } else {
      const t = (scrollProgress - 0.75) / 0.05;
      opOpacity = Math.max(0, 1 - t);
      opTranslateY = -20 * t;
    }
  }

  // Panel 5: Contact Gateway (0.80 – 1.00)
  // Visible: 0.80 - 1.00. Fades in 0.80-0.85, static 0.85-1.00.
  const contactActive = scrollProgress > 0.80;
  let contactOpacity = 0;
  let contactTranslateY = 0;
  if (contactActive) {
    if (scrollProgress <= 0.85) {
      const t = (scrollProgress - 0.80) / 0.05;
      contactOpacity = t;
      contactTranslateY = 20 * (1 - t);
    } else {
      contactOpacity = 1;
      contactTranslateY = 0;
    }
  }

  return (
    <div className="w-full h-[550vh] relative">
      {/* Native dynamic React 19 head SEO parameters */}
      <title>Vistar Studio // Premium Immersive WebGL & Software Engineering</title>
      <meta name="description" content="Vistar Studio is an elite digital engineering & design laboratory. We build high-performance WebGL websites and custom software systems for forward-thinking brands." />

      {/* Sticky Screen Locked container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none pointer-events-none z-20">
        {/* Dynamic Manga Speed lines overlay */}
        <div className={`absolute inset-0 z-0 opacity-25 transition-colors duration-500 ${theme === 'cyber-dark' ? 'manga-action-lines-white' : 'manga-action-lines'}`} />
        
        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 1: HERO VIEWPORT
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
          <div className="w-full h-full flex flex-col justify-between px-6 md:px-12 py-16 pt-24 relative">
            <div className="w-full flex flex-col space-y-4">
              <div className="flex justify-between items-start select-none">
                <span className={tagLabel}>Digital Engineering</span>
                <span className={tagLabel}>Creative Laboratory</span>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center my-auto space-y-8 z-10 relative">
              {/* Vibrant comic-book colored sound-effect starburst sticker */}
              <div className="absolute right-[5%] sm:right-[12%] top-[-10%] z-30 select-none pointer-events-none manhwa-sfx-starburst">
                <div className="relative flex items-center justify-center">
                  <svg className="w-24 h-24 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] text-[#ffcc00] dark:text-[#00ffff] transition-colors duration-300" style={{
                    color: theme === 'cyber-light' ? '#ffd200' : theme === 'cyber-dark' ? '#00ffff' : theme === 'solar' ? '#ffaa00' : '#ffffff'
                  }} viewBox="0 0 100 100">
                    <polygon
                      points="50,5 60,30 85,20 70,45 95,50 70,55 85,80 60,70 50,95 40,70 15,80 30,55 5,50 30,45 15,20 40,30"
                      fill="currentColor"
                      stroke="black"
                      strokeWidth="3.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                  <span className="absolute font-mono text-[9px] sm:text-[10px] font-black uppercase text-black rotate-[-12deg] tracking-widest">
                    SWOSH!
                  </span>
                </div>
              </div>

              {/* Huge elegant H1 heading */}
              <TiltCard className="text-center w-full z-10 pt-4" intensity={10}>
                <h1 
                  id="hero-heading"
                  className={`text-[3.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[8rem] font-black tracking-tighter leading-none uppercase flex flex-wrap justify-center items-center gap-x-6 select-none`}
                >
                  <span 
                    className={`font-black drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] ${fillColor}`}
                    style={{ WebkitTextStroke: "3.5px #000" }}
                  >
                    Vistar
                  </span>
                  <span 
                    className="text-transparent font-black drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]"
                    style={{ WebkitTextStroke: "3.5px #000" }}
                  >
                    Studio
                  </span>
                </h1>
                <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-400 font-bold uppercase mt-4 select-none">
                  Interactive Software & Architectural Graphics Laboratory
                </p>
              </TiltCard>

              {/* Centered clean tagline, initialize button and comic badge */}
              <div className="max-w-xl mx-auto text-center space-y-6 pt-4 relative select-none">
                {/* Floating comic speech bubble with true outlined pointer tail */}
                <div className={`absolute -top-16 left-1/2 -translate-x-1/2 z-30 bg-[#ccff00] text-black border-[3.5px] border-black font-mono text-[8px] sm:text-[10px] font-black px-5 py-2.5 rounded-2xl shadow-[4px_4px_0px_#000] rotate-[-3deg] uppercase tracking-wider animate-bounce select-none ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white shadow-[4px_4px_0px_#000]' : ''}`}>
                  "ENGINEERING EXCELLENCE ACTIVE!"
                  {/* True comic speech bubble pointer tail */}
                  <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-4 text-[#ccff00] fill-current filter drop-shadow-[0px_3.5px_0px_rgba(0,0,0,1)]" style={{ color: theme === 'cyber-dark' ? '#ff0080' : theme === 'solar' ? '#ffcc00' : theme === 'cyber-light' ? '#ccff00' : '#ffffff' }} viewBox="0 0 40 20">
                    <path d="M 10,0 L 20,15 L 30,0 Z" stroke="black" strokeWidth="3.5" strokeLinejoin="round" />
                  </svg>
                </div>
                
                <p className={`font-sans text-xs md:text-sm font-light leading-relaxed max-w-md mx-auto text-center pt-2 ${textSecondary}`}>
                  A premium digital architecture laboratory. We design and build high-fidelity interactive software ecosystems that remove transactional friction at absolute international scale.
                </p>
                <div className="pt-2 select-none pointer-events-auto interactive flex justify-center gap-4">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const target = window.innerHeight * 0.95;
                        window.scrollTo({ top: target, behavior: "smooth" });
                      }
                    }}
                    className="px-8 py-3.5 font-mono text-[10px] font-black uppercase tracking-[0.15em] bg-black text-white hover:bg-[#ccff00] hover:text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-2 select-none pointer-events-auto"
                  >
                    <span>Initialize Deck</span>
                    <span>↓</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-0">
              <div className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2.5 rounded-full border shadow-sm backdrop-blur-md animate-bounce ${
                theme === 'cyber-dark' 
                  ? 'bg-black/60 border-zinc-800 text-neutral-400' 
                  : theme === 'solar' 
                  ? 'bg-[#130702]/60 border-[#ff5500]/15 text-[#ffcc00]' 
                  : 'bg-white/80 border-neutral-200/80 text-neutral-600'
              }`}>
                SCROLL TO EXPLORE ↓
              </div>
            </div>

            {/* Symmetrical System Telemetry Card - Bottom Left */}
            <div className="absolute bottom-6 left-6 z-35 hidden md:block">
              <div className={`p-4 border-[3px] border-black bg-[#fdfbf7] dark:bg-black font-mono text-[9px] w-64 rounded-xl shadow-[4px_4px_0px_#000] transition-colors duration-300 ${theme === 'cyber-dark' ? 'border-[#ff0080] shadow-[4px_4px_0px_#ff0080]' : ''}`}>
                <div className="flex justify-between items-center border-b-2 border-current pb-1.5 mb-2 font-black select-none">
                  <span className="text-[#ff0080]">SYSTEM TELEMETRY</span>
                  <span className="animate-pulse flex items-center gap-1 text-current">● LIVE</span>
                </div>
                <div className="space-y-1.5 font-bold uppercase text-neutral-400">
                  <div className="flex justify-between">
                    <span>SCROLL PROGRESS:</span>
                    <span className="text-black dark:text-white bg-[#ccff00] dark:bg-[#ff0080]/20 px-1 py-0.5 rounded text-[8px]">{(scrollProgress * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SCROLL VELOCITY:</span>
                    <span className="text-black dark:text-white bg-[#ccff00] dark:bg-[#ff0080]/20 px-1 py-0.5 rounded text-[8px]">{scrollVelocity.toFixed(0)} PX/S</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ENGINE FPS:</span>
                    <span className="text-black dark:text-white bg-neutral-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-[8px]">60.0 FPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>THEME PROFILE:</span>
                    <span className="text-black dark:text-white bg-neutral-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-[8px]">{theme.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 2: CORE MANIFESTO & TRUST
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
              <SingleMarquee />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-stretch gap-8 my-auto">
              {/* Left Column: Clear Value Manifesto */}
              <TiltCard intensity={5} className={`${panelCard} md:w-[48%] flex flex-col justify-between transform-gpu`}>
                <div className={`${innerCore} h-full space-y-6 flex flex-col justify-between`}>
                  <div className="space-y-4">
                    <span className={tagLabel}>
                      01 / Approach
                    </span>
                    <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                      Elite Visual <br/>Experiences
                    </h2>
                    <p className={`font-sans text-xs leading-relaxed font-light ${textSecondary}`}>
                      A website is your strongest sales representative. We merge bespoke 3D geometry with ultra-fast web frameworks to create immersive experiences that attract high-ticket clients, validate pricing power, and command trust.
                    </p>
                  </div>
                  
                  {/* Technology Stack Trust Badges */}
                  <div className={`pt-6 border-t border-dashed ${theme === 'cyber-dark' ? 'border-zinc-900' : 'border-neutral-200'}`}>
                    <span className="font-mono text-[8px] font-bold text-neutral-400 block mb-2 uppercase tracking-wider">CORE SYSTEM STACK:</span>
                    <div className="grid grid-cols-4 gap-2 font-mono text-[9px] font-bold text-center text-neutral-500">
                      <span className={`py-1.5 rounded border border-transparent ${theme === 'cyber-dark' ? 'bg-zinc-950 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>React</span>
                      <span className={`py-1.5 rounded border border-transparent ${theme === 'cyber-dark' ? 'bg-zinc-950 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>Next.js</span>
                      <span className={`py-1.5 rounded border border-transparent ${theme === 'cyber-dark' ? 'bg-zinc-950 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>Three.js</span>
                      <span className={`py-1.5 rounded border border-transparent ${theme === 'cyber-dark' ? 'bg-zinc-950 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>WebGL</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
              
              {/* Right Column: Premium High-Fidelity Testimonials */}
              <TiltCard intensity={5} className={`${panelCard} md:w-[48%] flex flex-col justify-between transform-gpu`}>
                <div className={`${innerCore} h-full space-y-6 flex flex-col justify-between`}>
                  <span className={`${tagLabel} self-start`}>
                    02 / Outcome
                  </span>
                  
                  <div className={`font-serif text-xs md:text-sm italic leading-relaxed font-normal ${textPrimary}`}>
                    &quot;Vistar delivered clean, premium architectures operating with perfect technical precision. Their engineering and design decisions directly impacted our bottom-line conversion goals — a 38% increase in organic sign-ups.&quot;
                  </div>
                  
                  <div className={`flex items-center gap-3 pt-4 border-t border-dashed ${theme === 'cyber-dark' ? 'border-zinc-900' : 'border-neutral-200'} font-mono text-[9px]`}>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${theme === 'cyber-dark' ? 'border-[#ff0080] bg-black text-[#ff0080]' : theme === 'solar' ? 'border-[#ffcc00] bg-black text-[#ffcc00]' : 'border-black bg-neutral-900 text-white'}`}>★</div>
                    <div>
                      <p className={`font-bold uppercase ${textPrimary}`}>Principal Architect</p>
                      <p className="text-neutral-400">Software Solutions Division</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 3: CORE SERVICES BREAKDOWN
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
            {/* Slanted services manga sticker */}
            <div className="absolute left-[4%] top-[24%] z-30 hidden lg:block select-none pointer-events-none manhwa-sfx-starburst-left">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] text-[#ff0080] dark:text-[#ccff00] transition-colors duration-300" style={{
                  color: theme === 'cyber-light' ? '#ff0080' : theme === 'cyber-dark' ? '#ccff00' : theme === 'solar' ? '#ff5500' : '#ffffff'
                }} viewBox="0 0 100 100">
                  <polygon
                    points="50,5 60,30 85,20 70,45 95,50 70,55 85,80 60,70 50,95 40,70 15,80 30,55 5,50 30,45 15,20 40,30"
                    fill="currentColor"
                    stroke="black"
                    strokeWidth="3.5"
                    strokeLinejoin="miter"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-black uppercase text-black rotate-[-10deg] tracking-widest">
                  BAM!
                </span>
              </div>
            </div>

            <div className="pt-10 flex justify-between items-end">
              <h2 className={`font-sans text-[2rem] md:text-[3.2rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                Services & <br/> <span className="font-mono text-[#ff0080]" style={{ color: theme === 'solar' ? '#ff5500' : theme === 'cyber-dark' ? '#ff0080' : '' }}>Capabilities</span>
              </h2>
              <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider hidden sm:inline-block">ENGAGEMENTS FROM $15K</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 my-auto">
              <div className="md:w-[48%]" /> {/* Spacer for 3D graphic */}

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
                  <TiltCard intensity={4} className={panelCard}>
                    <div className={innerCore}>
                      <h3 className={`text-xs md:text-sm font-bold uppercase mb-1.5 tracking-wider ${textPrimary}`}>★ 3D WebGL Experiences</h3>
                      <p className={`font-sans text-[11px] font-light leading-relaxed ${textSecondary}`}>
                        Custom shader architectures, fluid simulations, and responsive 3D bevel models deployed directly to the browser for cinematic interactive storytelling. High-end visual impact that commands user attention.
                      </p>
                    </div>
                  </TiltCard>
                  
                  <TiltCard intensity={4} className={panelCard}>
                    <div className={`${innerCore}`}>
                      <h3 className={`text-xs md:text-sm font-bold uppercase mb-1.5 tracking-wider ${theme === 'cyber-dark' ? 'text-[#ff0080]' : theme === 'solar' ? 'text-[#ffcc00]' : 'text-neutral-900'}`}>
                        ★ High-Performance Frontends
                      </h3>
                      <p className={`font-sans text-[11px] font-light leading-relaxed ${textSecondary}`}>
                        Pixel-perfect React and Next.js applications engineered with extreme performance. Locked at 144Hz, optimized for sub-second page loads, excellent SEO parameters, and pristine responsive visual hierarchies.
                      </p>
                    </div>
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
                  <TiltCard intensity={4} className={panelCard}>
                    <div className={innerCore}>
                      <h3 className={`text-xs md:text-sm font-bold uppercase mb-1.5 tracking-wider ${textPrimary}`}>★ Custom Digital Architecture</h3>
                      <p className={`font-sans text-[11px] font-light leading-relaxed ${textSecondary}`}>
                        Heavy-duty, secure backend compilers, scalable cloud databases, API routers, and parameter checks built for massive data scaling. Zero latency execution trees optimized for bulletproof enterprise stability.
                      </p>
                    </div>
                  </TiltCard>

                  <TiltCard intensity={4} className={panelCard}>
                    <div className={innerCore}>
                      <h3 className={`text-xs md:text-sm font-bold uppercase mb-1.5 tracking-wider ${textPrimary}`}>★ Technical Strategy & Branding</h3>
                      <p className={`font-sans text-[11px] font-light leading-relaxed ${textSecondary}`}>
                        We advise businesses on engineering choices, audit legacy stacks for bottlenecks, and establish radical brutalist designs that break out of generic SaaS landing page patterns to maximize conversions.
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 4: PREMIUM PORTFOLIO & CASE STUDIES
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
            {/* Slanted case studies manga sticker */}
            <div className="absolute right-[8%] top-[20%] z-30 hidden lg:block select-none pointer-events-none manhwa-sfx-starburst">
              <div className="relative flex items-center justify-center">
                <svg className="w-24 h-24 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] text-[#ccff00] dark:text-[#ff0080] transition-colors duration-300" style={{
                  color: theme === 'cyber-light' ? '#ccff00' : theme === 'cyber-dark' ? '#ff0080' : theme === 'solar' ? '#ffcc00' : '#ffffff'
                }} viewBox="0 0 100 100">
                  <polygon
                    points="50,5 60,30 85,20 70,45 95,50 70,55 85,80 60,70 50,95 40,70 15,80 30,55 5,50 30,45 15,20 40,30"
                    fill="currentColor"
                    stroke="black"
                    strokeWidth="3.5"
                    strokeLinejoin="miter"
                  />
                </svg>
                <span className="absolute font-mono text-[10px] font-black uppercase text-black rotate-[-12deg] tracking-widest">
                  BOOM!
                </span>
              </div>
            </div>

            <div className="pt-10 flex flex-col items-center text-center">
              <span className={tagLabel}>
                Case Study / Quantum Exchange
              </span>
              <h2 className={`text-3xl md:text-[3.5rem] font-black uppercase tracking-tighter leading-none ${textPrimary} mt-3`}>
                38% CONVERSION BOOST
              </h2>
            </div>

            {/* Case study metrics card */}
            <div className="my-auto w-full flex justify-between items-center md:flex-row flex-col gap-6 pointer-events-auto">
              <TiltCard intensity={5} className={`${panelCard} max-w-sm w-full transform-gpu`}>
                <div className={`${innerCore} h-full text-left space-y-3`}>
                  <p className={`font-mono text-[8px] font-bold uppercase tracking-wider mb-1 text-neutral-400`}>Verified Deliverable Metric</p>
                  <h3 className={`font-sans text-base font-bold uppercase ${textPrimary}`}>High-Performance Shader Trading</h3>
                  <p className={`font-sans text-[11px] font-light leading-relaxed ${textSecondary}`}>
                    Custom WebGL platform displaying sub-millisecond real-time ledger metrics. Optimized rendering threads straight to the GPU, increasing user session times by 140% and completely eliminating transaction lag.
                  </p>
                </div>
              </TiltCard>

              <div className="md:w-[35%] h-[10px]" /> {/* Spacer for centered 3D logo */}

              <div className="flex flex-col items-center gap-4">
                <Link 
                  href="/work"
                  id="homepage-view-archive-link"
                  className={btnPrimary}
                >
                  <span>Explore Case Studies</span>
                  <span className="w-5 h-5 rounded-full bg-current/15 flex items-center justify-center font-bold text-xs shrink-0 transform-gpu transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1.5px] ease-[cubic-bezier(0.16,1,0.3,1)]">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 5: CONTACT GATEWAY & FOOTER
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
          <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-10 h-full relative pt-[160px]">
            
            <div className="my-auto w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-6">
              <TiltCard intensity={10}>
                <h2 className={`text-[3.2rem] sm:text-[4.2rem] md:text-[5rem] font-black uppercase tracking-tighter leading-[0.8] ${textPrimary}`} style={{ WebkitTextStroke: theme === 'solar' ? '1.5px #ff5500' : 'none' }}>
                  Start Your <br/>Project
                </h2>
              </TiltCard>
              
              <div className={`font-sans text-xs md:text-sm font-light max-w-lg leading-relaxed ${textSecondary}`}>
                Ready to deploy an elite digital experience? Inquire today. Typical project engagements start from $15,000. All direct compiles are covered by our 24-hour response SLA.
              </div>

              <Link 
                href="/contact"
                id="homepage-connect-button"
                className={`${btnPrimary} px-10 py-4`}
              >
                <span>Inquire Coordinates</span>
                <span className="w-6 h-6 rounded-full bg-current/15 flex items-center justify-center font-bold text-xs shrink-0 transform-gpu transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1.5px] ease-[cubic-bezier(0.16,1,0.3,1)]">↗</span>
              </Link>
            </div>

            {/* Sincere, beautifully-restrained mini footer line */}
            <div className="border-t border-neutral-200/40 pt-4 flex flex-col sm:flex-row justify-between items-center font-mono text-[9px] text-neutral-400 gap-2 select-none">
              <span>© VISTAR LABS. EST 2026.</span>
              <div className="flex gap-4">
                <span>EMAIL: HELLO@VISTAR.TECH</span>
                <span>/</span>
                <span>SLA: 24HR DIRECT RESPONSE</span>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
