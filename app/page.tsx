"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { TextRevealByWord, FunkyTextReveal } from "@/components/ui/text-reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
// import { VelocityScroll } from "@/components/ui/velocity-scroll";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Code2, Globe as GlobeIcon, Sparkles, Zap } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import gsap from "gsap";
import { ParallaxGallery } from "@/components/ui/parallax-gallery";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  // SCENE 1: EXIT
  const text1Opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const text1X = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const text1Display = useTransform(scrollYProgress, (pos) => pos > 0.3 ? "none" : "flex");

  // SCENE 2: ENTRY
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const text2X = useTransform(scrollYProgress, [0.4, 0.8], [100, 0]);

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
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 md:px-20 pt-20">

          {/* Dynamic Background Gradients */}
          <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#ccff00] blur-[120px] opacity-20 animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#ff0080] blur-[120px] opacity-10 pointer-events-none" />

          <div className="w-full h-full relative flex items-center">

            {/* SCENE 1: VISTAAR SERVICES (Fades Out) */}
            <motion.div
              style={{ opacity: text1Opacity, x: text1X, display: text1Display }}
              className="absolute left-0 z-20 flex flex-col justify-center w-full md:w-auto"
            >
              <div className="flex flex-col relative leading-[0.8]">
                <div className="flex items-baseline gap-2 md:gap-8 flex-wrap justify-center md:justify-start">
                  <h1 className="hero-char text-[15vw] md:text-[11vw] font-black tracking-tighter text-black mix-blend-multiply">
                    VISTAAR
                  </h1>
                  <span className="hero-tag inline-block px-3 py-1 md:px-6 md:py-2 rounded-full border-2 border-black text-sm md:text-2xl font-bold font-mono bg-[#ccff00] -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-0 transition-transform cursor-crosshair">
                    v2.0
                  </span>
                </div>
                <div className="flex items-center gap-2 md:gap-8 -mt-2 md:-mt-6 flex-wrap justify-center md:justify-start">
                  <h1 className="hero-char text-[12vw] md:text-[11vw] font-medium text-[#ff0080] font-calligraphy">
                    Services
                  </h1>
                  <div className="hero-tag w-12 h-12 md:w-24 md:h-24 rounded-full bg-black flex items-center justify-center text-white font-mono text-[8px] md:text-xs text-center p-1 md:p-2 rotate-12 hover:-rotate-12 transition-transform">
                    EST. <br /> 2024
                  </div>
                </div>
              </div>
              <p className="hero-text mt-8 md:mt-12 max-w-2xl text-lg md:text-2xl font-medium text-neutral-800 leading-relaxed font-mono text-center md:text-left mx-auto md:mx-0">
                <span className="bg-neutral-100 px-1 border-b-2 border-black">WE BUILD</span> SOFTWARE THAT FEELS <span className={`font-calligraphy font-bold text-4xl md:text-5xl text-[#1a73e8]`}>alive</span>.
                NO BORING TEMPLATES. JUST PURE <motion.span animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} className="bg-[#ccff00] px-2 font-bold border border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block">CHAOS & CODE</motion.span>.
              </p>
              <div className="mt-8 md:mt-12 flex gap-4 pointer-events-auto justify-center md:justify-start">
                <MagneticButton className="hero-btn px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#1a73e8] text-white font-medium text-base md:text-lg hover:bg-[#1557b0] transition-colors shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">
                  Get Started
                </MagneticButton>
                <MagneticButton className="hero-btn px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#F1F3F4] text-[#1a73e8] font-medium text-base md:text-lg hover:bg-[#e8eaed] transition-colors active:scale-95 transition-transform flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Watch Film
                </MagneticButton>
              </div>
            </motion.div>

            {/* SCENE 2: DIGITAL GROWTH (Fades In) */}
            <motion.div
              style={{ opacity: text2Opacity, x: text2X }}
              className="absolute right-0 text-right z-20 flex flex-col items-end justify-center pointer-events-none w-full"
            >
              <div className="flex flex-col relative leading-[0.8] items-end">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block px-4 py-1 rounded-full border border-black text-sm font-bold font-mono bg-white text-black -rotate-3">
                    Strategy
                  </span>
                  <span className="inline-block px-4 py-1 rounded-full border border-black text-sm font-bold font-mono bg-[#ff0080] text-white rotate-2">
                    Execution
                  </span>
                </div>
                <h1 className="text-[10vw] md:text-[8vw] font-black tracking-tighter text-black mix-blend-multiply">
                  DIGITAL
                </h1>
                <h1 className="text-[10vw] md:text-[8vw] font-black tracking-tighter text-[#ccff00] min-w-max stroke-black text-stroke-2 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]">
                  GROWTH
                </h1>
              </div>
              <p className="mt-8 md:mt-12 max-w-xl text-lg md:text-2xl font-medium text-neutral-800 leading-relaxed font-mono text-right ml-auto">
                SCALING BRANDS WITH <span className="bg-black text-white px-2 italic">PURE MATH</span> <br />
                AND <span className="font-calligraphy font-bold text-5xl text-[#ff0080] decoration-wavy underline decoration-[#ccff00]">artistic chaos</span>.
              </p>
              <div className="mt-8 flex gap-4 justify-end">
                <div className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[200px] text-left transform rotate-2">
                  <p className="font-bold text-xs uppercase text-neutral-500">Revenue Impact</p>
                  <p className="font-black text-3xl text-black">+240%</p>
                </div>
                <div className="p-4 border-2 border-black bg-[#ccff00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[200px] text-left transform -rotate-2">
                  <p className="font-bold text-xs uppercase text-black/60">Speed</p>
                  <p className="font-black text-3xl text-black">0.1s</p>
                </div>
              </div>
            </motion.div>

            {/* 3D GLOBE (Moves Left) */}
            <motion.div
              style={{ x: globeX, scale: globeScale, right: globeRight }}
              className="absolute top-[10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] z-10"
            >
              <Globe />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. FUNKY MARQUEE */}
      <section className="py-20 bg-black overflow-hidden transform -rotate-2 scale-105 z-20 relative border-y-4 border-[#ccff00]">
        <InfiniteMarquee speed="fast">
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">FUTURE</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-serif italic text-[#ff0080]">CHAOS</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-mono text-transparent stroke-text [-webkit-text-stroke:2px_#ccff00]">DESIGN</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">CODE</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-calligraphy text-[#ccff00]">Motion</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">★</span>

          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">FUTURE</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-serif italic text-[#ff0080]">CHAOS</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-mono text-transparent stroke-text [-webkit-text-stroke:2px_#ccff00]">DESIGN</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">CODE</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 font-calligraphy text-[#ccff00]">Motion</span>
          <span className="text-8xl md:text-9xl font-black uppercase mx-8 text-white">★</span>
        </InfiniteMarquee>
      </section>

      {/* 3. PARALLAX GALLERY */}
      <section className="bg-white py-20">
        <div className="px-6 mb-12">
          <h2 className={`text-6xl md:text-8xl font-black text-black tracking-tighter uppercase mb-4`}>
            Visual <span className="text-transparent stroke-text text-stroke-2">Noise</span>
          </h2>
        </div>
        {/* @ts-ignore */}
        <ParallaxGallery />
      </section>

      {/* 4. MANIFESTO (Funky Text Reveal) */}
      <section className="bg-black py-40 border-y-4 border-[#ccff00]">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-mono mb-20 text-neutral-500 font-bold tracking-widest uppercase border-l-4 border-[#ccff00] pl-6">The Mission</h3>
          <FunkyTextReveal
            content={[
              { text: "We", className: "text-white" },
              { text: "reject", className: "text-white" },
              { text: "the", className: "text-white" },
              { text: "BORING.", className: "line-through decoration-4 decoration-[#ff0080] text-neutral-600" },
              { text: "We", className: "text-white" },
              { text: "SMASH", className: "text-[#ccff00] font-black text-[1.5em] -rotate-6 inline-block" },
              { text: "the", className: "text-white" },
              { text: "grid.", className: "font-mono bg-white text-black px-2 italic" },
              { text: "We", className: "text-white" },
              { text: "build", className: "text-white" },
              { text: "digital", className: "text-white" },
              { text: "punch", className: "font-calligraphy text-[1.5em] text-[#ff0080]" },
              { text: "you", className: "text-white" },
              { text: "in", className: "text-white" },
              { text: "the", className: "text-white" },
              { text: "face", className: "text-white uppercase font-black" },
              { text: "with", className: "text-white" },
              { text: "beauty.", className: "text-black bg-[#ccff00] px-4 shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]" },
            ]}
          />
        </div>
      </section>

      {/* 5. FEATURES (Bento Grid) */}
      <section className="py-32 px-6 bg-white text-black relative">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black mb-6">
            THE <span className="text-[#ff0080]">STACK</span>.
          </h2>
          <p className="text-neutral-500 font-mono text-xl max-w-2xl border-l-4 border-[#ccff00] pl-6">
            Everything you need to dominate the internet. <br />
            Engineered for chaos.
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          <BentoGridItem
            title="GLOBAL EDGE"
            description="Deploy instantly to the edge of reason."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border border-black flex items-center justify-center"><GlobeIcon className="h-12 w-12 text-black animate-spin-slow" /></div>}
            icon={<GlobeIcon className="h-6 w-6 text-black" />}
            className="md:col-span-2 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,128,1)]"
          />
          <BentoGridItem
            title="INSTANT"
            description="Faster than thought."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ff0080] border border-black flex items-center justify-center"><Zap className="h-12 w-12 text-black" /></div>}
            icon={<Zap className="h-6 w-6 text-[#ff0080]" />}
            className="md:col-span-1 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] hover:bg-neutral-50"
          />
          <BentoGridItem
            title="AI CORE"
            description="Intelligence baked in."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border border-black flex items-center justify-center"><Sparkles className="h-12 w-12 text-black" /></div>}
            icon={<Sparkles className="h-6 w-6 text-[#ccff00]" />}
            className="md:col-span-1 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(25,25,25,1)] hover:bg-neutral-50"
          />
          <BentoGridItem
            title="CLEAN CODE"
            description="Spaghetti is for dinner, not production."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 border border-black flex items-center justify-center"><Code2 className="h-12 w-12 text-black" /></div>}
            icon={<Code2 className="h-6 w-6 text-black" />}
            className="md:col-span-2 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,255,255,1)]"
          />
        </BentoGrid>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-20 px-6 bg-[#ccff00] border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-black">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Vistaar</h2>
          <div className="flex gap-8 mt-6 md:mt-0 font-bold font-mono text-lg">
            <a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-black">Privacy</a>
            <a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-black">Terms</a>
            <a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-black">Twitter</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
