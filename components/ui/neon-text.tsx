"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const NeonText = ({
  text,
  className = "",
  color = "#ccff00",
}: {
  text: string;
  className?: string;
  color?: string;
}) => {
  return (
    <motion.h1
      className={`font-black tracking-tighter ${className}`}
      style={{
        color: color,
        textShadow: `
          0 0 10px ${color},
          0 0 20px ${color},
          0 0 30px ${color},
          0 0 40px ${color},
          0 0 70px ${color},
          0 0 80px ${color},
          0 0 100px ${color},
          0 0 150px ${color}
        `,
      }}
      animate={{
        textShadow: [
          `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
          `0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}, 0 0 50px ${color}, 0 0 80px ${color}`,
          `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.h1>
  );
};
