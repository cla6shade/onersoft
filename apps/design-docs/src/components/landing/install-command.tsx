'use client';

import { useState } from 'react';

const COMMAND = 'pnpm add @onersoft/ui';
const RESET_MS = 1600;

export function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), RESET_MS);
    } catch {
      // Clipboard unavailable — silently no-op.
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy install command: ${COMMAND}`}
      className="group inline-flex items-center gap-3 rounded-[var(--ds-radius-md)] border h-[var(--ds-control-height-lg)] px-4 bg-[color:var(--ds-color-bg-elevated)] hover:bg-[color:var(--ds-color-elevated-hover)] transition-colors"
      style={{
        borderColor: 'var(--ds-color-border-strong)',
        fontFamily: 'var(--ds-font-mono)',
      }}
    >
      <span aria-hidden className="text-[0.85rem]" style={{ color: 'var(--ds-color-fg-subtle)' }}>
        $
      </span>
      <span className="text-[0.9rem]" style={{ color: 'var(--ds-color-fg-default)' }}>
        {COMMAND}
      </span>
      <span
        aria-live="polite"
        className="ml-1 text-[10px] uppercase tracking-[0.14em]"
        style={{
          color: copied ? 'var(--ds-color-accent)' : 'var(--ds-color-fg-subtle)',
          transition: 'color var(--ds-duration-fast) var(--ds-ease-standard)',
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
}
