import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import reactConfig from '@onersoft/eslint-config/react';

// scripts/tokens-codegen.ts is reached through vitest.config.ts (part of the
// tsconfig project already); only the CLI entry needs the default project.
const configFiles = ['eslint.config.js', 'vite.config.ts', 'scripts/generate-tokens.ts'];

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
    files: ['**/*.{test,stories}.{ts,tsx}', 'src/test/**/*.{ts,tsx}', 'vitest.*.ts'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
]);
