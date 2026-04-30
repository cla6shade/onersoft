'use client'

import type { ComponentProps } from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import styles from './RadioGroup.module.css'

export function Root({
  className,
  ...props
}: ComponentProps<typeof RadixRadioGroup.Root>) {
  return <RadixRadioGroup.Root data-slot="radio-group" className={clsx(styles.root, className)} {...props} />
}

export function Item({
  className,
  ...props
}: ComponentProps<typeof RadixRadioGroup.Item>) {
  return (
    <RadixRadioGroup.Item data-slot="radio-group-item" className={clsx(styles.item, className)} {...props}>
      <RadixRadioGroup.Indicator data-slot="radio-group-indicator" className={styles.indicator} />
    </RadixRadioGroup.Item>
  )
}
