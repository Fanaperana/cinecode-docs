import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Static HTML export so the site can be served by GitHub Pages.
  output: 'export',
  // GitHub Pages has no image optimizer.
  images: { unoptimized: true },
  // Emit `foo/index.html` so nested routes resolve on Pages.
  trailingSlash: true,
  // Served from `https://<user>.github.io/<repo>` in production.
  basePath,
  assetPrefix: basePath || undefined,
};

export default withMDX(config);
