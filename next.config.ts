import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/management/:path*",
        destination: "http://10.12.120.89:41031/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
