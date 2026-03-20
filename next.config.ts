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
      {
        protocol: "https",
        hostname: "www.praxisinaction.org",
        pathname: "/ecc/**",
      },
    ],
  },
};

export default nextConfig;
