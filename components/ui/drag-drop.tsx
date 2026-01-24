"use client";

import { motion, Reorder, useDragControls } from "framer-motion";
import { useState, ReactNode } from "react";
import { GripVertical } from "lucide-react";

interface DragDropItem {
  id: string;
  content: ReactNode;
}

interface DragDropListProps {
  items: DragDropItem[];
  onReorder: (items: DragDropItem[]) => void;
  className?: string;
}

export function DragDropList({ items, onReorder, className = "" }: DragDropListProps) {
  return (
    <Reorder.Group axis="y" values={items} onReorder={onReorder} className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <DragDropItem key={item.id} item={item} />
      ))}
    </Reorder.Group>
  );
}

function DragDropItem({ item }: { item: DragDropItem }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="group relative"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.05, boxShadow: "0 10px 40px rgba(204, 255, 0, 0.3)" }}
        className="flex cursor-grab items-center gap-3 rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm active:cursor-grabbing"
      >
        <button
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab text-gray-400 transition-colors hover:text-[#ccff00] active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="flex-1">{item.content}</div>
      </motion.div>
    </Reorder.Item>
  );
}

export function DraggableCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        setPosition({ x: info.offset.x, y: info.offset.y });
      }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      className={`cursor-grab rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}
