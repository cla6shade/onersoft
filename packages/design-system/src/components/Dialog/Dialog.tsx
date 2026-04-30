'use client'

import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import styles from './Dialog.module.css'

export const Root = RadixDialog.Root
export const Portal = RadixDialog.Portal

export function Trigger({ ...props }: ComponentPropsWithoutRef<typeof RadixDialog.Trigger>) {
  return <RadixDialog.Trigger data-slot="dialog-trigger" {...props} />
}

export function Close({ ...props }: ComponentPropsWithoutRef<typeof RadixDialog.Close>) {
  return <RadixDialog.Close data-slot="dialog-close" {...props} />
}

export function Overlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Overlay>) {
  return <RadixDialog.Overlay data-slot="dialog-overlay" className={clsx(styles.overlay, className)} {...props} />
}

export function Content({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Content>) {
  return <RadixDialog.Content data-slot="dialog-content" className={clsx(styles.content, className)} {...props} />
}

export function Title({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Title>) {
  return <RadixDialog.Title data-slot="dialog-title" className={clsx(styles.title, className)} {...props} />
}

export function Description({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDialog.Description>) {
  return <RadixDialog.Description data-slot="dialog-description" className={clsx(styles.description, className)} {...props} />
}

export function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="dialog-footer" className={clsx(styles.footer, className)} {...props} />
}
