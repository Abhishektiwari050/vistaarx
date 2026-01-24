"use client";

import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

interface TabItem {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AnimatedTabsProps {
  items: TabItem[];
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export function AnimatedTabs({ items, className = "", variant = "default" }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={className}>
      <div className="mb-6 flex gap-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-6 py-3 font-medium transition-colors ${
              variant === "pills" ? "rounded-full" : variant === "underline" ? "" : "rounded-lg"
            }`}
          >
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 ${
                  variant === "pills"
                    ? "rounded-full bg-gradient-to-r from-[#ccff00] to-[#ff0080]"
                    : variant === "underline"
                      ? "bottom-0 top-auto h-0.5 bg-gradient-to-r from-[#ccff00] to-[#ff0080]"
                      : "rounded-lg bg-gradient-to-r from-[#ccff00]/20 to-[#ff0080]/20"
                }`}
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 ${
                activeTab === index ? "text-black" : "text-white"
              } ${variant === "underline" && activeTab === index ? "text-[#ccff00]" : ""}`}
            >
              {item.icon}
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm"
      >
        {items[activeTab].content}
      </motion.div>
    </div>
  );
}
