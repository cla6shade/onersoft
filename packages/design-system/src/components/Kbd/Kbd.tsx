'use client'

import type { ComponentProps } from 'react'
import * as Slot from '@radix-ui/react-slot'
import clsx from 'clsx'
import type { CompactSize } from '../../types'
import styles from './Kbd.module.css'

export interface KbdProps extends ComponentProps<'kbd'> {
  size?: CompactSize
  asChild?: boolean
}

export function Kbd({ className, size = 'md', asChild = false, ...props }: KbdProps) {
  const Comp = asChild ? Slot.Root : 'kbd'
  return (
    <Comp data-slot="kbd" className={clsx(styles.kbd, styles[size], className)} {...props} />
  )
}
