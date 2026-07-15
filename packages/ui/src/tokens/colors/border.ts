/* Border family: neutral borders are transparent slices of fg-default. */

import { brandPrimary } from '../palette';
import { accent } from './bg';
import { fgDefault } from './fg';
import { danger } from './status';

export const border = {
  default: fgDefault.alpha('10%'),
  strong: fgDefault.alpha('18%'),
  accent: {
    DEFAULT: brandPrimary,
    subtle: accent.alpha('60%'),
  },
  danger,
};
