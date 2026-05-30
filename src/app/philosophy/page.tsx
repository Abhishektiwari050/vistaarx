"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";
import Image from "next/image";
import { ThemeOverlay } from "@/components/theme-overlay";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";
import { 
  ManhwaPanel, 
  ManhwaSpeechBubble, 
  ManhwaStarburst, 
  ManhwaGutterDivider 
} from "@/components/manhwa/manhwa-panel";

export default function AboutPage() {
  const { theme, textPrimary, innerCore } = useThemeStyles();
  const textSecondary = {
    "cyber-light": "text-neutral-800 font-extrabold",
    "cyber-dark": "text-neutral-300 font-extrabold",
    mono: "text-neutral-700 font-extrabold",
    solar: "text-neutral-900 font-extrabold",
  }[theme];

  return (
    <div className="w-full min-h-[180vh] flex flex-col px-6 md:px-12 py-20 z-20 relative pointer-events-auto max-w-7xl mx-auto space-y-24 md:space-y-36">
      {/* Native dynamic React 19 document title */}
      <title>About Us // Vistar Studio</title>
      <meta name="description" content="Meet Abhishek Tiwari and the elite software engineers and designers behind Vistar Studio, building high-performance 3D visual architectures." />

      {/* Symmetrical, highly restrained theme-adaptive CSS glass backdrop overlay for readability */}
      <ThemeOverlay />

      {/* Dynamic Manga Conic Action Speed lines overlay */}
      <div className={`fixed inset-0 z-0 opacity-15 pointer-events-none transition-colors duration-500 ${theme === 'cyber-dark' ? 'manga-action-lines-white' : 'manga-action-lines'}`} />

      {/* Page Heading styled like a loud Webtoon Chapter Cover */}
      <div className="mb-10 mt-10 relative z-10 text-left">
        <h1 
          className="font-bangers text-[3.8rem] md:text-[5.5rem] uppercase leading-none select-none text-black dark:text-white"
          style={{ WebkitTextStroke: "1.8px #000" }}
        >
          STUDIO <br/> ARCHITECTS
        </h1>
        <p className="font-comic text-xs sm:text-sm text-neutral-400 mt-4 max-w-md font-bold uppercase tracking-wider">
          Behind the vectors and shaders: mathematical software engineers building absolute conversions at scale.
        </p>
      </div>

      {/* Section 1: Team Story (Left Aligned, Logo on Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center relative z-10 pt-4">
        <div className="lg:col-span-7">
          <ManhwaPanel 
            panelTheme="cyan"
            tilt="left"
            narration="01 // THE ARCHITECTS IDENTITY"
            className="w-full"
          >
            <div className={`${innerCore} space-y-6 h-full flex flex-col justify-between`}>
              <div className="space-y-4">
                <h3 
                  className="font-bangers text-[2.2rem] md:text-[2.8rem] uppercase leading-none text-black dark:text-white"
                  style={{ WebkitTextStroke: "1px #000" }}
                >
                  MEET THE ARCHITECTS
                </h3>
                <p className={`font-comic text-xs md:text-sm font-extrabold ${textSecondary} leading-relaxed`}>
                  Vistar Studio is an elite boutique digital engineering laboratory. We are not a bloated generalist agency. We are a tightly knit team of senior developers and visual artists who believe in engineering excellence, mathematical precision, and commercial impact.
                </p>
                <p className={`font-comic text-xs md:text-sm font-extrabold ${textSecondary} leading-relaxed`}>
                  Founded by industry veterans who have built <strong>40+ bespoke digital platforms across 12 distinct sectors</strong>—including algorithmic trading dashboards, high-speed 3D graphics interfaces, and secure enterprise cloud databases. We construct systems that perform, convert, and scale.
                </p>
              </div>
            </div>
          </ManhwaPanel>
        </div>
        
        {/* Empty space for dynamic 3D logo in the background */}
        <div className="hidden lg:block lg:col-span-5 h-full" />
      </section>

      {/* Jagged Panel Gutter divider between section */}
      <ManhwaGutterDivider themeType="lime" className="my-10" />

      {/* Section 2: Founder Profiles & Biography card (Right Aligned) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center relative z-10">
        <div className="hidden lg:block lg:col-span-4 h-full" />

        <div className="lg:col-span-8 w-full">
          <ManhwaPanel 
            panelTheme="orange"
            tilt="right"
            narration="02 // THE CHIEF FOUNDATION"
            className="w-full"
          >
            <div className={`${innerCore} space-y-6 h-full flex flex-col justify-between`}>
              
              {/* Specialized Manhwa Character Box detailing Abhishek Tiwari */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left Side inside bio: Character custom-drawn portrait illustration panel */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative w-full max-w-[180px] aspect-[1/1] border-[3.5px] border-black bg-neutral-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000] rotate-[-2deg]">
                    <Image 
                      src="/architect_char.png"
                      alt="Abhishek Tiwari - Founder & Chief Architect portrait illustration"
                      fill
                      className="object-cover"
                      sizes="180px"
                    />
                    <span className="absolute bottom-1 right-1 font-mono text-[7px] font-black tracking-wider px-1.5 py-0.5 rounded bg-black text-[#ccff00]">HQ</span>
                  </div>
                </div>

                {/* Right Side inside bio: Biography coordinates */}
                <div className="md:col-span-8 space-y-4">
                  
                  {/* Floating bubble pointing to biography details */}
                  <ManhwaSpeechBubble 
                    text="WE RE-BUILT DIGITAL ARCHITECTURE FROM SCRATCH!"
                    themeType="lime"
                    pointerPosition="left"
                    tilt="left"
                    className="mb-1"
                  />

                  <div className="space-y-1">
                    <h4 
                      className="font-bangers text-[2rem] uppercase leading-none text-black dark:text-white"
                      style={{ WebkitTextStroke: "1px #000" }}
                    >
                      Abhishek Tiwari
                    </h4>
                    <p className="font-mono text-[8px] text-[#ff0080] font-black uppercase tracking-[0.15em]">Founder & Chief Architect</p>
                  </div>
                  <p className={`font-comic text-xs font-extrabold ${textSecondary} leading-relaxed`}>
                    Over 8 years of enterprise full-stack experience compiling low-latency codebases. Abhishek started Vistar Studio to bridge advanced WebGL interactive layers with high-performance edge architectures, delivering flawless visual platforms that scale infinitely.
                  </p>
                  
                  {/* Verified Coordinates */}
                  <div className="flex gap-4 pt-1 font-mono text-[9px] font-black text-[#ff0080] dark:text-[#ccff00] select-none pointer-events-auto interactive">
                    <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      LinkedIn ↗
                    </a>
                    <a href="https://github.com/Abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                      GitHub ↗
                    </a>
                  </div>
                </div>

              </div>

              <p className={`font-comic text-xs md:text-sm font-extrabold ${textSecondary} leading-relaxed pt-4 border-t border-dashed border-black/15 dark:border-white/15`}>
                We pride ourselves on direct transparency: the engineers who write the architectures are the ones you deal with directly. No account managers, no jargon buffers. Just direct results and genuine alignment.
              </p>
            </div>
          </ManhwaPanel>
        </div>
      </section>

      {/* Jagged Panel Gutter divider between section */}
      <ManhwaGutterDivider themeType="pink" className="my-10" />

      {/* Section 3: Core Methodology (Left Aligned) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center relative z-10 pb-16">
        <div className="lg:col-span-7 relative">
          
          {/* Action starburst showing 99.9% Uptime badge */}
          <ManhwaStarburst 
            text="99.9% UP!" 
            themeType="pink" 
            size="md" 
            tilt="left" 
            className="absolute -top-12 -right-12 z-30"
          />

          <ManhwaPanel 
            panelTheme="yellow"
            tilt="left"
            narration="03 // THE METHODOLOGY PROTOCOL"
            className="w-full"
          >
            <div className={`${innerCore} space-y-6 h-full flex flex-col justify-between`}>
              <div className="space-y-4">
                <h3 
                  className="font-bangers text-[2.2rem] md:text-[2.8rem] uppercase leading-none text-black dark:text-white"
                  style={{ WebkitTextStroke: "1.2px #000" }}
                >
                  OUR SYSTEMIC METHOD
                </h3>
                <p className={`font-comic text-xs md:text-sm font-extrabold ${textSecondary} leading-relaxed`}>
                  We treat digital architecture as physical infrastructure. Layout structures are locked to mathematically clean proportions. Visual calculations bypass legacy browser layouts, processing straight to the GPU.
                </p>
                <p className={`font-comic text-xs md:text-sm font-extrabold ${textSecondary} leading-relaxed`}>
                  This rigorous methodology guarantees that your website will load instantly, react to fluid gestures at peak speed, and operate with absolute zero downtime.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-4 pointer-events-auto interactive select-none">
                <Link 
                  href="/contact"
                  className={`px-8 py-3.5 font-bangers text-base tracking-wider font-normal rounded-xl transition-all border-[3px] border-black shadow-[4px_4px_0px_#000] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
                    theme === 'mono' 
                      ? 'bg-black text-white hover:bg-neutral-900' 
                      : theme === 'cyber-dark'
                      ? 'bg-[#ff0080] text-white border-transparent shadow-[4px_4px_0px_#ff0080] hover:bg-white hover:text-black'
                      : theme === 'solar'
                      ? 'bg-[#ffcc00] text-black hover:bg-[#ff9900]'
                      : 'bg-[#ccff00] text-black hover:bg-black hover:text-[#ccff00]'
                  }`}
                >
                  Collaborate With Us →
                </Link>
              </div>
            </div>
          </ManhwaPanel>
        </div>
        
        <div className="hidden lg:block lg:col-span-5 h-full" />
      </section>
      
    </div>
  );
}
