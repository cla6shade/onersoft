'use client'

import type { ComponentProps } from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import clsx from 'clsx'
import styles from './Switch.module.css'

export function Switch({
  className,
  ...props
}: ComponentProps<typeof RadixSwitch.Root>) {
  return (
    <RadixSwitch.Root data-slot="switch" className={clsx(styles.root, className)} {...props}>
      <RadixSwitch.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </RadixSwitch.Root>
  )
}
