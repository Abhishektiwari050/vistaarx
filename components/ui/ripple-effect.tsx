"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const RippleEffect = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={addRipple}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-[#ccff00] pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{
            width: 0,
            height: 0,
            opacity: 0.5,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            width: 300,
            height: 300,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
