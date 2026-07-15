import { ColorNode, AliasOf, NamedVar } from './nodes';
import { assignName, assignedName, nameOf } from './registry';
import { ColorToken, ThemedPair } from './token';

/** A leaf of the color spec: one declared color expression. */
export type ColorLeaf = ColorNode | ThemedPair;

/** Nested spec: `category → role → variant → …`. The `DEFAULT` key names the
 * token at the current path; other keys append a segment to the name. */
export interface ColorGroup {
  [key: string]: ColorLeaf | ColorGroup;
}

export type ColorSpec = Record<string, ColorGroup>;

export type ColorTokensOf<G> = {
  [K in keyof G]: G[K] extends ColorLeaf
    ? ColorToken
    : G[K] extends ColorGroup
      ? ColorTokensOf<G[K]>
      : never;
};

export type ColorTree<S extends ColorSpec> = { [C in keyof S]: ColorTokensOf<S[C]> };

function isLeaf(value: ColorLeaf | ColorGroup): value is ColorLeaf {
  return value instanceof ColorNode || value instanceof ThemedPair;
}

function makeToken(segments: string[], value: ColorLeaf): ColorToken {
  const cssName = `--ds-color-${segments.join('-')}`;

  // First placement names the node; later placements (and raw colors, which
  // already carry a name) become aliases: `var(--the-first-name)`.
  if (nameOf(value) === null) {
    assignName(value, cssName);
  }

  const owned = nameOf(value) === cssName || assignedName(value) === cssName;
  const tokenValue =
    !owned && value instanceof ThemedPair
      ? new AliasOf(new NamedVar(assignedName(value) as string))
      : (value as ColorNode | ThemedPair);

  return new ColorToken(cssName, tokenValue, { note: value.docNote });
}

function walk(group: ColorGroup, segments: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(group)) {
    const path = key === 'DEFAULT' ? segments : [...segments, key];
    out[key] = isLeaf(value) ? makeToken(path, value) : walk(value, path);
  }
  return out;
}

/**
 * Assigns token names to the declared color nodes by walking the nested
 * spec — the object shape IS the naming scheme:
 *
 *   defineColors({
 *     bg: {
 *       surface: { DEFAULT: surface, hover: surface.tint(…) },
 *       //         --ds-color-bg-surface   --ds-color-bg-surface-hover
 *       accent: { soft: { DEFAULT: …, hover: … } },
 *       //        --ds-color-bg-accent-soft(-hover)
 *     },
 *   })
 *
 * Re-placing an already named node (or a raw color) emits an alias:
 * `overlay: elevated.ref()` → `--ds-color-bg-overlay: var(--ds-color-bg-elevated)`.
 */
export function defineColors<S extends ColorSpec>(spec: S): ColorTree<S> {
  const out: Record<string, unknown> = {};
  for (const [category, group] of Object.entries(spec)) {
    out[category] = walk(group, [category]);
  }
  return out as ColorTree<S>;
}
