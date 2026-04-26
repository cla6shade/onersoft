import type { ComponentPropsWithoutRef } from 'react'
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui'
import clsx from 'clsx'
import styles from './DropdownMenu.module.css'

export const Root = RadixDropdownMenu.Root
export const Trigger = RadixDropdownMenu.Trigger
export const Portal = RadixDropdownMenu.Portal
export const Sub = RadixDropdownMenu.Sub
export const RadioGroup = RadixDropdownMenu.RadioGroup
export const Group = RadixDropdownMenu.Group

export function Content({
  className,
  sideOffset = 6,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>) {
  return (
    <RadixDropdownMenu.Content
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  )
}

export function SubContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent>) {
  return <RadixDropdownMenu.SubContent className={clsx(styles.content, className)} {...props} />
}

export function Item({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>) {
  return <RadixDropdownMenu.Item className={clsx(styles.item, className)} {...props} />
}

export function SubTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger>) {
  return (
    <RadixDropdownMenu.SubTrigger
      className={clsx(styles.item, styles.subTrigger, className)}
      {...props}
    />
  )
}

export function CheckboxItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>) {
  return (
    <RadixDropdownMenu.CheckboxItem
      className={clsx(styles.item, styles.checkItem, className)}
      {...props}
    >
      <span className={styles.indicator}>
        <RadixDropdownMenu.ItemIndicator>✓</RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  )
}

export function RadioItem({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.RadioItem>) {
  return (
    <RadixDropdownMenu.RadioItem
      className={clsx(styles.item, styles.checkItem, className)}
      {...props}
    >
      <span className={styles.indicator}>
        <RadixDropdownMenu.ItemIndicator>●</RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.RadioItem>
  )
}

export function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>) {
  return <RadixDropdownMenu.Label className={clsx(styles.label, className)} {...props} />
}

export function Separator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>) {
  return <RadixDropdownMenu.Separator className={clsx(styles.separator, className)} {...props} />
}

export function Shortcut({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span className={clsx(styles.shortcut, className)} {...props} />
}
