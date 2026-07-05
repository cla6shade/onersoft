import { readFileSync } from 'node:fs';
import type { Token, TokenSet } from '../types.js';

/**
 * Coarse group inferred from a token's name so `get_theme` can filter by
 * category without depending on fragile CSS comment parsing.
 */
function groupOf(name: string): string {
  if (name.startsWith('--color-')) return 'color';
  if (/^--ds-(color|ring|shadow)/.test(name)) return 'color';
  if (name.startsWith('--ds-space')) return 'space';
  if (name.startsWith('--ds-radius')) return 'radius';
  if (name.startsWith('--ds-shadow')) return 'shadow';
  if (/^--ds-(text|font|leading|weight|tracking)/.test(name)) return 'text';
  if (/^--ds-(duration|ease)/.test(name)) return 'motion';
  if (name.startsWith('--ds-z-')) return 'z';
  if (name.startsWith('--ds-brand')) return 'brand';
  return 'other';
}

/** Pull `--name: value;` declarations out of a CSS block substring. */
function extractTokens(block: string): Token[] {
  const tokens: Token[] = [];
  // `s` flag lets a value span multiple lines (e.g. multi-line color-mix()).
  const decl = /(--[\w-]+)\s*:\s*([^;]+);/gs;
  for (const match of block.matchAll(decl)) {
    const name = match[1];
    const value = match[2].replace(/\s+/g, ' ').trim();
    tokens.push({ name, value, group: groupOf(name) });
  }
  return tokens;
}

export function parseTokens(tokensCssPath: string): TokenSet {
  const css = readFileSync(tokensCssPath, 'utf8');

  const lightMarker = css.indexOf(":root[data-theme='light']");
  const firstMedia = css.indexOf('@media', lightMarker);

  // Default `:root {` block holds dark defaults + theme-agnostic tokens.
  const rootStart = css.indexOf(':root');
  const darkBlock = css.slice(rootStart, lightMarker === -1 ? undefined : lightMarker);
  const lightBlock =
    lightMarker === -1 ? '' : css.slice(lightMarker, firstMedia === -1 ? undefined : firstMedia);

  return {
    dark: extractTokens(darkBlock),
    light: extractTokens(lightBlock),
  };
}
