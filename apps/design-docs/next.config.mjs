import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@onersoft/design-system'],
  allowedDevOrigins: ['home.cla6sha.de'],
}

export default withMDX(config)
