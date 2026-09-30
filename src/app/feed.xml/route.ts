import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.vistar.tech";
  const pubDate = new Date().toUTCString();

  const items = [
    {
      title: "Global Points of Presence (PoPs) & Sovereign AI Edge Network Architecture",
      link: `${baseUrl}/network`,
      description:
        "VISTAR deploys sovereign AI software, private VPC model vaults, and autonomous multi-agent state machines across 16 global Points of Presence with sub-40ms P95 latency.",
      pubDate,
      guid: `${baseUrl}/network`,
    },
    {
      title: "Project VAYU: Real-Time Cockpit Telemetry & Automated NOTAM AI Architecture",
      link: `${baseUrl}/work`,
      description:
        "Sub-45ms situational awareness cockpit dashboard ingesting geospatial hazard layers and automated NOTAM advisories for aerospace pilots.",
      pubDate,
      guid: `${baseUrl}/work#vayu`,
    },
    {
      title: "AURA: Multi-Agent Biometric Anomaly Detection in Critical Healthcare",
      link: `${baseUrl}/work`,
      description:
        "Multi-agent telemetry stream architecture with unsupervised Isolation Forest ML models delivering 99.8% precision with zero third-party data egress.",
      pubDate,
      guid: `${baseUrl}/work#aura`,
    },
    {
      title: "3axis Arc: High-Performance Next.js 16 WebGL Spatial 3D Platform",
      link: `${baseUrl}/work`,
      description:
        "GPU-accelerated architectural perspective transformations delivering 60fps locked rendering and sub-85ms global TTFB worldwide.",
      pubDate,
      guid: `${baseUrl}/work#3axisarc`,
    },
    {
      title: "Autonomous Multi-Agent Systems & Sovereign Cloud AI Engineering",
      link: `${baseUrl}/services/ai-solutions`,
      description:
        "Deterministic agent graphs, private VPC model vaults, and enterprise workflow automation delivered in 14-day production sprints with 100% source code ownership.",
      pubDate,
      guid: `${baseUrl}/services/ai-solutions`,
    },
    {
      title: "Enterprise Next.js 16 & React 19 Edge Engineering Standards",
      link: `${baseUrl}/services/nextjs-engineering`,
      description:
        "Mission-critical web platforms engineered with TypeScript, PostgreSQL 16 relational integrity, and sub-100ms global Anycast edge response times.",
      pubDate,
      guid: `${baseUrl}/services/nextjs-engineering`,
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>VISTAR — Sovereign AI &amp; Enterprise Software Engineering</title>
  <link>${baseUrl}</link>
  <description>Engineering releases, production case studies, and global Points of Presence (PoPs) architecture from VISTAR.</description>
  <language>en-us</language>
  <lastBuildDate>${pubDate}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${items
    .map(
      (item) => `
  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${item.link}</link>
    <description><![CDATA[${item.description}]]></description>
    <pubDate>${item.pubDate}</pubDate>
    <guid isPermaLink="false">${item.guid}</guid>
  </item>`
    )
    .join("")}
</channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
