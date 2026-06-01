"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";
import Image from "next/image";
import { 
  ManhwaPanel, 
  ManhwaSpeechBubble, 
  ManhwaNarrationBanner, 
  ManhwaGutterDivider,
  ManhwaChapterDivider,
  ManhwaFloatingParticle,
  ManhwaActionPanel,
  ManhwaStarburst,
  ComicMaskReveal,
  ManhwaTerminal
} from "@/components/manhwa/manhwa-panel";

// ─────────────────────────────────────────────────────────────────────────────
// Comic Ticker Tape (Marquee)
// ─────────────────────────────────────────────────────────────────────────────
function ComicDataStream() {
  return (
    <div className="relative py-4 overflow-hidden select-none w-full border-y-[4px] border-black bg-[#ffcc00] z-50">
      <div className="flex w-[200%] gap-4 will-change-transform font-bangers text-xl tracking-widest text-black uppercase" style={{ animation: "marquee 30s linear infinite" }}>
        <span className="flex items-center gap-12 whitespace-nowrap">
          VISTAR STUDIO ★ DIGITAL ENGINEERING ★ HIGH-PERFORMANCE REACT ★ IMMERSIVE WEBGL ★ VISTAR STUDIO ★ DIGITAL ENGINEERING
        </span>
        <span className="flex items-center gap-12 whitespace-nowrap">
          VISTAR STUDIO ★ DIGITAL ENGINEERING ★ HIGH-PERFORMANCE REACT ★ IMMERSIVE WEBGL ★ VISTAR STUDIO ★ DIGITAL ENGINEERING
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Home Page - Scroll Driven Animated Movie
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  // Main scroll container ref
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ── SCENE 1: THE DESCENT (Hero Section) ──
  // The hero text zooms out towards the user as they scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 2.2], { clamp: true });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0], { clamp: true });
  const heroY = useTransform(scrollYProgress, [0, 0.08], [0, 200], { clamp: true });
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.08], ["auto", "none"]);

  // ── AWWWARDS HORIZONTAL PARALLAX TRACK ──
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically over the horizontal sticky region
  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalTrackRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll progress to horizontal translation sweeps
  const horizontalX = useTransform(horizontalScrollProgress, [0.05, 0.70], ["0vw", "-200vw"], { clamp: true });

  // Parallax offsets inside individual horizontal slides
  const slide1LeftX = useTransform(horizontalScrollProgress, [0.05, 0.30], [0, -150], { clamp: true });
  const slide1RightX = useTransform(horizontalScrollProgress, [0.05, 0.30], [0, 150], { clamp: true });
  const slide3Scale = useTransform(horizontalScrollProgress, [0.45, 0.70], [0.8, 1.05], { clamp: true });

  return (
    <div ref={containerRef} className="w-full relative bg-white selection:bg-[#ff0080] selection:text-white">
      
      {/* Light Halftone Pattern Background (Fixed Parallax) */}
      <motion.div 
        className="fixed inset-0 z-[-1] opacity-10 pointer-events-none halftone-dots"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -500]) }}
      />

      {/* Pop Art Particles */}
      <ManhwaFloatingParticle color="#ff0080" size={12} top="15%" left="5%" delay={0} />
      <ManhwaFloatingParticle color="#ccff00" size={16} top="30%" right="8%" delay={1.5} />
      <ManhwaFloatingParticle color="#00f0ff" size={10} top="55%" left="12%" delay={3} />
      <ManhwaFloatingParticle color="#ff5500" size={14} top="75%" right="15%" delay={2} />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
        
        {/* ─────────────────────────────────────────────────────────────────
            SCENE 1: THE HERO SPLASH
            ───────────────────────────────────────────────────────────────── */}
        <motion.section 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 md:pt-20 min-h-[75vh] relative z-20 origin-center"
        >
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left z-20">
            <div className="flex gap-4 select-none">
              <span className="font-comic font-black text-[10px] sm:text-xs text-black uppercase border-[3px] border-black px-3 py-1 bg-[#ccff00] shadow-[2px_2px_0px_#000] -rotate-2">Digital Engineering</span>
              <span className="font-comic font-black text-[10px] sm:text-xs text-white uppercase border-[3px] border-black px-3 py-1 bg-[#ff0080] shadow-[2px_2px_0px_#000] rotate-2">Creative Lab</span>
            </div>

            <div className="relative">
              <ComicMaskReveal delay={0.2} direction="bottom">
                <ManhwaSpeechBubble 
                  text="INCOMING MISSION..." 
                  themeType="lime"
                  tilt="left"
                  pointerPosition="left"
                  className="mb-2"
                />
              </ComicMaskReveal>

              <TiltCard className="text-left w-full" intensity={4}>
                <ComicMaskReveal delay={0.4} direction="left">
                  <h1 
                    className="font-bangers text-6xl sm:text-7xl md:text-8xl tracking-wider leading-[0.9] uppercase text-[#ff0080] rotate-[-2deg]"
                    style={{ WebkitTextStroke: "2px #000", textShadow: "6px 6px 0px #000" }}
                  >
                    Vistar<br />
                    <span className="text-[#00f0ff]">Studio</span>
                  </h1>
                </ComicMaskReveal>
              </TiltCard>
            </div>

            <ComicMaskReveal delay={0.6} direction="right">
              <p className="font-comic font-bold text-sm sm:text-base leading-relaxed max-w-md text-black bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_#000] rotate-1">
                A premium digital architecture laboratory. We design and build high-octane interactive software ecosystems that crush transactional friction at absolute scale!
              </p>
            </ComicMaskReveal>

            <div className="pt-2 select-none pointer-events-auto interactive flex gap-4">
              <span className="px-6 py-2.5 font-bangers text-lg uppercase tracking-widest bg-[#ccff00] text-black border-[3px] border-black shadow-[4px_4px_0px_#000]">
                SCROLL TO BEGIN SCENE!
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center relative">
            <ManhwaStarburst 
              text="BOOM!" 
              themeType="pink" 
              size="sm" 
              tilt="left" 
              className="absolute -top-12 -left-8 z-30"
            />
            <ManhwaPanel panelTheme="cyan" tilt="right" sfx="KABOOM!" sfxPosition="bottom-right" className="w-full max-w-lg aspect-[4/3]">
              <div className="absolute inset-0 w-full h-full border-4 border-black">
                <Image 
                  src="/hero_cover.png"
                  alt="Futuristic digital portal engineering laboratory illustration"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ManhwaPanel>
          </div>
        </motion.section>

      </div>

      {/* ─────────────────────────────────────────────────────────────────
          AWWWARDS HORIZONTAL MOTION TRACK (Method, Capabilities, POC)
          ───────────────────────────────────────────────────────────────── */}
      <div ref={horizontalTrackRef} className="relative h-[350vh] w-full z-20">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-transparent border-y-[4px] border-black">
          {/* Manga action speed lines in horizontal track background */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none manga-action-lines" />
          
          <motion.div 
            style={{ x: horizontalX }}
            className="flex w-[300vw] h-full items-center relative z-10"
          >
            {/* Slide 1: THE METHOD */}
            <div className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-20 relative select-none">
              <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div style={{ x: slide1LeftX }} className="lg:col-span-6 flex flex-col space-y-4">
                  <span className="font-comic font-black text-xs text-black uppercase border-[3px] border-black px-3 py-1 bg-[#ff0080] shadow-[2px_2px_0px_#000] rotate-[-2deg] self-start">
                    01 // THE METHOD
                  </span>
                  <ManhwaPanel panelTheme="pink" className="w-full" narration="OUR APPROACH">
                    <div className="space-y-4 text-left">
                      <h2 className="font-bangers text-5xl uppercase tracking-wider text-black">
                        Elite Visual <span className="text-[#ff0080]">Power</span>
                      </h2>
                      <p className="font-comic font-bold text-base leading-relaxed text-black">
                        Your digital presence is your strongest weapon. We forge bespoke 3D WebGL geometry and ultra-fast frameworks that absolutely captivate clients and prove elite pricing power.
                      </p>
                      <div className="pt-4 border-t-[3px] border-black">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-bangers text-sm uppercase tracking-wider text-center text-black">
                          <span className="py-1.5 border-[2px] border-black bg-[#00f0ff] shadow-[2px_2px_0px_#000] rotate-[-2deg]">React</span>
                          <span className="py-1.5 border-[2px] border-black bg-[#ccff00] shadow-[2px_2px_0px_#000] rotate-[2deg]">Next.js</span>
                          <span className="py-1.5 border-[2px] border-black bg-[#ffbe0b] shadow-[2px_2px_0px_#000] rotate-[-1deg]">Three.js</span>
                          <span className="py-1.5 border-[2px] border-black bg-[#ff0080] text-white shadow-[2px_2px_0px_#000] rotate-[1deg]">WebGL</span>
                        </div>
                      </div>
                    </div>
                  </ManhwaPanel>
                </motion.div>

                <motion.div style={{ x: slide1RightX }} className="lg:col-span-6 flex flex-col space-y-6 relative">
                  <ManhwaSpeechBubble 
                    text="144 FPS LOCKED!" 
                    themeType="lime" 
                    pointerPosition="right"
                    className="absolute -top-10 right-4 z-30 rotate-2"
                  />
                  <ManhwaPanel panelTheme="cyan" className="w-full" narration="THE OUTCOME" sfx="SWOOSH!">
                    <div className="space-y-4 text-left">
                      <div className="font-comic font-bold text-base md:text-lg leading-relaxed text-black bg-[#ccff00] border-[3.5px] border-black p-4 shadow-[4px_4px_0px_#000] rotate-[1deg]">
                        &quot;Vistar delivered clean, premium architectures operating with perfect technical precision. Their engineering directly impacted our bottom-line — resulting in a massive 38% surge!&quot;
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t-[3px] border-black font-bangers tracking-wider uppercase text-black">
                        <div className="w-10 h-10 border-[3px] border-black bg-[#ff0080] text-white flex items-center justify-center shadow-[2px_2px_0px_#000] text-xl">★</div>
                        <div className="bg-white border-[2px] border-black px-2.5 py-0.5">
                          <p className="font-bangers text-lg">Principal Architect</p>
                          <p className="font-comic font-bold text-[10px]">Quantum Solutions Div.</p>
                        </div>
                      </div>
                    </div>
                  </ManhwaPanel>
                </motion.div>
              </div>
            </div>

            {/* Slide 2: CAPABILITIES */}
            <div className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-20 relative bg-transparent border-l-[4px] border-black select-none">
              <div className="max-w-6xl mx-auto w-full space-y-8">
                <div className="flex flex-col items-center text-center gap-2">
                  <span className="font-comic font-black text-xs text-black uppercase border-[3px] border-black px-3 py-1 bg-[#ccff00] shadow-[2px_2px_0px_#000] -rotate-1 self-center">
                    02 // CAPABILITIES
                  </span>
                  <h2 className="font-bangers text-5xl sm:text-6xl uppercase tracking-wider text-black rotate-[1deg]">
                    STUDIO ARSENAL
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "3D WebGL", theme: "bg-[#00f0ff]", desc: "Custom shader architectures and responsive 3D geometry deployed directly to the browser." },
                    { title: "High-Perf Frontends", theme: "bg-[#ccff00]", desc: "Pixel-perfect React and Next.js applications locked at 144Hz, optimized for sub-second loads." },
                    { title: "Digital Architecture", theme: "bg-[#ffbe0b]", desc: "Heavy-duty secure backend compilers and API routers built for massive data scaling." },
                    { title: "Technical Strategy", theme: "bg-[#ff0080]", desc: "We advise enterprises on engineering choices and establish radical designs." },
                  ].map((service, idx) => (
                    <motion.div 
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      key={idx} 
                      className="p-6 border-[3px] border-black bg-white hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_#000]"
                    >
                      <h3 className="font-bangers text-2xl tracking-wide flex items-center gap-3 uppercase text-black">
                        <span className={`w-7 h-7 flex items-center justify-center border-2 border-black ${service.theme} text-black shadow-[1.5px_1.5px_0px_#000] text-sm`}>★</span>
                        {service.title}
                      </h3>
                      <p className="font-comic font-bold text-sm leading-relaxed text-black mt-2 text-left">
                        {service.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slide 3: PROOF OF CONCEPT (POC) */}
            <div className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-20 relative border-l-[4px] border-black select-none">
              <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Side: Live compiling sync terminal! */}
                <motion.div style={{ scale: slide3Scale }} className="lg:col-span-6 flex flex-col space-y-4">
                  <span className="font-comic font-black text-xs text-black uppercase border-[3px] border-black px-3 py-1 bg-[#ffbe0b] shadow-[2px_2px_0px_#000] rotate-[-2deg] self-start">
                    03 // REAL-TIME COMPILE
                  </span>
                  <ManhwaTerminal className="w-full" />
                </motion.div>

                {/* Right Side: Case study outcome metric */}
                <div className="lg:col-span-6 flex flex-col space-y-6 text-left relative">
                  <ManhwaStarburst 
                    text="SMASH!" 
                    themeType="orange" 
                    size="lg" 
                    tilt="left" 
                    className="absolute -top-16 -right-6 z-30"
                  />
                  <div className="flex flex-col select-none">
                    <span className="font-comic font-black text-xs text-black uppercase border-[3px] border-black px-3 py-1 bg-[#00f0ff] shadow-[2px_2px_0px_#000] rotate-[2deg] self-start mb-2">
                      Case Study / Exchange
                    </span>
                    <h2 
                      className="font-bangers text-6xl sm:text-7xl uppercase leading-none tracking-wider text-[#ff5500] rotate-[-1deg]"
                      style={{ WebkitTextStroke: "2.5px #000", textShadow: "5px 5px 0px #000" }}
                    >
                      38% Conversion Boost
                    </h2>
                  </div>

                  <ManhwaPanel panelTheme="mono" className="w-full" tilt="right">
                    <div className="text-left space-y-3">
                      <p className="font-comic font-black uppercase tracking-wider text-white bg-black inline-block px-2 py-0.5 border-[2px] border-black -rotate-2 text-xs">Verified Deliverable</p>
                      <h3 className="font-bangers text-2xl uppercase tracking-wider text-black">High-Performance Trading UI</h3>
                      <p className="font-comic font-bold text-sm leading-relaxed text-black">
                        Custom WebGL platform displaying sub-millisecond real-time ledger metrics. Optimized rendering threads straight to the GPU, increasing user session times by 140% and completely eliminating transaction lag.
                      </p>
                    </div>
                  </ManhwaPanel>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          EPILOGUE: ENDING CTA
          ───────────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-4xl mx-auto py-24 px-6 md:px-12 text-center relative select-none z-30">
        <div className="flex flex-col items-center space-y-10">
          <div className="relative">
            <ManhwaSpeechBubble 
              text="READY FOR ACTION?!"
              themeType="pink"
              pointerPosition="center"
              className="mb-8 rotate-[2deg]"
            />
            
            <TiltCard intensity={6}>
              <h2 
                className="font-bangers text-7xl sm:text-8xl md:text-9xl uppercase tracking-tighter leading-none text-[#ccff00] rotate-[-2deg]"
                style={{ WebkitTextStroke: "4px #000", textShadow: "8px 8px 0px #000" }}
              >
                START YOUR<br/>PROJECT
              </h2>
            </TiltCard>
          </div>
          
          <div className="font-comic font-bold text-lg sm:text-xl max-w-xl leading-relaxed text-black bg-white border-[4px] border-black p-6 shadow-[6px_6px_0px_#000]">
            <ComicMaskReveal delay={0.2} direction="bottom">
              Ready to deploy an elite digital experience? Inquire today. Typical project engagements start from $15,000. All direct compiles are covered by our 24-hour response SLA!
            </ComicMaskReveal>
          </div>

          <div className="pointer-events-auto interactive pt-4">
            <Link 
              href="/contact"
              className="px-10 py-4 font-bangers text-4xl uppercase tracking-widest bg-[#ff0080] text-white border-[4px] border-black hover:bg-[#ccff00] hover:text-black transition-all shadow-[8px_8px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000] flex items-center gap-4 rotate-2"
            >
              <span>CONNECT SYSTEM</span>
              <span className="text-5xl leading-none">💥</span>
            </Link>
          </div>
        </div>
      </section>

      <ComicDataStream />
    </div>
  );
}
