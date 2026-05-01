'use client';

import { useId, useState, useSyncExternalStore } from 'react';
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
} from './brand-store';

export function BrandKnob() {
  const { hue, chroma } = useSyncExternalStore(
    subscribeBrand,
    getBrandState,
    () => SSR_BRAND_SNAPSHOT,
  );
  const [open, setOpen] = useState(false);
  const hueId = useId();
  const chromaId = useId();

  const swatch = `oklch(0.68 ${chroma} ${hue})`;
  const swatchMuted = `oklch(0.5 ${chroma} ${hue})`;
  const isDefault =
    hue === BRAND_DEFAULTS.hue && chroma === BRAND_DEFAULTS.chroma;

  return (
    <div
      className="fixed bottom-4 right-4 z-[var(--ds-z-overlay)] font-sans"
      data-brand-knob
    >
      {open ? (
        <div
          className="w-[260px] rounded-[var(--ds-radius-lg)] border bg-[color:var(--ds-color-bg-elevated)] p-4 shadow-[var(--ds-shadow-md)]"
          style={{ borderColor: 'var(--ds-color-border-default)' }}
          role="dialog"
          aria-label="Brand color knob"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="block h-4 w-4 rounded-full"
                style={{ background: swatch }}
                aria-hidden
              />
              <span
                className="block h-4 w-4 rounded-full"
                style={{ background: swatchMuted }}
                aria-hidden
              />
              <span
                className="text-[10px] uppercase tracking-[0.12em] ml-1"
                style={{ color: 'var(--ds-color-fg-muted)' }}
              >
                Brand
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-6 w-6 grid place-items-center rounded-[var(--ds-radius-sm)] hover:bg-[color:var(--ds-color-surface-hover)]"
              style={{ color: 'var(--ds-color-fg-muted)' }}
              aria-label="Close brand knob"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                <path
                  d="M1 1l8 8M9 1l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label
                  htmlFor={hueId}
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: 'var(--ds-color-fg-muted)' }}
                >
                  Hue
                </label>
                <span
                  className="text-[11px] tabular-nums"
                  style={{
                    fontFamily: 'var(--ds-font-mono)',
                    color: 'var(--ds-color-fg-default)',
                  }}
                >
                  {hue}°
                </span>
              </div>
              <Slider
                id={hueId}
                min={0}
                max={HUE_MAX}
                step={1}
                value={[hue]}
                onValueChange={([v]) => setBrand({ hue: v })}
                aria-label="Brand hue"
              />
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <label
                  htmlFor={chromaId}
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: 'var(--ds-color-fg-muted)' }}
                >
                  Chroma
                </label>
                <span
                  className="text-[11px] tabular-nums"
                  style={{
                    fontFamily: 'var(--ds-font-mono)',
                    color: 'var(--ds-color-fg-default)',
                  }}
                >
                  {chroma.toFixed(3)}
                </span>
              </div>
              <Slider
                id={chromaId}
                min={0}
                max={CHROMA_MAX}
                step={0.005}
                value={[chroma]}
                onValueChange={([v]) => setBrand({ chroma: v })}
                aria-label="Brand chroma"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={resetBrand}
                disabled={isDefault}
                className="text-[11px] uppercase tracking-[0.1em] disabled:opacity-40 hover:underline underline-offset-4"
                style={{ color: 'var(--ds-color-fg-muted)' }}
              >
                Reset
              </button>
              <span
                className="text-[10px] tabular-nums"
                style={{
                  fontFamily: 'var(--ds-font-mono)',
                  color: 'var(--ds-color-fg-subtle)',
                }}
              >
                oklch(L {chroma.toFixed(3)} {hue})
              </span>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group h-9 rounded-full border px-2.5 flex items-center gap-2 bg-[color:var(--ds-color-bg-elevated)] shadow-[var(--ds-shadow-xs)] hover:shadow-[var(--ds-shadow-sm)] transition-shadow"
          style={{ borderColor: 'var(--ds-color-border-default)' }}
          aria-label="Open brand color knob"
        >
          <span
            className="block h-5 w-5 rounded-full"
            style={{
              background: swatch,
              boxShadow: '0 0 0 1px color-mix(in oklab, currentColor 8%, transparent) inset',
            }}
            aria-hidden
          />
          <span
            className="text-[10px] uppercase tracking-[0.12em] hidden sm:inline"
            style={{
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-color-fg-muted)',
            }}
          >
            {hue}° / {chroma.toFixed(3)}
          </span>
        </button>
      )}
    </div>
  );
}
