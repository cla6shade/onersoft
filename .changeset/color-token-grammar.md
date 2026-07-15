---
"@onersoft/ui": minor
---

**Breaking:** color tokens are renamed to the `--ds-color-{category}-{role}-{variant}-{state}` grammar — category is `bg` / `fg` / `border`, state is `hover` / `pressed`, and the neutral role is elided when a variant is present (`--ds-color-fg-muted`, `--ds-color-border-strong`). Old names like `--ds-color-accent`, `--ds-color-accent-fg`, and `--ds-color-success` become `--ds-color-bg-accent`, `--ds-color-fg-on-accent`, and `--ds-color-bg-success`. Hosts overriding or referencing `--ds-color-*` tokens must migrate to the new names. Interaction states now derive from the `--ds-state-tint` / `--ds-state-mix` knobs, so a single override retunes hover/pressed across both themes.
