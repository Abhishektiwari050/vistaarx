"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "@/components/ui/globe";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sections = gsap.utils.toArray(".horizontal-section");

        // Horizontal Scroll Animation
        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                // Adjust the total scroll length (e.g., "+=3000" means 3000px of vertical scroll)
                end: "+=3000",
                // snap: 1 / (sections.length - 1), // Optional snapping
            },
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        // Outer wrapper that gets pinned
        <div ref={triggerRef} className="overflow-hidden">

            {/* 
        The "track" that moves left. 
        Width = 300vw (since we have 3 sections of 100vw each)
      */}
            <div
                ref={containerRef}
                className="flex w-[300vw] h-screen relative"
            >

                {/* =======================
            SECTION 1: HERO INTRO
           ======================= */}
                <section className="horizontal-section w-screen h-screen flex flex-col md:flex-row items-center justify-center relative p-6 md:p-20 overflow-hidden bg-background shrink-0">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-200/50 via-background to-background pointer-events-none" />

                    {/* TEXT CONTENT */}
                    <div className="w-full md:w-1/2 z-10 flex flex-col justify-center">
                        <h2 className="text-cyan-400 font-bold tracking-[0.2em] text-sm md:text-base mb-6 uppercase animate-fade-in-up">
                            Vistaar Agency
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-black text-foreground leading-[0.95] mb-8 tracking-tighter">
                            BUILD <br />
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">ERROR</span><br />
                            FREE.
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-500 max-w-lg leading-relaxed mb-10 font-light">
                            We craft digital systems that don&apos;t just work—they dominate. From local markets to global stages.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="group relative px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
                                <span className="relative z-10 group-hover:text-white transition-colors">Start Project</span>
                                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            </Link>
                        </div>
                    </div>

                    {/* 3D CONTENT */}
                    <div className="w-full md:w-1/2 h-[50vh] md:h-full z-0 relative flex items-center justify-center">
                        <div className="absolute inset-0 w-full h-full scale-125 md:scale-100 translate-y-10 md:translate-y-0 flex items-center justify-center overflow-visible">
                            <Globe className="scale-150 relative top-20" />
                        </div>
                    </div>

                    {/* SCROLL HINT */}
                    <div className="absolute bottom-10 right-10 flex items-center gap-4 text-neutral-400 animate-pulse">
                        <span className="uppercase text-sm tracking-widest">Scroll to Explore</span>
                        <svg className="w-6 h-6 rotate-[-90deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </section>


                {/* =======================
            SECTION 2: STATEMENT
           ======================= */}
                <section className="horizontal-section w-screen h-screen flex items-center justify-center bg-background text-foreground shrink-0 relative overflow-hidden">
                    {/* Large Background Text for Texture */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                        <span className="text-[40vw] font-black leading-none">GO</span>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 text-center z-10">
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8 tracking-tight">
                            Not just another agency. <br />
                            <span className="text-cyan-500">Your growth partner.</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 text-left">
                            <div className="space-y-4 border-l-2 border-neutral-200 pl-6 hover:border-cyan-500 transition-colors duration-300">
                                <h3 className="text-2xl font-bold">Strategy First</h3>
                                <p className="text-neutral-500 text-lg">We don&apos;t guess. We analyze data, market trends, and user behavior to build a roadmap that works.</p>
                            </div>
                            <div className="space-y-4 border-l-2 border-white/10 pl-6 hover:border-cyan-500 transition-colors duration-300">
                                <h3 className="text-2xl font-bold">Design Centric</h3>
                                <p className="text-neutral-400 text-lg">First impressions matter. We create visually stunning interfaces that captivate and convert.</p>
                            </div>
                            <div className="space-y-4 border-l-2 border-white/10 pl-6 hover:border-cyan-500 transition-colors duration-300">
                                <h3 className="text-2xl font-bold">Growth Focused</h3>
                                <p className="text-neutral-400 text-lg">Building is just the start. We help you scale with SEO, social media, and paid acquisition.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* =======================
            SECTION 3: CTA / CONCLUSION
           ======================= */}
                <section className="horizontal-section w-screen h-screen flex flex-col items-center justify-center bg-neutral-100 text-foreground shrink-0 relative p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent pointer-events-none" />

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter">
                            READY?
                        </h2>
                        <p className="text-xl md:text-3xl text-neutral-600 mb-12 max-w-2xl mx-auto font-light">
                            The future of your brand starts with a single step. Let&apos;s make it legendary.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-12 py-6 bg-cyan-500 text-black font-bold text-xl rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)]"
                        >
                            Schedule Strategy Call
                        </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neutral-200 to-transparent pointer-events-none" />
                </section>

            </div>
        </div>
    );
};
