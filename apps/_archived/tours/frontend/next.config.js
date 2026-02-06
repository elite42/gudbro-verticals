const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },

  // Transpile shared modules from monorepo
  transpilePackages: ['@shared/payment'],

  // Webpack config for path aliases
  webpack: (config) => {
    config.resolve.alias['@shared'] = path.resolve(__dirname, '../../../shared');
    return config;
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
};

module.exports = nextConfig;
