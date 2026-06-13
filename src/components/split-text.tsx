"use client";

import React from "react";
import { motion } from "framer-motion";

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  // Split the text into words to preserve kerning and prevent disjointed spacing
  const words = text.split(" ");

  const containerVars = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.015,
        delayChildren: delay
      } 
    },
  };

  const childVars = {
    hidden: { opacity: 0, y: "75%", rotateZ: 3 },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.span
      variants={containerVars}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex overflow-hidden pb-1 select-none mr-[0.25em] last:mr-0">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={childVars}
              className="inline-block origin-bottom-left"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export default SplitText;
