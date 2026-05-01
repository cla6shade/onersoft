import { Section } from './primitives';

export function Footer() {
  return (
    <Section className="py-7">
      <div
        className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[11px]"
        style={{
          fontFamily: 'var(--ds-font-mono)',
          color: 'var(--ds-color-fg-subtle)',
        }}
      >
        <span className="uppercase tracking-[0.14em]" style={{ color: 'var(--ds-color-fg-muted)' }}>
          onersoft
        </span>
        <a
          href="https://github.com/cla6shade/onersoft"
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-[5px]"
        >
          github ↗
        </a>
        <span className="ml-auto tabular-nums">© 2026 · v0.0.1</span>
      </div>
    </Section>
  );
}
