import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const NextConfig: import("next").NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oimpundnvncbmxsyxcwh.supabase.co",
      },
    ],
  },
};

module.exports = NextConfig;
