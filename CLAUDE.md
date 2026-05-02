# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo shape

pnpm + turbo monorepo. Two apps consume one design system:

- `apps/landing` — Next.js 16 marketing site
- `apps/design-docs` — Next.js 16 + fumadocs design-system documentation site
- `packages/design-system` (`@onersoft/design-system`) — Radix-based React 19 component library, OKLCH token system, the single source of truth for all UI
- `packages/eslint-config`, `packages/typescript-config` — shared base configs

Workspace catalog (`pnpm-workspace.yaml`) pins shared versions; reference with `"typescript": "catalog:"`. Library packages under `packages/*` declare runtime libs (React, Radix) as **peer dependencies** so the host app provides single instances. Apps reference workspace packages with `"workspace:*"`.

Requires Node ≥ 20.18, pnpm 10.33+ (pinned via `packageManager`). Targets modern browsers only — `oklch()`, `color-mix()`, cascade layers (Chrome/Edge 111+, Safari 16.2+, Firefox 113+).

## Commands

Run from repo root unless noted; turbo handles the task graph (`^build` deps before `dev`/`test`/`lint`/`type-check`):

```bash
pnpm install
pnpm dev            # all apps in parallel
pnpm build
pnpm test           # all vitest suites
pnpm type-check
pnpm lint
pnpm format         # prettier --write **/*.{ts,tsx,css}
pnpm format:check
```

Scope to one package:

```bash
pnpm --filter @onersoft/design-system dev          # vite build --watch
pnpm --filter @onersoft/design-system storybook    # port 6006
pnpm --filter @onersoft/landing dev
pnpm --filter @onersoft/design-docs dev
```

### Tests

Root `vitest.config.ts` aggregates `packages/*` and `apps/*` projects. The design-system runs **three vitest projects** (`packages/design-system/vitest.config.ts`):

- **`unit`** — jsdom + Testing Library. Files: `*.test.{ts,tsx}` (excludes `*.a11y.test.*` and `*.e2e.test.*`).
- **`a11y`** — `@vitest/browser` + Playwright on chromium/firefox/webkit, axe-core, zero violations. Files: `*.a11y.test.{ts,tsx}`.
- **`e2e`** — `@vitest/browser` + Playwright (chromium only) for visual regression. Files: `*.e2e.test.{ts,tsx}`. Uses `runComponentMatrix` from `src/test/e2eMatrix.tsx` to render variant matrices and snapshots into `__screenshots__/`.

Run a single project / file:

```bash
pnpm --filter @onersoft/design-system test --project unit
pnpm --filter @onersoft/design-system test --project e2e
pnpm --filter @onersoft/design-system test src/components/Button/Button.test.tsx
pnpm --filter @onersoft/design-system test -t "renders primary"   # filter by test name
```

Update e2e screenshots with vitest's `--update` flag (or whatever matches the matrix helper's snapshot setup — check `e2eMatrix.tsx` before assuming).

## Design-system architecture

Read `packages/design-system/README.md` for the full contract. Critical invariants:

- **Token-first.** Hosts customize by overriding `--ds-*` tokens (and raw color tokens) — never by reaching into component class names. Token source: [packages/design-system/src/styles/tokens.css](packages/design-system/src/styles/tokens.css).
- **Cascade layer `@layer onersoft.ds`.** All DS CSS lives inside this layer so host unlayered CSS wins without specificity wars. Don't move styles out of the layer.
- **`data-slot` attributes are the stable styling API.** CSS Module class names are hashed; consumers (and tests) target `data-slot="..."` to bypass the hash. Treat slot names as a public contract.
- **Theme switching via `<html data-theme="light|dark">`.** The DS does **not** export a ThemeProvider — the host wires one (e.g. `next-themes` with `attribute="data-theme"`). Tokens branch on this attribute.
- **Per-component entry points.** Importing the barrel (`@onersoft/design-system`) auto-injects `tokens.css` via `sideEffects: ["**/*.css"]`. Importing only a subpath (`@onersoft/design-system/Button`) does **not** — those callers must `import '@onersoft/design-system/tokens.css'` themselves.
- **Peer-dep Radix packages are optional.** Adding a component that uses a new Radix primitive means: add to `peerDependencies` *and* `peerDependenciesMeta` (mark optional), and add to the design-system's own `devDependencies` if needed for build/test.

### Adding a component

Follow the existing 5+1 file layout (see `src/components/Button/`):

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.stories.tsx
  ComponentName.test.tsx        # unit
  ComponentName.a11y.test.tsx   # axe, all 3 browsers
  ComponentName.e2e.test.tsx    # visual matrix (chromium)
  index.ts                      # re-exports
```

Then export from `src/index.ts`. Use `runComponentMatrix` (`src/test/e2eMatrix.tsx`) for visual coverage of variants/states.

## Design tone (`.impeccable.md`)

Refined · Calm · Precise. Brand hue is a desaturated blue-grey (`oklch(0.69 0.05 230)`), neutrals tinted toward it. Accents only in the 10% slot of 60-30-10. Easing is monotonic ease-out. **Forbidden:** gradient text/backgrounds, accent stripes (≥2px border-left/right), glassmorphism blur, neon glow, pure `#000`/`#fff`, bounce/elastic easing. Honor these when generating any new UI or stories.

## Conventions worth knowing

- `pnpm` only — `.npmrc` and `packageManager` enforce it.
- Prettier governs formatting (`.prettierrc.json`, `.prettierignore`); ESLint flat config from `@onersoft/eslint-config`.
- `tsconfig.json` files extend `@onersoft/typescript-config` bases — don't fork compiler options ad hoc.
