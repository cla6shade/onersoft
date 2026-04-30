'use client'

import type { ComponentProps } from 'react'
import clsx from 'clsx'
import type { ControlSize } from '../../types'
import styles from './Input.module.css'

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  size?: ControlSize
  invalid?: boolean
}

export function Input({
  className,
  size = 'md',
  invalid = false,
  type = 'text',
  ...props
}: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      data-invalid={invalid || undefined}
      className={clsx(styles.input, styles[size], className)}
      {...props}
    />
  )
}
