"use client";

import React from "react";
import { motion } from "framer-motion";

interface UnderlineTextProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function UnderlineText({
  children,
  color = "#ff1e90",
  className = "",
}: UnderlineTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute left-0 top-[95%] w-full h-[12px] overflow-visible pointer-events-none"
        viewBox="0 0 200 12"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M2 9 C 50 3, 150 14, 198 5"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
    </span>
  );
}

export default UnderlineText;
