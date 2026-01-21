import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/shared/database/**',
      '**/e2e/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'shared/database/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
      ],
    },
  },
  resolve: {
    alias: {
      // Backoffice app aliases
      '@/lib': path.resolve(__dirname, './apps/backoffice/lib'),
      '@/components': path.resolve(__dirname, './apps/backoffice/components'),
      '@/app': path.resolve(__dirname, './apps/backoffice/app'),
      // Shared packages
      '@gudbro/types': path.resolve(__dirname, './shared/types'),
      '@gudbro/utils': path.resolve(__dirname, './shared/utils'),
      '@gudbro/config': path.resolve(__dirname, './shared/config'),
      '@gudbro/ui': path.resolve(__dirname, './shared/ui'),
      // Fallback for other @ imports
      '@': path.resolve(__dirname, './apps/backoffice'),
    },
  },
});
