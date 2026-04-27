import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Slot } from 'radix-ui'
import clsx from 'clsx'
import type { ButtonVariant, ControlSize } from '../../types'
import styles from './Button.module.css'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ControlSize
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button'
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={clsx(styles.button, styles[variant], styles[size], className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
