import type { ComponentPropsWithoutRef } from 'react'
import { Tooltip as RadixTooltip } from 'radix-ui'
import clsx from 'clsx'
import styles from './Tooltip.module.css'

export const Provider = RadixTooltip.Provider
export const Root = RadixTooltip.Root
export const Trigger = RadixTooltip.Trigger
export const Portal = RadixTooltip.Portal
export const Arrow = RadixTooltip.Arrow

export function Content({
  className,
  sideOffset = 6,
  ...props
}: ComponentPropsWithoutRef<typeof RadixTooltip.Content>) {
  return (
    <RadixTooltip.Content
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  )
}
