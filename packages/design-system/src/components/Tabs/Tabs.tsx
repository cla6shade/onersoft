import type { ComponentPropsWithoutRef } from 'react'
import { Tabs as RadixTabs } from 'radix-ui'
import clsx from 'clsx'
import styles from './Tabs.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixTabs.Root>) {
  return <RadixTabs.Root className={clsx(styles.root, className)} {...props} />
}

export function List({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixTabs.List>) {
  return <RadixTabs.List className={clsx(styles.list, className)} {...props} />
}

export function Trigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixTabs.Trigger>) {
  return <RadixTabs.Trigger className={clsx(styles.trigger, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixTabs.Content>) {
  return <RadixTabs.Content className={clsx(styles.content, className)} {...props} />
}
