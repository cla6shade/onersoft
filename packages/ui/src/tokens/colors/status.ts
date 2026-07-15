/* Status bases — the one per-theme exception: independent hues, tuned per
 * theme for fill contrast. Placed first under `bg`; the fg/border families
 * re-place the same pairs, which emits aliases to the bg tokens. */

import { oklch, themed } from '../expressions';
import { brandHue } from '../knobs';

export const danger = themed(oklch(0.61, 0.19, 20), oklch(0.55, 0.2, 20));
export const success = themed(oklch(0.66, 0.14, 150), oklch(0.58, 0.14, 150));
export const warning = themed(oklch(0.78, 0.15, 75), oklch(0.72, 0.15, 70));
export const info = themed(oklch(0.7, 0.1, brandHue), oklch(0.55, 0.12, brandHue));
