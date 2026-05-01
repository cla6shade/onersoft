'use client';

import type { ComponentProps } from 'react';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import clsx from 'clsx';
import styles from './ToggleGroup.module.css';

export function Root({ className, ...props }: ComponentProps<typeof RadixToggleGroup.Root>) {
  return (
    <RadixToggleGroup.Root
      data-slot="toggle-group-root"
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

export function Item({ className, ...props }: ComponentProps<typeof RadixToggleGroup.Item>) {
  return (
    <RadixToggleGroup.Item
      data-slot="toggle-group-item"
      className={clsx(styles.item, className)}
      {...props}
    />
  );
}
