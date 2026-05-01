import { BarChart } from './bar-chart';
import { Eyebrow, Section } from './primitives';

export function Tiny() {
  return (
    <Section id="tiny" className="py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <Eyebrow accent className="mb-4">
            01 — Tiny
          </Eyebrow>
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-[-0.015em] leading-[1.15]"
            style={{ color: 'var(--ds-color-fg-default)' }}
          >
            The end of tuning is stock.
          </h2>
          <p
            className="mt-5 leading-[1.7] max-w-[44ch]"
            style={{ color: 'var(--ds-color-fg-muted)' }}
          >
            CSS-in-JS, Tailwind, recipe registries — every abstraction exists to
            produce one thing: a <code style={{ fontFamily: 'var(--ds-font-mono)', color: 'var(--ds-color-fg-default)' }}>.css</code> file. Onersoft produces it at build
            time and keeps the abstraction thin — a component API and a token
            system, nothing more. The weight goes; the developer experience
            stays.
          </p>

          <div
            className="mt-8 pt-6 border-t"
            style={{ borderColor: 'var(--ds-color-border-default)' }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.14em] mb-2"
              style={{
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-color-fg-muted)',
              }}
            >
              Baseline
            </p>
            <p
              className="text-[0.85rem] leading-[1.65] max-w-[44ch]"
              style={{ color: 'var(--ds-color-fg-subtle)' }}
            >
              ~161 kB (gz) — the cost of Next.js 16 + React 19 alone, before any
              UI library. Every site pays this floor before a single component
              renders. The portion of each bar past it is what a library
              actually adds on top.
            </p>
          </div>
        </div>

        <BarChart />
      </div>
    </Section>
  );
}
