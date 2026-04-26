import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import { AlertDialog as RadixAlertDialog } from 'radix-ui'
import clsx from 'clsx'
import styles from './AlertDialog.module.css'

export const Root = RadixAlertDialog.Root
export const Trigger = RadixAlertDialog.Trigger
export const Portal = RadixAlertDialog.Portal
export const Cancel = RadixAlertDialog.Cancel
export const Action = RadixAlertDialog.Action

export function Overlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay>) {
  return <RadixAlertDialog.Overlay className={clsx(styles.overlay, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>) {
  return <RadixAlertDialog.Content className={clsx(styles.content, className)} {...props} />
}

export function Title({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>) {
  return <RadixAlertDialog.Title className={clsx(styles.title, className)} {...props} />
}

export function Description({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>) {
  return (
    <RadixAlertDialog.Description className={clsx(styles.description, className)} {...props} />
  )
}

export function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.footer, className)} {...props} />
}
