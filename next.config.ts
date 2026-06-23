import type { NextConfig } from "next";

// output:'export' and basePath are only applied when deploying to GitHub Pages
// via GitHub Actions CI. For local development (npm run dev), neither is set
// so localhost:3000 serves pages normally through the Next.js dev server.
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    output: 'export',
    basePath: '/infraa-version2.o',
    assetPrefix: '/infraa-version2.o/',
  }),
};

export default nextConfig;
