'use client';

/**
 * `/demo` — Operations Console.
 *
 * A monitoring dashboard built on @onersoft/ui across three domains — app
 * users, service health, and admins — inside a real dashboard shell: a
 * persistent left sidebar (primary nav) + a main area with a slim top bar.
 * Token-first: every color, space, radius, font-size and shadow references a
 * `--ds-*` / `--color-*` token (inline styles or the co-located CSS module).
 * tokens.css is injected globally (src/app/global.css); theming is wired via
 * next-themes → `data-theme` on <html>. Static export → client component, no
 * server-only features. English only.
 */

import { Toaster, Tooltip } from '@onersoft/ui';
import { Shell } from './_components/shell';
import styles from './_components/dashboard.module.css';

export default function OperationsConsole() {
  return (
    <Tooltip.Provider delayDuration={200}>
      <main className={styles.shell}>
        <Shell />
        <Toaster />
      </main>
    </Tooltip.Provider>
  );
}
