/* Nodes placed in `defineColors()` get their token name recorded here; any
 * later reference to the same node then renders as `var(--that-name)`. */

const tokenNames = new WeakMap<object, string>();

/** The `--*` name a node is addressable by, if it has one: its own name for
 * raw colors / tokens, or the name assigned by `defineColors()`. */
export function nameOf(e: object): string | null {
  if ('cssName' in e && typeof e.cssName === 'string') return e.cssName;
  return tokenNames.get(e) ?? null;
}

/** Called by `defineColors()` when a node is placed for the first time. */
export function assignName(node: object, cssName: string): void {
  tokenNames.set(node, cssName);
}

export function assignedName(node: object): string | undefined {
  return tokenNames.get(node);
}

export function shortNameOf(cssName: string): string {
  return cssName.replace(/^--ds-color-/, '').replace(/^--color-/, '');
}
