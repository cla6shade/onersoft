'use client';

import type { ComponentProps } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import styles from './Checkbox.module.css';

export function Checkbox({ className, ...props }: ComponentProps<typeof RadixCheckbox.Root>) {
  return (
    <RadixCheckbox.Root data-slot="checkbox" className={clsx(styles.root, className)} {...props}>
      <RadixCheckbox.Indicator data-slot="checkbox-indicator" className={styles.indicator}>
        <svg viewBox="0 0 16 16" aria-hidden focusable="false" className={styles.check}>
          <path
            d="M3.5 8.5 6.75 12 13 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
