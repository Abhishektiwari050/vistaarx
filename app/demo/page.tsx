"use client"

import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout"

// Frame assets from Unsplash (Metallic/Gold texture)
const FRAME_ASSETS = {
  corner: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=200&h=200&auto=format&fit=crop",
  edgeHorizontal: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&h=64&auto=format&fit=crop",
  edgeVertical: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&h=400&auto=format&fit=crop",
}

const demoFrames = [
  {
    id: 1,
    video: "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 2,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 3,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 4,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 5,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 6,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 7,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 8,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
  {
    id: 9,
    video: "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    ...FRAME_ASSETS,
    borderThickness: 8,
    borderSize: 92,
  },
]

export default function DemoPage() {
  return (
    <main className="h-screen w-full bg-zinc-950 overflow-hidden flex flex-col pt-20 px-8 pb-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Vistar Production Gallery</h1>
        <p className="text-zinc-400">Hover over any frame to expand the view and start playback.</p>
      </div>
      <div className="flex-1 min-h-0 border border-zinc-800 rounded-2xl p-4 bg-zinc-900/50 backdrop-blur-sm">
        <DynamicFrameLayout 
          frames={demoFrames} 
          className="w-full h-full" 
          hoverSize={6}
          gapSize={12}
          showFrames={true}
        />
      </div>
    </main>
  )
}
