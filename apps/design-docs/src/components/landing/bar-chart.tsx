import {
  AXIS_TICKS,
  AXIS_UNIT,
  BASELINE_LIB,
  ONERSOFT_LIB,
  SCALE_KB,
  SCENARIOS,
  type Scenario,
} from './data';

const LABEL_COL = 'grid-cols-[7.5rem_1fr_4rem] sm:grid-cols-[8.5rem_1fr_4rem]';
const AXIS_INSET = 'ml-[7.5rem] sm:ml-[8.5rem] mr-[4rem]';

const BASELINE_COLOR = 'var(--ds-color-border-strong)';
const BASELINE_COLOR_ACCENT =
  'color-mix(in oklab, var(--ds-color-accent) 35%, var(--ds-color-border-strong))';
const DELTA_COLOR = 'var(--ds-color-fg-muted)';
const ACCENT_COLOR = 'var(--ds-color-accent)';
const ROW_HIGHLIGHT_BG =
  'color-mix(in oklab, var(--ds-color-accent) 6%, transparent)';

export function BarChart() {
  return (
    <div className="self-end">
      <div className={`${AXIS_INSET} relative h-4 mb-3`} aria-hidden>
        {AXIS_TICKS.map((tick) => (
          <span
            key={tick}
            className="absolute top-0 -translate-x-1/2 text-[10px] tabular-nums"
            style={{
              left: `${(tick / SCALE_KB) * 100}%`,
              fontFamily: 'var(--ds-font-mono)',
              color: 'var(--ds-color-fg-subtle)',
            }}
          >
            {tick}
          </span>
        ))}
        <span
          className="absolute top-0 right-0 text-[10px]"
          style={{
            fontFamily: 'var(--ds-font-mono)',
            color: 'var(--ds-color-fg-muted)',
          }}
        >
          {AXIS_UNIT}
        </span>
      </div>

      <div className="space-y-9">
        {SCENARIOS.map((s) => (
          <ScenarioRow key={s.label} scenario={s} />
        ))}
      </div>
    </div>
  );
}

function ScenarioRow({ scenario }: { scenario: Scenario }) {
  return (
    <div>
      <div className="mb-3">
        <div
          className="text-[0.95rem] font-medium"
          style={{ color: 'var(--ds-color-fg-default)' }}
        >
          {scenario.label}
        </div>
        <div
          className="text-[11px] mt-0.5"
          style={{ color: 'var(--ds-color-fg-subtle)' }}
        >
          {scenario.sub}
        </div>
      </div>
      <div className="space-y-2">
        <Bar
          lib={BASELINE_LIB}
          basePct={(scenario.baseline / SCALE_KB) * 100}
          deltaPct={0}
          delta={0}
          total={scenario.baseline}
          tone="baseline"
        />
        {scenario.bars.map((b) => (
          <Bar
            key={b.lib}
            lib={b.lib}
            basePct={(scenario.baseline / SCALE_KB) * 100}
            deltaPct={(b.delta / SCALE_KB) * 100}
            delta={b.delta}
            total={scenario.baseline + b.delta}
            tone={b.lib === ONERSOFT_LIB ? 'onersoft' : 'lib'}
          />
        ))}
      </div>
    </div>
  );
}

interface BarProps {
  lib: string;
  basePct: number;
  deltaPct: number;
  delta: number;
  total: number;
  tone: 'baseline' | 'lib' | 'onersoft';
}

function Bar({ lib, basePct, deltaPct, delta, total, tone }: BarProps) {
  const isAccent = tone === 'onersoft';
  const isBaseline = tone === 'baseline';

  const labelColor = isAccent
    ? ACCENT_COLOR
    : isBaseline
      ? 'var(--ds-color-fg-subtle)'
      : 'var(--ds-color-fg-muted)';

  const numberColor = isAccent
    ? ACCENT_COLOR
    : isBaseline
      ? 'var(--ds-color-fg-subtle)'
      : 'var(--ds-color-fg-default)';

  return (
    <div
      className={`grid ${LABEL_COL} items-center gap-3 -mx-3 px-3 py-1 rounded-[var(--ds-radius-sm)]`}
      style={{
        background: isAccent ? ROW_HIGHLIGHT_BG : undefined,
        transition: 'background var(--ds-duration-medium) var(--ds-ease-standard)',
      }}
    >
      <span
        className="text-[11px] uppercase tracking-[0.1em] truncate"
        style={{
          fontFamily: 'var(--ds-font-mono)',
          color: labelColor,
          fontWeight: isAccent ? 600 : 400,
          letterSpacing: isAccent ? '0.12em' : undefined,
        }}
      >
        {lib}
      </span>
      <div
        className="relative h-[10px] rounded-full overflow-hidden flex"
        style={{ background: 'var(--ds-color-bg-sunken)' }}
      >
        <div
          className="h-full"
          style={{
            width: `${basePct}%`,
            background: isAccent ? BASELINE_COLOR_ACCENT : BASELINE_COLOR,
            transition:
              'width var(--ds-duration-slow) var(--ds-ease-standard), background var(--ds-duration-medium) var(--ds-ease-standard)',
          }}
        />
        {deltaPct > 0 && (
          <div
            className="h-full"
            style={{
              width: `${Math.max(deltaPct, 0.4)}%`,
              background: isAccent ? ACCENT_COLOR : DELTA_COLOR,
              transition:
                'width var(--ds-duration-slow) var(--ds-ease-standard), background var(--ds-duration-medium) var(--ds-ease-standard)',
            }}
          />
        )}
      </div>
      <span
        className="flex flex-col items-end tabular-nums leading-[1.15]"
        style={{ fontFamily: 'var(--ds-font-mono)' }}
      >
        <span
          className="text-[0.85rem]"
          style={{
            color: numberColor,
            fontWeight: isAccent ? 600 : 400,
          }}
        >
          {total.toFixed(1)}
        </span>
        {!isBaseline && (
          <span
            className="text-[10px] mt-0.5"
            style={{
              color: isAccent
                ? ACCENT_COLOR
                : 'var(--ds-color-fg-subtle)',
            }}
          >
            +{delta.toFixed(1)}
          </span>
        )}
      </span>
    </div>
  );
}

