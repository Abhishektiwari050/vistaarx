"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const LiquidButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 text-black font-bold border-4 border-black ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#ccff00]"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[#ff0080] opacity-50"
        initial={{ scale: 0, borderRadius: "50%" }}
        animate={{
          scale: isHovered ? 3 : 0,
          borderRadius: isHovered ? "0%" : "50%",
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{ transformOrigin: "center" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
