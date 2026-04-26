import type { ComponentPropsWithoutRef } from 'react'
import { Toast as RadixToast } from 'radix-ui'
import clsx from 'clsx'
import styles from './Toast.module.css'

export const Provider = RadixToast.Provider
export const Action = RadixToast.Action

export function Viewport({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToast.Viewport>) {
  return <RadixToast.Viewport className={clsx(styles.viewport, className)} {...props} />
}

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToast.Root>) {
  return <RadixToast.Root className={clsx(styles.root, className)} {...props} />
}

export function Title({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToast.Title>) {
  return <RadixToast.Title className={clsx(styles.title, className)} {...props} />
}

export function Description({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToast.Description>) {
  return <RadixToast.Description className={clsx(styles.description, className)} {...props} />
}

export function Close({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixToast.Close>) {
  return <RadixToast.Close className={clsx(styles.close, className)} {...props} />
}
