import { forwardRef, type HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Kbd.module.css'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md'
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <kbd ref={ref} className={clsx(styles.kbd, styles[size], className)} {...props} />
  ),
)

Kbd.displayName = 'Kbd'
