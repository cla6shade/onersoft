import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** Set when building for GitHub Pages — `/onersoft` for project sites. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@onersoft/design-system'],
  allowedDevOrigins: ['home.cla6sha.de'],
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default withMDX(config)
