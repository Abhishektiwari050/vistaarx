"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular" | "rounded";
}

export function Skeleton({
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 w-full rounded",
    rectangular: "h-full w-full",
    circular: "h-12 w-12 rounded-full",
    rounded: "h-full w-full rounded-lg",
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 ${variantClasses[variant]} ${className}`}
    >
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg border border-white/10 bg-black/40 p-6 ${className}`}>
      <Skeleton variant="circular" className="mb-4" />
      <Skeleton variant="text" className="mb-2" />
      <Skeleton variant="text" className="mb-2 w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="rounded" className="mt-4 h-40" />
    </div>
  );
}

export function ListSkeleton({ items = 5, className = "" }: { items?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
