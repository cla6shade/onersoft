'use client';

import { useSyncExternalStore } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import styles from './Toast.module.css';
import { getServerSnapshot, getSnapshot, subscribe, toast, type ToastIntent } from './store';

/* Must outlast the longest exit keyframe in Toast.module.css (`fadeOut`,
 * currently --ds-duration-medium = 180ms). */
const EXIT_ANIMATION_MS = 200;

/* Intent → token color map, kept in JSX (not CSS) so hosts can pass a
 * custom indicator React node entirely from the outside without
 * fighting attribute-selector specificity. */
const INTENT_COLOR: Record<Exclude<ToastIntent, 'neutral'>, string> = {
  success: 'var(--ds-color-success)',
  warning: 'var(--ds-color-warning)',
  danger: 'var(--ds-color-danger)',
  info: 'var(--ds-color-info)',
};

export interface ToasterProps {
  /** Default auto-dismiss duration ms applied via Radix Provider (per-toast `duration` overrides). */
  duration?: number;
  /** Swipe direction to dismiss; defaults to `right`. */
  swipeDirection?: 'right' | 'left' | 'up' | 'down';
  /** Pixel threshold for the swipe gesture. */
  swipeThreshold?: number;
  className?: string;
}

/**
 * Mount once at the app root. Subscribes to the imperative store and
 * renders one Radix Toast per active entry. The store is module-level so
 * `toast()` can be called from anywhere — no context needed.
 */
export function Toaster({
  duration = 5000,
  swipeDirection = 'right',
  swipeThreshold,
  className,
}: ToasterProps) {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <RadixToast.Provider
      duration={duration}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
    >
      {entries.map((entry) => (
        <RadixToast.Root
          key={entry.id}
          data-slot="toast"
          className={styles.root}
          duration={Number.isFinite(entry.duration) ? entry.duration : Infinity}
          onOpenChange={(open) => {
            /* Radix sets data-state='closed' synchronously when close is
             * triggered (button, swipe, duration). The CSS exit animation
             * starts immediately. Calling dismiss() right away would
             * unmount before the first frame renders — delay it. */
            if (!open) window.setTimeout(() => toast.dismiss(entry.id), EXIT_ANIMATION_MS);
          }}
        >
          <div className={styles.content}>
            {entry.title ? (
              <RadixToast.Title data-slot="toast-title" className={styles.title}>
                {entry.intent !== 'neutral' ? (
                  <span
                    className={styles.indicator}
                    style={{ backgroundColor: INTENT_COLOR[entry.intent] }}
                    aria-hidden
                  />
                ) : null}
                {entry.title}
              </RadixToast.Title>
            ) : null}
            {entry.description ? (
              <RadixToast.Description data-slot="toast-description" className={styles.description}>
                {entry.description}
              </RadixToast.Description>
            ) : null}
          </div>
          <div className={styles.controls}>
            {entry.action ? (
              <RadixToast.Action
                data-slot="toast-action"
                asChild
                altText={entry.action.label}
                onClick={entry.action.onClick}
              >
                <button className={styles.actionButton} type="button">
                  {entry.action.label}
                </button>
              </RadixToast.Action>
            ) : null}
            <RadixToast.Close data-slot="toast-close" className={styles.close} aria-label="Dismiss">
              ×
            </RadixToast.Close>
          </div>
        </RadixToast.Root>
      ))}
      <RadixToast.Viewport
        data-slot="toast-viewport"
        className={clsx(styles.viewport, className)}
      />
    </RadixToast.Provider>
  );
}
