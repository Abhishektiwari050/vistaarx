"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    IconRobot,
    IconWorldWww,
    IconChartBar,
    IconCode
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Sales Automation",
        description: "Stop losing leads to slow response times. Our AI system auto-replies 24/7, qualifies inquiries, and never lets a lead slip through cracks.",
        icon: <IconRobot className="w-10 h-10 text-cyan-400" />,
        features: ["Automation", "CRM Integration", "Lead Scoring"]
    },
    {
        title: "Digital Presence",
        description: "Rank #1 and convert visitors into leads with premium web design and SEO. We build trust through credible, conversion-focused websites.",
        icon: <IconWorldWww className="w-10 h-10 text-purple-400" />,
        features: ["SEO Strategy", "Premium Design", "Mobile Optimization"]
    },
    {
        title: "Growth Marketing",
        description: "Turn traffic into revenue with performance marketing. We pay for clicks that convert to qualified leads across Google, Meta, and LinkedIn.",
        icon: <IconChartBar className="w-10 h-10 text-green-400" />,
        features: ["Google Ads", "Meta Campaigns", "Conversion Tracking"]
    },
    {
        title: "Custom Software",
        description: "Build proprietary systems that give you a competitive advantage. Voice agents, custom CRMs, and automation platforms that scale operations.",
        icon: <IconCode className="w-10 h-10 text-pink-400" />,
        features: ["Voice Agents", "CRM Development", "API Integration"]
    }
];

export const ServicesSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".service-card");

        cards.forEach((card: any, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Here&apos;s What We Actually <span className="text-cyan-400">Build For You</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        We don&apos;t just offer services. We build integrated digital systems that solve specific business problems.
                    </p>
                </div>

                <BentoGrid className="max-w-4xl mx-auto">
                    {services.map((service, index) => (
                        <BentoGridItem
                            key={index}
                            title={service.title}
                            description={service.description}
                            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 items-center justify-center p-4">{service.icon}</div>}
                            icon={service.icon}
                            className={index === 3 || index === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
};
