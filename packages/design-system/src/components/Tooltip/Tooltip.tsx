'use client';

import type { ComponentProps } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

export const Provider = RadixTooltip.Provider;
export const Root = RadixTooltip.Root;
export const Portal = RadixTooltip.Portal;

export function Trigger({ ...props }: ComponentProps<typeof RadixTooltip.Trigger>) {
  return <RadixTooltip.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function Content({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof RadixTooltip.Content>) {
  return (
    <RadixTooltip.Content
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  );
}
