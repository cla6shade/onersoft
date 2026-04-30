'use client'

import type { ComponentProps } from 'react'
import * as Slot from '@radix-ui/react-slot'
import clsx from 'clsx'
import type { CompactSize } from '../../types'
import styles from './Badge.module.css'

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends ComponentProps<'span'> {
  variant?: BadgeVariant
  size?: CompactSize
  asChild?: boolean
}

export function Badge({
  className,
  variant = 'neutral',
  size = 'md',
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : 'span'
  return (
    <Comp
      data-slot="badge"
      className={clsx(styles.badge, styles[variant], styles[size], className)}
      {...props}
    />
  )
}
