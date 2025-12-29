"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-[#ccff00] border-t-4 border-black pt-20 pb-10 px-6 font-sans text-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">

                {/* BRAND COLUMN */}
                <div className="md:col-span-1 space-y-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-12 h-12 border-2 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-12 transition-transform">
                            <Image
                                src="/vistaar-logo.svg"
                                alt="Vistaar"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-4xl font-black uppercase tracking-tighter italic">Vistaar</span>
                    </Link>
                    <p className="font-mono text-lg font-medium border-l-4 border-black pl-4">
                        Engineered for chaos. <br />
                        Built for growth.
                    </p>
                    <div className="font-bold text-sm uppercase tracking-widest opacity-60 pt-4">
                        Est. 2024
                    </div>
                </div>

                {/* SITEMAP */}
                <div className="space-y-6">
                    <h4 className="font-black text-xl uppercase tracking-tighter border-b-2 border-black inline-block">Explore</h4>
                    <ul className="space-y-3 font-bold text-lg">
                        <li><Link href="/" className="hover:underline decoration-2 underline-offset-4">Home</Link></li>
                        <li><Link href="/services" className="hover:underline decoration-2 underline-offset-4">Services</Link></li>
                        <li><Link href="/work" className="hover:underline decoration-2 underline-offset-4">Work</Link></li>
                        <li><Link href="/contact" className="hover:underline decoration-2 underline-offset-4">Contact</Link></li>
                    </ul>
                </div>

                {/* SOCIALS */}
                <div className="space-y-6">
                    <h4 className="font-black text-xl uppercase tracking-tighter border-b-2 border-black inline-block">Connect</h4>
                    <ul className="space-y-3 font-mono font-medium text-lg">
                        <li><a href="#" className="hover:bg-black hover:text-[#ccff00] px-2 -ml-2 transition-colors">Twitter / X</a></li>
                        <li><a href="#" className="hover:bg-black hover:text-[#ccff00] px-2 -ml-2 transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:bg-black hover:text-[#ccff00] px-2 -ml-2 transition-colors">Instagram</a></li>
                        <li><a href="mailto:hello@vistaar.agency" className="hover:bg-black hover:text-[#ccff00] px-2 -ml-2 transition-colors">hello@vistaar.agency</a></li>
                    </ul>
                </div>

                {/* LEGAL */}
                <div className="space-y-6">
                    <h4 className="font-black text-xl uppercase tracking-tighter border-b-2 border-black inline-block">Legal</h4>
                    <ul className="space-y-3 font-mono text-sm opacity-80">
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#" className="hover:underline">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="max-w-7xl mx-auto border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center opacity-60 font-mono text-sm">
                <p>&copy; {new Date().getFullYear()} Vistaar Agency. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Designed in Chaos.</p>
            </div>

            {/* DECORATIVE ELEMENTS */}
            <div className="absolute top-[-10%] right-[-5%] w-[30vw] h-[30vw] bg-white rounded-full blur-[100px] opacity-30 pointer-events-none mix-blend-overlay" />
        </footer>
    );
};
