'use client';

import type { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './EmptyState.module.css';

function Root({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="empty-state" className={clsx(styles.root, className)} {...props} />;
}

function Media({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-state-media"
      aria-hidden
      className={clsx(styles.media, className)}
      {...props}
    />
  );
}

function Title({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 data-slot="empty-state-title" className={clsx(styles.title, className)} {...props} />;
}

function Description({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="empty-state-description"
      className={clsx(styles.description, className)}
      {...props}
    />
  );
}

function Actions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="empty-state-actions" className={clsx(styles.actions, className)} {...props} />
  );
}

export const EmptyState = Object.assign(Root, {
  Media,
  Title,
  Description,
  Actions,
});
