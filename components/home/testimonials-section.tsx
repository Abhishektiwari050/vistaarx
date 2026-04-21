"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const testimonials = [
    {
        quote: "Vistar architected our core intelligence layer. Their deterministic approach to AI eliminated all hallucination edge cases in our production environment.",
        name: "Marcus Chen",
        title: "CTO, Arca Dynamics",
        company: "Arca Dynamics",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop"
    },
    {
        quote: "The autonomous SDLC agents they built for us handle 80% of our ticket triaging and code generation. True force multipliers for our senior engineers.",
        name: "Elena Rodriguez",
        title: "Head of Engineering, Flux Systems",
        company: "Flux Systems",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        quote: "High-fidelity interfaces and rock-solid architecture. Vistar is the only studio we trust with our mission-critical technical infrastructure.",
        name: "David Vance",
        title: "Founder, Neovoid Infrastructure",
        company: "Neovoid",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        quote: "They don't just write code; they engineer systems. Their predictive analytics implementation saved us millions in cloud optimization.",
        name: "John Smith",
        title: "Principal Architect, Arca Corp",
        company: "Arca Corp",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop"
    }
];

export const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-black relative flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 w-full z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white/40 mb-10 text-center uppercase tracking-widest">
                    Trusted by Industry Leaders
                </h2>
                <div className="h-[20rem] rounded-md flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="right"
                        speed="slow"
                    />
                </div>
            </div>
        </section>
    );
};
