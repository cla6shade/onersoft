'use client'

import type { ComponentProps } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import styles from './Tabs.module.css'

export function Root({
  className,
  ...props
}: ComponentProps<typeof RadixTabs.Root>) {
  return <RadixTabs.Root data-slot="tabs" className={clsx(styles.root, className)} {...props} />
}

export function List({
  className,
  ...props
}: ComponentProps<typeof RadixTabs.List>) {
  return <RadixTabs.List data-slot="tabs-list" className={clsx(styles.list, className)} {...props} />
}

export function Trigger({
  className,
  ...props
}: ComponentProps<typeof RadixTabs.Trigger>) {
  return <RadixTabs.Trigger data-slot="tabs-trigger" className={clsx(styles.trigger, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentProps<typeof RadixTabs.Content>) {
  return <RadixTabs.Content data-slot="tabs-content" className={clsx(styles.content, className)} {...props} />
}
