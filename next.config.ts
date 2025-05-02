import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://192.168.24.63:8900/api/v1/:path*",
      },
      {
        source: "/api/cdn/:path*",
        destination: "http://194.59.165.146:8910/:path*",
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['bigdata.kuningankab.go.id'],
  },
};

export default nextConfig;
