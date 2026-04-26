import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Switch as RadixSwitch } from 'radix-ui'
import clsx from 'clsx'
import styles from './Switch.module.css'

export const Switch = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RadixSwitch.Root>
>(({ className, ...props }, ref) => (
  <RadixSwitch.Root ref={ref} className={clsx(styles.root, className)} {...props}>
    <RadixSwitch.Thumb className={styles.thumb} />
  </RadixSwitch.Root>
))

Switch.displayName = 'Switch'
