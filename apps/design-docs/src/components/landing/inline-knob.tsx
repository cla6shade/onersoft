'use client';

import { useId, useSyncExternalStore } from 'react';
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
import { KnobAxis } from '../knob-axis';

const INLINE_LABEL_CLASS = 'text-[11px] uppercase tracking-[0.14em]';
const INLINE_VALUE_CLASS = 'text-[1rem] tabular-nums';
const INLINE_LABEL_STYLE = {
  fontFamily: 'var(--ds-font-mono)',
  color: 'var(--ds-color-fg-muted)',
};

export function InlineKnob() {
  const { hue, chroma } = useSyncExternalStore(
    subscribeBrand,
    getBrandState,
    () => SSR_BRAND_SNAPSHOT,
  );
  const hueId = useId();
  const chromaId = useId();

  const isDefault = hue === BRAND_DEFAULTS.hue && chroma === BRAND_DEFAULTS.chroma;

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
          display={`${hue}°`}
          value={hue}
          min={0}
          max={HUE_MAX}
          step={1}
          onChange={(v) => setBrand({ hue: v })}
          gap="roomy"
          labelClassName={INLINE_LABEL_CLASS}
          valueClassName={INLINE_VALUE_CLASS}
          labelStyle={INLINE_LABEL_STYLE}
        />
        <KnobAxis
          id={chromaId}
          label="Chroma"
          display={chroma.toFixed(3)}
          value={chroma}
          min={0}
          max={CHROMA_MAX}
          step={0.005}
          onChange={(v) => setBrand({ chroma: v })}
          gap="roomy"
          labelClassName={INLINE_LABEL_CLASS}
          valueClassName={INLINE_VALUE_CLASS}
          labelStyle={INLINE_LABEL_STYLE}
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
