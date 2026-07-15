import type { Knob } from './knob';
import { ColorNode } from './nodes';
import { shortNameOf } from './registry';
import type { ColorExpr, PerTheme, Ref, Theme } from './types';

/** A per-theme raw color (`--color-surface-base`) — the retheme surface. */
export class RawColor extends ColorNode implements Ref {
  readonly cssName: string;

  readonly shortName: string;

  readonly values: PerTheme<ColorExpr>;

  constructor(cssName: string, values: PerTheme<ColorExpr>, note?: string) {
    super();
    this.cssName = cssName;
    this.shortName = shortNameOf(cssName);
    this.values = values;
    this.docNote = note;
  }

  protected render(): string {
    return `var(${this.cssName})`;
  }

  formula(theme: Theme): string {
    return this.values[theme].formula(theme);
  }

  knobs(): Knob[] {
    return [];
  }
}

export function rawColor(cssName: string, values: PerTheme<ColorExpr>, note?: string): RawColor {
  return new RawColor(cssName, values, note);
}
