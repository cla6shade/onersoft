/* The derived `--ds-color-*` tier. Each family declares a nested object
 * (category → role → variant) in its own file; `defineColors()` turns the
 * object keys into token names and the shared consts into aliases. */

import { ColorToken, defineColors } from '../expressions';
import { bg } from './bg';
import { border } from './border';
import { fg } from './fg';

export const colors = defineColors({ bg, fg, border });

/* Flat views in declaration order — for the CSS emitter and the docs. */
function collect(group: object): ColorToken[] {
  return Object.values(group).flatMap((v) => (v instanceof ColorToken ? [v] : collect(v)));
}

export const bgTokens = collect(colors.bg);
export const fgTokens = collect(colors.fg);
export const borderTokens = collect(colors.border);
export const colorTokens = [...bgTokens, ...fgTokens, ...borderTokens];

/** Tokens that own a per-theme literal (the status bases). */
export const statusTokens = colorTokens.filter((t) => t.lightExpr !== undefined);
