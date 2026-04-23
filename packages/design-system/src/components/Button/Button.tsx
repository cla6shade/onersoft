import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { Slot } from 'radix-ui'
import styles from './Button.module.css'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button'
    const classes = [styles.button, styles[variant], styles[size], className]
      .filter(Boolean)
      .join(' ')

    return <Comp ref={ref} className={classes} {...props} />
  },
)

Button.displayName = 'Button'
