import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import reactConfig from '@onersoft/eslint-config/react';

const configFiles = ['eslint.config.js', 'vite.config.ts', 'vitest.shims.d.ts'];

export default defineConfig([
  globalIgnores(['dist', 'storybook-static', 'coverage']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: reactConfig,
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: configFiles },
      },
    },
  },
  {
    files: ['**/*.{test,stories}.{ts,tsx}', 'src/test/**/*.{ts,tsx}', 'vitest.{config,setup}.ts'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
]);
