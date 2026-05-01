import Link from 'next/link';
import { Eyebrow, Section } from './primitives';

export function FinalCta() {
  return (
    <Section className="py-20 sm:py-24">
      <Eyebrow className="mb-5">Next</Eyebrow>
      <Link href="/docs" className="group inline-flex items-baseline gap-3">
        <h2
          className="text-3xl sm:text-4xl font-semibold tracking-[-0.015em] leading-[1.15]"
          style={{ color: 'var(--ds-color-fg-default)' }}
        >
          View docs
        </h2>
        <span
          className="text-3xl sm:text-4xl leading-[1.15] transition-transform duration-[var(--ds-duration-medium)] ease-[var(--ds-ease-standard)] group-hover:translate-x-1.5"
          style={{ color: 'var(--ds-color-accent)' }}
          aria-hidden
        >
          →
        </span>
      </Link>
      <p
        className="mt-6 max-w-[46ch] leading-[1.65]"
        style={{ color: 'var(--ds-color-fg-muted)' }}
      >
        Components, props, and tokens — documented with live previews.
      </p>
    </Section>
  );
}
