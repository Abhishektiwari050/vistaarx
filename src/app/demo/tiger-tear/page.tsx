import type { Metadata } from "next";
import TigerTearRevealDemo from "@/components/ui/tiger-tear-reveal-demo";

export const metadata: Metadata = {
  title: "Tiger Tear Reveal Demo — VISTAR UI Component Showcase",
  description: "Interactive SVG paper tear scroll reveal with dynamic eye tracking and pointer physics.",
};

export default function TigerTearDemoPage() {
  return (
    <main className="min-h-screen bg-[#f2f1ee]">
      <TigerTearRevealDemo />
    </main>
  );
}
