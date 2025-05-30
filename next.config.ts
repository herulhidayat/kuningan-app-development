import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://194.59.165.146:8900/api/v1/:path*",
      },
      {
        source: "/api/cdn/:path*",
        destination: "http://194.59.165.146:8910/:path*",
      },
      {
        source: "/api/cdn-show-image/:path*",
        destination: "http://srv602602.hstgr.cloud:9088/:path*",
      }
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   domains: ['srv602602.hstgr.cloud'],
  // },
};

export default nextConfig;
