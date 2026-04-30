'use client';

import type { ComponentProps } from 'react';
import * as RadixSeparator from '@radix-ui/react-separator';
import clsx from 'clsx';
import styles from './Separator.module.css';

export function Separator({ className, ...props }: ComponentProps<typeof RadixSeparator.Root>) {
  return (
    <RadixSeparator.Root
      data-slot="separator"
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}
