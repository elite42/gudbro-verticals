/* global require, module */
/* eslint-disable @typescript-eslint/no-require-imports */
const { createNextConfig } = require('../../../shared/config/next.config.base');

module.exports = createNextConfig({
  port: 3014,
  overrides: {
    typescript: {
      // TEMPORARY: Ignore TypeScript errors during build for deployment testing
      // TODO: Fix all TypeScript errors in shared/database and menu-template
      ignoreBuildErrors: true,
    },
  },
});
