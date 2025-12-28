"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const ProcessSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Line grows down
        gsap.fromTo(lineRef.current,
            { height: "0%" },
            {
                height: "100%",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                },
                ease: "none"
            }
        );

        // Steps fade in
        const steps = gsap.utils.toArray(".process-step");
        steps.forEach((step: any) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: "top 75%",
                },
                opacity: 0,
                y: 30,
                duration: 0.8
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center">How It Works</h2>

                {/* Center Line */}
                <div className="absolute left-[30px] md:left-1/2 top-[150px] bottom-20 w-1 bg-neutral-800 -translate-x-1/2 rounded-full">
                    <div ref={lineRef} className="w-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-full" />
                </div>

                <div className="space-y-24">
                    {/* Step 1 */}
                    <div className="process-step relative md:grid md:grid-cols-2 gap-12 items-center">
                        <div className="md:text-right pl-16 md:pl-0">
                            <h3 className="text-4xl font-bold text-cyan-400 mb-4">01. Audit</h3>
                            <h4 className="text-2xl text-white font-bold mb-3">Analyze & Strategy</h4>
                            <p className="text-neutral-400">We deep-dive into your current setup (Alibaba, Website, CRM) to find gaps and opportunities. No guesswork.</p>
                        </div>
                        <div className="absolute left-[19px] md:left-1/2 w-6 h-6 rounded-full bg-cyan-500 -translate-x-1/2 border-4 border-black z-10" />
                        <div className="hidden md:block" />
                    </div>

                    {/* Step 2 */}
                    <div className="process-step relative md:grid md:grid-cols-2 gap-12 items-center">
                        <div className="hidden md:block" />
                        <div className="absolute left-[19px] md:left-1/2 w-6 h-6 rounded-full bg-purple-500 -translate-x-1/2 border-4 border-black z-10" />
                        <div className="pl-16 md:pl-0">
                            <h3 className="text-4xl font-bold text-purple-400 mb-4">02. Build</h3>
                            <h4 className="text-2xl text-white font-bold mb-3">System Implementation</h4>
                            <p className="text-neutral-400">We deploy the systems: AI Auto-responders, Premium Websites, Custom CRMs. The heavy lifting happens here.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="process-step relative md:grid md:grid-cols-2 gap-12 items-center">
                        <div className="md:text-right pl-16 md:pl-0">
                            <h3 className="text-4xl font-bold text-green-400 mb-4">03. Scale</h3>
                            <h4 className="text-2xl text-white font-bold mb-3">Growth & Optimization</h4>
                            <p className="text-neutral-400">Once live, we drive traffic via SEO/Ads and obsessively optimize for ROI. We turn the system ON.</p>
                        </div>
                        <div className="absolute left-[19px] md:left-1/2 w-6 h-6 rounded-full bg-green-500 -translate-x-1/2 border-4 border-black z-10" />
                        <div className="hidden md:block" />
                    </div>
                </div>
            </div>
        </section>
    );
};
