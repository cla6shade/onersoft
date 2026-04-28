import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Toggle as RadixToggle } from 'radix-ui'
import clsx from 'clsx'
import type { ControlSize } from '../../types'
import styles from './Toggle.module.css'

export interface ToggleProps extends ComponentPropsWithoutRef<typeof RadixToggle.Root> {
  size?: ControlSize
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <RadixToggle.Root
      ref={ref}
      data-slot="toggle"
      className={clsx(styles.root, styles[size], className)}
      {...props}
    />
  ),
)

Toggle.displayName = 'Toggle'
