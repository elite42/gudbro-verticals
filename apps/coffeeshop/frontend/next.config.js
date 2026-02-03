/* global require, module */
/* eslint-disable @typescript-eslint/no-require-imports */
const { createNextConfig } = require('../../../shared/config/next.config.base');

module.exports = createNextConfig({
  port: 3014,
  overrides: {},
});
