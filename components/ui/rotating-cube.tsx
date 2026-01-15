"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const RotatingCube = ({ className = "" }: { className?: string }) => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cubeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(cubeRef.current, {
        rotationX: 360,
        rotationY: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }, cubeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ perspective: "1000px" }}>
      <div
        ref={cubeRef}
        className="relative w-48 h-48"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full bg-[#ccff00] border-4 border-black flex items-center justify-center font-black text-4xl"
          style={{ transform: "translateZ(96px)" }}
        >
          FRONT
        </div>
        {/* Back */}
        <div
          className="absolute w-full h-full bg-[#ff0080] border-4 border-black flex items-center justify-center font-black text-4xl text-white"
          style={{ transform: "rotateY(180deg) translateZ(96px)" }}
        >
          BACK
        </div>
        {/* Right */}
        <div
          className="absolute w-full h-full bg-black border-4 border-[#ccff00] flex items-center justify-center font-black text-4xl text-[#ccff00]"
          style={{ transform: "rotateY(90deg) translateZ(96px)" }}
        >
          RIGHT
        </div>
        {/* Left */}
        <div
          className="absolute w-full h-full bg-black border-4 border-[#ff0080] flex items-center justify-center font-black text-4xl text-[#ff0080]"
          style={{ transform: "rotateY(-90deg) translateZ(96px)" }}
        >
          LEFT
        </div>
        {/* Top */}
        <div
          className="absolute w-full h-full bg-white border-4 border-black flex items-center justify-center font-black text-4xl"
          style={{ transform: "rotateX(90deg) translateZ(96px)" }}
        >
          TOP
        </div>
        {/* Bottom */}
        <div
          className="absolute w-full h-full bg-neutral-800 border-4 border-white flex items-center justify-center font-black text-4xl text-white"
          style={{ transform: "rotateX(-90deg) translateZ(96px)" }}
        >
          BOTTOM
        </div>
      </div>
    </div>
  );
};
