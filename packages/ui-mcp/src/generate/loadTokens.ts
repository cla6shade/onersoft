import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { TokenSet } from '../types.js';

/**
 * Loads the token tree straight from @onersoft/ui's TypeScript source
 * (src/tokens/) and flattens it to the manifest shape. The generator runs
 * under tsx, so importing workspace .ts files by path is fine — no @onersoft/ui
 * build required. Dynamic import keeps this package's NodeNext type-checking
 * out of the ui package's bundler-resolved sources.
 */
export async function loadTokens(uiSrc: string): Promise<TokenSet> {
  const mod = (await import(pathToFileURL(join(uiSrc, 'tokens', 'index.ts')).href)) as {
    tokenSet: () => TokenSet;
  };
  return mod.tokenSet();
}
