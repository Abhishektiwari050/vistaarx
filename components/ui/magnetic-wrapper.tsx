"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const MagneticWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const moveMagnetic = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 200;

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const x = deltaX * strength * 0.5;
        const y = deltaY * strength * 0.5;

        gsap.to(element, {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    const resetMagnetic = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    };

    window.addEventListener("mousemove", moveMagnetic);
    element.addEventListener("mouseleave", resetMagnetic);

    return () => {
      window.removeEventListener("mousemove", moveMagnetic);
      element.removeEventListener("mouseleave", resetMagnetic);
    };
  }, []);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
