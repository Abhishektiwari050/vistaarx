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
};

export default nextConfig;
