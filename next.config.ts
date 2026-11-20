import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Copertine degli eventi Luma (src/lib/eventi.ts). Passano dal nostro
    // server: il browser del visitatore non contatta mai Luma.
    remotePatterns: [
      { protocol: "https", hostname: "images.lumacdn.com" },
      { protocol: "https", hostname: "cdn.lu.ma" },
    ],
  },
};

export default nextConfig;
