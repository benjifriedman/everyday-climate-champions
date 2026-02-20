import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.everydayclimatechampions.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
