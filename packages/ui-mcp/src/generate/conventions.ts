/**
 * Design-system invariants surfaced to agents via `get_conventions`. Sourced
 * from CLAUDE.md, packages/ui/README.md, and .impeccable.md — kept terse so it
 * fits comfortably in a tool response.
 */
export const CONVENTIONS = `# @onersoft/ui — how to use it correctly

## Token-first
Customize by overriding \`--ds-*\` tokens (and raw \`--color-*\` tokens) — never by
reaching into component class names. Do not hardcode colors, spacing, radii, or
shadows; reference the tokens from \`get_theme\` instead.

## Cascade layer
All DS CSS lives inside \`@layer onersoft.ds\`, so host *unlayered* CSS wins
without specificity battles. Do not move styles out of the layer.

## data-slot is the styling API
CSS Module class names are hashed. Target the stable \`data-slot="..."\` values
(from \`get_component_props\`) — never the hashed class names.

## Theming
Theme switches via \`<html data-theme="light|dark">\`; default (\`:root\`) is dark.
The DS exports no ThemeProvider — the host wires one (e.g. next-themes with
\`attribute="data-theme"\`).

## Imports
Importing the barrel \`@onersoft/ui\` auto-injects \`tokens.css\`. Importing a
subpath (\`@onersoft/ui/Button\`) does NOT — those callers must
\`import '@onersoft/ui/tokens.css'\` themselves.

## Design tone (Refined · Calm · Precise)
Brand hue is a desaturated blue-grey; neutrals tinted toward it. Accents only in
the 10% slot of 60-30-10. Easing is monotonic ease-out. Forbidden: gradient
text/backgrounds, accent stripes (≥2px border-left/right), glassmorphism blur,
neon glow, pure #000/#fff, bounce/elastic easing.`;
