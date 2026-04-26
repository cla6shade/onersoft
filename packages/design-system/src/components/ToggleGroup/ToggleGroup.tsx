import type { ComponentPropsWithoutRef } from 'react'
import { ToggleGroup as RadixToggleGroup } from 'radix-ui'
import clsx from 'clsx'
import styles from './ToggleGroup.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToggleGroup.Root>) {
  return (
    <RadixToggleGroup.Root
      className={clsx(styles.root, className)}
      {...(props as ComponentPropsWithoutRef<typeof RadixToggleGroup.Root>)}
    />
  )
}

export function Item({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToggleGroup.Item>) {
  return <RadixToggleGroup.Item className={clsx(styles.item, className)} {...props} />
}
