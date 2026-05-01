import { SWATCHES } from './data';
import { InlineKnob } from './inline-knob';
import { PreviewGrid } from './preview-grid';
import { Eyebrow, Section } from './primitives';

export function Oklch() {
  return (
    <Section className="py-20 sm:py-28">
      <Eyebrow accent className="mb-4">
        02 — OKLCH
      </Eyebrow>
      <h2
        className="text-3xl sm:text-4xl font-semibold tracking-[-0.015em] leading-[1.15] max-w-[24ch]"
        style={{ color: 'var(--ds-color-fg-default)' }}
      >
        Edit once, overrides all.
      </h2>
      <p className="mt-5 leading-[1.7] max-w-[64ch]" style={{ color: 'var(--ds-color-fg-muted)' }}>
        OKLCH is a color space designed for human perception, not for screens. Surface, text,
        border, and accent are all derived from the same hue·chroma coordinates, so changing two
        values reshapes the entire palette in light and dark, in lockstep. Try it yourself.
      </p>

      {/* Live demo: knob + tokens (left) + components (right) */}
      <div className="mt-12 grid gap-6 items-start lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="flex flex-col gap-6">
          <InlineKnob />
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.14em] mb-3"
              style={{
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-color-fg-muted)',
              }}
            >
              Tokens
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-3">
              {SWATCHES.map((s) => (
                <div key={s.name} className="flex flex-col gap-1.5">
                  <div
                    className="h-7 w-full rounded-[var(--ds-radius-sm)]"
                    style={{
                      background: `var(${s.token})`,
                      boxShadow:
                        'inset 0 0 0 1px color-mix(in oklab, var(--ds-color-fg-default) 8%, transparent)',
                    }}
                    aria-hidden
                  />
                  <div
                    className="text-[10px] tabular-nums truncate"
                    style={{
                      fontFamily: 'var(--ds-font-mono)',
                      color: 'var(--ds-color-fg-subtle)',
                    }}
                  >
                    {s.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PreviewGrid />
      </div>

      {/* Retheme code */}
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 items-start">
        <p className="leading-[1.7] text-[0.95rem]" style={{ color: 'var(--ds-color-fg-muted)' }}>
          In your host app, override the same two variables. No mapping table, no light/dark palette
          to define separately. Perceptual uniformity keeps lightness contrast intact at any hue you
          pick.
        </p>
        <pre
          className="rounded-[var(--ds-radius-lg)] p-6 sm:p-7 overflow-x-auto text-[0.85rem] leading-[1.7] border"
          style={{
            fontFamily: 'var(--ds-font-mono)',
            background: 'var(--ds-color-bg-subtle)',
            color: 'var(--ds-color-fg-default)',
            borderColor: 'var(--ds-color-border-default)',
          }}
        >
          <code>{`/* Retheme — that's it. */
:root {
  --ds-brand-hue: 232;
  --ds-brand-chroma: 0.06;
}`}</code>
        </pre>
      </div>
    </Section>
  );
}
