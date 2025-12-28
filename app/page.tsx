"use client";

import React, { useEffect, useRef } from "react";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { VelocityScroll } from "@/components/ui/velocity-scroll";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Code2, Globe, Sparkles, Zap } from "lucide-react";
import gsap from "gsap";
import { ParallaxGallery } from "@/components/ui/parallax-gallery";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Entrance Animation (Elastic/Funky)
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

      {/* 1. HERO SECTION (MAXIMALIST) */}
      <section ref={heroRef} className="h-screen w-full flex flex-col justify-center px-4 md:px-20 pt-20 relative overflow-hidden bg-white">

        {/* Dynamic Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#ccff00] blur-[120px] opacity-20 animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#ff0080] blur-[120px] opacity-10 pointer-events-none" />

        <div className="max-w-[95vw] z-10 relative">
          {/* Main Title: Mixed Fonts */}
          <div className="flex flex-col relative leading-[0.8]">
            <div className="flex items-baseline gap-4 md:gap-8 flex-wrap">
              <h1 className="hero-char text-[12vw] md:text-[11vw] font-black tracking-tighter text-black mix-blend-multiply">
                VISTAAR
              </h1>
              <span className="hero-tag inline-block px-4 py-1 md:px-8 md:py-2 rounded-full border-2 border-black text-lg md:text-3xl font-bold font-mono bg-[#ccff00] -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                v2.0
              </span>
            </div>

            <div className="flex items-center gap-4 md:gap-8 -mt-2 md:-mt-6 flex-wrap">
              <span className={`hero-char text-[10vw] md:text-[11vw] font-medium italic text-[#ff0080] font-serif`}>
                Design
              </span>
              <div className="hero-tag w-16 h-16 md:w-32 md:h-32 rounded-full bg-black flex items-center justify-center text-white font-mono text-xs md:text-sm text-center p-2 rotate-12">
                EST. <br /> 2024
              </div>
              <h1 className="hero-char text-[12vw] md:text-[11vw] font-black tracking-tighter text-black">
                X
              </h1>
            </div>
          </div>

          {/* Subtitle / Manifesto */}
          <p className="hero-text mt-12 max-w-2xl text-xl md:text-2xl font-medium text-neutral-800 leading-relaxed font-mono">
            <span className="bg-neutral-100 px-1">WE BUILD</span> SOFTWARE THAT FEELS <span className={`italic font-serif font-bold text-3xl`}>alive</span>.
            NO BORING TEMPLATES. JUST PURE <span className="bg-[#ccff00] px-2 font-bold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">CHAOS & CODE</span>.
          </p>


          <div className="mt-12 flex gap-4">
            <MagneticButton className="hero-btn px-8 py-4 rounded-full bg-[#1a73e8] text-white font-medium text-lg hover:bg-[#1557b0] transition-colors shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">
              Get Started
            </MagneticButton>
            <MagneticButton className="hero-btn px-8 py-4 rounded-full bg-[#F1F3F4] text-[#1a73e8] font-medium text-lg hover:bg-[#e8eaed] transition-colors active:scale-95 transition-transform">
              Watch Film
            </MagneticButton>
          </div>
        </div>

        {/* Abstract Decorative Circle (Google Style) */}
        <div className="hero-text absolute -right-[10%] top-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-b from-[#e8f0fe] to-white blur-[100px] opacity-60 pointer-events-none" />
      </section>

      {/* 2. FUNKY MARQUEE */}
      <section className="py-20 bg-black overflow-hidden transform -rotate-2 scale-105 z-20 relative border-y-4 border-[#ccff00]">
        <VelocityScroll text="FUTURE • CHAOS • DESIGN • CODE • MOTION • POWER • " default_velocity={4} />
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

      {/* 4. MANIFESTO (Text Reveal) */}
      <section className="bg-[#ccff00] py-40">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-mono mb-8 text-black font-bold tracking-widest uppercase">The Mission</h3>
          <TextRevealByWord text="We reject the boring. We smash the grid. We build digital experiences that punch you in the face with beauty and spring back with physics." />
        </div>
      </section>

      {/* 5. FEATURES (Bento Grid) */}
      <section className="py-32 px-6 bg-black text-white relative">
        <div className="max-w-7xl mx-auto mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            THE <span className="text-[#ff0080]">STACK</span>.
          </h2>
          <p className="text-neutral-400 font-mono text-xl max-w-2xl border-l-4 border-[#ccff00] pl-6">
            Everything you need to dominate the internet. <br />
            Engineered for chaos.
          </p>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          <BentoGridItem
            title="GLOBAL EDGE"
            description="Deploy instantly to the edge of reason."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#111] border border-neutral-800 flex items-center justify-center"><Globe className="h-12 w-12 text-[#ccff00] animate-spin-slow" /></div>}
            icon={<Globe className="h-6 w-6 text-[#ccff00]" />}
            className="md:col-span-2 bg-[#111] border-neutral-800 shadow-none hover:shadow-[8px_8px_0px_0px_rgba(255,0,128,1)]"
          />
          <BentoGridItem
            title="INSTANT"
            description="Faster than thought."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ff0080] border border-black flex items-center justify-center"><Zap className="h-12 w-12 text-black" /></div>}
            icon={<Zap className="h-6 w-6 text-[#ff0080]" />}
            className="md:col-span-1 bg-[#111] border-neutral-800 shadow-none hover:shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] hover:bg-[#222]"
          />
          <BentoGridItem
            title="AI CORE"
            description="Intelligence baked in."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#ccff00] border border-black flex items-center justify-center"><Sparkles className="h-12 w-12 text-black" /></div>}
            icon={<Sparkles className="h-6 w-6 text-[#ccff00]" />}
            className="md:col-span-1 bg-[#111] border-neutral-800 shadow-none hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:bg-[#222]"
          />
          <BentoGridItem
            title="CLEAN CODE"
            description="Spaghetti is for dinner, not production."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-[#111] border border-neutral-800 flex items-center justify-center"><Code2 className="h-12 w-12 text-white" /></div>}
            icon={<Code2 className="h-6 w-6 text-white" />}
            className="md:col-span-2 bg-[#111] border-neutral-800 shadow-none hover:shadow-[8px_8px_0px_0px_rgba(0,255,255,1)]"
          />
        </BentoGrid>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-20 px-6 bg-[#ccff00] border-t-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-black">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Vistaar X</h2>
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
