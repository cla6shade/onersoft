export const SCALE_KB = 280;
export const ONERSOFT_LIB = 'Onersoft';
export const BASELINE_LIB = 'baseline';

export interface BarDatum {
  lib: string;
  delta: number;
}

export interface Scenario {
  label: string;
  sub: string;
  baseline: number;
  bars: BarDatum[];
}

export const SCENARIOS: Scenario[] = [
  {
    label: 'Button',
    sub: 'A single Button',
    baseline: 161.0,
    bars: [
      { lib: 'shadcn', delta: 42.8 },
      { lib: 'MUI v9', delta: 40.1 },
      { lib: 'Chakra v3', delta: 59.4 },
      { lib: ONERSOFT_LIB, delta: 3.4 },
    ],
  },
  {
    label: '+ Form',
    sub: '+ Input · Label · Checkbox',
    baseline: 161.2,
    bars: [
      { lib: 'shadcn', delta: 42.7 },
      { lib: 'MUI v9', delta: 65.2 },
      { lib: 'Chakra v3', delta: 71.9 },
      { lib: ONERSOFT_LIB, delta: 7.3 },
    ],
  },
  {
    label: '+ Dashboard',
    sub: '+ Avatar · Badge · Card · Tabs · Select · Dialog · Tooltip',
    baseline: 161.3,
    bars: [
      { lib: 'shadcn', delta: 44.7 },
      { lib: 'MUI v9', delta: 87.8 },
      { lib: 'Chakra v3', delta: 110.4 },
      { lib: ONERSOFT_LIB, delta: 40.1 },
    ],
  },
];

export const AXIS_TICKS = [0, 50, 100, 150, 200, 250];
export const AXIS_UNIT = 'kB (gz)';

export interface Swatch {
  name: string;
  token: string;
}

export const SWATCHES: Swatch[] = [
  { name: 'bg-surface', token: '--ds-color-bg-surface' },
  { name: 'bg-elevated', token: '--ds-color-bg-elevated' },
  { name: 'bg-sunken', token: '--ds-color-bg-sunken' },
  { name: 'fg-default', token: '--ds-color-fg-default' },
  { name: 'fg-muted', token: '--ds-color-fg-muted' },
  { name: 'border', token: '--ds-color-border-strong' },
  { name: 'bg-accent', token: '--ds-color-bg-accent' },
  { name: 'bg-accent-soft', token: '--ds-color-bg-accent-soft' },
];
