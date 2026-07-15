/* Foreground family: text-base → default; muted/subtle step down from it. */

import { mutedMix } from '../knobs';
import { accentFg, brandPrimary, surfaceBase, textBase } from '../palette';
import { surface } from './bg';
import { danger, info, success, warning } from './status';

export const fgDefault = textBase.ref();

/* muted sits --ds-muted-mix of the way from surface to text; the adjust()
 * wrapper restores the chroma a plain mix loses. */
const muted = surfaceBase
  .tint(textBase, mutedMix)
  .adjust({ c: 0.008 })
  .note('ratio = --ds-muted-mix (78% under prefers-contrast: more)');

export const fg = {
  default: fgDefault,
  muted,
  subtle: surface.tint(muted, '65%'),
  accent: brandPrimary,
  'on-accent': accentFg.ref().note('previewed on a bg-accent fill'),
  danger,
  success,
  warning,
  info,
};
