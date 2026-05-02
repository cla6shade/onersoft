'use client';

import type { ComponentProps } from 'react';
import * as RadixToggle from '@radix-ui/react-toggle';
import clsx from 'clsx';
import type { ControlSize } from '../../types';
import styles from './Toggle.module.css';

export interface ToggleProps extends ComponentProps<typeof RadixToggle.Root> {
  size?: ControlSize;
}

export function Toggle({ className, size = 'md', ...props }: ToggleProps) {
  return (
    <RadixToggle.Root
      data-slot="toggle"
      className={clsx(styles.root, styles[size], className)}
      {...props}
    />
  );
}
