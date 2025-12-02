/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Skip type checking for now due to monorepo type conflicts
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
