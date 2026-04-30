'use client'

import type { ComponentProps } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import clsx from 'clsx'
import styles from './Popover.module.css'

export const Root = RadixPopover.Root
export const Portal = RadixPopover.Portal

export function Trigger({ ...props }: ComponentProps<typeof RadixPopover.Trigger>) {
  return <RadixPopover.Trigger data-slot="popover-trigger" {...props} />
}

export function Anchor({ ...props }: ComponentProps<typeof RadixPopover.Anchor>) {
  return <RadixPopover.Anchor data-slot="popover-anchor" {...props} />
}

export function Close({ ...props }: ComponentProps<typeof RadixPopover.Close>) {
  return <RadixPopover.Close data-slot="popover-close" {...props} />
}

export function Arrow({ ...props }: ComponentProps<typeof RadixPopover.Arrow>) {
  return <RadixPopover.Arrow data-slot="popover-arrow" {...props} />
}

export function Content({
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof RadixPopover.Content>) {
  return (
    <RadixPopover.Content
      data-slot="popover-content"
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  )
}
