"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";
import Image from "next/image";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";
import { ManhwaPanel, ManhwaSpeechBubble } from "@/components/manhwa/manhwa-panel";

// ─────────────────────────────────────────────────────────────────────────────
// Sleek Horizontal Luxury Ticker (Custom Manhwa styled)
// ─────────────────────────────────────────────────────────────────────────────
function SingleMarquee() {
  const theme = useScrollStore((s) => s.theme);
  
  let marqueeBg = "bg-[#ccff00] text-black border-y-[3.5px] border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]";
  
  if (theme === "cyber-dark") {
    marqueeBg = "bg-[#ff0080] text-white border-y-[3.5px] border-black shadow-[4px_4px_0px_#ff0080] rotate-[1deg]";
  } else if (theme === "mono") {
    marqueeBg = "bg-black text-white border-y-[3.5px] border-black shadow-[4px_4px_0px_#000] rotate-[-1deg]";
  } else if (theme === "solar") {
    marqueeBg = "bg-[#ffcc00] text-black border-y-[3.5px] border-[#100501] shadow-[4px_4px_0px_#ff5500] rotate-[1deg]";
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
// Master Home Page (Portal) - Continuous Scrolling Staggered Webtoon Strip
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

  // Dynamic continuous scrolling backdrop gradient matching colored manhwa strip styles
  const masterGradientBg = {
    "cyber-light": "bg-gradient-to-b from-[#ffd500]/5 via-[#ff0080]/5 to-[#fdfbf7]",
    "cyber-dark": "bg-gradient-to-b from-[#080214] via-[#1b0836] via-[#3a0628] to-[#0a0a0f]",
    mono: "bg-gradient-to-b from-white via-neutral-100 to-white",
    solar: "bg-gradient-to-b from-[#fcf6e8] via-[#ffd97d]/10 via-[#ffaa66]/10 to-[#fcf6e8]",
  }[theme];

  return (
    <div className={`w-full min-h-screen relative overflow-hidden transition-colors duration-500 ${masterGradientBg}`}>
      {/* Native dynamic React 19 head SEO parameters */}
      <title>Vistar Studio // Premium Immersive WebGL & Software Engineering</title>
      <meta name="description" content="Vistar Studio is an elite digital engineering & design laboratory. We build high-performance WebGL websites and custom software systems for forward-thinking brands." />

      {/* Dynamic Manga Conic Action Speed lines overlay */}
      <div className={`fixed inset-0 z-0 opacity-20 pointer-events-none transition-colors duration-500 ${theme === 'cyber-dark' ? 'manga-action-lines-white' : 'manga-action-lines'}`} />

      {/* Staggered Vertical Webtoon Strip Container */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-24 md:space-y-36 relative z-10">
        
        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 1: THE HERO SPLASH COVER (Left Aligned Title + Right Cover Panel)
            ───────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-16 relative">
          
          <div className="lg:col-span-6 flex flex-col space-y-8 text-left z-20">
            <div className="flex gap-3 select-none">
              <span className={tagLabel}>Digital Engineering</span>
              <span className={tagLabel}>Creative Laboratory</span>
            </div>

            <div className="relative">
              {/* Floating Monologue bubble with outlined pointer tail */}
              <ManhwaSpeechBubble 
                text="ENGINEERING EXCELLENCE ACTIVE!" 
                themeType="lime"
                pointerPosition="left"
                tilt="left"
                className="mb-4"
              />

              <TiltCard className="text-left w-full pt-2" intensity={6}>
                <h1 
                  id="hero-heading"
                  className="text-[3.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[7.2rem] font-black tracking-tighter leading-none uppercase flex flex-wrap gap-x-4 select-none"
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
            </div>

            <p className={`font-sans text-xs md:text-sm font-light leading-relaxed max-w-md ${textSecondary}`}>
              A premium digital architecture laboratory. We design and build high-fidelity interactive software ecosystems that remove transactional friction at absolute international scale.
            </p>

            <div className="pt-2 select-none pointer-events-auto interactive flex gap-4">
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
                  }
                }}
                className="px-8 py-3.5 font-mono text-[10px] font-black uppercase tracking-[0.15em] bg-black text-white hover:bg-[#ccff00] hover:text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer inline-flex items-center gap-2 select-none"
              >
                <span>Scroll Comic</span>
                <span>↓</span>
              </button>
            </div>
          </div>

          {/* Right Side: High-Fidelity Cover Panel illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <ManhwaPanel 
              panelTheme="cyan"
              tilt="right"
              sfx="SWOSH!"
              sfxPosition="top-right"
              className="w-full max-w-lg aspect-[4/3] rounded-3xl"
            >
              <div className="relative w-full h-full min-h-[320px] overflow-hidden bg-neutral-900">
                <Image 
                  src="/hero_cover.png"
                  alt="Futuristic digital portal engineering laboratory illustration"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 font-mono text-[8px] sm:text-[9px] font-black text-white bg-black/80 px-3 py-1.5 rounded-lg border border-white/20 select-none uppercase tracking-widest">
                  PORTAL VECTOR: EST 2026
                </div>
              </div>
            </ManhwaPanel>
          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 2: CORE MANIFESTO (Overlapping & Staggered Left)
            ───────────────────────────────────────────────────────────────────── */}
        <section className="relative w-full py-6">
          <div className="w-full mb-10 select-none">
            <SingleMarquee />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch -mt-6">
            
            {/* Left Column Panel: Approach */}
            <div className="lg:col-span-6 flex">
              <ManhwaPanel 
                panelTheme="yellow"
                tilt="left"
                narration="01 / APPROACH"
                className="w-full"
              >
                <div className={`${innerCore} h-full space-y-6 flex flex-col justify-between`}>
                  <div className="space-y-4">
                    <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                      Elite Visual <br/>Experiences
                    </h2>
                    <p className={`font-sans text-xs leading-relaxed font-light ${textSecondary}`}>
                      A website is your strongest sales representative. We merge bespoke 3D geometry with ultra-fast web frameworks to create immersive experiences that attract high-ticket clients, validate pricing power, and command trust.
                    </p>
                  </div>
                  
                  {/* Technology Stack Trust Badges */}
                  <div className="pt-6 border-t border-dashed border-black/15 dark:border-white/15">
                    <span className="font-mono text-[8px] font-bold text-neutral-400 block mb-2 uppercase tracking-wider">CORE SYSTEM STACK:</span>
                    <div className="grid grid-cols-4 gap-2 font-mono text-[9px] font-bold text-center text-neutral-500">
                      <span className="py-1.5 rounded border border-black/10 bg-black/5 dark:bg-white/5 dark:text-neutral-300">React</span>
                      <span className="py-1.5 rounded border border-black/10 bg-black/5 dark:bg-white/5 dark:text-neutral-300">Next.js</span>
                      <span className="py-1.5 rounded border border-black/10 bg-black/5 dark:bg-white/5 dark:text-neutral-300">Three.js</span>
                      <span className="py-1.5 rounded border border-black/10 bg-black/5 dark:bg-white/5 dark:text-neutral-300">WebGL</span>
                    </div>
                  </div>
                </div>
              </ManhwaPanel>
            </div>
            
            {/* Right Column Panel: Testimonial Outcome */}
            <div className="lg:col-span-6 flex">
              <ManhwaPanel 
                panelTheme="pink"
                tilt="right"
                narration="02 / OUTCOME"
                className="w-full"
              >
                <div className={`${innerCore} h-full space-y-6 flex flex-col justify-between`}>
                  <div className={`font-serif text-sm md:text-base italic leading-relaxed font-normal ${textPrimary} pt-4`}>
                    &quot;Vistar delivered clean, premium architectures operating with perfect technical precision. Their engineering and design decisions directly impacted our bottom-line conversion goals — a 38% increase in organic sign-ups.&quot;
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-dashed border-black/15 dark:border-white/15 font-mono text-[9px]">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${theme === 'cyber-dark' ? 'border-[#ff0080] bg-black text-[#ff0080]' : theme === 'solar' ? 'border-[#ffcc00] bg-black text-[#ffcc00]' : 'border-black bg-neutral-900 text-white'}`}>★</div>
                    <div>
                      <p className={`font-bold uppercase ${textPrimary}`}>Principal Architect</p>
                      <p className="text-neutral-400">Software Solutions Division</p>
                    </div>
                  </div>
                </div>
              </ManhwaPanel>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 3: SERVICES GRID (Staggered Right)
            ───────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Empty space on Left for 3D tumbling logo */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Staggered Right Panel Box: Capabilities list */}
          <div className="lg:col-span-8 flex flex-col space-y-6 w-full">
            <div className="flex justify-between items-end mb-4">
              <h2 className={`font-sans text-[2rem] md:text-[3.2rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                Services & <br/> <span className="font-mono text-[#ff0080]" style={{ color: theme === 'solar' ? '#ff5500' : theme === 'cyber-dark' ? '#ff0080' : '' }}>Capabilities</span>
              </h2>
              <span className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider hidden sm:inline-block">ENGAGEMENTS FROM $15K</span>
            </div>

            <ManhwaPanel 
              panelTheme="purple"
              tilt="none"
              sfx="BAM!"
              sfxPosition="top-left"
              className="w-full"
            >
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 select-text text-left">
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-dashed border-white/10 pb-4 md:pb-0 md:pr-6">
                  <h3 className="text-xs md:text-sm font-bold uppercase text-[#ff0080] dark:text-[#ccff00] tracking-wider">★ 3D WebGL Experiences</h3>
                  <p className="font-sans text-[11px] font-light leading-relaxed text-neutral-300">
                    Custom shader architectures, fluid simulations, and responsive 3D bevel models deployed directly to the browser for cinematic interactive storytelling. High-end visual impact that commands user attention.
                  </p>
                </div>
                
                <div className="space-y-2 pb-4 md:pb-0 md:pl-2">
                  <h3 className="text-xs md:text-sm font-bold uppercase text-[#ff0080] dark:text-[#ccff00] tracking-wider">★ High-Performance Frontends</h3>
                  <p className="font-sans text-[11px] font-light leading-relaxed text-neutral-300">
                    Pixel-perfect React and Next.js applications engineered with extreme performance. Locked at 144Hz, optimized for sub-second page loads, excellent SEO parameters, and pristine responsive visual hierarchies.
                  </p>
                </div>

                <div className="space-y-2 border-t border-dashed border-white/10 pt-4 md:border-r md:pr-6">
                  <h3 className="text-xs md:text-sm font-bold uppercase text-[#ff0080] dark:text-[#ccff00] tracking-wider">★ Custom Digital Architecture</h3>
                  <p className="font-sans text-[11px] font-light leading-relaxed text-neutral-300">
                    Heavy-duty, secure backend compilers, scalable cloud databases, API routers, and parameter checks built for massive data scaling. Zero latency execution trees optimized for bulletproof enterprise stability.
                  </p>
                </div>

                <div className="space-y-2 border-t border-dashed border-white/10 pt-4 md:pl-2">
                  <h3 className="text-xs md:text-sm font-bold uppercase text-[#ff0080] dark:text-[#ccff00] tracking-wider">★ Technical Strategy & Branding</h3>
                  <p className="font-sans text-[11px] font-light leading-relaxed text-neutral-300">
                    We advise businesses on engineering choices, audit stacks for bottlenecks, and establish radical brutalist designs that break out of generic SaaS landing page patterns to maximize conversions.
                  </p>
                </div>
              </div>
            </ManhwaPanel>
          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 4: Case Study & Proof (Staggered Left + Dynamic starburst)
            ───────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Left Side: Dynamic Ledger Illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <ManhwaPanel 
              panelTheme="orange"
              tilt="left"
              sfx="BOOM!"
              sfxPosition="bottom-left"
              className="w-full max-w-lg aspect-[4/3] rounded-3xl"
            >
              <div className="relative w-full h-full min-h-[320px] overflow-hidden bg-neutral-900">
                <Image 
                  src="/trading_ledger.png"
                  alt="Dynamic real-time ledger metrics comic illustration"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 font-mono text-[8px] sm:text-[9px] font-black text-[#ffcc00] bg-black/80 px-3 py-1.5 rounded-lg border border-[#ff5500]/30 select-none uppercase tracking-widest">
                  QUANTUM EDGE COMPILATION ACTIVE
                </div>
              </div>
            </ManhwaPanel>
          </div>

          {/* Right Side: Case Study details */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left z-20">
            <div className="flex flex-col select-none">
              <span className={tagLabel}>
                Case Study / Quantum Exchange
              </span>
              <h2 className={`text-3xl sm:text-[3.5rem] font-black uppercase tracking-tighter leading-none ${textPrimary} mt-3`}>
                38% CONVERSION BOOST
              </h2>
            </div>

            <ManhwaPanel panelTheme="yellow" className="w-full">
              <div className={`${innerCore} h-full text-left space-y-3`}>
                <p className="font-mono text-[8px] font-bold uppercase tracking-wider mb-1 text-neutral-400">Verified Deliverable Metric</p>
                <h3 className={`font-sans text-sm font-bold uppercase ${textPrimary}`}>High-Performance Shader Trading</h3>
                <p className={`font-sans text-[11px] font-light leading-relaxed ${textSecondary}`}>
                  Custom WebGL platform displaying sub-millisecond real-time ledger metrics. Optimized rendering threads straight to the GPU, increasing user session times by 140% and completely eliminating transaction lag.
                </p>
              </div>
            </ManhwaPanel>

            <div className="pt-2 select-none pointer-events-auto interactive">
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

        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 5: CONTACT GATEWAY & SYSTEMIC ENDING
            ───────────────────────────────────────────────────────────────────── */}
        <section className="w-full max-w-4xl mx-auto py-12 text-center relative select-none">
          
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              {/* Dynamic pointed speech bubble pointing down to CTA */}
              <ManhwaSpeechBubble 
                text="COORDINATES DEFINED! INITIATE SESSION SYNC!"
                themeType="yellow"
                pointerPosition="center"
                tilt="right"
                className="mb-2"
              />
              
              <TiltCard intensity={10} className="pt-4">
                <h2 className={`text-[3.2rem] sm:text-[4.2rem] md:text-[5rem] font-black uppercase tracking-tighter leading-[0.8] ${textPrimary}`} style={{ WebkitTextStroke: theme === 'solar' ? '1.5px #ff5500' : 'none' }}>
                  Start Your <br/>Project
                </h2>
              </TiltCard>
            </div>
            
            <p className={`font-sans text-xs md:text-sm font-light max-w-lg leading-relaxed ${textSecondary}`}>
              Ready to deploy an elite digital experience? Inquire today. Typical project engagements start from $15,000. All direct compiles are covered by our 24-hour response SLA.
            </p>

            <div className="pointer-events-auto interactive">
              <Link 
                href="/contact"
                id="homepage-connect-button"
                className={`${btnPrimary} px-10 py-4`}
              >
                <span>Inquire Coordinates</span>
                <span className="w-6 h-6 rounded-full bg-current/15 flex items-center justify-center font-bold text-xs shrink-0 transform-gpu transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-[1.5px] ease-[cubic-bezier(0.16,1,0.3,1)]">↗</span>
              </Link>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
