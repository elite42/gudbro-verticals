/* global module, process */
/**
 * @gudbro/config - Next.js Config Factory
 *
 * Creates a standardized Next.js configuration for all PWA apps.
 *
 * Usage in app next.config.js:
 *   const { createNextConfig } = require('../../shared/config/next.config.base');
 *   module.exports = createNextConfig({ port: 3033 });
 */

/**
 * @param {Object} options
 * @param {number} options.port - Dev server port for NEXT_PUBLIC_API_URL fallback
 * @param {string[]} [options.additionalDomains=[]] - Extra image domains to append
 * @param {Object} [options.overrides={}] - Additional Next.js config to merge
 * @returns {import('next').NextConfig}
 */
function createNextConfig({ port, additionalDomains = [], overrides = {} }) {
  const baseDomains = [
    'images.unsplash.com',
    'cdn.gudbro.com',
    'img.vietqr.io',
    'flagcdn.com',
    'api.qrserver.com',
  ];

  const baseConfig = {
    reactStrictMode: true,
    images: {
      domains: [...baseDomains, ...additionalDomains],
      formats: ['image/avif', 'image/webp'],
      deviceSizes: [640, 750, 828, 1080, 1200],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || `http://localhost:${port}`,
    },
  };

  // Merge overrides: spread top-level, manually merge nested objects
  const { images: imageOverrides, env: envOverrides, ...restOverrides } = overrides;

  return {
    ...baseConfig,
    ...restOverrides,
    images: {
      ...baseConfig.images,
      ...imageOverrides,
      // Always append override domains rather than replacing
      domains: imageOverrides?.domains
        ? [...baseConfig.images.domains, ...imageOverrides.domains]
        : baseConfig.images.domains,
    },
    env: {
      ...baseConfig.env,
      ...envOverrides,
    },
  };
}

module.exports = { createNextConfig };
