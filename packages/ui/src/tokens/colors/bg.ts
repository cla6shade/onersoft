/* Background family. Nesting = naming: `bg.accent.soft.hover` becomes
 * `--ds-color-bg-accent-soft-hover` (`DEFAULT` names the level itself). */

import { black } from '../expressions';
import { elevateLift, scrimMix, stateMix, stateTint } from '../knobs';
import { brandPrimary, surfaceBase } from '../palette';
import { danger, info, success, warning } from './status';

/* surface-base → surface → elevated; accents chain off brand-primary. */
export const surface = surfaceBase.ref();
export const elevated = surface
  .adjust({ l: elevateLift, c: 0.005 })
  .note('lift = --ds-elevate-lift');
export const accent = brandPrimary.ref();

export const bg = {
  surface: {
    DEFAULT: surface,
    hover: surface
      .tint(stateTint, stateMix)
      .note('tint = --ds-state-tint · strength = --ds-state-mix'),
    pressed: surface.tint(stateTint, stateMix.plus('10%')).note('--ds-state-mix + 10%'),
  },
  elevated: {
    DEFAULT: elevated,
    hover: elevated.tint(stateTint, stateMix),
  },
  overlay: elevated.ref().note('alias — floating elements share the elevated step'),
  subtle: surfaceBase.darken('4%'),
  sunken: surfaceBase.darken('5%'),
  scrim: {
    DEFAULT: black.alpha(scrimMix),
    subtle: black.alpha(scrimMix.minus('20%')),
  },
  accent: {
    DEFAULT: accent,
    hover: accent.tint(stateTint, '12%'),
    pressed: accent.darken('20%'),
    muted: accent.adjust({ l: -0.06, c: -0.01 }),
    soft: {
      DEFAULT: accent.alpha('18%'),
      hover: accent.alpha('28%'),
    },
  },
  danger,
  success,
  warning,
  info,
};
