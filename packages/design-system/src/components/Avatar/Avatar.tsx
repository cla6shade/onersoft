'use client'

import type { ComponentPropsWithoutRef } from 'react'
import * as RadixAvatar from '@radix-ui/react-avatar'
import clsx from 'clsx'
import styles from './Avatar.module.css'

export function Root({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAvatar.Root>) {
  return <RadixAvatar.Root data-slot="avatar" className={clsx(styles.root, className)} {...props} />
}

export function Image({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAvatar.Image>) {
  return <RadixAvatar.Image data-slot="avatar-image" className={clsx(styles.image, className)} {...props} />
}

export function Fallback({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>) {
  return <RadixAvatar.Fallback data-slot="avatar-fallback" className={clsx(styles.fallback, className)} {...props} />
}
