"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t-4 border-[#ccff00] pt-24 pb-12 px-6 font-sans text-white overflow-hidden relative">
            {/* OVERSIZED BACKGROUND TYPOGRAPHY */}
            <div className="absolute bottom-[-5%] left-[-2%] pointer-events-none select-none opacity-[0.03] z-0">
                <h1 className="text-[25vw] font-black leading-none uppercase tracking-tighter">
                    VISTAR
                </h1>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 relative z-10">

                {/* BRAND COLUMN */}
                <div className="md:col-span-5 space-y-8">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative w-16 h-16 border-2 border-black bg-[#ccff00] p-2 shadow-[6px_6px_0px_0px_rgba(255,0,128,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-6 transition-all duration-300">
                            <Image
                                src="/vistar-logo.svg"
                                alt="Vistar Logo"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <div>
                            <span className="text-5xl font-black uppercase tracking-tighter italic block leading-none">
                                Vistar
                            </span>
                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#ff0080] font-bold">
                                AI Powered SDLC
                            </span>
                        </div>
                    </Link>
                    
                    <div className="space-y-4 max-w-sm">
                        <p className="font-mono text-xl font-medium leading-tight">
                            We build software that <span className="text-[#ccff00] decoration-pink-500/50 underline underline-offset-4">breathes</span>. 
                            AI-Driven engineering for the modern internet.
                        </p>
                        <p className="text-sm opacity-50 font-mono italic">
                            Complete software makers studio.
                        </p>
                    </div>
                </div>

                {/* SITEMAP / NAV */}
                <div className="md:col-span-2 space-y-8">
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-[#ccff00] opacity-80">Directory</h4>
                    <ul className="space-y-4 font-bold text-xl uppercase tracking-tighter">
                        <li>
                            <Link href="/" className="hover:text-[#ff0080] transition-colors flex items-center gap-2 group">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">/</span> Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:text-[#ff0080] transition-colors flex items-center gap-2 group">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">/</span> Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/work" className="hover:text-[#ff0080] transition-colors flex items-center gap-2 group">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">/</span> Laboratory
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-[#ff0080] transition-colors flex items-center gap-2 group">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ccff00]">/</span> Terminal
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* SOCIALS */}
                <div className="md:col-span-2 space-y-8">
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-[#ff0080] opacity-80">Uplinks</h4>
                    <ul className="space-y-4 font-mono font-medium text-lg">
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:bg-[#ccff00] hover:text-black px-2 -ml-2 transition-all w-fit">
                                <span className="text-xs">01.</span> TWITTER
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:bg-[#ccff00] hover:text-black px-2 -ml-2 transition-all w-fit">
                                <span className="text-xs">02.</span> LINKEDIN
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-2 hover:bg-[#ccff00] hover:text-black px-2 -ml-2 transition-all w-fit">
                                <span className="text-xs">03.</span> DRIBBBLE
                            </a>
                        </li>
                    </ul>
                </div>

                {/* CONTACT CTA */}
                <div className="md:col-span-3 space-y-8 bg-white/5 border border-white/10 p-8 shadow-[10px_10px_0px_0px_rgba(204,255,0,1)]">
                    <h4 className="font-black text-xl uppercase tracking-tighter">Ready to scale?</h4>
                    <p className="font-mono text-sm opacity-70">
                        Initiate project protocols or drop a transmission.
                    </p>
                    <a 
                        href="mailto:hello@vistar.studio" 
                        className="block w-full bg-white text-black font-black uppercase text-center py-4 hover:bg-[#ff0080] hover:text-white transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]"
                    >
                        SEND SIGNAL
                    </a>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="max-w-7xl mx-auto border-t border-white/10 pt-10 pb-10 flex flex-col md:flex-row justify-between items-center opacity-40 font-mono text-[10px] tracking-widest uppercase">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} Vistar Studio. Engineered for High-Fidelity.</p>
                    <div className="hidden md:block w-1 h-1 bg-white rounded-full" />
                    <p>Verified Secure Protocol</p>
                </div>
                <p className="mt-4 md:mt-0 italic">Designed in Digital Chaos // 00101010</p>
            </div>
        </footer>
    );
};
