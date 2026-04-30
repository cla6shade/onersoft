'use client'

import type { ComponentPropsWithoutRef } from 'react'
import * as RadixLabel from '@radix-ui/react-label'
import clsx from 'clsx'
import styles from './Label.module.css'

export function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixLabel.Root>) {
  return <RadixLabel.Root data-slot="label" className={clsx(styles.label, className)} {...props} />
}
