# @onersoft/ui-mcp

## 0.0.2

### Patch Changes

- 62a715f: The token system is now declared as a TypeScript tree (`packages/ui/src/tokens/`) and `tokens.css` is generated from it at build time — the emitted CSS keeps the same runtime-derivable `var()` / `color-mix()` / `oklch(from …)` expressions, so host knob overrides keep working unchanged. A new `@onersoft/ui/tokens` subpath exposes the structured token metadata (`tokenSet`, `tokenCatalog`, `derivationTrees`) that the docs and the MCP manifest now consume instead of hand-duplicated values and CSS text parsing.
