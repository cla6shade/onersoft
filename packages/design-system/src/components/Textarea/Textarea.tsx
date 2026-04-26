import { forwardRef, type TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, resize = 'vertical', style, ...props }, ref) => (
    <textarea
      ref={ref}
      data-invalid={invalid || undefined}
      className={clsx(styles.textarea, className)}
      style={{ resize, ...style }}
      {...props}
    />
  ),
)

Textarea.displayName = 'Textarea'
