"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimeGrid } from "../ui/anime-grid";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    {
        label: "Projects Complete",
        value: 50,
        suffix: "+",
        description: "Successful digital transformations"
    },
    {
        label: "Happy Clients",
        value: 200,
        suffix: "+",
        description: "Across 12 different industries"
    },
    {
        label: "Average Growth",
        value: 3,
        suffix: "x",
        description: "Revenue increase in 6 months"
    }
];

export const MetricsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray(".metric-item");

        items.forEach((item: any) => {
            const counter = item.querySelector(".metric-value");
            const targetValue = parseInt(counter.dataset.value);

            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });

            // Counter Animation
            gsap.to(counter, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                },
                innerText: targetValue,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out",
                onUpdate: function () {
                    counter.innerText = Math.ceil(this.targets()[0].innerText) + (counter.dataset.suffix || "");
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-20 bg-background border-y border-neutral-200 relative overflow-hidden">
            {/* Anime.js Background Grid - Adjusted for Light Mode */}
            <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply">
                <AnimeGrid />
            </div>

            {/* Ambient Glow - Adjusted for Light Mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="metric-item text-center">
                            <div
                                className="metric-value text-5xl md:text-7xl font-bold text-foreground mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-neutral-400"
                                data-value={metric.value}
                                data-suffix={metric.suffix}
                            >
                                0{metric.suffix}
                            </div>
                            <h3 className="text-xl font-bold text-cyan-400 mb-2">{metric.label}</h3>
                            <p className="text-neutral-500 text-sm font-medium uppercase tracking-wider">{metric.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
