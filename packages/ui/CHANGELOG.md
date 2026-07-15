# @onersoft/ui

## 0.1.0

### Minor Changes

- 93842c3: Fix `--ds-color-bg-subtle` theme inconsistency. In dark it previously sat _above_ `surface` (mixed toward white) while in light it sat _below_ `surface`, so the token flipped sides between themes. It now mixes toward black in dark as well, sitting just below `surface` in both themes — giving one consistent elevation ladder (`sunken < subtle < surface < elevated`) regardless of theme. Visually this makes the `Switch` and `ToggleGroup` off-state tracks a subtle recessed well in dark mode; light is unchanged.
- 93842c3: **Breaking:** color tokens are renamed to the `--ds-color-{category}-{role}-{variant}-{state}` grammar — category is `bg` / `fg` / `border`, state is `hover` / `pressed`, and the neutral role is elided when a variant is present (`--ds-color-fg-muted`, `--ds-color-border-strong`). Old names like `--ds-color-accent`, `--ds-color-accent-fg`, and `--ds-color-success` become `--ds-color-bg-accent`, `--ds-color-fg-on-accent`, and `--ds-color-bg-success`. Hosts overriding or referencing `--ds-color-*` tokens must migrate to the new names. Interaction states now derive from the `--ds-state-tint` / `--ds-state-mix` knobs, so a single override retunes hover/pressed across both themes.
- 62a715f: The token system is now declared as a TypeScript tree (`packages/ui/src/tokens/`) and `tokens.css` is generated from it at build time — the emitted CSS keeps the same runtime-derivable `var()` / `color-mix()` / `oklch(from …)` expressions, so host knob overrides keep working unchanged. A new `@onersoft/ui/tokens` subpath exposes the structured token metadata (`tokenSet`, `tokenCatalog`, `derivationTrees`) that the docs and the MCP manifest now consume instead of hand-duplicated values and CSS text parsing.
