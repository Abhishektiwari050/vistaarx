import type { Metadata } from "next";
import { CloudShaderDemo } from "@/components/ui/cloud-shader-demo";

export const metadata: Metadata = {
  title: "Cloud Shader Demo — WebGL Atmospheric Simulation",
  description: "Interactive WebGL 3D volumetric billow noise shader for atmospheric modeling.",
};

export default function CloudShaderDemoPage() {
  return (
    <main className="w-full min-h-screen bg-[#0C0D12] text-white pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#FF3823] font-semibold">
            WebGL Shader Primitive
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mt-1">
            Cloud Shader Simulation
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl mt-2">
            Real-time domain-warped billow noise with self-shadowing and Rayleigh scattering. Built with raw WebGL and Tailwind CSS for Project VAYU.
          </p>
        </div>

        <CloudShaderDemo />
      </div>
    </main>
  );
}
