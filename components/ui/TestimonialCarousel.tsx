"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        id: 1,
        content: "Vistar didn't just build an app; they architected an autonomous system that eliminated 40% of our manual QA cycle. True engineering excellence.",
        author: "Marcus Chen",
        role: "CTO, Arca Dynamics",
        rating: 5
    },
    {
        id: 2,
        content: "The transition to their AI-powered SDLC layer was seamless. Our deployment velocity increased by 200% within the first two sprints. High-fidelity work.",
        author: "Elena Rodriguez",
        role: "Head of Engineering, Flux Systems",
        rating: 5
    },
    {
        id: 3,
        content: "Deterministic, scalable, and visually stunning. Vistar is our go-to studio for building mission-critical intelligence layers and technical interfaces.",
        author: "David Vance",
        role: "Founder, Neovoid Infrastructure",
        rating: 5
    }
]

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full max-w-4xl mx-auto p-8 md:p-12 bg-white rounded-none border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Quote className="w-24 h-24 text-black" />
            </div>

            <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex gap-1">
                            {[...Array(testimonials[current].rating)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-[#ff0080] fill-[#ff0080]" />
                            ))}
                        </div>

                        <p className="text-xl md:text-3xl font-black text-black leading-tight uppercase tracking-tighter">
                            &quot;{testimonials[current].content}&quot;
                        </p>

                        <div>
                            <h4 className="text-black font-black text-xl uppercase tracking-wider">{testimonials[current].author}</h4>
                            <p className="text-neutral-500 font-mono font-bold text-sm uppercase">{testimonials[current].role}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-2 mt-8">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-3 transition-all duration-300 border-2 border-black ${current === idx ? "w-12 bg-[#ccff00]" : "w-3 bg-white hover:bg-neutral-100"
                            }`}
                        aria-label={`Go to testimonial ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
