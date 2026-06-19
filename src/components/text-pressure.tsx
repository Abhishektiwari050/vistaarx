"use client";

import React, { useEffect, useRef, useState } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
  maxDistance?: number; // Influence radius in px
}

export function TextPressure({
  text,
  className = "",
  maxDistance = 150,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Track mouse coordinates globally
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const updatePressure = () => {
      const mouse = mouseRef.current;
      
      charRefs.current.forEach((charSpan) => {
        if (!charSpan) return;

        const rect = charSpan.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        // Calculate Euclidean distance
        const dx = mouse.x - charCenterX;
        const dy = mouse.y - charCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let wght = 100;
        let wdth = 60;
        let ital = 0;

        if (distance < maxDistance) {
          const influence = 1 - distance / maxDistance;
          // Apply quadratic easing for a punchier transition
          const easeInfluence = influence * influence; 
          
          wght = Math.round(100 + easeInfluence * 800); // 100 to 900
          wdth = Math.round(60 + easeInfluence * 91);   // 60 to 151
          ital = Math.min(Math.max(easeInfluence, 0), 1); // 0 to 1
        }

        // Instantly update variation settings at 60fps
        charSpan.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
      });

      animationFrameId = requestAnimationFrame(updatePressure);
    };

    animationFrameId = requestAnimationFrame(updatePressure);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, maxDistance]);

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  const chars = text.split("");

  return (
    <span ref={containerRef} className={`inline-flex select-none ${className}`}>
      {/* Inject Roboto Flex variable font dynamically */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:ital,wdth,wght@0,25..151,100..1000;1,25..151,100..1000&display=swap');
        .text-pressure-char {
          font-family: 'Roboto Flex', sans-serif;
          font-style: normal;
          display: inline-block;
          white-space: pre;
          will-change: font-variation-settings;
        }
      `}} />
      
      {chars.map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            charRefs.current[index] = el;
          }}
          className="text-pressure-char"
          style={{ fontVariationSettings: "'wght' 100, 'wdth' 60, 'ital' 0" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default TextPressure;
