/* eslint-disable max-classes-per-file -- Knob and its calc arithmetic are one
 * concept; splitting them would only hurt readability. */

import type { KnobLike, Theme } from './types';

/** `knob ± n%` rendered as `calc(var(--k) ± n%)`. */
export class KnobCalc {
  readonly base: Knob;

  readonly sign: '+' | '-';

  readonly delta: string;

  constructor(base: Knob, sign: '+' | '-', delta: string) {
    this.base = base;
    this.sign = sign;
    this.delta = delta;
  }

  css(): string {
    return `calc(${this.base.css()} ${this.sign} ${this.delta})`;
  }

  value(theme: Theme): string {
    const a = parseFloat(this.base.value(theme));
    const b = parseFloat(this.delta);
    const n = this.sign === '+' ? a + b : a - b;
    return this.delta.endsWith('%') || this.base.value(theme).endsWith('%') ? `${n}%` : String(n);
  }

  formula(theme: Theme): string {
    return this.value(theme);
  }
}

/** A numeric/keyword dial (`--ds-state-mix: 12%`). Light value optional —
 * knobs without one are theme-agnostic. */
export class Knob implements KnobLike {
  readonly cssName: string;

  readonly dark: string;

  readonly light?: string;

  /** Symbolic name used in docs formulas (e.g. `hue`), instead of the value. */
  readonly label?: string;

  constructor(
    cssName: string,
    values: { dark: string | number; light?: string | number; label?: string },
  ) {
    this.cssName = cssName;
    this.dark = String(values.dark);
    this.light = values.light === undefined ? undefined : String(values.light);
    this.label = values.label;
  }

  css(): string {
    return `var(${this.cssName})`;
  }

  value(theme: Theme): string {
    return theme === 'light' && this.light !== undefined ? this.light : this.dark;
  }

  formula(theme: Theme): string {
    return this.label ?? this.value(theme);
  }

  /** Color-valued knobs (`--ds-state-tint`) can sit where a color goes. */
  knobs(): Knob[] {
    return [this];
  }

  /** `knob + delta` → `calc(var(--k) + delta)` */
  plus(delta: string): KnobCalc {
    return new KnobCalc(this, '+', delta);
  }

  /** `knob − delta` → `calc(var(--k) - delta)` */
  minus(delta: string): KnobCalc {
    return new KnobCalc(this, '-', delta);
  }
}

export function knob(
  cssName: string,
  values: { dark: string | number; light?: string | number; label?: string },
): Knob {
  return new Knob(cssName, values);
}

/** A mix strength / opacity: a literal (`'18%'`), a knob, or `knob ± n%`. */
export type Amount = string | Knob | KnobCalc;

export function amountCss(a: Amount): string {
  return typeof a === 'string' ? a : a.css();
}

export function amountValue(a: Amount, theme: Theme): string {
  return typeof a === 'string' ? a : a.value(theme);
}

export function amountKnobs(a: Amount): Knob[] {
  if (a instanceof Knob) return [a];
  if (a instanceof KnobCalc) return [a.base];
  return [];
}
