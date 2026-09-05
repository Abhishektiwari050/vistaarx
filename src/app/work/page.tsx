import type { Metadata } from "next";
import WorkPage from "./work-client";

export const metadata: Metadata = {
  title: "Production Case Studies & Shipped Systems",
  description:
    "Explore verified production systems engineered by Vistar Web Systems: Project VAYU (Aviation AI), AURA (Multi-Agent Telemetry), Atify (Native Audio Engine), 3axis Arc (3D Real Estate), and Competence CRM.",
  keywords: [
    "Next.js Case Studies",
    "Aviation AI Telemetry",
    "Multi-Agent System Architecture",
    "Native Kotlin Audio Engine",
    "WebGL Real Estate Platform",
    "Enterprise CRM Engineering",
    "Production Software Portfolio",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Production Case Studies & Shipped Systems | Vistar Web Systems",
    description:
      "Deep architectural breakdowns and verified metrics for production software platforms engineered by Vistar Web Systems.",
    url: "https://www.vistar.tech/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Production Case Studies & Shipped Systems | Vistar Web Systems",
    description:
      "Deep architectural breakdowns and verified metrics for production software platforms engineered by Vistar Web Systems.",
  },
};

const workSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Vistar Web Systems Shipped Software Portfolio",
  description: "Verified commercial production systems and open-source software engineering breakdowns.",
  url: "https://www.vistar.tech/work",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        position: 1,
        name: "Project VAYU (AI-VAYU)",
        applicationCategory: "Aviation AI & Cockpit Telemetry",
        operatingSystem: "Web",
        url: "https://ai-vayu.vercel.app",
        description: "AI-powered aviation cockpit platform with GIS interactive airspace HUD, automated NOTAM hazard decoding, and executive briefing reports.",
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "AURA: Multi-Agent Anomaly System",
        applicationCategory: "Healthcare & Telemetry Monitoring",
        operatingSystem: "Cloud / Web",
        url: "https://multi-agent-anomaly-system.onrender.com",
        description: "Asynchronous clinical telemetry monitoring and anomaly detection engine powered by a decoupled multi-agent system and Isolation Forest machine learning.",
      },
      {
        "@type": "SoftwareApplication",
        position: 3,
        name: "Atify Audiophile Music Player",
        applicationCategory: "Mobile Audio Engineering",
        operatingSystem: "Android",
        url: "https://github.com/Abhishektiwari050/Atify",
        description: "Multi-source Android music engine with lossless Bit-Perfect FLAC playback, full Spotify account synchronization, and native Android Auto head-unit support.",
      },
      {
        "@type": "SoftwareApplication",
        position: 4,
        name: "3axis Arc Architectural Platform",
        applicationCategory: "PropTech & Real Estate",
        operatingSystem: "Web",
        url: "https://3axisarc.vercel.app",
        description: "High-end architectural real estate platform featuring interactive 3D parallax with mouse-tracking perspective shifts and structural typography.",
      },
      {
        "@type": "SoftwareApplication",
        position: 5,
        name: "Competence CRM Platform",
        applicationCategory: "Enterprise B2B Operations",
        operatingSystem: "Web",
        url: "https://competenceconsultingcrm.onrender.com",
        description: "Enterprise CRM and project management platform with automated client status tracking and activity telemetry logging.",
      },
      {
        "@type": "SoftwareApplication",
        position: 6,
        name: "Vayuways Aviation Consultancy",
        applicationCategory: "Aviation & Charter Logistics",
        operatingSystem: "Web",
        url: "https://vayuways.vercel.app",
        description: "High-speed Next.js aviation services platform with modern flight inquiry dispatch and responsive fleet showcases.",
      },
      {
        "@type": "SoftwareApplication",
        position: 7,
        name: "JBS Cargo Dispatch Platform",
        applicationCategory: "Freight Logistics & Transport",
        operatingSystem: "Web",
        url: "https://jbs-cargo.vercel.app",
        description: "Automated freight inquiry and logistics dispatch platform with instant quote generation and tracking workflows.",
      },
      {
        "@type": "SoftwareApplication",
        position: 8,
        name: "KL Herbal E-Commerce Storefront",
        applicationCategory: "E-Commerce",
        operatingSystem: "Web",
        url: "https://klherbal.vercel.app",
        description: "Responsive, zero-layout-shift Next.js herbal wellness storefront with catalog filtering and instant checkout.",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      <WorkPage />
    </>
  );
}
