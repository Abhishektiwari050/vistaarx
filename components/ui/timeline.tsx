"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface TimelineItem {
  title: string;
  date: string;
  description: ReactNode;
  icon?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function Timeline({ items, orientation = "vertical", className = "" }: TimelineProps) {
  if (orientation === "horizontal") {
    return <HorizontalTimeline items={items} className={className} />;
  }
  return <VerticalTimeline items={items} className={className} />;
}

function VerticalTimeline({ items, className = "" }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[#ccff00] via-[#ff0080] to-[#ccff00] opacity-30" />
      <div className="space-y-8">
        {items.map((item, index) => (
          <TimelineItemComponent key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItemComponent({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#ccff00] bg-black">
        {item.icon || (
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#ccff00] to-[#ff0080]" />
        )}
      </div>
      <div className="flex-1 pb-8">
        <div className="rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <p className="mb-2 text-sm font-semibold text-[#ccff00]">{item.date}</p>
            <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
            <div className="text-gray-300">{item.description}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalTimeline({ items, className = "" }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={`relative overflow-x-auto pb-8 ${className}`}>
      <div className="flex gap-8 pb-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative min-w-[300px] flex-shrink-0"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ccff00] bg-black">
                {item.icon || (
                  <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#ccff00] to-[#ff0080]" />
                )}
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="absolute left-1/2 top-6 h-0.5 w-full bg-gradient-to-r from-[#ccff00] to-[#ff0080] opacity-30" />
            )}
            <div className="rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
              <p className="mb-2 text-xs font-semibold text-[#ccff00]">{item.date}</p>
              <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
              <div className="text-sm text-gray-300">{item.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
