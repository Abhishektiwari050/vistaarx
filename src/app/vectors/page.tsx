import type { Metadata } from "next";
import VectorsPage from "./vectors-client";

export const metadata: Metadata = {
  title: "Performance Vectors // Vistar Web Systems",
  description: "Explore our performance vectors: Core Web Vitals, Edge Distribution, secure sandboxing, and autonomous AI automation pipelines.",
};

export default function Page() {
  return <VectorsPage />;
}
