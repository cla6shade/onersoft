/** Shape of the static manifest baked into the package at build time. */
export interface Manifest {
  /** Version of @onersoft/ui the manifest was generated from. */
  uiVersion: string;
  /** Shared primitive types (ControlSize, CompactSize…) referenced by props. */
  sharedTypes: TypeDecl[];
  components: ComponentEntry[];
  tokens: TokenSet;
  /** Human-readable summary of the design system's invariants. */
  conventions: string;
}

export interface ComponentEntry {
  /** Directory / export name, e.g. "Button". */
  name: string;
  /** Storybook title, e.g. "Primitives/Button". */
  title?: string;
  /** Prose description pulled from the stories docs block. */
  description?: string;
  /** Exported prop interfaces and variant type aliases, as source text. */
  props: TypeDecl[];
  /** Stable `data-slot` values rendered by the component. */
  slots: string[];
  /** Usage examples derived from the component's stories. */
  examples: Example[];
}

export interface TypeDecl {
  name: string;
  /** "interface" | "type". */
  kind: string;
  /** Full source text of the declaration. */
  text: string;
}

export interface Example {
  /** Story export name, e.g. "Secondary". */
  name: string;
  /** Args object as source text, if the story is args-based. */
  args?: string;
  /** Render function body as source text, if the story uses render(). */
  render?: string;
}

export interface TokenSet {
  /** Default (dark) theme tokens from :root. */
  dark: Token[];
  /** Overrides applied under :root[data-theme='light']. */
  light: Token[];
}

export interface Token {
  name: string;
  value: string;
  /** Coarse group inferred from the section comment (color/space/text…). */
  group: string;
}
