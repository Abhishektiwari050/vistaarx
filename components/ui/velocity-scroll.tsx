"use client";

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    // Wrap between 0% and -12.5% (since we have 8 copies, 100% / 8 = 12.5%)
    // This assumes the content acts as a seamless strip.
    const x = useTransform(baseX, (v) => `${wrap(0, -12.5, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on
     * screen width used for now 4 to ensure enough
     */
    return (
        <div className="parallax overflow-hidden tracking-tighter w-full">
            <motion.div className="scroller flex whitespace-nowrap flex-nowrap" style={{ x }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <span
                        key={i}
                        className={`block text-8xl md:text-9xl font-black uppercase mr-4 md:mr-8 ${i % 2 === 0
                                ? "text-transparent stroke-text [-webkit-text-stroke:2px_#ccff00]"
                                : "text-white"
                            }`}
                    >
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function VelocityScroll({ children, default_velocity = 5 }: { children: React.ReactNode, default_velocity?: number }) {
    return (
        <section className="relative w-full overflow-hidden leading-[0.8] tracking-tighter antialiased">
            <ParallaxText baseVelocity={default_velocity}>{children}</ParallaxText>
            <ParallaxText baseVelocity={-default_velocity}>{children}</ParallaxText>
        </section>
    );
}
