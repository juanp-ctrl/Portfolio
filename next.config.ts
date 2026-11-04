import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
