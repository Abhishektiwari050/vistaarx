"use client";
import React from "react";
import Image from "next/image";
import { FadeIn, SlideUp } from "@/components/motion/MotionWrappers";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 font-sans selection:bg-[#ccff00] selection:text-black">

            {/* 1. HERO: MISSION */}
            <section className="relative py-32 px-6 overflow-hidden border-b-4 border-[#ccff00]">
                <div className="absolute top-0 right-[-10%] w-[50vh] h-[50vh] bg-[#ccff00] blur-[150px] opacity-20 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <FadeIn>
                        <div className="inline-block px-4 py-1 border-2 border-[#ccff00] text-[#ccff00] font-mono font-bold uppercase tracking-widest mb-8 rotate-[-2deg]">
                            Established 2024
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
                            Startups <br />
                            <span className="text-transparent stroke-text text-stroke-2">Die In</span> <br />
                            Silence.
                        </h1>
                        <p className="text-xl md:text-3xl font-mono text-neutral-400 max-w-4xl leading-relaxed border-l-4 border-[#ff0080] pl-8">
                            We built Vistaar to be the <span className="text-white font-bold">LOUDEST</span> force in the room. We reject boring B2B templates. We build digital engines that print money and demand attention.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY */}
            <section className="py-32 px-6 bg-white text-black">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <SlideUp>
                        <h2 className="type-h2 mb-8">
                            Chaos <span className="text-[#ff0080]">&</span> Code.
                        </h2>
                        <div className="space-y-6 text-lg font-medium text-neutral-800 leading-relaxed font-mono">
                            <p>
                                Most agencies play it safe. They give you a generic template, a "safe" color palette, and a website that looks exactly like your competitor's.
                            </p>
                            <p>
                                <span className="bg-black text-[#ccff00] px-2 font-bold">WE DON'T DO SAFE.</span>
                            </p>
                            <p>
                                We believe that to win in the global market, you need to disrupt the pattern. You need speed, aggression, and technology that feels like magic.
                            </p>
                            <p>
                                Vistaar works exclusively with exporters and brands ready to scale. If you're happy with 10% growth, go elsewhere. If you want to dominate, you're home.
                            </p>
                        </div>
                    </SlideUp>
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#ccff00] translate-x-4 translate-y-4 border-4 border-black" />
                        <div className="relative border-4 border-black bg-neutral-100 p-8 md:p-12 aspect-square flex flex-col justify-center">
                            <h3 className="text-4xl font-black uppercase mb-4">The Standard</h3>
                            <ul className="space-y-4 font-mono font-bold text-lg">
                                <li className="flex items-center gap-4">
                                    <span className="w-6 h-6 bg-[#ff0080] rounded-full border-2 border-black" />
                                    No Templates
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-6 h-6 bg-[#1a73e8] rounded-full border-2 border-black" />
                                    Speed Obsessed (0.1s Load)
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-6 h-6 bg-[#ccff00] rounded-full border-2 border-black" />
                                    ROI or Die
                                </li>
                                <li className="flex items-center gap-4">
                                    <span className="w-6 h-6 bg-black rounded-full border-2 border-black" />
                                    Full Transparency
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="py-32 px-6 bg-[#ccff00] text-black border-t-4 border-black text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12">
                        Join the <br /> Revolution
                    </h2>
                    <Link href="/contact">
                        <MagneticButton className="px-12 py-6 bg-black text-white text-xl font-bold uppercase tracking-widest border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,0,128,1)] hover:-translate-y-1">
                            Book Strategy Call
                        </MagneticButton>
                    </Link>
                </div>
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            </section>

        </main>
    );
}
