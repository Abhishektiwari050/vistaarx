"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Frame {
  id: number
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
}

interface FrameComponentProps {
  video: string
  width: number | string
  height: number | string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  showFrame: boolean
  isHovered: boolean
}

function FrameComponent({
  video,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  showFrame,
  isHovered,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isHovered) {
      videoRef.current?.play().catch(() => {
        // Fallback or ignore if play is interrupted
      })
    } else {
      videoRef.current?.pause()
    }
  }, [isHovered])

  const outerStyle: React.CSSProperties = {
    "--frame-width": width,
    "--frame-height": height,
  } as React.CSSProperties

  const innerStyle: React.CSSProperties = {
    "--inner-padding": showFrame && isHovered ? `${borderThickness}px` : "0",
    "--inner-size": showFrame && isHovered ? `${borderSize}%` : "100%",
    "--inner-offset": showFrame && isHovered ? `${(100 - borderSize) / 2}%` : "0",
  } as React.CSSProperties

  const scaleStyle: React.CSSProperties = {
    "--media-scale": isHovered ? mediaSize * 1.02 : mediaSize,
  } as React.CSSProperties

  const cornerStyle: React.CSSProperties = { "--corner-url": `url(${corner})` } as React.CSSProperties
  const edgeHStyle: React.CSSProperties = { "--edge-url": `url(${edgeHorizontal})` } as React.CSSProperties
  const edgeVStyle: React.CSSProperties = { "--edge-url": `url(${edgeVertical})` } as React.CSSProperties

  return (
    <div
      className={cn("relative transition-[width,height] duration-300 ease-in-out bg-black overflow-hidden will-change-transform", className)}
      style={outerStyle}
    >
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <div
          className={cn(
            "absolute flex items-center justify-center transition-all duration-500 ease-in-out z-[1] bg-black",
            "p-[var(--inner-padding)] w-[var(--inner-size)] h-[var(--inner-size)] left-[var(--inner-offset)] top-[var(--inner-offset)]"
          )}
          style={innerStyle}
        >
          <div
            className="w-full h-full overflow-hidden bg-black transition-transform duration-500 ease-in-out origin-center [transform:scale(var(--media-scale))]"
            style={scaleStyle}
          >
            <video
              className={cn(
                "w-full h-full object-cover transition-opacity duration-700 ease-in-out",
                isHovered ? "opacity-100" : "opacity-100" // Now always 100 to show labels, but hovered can be more vibrant if needed
              )}
              src={video}
              loop
              muted
              playsInline
              ref={videoRef}
            />
            {/* Subtle overlay on idle to make it 'black-out' but still reveal the label */}
            {!isHovered && (
                <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500" />
            )}
          </div>
        </div>

        {showFrame && (
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none z-[2] transition-opacity duration-700 ease-in-out",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat [background-image:var(--corner-url)]" style={cornerStyle} />
            <div className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat scale-x-[-1] [background-image:var(--corner-url)]" style={cornerStyle} />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat scale-y-[-1] [background-image:var(--corner-url)]" style={cornerStyle} />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat scale-[-1] [background-image:var(--corner-url)]" style={cornerStyle} />

            {/* Edges */}
            <div className="absolute top-0 left-16 right-16 h-16 bg-repeat-x [background-image:var(--edge-url)] [background-size:auto_64px]" style={edgeHStyle} />
            <div className="absolute bottom-0 left-16 right-16 h-16 bg-repeat-x rotate-180 [background-image:var(--edge-url)] [background-size:auto_64px]" style={edgeHStyle} />
            <div className="absolute left-0 top-16 bottom-16 w-16 bg-repeat-y [background-image:var(--edge-url)] [background-size:64px_auto]" style={edgeVStyle} />
            <div className="absolute right-0 top-16 bottom-16 w-16 bg-repeat-y scale-x-[-1] [background-image:var(--edge-url)] [background-size:64px_auto]" style={edgeVStyle} />
          </div>
        )}
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
}

export function DynamicFrameLayout({ 
  frames: initialFrames, 
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  const getRowSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return "4fr 4fr 4fr"
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const containerStyle: React.CSSProperties = {
    "--row-sizes": getRowSizes(),
    "--col-sizes": getColSizes(),
    "--gap-size": `${gapSize}px`,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "relative w-full h-full grid transition-[grid-template-rows,grid-template-columns] duration-500 ease-in-out bg-black",
        "[grid-template-rows:var(--row-sizes)] [grid-template-columns:var(--col-sizes)] [gap:var(--gap-size)]",
        className
      )}
      style={containerStyle}
    >
      {initialFrames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)
        
        const itemStyle: React.CSSProperties = {
            "--t-origin": transformOrigin,
        } as React.CSSProperties

        return (
          <motion.div
            key={frame.id}
            className="relative [transform-origin:var(--t-origin)] transition-all duration-500 ease-in-out bg-black border border-white/5 will-change-[grid-area,transform]"
            style={itemStyle}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              video={frame.video}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize}
              borderThickness={frame.borderThickness}
              borderSize={frame.borderSize}
              showFrame={showFrames}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
