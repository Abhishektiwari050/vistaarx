"use client";

import { motion } from "framer-motion";

export const AuroraBackground = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(204, 255, 0, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 0, 128, 0.3), transparent 50%), radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.2), transparent 50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(255, 0, 128, 0.4), transparent 50%), radial-gradient(circle at 60% 70%, rgba(204, 255, 0, 0.3), transparent 50%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
