import type { CSSProperties } from 'react';
import {
  derivationTrees,
  tokenCatalog,
  type TokenFamilyName,
  type TreeNode,
} from '@onersoft/ui/tokens';

/* Live color-token reference for /docs/tokens. Each row renders the actual
 * token through `var()`, so swatches always show the current theme's value
 * and follow the site theme toggle. The catalog, formulas, and derivation
 * trees come straight from the token source (@onersoft/ui src/tokens/), so
 * this page can never drift from the generated tokens.css. */

type Family = TokenFamilyName;

const FAMILIES = tokenCatalog();

const mono: CSSProperties = { fontFamily: 'var(--ds-font-mono)' };

function Swatch({ family, name }: { family: Family; name: string }) {
  const base: CSSProperties = {
    width: '3.5rem',
    height: '2rem',
    borderRadius: 'var(--ds-radius-sm)',
    flex: 'none',
  };
  /* Faint outline so near-surface fills stay visible against the row. */
  const ring = 'inset 0 0 0 1px color-mix(in oklab, var(--ds-color-fg-default) 12%, transparent)';

  if (family === 'fg') {
    const onAccent = name === '--ds-color-fg-on-accent';
    return (
      <span
        aria-hidden
        style={{
          ...base,
          ...mono,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem',
          fontWeight: 600,
          background: onAccent ? 'var(--ds-color-bg-accent)' : 'var(--ds-color-bg-surface)',
          color: `var(${name})`,
          boxShadow: ring,
        }}
      >
        Ag
      </span>
    );
  }
  if (family === 'border') {
    return (
      <span
        aria-hidden
        style={{
          ...base,
          background: 'var(--ds-color-bg-surface)',
          border: `2px solid var(${name})`,
        }}
      />
    );
  }
  return <span aria-hidden style={{ ...base, background: `var(${name})`, boxShadow: ring }} />;
}

/* --- Derivation tree ------------------------------------------------- */

const TREES = derivationTrees();

function TreeSwatch({ token }: { token: string }) {
  const color = token.startsWith('--') ? `var(${token})` : token;
  return (
    <span
      aria-hidden
      className="inline-block h-5 w-8 shrink-0 rounded-[var(--ds-radius-xs)]"
      style={{
        background: color,
        boxShadow:
          'inset 0 0 0 1px color-mix(in oklab, var(--ds-color-fg-default) 14%, transparent)',
      }}
    />
  );
}

function TreeRow({ node, isRoot = false }: { node: TreeNode; isRoot?: boolean }) {
  return (
    <div>
      <div className={`flex items-center gap-2.5 ${isRoot ? 'pt-1' : 'pt-2.5'}`}>
        {!isRoot && <span aria-hidden className="h-px w-4 shrink-0 bg-fd-border" />}
        <TreeSwatch token={node.token} />
        <code className={isRoot ? 'text-[0.82rem] font-semibold' : 'text-[0.78rem]'} style={mono}>
          {node.token}
        </code>
        {node.edge ? (
          <span className="whitespace-nowrap text-[11px] text-fd-muted-foreground" style={mono}>
            {node.edge}
          </span>
        ) : null}
      </div>
      {node.children?.length ? (
        <div className={isRoot ? 'ml-4' : 'ml-[3.35rem]'}>
          <div className="border-l border-fd-border">
            {node.children.map((c) => (
              <TreeRow key={c.token} node={c} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function TokenTree() {
  return (
    <div className="my-6 space-y-5">
      {TREES.map((g) => (
        <div
          key={g.title}
          className="overflow-x-auto rounded-[var(--ds-radius-lg)] border border-fd-border px-5 pb-4 pt-3"
        >
          <div
            className="mb-1 text-[11px] uppercase tracking-[0.08em] text-fd-muted-foreground"
            style={mono}
          >
            {g.title}
          </div>
          <div className="min-w-[28rem]">
            {g.roots.map((r) => (
              <TreeRow key={r.token} node={r} isRoot />
            ))}
          </div>
        </div>
      ))}
      <div className="rounded-[var(--ds-radius-lg)] border border-fd-border px-5 py-4">
        <div
          className="mb-3 text-[11px] uppercase tracking-[0.08em] text-fd-muted-foreground"
          style={mono}
        >
          How to read the edges
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[12px]">
          <dt>
            <code style={mono}>+ X n%</code>
          </dt>
          <dd className="text-fd-muted-foreground">
            color-mix: blend n% of X into the parent color
          </dd>
          <dt>
            <code style={mono}>α n%</code>
          </dt>
          <dd className="text-fd-muted-foreground">
            the parent color itself, kept at n% opacity (translucent)
          </dd>
          <dt>
            <code style={mono}>L / C ± n</code>
          </dt>
          <dd className="text-fd-muted-foreground">
            shift the oklch lightness / chroma channel of the parent by n
          </dd>
          <dt>
            <code style={mono}>(knob: --ds-*)</code>
          </dt>
          <dd className="text-fd-muted-foreground">
            the number comes from a per-theme derivation knob — override the knob and both themes
            recompute; the edge shows the substituted dark · light values
          </dd>
        </dl>
      </div>
    </div>
  );
}

export function TokenFamily({ family }: { family: Family }) {
  const tokens = FAMILIES[family];
  return (
    <div className="my-6 overflow-x-auto rounded-[var(--ds-radius-lg)] border border-fd-border">
      <div className="min-w-[40rem]">
        <div
          className="grid grid-cols-[4.5rem_minmax(15rem,1.2fr)_1fr_1fr] gap-x-4 border-b border-fd-border px-4 py-2 text-[11px] uppercase tracking-[0.08em] text-fd-muted-foreground"
          style={mono}
        >
          <span />
          <span>Token</span>
          <span>Dark (default)</span>
          <span>Light</span>
        </div>
        {tokens.map((t) => (
          <div
            key={t.name}
            className="grid grid-cols-[4.5rem_minmax(15rem,1.2fr)_1fr_1fr] items-center gap-x-4 border-b border-fd-border px-4 py-2.5 last:border-b-0"
          >
            <Swatch family={family} name={t.name} />
            <div className="min-w-0">
              <code className="text-[0.8rem]" style={mono}>
                {t.name}
              </code>
              {t.note ? (
                <div className="mt-0.5 text-[11px] text-fd-muted-foreground">{t.note}</div>
              ) : null}
            </div>
            <code className="text-[11px] text-fd-muted-foreground" style={mono}>
              {t.dark}
            </code>
            <code className="text-[11px] text-fd-muted-foreground" style={mono}>
              {t.light}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
