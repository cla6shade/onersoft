'use client'

import type { ComponentProps } from 'react'
import * as Slot from '@radix-ui/react-slot'
import clsx from 'clsx'
import type { ControlSize } from '../../types'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ControlSize
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      data-slot="button"
      className={clsx(styles.button, styles[variant], styles[size], className)}
      {...props}
    />
  )
}
