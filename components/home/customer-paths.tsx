"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconArrowRight } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

const paths = [
    {
        title: "Grow Export Sales",
        description: "Alibaba, International SEO, & Global Lead Gen",
        steps: [
            "Alibaba Product Optimization",
            "International SEO & Discovery",
            "AI-Powered Lead Response",
            "Sales Automation & CRM"
        ]
    },
    {
        title: "Scale Online Sales",
        description: "E-commerce, D2C Brands & Service Business",
        steps: [
            "Premium Website Design",
            "High-Intent SEO Strategy",
            "Social Media Growth",
            "Performance Marketing Ads"
        ]
    },
    {
        title: "Operational Efficiency",
        description: "For Businesses Need Custom Systems",
        steps: [
            "Custom Software Development",
            "Internal Tool Building",
            "Database Design & API Integration",
            "Workflow Automation"
        ]
    }
];

export const CustomerPaths = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const pathItems = gsap.utils.toArray(".path-item");

        pathItems.forEach((item: any, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%",
                },
                opacity: 0,
                x: -30,
                duration: 0.6,
                delay: index * 0.2
            });
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Different Paths. <br />
                        <span className="text-gray-500">Same Exceptional Results.</span>
                    </h2>
                </div>

                <div className="space-y-12">
                    {paths.map((path, index) => (
                        <div key={index} className="path-item border-l-2 border-neutral-800 pl-8 md:pl-12 py-4 relative">
                            {/* Dot */}
                            <div className="absolute left-[-9px] top-8 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{path.title}</h3>
                            <p className="text-neutral-400 mb-6 font-medium">{path.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {path.steps.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-neutral-300 bg-neutral-900/40 p-3 rounded-lg border border-neutral-800/50">
                                        {idx < path.steps.length - 1 && (
                                            <div className="block md:hidden">↓</div>
                                        )}
                                        <span className="text-sm font-medium">{step}</span>
                                        {idx < path.steps.length - 1 && (
                                            <IconArrowRight className="hidden md:block w-4 h-4 text-neutral-600 ml-auto" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
