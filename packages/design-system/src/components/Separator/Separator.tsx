import type { ComponentPropsWithoutRef } from 'react'
import { Separator as RadixSeparator } from 'radix-ui'
import clsx from 'clsx'
import styles from './Separator.module.css'

export function Separator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixSeparator.Root>) {
  return <RadixSeparator.Root className={clsx(styles.root, className)} {...props} />
}
