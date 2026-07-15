/* Writes the generated stylesheet (src/styles/tokens.css) from the TS token
 * tree. The file is a build artifact — gitignored, regenerated on demand. */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { buildTokensCss } from '../src/tokens/emit';

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = resolve(pkgRoot, 'src/styles/tokens.css');
const tokensDir = resolve(pkgRoot, 'src/tokens');

/** Regenerate tokens.css; skips the write when the content is unchanged so
 * watch mode doesn't rebuild in a loop. Returns the output path. */
export function writeTokensCss(): string {
  const css = buildTokensCss();
  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : null;
  if (current !== css) {
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, css, 'utf8');
  }
  return outFile;
}

/** Vite plugin: regenerate on every (re)build and watch the token sources so
 * `vite build --watch` picks up edits under src/tokens/. */
export function tokensPlugin(): Plugin {
  return {
    name: 'onersoft:generate-tokens',
    buildStart() {
      writeTokensCss();
      for (const f of readdirSync(tokensDir, { recursive: true }) as string[]) {
        if (f.endsWith('.ts')) this.addWatchFile(resolve(tokensDir, f));
      }
    },
  };
}
