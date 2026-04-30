'use client'

import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.css'

export interface TextareaProps extends ComponentProps<'textarea'> {
  invalid?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export function Textarea({
  className,
  invalid = false,
  resize = 'vertical',
  style,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-invalid={invalid || undefined}
      className={clsx(styles.textarea, className)}
      style={{ resize, ...style }}
      {...props}
    />
  )
}
