/* Color expression nodes. Derivations chain off the parent color
 * (`surface.tint(…)`, `accent.alpha(…)`), so each level of the palette is
 * declared from the previous one. Every node renders two ways:
 *   css()          — the runtime CSS expression (var()/color-mix()/oklch(from …)
 *                    chains preserved so hosts can override knobs at runtime)
 *   formula(theme) — a compact human-readable string with knob values
 *                    substituted, used by the docs token reference. */

/* eslint-disable max-classes-per-file -- one small node type per expression
 * kind; splitting them across files would only hurt readability. */
/* eslint-disable @typescript-eslint/no-use-before-define -- the node classes
 * are mutually recursive: ColorNode's chaining methods construct Mix/Alpha/…,
 * which in turn extend ColorNode. */

import { type Amount, amountCss, amountKnobs, amountValue, Knob } from './knob';
import { assignedName, nameOf, shortNameOf } from './registry';
import type { ColorExpr, Theme } from './types';

/** Channel deltas for `adjust()`. Numbers carry their sign; knobs add. */
export interface ChannelDeltas {
  l?: number | Knob;
  c?: number | Knob;
  h?: number | Knob;
}

export type Channel = number | Knob;

/** Docs display for a node: its short token name if it has one, else its
 * formula. Only color nodes count — a knob passed as a color (state-tint)
 * shows its per-theme value instead. */
export function displayOf(e: ColorExpr, theme: Theme): string {
  const name = e instanceof ColorNode ? nameOf(e) : null;
  return name ? shortNameOf(name) : e.formula(theme);
}

export abstract class ColorNode implements ColorExpr {
  /** Docs note attached with `.note()`, picked up by `defineColors()`. */
  docNote?: string;

  /** The raw expression, ignoring any token name this node was given. */
  protected abstract render(): string;

  abstract formula(theme: Theme): string;

  abstract knobs(): Knob[];

  /** `var(--token-name)` once the node is named in `defineColors()`; the
   * inline expression otherwise. */
  css(): string {
    const name = assignedName(this);
    return name ? `var(${name})` : this.render();
  }

  /** The declaration value emitted for this node's own token. */
  definitionCss(): string {
    return this.render();
  }

  /** Blend `amount` of `color` into this color (hover/pressed states…). */
  tint(color: ColorExpr, amount: Amount): Mix {
    return new Mix(color, amount, this);
  }

  /** Mix toward black by `amount` (this color kept at 100 − amount). */
  darken(amount: `${number}%`): Mix {
    return new Mix(this, `${100 - parseFloat(amount)}%`, black);
  }

  /** This color itself, kept at `amount` opacity. */
  alpha(amount: Amount): Alpha {
    return new Alpha(this, amount);
  }

  /** Shift oklch channels relative to this color. */
  adjust(deltas: ChannelDeltas): Adjust {
    return new Adjust(this, deltas);
  }

  /** A distinct node with the same value — use when one color needs to be
   * published under a second token name (`surfaceBase.ref()` → bg-surface). */
  ref(): AliasOf {
    return new AliasOf(this);
  }

  /** Attach a docs note (shown under the token in the reference table). */
  note(text: string): this {
    this.docNote = text;
    return this;
  }
}

/** A plain CSS color keyword (`black`, `transparent`). */
export class CssColor extends ColorNode {
  readonly keyword: string;

  constructor(keyword: string) {
    super();
    this.keyword = keyword;
  }

  protected render(): string {
    return this.keyword;
  }

  formula(): string {
    return this.keyword;
  }

  knobs(): Knob[] {
    return [];
  }
}

export const black = new CssColor('black');

/** Literal `oklch(L C H)` — channels may be knobs. */
export class Oklch extends ColorNode {
  readonly l: Channel;

  readonly c: Channel;

  readonly h: Channel;

  constructor(l: Channel, c: Channel, h: Channel) {
    super();
    this.l = l;
    this.c = c;
    this.h = h;
  }

  private ch(v: Channel, mode: 'css' | Theme): string {
    if (typeof v === 'number') return String(v);
    return mode === 'css' ? v.css() : v.formula(mode);
  }

  protected render(): string {
    return `oklch(${this.ch(this.l, 'css')} ${this.ch(this.c, 'css')} ${this.ch(this.h, 'css')})`;
  }

  formula(theme: Theme): string {
    return `oklch(${this.ch(this.l, theme)} ${this.ch(this.c, theme)} ${this.ch(this.h, theme)})`;
  }

  knobs(): Knob[] {
    return [this.l, this.c, this.h].filter((v): v is Knob => v instanceof Knob);
  }
}

export function oklch(l: Channel, c: Channel, h: Channel): Oklch {
  return new Oklch(l, c, h);
}

/** `color-mix(in oklab, color amount, base)`. */
export class Mix extends ColorNode {
  readonly color: ColorExpr;

  readonly amount: Amount;

  readonly base: ColorExpr;

  constructor(color: ColorExpr, amount: Amount, base: ColorExpr) {
    super();
    this.color = color;
    this.amount = amount;
    this.base = base;
  }

  protected render(): string {
    return `color-mix(in oklab, ${this.color.css()} ${amountCss(this.amount)}, ${this.base.css()})`;
  }

  formula(theme: Theme): string {
    return `mix(${displayOf(this.color, theme)} ${amountValue(this.amount, theme)}, ${displayOf(this.base, theme)})`;
  }

  knobs(): Knob[] {
    return [...this.color.knobs(), ...amountKnobs(this.amount), ...this.base.knobs()] as Knob[];
  }
}

/** The color itself kept at `amount` opacity — `color-mix(…, transparent)`. */
export class Alpha extends ColorNode {
  readonly color: ColorExpr;

  readonly amount: Amount;

  constructor(color: ColorExpr, amount: Amount) {
    super();
    this.color = color;
    this.amount = amount;
  }

  protected render(): string {
    return `color-mix(in oklab, ${this.color.css()} ${amountCss(this.amount)}, transparent)`;
  }

  formula(theme: Theme): string {
    return `mix(${displayOf(this.color, theme)} ${amountValue(this.amount, theme)}, transparent)`;
  }

  knobs(): Knob[] {
    return [...this.color.knobs(), ...amountKnobs(this.amount)] as Knob[];
  }
}

/** Relative-color shift: `oklch(from base calc(l ± X) calc(c ± Y) h)`.
 * Wrapping a Mix restores the chroma a plain mix would lose. */
export class Adjust extends ColorNode {
  readonly base: ColorExpr;

  readonly deltas: ChannelDeltas;

  constructor(base: ColorExpr, deltas: ChannelDeltas) {
    super();
    this.base = base;
    this.deltas = deltas;
  }

  private channel(name: 'l' | 'c' | 'h', mode: 'css' | Theme): string {
    const d = this.deltas[name];
    if (d === undefined) return name;
    if (d instanceof Knob) {
      const v = mode === 'css' ? d.css() : d.formula(mode);
      return mode === 'css' ? `calc(${name} + ${v})` : `${name}+${v}`;
    }
    const sign = d < 0 ? '-' : '+';
    const abs = Math.abs(d);
    return mode === 'css'
      ? `calc(${name} ${sign} ${abs})`
      : `${name}${sign === '+' ? '+' : '−'}${abs}`;
  }

  protected render(): string {
    return `oklch(from ${this.base.css()} ${this.channel('l', 'css')} ${this.channel('c', 'css')} ${this.channel('h', 'css')})`;
  }

  formula(theme: Theme): string {
    return `oklch(from ${displayOf(this.base, theme)} ${this.channel('l', theme)} ${this.channel('c', theme)} ${this.channel('h', theme)})`;
  }

  knobs(): Knob[] {
    const own = [this.deltas.l, this.deltas.c, this.deltas.h].filter(
      (v): v is Knob => v instanceof Knob,
    );
    return [...this.base.knobs(), ...own] as Knob[];
  }
}

/** A second name for an existing color (`.ref()`): the token declares
 * `var(--target)`, and everything derived from it uses the new name. */
export class AliasOf extends ColorNode {
  readonly target: ColorExpr;

  constructor(target: ColorExpr) {
    super();
    this.target = target;
  }

  protected render(): string {
    return this.target.css();
  }

  formula(): string {
    const name = nameOf(this.target);
    return name ? `var(${name})` : this.target.css();
  }

  knobs(): Knob[] {
    return this.target.knobs() as Knob[];
  }
}

/** Bare `var(--name)` reference — used for aliases of per-theme pairs. */
export class NamedVar extends ColorNode {
  readonly cssName: string;

  constructor(cssName: string) {
    super();
    this.cssName = cssName;
  }

  protected render(): string {
    return `var(${this.cssName})`;
  }

  formula(): string {
    return `var(${this.cssName})`;
  }

  knobs(): Knob[] {
    return [];
  }
}
