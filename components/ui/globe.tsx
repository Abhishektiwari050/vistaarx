"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from '@react-spring/web';

export const Globe = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [{ r }, api] = useSpring(() => ({
        r: 0,
        config: {
            mass: 1,
            tension: 280,
            friction: 40,
            precision: 0.001,
        },
    }));

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
        window.addEventListener('resize', onResize)
        onResize()
        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 0, /* Light mode */
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [1, 1, 1], /* White base */
            markerColor: [0.1, 0.1, 0.1], /* Dark markers */
            glowColor: [0.8, 0.8, 0.8], /* Subtle grey glow */
            markers: [
                // Instagram (Pink/Purple)
                { location: [37.7749, -122.4194], size: 0.03 },
                { location: [40.7128, -74.0060], size: 0.03 },
                { location: [51.5074, -0.1278], size: 0.03 },
                // x (Black/Grey)
                { location: [35.6762, 139.6503], size: 0.03 },
                { location: [34.0522, -118.2437], size: 0.03 },
                // Snapchat (Yellow)
                { location: [55.7558, 37.6173], size: 0.03 },
                { location: [28.6139, 77.2090], size: 0.03 },
                // Facebook (Blue)
                { location: [1.3521, 103.8198], size: 0.03 },
                { location: [-33.8688, 151.2093], size: 0.03 },
                // More random markers for "connected" feel
                { location: [19.0760, 72.8777], size: 0.03 },
                { location: [48.8566, 2.3522], size: 0.03 },
                { location: [52.5200, 13.4050], size: 0.03 },
                { location: [-23.5505, -46.6333], size: 0.03 },
                { location: [30.0444, 31.2357], size: 0.03 },
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi + r.get()
                phi += 0.005
                state.width = width * 2
                state.height = width * 2
            },
        })
        setTimeout(() => canvasRef.current!.style.opacity = '1')
        return () => {
            globe.destroy()
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <div className="w-full max-w-[600px] aspect-square mx-auto relative">
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                    canvasRef.current!.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = 'grab';
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 200,
                        });
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 100,
                        });
                    }
                }}
                className="w-full h-full cursor-grab opacity-0 transition-opacity duration-1000 ease-linear contain-strict"
            />
        </div>
    )
}
