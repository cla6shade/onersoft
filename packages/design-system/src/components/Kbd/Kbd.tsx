'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import * as Slot from '@radix-ui/react-slot'
import clsx from 'clsx'
import type { CompactSize } from '../../types'
import styles from './Kbd.module.css'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: CompactSize
  asChild?: boolean
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'kbd'
    return (
      <Comp ref={ref} data-slot="kbd" className={clsx(styles.kbd, styles[size], className)} {...props} />
    )
  },
)

Kbd.displayName = 'Kbd'
