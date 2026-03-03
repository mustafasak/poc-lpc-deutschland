import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lespetitsculottes.com",
        pathname: "/themes/**",
      },
      {
        protocol: "https",
        hostname: "medias.lespetitsculottes.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
