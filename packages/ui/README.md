# @onersoft/ui

Tiny Radix wrapper with a human-friendly color space.

A React component library that wraps Radix primitives in vanilla CSS. Lightweight by construction, with retheming in two lines — surface, text, border, and accent all derive from the same OKLCH hue·chroma coordinates, so changing two values reshapes the entire palette in light and dark, in lockstep.

Stage 0.0.1. APIs and component names may change before a stable release.

Full documentation: [cla6shade.github.io/onersoft](https://cla6shade.github.io/onersoft)

---

## Install

```bash
pnpm add @onersoft/ui
```

Radix primitives are bundled as transitive dependencies — your bundler tree-shakes the unused ones automatically. No per-component install step.

Peer dependencies: `react@^19`, `react-dom@^19`. `react-hook-form@^7.74` is optional, only when using `Form`.

---

## Quick start

```tsx
import { Button } from '@onersoft/ui';

export default function App() {
  return <Button variant="primary">Get started</Button>;
}
```

CSS is auto-injected via `sideEffects`. Importing from the barrel also injects token CSS — no separate import needed.

### Retheme in two lines

```css
:root {
  --ds-brand-hue: 232;
  --ds-brand-chroma: 0.06;
}
```

Color tokens follow `--ds-color-{category}-{role}-{variant}-{state}` (category `bg`/`fg`/`border`, state `hover`/`pressed`) — see the [tokens page](https://cla6shade.github.io/onersoft/docs/tokens) for how every value is derived.

### Theme switching

The DS branches on `<html data-theme="light|dark">`. Wire it however you like — [`next-themes`](https://github.com/pacanukeyism/next-themes) with `attribute="data-theme"` works out of the box.

For the full theming model, slot-based styling hooks, token inventory, and component reference, see the [docs site](https://cla6shade.github.io/onersoft).

---

## License

MIT.
