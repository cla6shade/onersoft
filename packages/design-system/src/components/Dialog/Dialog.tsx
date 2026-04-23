import type { ComponentPropsWithoutRef } from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import styles from './Dialog.module.css'

export const Root = RadixDialog.Root
export const Trigger = RadixDialog.Trigger
export const Portal = RadixDialog.Portal
export const Close = RadixDialog.Close
export const Title = RadixDialog.Title
export const Description = RadixDialog.Description

export function Overlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Overlay>) {
  return (
    <RadixDialog.Overlay
      className={[styles.overlay, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Content>) {
  return (
    <RadixDialog.Content
      className={[styles.content, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
