import { Eyebrow, Section } from './primitives';

interface SpecRow {
  label: string;
  primary: string;
  secondary?: string;
  tone?: 'default' | 'warn';
}

const ROWS: SpecRow[] = [
  {
    label: 'A11y',
    primary: 'axe-core + Playwright',
    secondary: 'Chromium · Firefox · WebKit',
  },
  {
    label: 'Stacks',
    primary: 'Next.js 16 · Vite + React 19',
    secondary: 'No framework hooks — bundler-agnostic in principle.',
  },
  {
    label: 'Stage',
    primary: '0.0.1 — unstable',
    secondary: 'APIs may change. Components may move or disappear.',
    tone: 'warn',
  },
];

export function Status() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div>
          <Eyebrow accent className="mb-4">
            03 — Verified
          </Eyebrow>
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-[-0.015em] leading-[1.15] max-w-[18ch]"
            style={{ color: 'var(--ds-color-fg-default)' }}
          >
            Compatible with modern web environments.
          </h2>
          <p
            className="mt-5 leading-[1.7] max-w-[44ch]"
            style={{ color: 'var(--ds-color-fg-muted)' }}
          >
            Every release runs the component suite through axe-core under Playwright on Chromium,
            Firefox, and WebKit. Integration-tested with Next.js and Vite + React — the two stacks
            we ship with. The version is{' '}
            <code
              style={{
                fontFamily: 'var(--ds-font-mono)',
                color: 'var(--ds-color-fg-default)',
              }}
            >
              0.0.1
            </code>{' '}
            for a reason: expect APIs and component names to change before we cut a stable release.
          </p>
        </div>

        <SpecSheet />
      </div>
    </Section>
  );
}

function SpecSheet() {
  return (
    <div
      className="rounded-[var(--ds-radius-lg)] border overflow-hidden"
      style={{ borderColor: 'var(--ds-color-border-default)' }}
    >
      {ROWS.map((row, i) => (
        <SpecRowItem key={row.label} row={row} divider={i > 0} />
      ))}
    </div>
  );
}

function SpecRowItem({ row, divider }: { row: SpecRow; divider: boolean }) {
  const isWarn = row.tone === 'warn';
  return (
    <div
      className={`grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[7rem_minmax(0,1fr)] gap-5 sm:gap-8 px-5 sm:px-6 py-5 ${
        divider ? 'border-t' : ''
      }`}
      style={divider ? { borderColor: 'var(--ds-color-border-default)' } : undefined}
    >
      <span
        className="text-[10px] uppercase tracking-[0.16em] pt-0.5"
        style={{
          fontFamily: 'var(--ds-font-mono)',
          color: 'var(--ds-color-fg-muted)',
        }}
      >
        {row.label}
      </span>
      <div className="flex flex-col gap-1">
        <span
          className="text-[0.95rem]"
          style={{
            color: isWarn ? 'var(--ds-color-fg-accent)' : 'var(--ds-color-fg-default)',
            fontWeight: isWarn ? 500 : 400,
            fontFamily: isWarn ? 'var(--ds-font-mono)' : undefined,
          }}
        >
          {row.primary}
        </span>
        {row.secondary && (
          <span
            className="text-[0.8rem] leading-[1.55]"
            style={{ color: 'var(--ds-color-fg-subtle)' }}
          >
            {row.secondary}
          </span>
        )}
      </div>
    </div>
  );
}
