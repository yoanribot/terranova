import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Keep Next/Turbopack scoped to the deployable landing app. This prevents
  // unrelated parent lockfiles from changing the workspace root during builds.
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
