"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
    text: string;
    className?: string;
}

export const TextRevealByWord = ({
    text,
    className,
}: TextRevealByWordProps) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={cn("relative z-0 min-h-[200vh]", className)}>
            <div
                className={
                    "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
                }
            >
                <p
                    ref={targetRef}
                    className={
                        "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl"
                    }
                >
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
};

interface WordProps {
    children: React.ReactNode;
    progress: any;
    range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mx-1 lg:mx-2.5">
            <span className={"absolute opacity-30"}>{children}</span>
            <motion.span
                style={{ opacity: opacity }}
                className={"text-foreground dark:text-white"}
            >
                {children}
            </motion.span>
        </span>
    );
};

export const FunkyTextReveal = ({
    content,
    className,
}: {
    content: { text: string; className?: string }[];
    className?: string;
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start 0.8", "start 0.2"],
    });

    return (
        <div ref={targetRef} className={cn("relative z-0 min-h-[150vh]", className)}>
            <div className="sticky top-0 mx-auto flex h-[50%] max-w-5xl items-center bg-transparent px-[1rem] py-[5rem]">
                <div className="flex flex-wrap p-5 text-2xl font-bold text-white/20 md:text-4xl lg:text-5xl xl:text-7xl leading-[1.1]">
                    {content.map((item, i) => {
                        return (
                            <FunkyWord key={i} progress={scrollYProgress} range={[i / content.length, (i + 1) / content.length]} className={item.className}>
                                {item.text}
                            </FunkyWord>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const FunkyWord = ({ children, progress, range, className }: { children: React.ReactNode; progress: any; range: [number, number]; className?: string }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [20, 0]);

    // Check if it's the "Grid" item or has background to apply special handling
    const hasBackground = className?.includes("bg-");

    return (
        <span className={cn("relative mx-2 lg:mx-4 inline-block", !hasBackground && className)}>
            {/* If it has background, move className to inner spans to avoid empty box */}
            <span className={cn("absolute opacity-[0.1] grayscale", hasBackground && className)}>{children}</span>
            <motion.span
                style={{ opacity: opacity, y: y }}
                className={cn("text-white inline-block", className)}
            >
                {children}
            </motion.span>
        </span>
    );
};
