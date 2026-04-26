import type { ComponentPropsWithoutRef } from 'react'
import { Select as RadixSelect } from 'radix-ui'
import clsx from 'clsx'
import styles from './Select.module.css'

export const Root = RadixSelect.Root
export const Group = RadixSelect.Group
export const Value = RadixSelect.Value
export const Portal = RadixSelect.Portal
export const Icon = RadixSelect.Icon
export const ItemText = RadixSelect.ItemText

export function Trigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Trigger>) {
  return (
    <RadixSelect.Trigger className={clsx(styles.trigger, className)} {...props}>
      {children}
      <RadixSelect.Icon className={styles.caret} aria-hidden>
        <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

export function Content({
  className,
  position = 'popper',
  sideOffset = 6,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Content>) {
  return (
    <RadixSelect.Content
      position={position}
      sideOffset={sideOffset}
      className={clsx(styles.content, className)}
      {...props}
    />
  )
}

export function Viewport({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Viewport>) {
  return <RadixSelect.Viewport className={clsx(styles.viewport, className)} {...props} />
}

export function Item({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Item>) {
  return (
    <RadixSelect.Item className={clsx(styles.item, className)} {...props}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={styles.indicator}>
        <svg viewBox="0 0 16 16" width="12" height="12" focusable="false">
          <path
            d="M3.5 8.5 6.75 12 13 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}

export function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Label>) {
  return <RadixSelect.Label className={clsx(styles.label, className)} {...props} />
}

export function Separator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Separator>) {
  return <RadixSelect.Separator className={clsx(styles.separator, className)} {...props} />
}

export function ScrollUpButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.ScrollUpButton>) {
  return (
    <RadixSelect.ScrollUpButton className={clsx(styles.scrollButton, className)} {...props} />
  )
}

export function ScrollDownButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.ScrollDownButton>) {
  return (
    <RadixSelect.ScrollDownButton className={clsx(styles.scrollButton, className)} {...props} />
  )
}
