import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.a11y.test.{ts,tsx}',
        'src/**/*.stories.tsx',
        'src/**/index.ts',
        'src/test/**',
      ],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.a11y.test.{ts,tsx}', 'node_modules/**', 'dist/**'],
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
            instances: [
              { browser: 'chromium' },
              { browser: 'firefox' },
              { browser: 'webkit' },
            ],
          },
          css: {
            modules: { classNameStrategy: 'non-scoped' },
          },
        },
      },
    ],
  },
})
