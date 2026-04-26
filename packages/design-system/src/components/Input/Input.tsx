import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = 'md', invalid = false, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-invalid={invalid || undefined}
      className={clsx(styles.input, styles[size], className)}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
