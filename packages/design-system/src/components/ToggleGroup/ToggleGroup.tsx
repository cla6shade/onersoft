'use client'

import type { ComponentPropsWithoutRef } from 'react'
import * as RadixToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import styles from './ToggleGroup.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToggleGroup.Root>) {
  return (
    <RadixToggleGroup.Root
      data-slot="toggle-group-root"
      className={clsx(styles.root, className)}
      {...(props as ComponentPropsWithoutRef<typeof RadixToggleGroup.Root>)}
    />
  )
}

export function Item({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToggleGroup.Item>) {
  return <RadixToggleGroup.Item data-slot="toggle-group-item" className={clsx(styles.item, className)} {...props} />
}
