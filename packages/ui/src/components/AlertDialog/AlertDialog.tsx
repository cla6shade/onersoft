'use client';

import type { ComponentProps } from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import styles from './AlertDialog.module.css';

export const Root = RadixAlertDialog.Root;
export const Portal = RadixAlertDialog.Portal;

export function Trigger({ ...props }: ComponentProps<typeof RadixAlertDialog.Trigger>) {
  return <RadixAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

export function Cancel({ ...props }: ComponentProps<typeof RadixAlertDialog.Cancel>) {
  return <RadixAlertDialog.Cancel data-slot="alert-dialog-cancel" {...props} />;
}

export function Action({ ...props }: ComponentProps<typeof RadixAlertDialog.Action>) {
  return <RadixAlertDialog.Action data-slot="alert-dialog-action" {...props} />;
}

export function Overlay({ className, ...props }: ComponentProps<typeof RadixAlertDialog.Overlay>) {
  return (
    <RadixAlertDialog.Overlay
      data-slot="alert-dialog-overlay"
      className={clsx(styles.overlay, className)}
      {...props}
    />
  );
}

export function Content({ className, ...props }: ComponentProps<typeof RadixAlertDialog.Content>) {
  return (
    <RadixAlertDialog.Content
      data-slot="alert-dialog-content"
      className={clsx(styles.content, className)}
      {...props}
    />
  );
}

export function Title({ className, ...props }: ComponentProps<typeof RadixAlertDialog.Title>) {
  return (
    <RadixAlertDialog.Title
      data-slot="alert-dialog-title"
      className={clsx(styles.title, className)}
      {...props}
    />
  );
}

export function Description({
  className,
  ...props
}: ComponentProps<typeof RadixAlertDialog.Description>) {
  return (
    <RadixAlertDialog.Description
      data-slot="alert-dialog-description"
      className={clsx(styles.description, className)}
      {...props}
    />
  );
}

export function Footer({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="alert-dialog-footer" className={clsx(styles.footer, className)} {...props} />
  );
}
