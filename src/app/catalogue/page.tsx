import type { Metadata } from "next";
import { PortalNav } from "@/components/portal/portal-nav";
import { PortalHero } from "@/components/portal/portal-hero";
import { MarqueeTicker } from "@/components/portal/marquee-ticker";
import { StatementFold } from "@/components/portal/statement-fold";
import { ReleasesSection } from "@/components/portal/throwable-deck";
import { RosterAndDates } from "@/components/portal/roster-and-dates";
import { PortalClose } from "@/components/portal/portal-close";

export const metadata: Metadata = {
  title: "CATALOGUE // Shipped Software Releases & Physical Deck | VISTAR",
  description:
    "Explore VISTAR's physical catalogue of shipped software releases, autonomous AI architectures, and verified production systems through a scroll-bound parting portal hero.",
  alternates: {
    canonical: "/catalogue",
  },
  openGraph: {
    title: "CATALOGUE // Shipped Software Releases | VISTAR",
    description:
      "Physical sleeve deck and parting portal hero uncovering verified production systems engineered by VISTAR.",
    url: "https://www.vistar.tech/catalogue",
    type: "website",
  },
};

export default function CataloguePage() {
  return (
    <main className="min-h-screen w-full bg-[#0A0C0E] text-[#EDE7DC] selection:bg-[#E8913C] selection:text-[#0A0C0E]">
      <PortalNav />
      <PortalHero />
      <MarqueeTicker />
      <StatementFold />
      <ReleasesSection />
      <RosterAndDates />
      <PortalClose />
    </main>
  );
}
