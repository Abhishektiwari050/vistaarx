"use client"

import React, { Suspense } from 'react';
// Lazy load Spline to avoid blocking initial render
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function SplineScene() {
    return (
        <div className="w-full h-full">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/20">Loading 3D Scene...</div>}>
                <Spline scene="https://prod.spline.design/s9JX6Dq2mxbRuOvX/scene.splinecode" />
            </Suspense>
        </div>
    );
}
