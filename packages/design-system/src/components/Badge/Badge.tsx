import { forwardRef, type HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Badge.module.css'

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'neutral', size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(styles.badge, styles[variant], styles[size], className)}
      {...props}
    />
  ),
)

Badge.displayName = 'Badge'
