"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

export default function FounderSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Parallax effects
  const imageY = useTransform(smoothProgress, [0, 1], [50, -50])
  const textY = useTransform(smoothProgress, [0, 1], [-50, 50])
  
  // Glitch intensity based on scroll
  const glitchOpacity = useTransform(smoothProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 0, 1])

  return (
    <section ref={containerRef} className="py-40 bg-[#f8f8f8] overflow-hidden relative border-y-4 border-black z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-24">
        
        {/* Left: Technical Cutout Portrait */}
        <motion.div 
          style={{ y: imageY }}
          className="relative w-full md:w-1/2 aspect-[4/5] group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Cutout Container */}
          <div className="relative w-full h-full overflow-visible">
            {/* Sticker Shadow */}
            <div className="absolute inset-0 bg-black/20 blur-3xl rounded-full scale-75 group-hover:bg-[#ccff00]/10 transition-colors duration-500" />
            
            {/* The Cutout Image Wrapper */}
            <motion.div 
              className="relative w-full h-full grayscale contrast-125 border-8 border-white shadow-[15px_15px_30px_rgba(0,0,0,0.3)] rotate-2 group-hover:rotate-0 transition-all duration-500 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
               <Image 
                src="/vistar-founder.png" 
                alt="Founder" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
              
              {/* Pink Glitch Layer */}
              <motion.div 
                animate={isHovered ? { x: [-2, 2, -1, 3, 0], opacity: [0.5, 0.8, 0.4, 0.9, 0.6] } : { opacity: 0 }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="absolute inset-0 mix-blend-screen opacity-0 pointer-events-none bg-[#ff0080]/30 translate-x-[2px]"
              />
              
              {/* Lime Glitch Layer */}
              <motion.div 
                animate={isHovered ? { x: [2, -2, 1, -3, 0], opacity: [0.5, 0.8, 0.4, 0.9, 0.6] } : { opacity: 0 }}
                transition={{ repeat: Infinity, duration: 0.2, delay: 0.1 }}
                className="absolute inset-0 mix-blend-screen opacity-0 pointer-events-none bg-[#ccff00]/30 -translate-x-[2px]"
              />
            </motion.div>

            {/* Technical Labels (Sticker Style) */}
            <div className="absolute -top-6 -right-6 px-4 py-2 bg-[#ccff00] text-black font-black text-xs rotate-12 shadow-md z-20">
              STATUS: SYNCED
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-black text-white font-mono text-[10px] -rotate-6 shadow-md z-20">
              VISTAR-ID: 0x921A
            </div>
          </div>
        </motion.div>

        {/* Right: Technical Copy */}
        <motion.div 
          style={{ y: textY }}
          className="w-full md:w-1/2 space-y-8"
        >
          <div className="space-y-2">
            <span className="type-caption bg-[#ccff00] text-black px-2 font-black">Founder Identity</span>
            <h2 className="type-h1 !text-6xl md:!text-8xl tracking-tight uppercase font-black italic">
              ENGINEERING <br />
              <span className="text-transparent stroke-text text-stroke-2">THE CHAOS.</span>
            </h2>
          </div>

          <div className="p-8 border-l-8 border-black bg-white shadow-[8px_8px_0px_0px_rgba(204,255,0,1)] relative">
            <p className="type-body !text-xl font-mono text-black leading-tight">
              "SYSTEMS OF INTELLIGENCE DON'T WAIT FOR THE FUTURE. WE ENGINEER THE VELOCITY REQUIRED TO CRUSH COMPLEXITY."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-black" />
              <p className="font-black uppercase tracking-tighter text-sm">CHIEF ARCHITECT // VISTAR</p>
            </div>
            
            {/* Dynamic Pink Accent */}
            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#ff0080] to-[#7928ca]" />
          </div>

          <div className="flex gap-4">
            <div className="px-4 py-2 bg-black text-white font-mono text-xs uppercase tracking-widest italic">
              AI-NATIVE
            </div>
            <div className="px-4 py-2 border-2 border-black font-mono text-xs uppercase tracking-widest">
              SDLC-POWERED
            </div>
          </div>
        </motion.div>

      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none text-[30rem] font-black italic flex items-center justify-center overflow-hidden leading-none -z-10 text-black">
        FOUNDER
      </div>
    </section>
  )
}
