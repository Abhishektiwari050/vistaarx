"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "Do you only work with export companies?",
        answer: "We specialize in B2B and Export sectors because we know the data, automations, and growth levers that work there. However, our 'Chaos & Code' philosophy applies to any ambitious brand ready to disrupt their market."
    },
    {
        question: "How much does a project cost?",
        answer: "Our engagements typically start at $3k for specific automations and range up to $15k+ for full digital transformation and custom platforms. We price based on value and ROI, not hours."
    },
    {
        question: "How long does it take to launch?",
        answer: "We move fast. A complex automation system can be live in 2 weeks. A full website overhaul takes 4-6 weeks. We don't do 6-month projects; we ship, test, and iterate."
    },
    {
        question: "What happens after launch?",
        answer: "We don't ghost you. We offer 'Growth Retainers' to manage your ads, optimize your automations, and keep your tech stack bleeding-edge. Most clients stay with us for years."
    }
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 font-sans">
            <h2 className="type-h2 text-black mb-12 text-center">
                Common <span className="text-[#ff0080]">Objections</span>.
            </h2>
            <div className="space-y-4">
                {FAQ_DATA.map((item, idx) => (
                    <div
                        key={idx}
                        className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                    >
                        <button
                            onClick={() => toggle(idx)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className="font-bold text-lg md:text-xl text-black uppercase tracking-wide">
                                {item.question}
                            </span>
                            <span
                                className={`transform transition-transform duration-300 font-black text-2xl ${openIndex === idx ? "rotate-45 text-[#ff0080]" : "text-black"
                                    }`}
                            >
                                +
                            </span>
                        </button>
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 pt-0 font-mono text-neutral-600 leading-relaxed border-t-2 border-dashed border-neutral-300">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};
