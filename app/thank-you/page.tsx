"use client";
import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/motion/MotionWrappers";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">

            {/* BACKGROUND DECOR */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#ccff00] rounded-full blur-[150px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#ff0080] rounded-full blur-[150px] opacity-10 pointer-events-none" />

            <FadeIn className="max-w-4xl mx-auto text-center relative z-10">

                {/* SUCCESS ICON */}
                <div className="mx-auto w-24 h-24 bg-[#ccff00] border-4 border-black rounded-full flex items-center justify-center mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>

                <h1 className="type-h1 text-black mb-6">
                    Message <span className="text-transparent stroke-text text-stroke-2">Received</span>.
                </h1>
                <p className="type-body text-neutral-600 max-w-2xl mx-auto mb-12 font-mono">
                    You've just taken the first step towards domination. Our team is already reviewing your details and will be in touch within 24 hours.
                </p>

                {/* WHAT HAPPENS NEXT */}
                <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
                    <div className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[#ff0080] font-black text-4xl mb-2 block">01</span>
                        <h3 className="text-xl font-bold uppercase mb-2">Review</h3>
                        <p className="font-mono text-sm text-neutral-600">We analyze your current setup and identify immediate growth levers.</p>
                    </div>
                    <div className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[#1a73e8] font-black text-4xl mb-2 block">02</span>
                        <h3 className="text-xl font-bold uppercase mb-2">Strategy</h3>
                        <p className="font-mono text-sm text-neutral-600">We schedule a call to present a custom roadmap for your business.</p>
                    </div>
                    <div className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-[#ccff00] font-black text-4xl mb-2 block text-stroke-1">03</span>
                        <h3 className="text-xl font-bold uppercase mb-2">Launch</h3>
                        <p className="font-mono text-sm text-neutral-600">We deploy systems that automate your growth on autopilot.</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                    <p className="font-bold uppercase tracking-widest text-sm text-neutral-400">While you wait</p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/work">
                            <MagneticButton className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wider border-2 border-transparent hover:bg-[#ccff00] hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Explore Case Studies
                            </MagneticButton>
                        </Link>
                        <Link href="/">
                            <MagneticButton className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider border-2 border-black hover:bg-neutral-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Back to Home
                            </MagneticButton>
                        </Link>
                    </div>
                </div>

            </FadeIn>
        </main>
    );
}
