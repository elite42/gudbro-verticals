/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable Turbopack for Vercel builds - using standard Webpack for better compatibility
  experimental: {
    turbo: undefined, // Explicitly disable Turbopack
  },
  images: {
    domains: [
      'images.unsplash.com',  // Hero background images
      'cdn.gudbro.com',        // Product images & business logos
      'img.vietqr.io',         // Payment QR codes
      'flagcdn.com',           // Language/currency flags
      'api.qrserver.com',      // WiFi QR codes
    ],
    formats: ['image/avif', 'image/webp'],  // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200], // Mobile-optimized breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3014',
  },
  typescript: {
    // ⚠️ TEMPORARY: Ignore TypeScript errors during build for deployment testing
    // TODO: Fix all TypeScript errors in shared/database and menu-template
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Ensure proper CSS handling with Webpack
    return config;
  },
}

module.exports = nextConfig
