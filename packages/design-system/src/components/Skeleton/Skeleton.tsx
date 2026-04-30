'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Skeleton.module.css'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** `text` collapses to a line-height-aware bar; `circle` enforces 1:1 aspect. */
  variant?: 'block' | 'text' | 'circle'
  /** CSS width — number coerces to px. */
  width?: number | string
  /** CSS height — number coerces to px. */
  height?: number | string
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'block', width, height, style, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className={clsx(
        styles.skeleton,
        variant === 'text' && styles.text,
        variant === 'circle' && styles.circle,
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  ),
)

Skeleton.displayName = 'Skeleton'
