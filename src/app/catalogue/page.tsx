import type { Metadata } from "next";
import { PortalNav } from "@/components/portal/portal-nav";
import { PortalHero } from "@/components/portal/portal-hero";
import { MarqueeTicker } from "@/components/portal/marquee-ticker";
import { StatementFold } from "@/components/portal/statement-fold";
import { ReleasesSection } from "@/components/portal/throwable-deck";
import { RosterAndDates } from "@/components/portal/roster-and-dates";
import { PortalClose } from "@/components/portal/portal-close";

export const metadata: Metadata = {
  title: "Catalogue: Shipped Software Releases & Physical Deck | VISTAR",
  description:
    "Explore VISTAR's catalogue of shipped software releases, web applications, and verified production systems.",
  alternates: {
    canonical: "/catalogue",
  },
  openGraph: {
    title: "Catalogue: Shipped Software Releases | VISTAR",
    description:
      "Physical sleeve deck and parting portal hero uncovering verified production systems engineered by VISTAR.",
    url: "https://www.vistar.tech/catalogue",
    type: "website",
  },
};

export default function CataloguePage() {
  return (
    <main className="min-h-screen w-full bg-[#FAF9F5] text-[#141413] selection:bg-[#0284C7] selection:text-[#FAF9F5]">
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
