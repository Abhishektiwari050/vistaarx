export interface InsightPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: "ENGINEERING" | "ARCHITECTURE" | "GROWTH";
  excerpt: string;
}

export const INSIGHTS: InsightPost[] = [
  {
    slug: "sovereign-primitives-vs-monoliths",
    title: "From Monoliths to Sovereign Primitives: The Architecture of Connected Systems",
    date: "2026-02-18",
    readTime: "6 MIN READ",
    category: "ARCHITECTURE",
    excerpt:
      "Why decoupling monolithic CMS stacks into raw TypeScript primitives and autonomous micro-engines yields 10x lower maintenance debt and total codebase sovereignty.",
  },
  {
    slug: "sub-50ms-ai-agent-pipelines",
    title: "Designing Sub-50ms AI Agent Pipelines in Production Environments",
    date: "2026-01-24",
    readTime: "8 MIN READ",
    category: "ENGINEERING",
    excerpt:
      "A technical walkthrough of streaming async event brokers, token optimization, and edge-evaluated isolation models for mission-critical telemetry.",
  },
  {
    slug: "why-agency-retainers-are-liabilities",
    title: "Why Digital Retainers Are Structural Liabilities for Modern Growth",
    date: "2025-12-10",
    readTime: "5 MIN READ",
    category: "GROWTH",
    excerpt:
      "How open-ended monthly agency retainers disincentivize completion, and why milestone-anchored sovereign software delivery is replacing traditional agency contracts.",
  },
];

export function getRecentInsights(limit = 3): InsightPost[] {
  return INSIGHTS.slice(0, limit);
}
