"use client";

import React from "react";
import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "SUB-100MS GLOBAL EDGE SLA",
  "100% CLIENT GITHUB REPOSITORY OWNERSHIP",
  "ZERO LAYOUT SHIFT (CLS 0.000)",
  "AUTONOMOUS MULTI-AGENT PIPELINES",
  "ACID-COMPLIANT POSTGRESQL ARCHITECTURE",
  "21-DAY FIXED-SCOPE PRODUCTION SPRINT",
  "ZERO VENDOR LOCK-IN & DOCKER RUNBOOKS",
  "99+ GOOGLE LIGHTHOUSE BENCHMARK",
];

export function KineticTicker() {
  return (
    <div className="w-full bg-black text-[#d8ff42] border-y-2 border-black py-4 overflow-hidden relative select-none z-20 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
      {/* Visual edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-fit whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 22,
            ease: "linear",
          }}
          className="flex items-center gap-8 text-xs sm:text-sm font-mono font-black tracking-[3px] uppercase"
        >
          {/* Double list for seamless seamless loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="hover:text-white transition-colors cursor-default">
                {item}
              </span>
              <span className="text-[#ff1e90] text-[10px] font-black">●</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
