/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },

  // Disable rewrites and redirects that can cause filter errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Disable experimental features that can cause issues in Cloud Functions
  experimental: {
    serverComponentsExternalPackages: [],
  },

  // Optimize for Firebase Functions/Serverless
  compress: false,
  poweredByHeader: false,

  // Disable problematic features for Firebase Functions
  trailingSlash: false,

  // Minimal headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  // Disable redirects that can cause issues
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
