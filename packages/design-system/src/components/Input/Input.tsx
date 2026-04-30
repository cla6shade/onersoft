'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import type { ControlSize } from '../../types'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ControlSize
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = 'md', invalid = false, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      data-slot="input"
      type={type}
      data-invalid={invalid || undefined}
      className={clsx(styles.input, styles[size], className)}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
