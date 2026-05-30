"use client";

import { useScrollStore } from "@/lib/stores/scroll-store";
import { TiltCard } from "@/components/3d/tilt-card";
import Link from "next/link";
import { ThemeOverlay } from "@/components/theme-overlay";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";

export default function AboutPage() {
  const { theme, textPrimary, brutalistCard: cardClass, innerCore, accentTag } = useThemeStyles();
  const textSecondary = {
    "cyber-light": "text-neutral-700 font-medium",
    "cyber-dark": "text-neutral-300 font-medium",
    mono: "text-neutral-300 font-medium",
    solar: "text-neutral-900 font-medium",
  }[theme];
  const borderClass = {
    "cyber-light": "border-black",
    "cyber-dark": "border-[#ff0080]",
    mono: "border-white",
    solar: "border-black",
  }[theme];
  
  const philosophyCardOuter = cardClass;
  const philosophyCardInner = theme === 'mono'
    ? "h-full p-10 md:p-14 bg-black text-white rounded-[calc(2.5rem-0.5rem)] border border-neutral-800"
    : innerCore;

  return (
    <div className="w-full min-h-[180vh] flex flex-col px-6 md:px-12 py-20 z-20 relative pointer-events-auto max-w-7xl mx-auto space-y-32">
      {/* Native dynamic React 19 document title */}
      <title>About Us // Vistar Studio</title>
      <meta name="description" content="Meet Abhishek Tiwari and the elite software engineers and designers behind Vistar Studio, building high-performance 3D visual architectures." />

      {/* Symmetrical, highly restrained theme-adaptive CSS glass backdrop overlay for readability */}
      <ThemeOverlay />

      {/* Section 1: Team Story (Left Aligned, Logo on Right) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10 pt-16">
        <TiltCard intensity={5} className={`${philosophyCardOuter} md:col-span-6 transform-gpu`}>
          <div className={`${philosophyCardInner} space-y-8 h-full flex flex-col justify-between`}>
            <div>
              <span className={`font-mono text-[8px] font-bold uppercase tracking-[0.15em] px-3 py-1 ${accentTag} inline-block mb-6`}>
                01 / Profile
              </span>
              <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary} mb-6`}>
                MEET THE <br/>ARCHITECTS
              </h3>
              <p className={`font-sans text-xs md:text-sm font-light ${textSecondary} leading-relaxed mb-4`}>
                Vistar Studio is an elite boutique digital engineering laboratory. We are not a bloated generalist agency. We are a tightly knit team of senior developers and visual artists who believe in engineering excellence, mathematical precision, and commercial impact.
              </p>
              <p className={`font-sans text-xs md:text-sm font-light ${textSecondary} leading-relaxed`}>
                Founded by industry veterans who have built <strong>40+ bespoke digital platforms across 12 distinct sectors</strong>—including algorithmic trading dashboards, high-speed 3D graphics interfaces, and secure enterprise cloud databases. We construct systems that perform, convert, and scale.
              </p>
            </div>
          </div>
        </TiltCard>
        
        {/* Empty column where the 3D logo tumbles in the background */}
        <div className="hidden md:block md:col-span-6 h-full" />
      </section>

      {/* Section 2: Founder Profiles & Legitimacy (Right Aligned, Logo shifts LEFT on scroll) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10">
        <div className="hidden md:block md:col-span-6 h-full" />

        <TiltCard intensity={5} className={`${philosophyCardOuter} md:col-span-6 transform-gpu`}>
          <div className={`${philosophyCardInner} space-y-8 h-full flex flex-col justify-between`}>
            <div>
              <span className={`font-mono text-[8px] font-bold uppercase tracking-[0.15em] px-3 py-1 ${accentTag} inline-block mb-6`}>
                02 / Heritage
              </span>
              <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary} mb-6`}>
                HUMAN-CENTRIC <br/>ENGINEERING
              </h3>
              
              {/* Symmetrical Brutalist Frame for Founder Bio details */}
              <div className={`p-6 border-[3px] border-black bg-[#fdfbf7] dark:bg-black space-y-4 font-sans text-xs mb-6 rounded-2xl shadow-[6px_6px_0px_#ff0080]`}>
                <div className="flex gap-6 items-start md:flex-row flex-col">
                  {/* Beautiful custom vector outline avatar container */}
                  <div className={`w-20 h-20 border-[3px] border-black bg-[#ff0080]/15 flex items-center justify-center font-mono font-bold text-2xl select-none shrink-0 relative rounded-xl shadow-[3px_3px_0px_#000] ${theme === 'mono' ? 'bg-black text-white' : ''}`}>
                    <svg className="absolute inset-0 w-full h-full p-2 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span className={`absolute bottom-1 right-1 font-mono text-[7px] font-bold tracking-wider px-1 py-0.5 rounded ${theme === 'mono' ? 'bg-white text-black' : 'bg-black text-white'}`}>HQ</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-mono text-base font-black uppercase tracking-tight ${textPrimary}`}>Abhishek Tiwari</h4>
                    <p className="font-mono text-[8px] text-[#ff0080] font-bold uppercase tracking-[0.15em]">Founder & Chief Architect</p>
                    <p className={`mt-2 ${textSecondary} leading-relaxed text-[11px] font-light`}>
                      Over 8 years of enterprise full-stack experience compiling low-latency codebases. Abhishek started Vistar Studio to bridge advanced WebGL interactive layers with high-performance edge architectures, delivering flawless visual platforms that scale infinitely.
                    </p>
                    
                    {/* Verified Founder Social Coordinates */}
                    <div className="flex gap-3 pt-2 text-[#ff0080] dark:text-white select-none pointer-events-auto interactive font-mono text-[9px] font-bold">
                      <a href="https://linkedin.com/in/abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        LinkedIn ↗
                      </a>
                      <a href="https://github.com/Abhishektiwari050" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        GitHub ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className={`font-sans text-xs md:text-sm font-light ${textSecondary} leading-relaxed`}>
              We pride ourselves on direct transparency: the engineers who write the architectures are the ones you deal with directly. No account managers, no jargon buffers. Just direct results and genuine alignment.
            </p>
          </div>
        </TiltCard>
      </section>

      {/* Section 3: Core Methodology */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full min-h-[80vh] items-center relative z-10 pb-16">
        <TiltCard intensity={5} className={`${philosophyCardOuter} md:col-span-6 transform-gpu`}>
          <div className={`${philosophyCardInner} space-y-8 h-full flex flex-col justify-between`}>
            <div>
              <span className={`font-mono text-[8px] font-bold uppercase tracking-[0.15em] px-3 py-1 ${accentTag} inline-block mb-6`}>
                03 / Standard
              </span>
              <h3 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] uppercase ${textPrimary} mb-6`}>
                OUR SYSTEMIC <br/>METHOD
              </h3>
              <p className={`font-sans text-xs md:text-sm font-light ${textSecondary} leading-relaxed mb-4`}>
                We treat digital architecture as physical infrastructure. Layout structures are locked to mathematically clean proportions. Visual calculations bypass legacy browser layouts, processing straight to the GPU.
              </p>
              <p className={`font-sans text-xs md:text-sm font-light ${textSecondary} leading-relaxed`}>
                This rigorous methodology guarantees that your website will load instantly, react to fluid gestures at peak speed, and operate with absolute zero downtime.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-4">
              <Link 
                href="/contact"
                className={`px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] rounded-full transition-all border ${
                  theme === 'mono' 
                    ? 'bg-white text-black border-neutral-200 hover:bg-neutral-100' 
                    : theme === 'cyber-dark'
                    ? 'bg-[#ff0080] text-white border-transparent hover:bg-white hover:text-black shadow-[0_8px_20px_rgba(255,0,128,0.2)]'
                    : theme === 'solar'
                    ? 'bg-[#ffcc00] text-black border-transparent hover:bg-[#ff9900]'
                    : 'bg-black text-white border-transparent hover:bg-neutral-800'
                }`}
              >
                Collaborate With Us →
              </Link>
            </div>
          </div>
        </TiltCard>
        
        <div className="hidden md:block md:col-span-6 h-full" />
      </section>
      
    </div>
  );
}
