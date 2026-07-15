/* eslint-disable max-classes-per-file -- ThemedPair and ColorToken are two
 * halves of the same token concept. */

import type { Knob } from './knob';
import { ColorNode } from './nodes';
import { nameOf, shortNameOf } from './registry';
import type { Theme } from './types';

/** Per-theme literal pair — the status-base exception. */
export class ThemedPair {
  readonly dark: ColorNode;

  readonly light: ColorNode;

  docNote?: string;

  constructor(dark: ColorNode, light: ColorNode) {
    this.dark = dark;
    this.light = light;
  }

  note(text: string): this {
    this.docNote = text;
    return this;
  }
}

/** A color that gets an independent literal per theme. */
export function themed(dark: ColorNode, light: ColorNode): ThemedPair {
  return new ThemedPair(dark, light);
}

export interface TokenMeta {
  /** Docs note shown under the token name. */
  note?: string;
}

/** A published `--ds-color-*` token, created by `defineColors()`. Also a
 * color node itself (`var(--name)`), so statics/media can reference it. */
export class ColorToken extends ColorNode {
  readonly cssName: string;

  readonly shortName: string;

  readonly value: ColorNode | ThemedPair;

  readonly meta: TokenMeta;

  constructor(cssName: string, value: ColorNode | ThemedPair, meta: TokenMeta = {}) {
    super();
    this.cssName = cssName;
    this.shortName = shortNameOf(cssName);
    this.value = value;
    this.meta = meta;
  }

  /** The expression behind the `:root` (dark) declaration. */
  get darkExpr(): ColorNode {
    return this.value instanceof ThemedPair ? this.value.dark : this.value;
  }

  /** The light-block override, if this token owns a per-theme literal. */
  get lightExpr(): ColorNode | undefined {
    return this.value instanceof ThemedPair ? this.value.light : undefined;
  }

  /** The declaration value emitted for this token. */
  declaration(theme: Theme): string | undefined {
    if (this.value instanceof ThemedPair) return this.value[theme].css();
    if (theme === 'light') return undefined;
    // A node named after this very token renders inline; anything already
    // named elsewhere (an alias) renders as var(--that-name).
    return nameOf(this.value) === this.cssName ? this.value.definitionCss() : this.value.css();
  }

  protected render(): string {
    return `var(${this.cssName})`;
  }

  formula(theme: Theme): string {
    if (this.value instanceof ThemedPair) return this.value[theme].formula(theme);
    const name = nameOf(this.value);
    if (name && name !== this.cssName) return `var(${name})`;
    return this.value.formula(theme);
  }

  knobs(): Knob[] {
    return [];
  }
}
