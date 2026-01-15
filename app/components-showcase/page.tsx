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

export default function ComponentsShowcase() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Animated Cursor */}
      <AnimatedCursor />
      
      {/* Floating Elements Background */}
      <FloatingElements count={15} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-black text-black mb-4">
            <GlitchText text="NEW COMPONENTS" trigger="always" />
          </h1>
          <p className="text-2xl text-neutral-600 font-mono">
            <TextScramble text="Built with Framer Motion & GSAP" />
          </p>
        </div>

        {/* Aurora Background Section */}
        <RevealOnScroll className="mb-20">
          <AuroraBackground className="p-12 rounded-lg border-4 border-black">
            <h2 className="text-4xl font-black text-black mb-4">
              Aurora Background
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              Beautiful gradient animations that create a mesmerizing aurora effect.
            </p>
          </AuroraBackground>
        </RevealOnScroll>

        {/* Morphing Text Section */}
        <RevealOnScroll delay={0.2} className="mb-20">
          <div className="bg-black p-12 rounded-lg border-4 border-[#ccff00] shadow-[8px_8px_0px_0px_rgba(204,255,0,1)]">
            <h2 className="text-4xl font-black text-[#ccff00] mb-4">
              Morphing Text
            </h2>
            <p className="text-2xl text-white font-mono">
              Dynamic text:{" "}
              <MorphingText
                texts={["INNOVATE", "CREATE", "DOMINATE", "SCALE"]}
                className="text-[#ccff00] font-black"
                interval={2000}
              />
            </p>
          </div>
        </RevealOnScroll>

        {/* Stagger Grid with Cards */}
        <RevealOnScroll delay={0.3} className="mb-20">
          <h2 className="text-4xl font-black text-black mb-8 text-center">
            Interactive Components
          </h2>
          <StaggerGrid columns={3}>
            <ParallaxCard>
              <div className="bg-white p-8 rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-64 flex flex-col justify-center items-center">
                <h3 className="text-2xl font-black text-black mb-2">
                  Parallax Card
                </h3>
                <p className="text-neutral-600 text-center">
                  Hover to see 3D effect
                </p>
              </div>
            </ParallaxCard>

            <RippleEffect className="bg-[#ccff00] p-8 rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-64 flex flex-col justify-center items-center cursor-pointer">
              <h3 className="text-2xl font-black text-black mb-2">
                Ripple Effect
              </h3>
              <p className="text-black text-center font-medium">
                Click to see ripples
              </p>
            </RippleEffect>

            <div className="bg-gradient-to-br from-[#ff0080] to-[#7928ca] p-8 rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-64 flex flex-col justify-center items-center">
              <h3 className="text-2xl font-black text-white mb-4">
                <GlitchText text="Glitch Text" trigger="hover" />
              </h3>
              <p className="text-white text-center">
                Hover to see glitch
              </p>
            </div>
          </StaggerGrid>
        </RevealOnScroll>

        {/* Particle Background Demo */}
        <RevealOnScroll delay={0.4} className="mb-20">
          <div className="relative overflow-hidden bg-black p-12 rounded-lg border-4 border-[#ccff00] min-h-[400px] flex items-center justify-center">
            <ParticleBackground density={30} />
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-black text-[#ccff00] mb-4">
                Particle Background
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Animated particles floating across the screen create depth and visual interest.
              </p>
              <ShinyButton onClick={() => console.log("Button clicked!")}>
                Shiny Button Demo
              </ShinyButton>
            </div>
          </div>
        </RevealOnScroll>

        {/* Text Scramble Section */}
        <RevealOnScroll delay={0.5} className="mb-20">
          <div className="bg-white p-12 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl font-black text-black mb-4">
              <TextScramble text="Text Scramble Effect" speed={30} />
            </h2>
            <p className="text-xl text-neutral-700">
              Watch the text scramble and reveal itself with a glitchy animation.
            </p>
          </div>
        </RevealOnScroll>

        {/* Features Grid */}
        <RevealOnScroll delay={0.6}>
          <h2 className="text-4xl font-black text-black mb-8 text-center">
            All Components
          </h2>
          <StaggerGrid columns={4} staggerDelay={0.15}>
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
            ].map((component) => (
              <div
                key={component}
                className="bg-[#ccff00] p-6 rounded-lg border-2 border-black text-center font-bold text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                {component}
              </div>
            ))}
          </StaggerGrid>
        </RevealOnScroll>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h2 className="text-5xl font-black text-black mb-6">
            Ready to use these components?
          </h2>
          <ShinyButton onClick={() => console.log("Let's build clicked!")}>
            LET&apos;S BUILD
          </ShinyButton>
        </div>
      </div>
    </main>
  );
}
