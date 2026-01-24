"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const SplitFlipText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".flip-word", {
        rotationX: -90,
        opacity: 0,
        transformOrigin: "top center",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap gap-2 ${className}`} style={{ perspective: "1000px" }}>
      {words.map((word, index) => (
        <div
          key={index}
          className="flip-word inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </div>
      ))}
    </div>
  );
};
