/* Structured views of the token tree for downstream consumers:
 *   tokenSet()        — flat {name, value, group} lists (ui-mcp manifest)
 *   tokenCatalog()    — per-family rows with human-readable dark/light
 *                       formulas (design-docs token reference tables)
 *   derivationTrees() — the derivation graph with labeled edges
 *                       (design-docs token tree). */

import {
  Adjust,
  AliasOf,
  Alpha,
  type Amount,
  type ColorExpr,
  ColorNode,
  ColorToken,
  CssColor,
  Knob,
  KnobCalc,
  type KnobLike,
  Mix,
  nameOf,
  type Theme,
} from './expressions';
import { bgTokens, borderTokens, colorTokens, fgTokens, statusTokens } from './colors';
import { brandKnobs, derivationKnobs } from './knobs';
import { rawColors } from './palette';
import { focusDecls, shadowDecls, staticSections } from './statics';

/* --- Flat token set (ui-mcp manifest shape) ------------------------------ */

export interface FlatToken {
  name: string;
  value: string;
  group: string;
}

export interface FlatTokenSet {
  /** Default (dark) theme tokens from `:root`. */
  dark: FlatToken[];
  /** Overrides applied under `:root[data-theme='light']`. */
  light: FlatToken[];
}

/** Coarse group inferred from a token's name (color/space/text/motion…). */
export function groupOf(name: string): string {
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

function flat(name: string, value: string): FlatToken {
  return { name, value, group: groupOf(name) };
}

export function tokenSet(): FlatTokenSet {
  const dark: FlatToken[] = [];
  for (const k of [...brandKnobs, ...derivationKnobs]) dark.push(flat(k.cssName, k.dark));
  for (const raw of rawColors) dark.push(flat(raw.cssName, raw.values.dark.css()));
  for (const section of staticSections)
    for (const [name, value] of section.decls) dark.push(flat(name, value));
  for (const t of colorTokens) dark.push(flat(t.cssName, t.declaration('dark') as string));
  for (const [name, value] of focusDecls) dark.push(flat(name, value));
  for (const s of shadowDecls) dark.push(flat(s.name, s.dark));

  const light: FlatToken[] = [];
  for (const k of [...brandKnobs, ...derivationKnobs]) {
    if (k.light !== undefined) light.push(flat(k.cssName, k.light));
  }
  for (const raw of rawColors) light.push(flat(raw.cssName, raw.values.light.css()));
  for (const t of statusTokens) {
    const value = t.declaration('light');
    if (value) light.push(flat(t.cssName, value));
  }
  for (const s of shadowDecls) light.push(flat(s.name, s.light));

  return { dark, light };
}

/* --- Docs catalog --------------------------------------------------------- */

export type TokenFamilyName = 'raw' | 'bg' | 'fg' | 'border';

export interface CatalogRow {
  /** Full custom-property name, e.g. `--ds-color-bg-surface`. */
  name: string;
  dark: string;
  light: string;
  note?: string;
}

export function tokenCatalog(): Record<TokenFamilyName, CatalogRow[]> {
  const row = (t: ColorToken): CatalogRow => ({
    name: t.cssName,
    dark: t.formula('dark'),
    light: t.formula('light'),
    note: t.meta.note,
  });
  return {
    raw: rawColors.map((r) => ({
      name: r.cssName,
      dark: r.formula('dark'),
      light: r.formula('light'),
      note: r.docNote,
    })),
    bg: bgTokens.map(row),
    fg: fgTokens.map(row),
    border: borderTokens.map(row),
  };
}

/* --- Derivation trees ------------------------------------------------------ */

export interface TreeNode {
  /** Full custom-property name, or a CSS color literal for pseudo-roots. */
  token: string;
  /** Operation applied to the parent to produce this node. */
  edge?: string;
  children?: TreeNode[];
}

export interface TreeGroup {
  title: string;
  roots: TreeNode[];
}

function amountText(a: Amount, theme: Theme): string {
  return typeof a === 'string' ? a : a.value(theme);
}

function amountKnobs(a: Amount): Knob[] {
  if (a instanceof Knob) return [a];
  if (a instanceof KnobCalc) return [a.base];
  return [];
}

/** The `--*` name behind a color node, if it has (or was given) one. Knobs
 * passed as colors (state-tint) are excluded on purpose. */
function colorRefName(e: ColorExpr): string | null {
  return e instanceof ColorNode ? nameOf(e) : null;
}

function shortName(cssName: string): string {
  return cssName.replace(/^--ds-color-/, '').replace(/^--color-/, '');
}

function colorText(c: ColorExpr, theme: Theme): string {
  const name = colorRefName(c);
  return name ? shortName(name) : c.formula(theme);
}

/** Render `X dark · Y light` when the two themes differ, else just `X`. */
function perTheme(dark: string, light: string): string {
  return dark === light ? dark : `${dark} dark · ${light} light`;
}

function knobSuffix(knobs: KnobLike[], override?: string): string {
  if (override) return ` (${override})`;
  if (!knobs.length) return '';
  const names = [...new Set(knobs.map((k) => k.cssName))];
  return names.length === 1 ? ` (knob: ${names[0]})` : ` (knobs: ${names.join(', ')})`;
}

/** `+ white 12% dark · black 5% light (knobs: …)` / `+ black 4%` */
function mixEdge(e: Mix): { parent: ColorExpr; edge: string } {
  if (colorRefName(e.color)) {
    // The dominant color is the parent; the edge shows what was blended in.
    const pct = (theme: Theme) => `${100 - parseFloat(amountText(e.amount, theme))}%`;
    const text = (theme: Theme) => `+ ${colorText(e.base, theme)} ${pct(theme)}`;
    const knobs = amountKnobs(e.amount);
    const note = knobs.length === 1 ? `knob: 100% − ${knobs[0].cssName}` : undefined;
    return {
      parent: e.color,
      edge: perTheme(text('dark'), text('light')) + knobSuffix(knobs, note),
    };
  }
  const text = (theme: Theme) => `+ ${colorText(e.color, theme)} ${amountText(e.amount, theme)}`;
  const knobs = [...e.color.knobs(), ...amountKnobs(e.amount)];
  return { parent: e.base, edge: perTheme(text('dark'), text('light')) + knobSuffix(knobs) };
}

/** `α 18%` / `α 60% dark · 40% light (knob: --ds-scrim-mix)` */
function alphaEdge(e: Alpha): string {
  const text = (theme: Theme) => `α ${amountText(e.amount, theme)}`;
  return perTheme(text('dark'), text('light')) + knobSuffix(amountKnobs(e.amount));
}

/** `L + 0.06 dark · 0.015 light (knob: --ds-elevate-lift), C + 0.005` */
function adjustEdge(e: Adjust): string {
  const parts: string[] = [];
  for (const [channel, delta] of [
    ['L', e.deltas.l],
    ['C', e.deltas.c],
    ['H', e.deltas.h],
  ] as const) {
    if (delta instanceof Knob) {
      parts.push(
        `${channel} + ${perTheme(delta.value('dark'), delta.value('light'))} (knob: ${delta.cssName})`,
      );
    } else if (delta !== undefined) {
      parts.push(`${channel} ${delta < 0 ? '−' : '+'} ${Math.abs(delta)}`);
    }
  }
  return parts.join(', ');
}

const ALIAS_EDGE = 'alias — same value, new name';

/** Graph key for an expression: `var()`-addressable name or color keyword. */
function refKey(e: ColorExpr): string | null {
  const name = colorRefName(e);
  if (name) return name;
  if (e instanceof CssColor) return e.keyword;
  return null;
}

/** Resolve a token's parent in the derivation graph plus its edge label. */
function parentOf(t: ColorToken): { parent: string | null; edge?: string } {
  if (t.lightExpr) return { parent: null }; // per-theme literal → status root
  const expr = t.darkExpr;

  // `.ref()` aliases and re-placed nodes point at the color they rename.
  if (expr instanceof AliasOf) return { parent: refKey(expr.target), edge: ALIAS_EDGE };
  const name = nameOf(expr);
  if (name && name !== t.cssName) return { parent: name, edge: ALIAS_EDGE };

  let base = expr;
  let suffix = '';
  if (base instanceof Adjust && base.base instanceof Mix) {
    suffix = `, then ${adjustEdge(base)}`;
    base = base.base;
  }

  if (base instanceof Mix) {
    const { parent, edge } = mixEdge(base);
    return { parent: refKey(parent), edge: edge + suffix };
  }
  if (base instanceof Alpha) {
    return { parent: refKey(base.color), edge: alphaEdge(base) };
  }
  if (base instanceof Adjust) {
    return { parent: refKey(base.base), edge: adjustEdge(base) };
  }
  return { parent: null };
}

export function derivationTrees(): TreeGroup[] {
  const children = new Map<string, TreeNode[]>();
  const nodes = new Map<string, TreeNode>();

  const nodeFor = (key: string): TreeNode => {
    let n = nodes.get(key);
    if (!n) {
      n = { token: key };
      nodes.set(key, n);
    }
    return n;
  };

  for (const t of colorTokens) {
    const { parent, edge } = parentOf(t);
    const node = nodeFor(t.cssName);
    node.edge = edge;
    if (parent) {
      const list = children.get(parent) ?? [];
      list.push(node);
      children.set(parent, list);
    }
  }

  // Wire child arrays (tokens can parent other tokens, e.g. bg-elevated).
  for (const [key, list] of children) {
    nodeFor(key).children = list;
  }

  const groups: TreeGroup[] = rawColors
    .filter((r) => children.has(r.cssName))
    .map((r) => ({ title: `From ${r.cssName}`, roots: [nodeFor(r.cssName)] }));

  if (children.has('black')) {
    groups.push({ title: 'From black (backdrops)', roots: [nodeFor('black')] });
  }

  groups.push({
    title: 'Status bases (per-theme literals — the one exception)',
    roots: statusTokens.map((t) => nodeFor(t.cssName)),
  });

  return groups;
}
