"use client";

import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { CustomerPaths } from "@/components/home/customer-paths";
import { ProcessSection } from "@/components/home/process-section";
import { MetricsSection } from "@/components/home/metrics-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import SmoothScroll from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Link from "next/link";
import SplineScene from "@/components/home/SplineScene";
import { LogoMarquee } from "@/components/home/logo-marquee";

export default function HomePage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen w-full bg-background antialiased relative selection:bg-cyan-500 selection:text-black">
        <ScrollProgress />

        {/* 1. HERO SECTION (Full Viewport, Sticky behavior handled internally or via GSAP) */}
        <HeroSection />

        {/* 1.5. LOGO MARQUEE */}
        <LogoMarquee />

        {/* 2. SERVICES SECTION (The Vistaar Advantage) */}
        <ServicesSection />

        {/* 3. CUSTOMER PATHS (Export / Online / Scale) */}
        <CustomerPaths />

        {/* 4. PROCESS SECTION (Vertical Timeline) */}
        <ProcessSection />

        {/* 5. TESTIMONIALS (Scanning Carousel) */}
        <TestimonialsSection />

        {/* 6. METRICS */}
        <MetricsSection />

        {/* 7. FINAL CTA */}
        <section className="py-32 bg-background relative overflow-hidden text-center px-6 min-h-[80vh] flex items-center justify-center">
          {/* Background Spline */}
          <div className="absolute inset-0 z-0 opacity-60">
            <SplineScene />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-0" />
          <div className="absolute inset-0 bg-white/40 z-0" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tight drop-shadow-2xl">
              Ready to Become a <br />
              <span className="text-cyan-400">Market Leader?</span>
            </h2>
            <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto drop-shadow-md">
              Stop chasing leads. Let&apos;s build the system that brings them to you.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-background bg-foreground rounded-full hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
            >
              Schedule Free Strategy Call
            </Link>
          </div>
        </section>

      </main>
    </SmoothScroll>
  );
}
