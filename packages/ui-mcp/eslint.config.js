import { defineConfig, globalIgnores } from 'eslint/config';
import baseConfig from '@onersoft/eslint-config/base';

export default defineConfig([
  globalIgnores(['dist', 'manifest.generated.json']),
  {
    files: ['**/*.{ts,js}'],
    extends: baseConfig,
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['eslint.config.js'] },
      },
    },
  },
  {
    // Build-time generator + CLI entry: dev-only deps and stderr logging are expected.
    files: ['src/generate/**/*.ts', 'src/server.ts'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
      'no-console': 'off',
    },
  },
]);
