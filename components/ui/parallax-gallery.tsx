"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Column({ images, y }: { images: string[]; y: any }) {
    return (
        <motion.div style={{ y }} className="column flex flex-col gap-6 relative -top-[40%]">
            {images.map((src, i) => (
                <div key={i} className="relative h-[300px] w-full min-w-[200px] md:min-w-[250px] overflow-hidden rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-neutral-100 flex items-center justify-center group hover:bg-[#ccff00] transition-colors duration-500">
                    <span className="text-4xl font-black italic">{src}</span>
                </div>
            ))}
        </motion.div>
    );
}

export function ParallaxGallery() {
    const gallery = useRef(null);
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 500]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 500]);

    return (
        <div ref={gallery} className="h-[150vh] bg-white flex gap-6 overflow-hidden p-8">
            <Column images={["CHAOS", "CODE", "DESIGN", "FUTURE"]} y={y} />
            <Column images={["MOTION", "SPEED", "SCALE", "POWER"]} y={y2} />
            <Column images={["VIBE", "FUNKY", "NEON", "BOLD"]} y={y3} />
            <Column images={["GRID", "FLEX", "STACK", "FLOW"]} y={y4} />
        </div>
    );
}
