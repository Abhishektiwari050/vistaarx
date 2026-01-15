"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const MorphingText = ({
  texts,
  className = "",
  interval = 3000,
}: {
  texts: string[];
  className?: string;
  interval?: number;
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!textRef.current || texts.length === 0) return;

    const morphText = () => {
      const currentIndex = indexRef.current;
      const nextIndex = (currentIndex + 1) % texts.length;

      const tl = gsap.timeline();

      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      })
        .call(() => {
          if (textRef.current) {
            textRef.current.textContent = texts[nextIndex];
          }
        })
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        });

      indexRef.current = nextIndex;
    };

    const intervalId = setInterval(morphText, interval);

    return () => clearInterval(intervalId);
  }, [texts, interval]);

  return (
    <span ref={textRef} className={className}>
      {texts[0]}
    </span>
  );
};
