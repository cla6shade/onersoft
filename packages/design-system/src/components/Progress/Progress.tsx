'use client'

import type { ComponentProps } from 'react'
import * as RadixProgress from '@radix-ui/react-progress'
import clsx from 'clsx'
import styles from './Progress.module.css'

export interface ProgressProps extends ComponentProps<typeof RadixProgress.Root> {
  value?: number | null
  max?: number
}

export function Progress({ className, value, max = 100, ...props }: ProgressProps) {
  const pct = value == null ? null : Math.min(100, Math.max(0, (value / max) * 100))
  const hasLabel = props['aria-label'] != null || props['aria-labelledby'] != null
  return (
    <RadixProgress.Root
      data-slot="progress"
      className={clsx(styles.root, className)}
      value={value ?? null}
      max={max}
      {...props}
      aria-label={hasLabel ? props['aria-label'] : 'Progress'}
    >
      <RadixProgress.Indicator
        data-slot="progress-indicator"
        className={clsx(styles.indicator, pct == null && styles.indeterminate)}
        style={pct == null ? undefined : { transform: `translateX(-${100 - pct}%)` }}
      />
    </RadixProgress.Root>
  )
}
