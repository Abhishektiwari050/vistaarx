"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AnimatedAccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export function AnimatedAccordion({
  items,
  className = "",
  allowMultiple = false,
}: AnimatedAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                {item.icon && <div className="text-[#ccff00]">{item.icon}</div>}
                <span className="font-semibold text-white">{item.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-t border-white/10 p-4 text-gray-300">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
