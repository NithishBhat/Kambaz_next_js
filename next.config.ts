import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This tells Next.js to ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  // you can add other config options here
};

export default nextConfig;

