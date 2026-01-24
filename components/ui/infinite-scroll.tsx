"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface InfiniteScrollProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loader?: ReactNode;
  threshold?: number;
  className?: string;
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  loadMore,
  hasMore,
  loader,
  threshold = 200,
  className = "",
}: InfiniteScrollProps<T>) {
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          await loadMore();
          setLoading(false);
        }
      },
      { threshold: 0.1, rootMargin: `${threshold}px` }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore, threshold]);

  return (
    <div className={className}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>

      <div ref={observerTarget} className="flex justify-center py-8">
        {loading && (
          loader || (
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  className="h-3 w-3 rounded-full bg-gradient-to-r from-[#ccff00] to-[#ff0080]"
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
