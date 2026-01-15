"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlitchText = ({
  text,
  className = "",
  trigger = "hover",
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "always";
}) => {
  const glitchVariants = {
    initial: {
      x: 0,
      y: 0,
    },
    glitch: {
      x: [0, -2, 2, -2, 2, 0],
      y: [0, 2, -2, 2, -2, 0],
      transition: {
        duration: 0.3,
        repeat: trigger === "always" ? Infinity : 0,
        repeatDelay: trigger === "always" ? 2 : 0,
      },
    },
  };

  return (
    <motion.span
      className={cn("relative inline-block", className)}
      initial="initial"
      whileHover={trigger === "hover" ? "glitch" : undefined}
      animate={trigger === "always" ? "glitch" : undefined}
      variants={glitchVariants}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 text-[#ff0080] opacity-70 z-0"
        style={{ textShadow: "-2px 0 #ff0080" }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 text-[#00ffff] opacity-70 z-0"
        style={{ textShadow: "2px 0 #00ffff" }}
        aria-hidden="true"
      >
        {text}
      </span>
    </motion.span>
  );
};
