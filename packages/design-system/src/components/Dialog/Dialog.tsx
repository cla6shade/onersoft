import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import clsx from 'clsx'
import styles from './Dialog.module.css'

export const Root = RadixDialog.Root
export const Trigger = RadixDialog.Trigger
export const Portal = RadixDialog.Portal
export const Close = RadixDialog.Close

export function Overlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Overlay>) {
  return <RadixDialog.Overlay className={clsx(styles.overlay, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Content>) {
  return <RadixDialog.Content className={clsx(styles.content, className)} {...props} />
}

export function Title({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Title>) {
  return <RadixDialog.Title className={clsx(styles.title, className)} {...props} />
}

export function Description({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Description>) {
  return <RadixDialog.Description className={clsx(styles.description, className)} {...props} />
}

export function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.footer, className)} {...props} />
}
