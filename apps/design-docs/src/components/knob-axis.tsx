'use client';

import type { CSSProperties, ReactNode } from 'react';
import { Slider } from '@onersoft/design-system';

interface KnobAxisProps {
  id: string;
  label: string;
  display: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
  /** Tailwind classes for the label / value text. Used to vary scale between corner and inline knobs. */
  labelClassName?: string;
  valueClassName?: string;
  labelStyle?: CSSProperties;
  valueStyle?: CSSProperties;
  gap?: 'tight' | 'roomy';
}

const GAP_CLASS: Record<NonNullable<KnobAxisProps['gap']>, string> = {
  tight: 'mb-1.5',
  roomy: 'mb-3',
};

export function KnobAxis({
  id,
  label,
  display,
  value,
  min,
  max,
  step,
  onChange,
  labelClassName = 'text-[11px] uppercase tracking-[0.1em]',
  valueClassName = 'text-[11px] tabular-nums',
  labelStyle = { color: 'var(--ds-color-fg-muted)' },
  valueStyle = {
    fontFamily: 'var(--ds-font-mono)',
    color: 'var(--ds-color-fg-default)',
  },
  gap = 'tight',
}: KnobAxisProps) {
  return (
    <div>
      <div className={`flex items-baseline justify-between ${GAP_CLASS[gap]}`}>
        <label htmlFor={id} className={labelClassName} style={labelStyle}>
          {label}
        </label>
        <span className={valueClassName} style={valueStyle}>
          {display}
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        aria-label={`Brand ${label.toLowerCase()}`}
      />
    </div>
  );
}
