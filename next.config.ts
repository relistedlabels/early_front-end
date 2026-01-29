import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.paystack.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
      allowedOrigins: [
        "*.replit.dev",
        "*.replit.app", 
        "*.repl.co",
        "*.kirk.replit.dev",
      ],
    },
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.replit.app",
    "*.repl.co",
    "*.kirk.replit.dev",
    "127.0.0.1",
    "localhost",
  ],
};

export default nextConfig;
