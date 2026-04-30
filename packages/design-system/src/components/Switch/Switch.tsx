'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import clsx from 'clsx'
import styles from './Switch.module.css'

export const Switch = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root ref={ref} data-slot="switch" className={clsx(styles.root, className)} {...props}>
    <RadixSwitch.Thumb data-slot="switch-thumb" className={styles.thumb} />
  </RadixSwitch.Root>
))

Switch.displayName = 'Switch'
