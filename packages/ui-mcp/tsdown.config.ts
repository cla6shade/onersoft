import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/server.ts'],
  format: 'esm',
  platform: 'node',
  target: 'node20',
  dts: false,
  clean: true,
  // The manifest is generated next to package.json (one level up from dist/)
  // and read at runtime via a path relative to the built server.js.
});
