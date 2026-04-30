'use client'

import type { ComponentProps } from 'react'
import * as RadixMenubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import styles from './Menubar.module.css'

export const Portal = RadixMenubar.Portal
export const Sub = RadixMenubar.Sub
export const Group = RadixMenubar.Group

export function Root({
  className,
  loop = true,
  ...props
}: ComponentProps<typeof RadixMenubar.Root>) {
  /* `loop` lets keyboard arrow navigation wrap from the last menu back to
   * the first. Defaulting it on matches native menubar behavior. */
  return (
    <RadixMenubar.Root data-slot="menubar" loop={loop} className={clsx(styles.root, className)} {...props} />
  )
}

export function Menu(props: ComponentProps<typeof RadixMenubar.Menu>) {
  return <RadixMenubar.Menu {...props} />
}

export function Trigger({
  className,
  ...props
}: ComponentProps<typeof RadixMenubar.Trigger>) {
  return <RadixMenubar.Trigger data-slot="menubar-trigger" className={clsx(styles.trigger, className)} {...props} />
}

export function Content({
  className,
  align = 'start',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof RadixMenubar.Content>) {
  return (
    <RadixMenubar.Content
      data-slot="menubar-content"
      className={clsx(styles.content, className)}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export function Item({
  className,
  ...props
}: ComponentProps<typeof RadixMenubar.Item>) {
  return <RadixMenubar.Item data-slot="menubar-item" className={clsx(styles.item, className)} {...props} />
}

export function Label({
  className,
  ...props
}: ComponentProps<typeof RadixMenubar.Label>) {
  return <RadixMenubar.Label data-slot="menubar-label" className={clsx(styles.label, className)} {...props} />
}

export function Separator({
  className,
  ...props
}: ComponentProps<typeof RadixMenubar.Separator>) {
  return <RadixMenubar.Separator data-slot="menubar-separator" className={clsx(styles.separator, className)} {...props} />
}

export function Shortcut({
  className,
  ...props
}: ComponentProps<'span'>) {
  return <span data-slot="menubar-shortcut" className={clsx(styles.shortcut, className)} {...props} />
}
