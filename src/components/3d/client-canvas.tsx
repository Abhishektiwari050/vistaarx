"use client";

import dynamic from "next/dynamic";

// Dynamic import with SSR disabled to prevent hydration errors from WebGL/Canvas
const GlobalCanvasImpl = dynamic(() => import("./global-canvas"), {
  ssr: false,
});

export function ClientCanvas() {
  return <GlobalCanvasImpl />;
}

export default ClientCanvas;
