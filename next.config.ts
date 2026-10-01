import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "three": path.resolve("./node_modules/three"),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      "three": "./node_modules/three",
    },
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  async headers() {
    return [
      {
        // Apply to all pages
        source: "/(.*)",
        headers: [
          // Allow Google, Bing, and AI crawlers explicitly
          { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
          // Security headers that don't break crawling
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Static assets: long cache for performance
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Sitemap and robots: short cache so Google gets updates fast
        source: "/(sitemap.xml|robots.txt|llms.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Redirect non-www to www for canonical authority
      {
        source: "/:path*",
        has: [{ type: "host", value: "vistar.tech" }],
        destination: "https://www.vistar.tech/:path*",
        permanent: true,
      },
      // Consolidate legacy alias routes to primary canonical pages
      {
        source: "/company",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/vectors",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/network",
        destination: "/vectors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
