"use client";

import { AnimatedCursor } from "@/components/ui/animated-cursor";
import { FloatingElements } from "@/components/ui/floating-elements";
import { RippleEffect } from "@/components/ui/ripple-effect";
import { TextScramble } from "@/components/ui/text-scramble";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MorphingText } from "@/components/ui/morphing-text";
import { ParallaxCard } from "@/components/ui/parallax-card";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ParticleBackground } from "@/components/ui/particle-background";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { GlitchText } from "@/components/ui/glitch-text";
import { StaggerGrid } from "@/components/ui/stagger-grid";
import { ExplosionText } from "@/components/ui/explosion-text";
import { LiquidButton } from "@/components/ui/liquid-button";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import { WaveText } from "@/components/ui/wave-text";
import { SplitFlipText } from "@/components/ui/split-flip-text";
import { HolographicCard } from "@/components/ui/holographic-card";
import { NeonText } from "@/components/ui/neon-text";
import { RotatingCube } from "@/components/ui/rotating-cube";
import { HeroAnimation3D } from "@/components/ui/hero-animation-3d";

export default function ComponentsShowcase() {
  return (
    <main className="relative min-h-screen bg-black">
      {/* Animated Cursor */}
      <AnimatedCursor />
      
      {/* Floating Elements Background */}
      <FloatingElements count={15} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header Section with 3D Animation */}
        <div className="text-center mb-20">
          <HeroAnimation3D>
            <h1 className="text-7xl font-black mb-4">
              <NeonText text="ADVANCED 3D COMPONENTS" color="#ccff00" />
            </h1>
          </HeroAnimation3D>
          <p className="text-2xl text-[#ccff00] font-mono mt-8">
            <ExplosionText text="Next-Level Animations" />
          </p>
        </div>

        {/* 3D Rotating Cube Demo */}
        <RevealOnScroll className="mb-20">
          <div className="bg-white p-12 rounded-lg border-4 border-black">
            <h2 className="text-4xl font-black text-black mb-8 text-center">
              <WaveText text="3D ROTATING CUBE" />
            </h2>
            <RotatingCube className="min-h-[400px]" />
          </div>
        </RevealOnScroll>

        {/* Holographic Cards Section */}
        <RevealOnScroll delay={0.2} className="mb-20">
          <h2 className="text-4xl font-black text-[#ccff00] mb-8 text-center">
            <SplitFlipText text="HOLOGRAPHIC EFFECTS" />
          </h2>
          <StaggerGrid columns={3}>
            <HolographicCard>
              <h3 className="text-2xl font-black text-[#ccff00] mb-2">
                Holographic Card 1
              </h3>
              <p className="text-white">
                Futuristic design with animated gradients and scan lines
              </p>
            </HolographicCard>

            <HolographicCard>
              <h3 className="text-2xl font-black text-[#ccff00] mb-2">
                Holographic Card 2
              </h3>
              <p className="text-white">
                Smooth 3D rotations on hover with holographic overlay
              </p>
            </HolographicCard>

            <HolographicCard>
              <h3 className="text-2xl font-black text-[#ccff00] mb-2">
                Holographic Card 3
              </h3>
              <p className="text-white">
                Next-gen UI with pulsing neon effects
              </p>
            </HolographicCard>
          </StaggerGrid>
        </RevealOnScroll>

        {/* Magnetic Wrapper Demo */}
        <RevealOnScroll delay={0.3} className="mb-20">
          <div className="bg-white p-12 rounded-lg border-4 border-black text-center">
            <h2 className="text-4xl font-black text-black mb-8">
              MAGNETIC INTERACTION
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Move your mouse near these elements to feel the magnetic pull!
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <MagneticWrapper>
                <div className="w-32 h-32 bg-[#ccff00] border-4 border-black flex items-center justify-center font-black text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  PULL 1
                </div>
              </MagneticWrapper>
              <MagneticWrapper>
                <div className="w-32 h-32 bg-[#ff0080] border-4 border-black flex items-center justify-center font-black text-2xl text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  PULL 2
                </div>
              </MagneticWrapper>
              <MagneticWrapper>
                <div className="w-32 h-32 bg-black border-4 border-[#ccff00] flex items-center justify-center font-black text-2xl text-[#ccff00] shadow-[8px_8px_0px_0px_rgba(204,255,0,1)]">
                  PULL 3
                </div>
              </MagneticWrapper>
            </div>
          </div>
        </RevealOnScroll>

        {/* Liquid Button Demo */}
        <RevealOnScroll delay={0.4} className="mb-20">
          <AuroraBackground className="p-12 rounded-lg border-4 border-[#ccff00]">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white mb-8">
                LIQUID MORPHING BUTTONS
              </h2>
              <div className="flex justify-center gap-6 flex-wrap">
                <LiquidButton onClick={() => console.log("Liquid 1!")}>
                  HOVER ME
                </LiquidButton>
                <LiquidButton onClick={() => console.log("Liquid 2!")} className="bg-white">
                  MORPH EFFECT
                </LiquidButton>
                <LiquidButton onClick={() => console.log("Liquid 3!")} className="bg-[#ff0080] text-white">
                  LIQUID FILL
                </LiquidButton>
              </div>
            </div>
          </AuroraBackground>
        </RevealOnScroll>

        {/* Advanced Text Animations */}
        <RevealOnScroll delay={0.5} className="mb-20">
          <div className="bg-black p-12 rounded-lg border-4 border-[#ccff00]">
            <h2 className="text-4xl font-black text-[#ccff00] mb-8 text-center">
              ADVANCED TEXT ANIMATIONS
            </h2>
            <div className="space-y-12">
              <div>
                <p className="text-white text-sm mb-2 font-mono">Wave Text:</p>
                <WaveText
                  text="SMOOTH WAVE ANIMATION"
                  className="text-4xl font-black text-[#ccff00]"
                />
              </div>
              <div>
                <p className="text-white text-sm mb-2 font-mono">Split Flip Text:</p>
                <SplitFlipText
                  text="3D FLIP ENTRANCE"
                  className="text-4xl font-black text-[#ff0080]"
                />
              </div>
              <div>
                <p className="text-white text-sm mb-2 font-mono">Explosion Text:</p>
                <ExplosionText
                  text="EXPLOSIVE REVEAL"
                  className="text-4xl font-black text-white"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Original Components Grid */}
        <RevealOnScroll delay={0.6} className="mb-20">
          <h2 className="text-4xl font-black text-[#ccff00] mb-8 text-center">
            ALL 22 COMPONENTS
          </h2>
          <StaggerGrid columns={4} staggerDelay={0.1}>
            {[
              "Animated Cursor",
              "Floating Elements",
              "Ripple Effect",
              "Text Scramble",
              "Aurora Background",
              "Morphing Text",
              "Parallax Card",
              "Shiny Button",
              "Particle Background",
              "Reveal on Scroll",
              "Glitch Text",
              "Stagger Grid",
              "Spline 3D Scene",
              "Hero 3D Animation",
              "Explosion Text",
              "Liquid Button",
              "Magnetic Wrapper",
              "Wave Text",
              "Split Flip Text",
              "Holographic Card",
              "Neon Text",
              "Rotating Cube",
            ].map((component) => (
              <div
                key={component}
                className="bg-[#ccff00] p-6 rounded-lg border-2 border-black text-center font-bold text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-pointer hover:scale-105 transform transition-transform"
              >
                {component}
              </div>
            ))}
          </StaggerGrid>
        </RevealOnScroll>

        {/* Particle Background Demo */}
        <RevealOnScroll delay={0.7}>
          <div className="relative overflow-hidden bg-black p-12 rounded-lg border-4 border-[#ff0080] min-h-[400px] flex items-center justify-center">
            <ParticleBackground density={40} />
            <div className="relative z-10 text-center">
              <h2 className="text-5xl font-black text-[#ccff00] mb-6">
                <GlitchText text="READY TO BUILD?" trigger="always" />
              </h2>
              <MagneticWrapper>
                <LiquidButton onClick={() => console.log("Let&apos;s go!")}>
                  <span className="text-2xl font-black">LET&apos;S GO!</span>
                </LiquidButton>
              </MagneticWrapper>
            </div>
          </div>
        </RevealOnScroll>

        {/* Note about Spline */}
        <div className="mt-20 text-center text-[#ccff00] font-mono">
          <p className="text-lg">
            💡 <strong>Spline 3D Integration Available!</strong> Add your Spline scene URLs to use the SplineScene component for full 3D interactive experiences.
          </p>
        </div>
      </div>
    </main>
  );
}
