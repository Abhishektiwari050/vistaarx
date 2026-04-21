"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: React.ReactNode;
    }[];
    className?: string;
}) => {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.div
            className={cn(
                "fixed top-0 inset-x-0 z-[5000] transition-all duration-300 ease-in-out border-b border-transparent",
                scrolled
                    ? "bg-black/50 backdrop-blur-md border-white/[0.1] py-4"
                    : "bg-transparent py-6",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo - Hidden when at top to avoid collision */}
                <Link
                    href="/"
                    className={cn(
                        "flex items-center gap-2 transition-opacity duration-300",
                        scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    {/* Replaced placeholder with actual logo */}
                    <div className="w-10 h-10 bg-[#ccff00] flex items-center justify-center p-2 rounded-none border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                            src="/vistar-logo.svg"
                            alt="Vistar"
                            width={24}
                            height={24}
                        />
                    </div>
                    <span className="text-white font-black text-2xl tracking-tighter uppercase">Vistar</span>
                </Link>

                {/* Right Side: Nav + CTA */}
                <div className="flex items-center gap-8">
                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((navItem, idx) => (
                            <Link
                                key={`link=${idx}`}
                                href={navItem.link}
                                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                            >
                                {navItem.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link href="/contact" className="hidden md:block">
                        <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors">
                            Book Call
                        </button>
                    </Link>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden text-white">
                        <span className="text-sm">Menu</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
