"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HolographicCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ scale: 1.05 }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative bg-black border-4 border-[#ccff00] p-8 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Holographic overlay */}
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, #ff0080 0%, #ccff00 25%, #00ffff 50%, #ff0080 75%, #ccff00 100%)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Scan lines */}
        <motion.div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #ccff00 2px, #ccff00 4px)",
          }}
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10">{children}</div>
      </motion.div>
    </motion.div>
  );
};
