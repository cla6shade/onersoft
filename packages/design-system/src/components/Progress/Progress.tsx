import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Progress as RadixProgress } from 'radix-ui'
import clsx from 'clsx'
import styles from './Progress.module.css'

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof RadixProgress.Root> {
  value?: number | null
  max?: number
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const pct = value == null ? null : Math.min(100, Math.max(0, (value / max) * 100))
    return (
      <RadixProgress.Root
        ref={ref}
        className={clsx(styles.root, className)}
        value={value ?? null}
        max={max}
        {...props}
      >
        <RadixProgress.Indicator
          className={clsx(styles.indicator, pct == null && styles.indeterminate)}
          style={pct == null ? undefined : { transform: `translateX(-${100 - pct}%)` }}
        />
      </RadixProgress.Root>
    )
  },
)

Progress.displayName = 'Progress'
