'use client'

import type { ComponentProps } from 'react'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import styles from './DropdownMenu.module.css'

export const Root = RadixDropdownMenu.Root
export const Portal = RadixDropdownMenu.Portal
export const Sub = RadixDropdownMenu.Sub
export const RadioGroup = RadixDropdownMenu.RadioGroup
export const Group = RadixDropdownMenu.Group

export function Trigger({ ...props }: ComponentProps<typeof RadixDropdownMenu.Trigger>) {
  return <RadixDropdownMenu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

export function Content({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.Content>) {
  return (
    <RadixDropdownMenu.Content
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  )
}

export function SubContent({
  className,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.SubContent>) {
  return <RadixDropdownMenu.SubContent data-slot="dropdown-menu-sub-content" className={clsx(styles.content, className)} {...props} />
}

export function Item({
  className,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.Item>) {
  return <RadixDropdownMenu.Item data-slot="dropdown-menu-item" className={clsx(styles.item, className)} {...props} />
}

export function SubTrigger({
  className,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.SubTrigger>) {
  return (
    <RadixDropdownMenu.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={clsx(styles.item, styles.subTrigger, className)}
      {...props}
    />
  )
}

export function CheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.CheckboxItem>) {
  return (
    <RadixDropdownMenu.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={clsx(styles.item, styles.checkItem, className)}
      {...props}
    >
      <span className={styles.indicator}>
        <RadixDropdownMenu.ItemIndicator data-slot="dropdown-menu-item-indicator">✓</RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  )
}

export function RadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.RadioItem>) {
  return (
    <RadixDropdownMenu.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={clsx(styles.item, styles.checkItem, className)}
      {...props}
    >
      <span className={styles.indicator}>
        <RadixDropdownMenu.ItemIndicator data-slot="dropdown-menu-item-indicator">●</RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.RadioItem>
  )
}

export function Label({
  className,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.Label>) {
  return <RadixDropdownMenu.Label data-slot="dropdown-menu-label" className={clsx(styles.label, className)} {...props} />
}

export function Separator({
  className,
  ...props
}: ComponentProps<typeof RadixDropdownMenu.Separator>) {
  return <RadixDropdownMenu.Separator data-slot="dropdown-menu-separator" className={clsx(styles.separator, className)} {...props} />
}

export function Shortcut({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="dropdown-menu-shortcut" className={clsx(styles.shortcut, className)} {...props} />
}
