import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import reactConfig from '@onersoft/eslint-config/react';

export default defineConfig([
  globalIgnores(['dist', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: reactConfig,
  },
  ...storybook.configs['flat/recommended'],
]);
