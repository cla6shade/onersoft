import { oklch, rawColor } from './expressions';
import { brandChroma, brandHue } from './knobs';

/* === Raw color tokens (override here to retheme) === */

export const brandPrimary = rawColor(
  '--color-brand-primary',
  {
    dark: oklch(0.72, brandChroma, brandHue),
    light: oklch(0.5, brandChroma, brandHue),
  },
  'drives every accent token',
);

export const surfaceBase = rawColor(
  '--color-surface-base',
  {
    dark: oklch(0.19, 0.015, brandHue),
    light: oklch(0.97, 0.006, brandHue),
  },
  'drives every surface level',
);

export const textBase = rawColor(
  '--color-text-base',
  {
    dark: oklch(0.97, 0.006, brandHue),
    light: oklch(0.17, 0.015, brandHue),
  },
  'drives fg-default and neutral borders',
);

export const accentFg = rawColor(
  '--color-accent-fg',
  {
    dark: oklch(0.17, 0.015, brandHue),
    light: oklch(0.98, 0.004, brandHue),
  },
  'ink on accent fills (fg-on-accent)',
);

export const rawColors = [brandPrimary, surfaceBase, textBase, accentFg];
