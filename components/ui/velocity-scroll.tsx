"use client";

import { useRef } from "react";
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
    children: string;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 800);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on
     * screen width used for now 4 to ensure enough
     */
    return (
        <div className="parallax overflow-hidden tracking-tighter w-full">
            <motion.div className="scroller flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block text-8xl md:text-9xl font-black uppercase mr-12 md:mr-24 text-transparent stroke-text hover:text-[#ccff00] transition-colors duration-300 text-stroke-2">{children} </span>
                <span className="block text-8xl md:text-9xl font-black uppercase mr-12 md:mr-24 text-black">{children} </span>
                <span className="block text-8xl md:text-9xl font-black uppercase mr-12 md:mr-24 text-transparent stroke-text text-stroke-2">{children} </span>
                <span className="block text-8xl md:text-9xl font-black uppercase mr-12 md:mr-24 text-black">{children} </span>
            </motion.div>
        </div>
    );
}

export function VelocityScroll({ text, default_velocity = 5 }: { text: string, default_velocity?: number }) {
    return (
        <section className="relative w-full overflow-hidden leading-[0.8] tracking-tighter antialiased">
            <ParallaxText baseVelocity={default_velocity}>{text}</ParallaxText>
            <ParallaxText baseVelocity={-default_velocity}>{text}</ParallaxText>
        </section>
    );
}
