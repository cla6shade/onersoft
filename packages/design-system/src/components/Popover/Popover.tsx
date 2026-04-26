import type { ComponentPropsWithoutRef } from 'react'
import { Popover as RadixPopover } from 'radix-ui'
import clsx from 'clsx'
import styles from './Popover.module.css'

export const Root = RadixPopover.Root
export const Trigger = RadixPopover.Trigger
export const Anchor = RadixPopover.Anchor
export const Portal = RadixPopover.Portal
export const Close = RadixPopover.Close
export const Arrow = RadixPopover.Arrow

export function Content({
  className,
  sideOffset = 8,
  ...props
}: ComponentPropsWithoutRef<typeof RadixPopover.Content>) {
  return (
    <RadixPopover.Content
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  )
}
