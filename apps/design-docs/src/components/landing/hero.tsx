import Link from 'next/link';
import { Button } from '@onersoft/design-system';
import { InstallCommand } from './install-command';
import { Eyebrow, Section } from './primitives';

export function Hero() {
  return (
    <Section topBorder={false} className="pt-16 sm:pt-24 pb-20 sm:pb-28">
      <Eyebrow className="mb-8">Onersoft Design System · v0</Eyebrow>
      <h1
        className="font-semibold leading-[1.05] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.5rem)] max-w-[20ch]"
        style={{ color: 'var(--ds-color-fg-default)' }}
      >
        Tiny Radix wrapper
        <br />
        with a <span style={{ color: 'var(--ds-color-accent)' }}>human-friendly</span> color space.
      </h1>
      <p
        className="mt-7 max-w-[60ch] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65]"
        style={{ color: 'var(--ds-color-fg-muted)' }}
      >
        A React component library that wraps Radix primitives in vanilla CSS. Lightweight by
        construction, with retheming in two lines.
      </p>
      <div className="mt-10 flex items-center gap-5 flex-wrap">
        <Button asChild size="lg">
          <Link href="/docs">Get started</Link>
        </Button>
        <InstallCommand />
      </div>
    </Section>
  );
}
