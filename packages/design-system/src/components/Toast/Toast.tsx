'use client';

import type { ComponentProps } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import styles from './Toast.module.css';

export const Provider = RadixToast.Provider;

export function Action({ ...props }: ComponentProps<typeof RadixToast.Action>) {
  return <RadixToast.Action data-slot="toast-action" {...props} />;
}

export function Content({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="toast-content" className={clsx(styles.content, className)} {...props} />;
}

export function Controls({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="toast-controls" className={clsx(styles.controls, className)} {...props} />;
}

export function Viewport({ className, ...props }: ComponentProps<typeof RadixToast.Viewport>) {
  return (
    <RadixToast.Viewport
      data-slot="toast-viewport"
      className={clsx(styles.viewport, className)}
      {...props}
    />
  );
}

export function Root({ className, ...props }: ComponentProps<typeof RadixToast.Root>) {
  return <RadixToast.Root data-slot="toast" className={clsx(styles.root, className)} {...props} />;
}

export function Title({ className, ...props }: ComponentProps<typeof RadixToast.Title>) {
  return (
    <RadixToast.Title
      data-slot="toast-title"
      className={clsx(styles.title, className)}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: ComponentProps<typeof RadixToast.Description>) {
  return (
    <RadixToast.Description
      data-slot="toast-description"
      className={clsx(styles.description, className)}
      {...props}
    />
  );
}

export function Close({ className, ...props }: ComponentProps<typeof RadixToast.Close>) {
  return (
    <RadixToast.Close
      data-slot="toast-close"
      className={clsx(styles.close, className)}
      {...props}
    />
  );
}
