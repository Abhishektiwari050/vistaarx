"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        "#ffffff",
        "#f8f9fa",
        "#ffffff",
    ];

    return (
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className="min-h-screen relative rounded-md py-20 border-t-2 border-b-2 border-black"
            ref={ref}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-start justify-center relative">

                {/* Text Content */}
                <div className="w-full lg:w-1/2 relative z-10">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-20 min-h-[50vh] flex flex-col justify-center">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-3xl md:text-5xl font-black text-black mb-6 uppercase tracking-tighter"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-lg md:text-xl text-neutral-600 max-w-lg leading-relaxed font-mono"
                            >
                                {item.description}
                            </motion.p>

                            {/* Mobile Content (Visible only on small screens) */}
                            <div className={cn(
                                "block lg:hidden mt-8 rounded-xl overflow-hidden shadow-2xl border border-white/10",
                                activeCard === index ? "opacity-100" : "opacity-50"
                            )}>
                                {item.content}
                            </div>
                        </div>
                    ))}
                    <div className="h-40" />
                </div>

                {/* Desktop Sticky Content (Hidden on mobile) */}
                <div className="hidden lg:block w-1/2 sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center">
                    <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "h-[500px] w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 bg-neutral-900",
                            contentClassName
                        )}
                    >
                        {content[activeCard].content ?? null}
                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
};
