import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: process.env.RENDER ? "./tsconfig.render.json" : "./tsconfig.json",
  },
};

export default nextConfig;
