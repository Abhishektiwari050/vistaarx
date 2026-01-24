"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ShinyButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      className={cn(
        "relative overflow-hidden bg-black text-[#ccff00] font-bold px-8 py-4 border-2 border-[#ccff00] shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
