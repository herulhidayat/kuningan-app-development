import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://194.59.165.146:8900/:path*",
      },
    ];
  },
};

export default nextConfig;
