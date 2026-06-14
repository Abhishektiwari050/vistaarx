import type { Metadata } from "next";
import WorkPage from "./work-client";

export const metadata: Metadata = {
  title: "Case Studies // Vistar Web Systems",
  description: "Deep-dives into Vistar Web Systems' engineered products: high-performance algorithmic ledgers, edge routing compilers, and bio-modeling rendering systems.",
};

export default function Page() {
  return <WorkPage />;
}
