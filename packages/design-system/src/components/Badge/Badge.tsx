import { forwardRef, type HTMLAttributes } from 'react'
import { Slot } from 'radix-ui'
import clsx from 'clsx'
import type { CompactSize } from '../../types'
import styles from './Badge.module.css'

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: CompactSize
  asChild?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'span'
    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={clsx(styles.badge, styles[variant], styles[size], className)}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'
