import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // No `next dev`, dezenas de capas via /_next/image podem falhar ao mesmo tempo
    unoptimized: process.env.NODE_ENV === "development",
    localPatterns: [
      {
        pathname: "/livraria-images/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
    ],
    deviceSizes: [384, 640, 828, 1080],
    imageSizes: [128, 256, 384],
  },
};

export default nextConfig;
