"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { TextRevealByWord, FunkyTextReveal } from "@/components/ui/text-reveal";
import { FadeIn } from "@/components/motion/MotionWrappers";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
// import { VelocityScroll } from "@/components/ui/velocity-scroll";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FAQ } from "@/components/ui/faq";
import { Code2, Globe as GlobeIcon, Sparkles, Zap } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import gsap from "gsap";
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import FounderSection from "@/components/ui/founder-section";

// Frame assets for the Production Gallery
const FRAME_ASSETS = {
  corner: "https://static.cdn-luma.com/files/58ab7363888153e3/Corner.png",
  edgeHorizontal: "https://static.cdn-luma.com/files/58ab7363888153e3/Edge%20Horizontal.png",
  edgeVertical: "https://static.cdn-luma.com/files/58ab7363888153e3/Edge%20Vertical.png",
};

const GALLERY_FRAMES = [
  {
    id: 1,
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 2,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 3,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 4,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 5,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 6,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 7,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 8,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 9,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // Scence 1: VISTAR Software Studio
  const text1Opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const text1X = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const text1Y = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
  const text1Display = useTransform(
    scrollYProgress,
    (pos) => (pos >= 0.65 ? "none" : "flex")
  );

  // Scene 2: SYSTEMIC ENGINEERING
  const text2Opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const text2Scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const text2X = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const text2Display = useTransform(
    scrollYProgress,
    (pos) => (pos < 0.05 ? "none" : "flex")
  );

  // GLOBE MOVEMENT (Fast Shift Left)
  // Initial: right-[-20%] (far right). Target: Left edge (half visible).
  // Need to move approx 80vw - 100vw left.
  const globeX = useTransform(scrollYProgress, [0, 0.35], ["0%", "-85vw"]); // Fast shift
  const globeScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.2]); // Slight zoom during move
  const globeRight = "-20%";

  useEffect(() => {
    // GSAP Entrance Animation (Elastic/Funky) for initial load only
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Funky Staggered Entrance
      tl.from(".hero-char", {
        y: 150,
        rotation: 15,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "elastic.out(1, 0.75)"
      })
        .from(".hero-tag", {
          scale: 0,
          rotation: -10,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=1")
        .from(".hero-btn", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={`w-full min-h-screen bg-white selection:bg-[#ccff00] selection:text-black font-sans`}>

      {/* 1. HERO SECTION (AnimeJS Style Sticky Scroll) */}
      <section ref={heroRef} className="h-[250vh] w-full relative bg-white">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 md:px-20 pt-12 md:pt-16">

          {/* Dynamic Background Gradients - Refined 3-Step */}
          <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#C6FF00] blur-[120px] opacity-20 animate-pulse pointer-events-none mix-blend-multiply" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E91E63] blur-[120px] opacity-15 pointer-events-none mix-blend-multiply" />
          <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[#FF4081] blur-[120px] opacity-15 pointer-events-none mix-blend-multiply" />

          <div className="w-full h-full relative flex items-center">

            {/* SCENE 1: VISTAR CORE IDENTITY */}
            <motion.div
              style={{ opacity: text1Opacity, x: text1X, y: text1Y, scale: text1Scale, display: text1Display }}
              className="absolute left-0 z-20 flex flex-col justify-center w-full md:w-auto"
            >
              <div className="flex flex-col relative leading-[0.8]">
                <div className="flex items-baseline gap-2 md:gap-8 flex-wrap justify-center md:justify-start">
                  <h1 className="hero-char text-[15vw] md:text-[11vw] font-black tracking-tighter text-black mix-blend-multiply flex items-center gap-2">
                    <span className="text-[#ccff00] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-stroke-1 stroke-black">VISTAR</span>
                  </h1>
                </div>
                <div className="flex items-center gap-2 md:gap-8 -mt-2 md:-mt-6 flex-wrap justify-center md:justify-start">
                  <h1 className="hero-char will-change-transform text-[12vw] md:text-[11vw] font-medium text-[#ff0080] font-calligraphy">
                    Software Studio
                  </h1>
                </div>
              </div>
              <p className="hero-text mt-8 md:mt-12 max-w-2xl type-body font-medium text-neutral-800 leading-relaxed font-mono text-center md:text-left mx-auto md:mx-0">
                <span className="bg-[#ccff00] px-2 border-b-2 border-black font-bold">AI ENABLED SDLC</span> {"//"} PREMIER <span className={`font-calligraphy font-bold text-4xl md:text-5xl text-[#1a73e8]`}>software makers</span>.
                WE ENGINEER AUTONOMOUS <motion.span animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} className="bg-[#ff0080] text-white px-2 font-bold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block">SYSTEMS</motion.span> AT SCALE.
              </p>
              <div className="mt-8 md:mt-12 flex gap-4 pointer-events-auto justify-center md:justify-start">
                <div className="hero-btn opacity-0 will-change-transform">
                  <MagneticButton className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-black text-white font-medium type-h3 !text-lg hover:bg-neutral-800 transition-all shadow-[6px_6px_0px_0px_rgba(204,255,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(204,255,0,1)] hover:translate-x-1 hover:translate-y-1 active:scale-95">
                    Build Now
                  </MagneticButton>
                </div>
                <div className="hero-btn opacity-0 will-change-transform">
                  <MagneticButton className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#F1F3F4] text-black font-medium type-h3 !text-lg hover:bg-[#e8eaed] transition-colors active:scale-95 transition-transform flex items-center gap-2 border-2 border-transparent hover:border-black">
                    <span className="w-2 h-2 rounded-full bg-[#ff0080] animate-pulse" /> The Method
                  </MagneticButton>
                </div>
              </div>
            </motion.div>

            {/* SCENE 2: SYSTEMIC SCALE (Fades In) */}
            <motion.div
              style={{ opacity: text2Opacity, x: text2X, scale: text2Scale, display: text2Display }}
              className="absolute right-0 text-right z-20 flex flex-col items-end justify-center pointer-events-none w-full"
            >
              <div className="flex flex-col relative leading-[0.8] items-end">
                <div className="flex items-center gap-4 mb-4">
                  <span className="hero-tag inline-block px-4 py-1 rounded-full border border-black text-sm font-bold font-mono bg-white text-black -rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    SDLC 2.0
                  </span>
                  <span className="hero-tag inline-block px-4 py-1 rounded-full border border-black text-sm font-bold font-mono bg-[#ff0080] text-white rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    AI-FIRST
                  </span>
                </div>
                <h1 className="text-[10vw] md:text-[8vw] font-black tracking-tighter text-neutral-900">
                  SYSTEMIC
                </h1>
                <h1 className="text-[10vw] md:text-[8vw] font-black tracking-tighter text-[#ccff00] min-w-max stroke-black text-stroke-2 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
                  ENGINEERING
                </h1>
              </div>
              <p className="mt-8 md:mt-12 max-w-xl type-body font-bold text-neutral-900 leading-relaxed font-mono text-right ml-auto">
                WE ELIMINATE FRICTION AT EVERY LAYER. <br />
                ARCHITECTURE BUILT ON <span className="bg-black text-white px-2 italic">HIGH-FIDELITY LOGIC</span> <br />
                AND <span className="font-calligraphy font-bold text-5xl text-[#ff0080] decoration-wavy underline decoration-[#ccff00]">kinetic velocity</span>.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 justify-end w-full md:w-auto">
                <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left transform rotate-2 hover:rotate-0 transition-transform duration-300 min-w-[160px]">
                  <p className="type-caption text-neutral-500 font-bold">Deployment Rate</p>
                  <p className="type-h3 !text-3xl text-black">∞ / Day</p>
                </div>
                <div className="p-4 border-2 border-black bg-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left transform -rotate-2 hover:rotate-0 transition-transform duration-300 min-w-[160px]">
                  <p className="type-caption text-black/60 font-bold">Latency</p>
                  <p className="type-h3 !text-3xl text-black">~0ms</p>
                </div>
              </div>
            </motion.div>

            {/* 3D GLOBE */}
            <motion.div
              style={{ x: globeX, scale: globeScale, right: globeRight }}
              className="absolute top-[10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] z-10 hidden md:block"
            >
              <Globe />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. FUNKY MARQUEE */}
      <section className="py-20 bg-black overflow-hidden transform -rotate-2 scale-105 z-20 relative border-y-4 border-[#ccff00]">
        <InfiniteMarquee speed="fast">
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">SDLC</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-serif italic text-[#ff0080]">INTELLIGENCE</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-mono text-transparent stroke-text [-webkit-text-stroke:2px_#ccff00]">SCALING</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">SYSTEMS</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-calligraphy text-[#ccff00]">Dynamics</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">★</span>
        </InfiniteMarquee>
      </section>

      {/* 3. FOUNDER SECTION */}
      <FounderSection />

      {/* 4. PRODUCTION GALLERY INTEGRATION */}
      <section className="h-[150vh] w-full bg-black overflow-hidden flex flex-col p-8 md:p-24 border-y-4 border-[#ccff00]">
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter">System Snapshots</h2>
          <p className="text-[#ccff00] font-mono tracking-widest uppercase text-sm">Deployment Archive // High-Fidelity Logic</p>
        </div>
        <div className="flex-1 min-h-0 border-4 border-white/20 bg-black/40 backdrop-blur-sm p-4">
          <DynamicFrameLayout 
            frames={GALLERY_FRAMES} 
            className="w-full h-full" 
            hoverSize={6}
            gapSize={4}
            showFrames={true}
          />
        </div>
      </section>

      {/* 5. MANIFESTO (Funky Text Reveal) */}
      <section className="bg-black py-40 border-y-4 border-[#ccff00]">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="type-caption !text-lg mb-20 text-neutral-500 tracking-widest uppercase border-l-4 border-[#ccff00] pl-6">The Studio Method</h3>
          <FunkyTextReveal
            content={[
              { text: "We", className: "text-white" },
              { text: "reject", className: "text-white" },
              { text: "the", className: "text-white" },
              { text: "CONVENTIONAL.", className: "line-through decoration-4 decoration-[#ff0080] text-neutral-600" },
              { text: "We", className: "text-white" },
              { text: "ENGINEER", className: "text-[#ccff00] font-black text-[1.5em] -rotate-6 inline-block" },
              { text: "the", className: "text-white" },
              { text: "cycle.", className: "font-mono bg-white text-black px-2 italic" },
              { text: "We", className: "text-white" },
              { text: "build", className: "text-white" },
              { text: "software", className: "text-white" },
              { text: "that", className: "text-white" },
              { text: "STRIKES", className: "font-calligraphy text-[1.5em] text-[#ff0080]" },
              { text: "with", className: "text-white" },
              { text: "surgical", className: "text-white" },
              { text: "precision", className: "text-white uppercase font-black" },
              { text: "and", className: "text-white" },
              { text: "AI", className: "text-black bg-[#ccff00] px-4 shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]" },
              { text: "soul.", className: "text-white italic" },
            ]}
          />
        </div>
      </section>

      {/* 5. FEATURES (Bento Grid) */}
      <section className="py-32 px-6 bg-white text-black relative">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="type-h2 text-black mb-6">
            THE <span className="text-[#ff0080]">METHOD</span>.
          </h2>
          <p className="text-neutral-500 font-mono text-xl max-w-2xl border-l-4 border-[#ccff00] pl-6">
            Everything you need to automate your legacy. <br />
            Engineered for high-fidelity performance.
          </p>
        </div>

        <FadeIn>
          <BentoGrid className="max-w-7xl mx-auto">
            <BentoGridItem
              title="LLM OPERATIONALIZATION"
              description="Native AI integration at the core of your software architecture."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border border-black items-center justify-center"><Sparkles className="h-12 w-12 text-[#ff0080] animate-pulse" /></div>}
              icon={<Sparkles className="h-6 w-6 text-black" />}
              className="md:col-span-2 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,128,1)]"
            />
            <BentoGridItem
              title="ZERO-FRICTION SDLC"
              description="Continuous delivery pipeline that never sleeps."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ff0080] border border-black items-center justify-center"><Zap className="h-12 w-12 text-black" /></div>}
              icon={<Zap className="h-6 w-6 text-[#ff0080]" />}
              className="md:col-span-1 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] hover:bg-neutral-50"
            />
            <BentoGridItem
              title="ATOMIC SCALING"
              description="Infrastructure that scales horizontally without breaking a sweat."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border border-black items-center justify-center"><Code2 className="h-12 w-12 text-black" /></div>}
              icon={<Code2 className="h-6 w-6 text-[#ccff00]" />}
              className="md:col-span-1 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(25,25,25,1)] hover:bg-neutral-50"
            />
            <BentoGridItem
              title="DYNAMIC ARCHITECTURE"
              description="Self-healing systems built for the evolving modern web."
              header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border border-black items-center justify-center"><GlobeIcon className="h-12 w-12 text-black animate-spin-slow" /></div>}
              icon={<GlobeIcon className="h-6 w-6 text-black" />}
              className="md:col-span-2 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,255,255,1)]"
            />
          </BentoGrid>
        </FadeIn>
      </section>

      {/* 5.5 PERFORMANCE STRIP */}
      <section className="py-20 bg-[#f8f8f8] border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-2">
            <h3 className="type-h2 !text-6xl text-[#1a73e8]">99.9%</h3>
            <p className="font-mono font-bold uppercase tracking-widest text-black">System Uptime</p>
          </div>
          <div className="space-y-2">
            <h3 className="type-h2 !text-6xl text-[#ccff00] text-stroke-2">4.8x</h3>
            <p className="font-mono font-bold uppercase tracking-widest text-black">Velocity Increase</p>
          </div>
          <div className="space-y-2">
            <h3 className="type-h2 !text-6xl text-[#ff0080]">0.1ms</h3>
            <p className="font-mono font-bold uppercase tracking-widest text-black">Internal Latency</p>
          </div>
        </div>
      </section>


      {/* 6. FAQ Section */}
      <section className="py-32 bg-white">
        <FAQ />
      </section>



    </main>
  );
}
