'use client';

import { useId, useSyncExternalStore } from 'react';
import { Slider } from '@onersoft/design-system';
import {
  BRAND_DEFAULTS,
  CHROMA_MAX,
  HUE_MAX,
  SSR_BRAND_SNAPSHOT,
  getBrandState,
  resetBrand,
  setBrand,
  subscribeBrand,
} from '../brand-store';

export function InlineKnob() {
  const { hue, chroma } = useSyncExternalStore(
    subscribeBrand,
    getBrandState,
    () => SSR_BRAND_SNAPSHOT,
  );
  const hueId = useId();
  const chromaId = useId();

  const isDefault =
    hue === BRAND_DEFAULTS.hue && chroma === BRAND_DEFAULTS.chroma;

  return (
    <div
      className="rounded-[var(--ds-radius-lg)] border p-5 sm:p-6"
      style={{
        borderColor: 'var(--ds-color-border-default)',
        background: 'var(--ds-color-bg-subtle)',
      }}
    >
      <div className="grid gap-6">
        <KnobAxis
          id={hueId}
          label="Hue"
          value={hue}
          display={`${hue}°`}
          min={0}
          max={HUE_MAX}
          step={1}
          onChange={(v) => setBrand({ hue: v })}
        />
        <KnobAxis
          id={chromaId}
          label="Chroma"
          value={chroma}
          display={chroma.toFixed(3)}
          min={0}
          max={CHROMA_MAX}
          step={0.005}
          onChange={(v) => setBrand({ chroma: v })}
        />
      </div>
      <div
        className="mt-7 pt-5 border-t flex items-center justify-between flex-wrap gap-3"
        style={{ borderColor: 'var(--ds-color-border-default)' }}
      >
        <button
          type="button"
          onClick={resetBrand}
          disabled={isDefault}
          className="text-[11px] uppercase tracking-[0.14em] disabled:opacity-40 hover:underline underline-offset-4"
          style={{
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-color-fg-muted)',
          }}
        >
          Reset to defaults
        </button>
        <span
          className="text-[11px] tabular-nums"
          style={{
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-color-fg-subtle)',
          }}
        >
          oklch(L {chroma.toFixed(3)} {hue})
        </span>
      </div>
    </div>
  );
}

interface KnobAxisProps {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function KnobAxis({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: KnobAxisProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label
          htmlFor={id}
          className="text-[11px] uppercase tracking-[0.14em]"
          style={{
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-color-fg-muted)',
          }}
        >
          {label}
        </label>
        <span
          className="text-[1rem] tabular-nums"
          style={{
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-color-fg-default)',
          }}
        >
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
