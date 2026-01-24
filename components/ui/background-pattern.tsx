"use client";

import { motion } from "framer-motion";

interface BackgroundPatternProps {
  variant?: "dots" | "grid" | "lines";
  className?: string;
}

export function BackgroundPattern({ variant = "dots", className = "" }: BackgroundPatternProps) {
  if (variant === "dots") {
    return <DotPattern className={className} />;
  }
  if (variant === "grid") {
    return <GridPattern className={className} />;
  }
  return <LinePattern className={className} />;
}

function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <motion.circle
              cx="2"
              cy="2"
              r="1"
              fill="#ccff00"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="2"
              cy="2"
              r="1"
              fill="#ff0080"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}

function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#ccff00"
              strokeWidth="0.5"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}

function LinePattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="line-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.line
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              stroke="#ccff00"
              strokeWidth="0.5"
              animate={{
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.line
              x1="100"
              y1="0"
              x2="0"
              y2="100"
              stroke="#ff0080"
              strokeWidth="0.5"
              animate={{
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#line-pattern)" />
      </svg>
    </div>
  );
}
