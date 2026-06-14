import type { Metadata } from "next";
import PhilosophyPage from "./philosophy-client";

export const metadata: Metadata = {
  title: "Philosophy & Team // Vistar Web Systems",
  description: "Discover Vistar Web Systems' custom design-engineering philosophy: hand-crafted code, zero templates, complete codebase transfer, and sub-second load times.",
};

export default function Page() {
  return <PhilosophyPage />;
}
