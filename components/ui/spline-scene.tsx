"use client";

import Spline from "@splinetool/react-spline";
import { useState } from "react";

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const SplineScene = ({ sceneUrl, className = "", fallback }: SplineSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#ccff00] font-bold font-mono">LOADING 3D SCENE...</p>
          </div>
        </div>
      )}
      {error && fallback ? (
        fallback
      ) : (
        <Spline
          scene={sceneUrl}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
};
