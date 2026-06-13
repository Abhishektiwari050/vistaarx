"use client";

import React from "react";
import { motion } from "framer-motion";

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = text.split("");

  const containerVars = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.02,
        delayChildren: delay
      } 
    },
  };

  const childVars = {
    hidden: { opacity: 0, y: "60%", rotateZ: 4 },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <motion.span
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`inline-block overflow-hidden pb-1 ${className}`}
    >
      {letters.map((char, idx) => (
        <motion.span
          key={idx}
          variants={childVars}
          className="inline-block origin-bottom-left"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default SplitText;
