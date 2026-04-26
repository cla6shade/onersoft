import type { ComponentPropsWithoutRef } from 'react'
import { Avatar as RadixAvatar } from 'radix-ui'
import clsx from 'clsx'
import styles from './Avatar.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAvatar.Root>) {
  return <RadixAvatar.Root className={clsx(styles.root, className)} {...props} />
}

export function Image({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAvatar.Image>) {
  return <RadixAvatar.Image className={clsx(styles.image, className)} {...props} />
}

export function Fallback({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>) {
  return <RadixAvatar.Fallback className={clsx(styles.fallback, className)} {...props} />
}
