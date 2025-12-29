"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/motion/MotionWrappers";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

// Mock Data Store (In real app, this would be a CMS or DB fetch)
const CASE_STUDIES: Record<string, any> = {
    "global-exports-ltd": {
        title: "Global Exports Ltd",
        industry: "Manufacturing",
        challenge: "Manual lead processing was costing them 20 hours/week. Responses were delayed, and they were losing contracts to faster competitors.",
        solution: "We built a custom Alibaba Automation Bot that instantly replies to inquiries, filters spam, and syncs qualified leads to a new CRM dashboard.",
        results: [
            { label: "Hours Saved/Week", value: "20+" },
            { label: "Response Time", value: "< 2 mins" },
            { label: "Revenue Increase", value: "+40%" }
        ],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
    },
    "default": {
        title: "Client Case Study",
        industry: "International Trade",
        challenge: "Struggling with legacy systems and low digital visibility in target markets.",
        solution: "Implemented a full-stack digital transformation including a high-performance website and automated marketing funnels.",
        results: [
            { label: "Efficiency", value: "+300%" },
            { label: "Leads", value: "2x" },
            { label: "ROI", value: "10x" }
        ],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070"
    }
};

export default function CaseStudyPage() {
    const params = useParams();
    // @ts-ignore
    const slug = params?.slug as string;
    const data = CASE_STUDIES[slug] || CASE_STUDIES["default"];

    return (
        <main className="min-h-screen bg-white pt-24 pb-20 font-sans">

            {/* HERO */}
            <section className="px-6 mb-20">
                <FadeIn className="max-w-7xl mx-auto">
                    <Link href="/work" className="inline-flex items-center gap-2 font-mono font-bold uppercase text-sm mb-8 hover:text-[#ff0080] transition-colors">
                        ← Back to Work
                    </Link>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                        {data.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 mb-12">
                        <span className="px-4 py-1 border-2 border-black rounded-full font-bold uppercase text-sm bg-neutral-100">
                            {data.industry}
                        </span>
                        <span className="px-4 py-1 border-2 border-black rounded-full font-bold uppercase text-sm bg-[#ccff00]">
                            Automation
                        </span>
                    </div>
                    <div className="relative aspect-video w-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <Image src={data.image} alt={data.title} fill className="object-cover" />
                    </div>
                </FadeIn>
            </section>

            {/* CONTENT GRID */}
            <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-24 mb-32">

                {/* LEFT: RESULTS */}
                <div className="md:col-span-1 space-y-8">
                    <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2">Results</h3>
                    <div className="space-y-6">
                        {data.results.map((res: any, i: number) => (
                            <div key={i}>
                                <p className="text-4xl font-black text-[#ff0080]">{res.value}</p>
                                <p className="font-mono font-bold text-sm text-neutral-500 uppercase">{res.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: STORY */}
                <div className="md:col-span-2 space-y-12">
                    <div>
                        <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-6">The Challenge</h3>
                        <p className="text-xl leading-relaxed font-medium text-neutral-800 font-mono border-l-4 border-neutral-200 pl-6">
                            {data.challenge}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-6">The Solution</h3>
                        <p className="text-lg leading-relaxed text-neutral-600">
                            {data.solution}
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="bg-black py-20 border-y-4 border-[#ccff00] text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                        Want similar results?
                    </h2>
                    <Link href="/contact">
                        <MagneticButton className="px-10 py-5 bg-[#ccff00] text-black text-lg font-bold uppercase tracking-widest border-2 border-black hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:-translate-y-1">
                            Start Your Project
                        </MagneticButton>
                    </Link>
                </div>
            </section>

        </main>
    );
}
