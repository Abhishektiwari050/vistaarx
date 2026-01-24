"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface LazyLoadAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "slide" | "scale" | "blur";
  delay?: number;
  duration?: number;
}

export function LazyLoadAnimation({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  duration = 0.5,
}: LazyLoadAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredAnimation({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) &&
        children.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
    </div>
  );
}
