import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import { AlertDialog as RadixAlertDialog } from 'radix-ui'
import clsx from 'clsx'
import styles from './AlertDialog.module.css'

export const Root = RadixAlertDialog.Root
export const Portal = RadixAlertDialog.Portal

export function Trigger({ ...props }: ComponentPropsWithoutRef<typeof RadixAlertDialog.Trigger>) {
  return <RadixAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
}

export function Cancel({ ...props }: ComponentPropsWithoutRef<typeof RadixAlertDialog.Cancel>) {
  return <RadixAlertDialog.Cancel data-slot="alert-dialog-cancel" {...props} />
}

export function Action({ ...props }: ComponentPropsWithoutRef<typeof RadixAlertDialog.Action>) {
  return <RadixAlertDialog.Action data-slot="alert-dialog-action" {...props} />
}

export function Overlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay>) {
  return <RadixAlertDialog.Overlay data-slot="alert-dialog-overlay" className={clsx(styles.overlay, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>) {
  return <RadixAlertDialog.Content data-slot="alert-dialog-content" className={clsx(styles.content, className)} {...props} />
}

export function Title({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>) {
  return <RadixAlertDialog.Title data-slot="alert-dialog-title" className={clsx(styles.title, className)} {...props} />
}

export function Description({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAlertDialog.Description>) {
  return (
    <RadixAlertDialog.Description data-slot="alert-dialog-description" className={clsx(styles.description, className)} {...props} />
  )
}

export function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="alert-dialog-footer" className={clsx(styles.footer, className)} {...props} />
}
