# @onersoft/ui-mcp

An [MCP](https://modelcontextprotocol.io) server that gives AI agents accurate,
first-hand knowledge of the [`@onersoft/ui`](../ui) design system — component
props, variant unions, `data-slot` values, design tokens, usage examples, and
the system's invariants. It exists so agents stop inventing props, hardcoding
colors instead of tokens, or reaching into hashed class names.

## How it works

The design-system knowledge is **baked into the package at build time**. A
generator (`src/generate/`) parses `@onersoft/ui`'s source — component `.tsx`
(props via `ts-morph`, `data-slot` via regex), `tokens.css`, and `.stories.tsx`
— into a static `manifest.generated.json`. The runtime server only reads that
manifest, so it works via `npx` in any project without needing the UI source on
disk. (This mirrors how `@chakra-ui/react-mcp` ships its knowledge.)

Regenerating happens automatically on `build` and `prepublishOnly`, so a
published version is always a consistent snapshot of the UI version it was cut
from.

## Tools

| Tool | Input | Returns |
| --- | --- | --- |
| `list_components` | – | Every component with its Storybook title + one-line description |
| `get_component_props` | `name` | Exported prop types, variant unions, referenced shared types, and `data-slot` values |
| `get_component_example` | `name` | Usage examples derived from the component's stories |
| `get_theme` | `filter?` | Design tokens (`--ds-*` / `--color-*`) for dark + light, optionally by group |
| `get_conventions` | – | Design-system invariants and forbidden patterns |

## Install (consumers)

```bash
claude mcp add onersoft-ui -- npx -y @onersoft/ui-mcp
```

Or in a project's `.mcp.json`:

```json
{
  "mcpServers": {
    "onersoft-ui": { "command": "npx", "args": ["-y", "@onersoft/ui-mcp"] }
  }
}
```

## Local development

```bash
pnpm --filter @onersoft/ui-mcp generate   # rebuild manifest from ../ui source
pnpm --filter @onersoft/ui-mcp dev         # run the server from source via tsx
pnpm --filter @onersoft/ui-mcp build       # generate + bundle to dist/
```

Inside this monorepo the repo-root `.mcp.json` points at the built
`dist/server.mjs`, so run `build` once and it is available to Claude Code here.
Swap that entry for the `npx` form above once the package is published.
