/* Theme-agnostic tokens plus the two per-theme non-color groups (elevation
 * shadows) and the focus-ring composites. Plain key/value — no derivation. */

import { brandHue } from './knobs';
import { colors } from './colors';

export interface StaticSection {
  title: string;
  decls: [name: string, value: string][];
}

export const staticSections: StaticSection[] = [
  {
    title: 'Typography',
    decls: [
      [
        '--ds-font-sans',
        "'Pretendard Variable', 'Apple SD Gothic Neo', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      ],
      ['--ds-font-mono', "ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace"],
      ['--ds-font-display', 'var(--ds-font-sans)'],
      ['--ds-text-xs', '0.75rem'],
      ['--ds-text-sm', '0.875rem'],
      ['--ds-text-md', '1rem'],
      ['--ds-text-base', 'var(--ds-text-md)'],
      ['--ds-text-lg', '1.125rem'],
      ['--ds-text-xl', '1.375rem'],
      ['--ds-text-2xl', '1.75rem'],
      ['--ds-text-3xl', '2.25rem'],
      ['--ds-leading-tight', '1.2'],
      ['--ds-leading-snug', '1.35'],
      ['--ds-leading-normal', '1.55'],
      ['--ds-leading-relaxed', '1.7'],
      ['--ds-leading-control', '1'],
      ['--ds-weight-regular', '400'],
      ['--ds-weight-medium', '500'],
      ['--ds-weight-semibold', '600'],
      ['--ds-weight-bold', '700'],
      ['--ds-tracking-tight', '-0.015em'],
      ['--ds-tracking-normal', '0'],
      ['--ds-tracking-wide', '0.04em'],
    ],
  },
  {
    title: 'Spacing — 4pt scale',
    decls: [
      ['--ds-space-0', '0'],
      ['--ds-space-px', '0.125rem'],
      ['--ds-space-1', '0.25rem'],
      ['--ds-space-2', '0.5rem'],
      ['--ds-space-3', '0.75rem'],
      ['--ds-space-4', '1rem'],
      ['--ds-space-5', '1.25rem'],
      ['--ds-space-6', '1.5rem'],
      ['--ds-space-7', '2rem'],
      ['--ds-space-8', '3rem'],
      ['--ds-space-9', '4rem'],
      ['--ds-space-10', '6rem'],
    ],
  },
  {
    title: 'Radii',
    decls: [
      ['--ds-radius-xs', '0.25rem'],
      ['--ds-radius-sm', '0.375rem'],
      ['--ds-radius-md', '0.5rem'],
      ['--ds-radius-lg', '0.75rem'],
      ['--ds-radius-xl', '1rem'],
      ['--ds-radius-full', '9999px'],
    ],
  },
  {
    title: 'Borders',
    decls: [
      ['--ds-border-width-thin', '1px'],
      ['--ds-border-width-medium', '1.5px'],
      ['--ds-border-width-thick', '2px'],
    ],
  },
  {
    title: 'Containers',
    decls: [
      ['--ds-container-prose', '65ch'],
      ['--ds-container-narrow', '40rem'],
      ['--ds-container-default', '64rem'],
      ['--ds-container-wide', '80rem'],
    ],
  },
  {
    title: 'Focus ring',
    decls: [
      ['--ds-ring-width', '2px'],
      ['--ds-ring-offset', '2px'],
    ],
  },
  {
    title: 'Motion',
    decls: [
      ['--ds-duration-instant', '80ms'],
      ['--ds-duration-fast', '120ms'],
      ['--ds-duration-medium', '180ms'],
      ['--ds-duration-slow', '260ms'],
      ['--ds-ease-standard', 'cubic-bezier(0.2, 0, 0, 1)'],
      ['--ds-ease-exit', 'cubic-bezier(0.4, 0, 1, 1)'],
      ['--ds-ease-enter', 'cubic-bezier(0, 0, 0.2, 1)'],
    ],
  },
  {
    title: 'Z-index',
    decls: [
      ['--ds-z-base', '0'],
      ['--ds-z-dropdown', '1000'],
      ['--ds-z-sticky', '1100'],
      ['--ds-z-overlay', '1200'],
      ['--ds-z-modal', '1300'],
      ['--ds-z-popover', '1400'],
      ['--ds-z-tooltip', '1500'],
    ],
  },
  {
    title: 'Control sizing',
    decls: [
      ['--ds-control-height-sm', '2rem'],
      ['--ds-control-height-md', '2.5rem'],
      ['--ds-control-height-lg', '3rem'],
    ],
  },
];

/* Ring / focus composites — declared after the color tier they reference. */
export const focusDecls: [string, string][] = [
  ['--ds-ring-color', colors.border.accent.DEFAULT.css()],
  ['--ds-ring-offset-color', colors.bg.surface.DEFAULT.css()],
  ['--ds-shadow-focus-field', `0 0 0 3px ${colors.bg.accent.soft.DEFAULT.css()}`],
  ['--ds-shadow-focus-field-invalid', `0 0 0 3px ${colors.bg.danger.alpha('22%').css()}`],
  [
    '--ds-shadow-focus',
    '0 0 0 var(--ds-ring-offset) var(--ds-ring-offset-color), 0 0 0 calc(var(--ds-ring-offset) + var(--ds-ring-width)) var(--ds-ring-color)',
  ],
];

/* Elevation shadows — per-theme. */
export const shadowDecls: { name: string; dark: string; light: string }[] = [
  {
    name: '--ds-shadow-xs',
    dark: '0 1px 2px oklch(0 0 0 / 0.25)',
    light: `0 1px 2px oklch(0.17 0.015 var(${brandHue.cssName}) / 0.06)`,
  },
  {
    name: '--ds-shadow-sm',
    dark: '0 2px 6px oklch(0 0 0 / 0.3)',
    light: `0 2px 6px oklch(0.17 0.015 var(${brandHue.cssName}) / 0.08)`,
  },
  {
    name: '--ds-shadow-md',
    dark: '0 8px 18px oklch(0 0 0 / 0.35)',
    light: `0 8px 18px oklch(0.17 0.015 var(${brandHue.cssName}) / 0.1)`,
  },
  {
    name: '--ds-shadow-lg',
    dark: '0 20px 40px oklch(0 0 0 / 0.45)',
    light: `0 20px 40px oklch(0.17 0.015 var(${brandHue.cssName}) / 0.14)`,
  },
];
