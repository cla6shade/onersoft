import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  topBorder?: boolean;
  children: ReactNode;
}

export function Section({ id, className = '', topBorder = true, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 sm:px-10 ${topBorder ? 'border-t' : ''} ${className}`}
      style={topBorder ? { borderColor: 'var(--ds-color-border-default)' } : undefined}
    >
      <div className="mx-auto w-full max-w-[var(--container)]">{children}</div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export function Eyebrow({ children, accent = false, className = '' }: EyebrowProps) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.18em] ${className}`}
      style={{
        fontFamily: 'var(--ds-font-mono)',
        color: accent ? 'var(--ds-color-accent)' : 'var(--ds-color-fg-muted)',
      }}
    >
      {children}
    </p>
  );
}

interface MonoLabelProps {
  children: ReactNode;
  tone?: 'default' | 'muted' | 'subtle' | 'accent';
  className?: string;
}

const TONE_COLOR: Record<NonNullable<MonoLabelProps['tone']>, string> = {
  default: 'var(--ds-color-fg-default)',
  muted: 'var(--ds-color-fg-muted)',
  subtle: 'var(--ds-color-fg-subtle)',
  accent: 'var(--ds-color-accent)',
};

export function MonoLabel({ children, tone = 'muted', className = '' }: MonoLabelProps) {
  return (
    <span
      className={className}
      style={{ fontFamily: 'var(--ds-font-mono)', color: TONE_COLOR[tone] }}
    >
      {children}
    </span>
  );
}
