import type { Metadata } from "next";
import { BASE_URL, DEFAULT_OG_IMAGES } from "@/lib/seo";
import NetworkClientPage from "./network-client";

export const metadata: Metadata = {
  title: "Global Points of Presence (PoP) & Sovereign AI Edge Network | VISTAR",
  description:
    "Explore VISTAR's 16 global Points of Presence (PoPs) delivering sub-40ms P95 latency for sovereign AI agents, private VPC vaults, and enterprise software across the Americas, EMEA, APAC, and MENA.",
  keywords: [
    "global points of presence AI",
    "AI software development pop",
    "sovereign AI edge network",
    "points of presence across the globe",
    "enterprise AI software engineering",
    "private VPC AI deployment",
    "low latency AI inference",
    "GDPR compliant AI development",
    "DIFC UAE AI software",
    "autonomous agents global network",
  ],
  alternates: {
    canonical: `${BASE_URL}/network`,
  },
  openGraph: {
    title: "Global Points of Presence (PoP) & Sovereign AI Network | VISTAR",
    description:
      "VISTAR deploys sovereign AI software, private VPC vaults, and autonomous agent state machines across 16 global Points of Presence with sub-40ms P95 latency.",
    url: `${BASE_URL}/network`,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    title: "Global Points of Presence (PoP) & Sovereign AI Network | VISTAR",
    description:
      "16 global Points of Presence delivering sub-40ms P95 edge latency for autonomous AI agents, private VPC vaults, and mission-critical enterprise software.",
    images: [DEFAULT_OG_IMAGES[0].url],
  },
};

const networkSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/network#webpage`,
      url: `${BASE_URL}/network`,
      name: "Global Points of Presence (PoP) & Sovereign AI Network — VISTAR",
      description:
        "Technical specifications of VISTAR's 16 global Points of Presence, low-latency Anycast edge routing, and localized private VPC sovereignty perimeters.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Global Network & PoPs", item: `${BASE_URL}/network` },
      ],
    },
    {
      "@type": "Service",
      name: "Global Sovereign AI & Software Engineering Network",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: [
        "United States",
        "United Kingdom",
        "European Union",
        "United Arab Emirates",
        "Singapore",
        "India",
        "Japan",
        "Australia",
        "Canada",
        "Switzerland",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Global AI Points of Presence",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "US-West Edge PoP (Silicon Valley / San Francisco - SFO-1)",
              serviceLocation: {
                "@type": "Place",
                name: "Silicon Valley, California, United States",
                geo: { "@type": "GeoCoordinates", latitude: 37.7749, longitude: -122.4194 },
              },
              description: "14ms P95 edge latency. Autonomous agent pods, foundation model tuning, and tier-1 venture cloud clusters.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "US-East Edge PoP (Northern Virginia / New York - IAD-1)",
              serviceLocation: {
                "@type": "Place",
                name: "Ashburn & New York City, United States",
                geo: { "@type": "GeoCoordinates", latitude: 39.0438, longitude: -77.4874 },
              },
              description: "18ms P95 edge latency. High-frequency enterprise software, FinTech transaction processing, and HIPAA vaults.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "EMEA Edge PoP (London, United Kingdom - LHR-1)",
              serviceLocation: {
                "@type": "Place",
                name: "London, England, United Kingdom",
                geo: { "@type": "GeoCoordinates", latitude: 51.5074, longitude: -0.1278 },
              },
              description: "24ms P95 edge latency. UK GDPR compliant, sovereign banking telemetry, and aerospace AI cockpit clusters.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "EU-Central Edge PoP (Frankfurt, Germany - FRA-1)",
              serviceLocation: {
                "@type": "Place",
                name: "Frankfurt am Main, Hesse, Germany",
                geo: { "@type": "GeoCoordinates", latitude: 50.1109, longitude: 8.6821 },
              },
              description: "26ms P95 edge latency. Strict EU AI Act & GDPR air-gapped private VPC enclaves.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "MENA Edge PoP (Dubai, United Arab Emirates - DXB-1)",
              serviceLocation: {
                "@type": "Place",
                name: "Dubai, United Arab Emirates",
                geo: { "@type": "GeoCoordinates", latitude: 25.2048, longitude: 55.2708 },
              },
              description: "38ms P95 edge latency. DIFC Data Protection Law compliant, sovereign GovTech, and energy logistics AI.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "APAC-South Edge PoP (Bengaluru / Mumbai, India - BLR-1)",
              serviceLocation: {
                "@type": "Place",
                name: "Bengaluru, Karnataka, India",
                geo: { "@type": "GeoCoordinates", latitude: 12.9716, longitude: 77.5946 },
              },
              description: "35ms P95 edge latency. High-velocity core engineering lab, DPDP Act compliance, and sovereign deep-tech pods.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "ServiceChannel",
              name: "APAC-East Edge PoP (Singapore - SIN-1)",
              serviceLocation: {
                "@type": "Place",
                name: "Singapore",
                geo: { "@type": "GeoCoordinates", latitude: 1.3521, longitude: 103.8198 },
              },
              description: "32ms P95 edge latency. Cross-border trade orchestration, maritime GIS telemetry, and APAC multi-agent swarms.",
            },
          },
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(networkSchema) }}
      />
      <NetworkClientPage />
    </>
  );
}
