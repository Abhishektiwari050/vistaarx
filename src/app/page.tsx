"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";

// ─────────────────────────────────────────────────────────────────────────────
// Double Opposing Marquees slanted at -3° and +3°
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
    <div className="relative py-4 overflow-hidden select-none w-full scale-[0.85] md:scale-100">
      {/* Marquee 1 (Slanted Left, Left-Moving) */}
      <div 
        className={`w-[110%] -ml-[5%] py-4 ${bgColorA} ${textColorA} transform -rotate-2 overflow-hidden shadow-[0_8px_0px_0px_rgba(0,0,0,1)] relative z-20 pointer-events-auto`}
      >
        <div className="flex w-[200%] gap-4 animate-[marquee_18s_linear_infinite] will-change-transform font-mono text-3xl md:text-5xl font-black uppercase tracking-tighter">
          <span className="flex items-center gap-8 whitespace-nowrap">
            [VISTAR] ★ [BRUTAL] ★ [SYSTEMIC_CORE] ★ [NO_RULES] ★ [VECTOR_FORCE] ★ [MAX_SPEED] ★
          </span>
          <span className="flex items-center gap-8 whitespace-nowrap">
            [VISTAR] ★ [BRUTAL] ★ [SYSTEMIC_CORE] ★ [NO_RULES] ★ [VECTOR_FORCE] ★ [MAX_SPEED] ★
          </span>
        </div>
      </div>

      {/* Marquee 2 (Slanted Right, Right-Moving) */}
      <div 
        className={`w-[110%] -ml-[5%] py-4 ${bgColorB} ${textColorB} transform rotate-2 -mt-4 overflow-hidden shadow-[0_8px_0px_0px_rgba(0,0,0,1)] relative z-10 pointer-events-auto`}
      >
        <div className="flex w-[200%] gap-4 animate-[marquee-reverse_15s_linear_infinite] will-change-transform font-mono text-3xl md:text-5xl font-black uppercase tracking-tighter">
          <span className="flex items-center gap-8 whitespace-nowrap">
            {"// CHAOS // ABSOLUTE // WEBGL // FRONTIER // LATENCY_ZERO // OVERRIDE //"}
          </span>
          <span className="flex items-center gap-8 whitespace-nowrap">
            {"// CHAOS // ABSOLUTE // WEBGL // FRONTIER // LATENCY_ZERO // OVERRIDE //"}
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
  let textSecondary = "text-black bg-[#ccff00] border-2 border-black font-bold uppercase p-1";
  let btnClass = "bg-[#ff0080] text-white border-4 border-black hover:-translate-y-2 hover:translate-x-2 transition-transform duration-150 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none";
  let strokeText = "text-transparent mix-blend-difference opacity-80";
  let stickerColor = "bg-[#00ffff] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  const basePanelClass = "absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300 ease-out";
  
  if (theme === "cyber-dark") {
    textPrimary = "text-white";
    textSecondary = "text-[#ccff00] bg-black border-2 border-[#ccff00] font-bold uppercase p-1";
    btnClass = "bg-[#ccff00] text-black border-4 border-[#ccff00] hover:-translate-y-2 hover:translate-x-2 transition-transform duration-150 shadow-[8px_8px_0px_0px_#ff0080] hover:shadow-none";
    strokeText = "text-transparent opacity-80 mix-blend-screen";
    stickerColor = "bg-[#ff0080] text-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]";
  } else if (theme === "mono") {
    textPrimary = "text-black";
    textSecondary = "text-white bg-black border-2 border-black font-bold uppercase p-1";
    btnClass = "bg-white text-black border-4 border-black hover:-translate-y-2 hover:translate-x-2 transition-transform duration-150 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none";
    strokeText = "text-transparent mix-blend-difference opacity-80";
    stickerColor = "bg-neutral-200 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  } else if (theme === "solar") {
    textPrimary = "text-[#ff5500]";
    textSecondary = "text-[#ffcc00] bg-[#140b04] border-2 border-[#ff5500] font-bold uppercase p-1";
    btnClass = "bg-[#ffcc00] text-black border-4 border-[#ff5500] hover:-translate-y-2 hover:translate-x-2 transition-transform duration-150 shadow-[8px_8px_0px_0px_#ff5500] hover:shadow-none";
    strokeText = "text-transparent mix-blend-difference opacity-80";
    stickerColor = "bg-[#ff5500] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Calculate exact styles and bounds for each sticky page
  // ───────────────────────────────────────────────────────────────────────────

  // Panel 1: Hero Centered (0.00 – 0.20)
  const heroOpacity = scrollProgress <= 0.10 ? 1 : Math.max(0, 1 - (scrollProgress - 0.10) / 0.10);
  const heroTranslateY = scrollProgress <= 0.10 ? 0 : -(scrollProgress - 0.10) * 700; // slides up out
  const heroActive = scrollProgress <= 0.20;

  // Panel 2: Manifesto (0.20 – 0.40)
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

  // Panel 3: Capabilities (0.40 – 0.65)
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
  const isCapPartA = scrollProgress <= 0.52; // true = cards 1 & 2, false = cards 3 & 4

  // Panel 4: Neural Operator Teaser (0.65 – 0.85)
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

  // Panel 5: Contact Form Gateway (0.85 – 1.00)
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
          {/* Floating stickers for premium chaotic feel */}
          <div className={`absolute top-[22%] left-[8%] rotate-[-12deg] p-2 font-mono text-xs font-black z-30 ${stickerColor} hover:scale-110 hover:rotate-0 transition-transform cursor-pointer interactive`}>
            [RAW_WEBGL]
          </div>
          <div className={`absolute bottom-[28%] right-[10%] rotate-[8deg] p-2 font-mono text-xs font-black z-30 ${stickerColor} hover:scale-110 hover:rotate-0 transition-transform cursor-pointer interactive`}>
            [NO_LATENCY]
          </div>
          <div className={`absolute top-[58%] left-[4%] rotate-[-25deg] p-2 font-mono text-[9px] font-black z-30 ${stickerColor} hover:scale-110 hover:rotate-0 transition-transform cursor-pointer interactive`}>
            [EST. 2026]
          </div>

          <div className="w-full h-full flex flex-col justify-between px-6 md:px-12 py-16 pt-32 relative">
            <div className="w-full flex flex-col space-y-4">
              <div className="flex justify-between items-start select-none">
                <div className={`font-mono ${textSecondary} text-[10px] space-y-0.5`}>
                  <p>DIGITAL ENGINEERING</p>
                  <p>VISTAR LABS</p>
                </div>
                <div className={`font-mono text-right ${textSecondary} text-[10px]`}>
                  <p>IMMERSIVE 3D CHAOS</p>
                </div>
              </div>

              {/* Huge brutalist header */}
              <TiltCard className="text-center w-full z-10 pt-4" intensity={15}>
                <h1 
                  className={`text-[4rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.8] ${textPrimary} uppercase`}
                  style={{ WebkitTextStroke: theme === 'cyber-dark' ? '2px #ccff00' : '4px black' }}
                >
                  Vistar <br /> <span className={strokeText} style={{ WebkitTextStroke: theme === 'cyber-dark' ? '2px #ff0080' : '4px black' }}>Studio</span>
                </h1>
              </TiltCard>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-0">
              <div className="font-mono text-xs md:text-sm font-black uppercase tracking-widest text-black bg-[#ccff00] border-4 border-black px-4 py-2 animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                SCROLL // DOWN
              </div>
            </div>

            <TiltCard intensity={20} className="flex flex-col items-center text-center w-full max-w-xl mx-auto space-y-6 pb-6 z-10 relative">
              <div className={`p-4 font-mono text-xs uppercase font-bold text-left border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[8px_8px_0px_0px_#ccff00]' : ''}`}>
                A premium digital architecture laboratory. We design and build heavy-duty interactive software ecosystems that obliterate transactional friction.
              </div>
              <div className="w-full">
                <button 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const target = window.innerHeight;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }
                  }}
                  className={`w-full py-4 font-mono text-md font-black uppercase tracking-widest cursor-pointer interactive ${btnClass}`}
                >
                  INITIALIZE_DECK
                </button>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 2: CORE MANIFESTO (0.20 – 0.40)
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

            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 my-auto">
              <TiltCard intensity={10} className={`md:w-[48%] space-y-6 p-8 border-4 bg-white text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[8px_8px_0px_0px_#ccff00]' : ''}`}>
                <span className={`font-mono text-xs font-black uppercase tracking-widest px-3 py-1 ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white' : 'bg-[#ccff00] text-black border-black'} border-2 inline-block`}>
                  01 // THE SYSTEM RULES
                </span>
                <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                  STRUCTURAL <br/> CHAOS
                </h2>
                <p className="font-mono text-xs leading-relaxed opacity-85">
                  We weaponize structural geometry and complex mathematical shaders to build unforgettable WebGL applications. Conventional grids are boring. We defy grid parameters to establish radical branding.
                </p>
              </TiltCard>
              
              {/* Space for shifted logo on the right side */}
              <div className="md:w-[48%]" />
            </div>
            
            <div className="w-full font-mono text-[9px] text-neutral-400 text-center tracking-widest">
              [ STAGE 02 // MANIFESTO_OVERRIDE ]
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 3: CORE CAPABILITIES (0.40 – 0.65)
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
            <div className="pt-10">
              <h2 className={`font-mono text-[2.5rem] md:text-[4rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                CORE // <br/> [ CAPABILITIES ]
              </h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 my-auto">
              {/* Space for logo on the left side */}
              <div className="md:w-[48%]" />

              {/* Morphing Slide cards on the right side */}
              <div className="md:w-[48%] w-full relative h-[300px]">
                {/* PART A CARDS */}
                <div 
                  className="absolute inset-0 space-y-6 transition-all duration-500 flex flex-col justify-center"
                  style={{
                    opacity: isCapPartA ? 1 : 0,
                    transform: `translate3d(0, ${isCapPartA ? 0 : -30}px, 0)`,
                    pointerEvents: isCapPartA ? "auto" : "none"
                  }}
                >
                  <TiltCard intensity={8} className={`p-6 border-4 bg-white text-black border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[6px_6px_0px_0px_#ccff00]' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-black uppercase mb-2">★ 3D WebGL Engines</h3>
                    <p className="font-mono text-[11px] font-bold opacity-80 leading-relaxed">
                      Custom shader architectures, fluid mechanics, and high-quality bevel models deployed directly to the browser for cinematic interactive impact.
                    </p>
                  </TiltCard>
                  
                  <TiltCard intensity={8} className={`p-6 border-4 bg-[#ccff00] text-black border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-black uppercase mb-2">★ Neu-Brutalist UX</h3>
                    <p className="font-mono text-[11px] font-bold opacity-80 leading-relaxed">
                      Aggressive, high-contrast user interfaces with thick borders and custom stickers. We build websites that leave an impact.
                    </p>
                  </TiltCard>
                </div>

                {/* PART B CARDS */}
                <div 
                  className="absolute inset-0 space-y-6 transition-all duration-500 flex flex-col justify-center"
                  style={{
                    opacity: !isCapPartA ? 1 : 0,
                    transform: `translate3d(0, ${!isCapPartA ? 0 : 30}px, 0)`,
                    pointerEvents: !isCapPartA ? "auto" : "none"
                  }}
                >
                  <TiltCard intensity={8} className={`p-6 border-4 bg-[#ff0080] text-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-[#ccff00] text-black border-black shadow-[6px_6px_0px_0px_#ccff00]' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-black uppercase mb-2">★ Zero-Latency React</h3>
                    <p className="font-mono text-[11px] font-bold opacity-80 leading-relaxed">
                      Hyper-optimized global state tracking and complete bypass of React virtual DOM re-renders for buttery 144Hz WebGL frame sync.
                    </p>
                  </TiltCard>

                  <TiltCard intensity={8} className={`p-6 border-4 bg-black text-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-white border-[#ff0080] shadow-[6px_6px_0px_0px_#ff0080]' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-black uppercase mb-2">★ Systemic Resilience</h3>
                    <p className="font-mono text-[11px] font-bold opacity-80 leading-relaxed">
                      Bulletproof edge compilers and sandboxed cloud routers designed for massive scalability, secure transactions, and zero latency.
                    </p>
                  </TiltCard>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between font-mono text-[9px] text-neutral-400">
              <span>[ STEP 03 // CAPABILITIES_HUB ]</span>
              <span>SCROLL TO SHIFT FOCUS {isCapPartA ? "➔ PART B" : "➔ PORTAL"}</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────
            PANEL 4: NEURAL OPERATOR PORTAL (0.65 – 0.85)
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
              <span className={`font-mono text-[10px] font-black uppercase tracking-widest px-3 py-1 ${theme === 'cyber-dark' ? 'bg-[#ff0080] text-white border-white' : 'bg-[#ccff00] text-black border-black'} border-2 inline-block mb-3`}>
                LATEST PROTOCOL PROT_904
              </span>
              <h2 className={`text-5xl md:text-[5rem] font-black uppercase tracking-tighter leading-none ${textPrimary}`}>
                NEURAL OPERATOR
              </h2>
            </div>

            {/* Logo tumbles at high speed in the viewport center, surrounded by text and card */}
            <div className="my-auto w-full flex justify-between items-center md:flex-row flex-col gap-6 pointer-events-auto">
              <div className={`p-5 max-w-xs font-mono text-[11px] font-black uppercase border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00] shadow-[6px_6px_0px_0px_#ccff00]' : ''} md:text-left text-center md:rotate-[-4deg]`}>
                {"// DEPLOYED INSTANCE //"}
                <br/> HIGH-SPEED ALGORITHMIC WEBGL TRADING ARCHITECTURE. 0.1MS RESOLUTION compile target.
              </div>

              <div className="md:w-[40%] h-[10px]" /> {/* Spacer for centered logo */}

              <div className="flex flex-col items-center">
                <a 
                  href="/work"
                  className={`inline-block py-5 px-8 font-mono text-md font-black uppercase tracking-widest cursor-pointer interactive ${btnClass} md:rotate-[3deg]`}
                >
                  VIEW_ARCHIVE
                </a>
              </div>
            </div>

            <div className="w-full font-mono text-[9px] text-neutral-400 text-center tracking-widest">
              [ STAGE 04 // NEURAL_OPERATOR_CORE ]
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
          <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 h-full relative pt-[180px]">
            
            <div className="my-auto w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-6">
              <TiltCard intensity={15}>
                <h2 className="text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.8]" style={{ WebkitTextStroke: theme === 'solar' ? '2px #ff5500' : 'none' }}>
                  INITIATE <br/> SEQUENCE
                </h2>
              </TiltCard>
              
              <div className="font-mono text-xs md:text-sm font-bold uppercase max-w-lg opacity-85 leading-relaxed">
                Ready to weaponize your digital presence? We deploy high-fidelity architectures for radical brands. Join the network today.
              </div>

              <a 
                href="/contact"
                className={`inline-block py-5 px-10 font-mono text-lg font-black uppercase tracking-widest cursor-pointer interactive border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:translate-x-2 transition-transform duration-150 hover:shadow-none ${theme === 'cyber-dark' ? 'bg-black text-[#ccff00] border-[#ccff00]' : theme === 'mono' ? 'bg-white text-black border-black' : 'bg-black text-white border-black'}`}
              >
                CONTACT_HQ
              </a>
            </div>

            <div className="border-t-4 border-black/10 pt-4 flex flex-col sm:flex-row justify-between items-center font-mono text-[9px] text-neutral-400 gap-2">
              <span>© VISTAR LABS. EST 2026 // CHAOS DIVISION.</span>
              <span>ALL COMPILING SYSTEM TERMINALS FUNCTIONAL.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
