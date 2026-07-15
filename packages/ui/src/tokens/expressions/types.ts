export type Theme = 'dark' | 'light';

export interface PerTheme<T> {
  dark: T;
  light: T;
}

export interface ColorExpr {
  /** Runtime CSS expression. */
  css(): string;
  /** Compact human-readable formula with knob values substituted. */
  formula(theme: Theme): string;
  /** Knobs this expression (transitively) depends on. */
  knobs(): KnobLike[];
}

/** Minimal knob surface referenced from color expressions. */
export interface KnobLike {
  readonly cssName: string;
  value(theme: Theme): string;
}

/** Something with an inherent `--*` name — a raw color or a token. */
export interface Ref extends ColorExpr {
  readonly cssName: string;
  /** Short name for docs formulas (`bg-surface`, `surface-base`). */
  readonly shortName: string;
}

export function isRef(e: ColorExpr): e is Ref {
  return 'shortName' in e;
}
