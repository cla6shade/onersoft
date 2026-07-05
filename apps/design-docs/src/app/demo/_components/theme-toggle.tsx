'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button, Tooltip } from '@onersoft/ui';
import styles from './dashboard.module.css';

const SunGlyph = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden
  >
    <circle cx="12" cy="12" r="4" />
    <path
      d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      strokeLinecap="round"
    />
  </svg>
);

const MoonGlyph = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden
  >
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinejoin="round" />
  </svg>
);

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // One-shot mount flag so the theme-dependent output only renders client-side,
  // avoiding an SSR/static hydration mismatch (resolvedTheme is undefined first).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Neutral placeholder until next-themes resolves — avoids SSR/static
  // hydration mismatch (resolvedTheme is undefined on the first render).
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" aria-hidden disabled className={styles.iconBtn}>
        <span className={styles.iconPlaceholder} />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={styles.iconBtn}
          onClick={() => setTheme(next)}
          aria-label={`Switch to ${next} theme`}
        >
          {isDark ? MoonGlyph : SunGlyph}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top">
          {isDark ? 'Dark' : 'Light'} · switch to {next}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
