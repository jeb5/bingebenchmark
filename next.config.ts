import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['knex'],
  images: {
    // domains: ["image.tmdb.org"],
    remotePatterns: [
      new URL("https://image.tmdb.org/**"),
    ]
  },
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: ['@svgr/webpack'],
      },
    },
  }
};

export default nextConfig;
