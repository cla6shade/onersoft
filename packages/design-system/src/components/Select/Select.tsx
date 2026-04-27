import type { ComponentPropsWithoutRef } from 'react'
import { Select as RadixSelect } from 'radix-ui'
import clsx from 'clsx'
import styles from './Select.module.css'

export const Root = RadixSelect.Root
export const Group = RadixSelect.Group
export const Portal = RadixSelect.Portal

export function Value({ ...props }: ComponentPropsWithoutRef<typeof RadixSelect.Value>) {
  return <RadixSelect.Value data-slot="select-value" {...props} />
}

export function Icon({ ...props }: ComponentPropsWithoutRef<typeof RadixSelect.Icon>) {
  return <RadixSelect.Icon data-slot="select-icon" {...props} />
}

export function ItemText({ ...props }: ComponentPropsWithoutRef<typeof RadixSelect.ItemText>) {
  return <RadixSelect.ItemText data-slot="select-item-text" {...props} />
}

export function Trigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Trigger>) {
  return (
    <RadixSelect.Trigger data-slot="select-trigger" className={clsx(styles.trigger, className)} {...props}>
      {children}
      <RadixSelect.Icon data-slot="select-icon" className={styles.caret} aria-hidden>
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
      data-slot="select-content"
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
  return <RadixSelect.Viewport data-slot="select-viewport" className={clsx(styles.viewport, className)} {...props} />
}

export function Item({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Item>) {
  return (
    <RadixSelect.Item data-slot="select-item" className={clsx(styles.item, className)} {...props}>
      <RadixSelect.ItemText data-slot="select-item-text">{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator data-slot="select-indicator" className={styles.indicator}>
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
  return <RadixSelect.Label data-slot="select-label" className={clsx(styles.label, className)} {...props} />
}

export function Separator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.Separator>) {
  return <RadixSelect.Separator data-slot="select-separator" className={clsx(styles.separator, className)} {...props} />
}

export function ScrollUpButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.ScrollUpButton>) {
  return (
    <RadixSelect.ScrollUpButton data-slot="select-scroll-up-button" className={clsx(styles.scrollButton, className)} {...props} />
  )
}

export function ScrollDownButton({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSelect.ScrollDownButton>) {
  return (
    <RadixSelect.ScrollDownButton data-slot="select-scroll-down-button" className={clsx(styles.scrollButton, className)} {...props} />
  )
}
