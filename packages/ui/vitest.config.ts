import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: [
            'src/**/*.a11y.test.{ts,tsx}',
            'src/**/*.e2e.test.{ts,tsx}',
            'node_modules/**',
            'dist/**',
          ],
          css: {
            modules: { classNameStrategy: 'non-scoped' },
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          setupFiles: ['./vitest.setup.browser.ts'],
          include: ['src/**/*.e2e.test.{ts,tsx}'],
          exclude: ['node_modules/**', 'dist/**'],
          browser: {
            enabled: true,
            headless: true,
            // @ts-ignore — provider typing
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          css: {
            modules: { classNameStrategy: 'non-scoped' },
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'a11y',
          include: ['src/**/*.a11y.test.{ts,tsx}'],
          exclude: ['node_modules/**', 'dist/**'],
          browser: {
            enabled: true,
            headless: true,
            // @ts-ignore — provider typing
            provider: playwright({}),
            instances: [{ browser: 'chromium' }, { browser: 'firefox' }, { browser: 'webkit' }],
          },
          css: {
            modules: { classNameStrategy: 'non-scoped' },
          },
        },
      },
    ],
  },
});
