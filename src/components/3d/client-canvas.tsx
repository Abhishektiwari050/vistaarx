"use client";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent hydration errors from WebGL/Canvas
const GlobalCanvasImpl = dynamic(() => import("./global-canvas"), {
  ssr: false,
});

const TubesBackground = dynamic(() => import("@/components/3d/tubes-background"), {
  ssr: false,
});

export function ClientCanvas() {
  return (
    <>
      <GlobalCanvasImpl />
      <TubesBackground className="fixed inset-0 z-[-8] pointer-events-none" />
    </>
  );
}

export default ClientCanvas;

