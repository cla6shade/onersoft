import { readFileSync } from 'node:fs';
import type { Manifest } from './types.js';

/**
 * The manifest is emitted at build time next to package.json (one level up from
 * both `src/` in dev and `dist/` when published), so this relative URL resolves
 * in both cases.
 */
const manifestUrl = new URL('../manifest.generated.json', import.meta.url);

export const manifest: Manifest = JSON.parse(readFileSync(manifestUrl, 'utf8'));

export function findComponent(name: string) {
  const lower = name.toLowerCase();
  return manifest.components.find((c) => c.name.toLowerCase() === lower);
}
