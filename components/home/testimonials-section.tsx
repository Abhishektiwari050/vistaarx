"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight, IconQuote } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const testimonials = [
    {
        quote: "Vistaar transformed our Alibaba presence. We went from 2 inquiries a month to 50 qualified leads.",
        name: "Rajesh Kumar",
        title: "Director, Global Exports",
        company: "Kumar Textiles",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop"
    },
    {
        quote: "The automation tools saved us 20 hours a week. Incredible ROI within the first month.",
        name: "Sarah Jenkins",
        title: "CEO, TechTrade",
        company: "TechTrade Solutions",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        quote: "Best digital agency for exporters. Period. They understand the international market like no one else.",
        name: "Amit Patel",
        title: "Founder, Patel Spices",
        company: "Patel Spices Ltd.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        quote: "Their design team is world-class. Our new site looks amazing and converts like crazy.",
        name: "John Smith",
        title: "MD, Smith & Co.",
        company: "Smith Constructions",
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
