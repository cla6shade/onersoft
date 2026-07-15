/* Media-query overrides applied on top of the token tiers. */

import { colors } from './colors';

export interface MediaOverride {
  query: string;
  decls: [name: string, value: string][];
}

export const mediaOverrides: MediaOverride[] = [
  {
    query: '(prefers-reduced-motion: reduce)',
    decls: [
      ['--ds-duration-instant', '0ms'],
      ['--ds-duration-fast', '0ms'],
      ['--ds-duration-medium', '0ms'],
      ['--ds-duration-slow', '0ms'],
    ],
  },
  {
    query: '(prefers-contrast: more)',
    decls: [
      ['--ds-color-border-default', colors.fg.default.alpha('24%').css()],
      ['--ds-color-border-strong', colors.fg.default.alpha('40%').css()],
      ['--ds-muted-mix', '78%'],
    ],
  },
];
