/* Renders the token tree to the tokens.css stylesheet. Pure string building —
 * no filesystem access, so it stays importable from any consumer. */

import { colorTokens, statusTokens } from './colors';
import { brandKnobs, derivationKnobs } from './knobs';
import { mediaOverrides } from './media';
import { rawColors } from './palette';
import { focusDecls, shadowDecls, staticSections } from './statics';

const HEADER = `/* GENERATED FILE — do not edit. Source of truth: src/tokens/.
 * Regenerated automatically by the build (scripts/tokens-codegen.ts). */

/* All rules live in the \`onersoft.ds\` cascade layer so unlayered host CSS
 * can override without specificity battles. */

/* Color tokens follow \`--ds-color-{category}-{role}-{variant}-{state}\`:
 *   category: bg | fg | border
 *   role:     surface, elevated, overlay, subtle, sunken, scrim, accent,
 *             danger, success, warning, info, on-accent, ...
 *   variant:  muted | subtle | soft | strong (neutral role is elided when a
 *             variant is present: fg-muted, border-strong)
 *   state:    hover | pressed
 * \`--ds-color-*\` is reserved for the published theme API — component-local
 * variables use unprefixed names (e.g. \`--switch-border\`).
 *
 * The derived tier is defined ONCE (in \`:root\`) and is fully computed from
 * the raw colors and the knobs. The light theme only overrides raw colors,
 * knobs, status bases, and elevation shadows — never a derived formula. */`;

function decl(name: string, value: string, indent = '    '): string {
  return `${indent}${name}: ${value};`;
}

export function buildTokensCss(): string {
  const out: string[] = [HEADER, '@layer onersoft.ds {', '  :root {'];

  out.push('    /* === Brand knobs === */');
  for (const k of brandKnobs) out.push(decl(k.cssName, k.dark));

  out.push('', '    /* === Derivation knobs (per-theme dials) === */');
  for (const k of derivationKnobs) out.push(decl(k.cssName, k.dark));

  out.push('', '    /* === Raw color tokens (override here to retheme) === */');
  for (const raw of rawColors) out.push(decl(raw.cssName, raw.values.dark.css()));

  out.push('', '    /* === Theme-agnostic === */');
  for (const section of staticSections) {
    out.push('', `    /* ${section.title} */`);
    for (const [name, value] of section.decls) out.push(decl(name, value));
  }

  out.push('', '    /* === Dark theme defaults === */', '    color-scheme: dark;');

  out.push(
    '',
    '    /* === Derived tier — single definitions ===',
    '     * Interaction states mix toward --ds-state-tint (white in dark,',
    '     * black in light) at --ds-state-mix strength. Status bases are the',
    '     * one per-theme exception (independent hues, re-tuned in light). */',
  );
  for (const t of colorTokens) out.push(decl(t.cssName, t.declaration('dark') as string));

  out.push('', '    /* Ring / focus */');
  for (const [name, value] of focusDecls) out.push(decl(name, value));

  out.push('', '    /* Elevation shadows — per-theme (dark) */');
  for (const s of shadowDecls) out.push(decl(s.name, s.dark));

  out.push('  }');

  out.push(
    '',
    '  /* === Light theme — raw colors, knobs, status bases, shadows ONLY.',
    '   * Every derived formula above recomputes from these. === */',
    "  :root[data-theme='light'] {",
  );
  for (const k of [...brandKnobs, ...derivationKnobs]) {
    if (k.light !== undefined) out.push(decl(k.cssName, k.light));
  }
  out.push('');
  for (const raw of rawColors) out.push(decl(raw.cssName, raw.values.light.css()));
  out.push('', '    color-scheme: light;', '');
  for (const t of statusTokens) {
    const light = t.declaration('light');
    if (light) out.push(decl(t.cssName, light));
  }
  out.push('');
  for (const s of shadowDecls) out.push(decl(s.name, s.light));
  out.push('  }');

  out.push('', '  /* === Media query overrides === */');
  for (const m of mediaOverrides) {
    out.push('', `  @media ${m.query} {`, '    :root {');
    for (const [name, value] of m.decls) out.push(decl(name, value, '      '));
    out.push('    }', '  }');
  }

  out.push('}', '');
  return out.join('\n');
}
