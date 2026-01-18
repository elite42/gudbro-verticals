import { defineConfig } from '@trigger.dev/sdk/v3';

export default defineConfig({
  project: 'gudbro-backoffice',
  runtime: 'node',
  logLevel: 'info',
  maxDuration: 300, // 5 minutes max per task
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 60000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ['./trigger'],
});
